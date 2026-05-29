import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { giftCertificates } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { RedeemGiftSchema } from '@/lib/validations';
import { error400, error404, error409, error410, error500 } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json();
    const parsed = RedeemGiftSchema.safeParse(raw);

    if (!parsed.success) {
      return error400('Validación fallida', parsed.error);
    }

    const { code } = parsed.data;

    const result = await db
      .select()
      .from(giftCertificates)
      .where(eq(giftCertificates.codigo, code.toUpperCase().trim()))
      .limit(1);

    if (result.length === 0) {
      return error404('Este código no es válido. Comprueba que lo has escrito bien.');
    }

    const gift = result[0];

    if (gift.estado === 'canjeado') {
      return error409('Este certificado ya ha sido canjeado.');
    }

    if (gift.estado === 'expirado') {
      return error410('Este certificado ha caducado.');
    }

    await db
      .update(giftCertificates)
      .set({ estado: 'canjeado', canjeadoEn: new Date() })
      .where(eq(giftCertificates.id, gift.id));

    return NextResponse.json({
      success: true,
      message: `¡Bienvenido a Tinkilabs, ${gift.nombreDestinatario}!`,
      product: gift.producto,
      durationMonths: gift.duracionMeses,
    });
  } catch (error) {
    console.error('Error al canjear gift certificate:', error);
    return error500();
  }
}
