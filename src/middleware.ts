import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;
    console.log('Middleware triggered for URL:', url);

    const isPublicPath = url === '/login' || url === '/signup' || url === '/verify' || url === '/reset-password';

    const token = request.cookies.get('token')?.value || '';

    // If not logged in and accessing private page
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // If logged in and accessing public page
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile/(.*)',
  ]
}
