"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  X,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// Updated Product type based on the new API response
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

  // Derived fields for the UI
  title?: string;
  price?: number;
  category?: string;
  rating?: number;
  featured?: boolean;
};

export default function ProductsClient({ products }: { products: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Memoize the data processing function
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
        aspect.aspectName.toLowerCase().includes("type"),
    );

    const category = categoryAspect?.aspectValue || "Uncategorized";

    // Extract brand from aspects
    const brandAspect = product.aspects?.find((aspect) =>
      aspect.aspectName.toLowerCase().includes("brand"),
    );

    // Create tags from aspects with values
    const tags =
      product.aspects
        ?.filter(
          (aspect) => aspect.aspectValue && aspect.aspectValue.trim() !== "",
        )
        .map((aspect) => aspect.aspectValue)
        .slice(0, 3) || [];

    return {
      ...product,
      title,
      price,
      category,
      tags,
      brand: brandAspect?.aspectValue,
      rating: 4.5, // Default rating (not in API)
      featured: Math.random() > 0.7, // Random featured flag (not in API)
    };
  }, []);

  // Process initial products once when component mounts
  useEffect(() => {
    const processedProducts = products.map(processProductData);
    setFilteredProducts(processedProducts);
  }, [products, processProductData]); // Add processProductData to dependencies

  // Extract unique categories from ALL products, not filteredProducts
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((product) => {
      const processed = processProductData(product);
      if (processed.category) cats.add(processed.category);
    });
    return ["all", ...Array.from(cats)];
  }, [products, processProductData]);

  // Filtering and sorting logic - use products directly, not filteredProducts
  useEffect(() => {
    // Process all products first
    const allProcessedProducts = products.map(processProductData);

    let filtered = allProcessedProducts.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return (
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
          );
        default: // featured
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy, processProductData]); // Remove filteredProducts from dependencies

  const formatPrice = (price?: number) =>
    price ? `₦${price.toLocaleString()}` : "Price on request";

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 tracking-widest uppercase">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            Products
            <div className="w-1 h-1 rounded-full bg-blue-500" />
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white tracking-tight mb-4">
            Discover <span className="font-medium">Products</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl">
            Browse verified products from trusted sellers. Every product is
            quality-checked and backed by our satisfaction guarantee.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="relative border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
                >
                  <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </button>
              )}
            </div>
          </div>

          {/* Filters Bar */}
          {/* <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex border border-gray-200 dark:border-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
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
                  className={`p-2 rounded transition-colors ${
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

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-transparent text-sm focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div> */}

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            selectedCategory === category
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              {filteredProducts.length}
            </span>{" "}
            products
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CheckCircle className="w-3 h-3 text-green-500" />
            All verified
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product, index) => {
              const image =
                product.media?.[0]?.url ||
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop";

              const isFavorite = favorites.has(product.id);

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
                    <div className="relative border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-colors h-full flex flex-col">
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Verified Badge - using business verification */}
                        {product.author?.business && (
                          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-xs font-medium text-gray-900 dark:text-white">
                              {product.author.business.name}
                            </span>
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

                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                            {product.description || "No description available"}
                          </p>

                          {/* Tags */}
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {product.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-auto">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xl font-medium text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </div>
                              {product.location && (
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  <MapPin className="w-3 h-3" />
                                  {product.location.locality ||
                                    product.location.country}
                                </div>
                              )}
                            </div>

                            <button className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                              View
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Seller Info */}
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                            {product.author.image && (
                              <img
                                src={product.author.image}
                                alt={product.author.name}
                                className="w-6 h-6 rounded-full"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                {product.author.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {product.author.listingCount} listings
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-sm"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 &&
          filteredProducts.length < products.length && (
            <div className="mt-12 text-center">
              <button className="px-6 py-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-sm">
                Load more
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
