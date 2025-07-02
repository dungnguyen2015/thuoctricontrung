import { query } from "./db";
import { cachedQuery } from "./cache";
import { Post } from "@/types";
import { unstable_cache as cache } from 'next/cache';

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const rows: any = await cachedQuery(
      `post_${slug}`,
      `SELECT * FROM posts WHERE slug = ? AND visible = 1`,
      [slug], 
      30000 // cache 0.3 giây
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Lỗi truy vấn bài viết:", error);
    return null;
  }
}

export async function getPosts(page: number, limit = 6) {
  
  const offset = (page - 1) * limit;
  const sql = `SELECT * FROM posts WHERE visible = 1 ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

  if (isNaN(limit) || isNaN(offset)) {
    throw new Error('limit hoặc offset không hợp lệ');
  }
  const rows = await query(sql);
  return rows as any[];
}

export async function getTotalPosts() {
  const [rows] = await query('SELECT COUNT(*) as count FROM posts WHERE visible = 1');
  return (rows as any[])[0].count;
}

export async function getAllPosts() {
  const [rows] = await query('SELECT * FROM posts WHERE visible = 1 ORDER BY created_at DESC');
  return rows as any[];
}

export const getTotalPostCount = cache(
  async () => {
    try {
      const result = await query<{ total: number }[]>(`
        SELECT COUNT(id) as total 
        FROM posts USE INDEX (status_created_at_idx)
        WHERE visible = 1
      `);
      
      return result[0]?.total || 0;
    } catch (error) {
      console.error('Failed to fetch article count:', error);
      return 0;
    }
  },
  ['total-posts'], // Cache key
  {
    tags: ['posts'], // Revalidate khi có thay đổi
    revalidate: 3600 // 1 hour
  }
);

export async function getCachedPosts(page: number, limit: number) {

  const offset = (page - 1) * limit;
  const sql = `SELECT * FROM posts WHERE visible = 1 ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

  try {
      const rows = await cachedQuery(
        `posts_list_${page}_${limit}`,
        sql
      );
      return rows || [];
    } catch (error) {
      console.error("Chi tiết lỗi:", {
        error,
        queryParams: { limit, offset },
        types: {
          limit: typeof limit,
          offset: typeof offset
        }
      });
      return [];
    }
}

/*
export async function getCachedPosts(page: number, PAGE_SIZE: number) {
  // Đảm bảo các giá trị là số nguyên
  const limit = Number(PAGE_SIZE);
  const offset = Number((page - 1) * PAGE_SIZE);

  try {
    const rows: any = await cachedQuery(
      `posts_list_${offset}`,
      `SELECT id, title, slug, content, image_url, created_at, description FROM posts 
      WHERE visible = ? 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?`,
      [1, limit, offset], // Truyền tham số đúng thứ tự và kiểu dữ liệu
      30000
    );
    return rows as any[];
  } catch (error) {
    console.error("Lỗi truy vấn bài viết:", error);
    return null;
  }
}

export const getCachedPosts2 = cache(
  async (pageStr: string, PAGE_SIZE_STR: string) => {

    const page = parseInt(pageStr, 10);
    const PAGE_SIZE = parseInt(PAGE_SIZE_STR, 10);

    // Kiểm tra nếu parse lỗi
    if (isNaN(page) || isNaN(PAGE_SIZE)) {
     
      return []; 
    }

    const offset = (page - 1) * PAGE_SIZE;

    const rows = await query(
      `SELECT 
        id, 
        title, 
        slug, 
        content, 
        image_url,
        created_at,
        description 
      FROM posts 
      WHERE visible = '1' 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?`,
      [PAGE_SIZE, offset]
    )
    return rows as any[];
  },
  ['posts-list'],
  {
    tags: ['posts'],
    revalidate: 7200 // 2 hours
  }
)
*/



