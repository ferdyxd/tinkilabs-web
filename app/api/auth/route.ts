import { NextResponse } from 'next/server';

interface User {
  name: string;
  password: string;
}

export async function POST(request: Request) {
  const { password } = await request.json();

  const raw = process.env.ACCESS_USERS;
  if (!raw) {
    return NextResponse.json(
      { error: 'Servidor no configurado' },
      { status: 500 }
    );
  }

  let users: User[];
  try {
    users = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: 'Configuración inválida' },
      { status: 500 }
    );
  }

  const user = users.find((u) => u.password === password);

  if (!user) {
    // Registrar intento fallido
    console.log(
      JSON.stringify({
        event: 'access_denied',
        timestamp: new Date().toISOString(),
        ip: request.headers.get('x-forwarded-for') || 'unknown',
      })
    );
    return NextResponse.json(
      { error: 'Contraseña incorrecta' },
      { status: 401 }
    );
  }

  // Registrar acceso exitoso
  console.log(
    JSON.stringify({
      event: 'access_granted',
      user: user.name,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    })
  );

  // Cookie: "nombre:contraseña"
  const response = NextResponse.json({
    success: true,
    name: user.name,
  });

  response.cookies.set('tinkilabs_auth', `${user.name}:${user.password}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });

  return response;
}
