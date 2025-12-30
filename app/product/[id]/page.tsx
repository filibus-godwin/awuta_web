// app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

const SUPABASE_PUBLIC_URL =
  "https://lrugfzihdezsucqxheyn.supabase.co/storage/v1/object/public/";

async function getProduct(id: string) {
  const res = await fetch(
    `https://lrugfzihdezsucqxheyn.supabase.co/functions/v1/lst/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

// 🔥 THIS CONTROLS WHATSAPP / FACEBOOK / TWITTER PREVIEW
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return {};

  const image = product.listing_media?.[0]?.path
    ? `${SUPABASE_PUBLIC_URL}/${product.listing_media[0].path}`
    : "/placeholder-image.png";

  const description =
    product.description ||
    `Buy ${product.title} for ₦${product.price?.value?.toLocaleString()}`;

  const url = `https://your-domain.com/product/${id}`;

  return {
    title: product.title,
    description,

    openGraph: {
      title: product.title,
      description,
      url,
      siteName: "Your Marketplace",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: product.title,
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

  return (
    <div className="py-8">
      <ProductClient product={product} />
    </div>
  );
}
