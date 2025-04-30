import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register', '/unauthorized'];

// Define role-based access control
const roleAccess: Record<string, string[]> = {
  regular: ['/dashboard', '/transactions', '/bills', '/savings', '/settings', '/loans'],
  premium: ['/dashboard', '/transactions', '/bills', '/savings', '/settings', '/premium-features', '/loans'],
  admin: ['/admin-dashboard', '/transactions', '/bills', '/savings', '/settings', '/admin', '/loans'],
  bank_manager: ['/dashboard', '/transactions', '/bills', '/savings', '/settings', '/bank', '/loans'],
  loan_distributor: ['/dashboard', '/transactions', '/bills', '/savings', '/settings', '/loans'],
  financial_advisor: ['/dashboard', '/transactions', '/bills', '/savings', '/settings', '/advice', '/loans']
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('Middleware - Pathname:', pathname);

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    console.log('Middleware - Public route, allowing access');
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get('token')?.value;
  console.log('Middleware - Token present:', !!token);

  // If no token, redirect to home
  if (!token) {
    console.log('Middleware - No token, redirecting to home');
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Verify the token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
    const { payload } = await jwtVerify(token, secret);
    
    // Check if user has access to the requested route
    const userRole = payload.role as string;
    const normalizedPath = pathname.replace('/(dashboard)/', '/');
    const hasAccess = roleAccess[userRole]?.some(route => normalizedPath.startsWith(route));
    console.log('Middleware - Has access:', hasAccess);

    if (!hasAccess) {
      // If this is the first request after login (coming from /login), allow access to dashboard
      const referer = request.headers.get('referer');
      if (pathname === '/dashboard' && referer?.includes('/login')) {
        return NextResponse.next();
      }
      console.log('Middleware - No access, redirecting to unauthorized');
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Add user info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId as string);
    requestHeaders.set('x-user-role', userRole);

    console.log('Middleware - Allowing access to protected route');
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Middleware - Token verification failed:', error);
    // If token is invalid, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 