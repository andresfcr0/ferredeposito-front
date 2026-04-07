import type { Product, Client, Sale, APIResponse } from "../types";

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


export const registerSale = async (payload: Sale): Promise<APIResponse> => {
  const res = await fetch(`${API}/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};


