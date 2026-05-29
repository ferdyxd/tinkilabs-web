import { NextRequest, NextResponse } from 'next/server';
import pool, { ensureTables } from '@/lib/db';
import { addContact, sendTransactionalEmail, plantillaSuscripcion } from '@/lib/brevo';

const PRECIOS: Record<string, Record<string, { precioMes: number; precioTotal: number }>> = {
  maker: {
    mensual:    { precioMes: 24.90, precioTotal: 24.90 },
    trimestral: { precioMes: 22.90, precioTotal: 68.70 },
    anual:      { precioMes: 19.90, precioTotal: 238.80 },
  },
  mini: {
    mensual:    { precioMes: 19.90, precioTotal: 19.90 },
    trimestral: { precioMes: 17.90, precioTotal: 53.70 },
    anual:      { precioMes: 14.90, precioTotal: 178.80 },
  },
  pro: {
    mensual:    { precioMes: 24.90, precioTotal: 24.90 },
    trimestral: { precioMes: 22.90, precioTotal: 68.70 },
    anual:      { precioMes: 19.90, precioTotal: 238.80 },
  },
};

const LINEA_NOMBRES: Record<string, string> = {
  mini: 'Tinki Mini',
  maker: 'Tinki Maker',
  pro: 'Tinki Pro',
};

const PLAN_NOMBRES: Record<string, string> = {
  mensual: 'Mensual (1 caja)',
  trimestral: 'Trimestral (3 cajas)',
  anual: 'Anual (12 cajas)',
};

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const body = await request.json();
    const { nombreNino, linea, plan, direccion, ciudad, cp, telefono, email } = body;

    if (!nombreNino || !linea || !plan || !direccion || !ciudad || !cp) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    const precios = PRECIOS[linea]?.[plan];
    if (!precios) {
      return NextResponse.json(
        { error: 'Línea o plan no válido' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO subscriptions
       (nombre_nino, linea, plan, precio_mes_cents, precio_total_cents,
        direccion, ciudad, cp, telefono, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'paid')
       RETURNING id, created_at`,
      [
        nombreNino,
        linea,
        plan,
        Math.round(precios.precioMes * 100),
        Math.round(precios.precioTotal * 100),
        direccion,
        ciudad,
        cp,
        telefono || null,
      ]
    );

    // Email de confirmación al comprador (si tenemos su email)
    if (email && email.includes('@')) {
      const lineaNombre = LINEA_NOMBRES[linea] || linea;
      const planNombre = PLAN_NOMBRES[plan] || plan;
      const total = precios.precioTotal.toFixed(2).replace('.', ',');

      // Añadir a Brevo (lista de clientes)
      await addContact({
        email,
        nombre: nombreNino,
        listIds: [3],
        attributes: { LINEA: linea, PLAN: plan },
      });

      // Email transaccional de bienvenida
      await sendTransactionalEmail({
        to: { email, name: nombreNino },
        subject: `¡${nombreNino}, bienvenido a Tinkilabs! 🚀`,
        htmlContent: plantillaSuscripcion(nombreNino, lineaNombre, planNombre, total),
      });
    }

    return NextResponse.json({
      success: true,
      subscription: {
        id: result.rows[0].id,
        nombreNino,
        linea,
        plan,
        precioTotal: precios.precioTotal,
        createdAt: result.rows[0].created_at,
      },
    });
  } catch (error) {
    console.error('Error al crear suscripción:', error);
    return NextResponse.json(
      { error: 'Error interno al crear la suscripción' },
      { status: 500 }
    );
  }
}
