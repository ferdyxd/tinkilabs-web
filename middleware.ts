import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface User {
  name: string;
  password: string;
}

function getUsers(): User[] {
  try {
    const raw = process.env.ACCESS_USERS;
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function middleware(request: NextRequest) {
  const users = getUsers();

  // Si no hay usuarios configurados, permitir acceso libre (dev local)
  if (users.length === 0) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get('tinkilabs_auth');
  if (!authCookie) {
    return redirectToAcceso(request);
  }

  // La cookie almacena "nombre:contraseña"
  const [name, password] = authCookie.value.split(':');
  const user = users.find((u) => u.name === name && u.password === password);

  if (!user) {
    return redirectToAcceso(request);
  }

  return NextResponse.next();
}

function redirectToAcceso(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/acceso';
  url.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/productos/:path*'],
};
