import { NextResponse, NextRequest } from 'next/server';
import { query, db } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import {getCategory} from '@/lib/categories';


export async function GET(req: NextRequest) {
  
  const rows = await getCategory();
  return NextResponse.json(rows);
}