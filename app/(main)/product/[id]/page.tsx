import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";
import { API_BASE, getPostTitle, getPostImage, formatPrice } from "@/lib/types";
import type { Post } from "@/lib/types";

async function getProduct(id: string): Promise<Post | null> {
  const res = await fetch(`${API_BASE}/api/public/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.data ?? json;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return {};

  const title = getPostTitle(product);
  const image = getPostImage(product);
  const price = formatPrice(product.price);

  const description =
    product.description ||
    `${title} ${price !== "Price on request" ? `- ${price}` : ""} on Awuta marketplace.`;

  const url = `https://awuta.com/product/${id}`;

  return {
    title: `${title} | Awuta`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Awuta",
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return <ProductClient product={product} />;
}
