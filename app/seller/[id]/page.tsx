// app/seller/[id]/page.tsx
import SellerClient from "./SellerClient";
import { notFound } from "next/navigation";

async function getAllProducts() {
  const res = await fetch(
    "https://lrugfzihdezsucqxheyn.supabase.co/functions/v1/lst",
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function SellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: sellerId } = await params;

  const products = await getAllProducts();
  if (!products || products.length === 0) notFound();

  // 🔥 Filter products by seller id
  const sellerProducts = products.filter(
    (product: any) => product.seller?.id === sellerId
  );

  if (sellerProducts.length === 0) notFound();

  // 🧠 Seller info is embedded in every product
  const seller = sellerProducts[0].seller;

  return <SellerClient seller={seller} products={sellerProducts} />;
}
