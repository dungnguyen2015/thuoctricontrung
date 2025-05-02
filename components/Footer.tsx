import Image from 'next/image';

export default function Footer() {
  return (
    <>
        {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-4 md:px-10 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Trung Điện Lạnh</h3>
            <p className="text-gray-400">Chuyên thu mua điện lạnh cũ: tủ lạnh, máy lạnh, máy giặt... tại TP.HCM và các khu vực lân cận.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Liên Hệ</h4>
            <p className="text-gray-300">📍 64 Quang Trung, Thủ Đức, TP.HCM</p>
            <p className="text-gray-300">📞 0932 383 966</p>
            <p className="text-gray-300">✉️ trungdienlanh@gmail.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Kết Nối</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-red-500 hover:underline">Facebook</a></li>
              <li><a href="#" className="text-red-500 hover:underline">Zalo</a></li>
              <li><a href="#" className="text-red-500 hover:underline">Google Map</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Trung Điện Lạnh. All rights reserved.
        </div>
      </footer>
  </>
  );
}