export const dynamic = 'force-static';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import OptimizedImage from '@/components/OptimizedImage';
import Image from "next/image";
import Link from "next/link";
import { FlaskConical, Package, User2, BadgeDollarSign } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <Header />

      {/* Banner */}
      <section className="relative w-full">
        <OptimizedImage
            src="/images/banner.webp"
            alt="Banner thuốc diệt côn trùng"
            width={500}
            height={300}
            style={{ width: '100%', height: 'auto', objectFit: "cover" }} // responsive
            className="shadow-lg"
            priority
          />
      </section>

      {/* Lý do chọn chúng tôi */}
      <section className="py-12 px-6 bg-gray-50">
        <h3 className="text-2xl font-bold text-center mb-12">Tại sao chọn chúng tôi?</h3>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <FlaskConical className="mx-auto text-black w-14 h-14" />
            <p className="mt-2">Sản phẩm kiểm định chất lượng</p>
          </div>
          <div>
            <Package className="mx-auto text-black w-14 h-14" />
            <p className="mt-2">Giao hàng toàn quốc</p>
          </div>
          <div>
            <User2 className="mx-auto text-black w-14 h-14" />
            <p className="mt-2">Tư vấn tận tâm</p>
          </div>
          <div>
            <BadgeDollarSign className="mx-auto text-black w-14 h-14" />
            <p className="mt-2">Giá cả hợp lý</p>
          </div>
        </div>
      </section>

      {/* Danh mục sản phẩm */}
      <section className="py-12 px-6">
        <h3 className="text-2xl font-bold text-center mb-8">Danh mục sản phẩm</h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard title="Thuốc diệt kiến" href="/danh-muc/thuoc-diet-kien" image="/uploads/banner-thuoc-diet-kien.webp" />
          <CategoryCard title="Thuốc diệt ruồi" href="/danh-muc/thuoc-diet-ruoi" image="/uploads/banner-thuoc-diet-ruoi.webp" />
          <CategoryCard title="Thuốc diệt gián" href="/danh-muc/thuoc-diet-gian" image="/uploads/banner-thuoc-diet-gian.webp" />
        </div>
      </section>

      {/* Giới thiệu ngắn */}
      <section className="py-12 px-6 bg-green-50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Giới thiệu</h3>
          <p>
            Chúng tôi chuyên cung cấp các loại thuốc diệt côn trùng hiệu quả cao, an toàn
            với người dùng. Với nhiều năm kinh nghiệm, đội ngũ của chúng tôi luôn sẵn sàng
            tư vấn để giúp bạn chọn đúng loại sản phẩm phù hợp nhất.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

function CategoryCard({ title, href, image }) {
  return (
    <Link href={href} className="block border rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4 text-center font-semibold">{title}</div>
    </Link>
  );
}
