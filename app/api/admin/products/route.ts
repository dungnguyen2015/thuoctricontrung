export const dynamic = 'force-dynamic';

import { NextResponse, NextRequest } from 'next/server';
import { getAllProducts, getTotalProducts} from '@/lib/admin';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {

  try {

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const offset = (page - 1) * limit;
    const products = await getAllProducts({offset, limit});
    const total = await getTotalProducts();

    const response = NextResponse.json({
              data: products,
              pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
              }
            });
    response.headers.set('Cache-Control', 'no-store');
    return response;

  } catch (error) {
    console.log (error); 
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
  
}