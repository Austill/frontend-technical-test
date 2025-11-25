import { defineStore } from "pinia";
import api from "../api/client";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  thumbnail: string;
  rating?: number;
  discountPercentage?: number;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    products: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await api.get("/products");
        this.products = data.products;
      } catch (err: any) {
        this.error = "Failed to load products.";
      } finally {
        this.loading = false;
      }
    },
    getById(id: number) {
      return this.products.find((p: Product) => p.id === id);
    },
    async fetchProductById(id: number): Promise<Product> {
      const existing = this.getById(id);
      if (existing) return existing;
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    async addProduct(payload: Partial<Product>) {
      const { data } = await api.post("/products/add", payload, {
        headers: { "Content-Type": "application/json" },
      });
      this.products.unshift(data);
      return data as Product;
    },
    async deleteProduct(id: number) {
      await api.delete(`/products/${id}`);
      this.products = this.products.filter((p: Product) => p.id !== id);
    },
  },
});
