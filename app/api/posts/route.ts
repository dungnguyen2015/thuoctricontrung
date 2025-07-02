import { NextResponse, NextRequest } from 'next/server';
import { getPosts, getTotalPosts } from '@/lib/posts';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');

  const posts = await getPosts(page);
  const total = await getTotalPosts();

  return NextResponse.json({ posts, total });
}


export async function POST(req: NextRequest) {
  const { title, slug, content, image_url, visible, description } = await req.json();

  const sql = `
    INSERT INTO posts (title, slug, content, image_url, visible, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const result: any = await query(sql, [title, slug, content, image_url, visible, description]);

  if (!result || result.affectedRows !== 1) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true, message: 'Created', id: result.insertId });
}