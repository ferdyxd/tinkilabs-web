import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { nombre, email, categoria, mensaje } = await request.json();

  if (!email || !mensaje) {
    return NextResponse.json({ error: 'Email y mensaje obligatorios' }, { status: 400 });
  }

  console.log(
    JSON.stringify({
      event: 'contact_form',
      nombre: nombre || '(sin nombre)',
      email,
      categoria: categoria || '(sin categoría)',
      mensaje,
      timestamp: new Date().toISOString(),
    })
  );

  // TODO: enviar email a soporte via Brevo cuando esté configurado
  return NextResponse.json({ success: true });
}
