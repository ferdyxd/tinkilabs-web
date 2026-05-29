import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { giftCertificates } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { CreateGiftSchema } from '@/lib/validations';
import { error400, error404, error500 } from '@/lib/api-utils';
import { addContact, sendTransactionalEmail, plantillaGiftComprador } from '@/lib/brevo';
import crypto from 'crypto';

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg = () => Array.from(crypto.randomBytes(4))
    .map(b => chars[b % chars.length]).join('');
  return `TINKI-${seg()}-${seg()}`;
}

const PRODUCTO_NOMBRES: Record<string, string> = {
  'tinki-maker': 'Tinki Maker',
  'tinki-mini': 'Tinki Mini',
  'tinki-pro': 'Tinki Pro',
};

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json();
    const parsed = CreateGiftSchema.safeParse(raw);

    if (!parsed.success) {
      return error400('Validación fallida', parsed.error);
    }

    const body = parsed.data;
    const code = generateCode();

    const result = await db.insert(giftCertificates).values({
      codigo: code,
      producto: body.product,
      duracionMeses: body.durationMonths,
      precioCents: body.priceCents,
      nombreComprador: body.purchaserName,
      emailComprador: body.purchaserEmail || null,
      nombreDestinatario: body.recipientName,
      emailDestinatario: body.recipientEmail,
      mensaje: body.message || null,
      fechaEnvio: body.sendDate,
      estado: 'pendiente',
    }).returning({
      id: giftCertificates.id,
      codigo: giftCertificates.codigo,
      estado: giftCertificates.estado,
      createdAt: giftCertificates.createdAt,
    });

    const gift = result[0];
    const productoNombre = PRODUCTO_NOMBRES[body.product] || body.product;
    const total = (body.priceCents / 100).toFixed(2).replace('.', ',');

    if (body.purchaserEmail) {
      await addContact({
        email: body.purchaserEmail,
        nombre: body.purchaserName,
        listIds: [3],
        attributes: { TIPO: 'regalo_comprador' },
      });

      await sendTransactionalEmail({
        to: { email: body.purchaserEmail, name: body.purchaserName },
        subject: `¡Regalo creado! ${body.recipientName} recibirá Tinkilabs 🎁`,
        htmlContent: plantillaGiftComprador(
          body.purchaserName,
          body.recipientName,
          productoNombre,
          body.durationMonths,
          total,
          gift.codigo
        ),
      });
    }

    return NextResponse.json({
      success: true,
      gift: {
        id: gift.id,
        code: gift.codigo,
        status: gift.estado,
        createdAt: gift.createdAt,
      },
    });
  } catch (error) {
    console.error('Error al crear gift certificate:', error);
    return error500();
  }
}

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');

    if (!code) {
      return error400('Falta el parámetro code');
    }

    const result = await db
      .select()
      .from(giftCertificates)
      .where(eq(giftCertificates.codigo, code.toUpperCase().trim()))
      .limit(1);

    if (result.length === 0) {
      return error404('Código no encontrado');
    }

    return NextResponse.json({ gift: result[0] });
  } catch (error) {
    console.error('Error al consultar gift certificate:', error);
    return error500();
  }
}
