"use client";

import { useState } from "react";
import Link from "next/link";

const SUPABASE_PUBLIC_URL =
  "https://lrugfzihdezsucqxheyn.supabase.co/storage/v1/object/public/";

export default function ProductClient({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [sellerImageError, setSellerImageError] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const images = product.listing_media?.map((m: any) =>
    m.path ? `${SUPABASE_PUBLIC_URL}/${m.path}` : "/placeholder-image.png"
  ) || ["/placeholder-image.png"];

  const productUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const getImageSrc = (index: number) =>
    imageErrors.has(index) ? "/placeholder-image.png" : images[index];

  const sellerImage =
    sellerImageError || !product.seller?.profile_photo_path
      ? "/placeholder-avatar.png"
      : `${SUPABASE_PUBLIC_URL}/${product.seller.profile_photo_path}`;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <img
            src={getImageSrc(selectedImage)}
            alt={product.title}
            className="rounded-2xl mb-4 w-full aspect-square object-cover"
            onError={() => handleImageError(selectedImage)}
          />

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${
                    selectedImage === i ? "border-blue-600" : "border-gray-200"
                  }`}
                >
                  <img
                    src={getImageSrc(i)}
                    alt={`${product.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(i)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

          {product.price?.value && (
            <p className="text-3xl font-bold mb-6">
              ₦{product.price.value.toLocaleString()}
            </p>
          )}

          <p className="mb-6">{product.description}</p>

          {/* 🔥 SHARE BUTTON */}
          <button
            onClick={() => setShowShare(true)}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            🔗 Share Product
          </button>

          {product.seller && (
            <div className="border-t pt-8">
              <div className="flex items-center gap-4">
                <img
                  src={sellerImage}
                  alt="Seller"
                  className="w-12 h-12 rounded-full object-cover"
                  onError={() => setSellerImageError(true)}
                />
                <div>
                  <p className="font-bold">
                    {product.seller.business?.name ||
                      `${product.seller.first_name} ${product.seller.last_name}`}
                  </p>
                </div>
              </div>

              <Link
                href={`/seller/${product.seller.id}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:underline"
              >
                View Seller Profile →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 SHARE MODAL */}
      {showShare && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Share Product</h3>

            <div className="grid gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(productUrl)}`}
                target="_blank"
                className="p-3 rounded-lg bg-green-100 text-green-800 text-center"
              >
                WhatsApp
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  productUrl
                )}`}
                target="_blank"
                className="p-3 rounded-lg bg-blue-100 text-blue-800 text-center"
              >
                Facebook
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  productUrl
                )}`}
                target="_blank"
                className="p-3 rounded-lg bg-black text-white text-center"
              >
                X (Twitter)
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(productUrl);
                  setShowShare(false);
                }}
                className="p-3 rounded-lg border"
              >
                Copy Link
              </button>
            </div>

            <button
              onClick={() => setShowShare(false)}
              className="mt-4 w-full text-center text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
