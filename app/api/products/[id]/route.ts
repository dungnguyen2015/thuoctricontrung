import { query, db } from '@/lib/db';
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
  const post = await query('SELECT * FROM products WHERE id = ?', [id]);
  return NextResponse.json(post[0]);
}

export async function PUT(req: NextRequest, { params }: Props) {

  const product = await req.json();
  const connection = await db.getConnection();

  try {

    await connection.beginTransaction();

    // 1. Cập nhật thông tin chính sản phẩm SỬ DỤNG PARAMETERIZED QUERY
    const updateSql = `
      UPDATE products SET 
        name = ?, 
        slug = ?,
        content = ?, 
        ingredients = ?, 
        description = ?, 
        status = ?,
        price = ?,
        updated_at = ?
      WHERE id = ?
    `;
    
    await connection.query(updateSql, [
      product.name,
      product.slug,
      product.content,
      JSON.stringify(product.ingredients),
      product.description,
      product.status,
      product.capacities[0].price,
      product.updated_at,
      product.id
    ]);

    // 2. Xóa tất cả capacity cũ tạo mới
    await connection.query(`DELETE FROM product_capacities WHERE product_id = ?`, [product.id]);

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
    await connection.query('DELETE FROM product_images WHERE product_id = ?', [product.id]);
    
    if (product.images.length > 0) {
      const imageValues = product.images.map((img, index) => [
        product.id,
        img,
        index === 0 ? 1 : 0
      ]);
      
      const imageSql = `
        INSERT INTO product_images 
          (product_id, image_url, is_primary) 
        VALUES ?
      `;
      
      await connection.query(imageSql, [imageValues]);
    }

    // 4. Xóa tất cả danh mục cũ tạo mới
    if (product.categories && product.categories.length > 0) {
        // Xóa các liên kết cũ
        await connection.query(
          'DELETE FROM category_product WHERE product_id = ?',
          [product.id]
        );

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
    return NextResponse.json({ success: true, message: 'Cập nhật sản phẩm thành công' });
   } catch (error) {
      await connection.rollback();
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      return NextResponse.json({ success: false, message: 'Cập nhật sản phẩm thất bại' }, { status: 500 });
    } finally {
       connection.release();
    }       
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

  // Xóa sản phẩm cần phải xóa
  // Ảnh sản phẩm
  // Xóa các đặc điểm của sản phẩm
  // Cuối cùng xóa sản phẩm

  try {
    // Xóa ảnh
    const [images]: any = await query('SELECT image_url FROM product_images WHERE product_id = ?', [id]);
    
    for (let i = 0; i < images.length; i++) {
      if (images.image_url != '') {
        const imagePath = path.join(process.cwd(), 'uploads', images.image_url.replace(/^\/uploads\//, ''));
        await unlink(imagePath);
      }
    }

    const resulti = await query('DELETE FROM product_images WHERE product_id = ?', [id]);
    const resultc = await query('DELETE FROM product_capacities WHERE product_id = ?', [id]);
    const result = await query('DELETE FROM products WHERE id = ?', [id]);
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
  
    return NextResponse.json(
      { success: false, message: 'Error deleting post' },
      { status: 500 }
    );
  }
}