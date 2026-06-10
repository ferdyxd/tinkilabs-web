import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db, schema } from '@/db';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('tinkilabs_auth');
  if (!authCookie) {
    return NextResponse.json({ autenticado: false }, { status: 401 });
  }

  const [email, password] = authCookie.value.split(':');
  if (!email || !password) {
    return NextResponse.json({ autenticado: false }, { status: 401 });
  }

  const [usuario] = await db
    .select({
      id: schema.usuarios.id,
      email: schema.usuarios.email,
      nombre: schema.usuarios.nombre,
      direccion: schema.usuarios.direccion,
      ciudad: schema.usuarios.ciudad,
      cp: schema.usuarios.cp,
    })
    .from(schema.usuarios)
    .where(eq(schema.usuarios.email, email))
    .limit(1);

  if (!usuario || usuario.email!.split(':')[0] !== email) {
    return NextResponse.json({ autenticado: false }, { status: 401 });
  }

  // Buscar suscripción activa
  const [suscripcion] = await db
    .select({
      id: schema.suscripciones.id,
      linea: schema.suscripciones.linea,
      plan: schema.suscripciones.plan,
      estado: schema.suscripciones.estado,
      proximaRenovacion: schema.suscripciones.proximaRenovacion,
      precioMesCents: schema.suscripciones.precioMesCents,
    })
    .from(schema.suscripciones)
    .where(eq(schema.suscripciones.usuarioId, usuario.id))
    .limit(1);

  return NextResponse.json({
    autenticado: true,
    ...usuario,
    suscripcion: suscripcion || null,
  });
}
