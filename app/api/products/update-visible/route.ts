import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // file kết nối DB
import { RowDataPacket } from 'mysql2';

export async function POST(req: Request) {
  const { id, status } = await req.json();

  if (!id) {
    return NextResponse.json({ success: false, message: 'Thiếu dữ liệu' }, { status: 400 });
  }

  try {
    await db.execute('UPDATE products SET status = ? WHERE id = ?', [status, id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lỗi DB:', err);
    return NextResponse.json({ success: false, message: 'Lỗi cơ sở dữ liệu' }, { status: 500 });
  }
}