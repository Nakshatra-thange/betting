// /src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Rate limiting for all API routes
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', '99');
    return response;
  }

  // Protect premium prediction APIs
  if (
    pathname.startsWith('/api/predictions/premium') ||
    pathname.startsWith('/api/predictions/unlimited')
  ) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    } catch {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
  }

  // Protect dashboard pages from unauthenticated access
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*'
  ]
};


