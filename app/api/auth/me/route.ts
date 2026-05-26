import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('tinkilabs_auth');
  if (!authCookie) {
    return NextResponse.json({ name: null }, { status: 401 });
  }

  const [name] = authCookie.value.split(':');
  return NextResponse.json({ name });
}
