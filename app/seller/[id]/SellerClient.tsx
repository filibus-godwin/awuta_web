"use client";

const SUPABASE_PUBLIC_URL =
  "https://lrugfzihdezsucqxheyn.supabase.co/storage/v1/object/public/";

export default function SellerClient({
  seller,
  products,
}: {
  seller: any;
  products: any[];
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Seller Header */}
      <div className="flex gap-8 mb-12">
        <img
          src={
            seller.profile_photo_path
              ? `${SUPABASE_PUBLIC_URL}/${seller.profile_photo_path}`
              : "/placeholder-avatar.png"
          }
          alt="Seller"
          className="w-32 h-32 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-avatar.png";
          }}
        />

        <div>
          <h1 className="text-3xl font-bold">
            {seller.business?.name ||
              `${seller.first_name} ${seller.last_name}`}
          </h1>

          {seller.business?.description && (
            <p className="text-gray-600 mt-1">{seller.business.description}</p>
          )}
        </div>
      </div>

      {/* Seller Products */}
      <h2 className="text-2xl font-bold mb-6">Seller Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <a
            key={product.id}
            href={`/product/${product.id}`}
            className="border rounded-xl p-4 hover:shadow-lg transition"
          >
            <img
              src={
                product.listing_media?.[0]?.path
                  ? `${SUPABASE_PUBLIC_URL}/${product.listing_media[0].path}`
                  : "/placeholder-image.png"
              }
              alt={product.title}
              className="h-48 w-full object-cover rounded-lg mb-3"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-image.png";
              }}
            />

            <h3 className="font-medium">{product.title}</h3>

            <p className="font-bold mt-1">
              ₦{product.price?.value?.toLocaleString() || "0"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
