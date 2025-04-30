import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/unauthorized'];

// Define role-based access control
const roleAccess: Record<string, string[]> = {
  regular: ['/dashboard', '/transactions', '/bills', '/savings', '/settings', '/loans'],
  premium: ['/dashboard', '/transactions', '/bills', '/savings', '/settings', '/premium-features', '/loans'],
  admin: ['/admin-dashboard', '/transactions', '/bills', '/savings', '/settings', '/admin', '/loans'],
  bank_manager: ['/dashboard', '/transactions', '/bills', '/savings', '/settings', '/bank', '/loans'],
  loan_distributor: ['/dashboard', '/transactions', '/bills', '/savings', '/settings', '/loans'],
  financial_advisor: ['/dashboard', '/transactions', '/bills', '/savings', '/settings', '/advice', '/loans']
};

// Define role-based dashboard paths
const roleDashboardPaths: Record<string, string> = {
  regular: '/dashboard',
  premium: '/dashboard',
  admin: '/admin-dashboard',
  bank_manager: '/dashboard',
  loan_distributor: '/dashboard',
  financial_advisor: '/dashboard'
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('Middleware - Pathname:', pathname);

  // Get token from cookie
  const token = request.cookies.get('token')?.value;
  console.log('Middleware - Token present:', !!token);

  // If no token and trying to access protected route, redirect to login
  if (!token && !publicRoutes.includes(pathname) && pathname !== '/') {
    console.log('Middleware - No token, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is authenticated and on root path, redirect to appropriate dashboard
  if (token && pathname === '/') {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
      const { payload } = await jwtVerify(token as string, secret);
      const userRole = payload.role as string;
      const dashboardPath = roleDashboardPaths[userRole] || '/dashboard';
      console.log('Middleware - Redirecting to dashboard:', dashboardPath);
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    } catch (error) {
      console.error('Middleware - Token verification failed:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow public routes and home page
  if (publicRoutes.includes(pathname) || pathname === '/') {
    console.log('Middleware - Public route, allowing access');
    return NextResponse.next();
  }

  try {
    // Verify the token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
    const { payload } = await jwtVerify(token as string, secret);
    
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
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
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