import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl?.pathname || '';

    const isPublicPath = ['/login', '/register'];

    if (!isPublicPath.includes(path)) {
        const token = request.cookies.get("authorizationToken")?.value || "";

        if (!token) {

            return NextResponse.rewrite(new URL('/login', request.url));
        } else {

            return NextResponse.rewrite(new URL('/', request.url))
        }
    }
    const response = NextResponse.next({
        request: {
            // New request headers
            headers: request.headers,
        },
    })
    // If the path is in the public paths, continue with the request
    return response
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