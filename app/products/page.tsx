import ProductsClient from "./ProductsClient";
import type { Metadata } from "next";
import { API_BASE } from "@/lib/types";

async function getProducts() {
  const res = await fetch(`${API_BASE}/api/public/posts?type=catalog&limit=50`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load products");

  const json = await res.json();
  return json.data ?? json;
}

export const metadata: Metadata = {
  title: "Products | Awuta",
  description: "Browse products from verified sellers on Awuta",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsClient products={products} />;
}
