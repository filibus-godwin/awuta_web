import SellerClient from "./SellerClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { API_BASE } from "@/lib/types";
import type { Post, PublicUser } from "@/lib/types";

async function getSellerData(
  sellerId: string,
): Promise<{ seller: PublicUser; products: Post[] } | null> {
  try {
    const sellerRes = await fetch(`${API_BASE}/api/public/users/${sellerId}`, {
      cache: "no-store",
    });

    if (!sellerRes.ok) return null;

    const sellerJson = await sellerRes.json();
    const seller: PublicUser = sellerJson.data ?? sellerJson;

    const productsRes = await fetch(
      `${API_BASE}/api/public/posts/for/${sellerId}/catalog?limit=50`,
      { cache: "no-store" },
    );

    let products: Post[] = [];
    if (productsRes.ok) {
      const productsJson = await productsRes.json();
      products = productsJson.data ?? productsJson;
    }

    return { seller, products };
  } catch (error) {
    console.error("Error fetching seller data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: sellerId } = await params;
  const data = await getSellerData(sellerId);

  if (!data || !data.seller) {
    return { title: "Seller Not Found | Awuta" };
  }

  const seller = data.seller;
  const sellerName = seller.business?.name || seller.name || "Seller";
  const productCount = data.products.length;
  const description =
    seller.business?.description ||
    `Browse ${productCount} products from ${sellerName} on Awuta marketplace.`;

  return {
    title: `${sellerName} | Awuta`,
    description,
    openGraph: {
      title: `${sellerName} | Awuta`,
      description,
      type: "profile",
      images: seller.profilePhotoUrl ? [{ url: seller.profilePhotoUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${sellerName} | Awuta`,
      description,
      images: seller.profilePhotoUrl ? [seller.profilePhotoUrl] : [],
    },
  };
}

export default async function SellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: sellerId } = await params;
  const data = await getSellerData(sellerId);

  if (!data || !data.seller) {
    notFound();
  }

  return <SellerClient seller={data.seller} products={data.products} />;
}
