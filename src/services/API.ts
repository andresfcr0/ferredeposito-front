import type { Product, Client } from "../types";

const API = "/api";

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API}/products`);
  return res.json();
};

export const getProductLike = async (query: string): Promise<Product[]> => {
  const res = await fetch(`${API}/products?search=${encodeURIComponent(query)}`);
  return res.json();
};

export const getClientLike = async (name?: string, id?: string): Promise<Client[]> => {
  const request = name ? `search=${encodeURIComponent(name)}` : id ? `id=${encodeURIComponent(id)}` : "";
  const res = await fetch(`${API}/clients?${request}`);
  return res.json();
};
