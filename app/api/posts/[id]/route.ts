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

  const formData = await req.formData();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const image_url = formData.get('image_url') as string;
  const visible = parseInt(formData.get('visible') as string);
  const description = formData.get('description') as string;
  const { id } = await params;

  let sql: string;
  let values: any[];
  if (image_url) {
      sql = `
        UPDATE posts
        SET title = ?, slug = ?, content = ?, image_url = ?, visible = ?, description = ?
        WHERE id = ?
      `;
      values = [title, slug, content, image_url, visible, description, id];
    } else {
      sql = `
        UPDATE posts
        SET title = ?, slug = ?, content = ?, visible = ?, description = ?
        WHERE id = ?
      `;
      values = [title, slug, content, visible, description, id];
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
    //const [post]: any = await query('SELECT image_url FROM posts WHERE id = ?', [id]);
    const result = await query('DELETE FROM posts WHERE id = ?', [id]);
    //const imagePath = path.join(process.cwd(), 'uploads', post.image_url.replace(/^\/uploads\//, ''));
    //await unlink(imagePath);
    return NextResponse.json({ success: true, result });
  } catch (error) {
  
    return NextResponse.json(
      { success: false, message: 'Error deleting post' },
      { status: 500 }
    );
  }
}