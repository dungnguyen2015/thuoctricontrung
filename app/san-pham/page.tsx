import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from 'next';
import { getProducts, getTotalProductCount } from "@/lib/products";
import Link from "next/link";
import Pagination from '@/components/Pagination';

export const revalidate = 7200; // 2 hours

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

type SearchParamsType = {
  page?: string | string[];
};
const PAGE_SIZE = 9;

export async function generateMetadata({
  searchParams
}: {
  searchParams?: SearchParamsType;
}): Promise<Metadata> {

  const pageParam = searchParams?.page;
  const pageNumber = Array.isArray(pageParam) 
    ? pageParam[0] 
    : pageParam || '1';
  
  // Xử lý trường hợp NaN
  const currentPage = Math.max(1, parseInt(pageNumber, 10)) || 1;

  if (isNaN(currentPage)) {
    throw new Error('Số trang không hợp lệ');
  }

  const products = await getProducts(currentPage, PAGE_SIZE); // Giả sử là array giống như bạn gửi
  const baseUrl = 'https://thuoccontrung.com';

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Danh sách sản phẩm",
    "itemListOrder": "https://schema.org/ItemListOrderAscending",
    "numberOfItems": products.length,
    "itemListElement": products.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${baseUrl}/san-pham/${p.slug}`
    }))
  };

  const productSchemas = products.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.name,
    "image": [`${baseUrl}${p.image_url}`],
    "description": p.description,
    "url": `${baseUrl}/san-pham/${p.slug}`,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "VND",
      "price": Number(p.discount_price) > 0 ? p.discount_price : p.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  }));

  return {
    title: 'Danh sách sản phẩm',
    description: 'Tổng hợp các sản phẩm thuốc diệt côn trùng hiệu quả cao, an toàn cho gia đình.',
    other: {
      "application/ld+json": JSON.stringify([itemListSchema, ...productSchemas])
    }
  };
}  


export default async function DanhMucPage({
  searchParams
}: {
  searchParams?: SearchParamsType;
}) {

  const pageParam = searchParams?.page;
  const pageNumber = Array.isArray(pageParam) 
    ? pageParam[0] 
    : pageParam || '1';
  
  // Xử lý trường hợp NaN
  const currentPage = Math.max(1, parseInt(pageNumber, 10)) || 1;

  if (isNaN(currentPage)) {
    throw new Error('Số trang không hợp lệ');
  }
  
  const [products, total] = await Promise.all([
    getProducts(currentPage, PAGE_SIZE),
    getTotalProductCount()
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  console.log (products);

  if (!products) return (<>
    <Header />
        <main> <div className="p-10 py-10 h1 text-center">Sản phẩm không tồn tại.</div> 
        </main>
    <Footer />
    </>
      );
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Header />

      <section className="py-12 px-6">
        <h1 className="text-3xl font-bold text-center mb-10">Tất cả sản phẩm</h1>
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
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </section>

      <Footer />
    </main>
  );
}