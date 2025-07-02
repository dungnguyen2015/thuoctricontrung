// middleware.ts
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const AUTH_PAGES = ['/admin/login'];


export async function middleware(req: NextRequest) {

  const token = req.cookies.get('token')?.value;
  const pathname = req.nextUrl.pathname;
  const response = NextResponse.next();
  
  if (pathname.startsWith('/admin')) 
  {
    if (pathname !== '/admin/login') 
    {
      if (!token) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = '/admin/login';
        return NextResponse.redirect(loginUrl);
      }
      
      try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            return response;
        } catch (err) {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }
    }
  } else {

    if (pathname.match(/\.(ico|jpg|jpeg|png|webp|avif|svg)$/)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      }

       if (pathname === '/' || pathname.startsWith('/bai-viet/')) {
        response.headers.set(
          'Cache-Control',
          'public, s-maxage=3600, stale-while-revalidate=86400'
        );
      }
      // Preconnect to CDN
      const preconnectHeader = [
        '<https://cdn.trungdienlanh.com>; rel=preconnect; crossorigin',
        '<https://api.trungdienlanh.com>; rel=preconnect',
      ];
      response.headers.set('Link', preconnectHeader.join(', '));
      return response;
  }
  
}

export const config = {
  matcher: ['/((?!uploads|api|_next|favicon.ico).*)'],
};