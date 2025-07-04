
'use client';
import { motion } from "framer-motion";
import Image from 'next/image';
import OptimizedImage from './OptimizedImage';

export default function HeroSection() {
  return (
    <section className="w-full px-4 py-12 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Cột giới thiệu với hiệu ứng trượt vào */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
            Thuốc trị côn trùng hiệu quả - An toàn - Tiết kiệm
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Chào mừng bạn đến với trang web chuyên cung cấp các sản phẩm thuốc diệt côn trùng chất lượng cao.
            Chúng tôi cam kết mang đến giải pháp an toàn, hiệu quả cho mọi gia đình và doanh nghiệp.
          </p>
          
          <motion.a
            href="/san-pham/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Xem sản phẩm
          </motion.a>
        </motion.div>

        {/* Cột hình ảnh với hiệu ứng mờ + scale */}
        <motion.div
          initial={{ x: 100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <OptimizedImage
            src="/images/banner.webp"
            alt="Banner thuốc diệt côn trùng"
            width={600}
            height={400}
            style={{ width: '100%', height: 'auto', objectFit: "contain" }}
            className="rounded-xl shadow-lg"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}