import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductBySlug } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import { Metadata } from "next";

export const revalidate = 7200; // 2 hours

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
      description: "Sản phẩm không tồn tại",
    };
  }

  const baseUrl = "https://thuoctricontrung.com";
  const productUrl = `${baseUrl}/san-pham/${product.slug}`;
  const imageUrl = product.image_url_first.startsWith("http")
    ? product.image_url_first
    : `${baseUrl}${product.image_url_first}`;

  const brand =
    product.ingredients.find((i) =>
      i.toLowerCase().includes("công ty") || i.toLowerCase().includes("brand")
    ) || "Không rõ";

  const price =
    Number(product.discount_price_first) > 0
      ? product.discount_price_first
      : product.price_first;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [imageUrl],
    description: product.description,
    sku: `SP-${product.id}`,
    brand: {
      "@type": "Brand",
      name: brand.replace("Công ty sản xuất: ", ""),
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "VND",
      price: price,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };

  return {
    title: product.name,
    description: product.name,
    other: {
      "application/ld+json": JSON.stringify(schema),
    },
  };
}

export default async function SanPhamPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product)
    return (
      <main className="min-h-screen bg-white text-gray-800">
        <Header />
        <div className="p-10 py-10 h1 text-center">Sản phẩm không tồn tại.</div>
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
