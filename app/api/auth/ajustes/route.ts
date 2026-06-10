import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db, schema } from '@/db';
import { eq } from 'drizzle-orm';

export async function PUT(request: NextRequest) {
  const authCookie = request.cookies.get('tinkilabs_auth');
  if (!authCookie) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  const [email] = authCookie.value.split(':');

  const { nombre, direccion, ciudad, cp } = await request.json();

  await db
    .update(schema.usuarios)
    .set({ nombre, direccion, ciudad, cp })
    .where(eq(schema.usuarios.email, email));

  return NextResponse.json({ success: true });
}
