import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { giftCertificates } from '@/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { error401, error500 } from '@/lib/api-utils';
import { addContact, sendTransactionalEmail, plantillaGiftDestinatario } from '@/lib/brevo';

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
  const expected = process.env.CRON_SECRET;

  if (!expected || secret !== expected) {
    return error401('No autorizado');
  }

  try {
    const result = await db
      .select()
      .from(giftCertificates)
      .where(
        and(
          eq(giftCertificates.fechaEnvio, sql`CURRENT_DATE`),
          eq(giftCertificates.estado, 'pendiente')
        )
      )
      .limit(50);

    if (result.length === 0) {
      return NextResponse.json({ sent: 0, message: 'No hay certificados para enviar hoy' });
    }

    const enviados: string[] = [];

    for (const gift of result) {
      const productoNombre = PRODUCTO_NOMBRES[gift.producto] || gift.producto;

      await addContact({
        email: gift.emailDestinatario,
        nombre: gift.nombreDestinatario,
        listIds: [3],
        attributes: { TIPO: 'regalo_destinatario', CODIGO: gift.codigo },
      });

      const res = await sendTransactionalEmail({
        to: { email: gift.emailDestinatario, name: gift.nombreDestinatario },
        subject: `¡${gift.nombreComprador} te ha regalado Tinkilabs! 🎁`,
        htmlContent: plantillaGiftDestinatario(
          gift.nombreDestinatario,
          gift.nombreComprador,
          productoNombre,
          gift.duracionMeses,
          gift.codigo,
          gift.mensaje ?? undefined
        ),
      });

      if (res.ok) {
        await db
          .update(giftCertificates)
          .set({ estado: 'enviado' })
          .where(eq(giftCertificates.id, gift.id));
        enviados.push(gift.codigo);
      }
    }

    return NextResponse.json({
      sent: enviados.length,
      codes: enviados,
      message: `${enviados.length} certificados enviados`,
    });
  } catch (error) {
    console.error('Error en cron send-gifts:', error);
    return error500();
  }
}
