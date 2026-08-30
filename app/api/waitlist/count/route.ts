import { NextResponse } from 'next/server';

/**
 * Devuelve cuántas plazas de Fundador quedan.
 *
 * Lee el número real de contactos de la lista de espera en Brevo (lista 3).
 * Nunca inventa el número: si Brevo no está configurado o falla, devuelve
 * `disponible: false` y la landing muestra "100 plazas" sin contador.
 */

export const revalidate = 300; // 5 min de caché

const TOTAL_PLAZAS = 100;
const BREVO_LIST_ID = 3;

export async function GET() {
  const brevoKey = process.env.BREVO_API_KEY;

  if (!brevoKey) {
    return NextResponse.json({ disponible: false, total: TOTAL_PLAZAS });
  }

  try {
    const res = await fetch(
      `https://api.brevo.com/v3/contacts/lists/${BREVO_LIST_ID}`,
      {
        headers: { 'api-key': brevoKey, accept: 'application/json' },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ disponible: false, total: TOTAL_PLAZAS });
    }

    const data = await res.json();
    const inscritos = Number(data.totalSubscribers ?? data.uniqueSubscribers ?? 0);
    const restantes = Math.max(0, TOTAL_PLAZAS - inscritos);

    return NextResponse.json({
      disponible: true,
      total: TOTAL_PLAZAS,
      inscritos,
      restantes,
    });
  } catch {
    return NextResponse.json({ disponible: false, total: TOTAL_PLAZAS });
  }
}
