import dynamic from 'next/dynamic';

const ProductListClient = dynamic(() => import('./ProductListClient'), {
  ssr: false,
});

export default function Page() {
  return <ProductListClient />;
}