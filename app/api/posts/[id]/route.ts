import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import * as React from 'react';
import { unlink } from 'fs/promises';
import path from 'path';

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function GET(_: NextRequest, { params }: Props) {
  const { id } = await params;
  const post = await query('SELECT * FROM posts WHERE id = ?', [id]);
  return NextResponse.json(post[0]);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const { id } = await params;
  const body = await req.json();

  if (body.image_url) {
    const {image_url} = body;
  }
  const { title, slug, content } = body;

  let sql: string;
  let values: any[];
  let image_url = null;
  if (image_url) {
      sql = `
        UPDATE posts
        SET title = ?, slug = ?, content = ?, image_url = ?
        WHERE id = ?
      `;
      values = [title, slug, content, image_url, id];
    } else {
      sql = `
        UPDATE posts
        SET title = ?, slug = ?, content = ?
        WHERE id = ?
      `;
      values = [title, slug, content, id];
    }
  
  await query(sql, values);
  return NextResponse.json({ success: true, message: 'Updated'});
}

export async function DELETE(
  req: NextRequest, { params }: Props
) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json(
      { error: "Invalid ID format" },
      { status: 400 }
    );
  }

  try {

    const [post]: any = await query('SELECT image_url FROM posts WHERE id = ?', [id]);
    console.log (post);
    const result = await query('DELETE FROM posts WHERE id = ?', [id]);
    

    const imagePath = path.join(process.cwd(), 'public', post.image_url.replace(/^\/+/, ''));
    await unlink(imagePath);

    return NextResponse.json({ success: true, result });
  } catch (error) {
  
    return NextResponse.json(
      { success: false, message: 'Error deleting post' },
      { status: 500 }
    );
  }
}