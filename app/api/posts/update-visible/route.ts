import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // file kết nối DB
import { RowDataPacket } from 'mysql2';

export async function POST(req: Request) {
  const { id, visible } = await req.json();

  if (!id || typeof visible !== 'number') {
    return NextResponse.json({ success: false, message: 'Thiếu dữ liệu' }, { status: 400 });
  }

  try {
    await db.execute('UPDATE posts SET visible = ? WHERE id = ?', [visible, id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lỗi DB:', err);
    return NextResponse.json({ success: false, message: 'Lỗi cơ sở dữ liệu' }, { status: 500 });
  }
}