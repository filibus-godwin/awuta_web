import ProductsClient from "./ProductsClient";
import type { Metadata } from "next";

async function getProducts() {
  const res = await fetch("https://dev.awuta.com/api/public/lst", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load products");

  const data = await res.json();
  return data; // Return the array directly
}

export const metadata: Metadata = {
  title: "Products | Awuta",
  description: "Browse verified premium products from trusted sellers",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsClient products={products} />;
}
