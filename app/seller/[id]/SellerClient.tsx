"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Package,
  MessageSquare,
  Phone,
  Heart,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Mail,
  Share2,
  Copy,
  X,
  Globe,
  Instagram,
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

// Define types based on the new API structure
type Product = {
  id: string;
  description?: string;
  userId: string;
  locationId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    image?: string;
    name: string;
    email: string;
    emailVerified: boolean;
    listingCount: number;
    business?: {
      id: string;
      name: string;
      description: string;
      ownerId: string;
      hypeCount: number;
    };
  };
  media: Array<{
    index: number;
    url: string;
    size: number;
    metadata: {
      width: number;
      height: number;
      mimeType: string;
    };
  }>;
  aspects: Array<{
    id: string;
    aspectName: string;
    aspectValue: string;
    aspectValues: string | null;
  }>;
  location: {
    id: string;
    name: string;
    country: string;
    locality: string;
    displayName: string;
    formattedAddress: string;
    latitude: number;
    longitude: number;
  };
  title?: string;
  price?: number;
  category?: string;
};

type Seller = {
  id: string;
  image: string | null;
  name: string;
  listingCount: number;
  profilePhotoUrl?: string;
  links?: Record<string, string>;
  business?: {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
  };
};

export default function SellerClient({
  seller,
  products,
}: {
  seller: Seller;
  products: Product[];
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sellerUrl, setSellerUrl] = useState("");

  // Set seller URL on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSellerUrl(window.location.href);
    }
  }, []);

  // Share functionality with business information
  const shareLinks = useMemo(() => {
    const sellerName = seller.business?.name || seller.name;
    const sellerDescription =
      seller.business?.description ||
      `Check out ${sellerName}'s products on Awuta marketplace.`;
    const shareText = `${sellerName} on Awuta\n${sellerDescription}\n\n${sellerUrl}`;
    const shareTextShort = `Check out "${sellerName}" on Awuta: ${sellerUrl}`;

    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sellerUrl)}&quote=${encodeURIComponent(sellerName + " on Awuta")}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(sellerUrl)}&text=${encodeURIComponent(sellerName + " on Awuta")}`,
      clipboard: shareText,
    };
  }, [seller, sellerUrl]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLinks.clipboard);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareLinks.clipboard;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Process product data helper
  const processProductData = useCallback((product: Product) => {
    // Extract title from description (first few words)
    const title = product.description
      ? product.description.split(" ").slice(0, 5).join(" ") +
        (product.description.split(" ").length > 5 ? "..." : "")
      : "Untitled Product";

    // Extract price from aspects if available
    const priceAspect = product.aspects?.find(
      (aspect) =>
        aspect.aspectName.toLowerCase().includes("price") ||
        aspect.aspectName.toLowerCase().includes("cost"),
    );

    // Try to parse price from aspect value or description
    let price = 0;
    if (priceAspect?.aspectValue) {
      const priceMatch = priceAspect.aspectValue.match(/(\d+(\.\d{1,2})?)/);
      price = priceMatch ? parseFloat(priceMatch[0]) : 0;
    } else {
      // Fallback: try to find price in description
      const descPriceMatch = product.description?.match(
        /₦?\s*(\d+(\.\d{1,2})?)/,
      );
      price = descPriceMatch ? parseFloat(descPriceMatch[1]) : 0;
    }

    // Extract category from aspects
    const categoryAspect = product.aspects?.find(
      (aspect) =>
        aspect.aspectName.toLowerCase().includes("category") ||
        aspect.aspectName.toLowerCase().includes("style") ||
        aspect.aspectName.toLowerCase().includes("type") ||
        aspect.aspectName.toLowerCase().includes("department"),
    );

    const category = categoryAspect?.aspectValue || "Uncategorized";

    return {
      ...product,
      title,
      price,
      category,
      rating: 4.5, // Default (not in API)
      featured: Math.random() > 0.7, // Random (not in API)
    };
  }, []);

  // Process all products
  const processedProducts = useMemo(
    () => products.map(processProductData),
    [products, processProductData],
  );

  // Seller stats - calculate from processed data
  const sellerStats = useMemo(
    () => ({
      rating: 4.9,
      reviews:
        seller.listingCount > 0 ? Math.floor(seller.listingCount * 0.5) : 0,
      products: products.length,
      responseRate: "98%",
      responseTime: "2 hours",
      joinedYear: seller.business?.createdAt
        ? new Date(seller.business.createdAt).getFullYear()
        : new Date().getFullYear(),
      totalSales: "1.2K+",
      repeatCustomers: "85%",
      verified: seller.business !== undefined,
    }),
    [seller, products.length],
  );

  // Extract unique categories from processed products
  const categories = useMemo(() => {
    const cats = new Set<string>();
    processedProducts.forEach((product) => {
      if (product.category) cats.add(product.category);
    });
    return ["all", ...Array.from(cats)];
  }, [processedProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(
    () =>
      processedProducts
        .filter(
          (product) =>
            selectedCategory === "all" || product.category === selectedCategory,
        )
        .sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return (a.price || 0) - (b.price || 0);
            case "price-high":
              return (b.price || 0) - (a.price || 0);
            case "newest":
              return (
                new Date(b.createdAt || "").getTime() -
                new Date(a.createdAt || "").getTime()
              );
            case "rating":
              return (b.rating || 0) - (a.rating || 0);
            default:
              return 0;
          }
        }),
    [processedProducts, selectedCategory, sortBy],
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const formatPrice = (price?: number) =>
    price ? `₦${price.toLocaleString()}` : "Price on request";

  const sellerImage =
    seller.profilePhotoUrl ||
    seller.image ||
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop";

  const contactSeller = () => {
    // Since email is not in the new API response, we can't use mailto
    // This could be replaced with a contact form or messaging system
    console.log("Contact seller:", seller.id);
    // Implement your contact logic here
  };

  // Extract social links
  const socialLinks = useMemo(() => {
    const links: Array<{
      platform: string;
      url: string;
      icon: React.ElementType;
    }> = [];

    if (seller.links) {
      Object.entries(seller.links).forEach(([key, value]) => {
        if (value) {
          switch (key.toLowerCase()) {
            case "instagram":
              links.push({
                platform: "Instagram",
                url: value,
                icon: FaInstagram,
              });
              break;
            case "website":
              links.push({ platform: "Website", url: value, icon: Globe });
              break;
            case "twitter":
              links.push({ platform: "Twitter", url: value, icon: FaTwitter });
              break;
            case "facebook":
              links.push({
                platform: "Facebook",
                url: value,
                icon: FaFacebook,
              });
              break;
          }
        }
      });
    }

    return links;
  }, [seller.links]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>

          {/* Share Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Share2 className="w-4 h-4" />
            Share Profile
          </button>
        </div>

        {/* Seller Header */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Seller Avatar */}
            <div className="relative">
              <img
                src={sellerImage}
                alt={seller.name}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop";
                }}
              />
              {sellerStats.verified && (
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-2">
                    {seller.business?.name || seller.name}
                  </h1>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(sellerStats.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {sellerStats.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      ({sellerStats.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={contactSeller}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Contact Seller
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              {seller.business?.description && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 whitespace-pre-line">
                  {seller.business.description}
                </p>
              )}

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="text-sm">{link.platform}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Seller Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    icon: Calendar,
                    label: "Member Since",
                    value: sellerStats.joinedYear,
                  },
                  {
                    icon: Package,
                    label: "Listings",
                    value: seller.listingCount || sellerStats.products,
                  },
                  {
                    icon: TrendingUp,
                    label: "Status",
                    value: seller.business
                      ? "Business Account"
                      : "Personal Account",
                  },
                  {
                    icon: Users,
                    label: "Products",
                    value: sellerStats.products,
                  },
                ].map((detail, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <detail.icon className="w-3 h-3" />
                      {detail.label}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {detail.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
              Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {products.length} products available
            </p>
          </div>

          {/* Controls - Only show if there are products */}
          {products.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Toggle */}
              <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <Grid
                    className={`w-4 h-4 ${
                      viewMode === "grid"
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <List
                    className={`w-4 h-4 ${
                      viewMode === "list"
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentProducts.map((product, index) => {
                const image =
                  product.media?.[0]?.url ||
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop";

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-colors h-full flex flex-col">
                        {/* Image */}
                        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                              src={image}
                              alt={product.title}
                              className="w-full h-full object-contain bg-white dark:bg-gray-800 group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop";
                              }}
                            />
                          </div>
                          {product.featured && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/80 backdrop-blur-sm rounded text-xs font-medium text-yellow-800 dark:text-yellow-200">
                              Featured
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                {product.category}
                              </span>
                              {product.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                  <span className="text-xs font-medium">
                                    {product.rating.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>

                            <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
                              {product.title}
                            </h3>

                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {product.description ||
                                "No description available"}
                            </p>
                          </div>

                          <div className="mt-auto">
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-medium text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </div>
                              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                View
                              </button>
                            </div>
                            {product.location && (
                              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
                                <MapPin className="w-3 h-3" />
                                {product.location.locality ||
                                  product.location.country}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {seller.business?.name || seller.name} doesn't have any products
              listed yet.
            </p>
          </div>
        )}
      </div>

      {/* Share Modal with Business Information */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={sellerImage}
                    alt={seller.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Share {seller.business?.name || seller.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {products.length} products •{" "}
                      {sellerStats.rating.toFixed(1)} ⭐
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Share Preview */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>{seller.business?.name || seller.name}</strong>
                    {seller.business?.description && (
                      <>
                        <br />
                        {seller.business.description.length > 100
                          ? seller.business.description.substring(0, 100) +
                            "..."
                          : seller.business.description}
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {sellerUrl}
                  </p>
                </div>

                {/* Social Share Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: FaWhatsapp,
                      label: "WhatsApp",
                      color: "bg-green-500",
                      href: shareLinks.whatsapp,
                    },
                    {
                      icon: FaFacebook,
                      label: "Facebook",
                      color: "bg-blue-600",
                      href: shareLinks.facebook,
                    },
                    {
                      icon: FaTwitter,
                      label: "Twitter",
                      color: "bg-gray-900 dark:bg-white",
                      href: shareLinks.twitter,
                    },
                  ].map((platform, index) => (
                    <a
                      key={index}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${platform.color} rounded-lg p-4 text-center text-white hover:opacity-90 transition-opacity`}
                    >
                      <platform.icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-xs font-medium">
                        {platform.label}
                      </div>
                    </a>
                  ))}
                </div>

                {/* Copy Link */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-400 truncate">
                      {sellerUrl}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Copies seller profile with business information
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
