"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Phone, MapPin, Home, FileText, MessagesSquare  } from 'lucide-react';

export default function Header() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo thuốc trị côn trùng"
            width={160}
            height={60}
            priority
          />
        </Link>

        {/* Mobile button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6 items-center">
           <Link href="/" className="flex items-center space-x-2 hover:text-blue-600">
              <Home className="w-5 h-5" />
              <span>Trang chủ</span>
            </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:underline"
            >
              Danh mục sản phẩm ▾
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white text-black shadow-md mt-2 rounded z-50 min-w-[220px]">
                <Link href="/danh-muc/thuoc-diet-kien" className="block px-4 py-2 hover:bg-gray-100">
                  Thuốc diệt kiến
                </Link>
                <Link href="/danh-muc/thuoc-diet-muoi" className="block px-4 py-2 hover:bg-gray-100">
                  Thuốc diệt muỗi
                </Link>
                <Link href="/danh-muc/thuoc-diet-gian" className="block px-4 py-2 hover:bg-gray-100">
                  Thuốc diệt gián
                </Link>
                <Link href="/danh-muc/thuoc-diet-moi" className="block px-4 py-2 hover:bg-gray-100">
                  Thuốc diệt mối
                </Link>
                <Link href="/danh-muc/thuoc-diet-ruoi" className="block px-4 py-2 hover:bg-gray-100">
                  Thuốc diệt ruồi
                </Link>
                <Link href="/danh-muc/thuoc-diet-bo-chet" className="block px-4 py-2 hover:bg-gray-100">
                  Thuốc diệt bọ chét
                </Link>
                <Link href="/danh-muc/thuoc-diet-rep-giuong" className="block px-4 py-2 hover:bg-gray-100">
                  Thuốc diệt rệp giường
                </Link>
                <Link href="/danh-muc/thuoc-diet-ve-cho" className="block px-4 py-2 hover:bg-gray-100">
                  Thuốc diệt ve chó
                </Link>
                <Link href="/danh-muc/thuoc-diet-chuot" className="block px-4 py-2 hover:bg-gray-100">
                  Thuốc diệt chuột
                </Link>
              </div>
            )}
          </div>

          <Link href="/bai-viet">Bài viết</Link>
          <Link href="/lien-he">Liên hệ</Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-green-600 px-4 py-2 space-y-2">
           <Link href="/" className="flex items-center space-x-2 hover:text-blue-600">
            <Home className="w-5 h-5" />
            <span>Trang chủ</span>
          </Link>
          <div>
            <span className="font-semibold">Danh mục sản phẩm</span>
            <div className="ml-4 space-y-1 mt-2">
              <Link href="/danh-muc/thuoc-diet-kien" className="block hover:bg-gray-500">
                  Thuốc diệt kiến
              </Link>
              <Link href="/danh-muc/thuoc-diet-muoi" className="block hover:bg-gray-500">
                Thuốc diệt muỗi
              </Link>
              <Link href="/danh-muc/thuoc-diet-gian" className="block hover:bg-gray-500">
                Thuốc diệt gián
              </Link>
              <Link href="/danh-muc/thuoc-diet-moi" className="block hover:bg-gray-500">
                Thuốc diệt mối
              </Link>
              <Link href="/danh-muc/thuoc-diet-ruoi" className="block hover:bg-gray-500">
                Thuốc diệt ruồi
              </Link>
              <Link href="/danh-muc/thuoc-diet-bo-chet" className="block hover:bg-gray-500">
                Thuốc diệt bọ chét
              </Link>
              <Link href="/danh-muc/thuoc-diet-rep-giuong" className="block hover:bg-gray-500">
                Thuốc diệt rệp giường
              </Link>
              <Link href="/danh-muc/thuoc-diet-ve-cho" className="block hover:bg-gray-500">
                Thuốc diệt ve chó
              </Link>
              <Link href="/danh-muc/thuoc-diet-chuot" className="block hover:bg-gray-500">
                Thuốc diệt chuột
              </Link>
            </div>
          </div>
          <Link href="/bai-viet" className="block">Bài viết</Link>
          <Link href="/lien-he" className="block">Liên hệ</Link>
        </div>
      )}
    </header>
  );
}