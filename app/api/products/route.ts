import { NextResponse, NextRequest } from 'next/server';
import { getPosts, getTotalPosts } from '@/lib/posts';
import { query, db } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');

  const posts = await getPosts(page);
  const total = await getTotalPosts();

  return NextResponse.json({ posts, total });
}


export async function POST(req: NextRequest) {

  const product = await req.json();
  const connection = await db.getConnection();

  try {

    await connection.beginTransaction();

    // 1. Thêm thông tin sản phẩm   
    const sql = `
    INSERT INTO products (name, slug, content, ingredients, description, status, price, created_at )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result]  = await connection.query(sql, [
      product.name,
      product.slug,
      product.content,
      JSON.stringify(product.ingredients),
      product.description,
      product.status,
      product.capacities[0].price,
      product.created_at
    ]);

    product.id = (result as ResultSetHeader).insertId;

    // 2.
    if (product.capacities.length > 0) {
      const capacityValues = product.capacities.map(cap => [
        product.id,
        cap.capacity,
        cap.price,
        cap.discount_price,
        cap.in_stock ? 1 : 0
      ]);
      
      const capacitySql = `
        INSERT INTO product_capacities 
          (product_id, capacity, price, discount_price, in_stock) 
        VALUES ?
      `;
      
      await connection.query(capacitySql, [capacityValues]);
    }

    // 3. Xóa và cập nhật hình ảnh sản phẩm - SỬA $1 THÀNH ?
    if (product.images.length > 0) {
      const imageValues = product.images.map(img => [
        product.id,
        img,
        img === product.primary_image ? 1 : 0
      ]);
      
      const imageSql = `
        INSERT INTO product_images 
          (product_id, image_url, is_primary) 
        VALUES ?
      `;
      
      await connection.query(imageSql, [imageValues]);
    }

    // 3. Xóa tất cả danh mục cũ tạo mới
    if (product.categories && product.categories.length > 0) {
        
        if (product.categories.length > 0) {
        const categoryValues = product.categories.map(cate => [
          cate.category_id,
          product.id
        ]);

        const categorySql = `
          INSERT INTO category_product 
            (category_id, product_id) 
          VALUES ?
        `;
        await connection.query(categorySql, [categoryValues]);
      }      
    }

    await connection.commit();
    return NextResponse.json({ success: true, message: 'Thêm mới sản phẩm thành công', product_id: product.id });
   } catch (error) {
      await connection.rollback();
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      return NextResponse.json({ success: false, message: 'Thêm mới sản phẩm thất bại' }, { status: 500 });
    } finally {
       connection.release();
    }       
}
