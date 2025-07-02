import { query } from "./db";
import { cachedQuery } from "./cache";
import { unstable_cache as cache } from 'next/cache';

const table = 'categories';

export async function getCategoryBySlug(slug: string) {
  try {

    const rows: any = await cachedQuery(
      `category_${slug}`,
      `SELECT * FROM ${table} WHERE slug = ?`,
      [slug], 
      0 // cache 0.3 giây
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Lỗi truy vấn danh mục", error);
    return null;
  }
}

export async function getCategory() {
  try {

    const rows: any = await cachedQuery(
      `category`,
      `SELECT * FROM ${table}`,[], 
      0 // cache 0.3 giây
    );
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error("Lỗi truy vấn danh mục", error);
    return null;
  }
}