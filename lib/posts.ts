import { db } from "./db";
import { Post } from "@/types";



export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const [rows]: any = await db.query("SELECT * FROM posts WHERE slug = ?", [
      slug,
    ]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Lỗi truy vấn bài viết:", error);
    return null;
  }
}


export async function getPosts(page: number, limit = 6) {
  const offset = (page - 1) * limit;
  const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
  return rows as any[];
}

export async function getTotalPosts() {
  const [rows] = await db.query('SELECT COUNT(*) as count FROM posts');
  return (rows as any[])[0].count;
}

export async function getAllPosts() {
  const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
  return rows as any[];
}


