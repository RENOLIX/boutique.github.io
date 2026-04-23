export type OrderStatus = "Nouvelle" | "En preparation" | "Expediee" | "Livree";

export interface Product {
  id: string;
  name: string;
  price: number;
  compareAtPrice: number | null;
  category: string;
  badge: string;
  description: string;
  materials: string;
  sizes: string[];
  colors: string[];
  image: string;
  gallery: string[];
  featured: boolean;
  stock: number;
}

export interface ProductDraft {
  name: string;
  price: number;
  compareAtPrice: number | null;
  category: string;
  badge: string;
  description: string;
  materials: string;
  sizes: string[];
  colors: string[];
  image: string;
  gallery: string[];
  featured: boolean;
  stock: number;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

export interface OrderLine {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  lineTotal: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerDetails;
  items: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
}

export interface CartViewItem extends CartItem {
  product: Product;
  lineTotal: number;
}
