import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD || 'admin_tinki_2026';

  if (password === expected) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
}
