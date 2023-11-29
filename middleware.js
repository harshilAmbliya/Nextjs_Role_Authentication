
import Cookies from 'js-cookie';
import { NextResponse } from 'next/server'
// import getToken from './libs/getToken';


// This function can be marked `async` if using `await` inside
const token = ''

export function middleware(request) {




    const path = request.url.pathname;
    const isPublicPath = ['/', 'login', 'register']

    if (!isPublicPath.includes(path)) {

        const token = Cookies.set("authorizationToken")
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        } else {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }
    }

    // If the path is in the public paths, continue with the request
    return request.next();

}


export const config = {
    matcher: ['/', '/login', '/register'],
}