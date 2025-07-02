import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdirSync } from 'fs';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const alt = formData.get('alt');

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  if (!file || !file.name) {
    return NextResponse.json({ success: false, message: 'Không có file' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = new Uint8Array(bytes);
  const filename = `${file.name}`;
  const slug = `/uploads/${filename}`;
  const uploadDir = path.join(process.cwd(), 'uploads');

  mkdirSync(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);

  await db.execute('INSERT INTO images (slug, alt) VALUES (?, ?)', [slug, alt]);

  return NextResponse.json({ success: true, slug });
}