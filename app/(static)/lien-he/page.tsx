export const dynamic = 'force-static';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';

export default function LienHe() {
  return (
    <>
     <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold">Liên hệ với chúng tôi</h1>
        <p className="mt-2">Hotline: 0932 383 966</p>
        <p>Email: thuoctricontrung@gmail.com</p>
      </main>
    <Footer />
    </>
  )
}