import Link from "next/link";
import { Phone, MapPin, Home, FileText, MessagesSquare, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-10 px-6 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Leaf className="w-6 h-6 text-lime-400" />
            <h3 className="text-xl font-semibold">Thuốc Trị Côn Trùng</h3>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            Chúng tôi chuyên cung cấp các sản phẩm thuốc diệt muỗi, diệt gián, kiến, mối,... đảm bảo hiệu quả cao, an toàn cho sức khỏe và thân thiện với môi trường. Cam kết hàng chính hãng, giao hàng toàn quốc nhanh chóng.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Liên kết nhanh</h3>
          <ul className="space-y-1 list-none">
            <li>
               <Link href="/" className="flex items-center space-x-2 hover:text-blue-600">
                  <Home className="w-5 h-5" />
                  <span>Trang chủ</span>
                </Link>
            </li>
            <li>
              <Link href="/bai-viet" className="flex items-center space-x-2 hover:text-blue-600">
              <FileText className="w-5 h-5" />
              <span>Bài viết</span>
            </Link>
            </li>
            <li>
              <Link href="/lien-he" className="flex items-center space-x-2 hover:text-blue-600">
              <MessagesSquare className="w-5 h-5" />
              <span>Liên hệ</span>
            </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Thông tin liên hệ</h3>
          <div className="flex items-center space-x-3 mt-3">
            <Phone className="w-5 h-5 text-white-600" />
            <span>0932.38.39.66</span>
          </div>
          <div className="flex items-center space-x-3 mt-3">
            <MapPin className="w-5 h-5 text-white-600" />
            <span>64 Quang Trung, Q9, TP.HCM</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 text-xs">
        &copy; {new Date().getFullYear()} Thuốc trị côn trùng. All rights reserved.
      </div>
    </footer>
  );
}