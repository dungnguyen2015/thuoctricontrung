'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProductContext } from '@/app/admin/contexts/ProductContext';
import dynamic from 'next/dynamic';
import { Editor } from '@tinymce/tinymce-react';
import { updateProduct } from '@/lib/admin';

const TinyEditor = dynamic(() => import('@/app/admin/components/TinyEditor'), {
  ssr: false,
});

export default function ModelUpdateProduct() {
  const {
    isModalOpen,
    setProducts,
    showModal,
    hideModal,
    setSelectedProduct,
    selectedProduct,
    products
  } = useProductContext();

  const [allCategories, setAllCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setAllCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

      fetchCategories();
    }, []);

  const addSize = () => {
    if (!selectedProduct) return;

    setSelectedProduct({
      ...selectedProduct,
      capacities: [
        ...selectedProduct.capacities, 
        { capacity: "", price: 0, discount_price: 0, in_stock: true }
      ]
    });
  };

  const addIngredient = () => {
    if (!selectedProduct) return;
    setSelectedProduct({
      ...selectedProduct,
      ingredients: [
        ...(selectedProduct.ingredients || []),
        ""
      ]
    });
  };

  const addImage = () => {
    if (!selectedProduct) return;
    setSelectedProduct({
      ...selectedProduct,
      images: [
        ...(selectedProduct.images || []),
        ""
      ]
    });
  };

  const handleCreateProduct = async() => {
    if (!selectedProduct) return;
    
    // Tạo bản sao để tránh mutate state trực tiếp
    const productToSave = { ...selectedProduct };
    
    if (productToSave.id) {
      productToSave.updated_at = new Date().toISOString().split('T')[0];
    } else {
      productToSave.created_at = new Date().toISOString().split('T')[0];
    }

    // Tính toán giá trị first_price
    if (productToSave.capacities.length > 0) {
      const first = productToSave.capacities[0];
      productToSave.first_price = first.price ?? first.discount_price ?? 0;
      productToSave.first_discount_price = first.discount_price ?? 0;
    } else {
      productToSave.first_price = 0;
      productToSave.first_discount_price = 0;
    }

    const endpoint = productToSave.id 
      ? `/api/products/${productToSave.id}` 
      : '/api/products';
      
    const method = productToSave.id ? 'PUT' : 'POST';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productToSave),
    });

    const data = await res.json();
  
    if (data.success) {
      alert(data.message);
      
      if (productToSave.id !== undefined) {
        const updatedProducts = products.map(p => 
          p.id === productToSave.id ? productToSave : p
        );
        setProducts(updatedProducts);
      } else {
        const newProductWithId = {
          ...productToSave,
          id: data.product_id
        };
        setProducts([...products, newProductWithId]);
      }

      hideModal();
      resetNewProductForm();
    } else {
      alert(data.message);
    }
  };

  const resetNewProductForm = () => {
    setSelectedProduct({
      id: undefined,
      name: "",
      first_price: 0,
      first_discount_price: 0,
      price: 0,
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

  const removeImage = (index: number) => {
    if (!selectedProduct || !selectedProduct.images) return;
    if (selectedProduct.images.length <= 1) return;
    
    const newImages = [...selectedProduct.images];
    newImages.splice(index, 1);
    
    setSelectedProduct({
      ...selectedProduct,
      images: newImages
    });
  };

  const removeSize = (index: number) => {
    if (!selectedProduct || !selectedProduct.capacities) return;
    if (selectedProduct.capacities.length <= 1) return;
    
    const newCapacities = [...selectedProduct.capacities];
    newCapacities.splice(index, 1);
    
    setSelectedProduct({
      ...selectedProduct,
      capacities: newCapacities
    });
  };

  const removeIngredient = (index: number) => {
    if (!selectedProduct || !selectedProduct.ingredients) return;
    if (selectedProduct.ingredients.length <= 1) return;
    
    const newIngredients = [...selectedProduct.ingredients];
    newIngredients.splice(index, 1);
    
    setSelectedProduct({
      ...selectedProduct,
      ingredients: newIngredients
    });
  };

  if (!isModalOpen || !selectedProduct) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedProduct.id ? 'Cập nhật sản phẩm' : 'Tạo mới sản phẩm'}
              </h3>
              <button 
                onClick={hideModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL sản phẩm</label>
                <input
                  type="text"
                  value={selectedProduct.slug}
                  onChange={(e) => setSelectedProduct({...selectedProduct, slug: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Nhập URL"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                <textarea
                  value={selectedProduct.description}
                  onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Mô tả sản phẩm (150 - 160 ký tự)..."
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Thành phần</label>
                  <button 
                    type="button"
                    onClick={addIngredient}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    + Thêm thành phần
                  </button>
                </div>
                {(selectedProduct.ingredients || []).map((ingredient, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => {
                        const newIngredients = [...(selectedProduct.ingredients || [])];
                        newIngredients[index] = e.target.value;
                        setSelectedProduct({...selectedProduct, ingredients: newIngredients});
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg mr-2"
                      placeholder="Nhập thành phần"
                    />
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100"
                      disabled={(selectedProduct.ingredients || []).length <= 1}
                      title="Xóa thành phần này"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Kích thước & Giá</label>
                  <button 
                    type="button"
                    onClick={addSize}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    + Thêm kích thước
                  </button>
                </div>
                {(selectedProduct.capacities || []).map((capacity, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="md:col-span-1">
                      <input
                        type="text"
                        value={capacity.capacity}
                        onChange={(e) => {
                          const newCapacities = [...(selectedProduct.capacities || [])];
                          newCapacities[index].capacity = e.target.value;
                          setSelectedProduct({...selectedProduct, capacities: newCapacities});
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Kích thước (ví dụ: 300ml)"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <input
                        type="number"
                        value={capacity.price}
                        onChange={(e) => {
                          const newCapacities = [...(selectedProduct.capacities || [])];
                          newCapacities[index].price = Number(e.target.value) || 0;
                          setSelectedProduct({...selectedProduct, capacities: newCapacities});
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Giá gốc"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <input
                        type="number"
                        value={capacity.discount_price}
                        onChange={(e) => {
                          const newCapacities = [...(selectedProduct.capacities || [])];
                          newCapacities[index].discount_price = Number(e.target.value) || 0;
                          setSelectedProduct({...selectedProduct, capacities: newCapacities});
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Giá khuyến mãi"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <select
                        value={capacity.in_stock ? "1" : "0"}
                        onChange={(e) => {
                          const newCapacities = [...(selectedProduct.capacities || [])];
                          newCapacities[index].in_stock = e.target.value === "1";
                          setSelectedProduct({...selectedProduct, capacities: newCapacities});
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="1">Còn hàng</option>
                        <option value="0">Hết hàng</option>
                      </select>
                    </div>
                    <div className="md:col-span-1 flex justify-center items-center">
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100"
                        disabled={(selectedProduct.capacities || []).length <= 1}
                        title="Xóa kích thước này"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Hình ảnh sản phẩm</label>
                  <button 
                    type="button"
                    onClick={addImage}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    + Thêm hình ảnh
                  </button>
                </div>
                {(selectedProduct.images || []).map((image, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => {
                        const newImages = [...(selectedProduct.images || [])];
                        newImages[index] = e.target.value;
                        setSelectedProduct({...selectedProduct, images: newImages});
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mr-2"
                      placeholder="URL hình ảnh"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100"
                      disabled={(selectedProduct.images || []).length <= 1}
                      title="Xóa ảnh này"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  value={selectedProduct.status}
                  onChange={(e) => setSelectedProduct({...selectedProduct, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="hidden">Ẩn</option>
                  <option value="active">Hiện</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục sản phẩm
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {allCategories.map(category => {
                    // Kiểm tra xem danh mục có được chọn không
                    const isChecked = selectedProduct.categories?.some(
                      cat => cat.category_id === category.id
                    );
                    
                    return (
                      <label key={category.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedProduct(prev => {
                              if (!prev) return prev;
                              
                              const currentCategories = prev.categories ? [...prev.categories] : [];
                              const categoryIndex = currentCategories.findIndex(
                                c => c.category_id === category.id
                              );
                              
                              if (categoryIndex === -1) {
                                // Thêm nếu chưa có
                                currentCategories.push({
                                  category_id: category.id,
                                  product_id: prev.id
                                });
                              } else {
                                // Xóa nếu đã có
                                currentCategories.splice(categoryIndex, 1);
                              }
                              
                              return {
                                ...prev,
                                categories: currentCategories
                              };
                            });
                          }}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span>{category.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                <TinyEditor
                  value={selectedProduct.content} 
                  onChange={(e) => setSelectedProduct({...selectedProduct, content: e})} 
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => { hideModal(); resetNewProductForm(); }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleCreateProduct}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {selectedProduct.id ? 'Cập nhật' : 'Tạo sản phẩm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}