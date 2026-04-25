"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  CheckCircle,
  Package,
  ChevronLeft,
  ChevronRight,
  Copy,
  X,
  Mail,
  MessageSquare,
  Calendar,
  Tag,
  Building,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { Post } from "@/lib/types";
import {
  formatPrice,
  getPostTitle,
  getAuthorAvatar,
  getLocationDisplay,
} from "@/lib/types";

export default function ProductClient({ product }: { product: Post }) {
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

  const title = getPostTitle(product);
  const images =
    product.media?.length > 0
      ? [...product.media].sort((a, b) => a.index - b.index).map((m) => m.url)
      : [];
  const avatar = getAuthorAvatar(product.author);
  const locationStr = getLocationDisplay(product.location);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const getImageSrc = (index: number) =>
    imageErrors.has(index) ? null : images[index];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`Check out this product on Awuta: ${productUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(`Check out "${title}" on Awuta`)}`,
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Aspects that are meaningful to display
  const displayAspects =
    product.aspects?.filter(
      (a) => a.aspectValue && String(a.aspectValue).trim() !== "",
    ) || [];

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative border border-gray-200 rounded-xl overflow-hidden aspect-square bg-gray-100">
              {images.length > 0 ? (
                <img
                  src={getImageSrc(selectedImage) || ""}
                  alt={title}
                  className="w-full h-full object-contain"
                  onError={() => handleImageError(selectedImage)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        (prev) => (prev - 1 + images.length) % images.length,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) => (prev + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Verified Badge */}
              {product.author?.business && (
                <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg">
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
                        ? "border-[rgb(91,199,97)]"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={getImageSrc(i) || ""}
                      alt={`${title} ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(i)}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
              {title}
            </h1>

            {/* Price */}
            <div className="space-y-1">
              <div className="text-3xl font-medium text-gray-900">
                {formatPrice(product.price)}
              </div>
              <div className="flex items-center gap-3">
                {product.price?.negotiable && (
                  <span className="text-sm text-[rgb(91,199,97)]">
                    Negotiable
                  </span>
                )}
                {product.price?.onSale && product.price.discountLevel > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">
                    {product.price.discountLevel}% off
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Listed on {formatDate(product.createdAt)}
              </div>
            </div>

            {/* Price Tiers */}
            {product.priceTiers && product.priceTiers.length > 1 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Bulk Pricing
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.priceTiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      <div className="font-medium text-gray-900">
                        {"\u20A6"}
                        {tier.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {tier.minQty}
                        {tier.maxQty ? `-${tier.maxQty}` : "+"} units
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <div
                  className={`text-gray-600 leading-relaxed whitespace-pre-line ${
                    showFullDescription ? "" : "line-clamp-4"
                  }`}
                >
                  {product.description}
                </div>
                {product.description.length > 300 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-[rgb(91,199,97)] text-sm mt-1 hover:underline"
                  >
                    {showFullDescription ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            )}

            {/* Aspects/Details */}
            {displayAspects.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {displayAspects.map((aspect, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg"
                    >
                      <Tag className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 truncate">
                          {aspect.aspectName}
                        </div>
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {String(aspect.aspectValue)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            {product.availability && (
              <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                <Package className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">
                    Availability
                  </div>
                  <div className="text-sm font-medium text-gray-900 capitalize">
                    {product.availability.replace(/_/g, " ")}
                  </div>
                </div>
              </div>
            )}

            {/* Location */}
            {locationStr && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <h4 className="font-medium text-gray-900">
                    Location
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  {product.location?.formattedAddress ||
                    product.location?.displayName ||
                    locationStr}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                  {isFavorite ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* Seller Information */}
            {product.author && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Seller
                </h3>

                <div className="flex items-start gap-4">
                  <div className="relative">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={product.author.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-medium">
                        {product.author.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {product.author.name}
                    </h4>
                    {product.author.business && (
                      <div className="flex items-center gap-1 mt-1">
                        <Building className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {product.author.business.name}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {product.author.postCount} listings
                      </span>
                    </div>

                    {/* Contact Options */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.author.links?.whatsapp && (
                        <a
                          href={`https://wa.me/${product.author.links.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in: ${title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors inline-flex items-center gap-1"
                        >
                          <FaWhatsapp className="w-3 h-3" />
                          WhatsApp
                        </a>
                      )}
                      <Link
                        href={`/seller/${product.author.id}`}
                        className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">
                Product Info
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Listed
                  </span>
                  <span className="font-medium">
                    {formatDate(product.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Last Updated
                  </span>
                  <span className="font-medium">
                    {formatDate(product.updatedAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Product ID
                  </span>
                  <span className="font-mono text-sm">
                    {product.id.slice(0, 8)}...
                  </span>
                </div>
              </div>
            </div>

            {/* Location Details */}
            {product.location && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">
                  Location
                </h4>
                <div className="space-y-3">
                  {product.location.formattedAddress && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Address
                      </span>
                      <span className="font-medium text-right max-w-[60%]">
                        {product.location.formattedAddress}
                      </span>
                    </div>
                  )}
                  {product.location.locality && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        City
                      </span>
                      <span className="font-medium">
                        {product.location.locality}
                      </span>
                    </div>
                  )}
                  {product.location.country && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Country
                      </span>
                      <span className="font-medium">
                        {product.location.country}
                      </span>
                    </div>
                  )}
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
              className="bg-white rounded-xl p-6 w-full max-w-md border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Share Product
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 rounded-lg p-4 text-center text-white hover:opacity-90 transition-opacity"
                  >
                    <FaWhatsapp className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-xs font-medium">WhatsApp</div>
                  </a>
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 rounded-lg p-4 text-center text-white hover:opacity-90 transition-opacity"
                  >
                    <div className="text-xs font-medium mt-2">Facebook</div>
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 rounded-lg p-4 text-center text-white hover:opacity-90 transition-opacity"
                  >
                    <div className="text-xs font-medium mt-2">Twitter</div>
                  </a>
                </div>

                {/* Copy Link */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-100 rounded-lg p-3 text-sm text-gray-600 truncate">
                      {productUrl}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
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
