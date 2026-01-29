// app/seller/[id]/page.tsx
import SellerClient from "./SellerClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

async function getSellerData(sellerId: string) {
  try {
    // Fetch seller information
    const sellerRes = await fetch(
      `https://dev.awuta.com/api/public/user/${sellerId}`,
      {
        cache: "no-store",
      },
    );

    if (!sellerRes.ok) return null;

    const seller = await sellerRes.json();

    // Fetch seller's products using the dedicated endpoint
    const productsRes = await fetch(
      `https://dev.awuta.com/api/public/lst/for/${sellerId}`,
      {
        cache: "no-store",
      },
    );

    let products = [];
    if (productsRes.ok) {
      products = await productsRes.json();
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
    return {
      title: "Seller Not Found | Awuta",
    };
  }

  const seller = data.seller;
  const sellerName = seller.business?.name || seller.name || "Seller";
  const productCount = data.products.length || 0;
  const description =
    seller.business?.description ||
    `Browse ${productCount} premium products from ${sellerName}. Verified seller on Awuta marketplace.`;

  return {
    title: `${sellerName} | Awuta Seller`,
    description,
    openGraph: {
      title: `${sellerName} | Awuta Seller`,
      description,
      type: "profile",
      images: seller.profilePhotoUrl ? [{ url: seller.profilePhotoUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${sellerName} | Awuta Seller`,
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
