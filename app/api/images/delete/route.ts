import { unlink } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { image_url, slug } = body;

  const filename = image_url || slug;
  if (!filename) {
    return NextResponse.json({ success: false, error: 'Thiếu thông tin ảnh' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'uploads', filename.replace(/^\/uploads\//, ''));
  
  try {
    await unlink(filePath);

    if (slug) {
      await db.execute('DELETE FROM images WHERE slug = ?', [slug]);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ success: false, error: 'Xóa ảnh thất bại!' }, { status: 500 });
  }
}