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
  '/canjear',
  '/gracias',
];

// Prefijos públicos
const PUBLIC_PREFIXES = [
  '/api/',
  '/_next/',
  '/images/',
  '/canjear/',
  '/ayuda',
  '/terminos',
  '/privacidad',
  '/aviso-legal',
  '/devoluciones',
  '/envios',
  '/favicon.ico',
  '/icon.png',
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
    return NextResponse.redirect(new URL('/', request.url));
  }

  const [name, password] = authCookie.value.split(':');
  if (!name || !password) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const user = users.find((u) => u.name === name && u.password === password);
  if (!user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)).*)',
  ],
};
