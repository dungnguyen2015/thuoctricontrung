import { query } from "./db";
import { cachedQuery } from "./cache";
import { Product } from "@/types";
import { unstable_cache as cache } from 'next/cache';

const table = 'products';
export async function getProductsByCategorySlug(slug: string){
  try {
    const rows: any = await cachedQuery(
      `products_${slug}`,
      `SELECT p.*, MIN(c.name) AS category_name, MIN(img.image_url) AS image_url, MIN(pc.discount_price) AS discount_price, MIN(pc.price) AS price FROM products p JOIN category_product cp ON 
      p.id = cp.product_id JOIN categories c ON c.id = cp.category_id JOIN product_images img ON p.id = img.product_id
      JOIN product_capacities pc ON p.id = pc.product_id WHERE p.status = 'active' AND img.is_primary = 1 AND c.slug = ? GROUP BY p.id;`,
      [slug], 
      0 // cache 0.3 giây
    );
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error("Lỗi truy vấn sản phẩm", error);
    return null;
  }
}

// Lấy sản phẩm cho người dùng
export async function getProductBySlug(slug: string) {
  try {

    const time = 0;
    const productRows: any = await cachedQuery(
      `product_${slug}`,
      `SELECT id, name, slug, ingredients, description, content FROM ${table} WHERE slug = ? LIMIT 1`,
      [slug], 
      time // cache 0.3 giây
    );
    if (productRows.length === 0) {
      return null;
    }
    const product = productRows[0];

    const imageRows: any = await cachedQuery(
      `image_${slug}`,
      `SELECT image_url, is_primary FROM product_images WHERE product_id = ?`,
      [product.id], 
      time // cache 0.3 giây
    );

    const capacityRows: any = await cachedQuery(
      `capacity_${slug}`,
      `SELECT capacity, price, discount_price, in_stock FROM product_capacities WHERE product_id = ?`,
      [product.id], 
      time // cache 0.3 giây
    );

    const data = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      content: product.content,
      ingredients: JSON.parse(product.ingredients || '[]'),
      description: product.description,
      image_url_first: imageRows[0].image_url,
      capacity_first: capacityRows[0].capacity,
      price_first: capacityRows[0].price,
      discount_price_first: capacityRows[0].discount_price ?? capacityRows[0].price,
      images: imageRows.map(img => img.image_url),
      capacities: capacityRows.reduce((acc, row) => {
        acc[row.capacity] = {
        original: row.price,
        sale: row.discount_price ?? row.price,
        in_stock: !!row.in_stock,
      };
        return acc;
      }, {} as Record<string, { original: number; sale: number }>),
    };
    return data;

  } catch (error) {
    console.error("Lỗi truy vấn danh mục", error);
    return null;
  }
}

export async function getProducts(page: number, limit = 6){

  const offset = (page - 1) * limit;
  const sql = `SELECT p.*, MIN(c.name) AS category_name, MIN(img.image_url) AS image_url, MIN(pc.discount_price) AS discount_price, MIN(pc.price) AS price FROM products p JOIN category_product cp ON 
      p.id = cp.product_id JOIN categories c ON c.id = cp.category_id JOIN product_images img ON p.id = img.product_id
      JOIN product_capacities pc ON p.id = pc.product_id WHERE p.status = 'active' AND img.is_primary = 1 GROUP BY p.id LIMIT ${limit} OFFSET ${offset}`;

  if (isNaN(limit) || isNaN(offset)) {
    throw new Error('limit hoặc offset không hợp lệ');
  }
  const rows = await query(sql);
  return rows as any[];

  try {
    const rows: any = await cachedQuery(
      `products_total`,
      sql,
      [], 
      0 // cache 0.3 giây
    );
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error("Lỗi truy vấn sản phẩm", error);
    return null;
  }
}

export const getTotalProductCount = cache(
  async () => {
    try {
      const result = await query<{ total: number }[]>(`
        SELECT COUNT(id) as total 
        FROM ${table}
        WHERE status = 'active'
      `);
      
      return result[0]?.total || 0;
    } catch (error) {
      console.error('Failed to fetch article count:', error);
      return 0;
    }
  },
  ['total-products'], // Cache key
  {
    tags: ['products'], // Revalidate khi có thay đổi
    revalidate: 3600 // 1 hour
  }
);
