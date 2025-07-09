import { v2 as cloudinary, UploadApiResponse  } from 'cloudinary';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdirSync } from 'fs';
import { db } from '@/lib/db';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET!,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const alt = formData.get('alt');

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  if (!file || !file.name) {
    return NextResponse.json({ success: false, message: 'Không có file' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
   const originalName = file.name.split('.').slice(0, -1).join('.');


   try {
          const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { 
                 folder: 'uploads',
                 public_id: originalName, // giữ tên gốc
                 overwrite: true,
                 resource_type: 'image',
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result as UploadApiResponse); // ép kiểu tại đây
              }
            );

            stream.end(buffer);
          });

          const slug = uploadResult.secure_url;

          await db.execute('INSERT INTO images (slug, alt) VALUES (?, ?)', [slug, alt]);

          return NextResponse.json({ success: true, slug });
      } catch (error) {
        console.error('Upload error:', error);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
      }
}