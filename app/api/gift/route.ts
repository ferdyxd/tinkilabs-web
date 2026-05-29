import { NextRequest, NextResponse } from 'next/server';
import pool, { ensureTables } from '@/lib/db';
import {
  addContact,
  sendTransactionalEmail,
  plantillaGiftComprador,
} from '@/lib/brevo';
import crypto from 'crypto';

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg = () => Array.from(crypto.randomBytes(4))
    .map(b => chars[b % chars.length]).join('');
  return `TINKI-${seg()}-${seg()}`;
}

interface GiftRequest {
  product: string;
  durationMonths: number;
  priceCents: number;
  purchaserName: string;
  purchaserEmail?: string;
  recipientName: string;
  recipientEmail: string;
  message?: string;
  sendDate: string;
}

const PRODUCTO_NOMBRES: Record<string, string> = {
  'tinki-maker': 'Tinki Maker',
  'tinki-mini': 'Tinki Mini',
  'tinki-pro': 'Tinki Pro',
};

export async function POST(request: NextRequest) {
  try {
    await ensureTables();

    const body: GiftRequest = await request.json();

    if (!body.product || !body.durationMonths || !body.priceCents ||
        !body.purchaserName || !body.recipientName || !body.recipientEmail || !body.sendDate) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    if (![3, 6, 12].includes(body.durationMonths)) {
      return NextResponse.json(
        { error: 'Duración no válida (3, 6 o 12 meses)' },
        { status: 400 }
      );
    }

    const code = generateCode();

    const result = await pool.query(
      `INSERT INTO gift_certificates
       (code, product, duration_months, price_cents, purchaser_name, purchaser_email,
        recipient_name, recipient_email, message, send_date, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'pending')
       RETURNING id, code, status, created_at`,
      [code, body.product, body.durationMonths, body.priceCents,
       body.purchaserName, body.purchaserEmail || null,
       body.recipientName, body.recipientEmail,
       body.message || null, body.sendDate]
    );

    const gift = result.rows[0];
    const productoNombre = PRODUCTO_NOMBRES[body.product] || body.product;
    const total = (body.priceCents / 100).toFixed(2).replace('.', ',');

    // Email de confirmación al comprador
    if (body.purchaserEmail && body.purchaserEmail.includes('@')) {
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
          gift.code
        ),
      });
    }

    return NextResponse.json({
      success: true,
      gift: {
        id: gift.id,
        code: gift.code,
        status: gift.status,
        createdAt: gift.created_at,
      },
    });
  } catch (error) {
    console.error('Error al crear gift certificate:', error);
    return NextResponse.json(
      { error: 'Error interno al crear el certificado' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureTables();

    const code = request.nextUrl.searchParams.get('code');
    if (!code) {
      return NextResponse.json(
        { error: 'Falta el parámetro code' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT code, product, duration_months, price_cents, purchaser_name,
              recipient_name, recipient_email, message, send_date, status,
              redeemed_at, created_at
       FROM gift_certificates
       WHERE code = $1`,
      [code.toUpperCase().trim()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Código no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ gift: result.rows[0] });
  } catch (error) {
    console.error('Error al consultar gift certificate:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}
