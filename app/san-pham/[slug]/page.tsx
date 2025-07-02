import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductBySlug } from "@/lib/products";
import Link from "next/link";
import ProductDetail from "@/components/ProductDetail";
import { Metadata } from 'next';


export const revalidate = 7200; // 2 hours

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm',
      description: 'Sản phẩm không tồn tại',
    };
  }

  return {
    title: product.name,
    description: product.name,
  };
}  

export default async function SanPhamPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return (
    <main className="min-h-screen bg-white text-gray-800">
      <Header />
        <div className="p-10 py-10 h1 text-center">Sản Phẩm không tồn tại.</div>;
      <Footer />
    </main>
  ); 
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Header />
        <ProductDetail product={product} />

      <Footer />
    </main>
  );
}