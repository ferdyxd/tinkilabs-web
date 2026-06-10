import { NextResponse } from 'next/server';
import { db, schema } from '@/db';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son obligatorios' },
        { status: 400 }
      );
    }

    const [usuario] = await db
      .select({ id: schema.usuarios.id, email: schema.usuarios.email, nombre: schema.usuarios.nombre, authProviderId: schema.usuarios.authProviderId })
      .from(schema.usuarios)
      .where(eq(schema.usuarios.email, email.toLowerCase().trim()))
      .limit(1);

    if (!usuario || usuario.authProviderId !== password) {
      return NextResponse.json(
        { error: 'Email o contraseña incorrectos' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true, nombre: usuario.nombre });
    response.cookies.set('tinkilabs_auth', `${usuario.email}:${password}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'No pudimos iniciar sesión. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}
