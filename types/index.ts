export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  description: string;
  author: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  image_url: string;
  excerpt: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  content: string;
  ingredients: string[];
  description: string;
  status: string;
  price: number;
  created_at: string;
  // Thêm các trường khác nếu cần
  capacities?: CapacityItem[];
  images?: string[];
};

export type CapacityItem = {
  capacity: string;
  price: number;
  discount_price: number;
  in_stock: boolean;
};