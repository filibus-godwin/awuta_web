// app/product/[id]/ProductClient.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Heart,
  Shield,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  Package,
  Truck,
  ArrowLeft,
  ShoppingBag,
  MessageSquare,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Copy,
  X,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Eye,
  Users,
  Clock,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const SUPABASE_PUBLIC_URL =
  "https://lrugfzihdezsucqxheyn.supabase.co/storage/v1/object/public/";

export default function ProductClient({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [sellerImageError, setSellerImageError] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Initialize product URL
  useEffect(() => {
    setProductUrl(window.location.href);
  }, []);

  // Process images
  const images = product.listing_media?.map((m: any) =>
    m.path
      ? `${SUPABASE_PUBLIC_URL}/${m.path}`
      : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop"
  ) || [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
  ];

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const getImageSrc = (index: number) =>
    imageErrors.has(index)
      ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop"
      : images[index];

  const sellerImage =
    sellerImageError || !product.seller?.profile_photo_path
      ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop"
      : `${SUPABASE_PUBLIC_URL}/${product.seller.profile_photo_path}`;

  const formatPrice = (price?: number) =>
    price ? `₦${price.toLocaleString()}` : "Price on request";

  const shareLinks = {
    FaWhatsapp: `https://wa.me/?text=${encodeURIComponent(
      `Check out this product on Awuta: ${productUrl}`
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      productUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      productUrl
    )}&text=${encodeURIComponent(`Check out "${product.title}" on Awuta`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      productUrl
    )}`,
    copy: productUrl,
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock product stats (would come from API in production)
  const productStats = {
    views: "2.5K+",
    favorites: "320+",
    responseTime: "2 hours",
    rating: product.rating || 4.8,
    reviews: product.reviews || 124,
    condition: "New",
    warranty: "6 months",
    delivery: "1-3 days",
    returns: "30 days",
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden aspect-square"
            >
              <img
                src={getImageSrc(selectedImage)}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={() => handleImageError(selectedImage)}
              />

              {/* Favorite Button */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
                  }`}
                />
              </button>

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        (prev) => (prev - 1 + images.length) % images.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) => (prev + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </>
              )}

              {/* Verified Badge */}
              {product.seller?.business?.verified && (
                <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-500/90 to-green-500/90 backdrop-blur-sm rounded-full">
                  <Shield className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    Verified Product
                  </span>
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((src: string, i: number) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i
                        ? "border-blue-500 shadow-lg scale-105"
                        : "border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <img
                      src={getImageSrc(i)}
                      alt={`${product.title} ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(i)}
                    />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Product Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6"
            >
              {[
                { icon: Eye, value: productStats.views, label: "Views" },
                {
                  icon: Heart,
                  value: productStats.favorites,
                  label: "Favorites",
                },
                {
                  icon: Clock,
                  value: productStats.responseTime,
                  label: "Response Time",
                },
                { icon: Star, value: productStats.rating, label: "Rating" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-linear-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-200/50 dark:border-gray-700/50"
                >
                  <stat.icon className="w-5 h-5 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Category & Badges */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 text-xs font-medium bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 rounded-full">
                {product.category || "Uncategorized"}
              </span>
              {product.featured && (
                <span className="px-3 py-1.5 text-xs font-medium bg-linear-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-500/20 dark:to-yellow-500/20 text-amber-600 dark:text-amber-400 rounded-full">
                  Featured
                </span>
              )}
              {product.tags?.slice(0, 2).map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-medium bg-linear-to-r from-gray-500/10 to-gray-600/10 dark:from-gray-500/20 dark:to-gray-600/20 text-gray-600 dark:text-gray-400 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {formatPrice(product.price?.value)}
              </div>
              {product.originalPrice && (
                <div className="text-lg text-gray-500 dark:text-gray-400 line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </div>
              )}
              {product.discount && (
                <div className="px-3 py-1 bg-linear-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-full">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(productStats.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                {productStats.rating.toFixed(1)}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                ({productStats.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
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
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {showFullDescription ? "Show less" : "Read more"}
                </button>
              )}
            </div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: Package,
                  label: "Condition",
                  value: productStats.condition,
                },
                {
                  icon: Shield,
                  label: "Warranty",
                  value: productStats.warranty,
                },
                {
                  icon: Truck,
                  label: "Delivery",
                  value: productStats.delivery,
                },
                {
                  icon: CheckCircle,
                  label: "Returns",
                  value: productStats.returns,
                },
              ].map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-linear-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                >
                  <detail.icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {detail.label}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {detail.value}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <button className="group flex-1 px-8 py-4 bg-linear-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg">
                <ShoppingBag className="w-5 h-5" />
                Contact Seller
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={() => setShowShareModal(true)}
                className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </motion.div>

            {/* Seller Information */}
            {product.seller && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Seller Information
                </h3>

                <div className="flex items-start gap-6">
                  <div className="relative">
                    <img
                      src={sellerImage}
                      alt="Seller"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-white dark:border-gray-800 shadow-lg"
                      onError={() => setSellerImageError(true)}
                    />
                    {product.seller?.business?.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-linear-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {product.seller.business?.name ||
                            `${product.seller.first_name} ${product.seller.last_name}`}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {product.seller.business?.description ||
                            "Verified Seller"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold">4.9</span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">
                          (500+ reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {product.seller.business?.location ||
                            "Lagos, Nigeria"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Member since {new Date().getFullYear() - 2}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>2K+ products sold</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Link
                        href={`/seller/${product.seller.id}`}
                        className="group px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 font-semibold"
                      >
                        View Profile
                        <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <button className="px-6 py-3 bg-linear-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 text-blue-600 dark:text-blue-400 rounded-xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 font-semibold">
                        <Phone className="w-4 h-4" />
                        Call Seller
                      </button>
                      <button className="px-6 py-3 bg-linear-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 text-purple-600 dark:text-purple-400 rounded-xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 font-semibold">
                        <Mail className="w-4 h-4" />
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Share Product
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Social Share Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    {
                      icon: FaWhatsapp,
                      label: "FaWhatsapp",
                      color: "from-green-500 to-emerald-500",
                      href: shareLinks.FaWhatsapp,
                    },
                    {
                      icon: Facebook,
                      label: "Facebook",
                      color: "from-blue-600 to-blue-700",
                      href: shareLinks.facebook,
                    },
                    {
                      icon: Twitter,
                      label: "Twitter",
                      color:
                        "from-gray-900 to-gray-800 dark:from-white dark:to-gray-300",
                      href: shareLinks.twitter,
                    },
                    {
                      icon: Instagram,
                      label: "Instagram",
                      color: "from-purple-600 to-pink-600",
                      href: "#",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      color: "from-blue-700 to-blue-800",
                      href: shareLinks.linkedin,
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      color: "from-gray-600 to-gray-700",
                      href: `mailto:?subject=${encodeURIComponent(
                        product.title
                      )}&body=${encodeURIComponent(
                        `Check out this product: ${productUrl}`
                      )}`,
                    },
                  ].map((platform, index) => (
                    <a
                      key={index}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group bg-linear-to-br ${platform.color} rounded-2xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300`}
                    >
                      <platform.icon className="w-8 h-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <div className="text-sm font-medium text-white">
                        {platform.label}
                      </div>
                    </a>
                  ))}
                </div>

                {/* Copy Link */}
                <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex gap-3">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400 truncate">
                      {productUrl}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="px-6 py-4 bg-linear-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          Copy
                        </>
                      )}
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
