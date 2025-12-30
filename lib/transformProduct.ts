const STORAGE_URL =
  "https://lrugfzihdezsucqxheyn.supabase.co/storage/v1/object/public/";

export function transformProductData(apiData: any) {
  const images = apiData.listing_media?.map((media: any) =>
    media.path.startsWith("http") ? media.path : `${STORAGE_URL}${media.path}`
  ) || [
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&auto=format&fit=crop",
  ];

  const specifications: Record<string, any> = {};
  apiData.listing_aspects?.forEach((aspect: any) => {
    const key = aspect.aspect_name.toLowerCase().replace(/\s+/g, "_");
    specifications[key] = aspect.aspect_value;
  });

  const createdAtYear = apiData.seller?.created_at
    ? new Date(apiData.seller.created_at).getFullYear().toString()
    : "2024";

  const sellerId = apiData.seller?.id || apiData.seller?.user_id;

  return {
    id: apiData.id,
    title: apiData.title,
    description: apiData.description || "No description available",
    longDescription:
      apiData.description || "No detailed description available.",
    price: {
      value: apiData.price?.value ?? 0,
      currency: apiData.price?.currency ?? "NGN",
      negotiable: apiData.price?.negotiable ?? false,
    },
    originalPrice: apiData.price?.value
      ? Math.round(apiData.price.value * 1.2)
      : 0,
    discount: apiData.price?.discount_level ?? 0,
    images,
    seller: {
      id: sellerId,
      business: {
        name: apiData.seller?.business?.name || "Individual Seller",
        rating: 4.8,
        verified: true,
        location: "Nigeria",
        joined: createdAtYear,
        totalSales: 0,
      },
      user: {
        firstName: apiData.seller?.first_name || "",
        lastName: apiData.seller?.last_name || "",
        phone: apiData.seller?.phone_number?.e164 || "",
        profilePhoto: apiData.seller?.profile_photo_path || "",
      },
      links: apiData.seller?.links || {},
    },
    rating: 4.9,
    reviewCount: 0,
    category: "Product",
    tags: [
      "Available",
      apiData.price?.negotiable ? "Negotiable" : "Fixed Price",
    ],
    stock: 1,
    delivery: {
      free: true,
      estimated: "2-3 business days",
      expressAvailable: true,
    },
    specifications,
    reviews: [],
    relatedProducts: [],
  };
}
