"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Package,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Share2,
  Copy,
  X,
  Globe,
  ArrowRight,
} from "lucide-react";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import type { Post, PublicUser } from "@/lib/types";
import { formatPrice, getPostTitle, getPostImage } from "@/lib/types";

export default function SellerClient({
  seller,
  products,
}: {
  seller: PublicUser;
  products: Post[];
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sellerUrl, setSellerUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSellerUrl(window.location.href);
    }
  }, []);

  const sellerName = seller.business?.name || seller.name;

  const shareLinks = useMemo(() => {
    const shareText = `${sellerName} on Awuta\n${seller.business?.description || `Check out ${sellerName}'s products on Awuta.`}\n\n${sellerUrl}`;
    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sellerUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(sellerUrl)}&text=${encodeURIComponent(sellerName + " on Awuta")}`,
      clipboard: shareText,
    };
  }, [seller, sellerUrl, sellerName]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLinks.clipboard);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareLinks.clipboard;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sort products
  const sortedProducts = useMemo(
    () =>
      [...products].sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return (a.price?.value || 0) - (b.price?.value || 0);
          case "price-high":
            return (b.price?.value || 0) - (a.price?.value || 0);
          case "newest":
          default:
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }
      }),
    [products, sortBy],
  );

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const sellerImage = seller.profilePhotoUrl || seller.image || null;

  // Social links
  const socialLinks = useMemo(() => {
    const links: { platform: string; url: string; icon: React.ElementType }[] =
      [];
    if (seller.links) {
      if (seller.links.instagram)
        links.push({
          platform: "Instagram",
          url: seller.links.instagram,
          icon: FaInstagram,
        });
      if (seller.links.whatsapp)
        links.push({
          platform: "WhatsApp",
          url: `https://wa.me/${seller.links.whatsapp}`,
          icon: FaWhatsapp,
        });
      if (seller.links.tiktok)
        links.push({
          platform: "TikTok",
          url: seller.links.tiktok,
          icon: FaTiktok,
        });
    }
    return links;
  }, [seller.links]);

  return (
    <div className="min-h-screen bg-white dark:bg-[rgb(0,25,0)] py-8">
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

          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Seller Header */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Seller Avatar */}
            <div className="relative">
              {sellerImage ? (
                <img
                  src={sellerImage}
                  alt={seller.name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-3xl font-medium">
                  {seller.name.charAt(0)}
                </div>
              )}
              {seller.business && (
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-1">
                    {sellerName}
                  </h1>
                  {seller.business && seller.business.name !== seller.name && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      by {seller.name}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {seller.links?.whatsapp && (
                    <a
                      href={`https://wa.me/${seller.links.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[rgb(91,199,97)] text-white rounded-lg hover:bg-[rgb(75,170,80)] transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      Contact
                    </a>
                  )}
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
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[rgb(91,199,97)] transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="text-sm">{link.platform}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Seller Details */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <Package className="w-3 h-3" />
                    Listings
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {seller.listingCount}
                  </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <CheckCircle className="w-3 h-3" />
                    Account Type
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {seller.business ? "Business" : "Personal"}
                  </div>
                </div>
                {seller.business && seller.business.hypeCount > 0 && (
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                      <Calendar className="w-3 h-3" />
                      Hypes
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {seller.business.hypeCount}
                    </div>
                  </div>
                )}
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

          {products.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-sm focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <Grid
                    className={`w-4 h-4 ${viewMode === "grid" ? "text-gray-900 dark:text-white" : "text-gray-400"}`}
                  />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                >
                  <List
                    className={`w-4 h-4 ${viewMode === "list" ? "text-gray-900 dark:text-white" : "text-gray-400"}`}
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
              {currentProducts.map((product) => {
                const image = getPostImage(product);
                const title = getPostTitle(product);

                return (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <div className="group border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-colors h-full flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {image ? (
                          <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-contain bg-white dark:bg-gray-800 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                        {product.price?.onSale && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                            Sale
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
                          {title}
                        </h3>

                        {product.description &&
                          product.description !== title && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                              {product.description}
                            </p>
                          )}

                        <div className="mt-auto">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-lg font-medium text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </div>
                              {product.price?.negotiable && (
                                <span className="text-xs text-[rgb(91,199,97)]">
                                  Negotiable
                                </span>
                              )}
                            </div>
                            <span className="text-sm font-medium text-[rgb(91,199,97)] flex items-center gap-1">
                              View
                              <ArrowRight className="w-3 h-3" />
                            </span>
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
                          ? "bg-[rgb(91,199,97)] text-white"
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
              No products yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {sellerName} hasn&apos;t listed any products yet.
            </p>
          </div>
        )}
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
                  Share {sellerName}
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
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
                    <FaFacebook className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-xs font-medium">Facebook</div>
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 dark:bg-white rounded-lg p-4 text-center text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
                  >
                    <FaTwitter className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-xs font-medium">Twitter</div>
                  </a>
                </div>

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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
