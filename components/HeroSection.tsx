import Image from 'next/image';

export default function HeroSection() {
  return (
    <>
      <section className="bg-gradient-to-r from-sky-100 to-red-50 py-16 px-4 md:px-10 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Nội dung bên trái */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-6">
              Trung Điện Lạnh – <span className="text-red-600">Thu Mua Điện Lạnh Cũ</span> Giá Cao
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Chúng tôi chuyên thu mua <strong>tủ lạnh, máy giặt, máy lạnh cũ</strong> tại TP.HCM với giá cạnh tranh, dịch vụ tận nơi, hỗ trợ 24/7.
            </p>
            <a
              href="tel:0932383966"
              className="inline-block bg-red-600 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow hover:bg-red-700 transition"
            >
              Gọi Ngay: 0932383966
            </a>
          </div>

          {/* Ảnh minh họa */}
          <div className="relative w-full h-72 md:h-[400px]">
            <Image
              src="/images/thu-mua-do-dien-lanh-cu-tphcm.webp"
              alt="Thu mua điện lạnh Trung Điện Lạnh"
              width={500}
              height={300}
              style={{ width: '100%', height: 'auto' }} // responsive
              objectFit="cover"
              className="rounded-xl shadow-lg"
              priority
            />
          </div>
        </div>
      </section>
      </>
  );
}