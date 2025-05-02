import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BaiVietLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Header />
        <main>
          <div className="max-w-6xl mx-auto px-6 py-12">
            {children}
          </div>
        </main>
    <Footer />
    </>
  );
}