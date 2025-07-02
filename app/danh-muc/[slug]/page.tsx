import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from 'next';
import { getProductsByCategorySlug } from "@/lib/products";
import { getCategoryBySlug } from "@/lib/categories";
import Link from "next/link";

export const revalidate = 7200; // 2 hours

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Không tìm thấy sản phẩm',
      description: 'Sản phẩm không tồn tại',
    };
  }

  return {
    title: category.name,
    description: category.name,
  };
}  

export default async function DanhMucPage({ params }: Props) {
  const { slug } = await params;
  const products = await getProductsByCategorySlug(slug);

  if (!products) return (<>
    <Header />
        <main> <div className="p-10 py-10 h1 text-center">Bài viết không tồn tại.</div> 
        </main>
    <Footer />
    </>
      );
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Header />

      <section className="py-12 px-6">
        <h1 className="text-3xl font-bold text-center mb-10">Thuốc diệt kiến</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div key={index} className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white">
              <div className="relative h-52 w-full">
                <Link href={`/san-pham/${product.slug}`}>
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>
              <div className="p-4">
                <Link href={`/san-pham/${product.slug}`}><h2 className="text-lg font-bold mb-1">{product.name}</h2></Link>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <span className="text-green-600 font-semibold">{(product.discount_price > 0 ? product.discount_price : product.price).toLocaleString('vi-VN')}₫</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}