import Head from 'next/head';
import Image from 'next/image';
import HeroSection from '../components/HeroSection';

export default function Home() {
  return (
    <>
    <HeroSection />

      {/* Dịch vụ */}
      <section className="bg-white py-16 px-4 md:px-10 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h2>
          <p className="text-gray-600 mb-10">
            Trung Điện Lạnh chuyên thu mua các thiết bị điện lạnh cũ tại TP.HCM – nhanh chóng, chuyên nghiệp, giá cao.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Thu Mua Tủ Lạnh Cũ</h3>
              <p className="text-gray-600">Tủ lạnh hỏng, cũ kỹ? Gọi chúng tôi để được báo giá và thu mua tận nơi.</p>
            </div>
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Thu Mua Máy Giặt Cũ</h3>
              <p className="text-gray-600">Thu mua máy giặt cũ các hãng: LG, Toshiba, Panasonic... giá cao, uy tín.</p>
            </div>
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Thu Mua Máy Lạnh Cũ</h3>
              <p className="text-gray-600">Máy lạnh cũ, không sử dụng? Chúng tôi đến tận nơi thu mua trong ngày.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cam kết */}
      <section className="bg-red-50 py-16 px-4 md:px-10 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Cam Kết Từ Trung Điện Lạnh</h2>
          <ul className="text-left max-w-3xl mx-auto list-disc list-inside text-gray-700 text-lg">
            <li>Thu mua nhanh chóng, tận nơi tại tất cả các quận TP.HCM</li>
            <li>Giá thu mua cạnh tranh, thanh toán minh bạch</li>
            <li>Không ép giá, hỗ trợ nhiệt tình 24/7</li>
            <li>Đội ngũ chuyên nghiệp, lịch sự, uy tín</li>
          </ul>
        </div>
      </section>

      {/* CTA cuối trang */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 py-12 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Bạn đang cần bán thiết bị điện lạnh cũ?</h2>
        <p className="text-lg mb-6">Hãy gọi ngay cho Trung Điện Lạnh – Đến tận nơi, thu mua nhanh chóng, giá cao!</p>
        <a
          href="tel:0932383966"
          className="inline-block bg-white text-red-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Gọi Ngay: 0932383966
        </a>
      </section>

    </>
    
      

  );
}
