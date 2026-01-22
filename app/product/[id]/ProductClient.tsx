"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  CheckCircle,
  Star,
  Package,
  Truck,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Copy,
  X,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Tag,
  User,
  Building,
  Globe,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

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
};

export default function ProductClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setProductUrl(window.location.href);
  }, []);

  // Helper function to process product data
  const processProductData = () => {
    // Extract title from description
    const title = product.description
      ? product.description.split(" ").slice(0, 6).join(" ") +
        (product.description.split(" ").length > 6 ? "..." : "")
      : "Untitled Product";

    // Extract price from aspects
    const priceAspect = product.aspects?.find(
      (aspect) =>
        aspect.aspectName.toLowerCase().includes("price") ||
        aspect.aspectName.toLowerCase().includes("cost"),
    );

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

    // Extract brand from aspects
    const brandAspect = product.aspects?.find((aspect) =>
      aspect.aspectName.toLowerCase().includes("brand"),
    );

    // Extract condition from aspects
    const conditionAspect = product.aspects?.find(
      (aspect) =>
        aspect.aspectName.toLowerCase().includes("condition") ||
        aspect.aspectName.toLowerCase().includes("vintage"),
    );

    // Create tags from aspects with values
    const tags =
      product.aspects
        ?.filter(
          (aspect) => aspect.aspectValue && aspect.aspectValue.trim() !== "",
        )
        .map((aspect) => aspect.aspectValue) || [];

    // Extract all aspects for detailed view
    const productAspects =
      product.aspects?.filter(
        (aspect) => aspect.aspectValue && aspect.aspectValue.trim() !== "",
      ) || [];

    return {
      title,
      price,
      category,
      brand: brandAspect?.aspectValue,
      condition: conditionAspect?.aspectValue || "Good",
      tags,
      aspects: productAspects,
      rating: 4.8, // Default (not in API)
      reviews: 124, // Default (not in API)
      views: "2.5K+",
      favorites: "320+",
      responseTime: "2 hours",
      warranty: "6 months",
      delivery: "1-3 days",
      returns: "30 days",
    };
  };

  const processedProduct = processProductData();

  const images = product.media?.map((m) => m.url) || [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
  ];

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const getImageSrc = (index: number) =>
    imageErrors.has(index)
      ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop"
      : images[index];

  const formatPrice = (price: number) =>
    price > 0 ? `₦${price.toLocaleString()}` : "Price on request";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `Check out this product on Awuta: ${productUrl}`,
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      productUrl,
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      productUrl,
    )}&text=${encodeURIComponent(`Check out "${processedProduct.title}" on Awuta`)}`,
    copy: productUrl,
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactSeller = () => {
    // WhatsApp contact
    const phoneNumber = ""; // You might want to get this from the API
    const message = `Hello ${product.author.name}, I'm interested in your product: ${processedProduct.title}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    if (phoneNumber) {
      window.open(whatsappUrl, "_blank");
    } else {
      // Fallback to email
      const subject = `Inquiry about: ${processedProduct.title}`;
      const body = `Hello ${product.author.name},\n\nI'm interested in your product: ${processedProduct.title}\n\nProduct URL: ${productUrl}`;
      window.location.href = `mailto:${product.author.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden aspect-square">
              <img
                src={getImageSrc(selectedImage)}
                alt={processedProduct.title}
                className="w-full h-full object-cover"
                onError={() => handleImageError(selectedImage)}
              />

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        (prev) => (prev - 1 + images.length) % images.length,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) => (prev + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Verified Badge */}
              {product.author?.business && (
                <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium">
                    {product.author.business.name}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border ${
                      selectedImage === i
                        ? "border-blue-500"
                        : "border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    <img
                      src={getImageSrc(i)}
                      alt={`${processedProduct.title} ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(i)}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {[
                { icon: Eye, value: processedProduct.views, label: "Views" },
                {
                  icon: Heart,
                  value: processedProduct.favorites,
                  label: "Favorites",
                },
                {
                  icon: Clock,
                  value: processedProduct.responseTime,
                  label: "Response",
                },
                { icon: Star, value: processedProduct.rating, label: "Rating" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-center"
                >
                  <stat.icon className="w-4 h-4 text-blue-500 dark:text-blue-400 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Category & Badges */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {processedProduct.category}
              </span>
              {processedProduct.brand && (
                <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                  {processedProduct.brand}
                </span>
              )}
              {processedProduct.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white">
              {processedProduct.title}
            </h1>

            {/* Price */}
            <div className="space-y-1">
              <div className="text-3xl font-medium text-gray-900 dark:text-white">
                {formatPrice(processedProduct.price)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Listed on {formatDate(product.createdAt)}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(processedProduct.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                {processedProduct.rating.toFixed(1)}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                ({processedProduct.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <div
                className={`text-gray-600 dark:text-gray-400 leading-relaxed ${
                  showFullDescription ? "" : "line-clamp-3"
                }`}
              >
                {product.description ||
                  "No description available for this product."}
              </div>
              {product.description && product.description.length > 200 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 dark:text-blue-400 text-sm mt-1 hover:underline"
                >
                  {showFullDescription ? "Show less" : "Read more"}
                </button>
              )}
            </div>

            {/* Product Aspects/Details */}
            {processedProduct.aspects.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Product Details
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
                  {processedProduct.aspects.map((aspect, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-800 rounded-lg"
                    >
                      <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {aspect.aspectName}
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {aspect.aspectValue}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Information */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: Package,
                  label: "Condition",
                  value: processedProduct.condition,
                },
                // {
                //   icon: CheckCircle,
                //   label: "Warranty",
                //   value: processedProduct.warranty,
                // },
                // {
                //   icon: Truck,
                //   label: "Delivery",
                //   value: processedProduct.delivery,
                // },
                // {
                //   icon: Clock,
                //   label: "Returns",
                //   value: processedProduct.returns,
                // },
              ].map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <detail.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {detail.label}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {detail.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Location */}
            {product.location && (
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Location
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {product.location.displayName ||
                    product.location.formattedAddress}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {product.location.locality}, {product.location.country}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Purchase
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex-1 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex-1 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                  {isFavorite ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* Seller Information */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Seller Information
              </h3>

              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={
                      product.author.image ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop"
                    }
                    alt={product.author.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  {product.author.emailVerified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {product.author.name}
                      </h4>
                      {product.author.business && (
                        <div className="flex items-center gap-1 mt-1">
                          <Building className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.author.business.name}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {product.author.emailVerified && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                            <CheckCircle className="w-3 h-3" />
                            Email Verified
                          </span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          • {product.author.listingCount} listings
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">
                        {processedProduct.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Contact Seller Options */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <a
                      href={`mailto:${product.author.email}`}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors inline-flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      Email
                    </a>
                    <button
                      onClick={contactSeller}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Message
                    </button>
                    <Link
                      href={`/seller/${product.author.id}`}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
            More Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Specifications */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Product Specifications
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Listed
                  </span>
                  <span className="font-medium">
                    {formatDate(product.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Last Updated
                  </span>
                  <span className="font-medium">
                    {formatDate(product.updatedAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Product ID
                  </span>
                  <span className="font-mono text-sm">
                    {product.id.slice(0, 8)}...
                  </span>
                </div>
                {processedProduct.brand && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Brand
                    </span>
                    <span className="font-medium">
                      {processedProduct.brand}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Location Details */}
            {product.location && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Location Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Address
                    </span>
                    <span className="font-medium text-right">
                      {product.location.formattedAddress}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      City
                    </span>
                    <span className="font-medium">
                      {product.location.locality}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Country
                    </span>
                    <span className="font-medium">
                      {product.location.country}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
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
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Share Product
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
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
                      icon: () => (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      ),
                      label: "Facebook",
                      color: "bg-blue-600",
                      href: shareLinks.facebook,
                    },
                    {
                      icon: () => (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      ),
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
                      {productUrl}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
