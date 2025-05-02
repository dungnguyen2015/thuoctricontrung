import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL));
  res.cookies.set('token', '', { path: '/', expires: new Date(0) }); // xoá cookie
  
  return res;
}