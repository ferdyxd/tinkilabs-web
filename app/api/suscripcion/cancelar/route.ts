import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db, schema } from '@/db';
import { eq, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const authCookie = request.cookies.get('tinkilabs_auth');
  if (!authCookie) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  const [email] = authCookie.value.split(':');

  const [usuario] = await db.select({ id: schema.usuarios.id }).from(schema.usuarios).where(eq(schema.usuarios.email, email)).limit(1);
  if (!usuario) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

  await db
    .update(schema.suscripciones)
    .set({ estado: 'cancelada' })
    .where(and(eq(schema.suscripciones.usuarioId, usuario.id), eq(schema.suscripciones.estado, 'activa')));

  return NextResponse.json({ success: true });
}
