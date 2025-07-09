import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET!,
});

function extractPublicIdFromUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname.split('/');

    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return '';

    const publicParts = parts.slice(uploadIndex + 1); // sau 'upload'

    // Nếu phần đầu là version vxxxxxx thì loại bỏ
    if (publicParts[0].startsWith('v') && /^\d+$/.test(publicParts[0].slice(1))) {
      publicParts.shift();
    }

    const fileName = publicParts.pop() || '';
    const fileBase = fileName.split('.').slice(0, -1).join('.'); // bỏ đuôi .webp, .jpg

    return [...publicParts, fileBase].join('/');
  } catch (e) {
    return '';
  }
}

function isCloudinaryUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith('res.cloudinary.com');
  } catch (e) {
    return false; // URL không hợp lệ
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { image_url, slug } = body;

  const filename = image_url || slug;
  if (!filename) {
    return NextResponse.json({ success: false, error: 'Thiếu thông tin ảnh' }, { status: 400 });
  }

  try {

    if (isCloudinaryUrl(filename)) {
      const publicId = extractPublicIdFromUrl(filename);
      await cloudinary.uploader.destroy(publicId);

    } else {

      const filePath = path.join(process.cwd(), 'uploads', filename.replace(/^\/uploads\//, ''));
      await unlink(filePath);

    }
    
    if (slug) {
      await db.execute('DELETE FROM images WHERE slug = ?', [slug]);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ success: false, error: 'Xóa ảnh thất bại!' }, { status: 500 });
  }
}