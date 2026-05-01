// Types matching the backend public API response shapes

export type Post = {
  id: string;
  title: string | null;
  description: string | null;
  type: "catalog" | "listing" | "post" | "request" | "update" | null;
  categoryId: string | null;
  sourceId: string | null;
  createdAt: string;
  updatedAt: string;

  author: {
    id: string;
    name: string;
    image: string | null;
    profilePhotoUrl: string | null;
    color: string | null;
    links: {
      whatsapp?: string;
      instagram?: string;
      tiktok?: string;
    } | null;
    postCount: number;
    business: {
      id: string;
      name: string;
      description: string | null;
      hypeCount: number;
      isHyping: boolean | null;
      relatedHypes:
        | { id: string; name: string; phoneNumber: string | null }[]
        | null;
    } | null;
  } | null;

  media: {
    index: number;
    id?: string;
    url: string;
    size: number;
    metadata: {
      width?: number;
      height?: number;
      mimeType?: string;
    } | null;
  }[];

  location: {
    id: string;
    country: string | null;
    locality: string | null;
    plusCode: string | null;
    displayName: string | null;
    countryCode: string | null;
    postalCode: string | null;
    adminAreaLevel1: string | null;
    adminAreaLevel2: string | null;
    adminAreaLevel3: string | null;
    formattedAddress: string | null;
    latitude: number;
    longitude: number;
  } | null;

  aspects:
    | {
        aspectName: string;
        aspectValue?: string | number;
        aspectValues?: string[];
      }[]
    | null;

  price: {
    id: string;
    currency: string;
    value: number;
    discountLevel: number;
    onSale: boolean;
    negotiable: boolean;
  } | null;

  priceTiers: {
    id: string;
    minQty: number;
    maxQty: number | null;
    price: number;
  }[];

  source: Post | null;

  wishlistCount: number;
  isWishlisted: boolean;
  isListed: boolean;
  inventoryMode: "tracked" | "availability" | "untracked" | null;
  stockQuantity: number | null;
  availability:
    | "available"
    | "made_to_order"
    | "pre_order"
    | "unavailable"
    | null;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  profilePictureId: string | null;
  profilePhotoUrl: string | null;
  color: string | null;
  links: {
    whatsapp?: string;
    instagram?: string;
    tiktok?: string;
  } | null;
  listingCount: number;
  hypingCount: number;
  business: {
    id: string;
    name: string;
    description: string | null;
    hypeCount: number;
    isHyping: boolean | null;
    relatedHypes:
      | { id: string; name: string; phoneNumber: string | null }[]
      | null;
  } | null;
};

// API base URL
export const API_BASE = "https://api.awuta.com";

// Helper to format price
export function formatPrice(price: Post["price"]): string {
  if (!price || price.value === 0) return "Price on request";
  const symbol =
    price.currency === "NGN"
      ? "\u20A6"
      : price.currency === "USD"
        ? "$"
        : price.currency === "GHS"
          ? "GH\u20B5"
          : price.currency + " ";
  return `${symbol}${price.value.toLocaleString()}`;
}

// Helper to get display title
export function getPostTitle(post: Post): string {
  if (post.title) return post.title;
  if (post.description) {
    const words = post.description.split(" ").slice(0, 6).join(" ");
    return post.description.split(" ").length > 6 ? words + "..." : words;
  }
  return "Untitled";
}

// Helper to get first image URL
export function getPostImage(post: Post): string | null {
  if (!post.media || post.media.length === 0) return null;
  const sorted = [...post.media].sort((a, b) => a.index - b.index);
  return sorted[0].url;
}

// Helper to get author avatar
export function getAuthorAvatar(author: Post["author"]): string | null {
  if (!author) return null;
  return author.profilePhotoUrl || author.image || null;
}

// Helper to get location display string
export function getLocationDisplay(location: Post["location"]): string | null {
  if (!location) return null;
  if (location.locality && location.country)
    return `${location.locality}, ${location.country}`;
  return location.displayName || location.formattedAddress || null;
}
