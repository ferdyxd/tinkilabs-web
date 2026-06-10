import { NextResponse } from 'next/server';
import { db, schema } from '@/db';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, nombre, apellido, password, newsletter } = await request.json();

    if (!email || !nombre || !password) {
      return NextResponse.json(
        { error: 'Email, nombre y contraseña son obligatorios' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existente = await db
      .select({ id: schema.usuarios.id })
      .from(schema.usuarios)
      .where(eq(schema.usuarios.email, email.toLowerCase().trim()))
      .limit(1);

    if (existente.length > 0) {
      return NextResponse.json(
        { error: 'Ya existe una cuenta con este email. Prueba a iniciar sesión.' },
        { status: 409 }
      );
    }

    // Crear usuario (la contraseña se guarda en el campo authProviderId por simplicidad — en producción usar hash)
    const [usuario] = await db
      .insert(schema.usuarios)
      .values({
        email: email.toLowerCase().trim(),
        nombre: nombre.trim(),
        apellido: (apellido || '').trim() || null,
        newsletter: newsletter !== false,
        authProvider: 'email',
        authProviderId: password, // TODO: bcrypt en producción
      })
      .returning({ id: schema.usuarios.id, email: schema.usuarios.email, nombre: schema.usuarios.nombre });

    // Crear sesión
    const token = randomUUID();
    await db.insert(schema.sesiones).values({
      usuarioId: usuario.id,
      token,
      expiraEn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
    });

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
    console.error('Register error:', err);
    return NextResponse.json(
      { error: 'No pudimos crear tu cuenta. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}
