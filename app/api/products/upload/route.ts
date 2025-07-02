import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = new Uint8Array(bytes);
  const filename = `${file.name}`;
  const uploadPath = path.join(process.cwd(), 'uploads', filename);

  await writeFile(uploadPath, buffer);

  const url = `/uploads/${filename}`;
  return NextResponse.json({ url });
}