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

// Rutas públicas (sin auth)
const PUBLIC_PATHS = [
  '/',
  '/acceso',
  '/login',
  '/canjear',
  '/gracias',
  '/comparar',
  '/nuestro-logo',
  '/blog',
  '/actividades',
  '/resenas',
  '/nosotros',
  '/campamento',
  '/repuestos',
  '/concepto-b',
  '/concepto-c',
  '/concepto-d',
  '/empezar',
];

// Prefijos públicos
const PUBLIC_PREFIXES = [
  '/api/',
  '/_next/',
  '/images/',
  '/canjear/',
  '/blog/',
  '/actividades/',
  '/ayuda',
  '/terminos',
  '/privacidad',
  '/aviso-legal',
  '/devoluciones',
  '/envios',
  '/favicon.ico',
  '/icon.png',
  '/icon.svg',
  '/robots.txt',
  '/sitemap.xml',
];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const users = getUsers();

  // Sin usuarios configurados: acceso libre (dev local)
  if (users.length === 0) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get('tinkilabs_auth');
  if (!authCookie) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const [name, password] = authCookie.value.split(':');
  if (!name || !password) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const user = users.find((u) => u.name === name && u.password === password);
  if (!user) {
    // Si el usuario no está en ACCESS_USERS, podría ser un cliente registrado
    // Permitimos acceso si name tiene formato email (contiene @)
    if (name.includes('@')) {
      return NextResponse.next();
    }
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)).*)',
  ],
};
