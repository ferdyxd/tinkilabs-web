import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { suscripciones } from '@/db/schema';
import { SubscribeSchema } from '@/lib/validations';
import { error400, error500 } from '@/lib/api-utils';
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
    const raw = await request.json();
    const parsed = SubscribeSchema.safeParse(raw);

    if (!parsed.success) {
      return error400('Validación fallida', parsed.error);
    }

    const body = parsed.data;
    const precios = PRECIOS[body.linea][body.plan];

    const result = await db.insert(suscripciones).values({
      linea: body.linea,
      plan: body.plan === 'trimestral' || body.plan === 'anual' ? body.plan : 'mensual',
      precioMesCents: Math.round(precios.precioMes * 100),
      direccion: body.direccion,
      ciudad: body.ciudad,
      cp: body.cp,
      telefono: body.telefono || null,
      estado: 'activa',
    }).returning({ id: suscripciones.id, createdAt: suscripciones.createdAt });

    const sub = result[0];

    if (body.email) {
      const lineaNombre = LINEA_NOMBRES[body.linea] || body.linea;
      const planNombre = PLAN_NOMBRES[body.plan] || body.plan;
      const total = precios.precioTotal.toFixed(2).replace('.', ',');

      await addContact({
        email: body.email,
        nombre: body.nombreNino,
        listIds: [3],
        attributes: { LINEA: body.linea, PLAN: body.plan },
      });

      await sendTransactionalEmail({
        to: { email: body.email, name: body.nombreNino },
        subject: `¡${body.nombreNino}, bienvenido a Tinkilabs! 🚀`,
        htmlContent: plantillaSuscripcion(body.nombreNino, lineaNombre, planNombre, total),
      });
    }

    return NextResponse.json({
      success: true,
      subscription: {
        id: sub.id,
        nombreNino: body.nombreNino,
        linea: body.linea,
        plan: body.plan,
        precioTotal: precios.precioTotal,
        createdAt: sub.createdAt,
      },
    });
  } catch (error) {
    console.error('Error al crear suscripción:', error);
    return error500();
  }
}
