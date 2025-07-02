export const dynamic = 'force-static';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';

export default function DichVu() {
  return (
    <>
     <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-green-600">Dịch vụ của Trung Điện Lạnh</h1>
        <ul className="mt-4 list-disc list-inside">
          <li>Thu mua máy lạnh cũ</li>
          <li>Thu mua máy giặt cũ</li>
          <li>Thu mua tủ lạnh cũ</li>
        </ul>
      </main>
    <Footer />
    </>
  )
}