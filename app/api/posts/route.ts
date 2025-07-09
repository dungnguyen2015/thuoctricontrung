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
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const image_url = formData.get('image_url') as string;
    const visible = parseInt(formData.get('visible') as string);
    const description = formData.get('description') as string;

    if (!title || !slug || !content || !image_url || isNaN(visible) || !description) {
      return NextResponse.json({ success: false, error: 'Thiếu dữ liệu' }, { status: 400 });
    }

    const sql = `
      INSERT INTO posts (title, slug, content, image_url, visible, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result: any = await query(sql, [title, slug, content, image_url, visible, description]);

    if (!result || result.affectedRows !== 1) {
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Created', id: result.insertId.toString() });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}