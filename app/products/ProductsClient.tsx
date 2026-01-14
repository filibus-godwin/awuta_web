// app/products/ProductsClient.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Shield,
  CheckCircle,
  ArrowRight,
  Grid,
  List,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Sparkles,
  Zap,
  ChevronDown,
  X,
  ShoppingBag,
  MapPin,
  Clock,
  Heart,
} from "lucide-react";

type Product = {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  listing_media?: {
    path?: string;
  }[];
  price?: {
    value?: number;
  };
  seller?: {
    business?: {
      verified?: boolean;
    };
  };
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  location?: string;
  createdAt?: string;
  featured?: boolean;
};

export default function ProductsClient({ products }: { products: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((product) => {
      if (product.category) cats.add(product.category);
    });
    return ["all", ...Array.from(cats)];
  }, [products]);

  // Filtering and sorting logic
  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const price = product.price?.value || 0;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price?.value || 0) - (b.price?.value || 0);
        case "price-high":
          return (b.price?.value || 0) - (a.price?.value || 0);
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
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  const formatPrice = (price?: number) =>
    price ? `₦${price.toLocaleString()}` : "₦0";

  const formatDate = (date?: string) => {
    if (!date) return "";
    const diff = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 7) return `${diff} days ago`;
    return new Date(date).toLocaleDateString();
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 pt-8 pb-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-500/20 dark:border-blue-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              PREMIUM MARKETPLACE
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
              Discover{" "}
            </span>
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Premium Products
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto lg:mx-0">
            Browse verified products from trusted sellers. Every product is
            quality-checked and backed by our satisfaction guarantee.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {[
            {
              value: products.length.toString(),
              label: "Total Products",
              icon: ShoppingBag,
              color: "from-blue-500 to-cyan-500",
            },
            {
              value: "98%",
              label: "Verified Sellers",
              icon: Shield,
              color: "from-emerald-500 to-green-500",
            },
            {
              value: "4.8",
              label: "Avg Rating",
              icon: Star,
              color: "from-amber-500 to-yellow-500",
            },
            {
              value: "24h",
              label: "Avg Delivery",
              icon: Clock,
              color: "from-purple-500 to-pink-500",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-linear-to-br ${stat.color}/10 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 text-center hover:shadow-lg transition-all duration-300`}
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products, categories, or tags..."
                  className="w-full pl-12 pr-4 py-4 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </button>
                )}
              </div>
            </div>

            {/* View Toggle & Filter Button */}
            <div className="flex items-center gap-3">
              <div className="flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "grid" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  <Grid
                    className={`w-5 h-5 ${
                      viewMode === "grid"
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "list" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  <List
                    className={`w-5 h-5 ${
                      viewMode === "list"
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
              >
                <SlidersHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Filters
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category
                              ? "bg-linear-to-r from-blue-500 to-purple-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Sort By
                    </h3>
                    <div className="space-y-2">
                      {[
                        {
                          value: "featured",
                          label: "Featured",
                          icon: Sparkles,
                        },
                        {
                          value: "price-low",
                          label: "Price: Low to High",
                          icon: TrendingUp,
                        },
                        {
                          value: "price-high",
                          label: "Price: High to Low",
                          icon: TrendingUp,
                        },
                        { value: "rating", label: "Highest Rated", icon: Star },
                        { value: "newest", label: "Newest First", icon: Zap },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className={`flex items-center gap-2 w-full p-2 rounded-lg transition-all ${
                            sortBy === option.value
                              ? "bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <option.icon className="w-4 h-4" />
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Price Range: ₦{priceRange[0].toLocaleString()} - ₦
                      {priceRange[1].toLocaleString()}
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="1000"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>₦0</span>
                        <span>₦10,000,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div className="text-gray-600 dark:text-gray-400">
            <span className="font-bold text-gray-900 dark:text-white text-lg">
              {filteredProducts.length}
            </span>{" "}
            products found
          </div>

          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-gray-600 dark:text-gray-400">
              All products verified
            </span>
            <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600 dark:text-gray-400">
              Secure payments
            </span>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => {
                const image = product.listing_media?.[0]?.path?.startsWith(
                  "listing_media"
                )
                  ? `https://lrugfzihdezsucqxheyn.supabase.co/storage/v1/object/public/${product.listing_media[0].path}`
                  : product.listing_media?.[0]?.path ||
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop";

                const isFavorite = favorites.has(product.id);

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    whileHover={{ y: -8 }}
                    className="relative group"
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                          <motion.img
                            src={image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            whileHover={{ scale: 1.1 }}
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Favorite Button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(product.id);
                            }}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                isFavorite
                                  ? "text-red-500 fill-red-500"
                                  : "text-gray-400"
                              }`}
                            />
                          </button>

                          {/* Tags */}
                          {product.tags && product.tags.length > 0 && (
                            <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                              {product.tags.slice(0, 2).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs font-medium bg-linear-to-r from-blue-500/90 to-purple-500/90 text-white rounded-full backdrop-blur-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Verified Badge */}
                          {product.seller?.business?.verified && (
                            <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full">
                              <Shield className="w-3 h-3 text-emerald-500" />
                              <span className="text-xs font-medium text-gray-900 dark:text-white">
                                Verified
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {product.category || "Uncategorized"}
                            </span>
                            {product.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {product.rating.toFixed(1)}
                                </span>
                              </div>
                            )}
                          </div>

                          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 text-lg">
                            {product.title || "Untitled Product"}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm mb-4">
                            {product.description || "No description available"}
                          </p>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price?.value)}
                              </div>
                              {product.location && (
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  <MapPin className="w-3 h-3" />
                                  {product.location}
                                </div>
                              )}
                            </div>

                            <button className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                              <span className="font-semibold text-sm">
                                View
                              </span>
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            <AnimatePresence>
              {filteredProducts.map((product, index) => {
                const image = product.listing_media?.[0]?.path?.startsWith(
                  "listing_media"
                )
                  ? `https://lrugfzihdezsucqxheyn.supabase.co/storage/v1/object/public/${product.listing_media[0].path}`
                  : product.listing_media?.[0]?.path ||
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w-400&auto=format&fit=crop";

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    whileHover={{ x: 4 }}
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start gap-6">
                          {/* Image */}
                          <div className="relative w-32 h-32 shrink-0 rounded-2xl overflow-hidden">
                            <img
                              src={image}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                  {product.title || "Untitled Product"}
                                </h3>
                                <div className="flex items-center gap-4 mb-3">
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {product.category || "Uncategorized"}
                                  </span>
                                  {product.seller?.business?.verified && (
                                    <div className="flex items-center gap-1">
                                      <Shield className="w-3 h-3 text-emerald-500" />
                                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                        Verified Seller
                                      </span>
                                    </div>
                                  )}
                                  {product.createdAt && (
                                    <span className="text-xs text-gray-400 dark:text-gray-500">
                                      {formatDate(product.createdAt)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price?.value)}
                              </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                              {product.description ||
                                "No description available"}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {product.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                      {product.rating.toFixed(1)}
                                    </span>
                                  </div>
                                )}
                                {product.tags && product.tags.length > 0 && (
                                  <div className="flex gap-2">
                                    {product.tags
                                      .slice(0, 3)
                                      .map((tag, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-1 text-xs font-medium bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 rounded-full"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                  </div>
                                )}
                              </div>

                              <button className="group inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                                <span className="font-semibold">
                                  View Details
                                </span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </button>
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
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange([0, 10000000]);
              }}
              className="px-6 py-3 bg-linear-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 &&
          filteredProducts.length < products.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 text-center"
            >
              <button className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 mx-auto font-semibold text-lg">
                Load More Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
      </div>
    </div>
  );
}
