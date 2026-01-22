// app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

async function getProduct(id: string) {
  const res = await fetch(`https://dev.awuta.com/api/public/lst/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  // The API might return the product directly or in a wrapper
  const data = await res.json();

  // If the API returns an array with one product
  if (Array.isArray(data)) {
    return data[0] || null;
  }

  // If it returns the product directly
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return {};

  // Get the first image from media
  const image =
    product.media?.[0]?.url ||
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop";

  // Create title from description
  const title = product.description
    ? product.description.split(" ").slice(0, 6).join(" ") +
      (product.description.split(" ").length > 6 ? "..." : "")
    : "Product on Awuta";

  // Extract price if available
  const priceAspect = product.aspects?.find((aspect: any) =>
    aspect.aspectName.toLowerCase().includes("price"),
  );
  const price = priceAspect?.aspectValue || "";

  const description =
    product.description ||
    `Buy ${title} ${price ? `for ₦${price}` : ""}. Premium quality verified by Awuta.`;

  const url = `https://awuta.com/product/${id}`;

  return {
    title: `${title} | Awuta`,
    description,

    openGraph: {
      title: title,
      description,
      url,
      siteName: "Awuta",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description,
      images: [image],
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
