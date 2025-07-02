
'use client';
import { ProductProvider } from '@/app/admin/contexts/ProductContext';
import ProductTable from '@/app/admin/components/ProductTable';
import ModelUpdateProduct from '@/app/admin/components/ModelUpdateProduct';

export default function ProductListClient() {


 return (

    <ProductProvider>
      <main className="p-6">
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
              <ProductTable />
              <ModelUpdateProduct />
              
          </div>
        </div>
      </main>
    </ProductProvider>
  );
}