export interface Product {
  id: number;
  name: string;
  category_id?: number | null;
  unit: string;
  purchase_price: number;
  sale_price: number;
  stock: number;
}

export interface Client {
  id: number;
  name: string;
  document_number: string;
  phone: string;
  email: string;
  address: string;
}

export interface SaleItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Sale {
  client_id: number;
  items: SaleItem[];
  total: number;
}

export interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
}