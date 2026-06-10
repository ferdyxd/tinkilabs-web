import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db, schema } from '@/db';
import { eq, and } from 'drizzle-orm';

async function getUserId(request: NextRequest): Promise<number | null> {
  const authCookie = request.cookies.get('tinkilabs_auth');
  if (!authCookie) return null;
  const [email] = authCookie.value.split(':');
  if (!email) return null;
  const [u] = await db.select({ id: schema.usuarios.id }).from(schema.usuarios).where(eq(schema.usuarios.email, email)).limit(1);
  return u?.id || null;
}

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const ninos = await db
    .select({ id: schema.ninos.id, nombre: schema.ninos.nombre, fechaNacimiento: schema.ninos.fechaNacimiento })
    .from(schema.ninos)
    .where(eq(schema.ninos.usuarioId, userId))
    .orderBy(schema.ninos.nombre);

  return NextResponse.json({ ninos });
}

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const { nombre, fechaNacimiento } = await request.json();
  if (!nombre || !fechaNacimiento) {
    return NextResponse.json({ error: 'Nombre y fecha son obligatorios' }, { status: 400 });
  }

  const [nino] = await db.insert(schema.ninos).values({ usuarioId: userId, nombre, fechaNacimiento }).returning();
  return NextResponse.json({ nino }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  await db.delete(schema.ninos).where(and(eq(schema.ninos.id, parseInt(id)), eq(schema.ninos.usuarioId, userId)));
  return NextResponse.json({ success: true });
}
