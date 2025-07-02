'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from "@/types";
import VisibilitySelectProduct from './VisibilitySelectProduct';
import { useProductContext } from '@/app/admin/contexts/ProductContext';


export default function ProductTable() {

  const { products, setProducts,showModal, hideModal, setSelectedProduct} = useProductContext();

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 20,
    totalPages: 0,
  });

 useEffect(() => {
  fetch(`/api/admin/products?page=${page}&limit=${pagination.limit}`)
    .then(res => res.json())
    .then(data => {
      setProducts(data.data);
      setPagination(data.pagination);
    });
}, [page]);

 const setNewProduct = () => {
    setSelectedProduct({
      id: undefined,
      name: "",
      first_price: 0,
      first_discount_price: 0,
      slug: "",
      content: "",
      capacities: [{ capacity: "", price: 0, discount_price: 0, in_stock: true }],
      ingredients: [""],
      description: "",
      images: [""],
      status: "hidden",
      stock_status: "in_stock",
      categories: []

    });
  };

  const handleDeleteProduct = async (id: number | undefined) => {
      if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (data.success) {
          alert('Xóa thành công!');
          setProducts(products.filter(p => p.id !== id));
        } else {
          alert(`Lỗi khi xóa: ${data.message || 'Không rõ lỗi'}`);
        }
      } catch (error) {
      
        alert('Xảy ra lỗi khi kết nối đến server.');
      }
    };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Sản Phẩm</h1>
          <button 
              onClick={() => {
                showModal();
                setNewProduct();
               
              }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Thêm Sản Phẩm
          </button>
      </div>
      <div className="overflow-x-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-md object-cover" 
                          src={product.primary_image} 
                          alt={product.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{(product.first_discount_price > 0 ? product.first_discount_price : product.first_price).toLocaleString('vi-VN')}₫</div>
                    {product.first_discount_price > 0 && (
                      <>
                    <div className="text-sm text-gray-500 line-through">{product.first_price.toLocaleString('vi-VN')}₫</div>
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.stock_status}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <VisibilitySelectProduct initialValue={product.status} id={product.id} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.created_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => {
                        setSelectedProduct(product);
                        showModal();
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2 mt-4 text-right">
          <button className="text-blue-600"
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page <= 1}
          >
            Trang trước
          </button>
          <span>Trang {page} / {pagination.totalPages}</span>
          <button className="text-blue-600"
            onClick={() => setPage(prev => Math.min(pagination.totalPages, prev + 1))}
            disabled={page >= pagination.totalPages}
          >
            Trang sau
          </button>
        </div>
      </div>
    </ >
  );
}