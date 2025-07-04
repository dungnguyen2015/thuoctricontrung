"use client";
import { useState } from 'react';
import ArticleContent from '@/components/ArticleContent';


export default function ProductDetail({ product }: { product?: any }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.capacity_first);
  const [quantity, setQuantity] = useState(1);
  
  const productImages = product.images;
  
  // Định nghĩa giá cho từng kích thước
  const priceMap = product.capacities;
  
  // Tính toán giá dựa trên kích thước và số lượng
  const originalPrice = priceMap[selectedSize].original * quantity;
  let currentPrice = originalPrice;
  if (priceMap[selectedSize].sale > 0) {
    currentPrice = priceMap[selectedSize].sale * quantity;
  }

  const discountPercentage = Math.round(
    (1 - priceMap[selectedSize].sale / priceMap[selectedSize].original) * 100
  );
  
  const zoomImage = () => {
    setShowLightbox(true);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.id} đánh giá)</span>
          </div>
        </header>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Product Images */}
          <div className="md:w-1/2">
            <div 
              className="bg-white rounded-xl shadow-md p-4 cursor-zoom-in mb-4"
              onClick={zoomImage}
            >
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src={productImages[selectedImage]} 
                  alt="Thuốc diệt côn trùng Alaska" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, index) => (
                <div 
                  key={index}
                  className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedImage === index ? 'border-green-500' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={img} 
                    alt={`Thuốc diệt côn trùng Alaska ${index+1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Product Info */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-6">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  BÁN CHẠY NHẤT
                </span>
                <div className="mt-4 flex items-center">
                  <span className="text-2xl font-bold text-green-600">
                    {currentPrice.toLocaleString('vi-VN')}₫
                  </span>
                  {currentPrice !== originalPrice && (
                      <>
                      <span className="ml-3 text-gray-500 line-through">
                        {originalPrice.toLocaleString('vi-VN')}₫
                      </span>
                      <span className="ml-3 bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                        -{discountPercentage}%
                      </span>
                       </>
                    )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h2 className="font-bold text-gray-900 mb-3">Thành phần chính:</h2>
                <ul className="space-y-2">
                    {product.ingredients.map((ing: string, idx: number) => (
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="ml-2 text-gray-700">{ing}</span>
                      </li>
                    ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-3">Khối lượng:</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(priceMap).map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedSize === size 
                          ? 'border-green-500 bg-green-50 text-green-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                <div className="mr-4">
                  <label htmlFor="quantity-input" className="block text-sm font-medium text-gray-700 mb-1">Số lượng:</label>
                  <div className="flex border border-gray-300 rounded-lg">
                    <button 
                      type="button"
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <input 
                      id="quantity-input"
                      type="number" 
                      min="1" 
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-12 text-center border-x border-gray-300 py-2"
                    />
                    <button 
                      type="button"
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 flex items-stretch mt-4 text-green-600 hover:text-green-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Tổng số tiền: {currentPrice.toLocaleString('vi-VN')}₫
                </div>
              </div>

               <div className="mt-4 grid grid-cols-2 gap-3">
                  {/* Điện thoại */}
                  <a 
                    href="tel:0932383966"
                    className="flex items-center bg-blue-50 p-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg 
                        className="w-5 h-5 text-blue-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-600">Hỗ trợ đặt hàng 24/7</p>
                      <span className="text-base font-bold text-red-600">0932 383 966</span>
                    </div>
                  </a>
                  
                  {/* Zalo */}
                  <a 
                    href="https://zalo.me/0932383966" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-blue-50 p-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg 
                        className="w-5 h-5 text-blue-600" 
                        viewBox="0 0 24 24" 
                        fill="none"
                      >
                        <path 
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                          stroke="currentColor" 
                          strokeWidth="1.5"
                        />
                        <path 
                          d="M7 15H10V13H7V15ZM7 11H17V9H7V11ZM14 15H17V13H14V15Z" 
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-600">Chat Zalo ngay</p>
                      <span className="text-base font-bold text-red-600">0932 383 966</span>
                    </div>
                  </a>
                </div>
              
              <div className="mt-6 flex space-x-4">
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Yêu thích
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Chia sẻ
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Description */}
        <div className="mt-10 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mô Tả Sản Phẩm</h2>
          <div className="prose max-w-none">
              {<ArticleContent htmlContent={product.content} />}
          </div>
        </div>
      </div>
      
      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
              onClick={() => setShowLightbox(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative">
              <img 
                src={productImages[selectedImage]} 
                alt="Thuốc diệt côn trùng Alaska" 
                className="w-full max-h-[80vh] object-contain"
              />
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {productImages.map((img, index) => (
                  <button 
                    key={index}
                    className={`w-16 h-16 rounded overflow-hidden border-2 ${
                      selectedImage === index ? 'border-green-500' : 'border-white'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`Thuốc diệt côn trùng Alaska ${index+1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        body {
          background-color: #f9fafb;
          font-family: 'Inter', sans-serif;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}