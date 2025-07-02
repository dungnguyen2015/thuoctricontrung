import { query } from "./db";
import { Post } from "@/types";
import { Product } from "@/types";

export async function getAllPosts({ offset = 0, limit = 10 }: { offset?: number | string, limit?: number | string }) {
  const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : limit;
  const parsedOffset = typeof offset === 'string' ? parseInt(offset, 10) : offset;
  const sql = `SELECT * FROM posts ORDER BY created_at DESC LIMIT ${parsedLimit} OFFSET ${parsedOffset}`;

  const rows: any = await query(sql);
  return rows as any[];
}

export async function getAllImages({ offset = 0, limit = 10 }: { offset?: number | string, limit?: number | string }) {
  const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : limit;
  const parsedOffset = typeof offset === 'string' ? parseInt(offset, 10) : offset;
  const sql = `SELECT * FROM images ORDER BY id DESC LIMIT ${parsedLimit} OFFSET ${parsedOffset}`;
  const rows: any = await query(sql);
  return rows as any[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const rows: any = await query(`SELECT * FROM posts WHERE slug = ?`, [slug]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Lỗi truy vấn bài viết:", error);
    return null;
  }
}


export async function getTotalPosts() {
  const rows = await query('SELECT COUNT(*) as count FROM posts');
  return (rows as any[])[0].count;
} 

// Đếm tổng số dòng cho admin
export async function getTotalProducts() {
  const rows = await query('SELECT COUNT(*) as count FROM products');
  return (rows as any[])[0].count;
} 

// Lấy tổng ảnh cho bài viết
export async function getTotalImages() {
  const rows = await query('SELECT COUNT(*) as count FROM images');
  return (rows as any[])[0].count;
} 

export async function getAllProducts({ offset = 0, limit = 10 }: { offset?: number | string, limit?: number | string }
) : Promise<Product[]>  {
  try {
    // Tạo cache key dựa trên các tham số
    const sql = `SELECT * FROM products
       ORDER BY created_at DESC
       LIMIT ${limit} OFFSET ${offset}`;
    
    // Truy vấn sản phẩm
    const productRows: any = await query(sql);
    if (productRows.length === 0) {
      return [];
    }

    // Lấy tất cả ID sản phẩm
    const productIds = productRows.map((p: any) => p.id);

    // Truy vấn hình ảnh cho tất cả sản phẩm
    const imageRows: any = await query(`SELECT product_id, image_url, is_primary 
       FROM product_images 
       WHERE product_id IN (${productIds})`
      );

    // Truy vấn danh mục

    const categoryRows: any = await query(`SELECT category_id, product_id 
       FROM category_product 
       WHERE product_id IN (${productIds})`
      );


    // Truy vấn kích thước cho tất cả sản phẩm
    const capacityRows: any = await query(`SELECT product_id, capacity, price, discount_price, in_stock 
       FROM product_capacities 
       WHERE product_id IN (${productIds})`
      );

    // Gom nhóm hình ảnh theo product_id
    const imagesByProductId: Record<number, any[]> = {};
    imageRows.forEach((img: any) => {
      if (!imagesByProductId[img.product_id]) {
        imagesByProductId[img.product_id] = [];
      }
      imagesByProductId[img.product_id].push(img);
    });

    // Gom nhóm danh mục theo product_id
    const categoriesByProductId: Record<number, any[]> = {};
    categoryRows.forEach((cate: any) => {
      if (!categoriesByProductId[cate.product_id]) {
        categoriesByProductId[cate.product_id] = [];
      }
      categoriesByProductId[cate.product_id].push(cate);
    });


    // Gom nhóm kích thước theo product_id
    const capacitiesByProductId: Record<number, any[]> = {};
    capacityRows.forEach((cap: any) => {
      if (!capacitiesByProductId[cap.product_id]) {
        capacitiesByProductId[cap.product_id] = [];
      }
      capacitiesByProductId[cap.product_id].push(cap);
    });

    // Tạo đối tượng sản phẩm hoàn chỉnh
    const products: Product[] = productRows.map((product: any) => {
      const images = imagesByProductId[product.id] || [];
      const capacities = capacitiesByProductId[product.id] || [];
      const categories = categoriesByProductId[product.id] || [];
      
      // Tìm ảnh chính (primary) hoặc lấy ảnh đầu tiên
      const primaryImage = images.find(img => img.is_primary) || images[0];
      
      // Chuyển đổi capacities thành object với key là kích thước
      const capacitiesArray = capacities.map(cap => ({
        capacity: cap.capacity,
        price: cap.price,
        discount_price: cap.discount_price ?? cap.price,
        in_stock: !!cap.in_stock,
      }));

      // Chuyển đổi danh muc thành object với key là kích thước
      const categoriesArray = categories.map(cate => ({
        category_id: cate.category_id,
        product_id: cate.product_id
      }));

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        content: product.content,
        ingredients: JSON.parse(product.ingredients || '[]'),
        description: product.description,
        status: product.status,
        created_at: product.created_at,
        primary_image: primaryImage?.image_url || null,
        images: images.map(img => img.image_url),
        capacities: capacitiesArray,
        // Thêm thông tin về kích thước đầu tiên nếu cần
        first_capacity: capacities[0]?.capacity || null,
        first_price: capacities[0]?.price || 0,
        first_discount_price: capacities[0]?.discount_price || capacities[0]?.price || 0,
        categories: categoriesArray,
      };
    });

    return products;

  } catch (error) {
    console.error("Lỗi truy vấn sản phẩm", error);
    return [];
  }
}


export async function updateProduct(productData) {
  const rows = await query('SELECT COUNT(*) as count FROM products');
  return (rows as any[])[0].count;
} 