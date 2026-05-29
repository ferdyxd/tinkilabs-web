import { NextRequest, NextResponse } from 'next/server';
import pool, { ensureTables } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const body = await request.json();
    const { code, shippingAddress, shippingCity, shippingZip, shippingCountry } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Falta el código del certificado' },
        { status: 400 }
      );
    }

    // Verificar que el código existe y está pendiente
    const result = await pool.query(
      `SELECT id, code, product, duration_months, recipient_name, status
       FROM gift_certificates
       WHERE code = $1`,
      [code.toUpperCase().trim()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Este código no es válido. Comprueba que lo has escrito bien.' },
        { status: 404 }
      );
    }

    const gift = result.rows[0];

    if (gift.status === 'redeemed') {
      return NextResponse.json(
        { error: 'Este certificado ya ha sido canjeado.' },
        { status: 409 }
      );
    }

    if (gift.status === 'expired') {
      return NextResponse.json(
        { error: 'Este certificado ha caducado.' },
        { status: 410 }
      );
    }

    // Marcar como canjeado
    await pool.query(
      `UPDATE gift_certificates
       SET status = 'redeemed', redeemed_at = NOW()
       WHERE id = $1`,
      [gift.id]
    );

    // Aquí en el futuro: crear suscripción en Stripe con trial period = duration_months
    // y enviar email de confirmación al destinatario vía Brevo

    return NextResponse.json({
      success: true,
      message: `¡Bienvenido a Tinkilabs, ${gift.recipient_name}!`,
      product: gift.product,
      durationMonths: gift.duration_months,
    });
  } catch (error) {
    console.error('Error al canjear gift certificate:', error);
    return NextResponse.json(
      { error: 'Error interno al canjear el certificado' },
      { status: 500 }
    );
  }
}
