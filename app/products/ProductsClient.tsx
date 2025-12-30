"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, CheckCircle, ArrowRight } from "lucide-react";

export default function ProductsClient({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filtering logic (same as React version)
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const formatPrice = (price?: number) =>
    price ? `₦${price.toLocaleString()}` : "₦0";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-8">
      <div className="max-w-8xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-gray-600">
            <span className="font-semibold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            products found
          </div>
          <div className="text-sm text-gray-500">
            <CheckCircle className="inline w-4 h-4 mr-1 text-green-500" />
            All products verified
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-xl"
            />
          </div>
        </div>

        {/* Grid */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            <AnimatePresence>
              {filteredProducts.map((product, index) => {
                const image = product.listing_media?.[0]?.path?.startsWith(
                  "listing_media"
                )
                  ? `https://lrugfzihdezsucqxheyn.supabase.co/storage/v1/object/public/${product.listing_media[0].path}`
                  : product.listing_media?.[0]?.path ||
                    "https://via.placeholder.com/500x500?text=Product+Image";

                return (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="bg-white rounded-2xl p-4 border hover:shadow-xl"
                    >
                      <div className="aspect-square overflow-hidden rounded-xl mb-3">
                        <img
                          src={image}
                          alt={product.title}
                          className="w-full h-full object-cover hover:scale-105 transition"
                        />
                      </div>

                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        {product.seller?.business?.verified && (
                          <Shield className="w-3 h-3 text-green-500" />
                        )}
                        {product.category || "Uncategorized"}
                      </div>

                      <h3 className="font-bold line-clamp-2">
                        {product.title}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-1">
                        {product.description || "No description"}
                      </p>

                      <div className="mt-2 font-semibold">
                        {formatPrice(product.price?.value)}
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Search className="mx-auto w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-bold">No products found</h3>
            <p className="text-gray-600">Try adjusting your search.</p>
          </div>
        )}

        {/* Load More (placeholder) */}
        {filteredProducts.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-8 py-4 border rounded-xl flex items-center gap-3 mx-auto">
              Load More
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
