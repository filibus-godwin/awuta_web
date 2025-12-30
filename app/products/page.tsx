import ProductsClient from "./ProductsClient";

async function getProducts() {
  const res = await fetch(
    "https://lrugfzihdezsucqxheyn.supabase.co/functions/v1/lst",
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to load products");

  return res.json(); // Product[]
}

export const metadata = {
  title: "Products | Elharees",
  description: "Browse verified products from trusted sellers",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsClient products={products} />;
}
