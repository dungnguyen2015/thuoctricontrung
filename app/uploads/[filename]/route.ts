import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(req: Request, { params }: { params: { filename: string } }) {
  const filePath = path.join(process.cwd(), 'uploads', params.filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const file = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  }[ext] || 'application/octet-stream';

  return new NextResponse(file, {
    headers: { 'Content-Type': contentType },
  });
}