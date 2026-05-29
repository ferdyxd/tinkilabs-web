import { NextRequest, NextResponse } from 'next/server';
import pool, { ensureTables } from '@/lib/db';
import {
  addContact,
  sendTransactionalEmail,
  plantillaGiftDestinatario,
} from '@/lib/brevo';

const PRODUCTO_NOMBRES: Record<string, string> = {
  'tinki-maker': 'Tinki Maker',
  'tinki-mini': 'Tinki Mini',
  'tinki-pro': 'Tinki Pro',
};

/**
 * Cron job: envía los gift certificates programados para hoy.
 * Vercel Cron lo llama cada día a las 08:00 (UTC+1).
 * Protegido con CRON_SECRET para que solo Vercel pueda llamarlo.
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const expected = process.env.CRON_SECRET || 'tinki-cron-2026';

  if (secret !== expected) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    await ensureTables();

    const result = await pool.query(
      `SELECT id, code, product, duration_months, purchaser_name,
              recipient_name, recipient_email, message, send_date
       FROM gift_certificates
       WHERE send_date = CURRENT_DATE AND status = 'pending'
       LIMIT 50`
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ sent: 0, message: 'No hay certificados para enviar hoy' });
    }

    const enviados = [];

    for (const gift of result.rows) {
      const productoNombre = PRODUCTO_NOMBRES[gift.product] || gift.product;

      // Añadir destinatario a Brevo (lista de leads/regalos)
      await addContact({
        email: gift.recipient_email,
        nombre: gift.recipient_name,
        listIds: [3],
        attributes: { TIPO: 'regalo_destinatario', CODIGO: gift.code },
      });

      // Enviar email del certificado
      const res = await sendTransactionalEmail({
        to: { email: gift.recipient_email, name: gift.recipient_name },
        subject: `¡${gift.purchaser_name} te ha regalado Tinkilabs! 🎁`,
        htmlContent: plantillaGiftDestinatario(
          gift.recipient_name,
          gift.purchaser_name,
          productoNombre,
          gift.duration_months,
          gift.code,
          gift.message
        ),
      });

      if (res.ok) {
        // Marcar como enviado
        await pool.query(
          `UPDATE gift_certificates SET status = 'sent' WHERE id = $1`,
          [gift.id]
        );
        enviados.push(gift.code);
      }
    }

    return NextResponse.json({
      sent: enviados.length,
      codes: enviados,
      message: `${enviados.length} certificados enviados`,
    });
  } catch (error) {
    console.error('Error en cron send-gifts:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}
