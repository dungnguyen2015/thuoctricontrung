import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type CapacityItem = {
  capacity?: string;
  price?: number;
  discount_price?: number;
  in_stock?: boolean;
}

type CategoryItem = {
  category_id?: number;
  product_id?: number;
}

type Product = {
  id?: number;
  name?: string;
  first_price: number;
  first_discount_price: number;
  ingredients: string[];
  description?: string;
  images: string[];
  status?: string;
  stock_status?: string;
  price?: number;
  capacities: CapacityItem[];
  updated_at?: string;
  created_at?: string;
  slug?: string;
  content?: string;
  primary_image?: string;
  categories: CategoryItem[];
};

type ProductContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  isModalOpen: boolean;
  showModal: () => void;
  hideModal: () => void;
  selectedProduct: Product | null;
  // Sửa kiểu setSelectedProduct
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  
  // Sửa kiểu useState để khớp với Product | null
  const [selectedProduct, setSelectedProduct] = useState<Product | null>({
    id: undefined,
    name: "",
    first_price: 0,
    first_discount_price: 0,
    slug: "",
    content: "",
    capacities: [],
    ingredients: [],
    description: "",
    images: [],
    status: "hidden",
    stock_status: "in_stock",
    categories: []
  });

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const removeProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  return (
    <ProductContext.Provider value={{ 
      products, 
      setProducts,
      isModalOpen, 
      showModal,
      selectedProduct, 
      setSelectedProduct, // Kiểu đã khớp
      hideModal, 
      addProduct, 
      updateProduct, 
      removeProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProductContext must be used inside a ProductProvider");
  return ctx;
};