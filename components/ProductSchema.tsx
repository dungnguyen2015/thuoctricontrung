import Head from 'next/head';

interface ProductData {
  id: number;
  name: string;
  slug: string;
  description: string;
  content: string;
  image_url_first: string;
  price_first: string;
  discount_price_first: string;
  capacities: {
    [capacity: string]: {
      original: string;
      sale: string;
      in_stock: boolean;
    };
  };
  ingredients: string[];
}

interface Props {
  product: ProductData;
  baseUrl?: string; // ví dụ: https://thuoccontrung.com
}

export default function ProductSchema({ product, baseUrl = 'https://example.com' }: Props) {
  const productUrl = `${baseUrl}/san-pham/${product.slug}`;
  const imageUrl = product.image_url_first.startsWith('http')
    ? product.image_url_first
    : `${baseUrl}${product.image_url_first}`;

  const brand = product.ingredients.find(i =>
    i.toLowerCase().includes('công ty') || i.toLowerCase().includes('brand')
  ) || 'Không rõ';

  const price = Number(product.discount_price_first) > 0
    ? product.discount_price_first
    : product.price_first;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [imageUrl],
    "description": product.description,
    "sku": `SP-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": brand.replace('Công ty sản xuất: ', '')
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "VND",
      "price": price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/" +
        (Object.values(product.capacities).some(c => c.in_stock) ? 'InStock' : 'OutOfStock')
    }
  };


  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

