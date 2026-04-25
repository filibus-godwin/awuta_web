"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  X,
  MapPin,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import type { Post } from "@/lib/types";
import {
  formatPrice,
  getPostTitle,
  getPostImage,
  getAuthorAvatar,
  getLocationDisplay,
} from "@/lib/types";

export default function ProductsClient({ products }: { products: Post[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Extract categories from aspects
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((product) => {
      const catAspect = product.aspects?.find(
        (a) =>
          a.aspectName.toLowerCase().includes("category") ||
          a.aspectName.toLowerCase().includes("type") ||
          a.aspectName.toLowerCase().includes("department"),
      );
      if (catAspect?.aspectValue) cats.add(String(catAspect.aspectValue));
    });
    return ["all", ...Array.from(cats)];
  }, [products]);

  // Filter and sort
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const title = getPostTitle(product).toLowerCase();
      const desc = (product.description || "").toLowerCase();
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        !search || title.includes(search) || desc.includes(search);

      const catAspect = product.aspects?.find(
        (a) =>
          a.aspectName.toLowerCase().includes("category") ||
          a.aspectName.toLowerCase().includes("type") ||
          a.aspectName.toLowerCase().includes("department"),
      );
      const category = catAspect?.aspectValue
        ? String(catAspect.aspectValue)
        : "Uncategorized";
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price?.value || 0) - (b.price?.value || 0);
        case "price-high":
          return (b.price?.value || 0) - (a.price?.value || 0);
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-[rgb(0,25,0)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 tracking-widest uppercase">
            <div className="w-1 h-1 rounded-full bg-[rgb(91,199,97)]" />
            Products
            <div className="w-1 h-1 rounded-full bg-[rgb(91,199,97)]" />
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white tracking-tight mb-4">
            Browse <span className="font-medium">Products</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl">
            Products from verified sellers on Awuta.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
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

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              {/* View Toggle */}
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
                    className={`w-4 h-4 ${viewMode === "grid" ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}
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
                    className={`w-4 h-4 ${viewMode === "list" ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}
                  />
                </button>
              </div>

              {/* Filter Toggle */}
              {categories.length > 2 && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Filters</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-transparent text-sm focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
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
                            ? "bg-[rgb(91,199,97)] text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {category === "all"
                          ? "All"
                          : category.charAt(0).toUpperCase() +
                            category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              {filteredProducts.length}
            </span>{" "}
            products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const image = getPostImage(product);
            const title = getPostTitle(product);
            const avatar = getAuthorAvatar(product.author);
            const locationStr = getLocationDisplay(product.location);

            return (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-colors h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}

                    {/* Business Badge */}
                    {product.author?.business && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {product.author.business.name}
                        </span>
                      </div>
                    )}

                    {/* Sale Badge */}
                    {product.price?.onSale && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-lg">
                        Sale
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-3">
                      <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
                        {title}
                      </h3>

                      {product.description && product.description !== title && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {product.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-medium text-gray-900 dark:text-white">
                            {formatPrice(product.price)}
                          </div>
                          {product.price?.negotiable && (
                            <span className="text-xs text-[rgb(91,199,97)]">
                              Negotiable
                            </span>
                          )}
                          {locationStr && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <MapPin className="w-3 h-3" />
                              {locationStr}
                            </div>
                          )}
                        </div>

                        <span className="flex items-center gap-1 text-sm font-medium text-[rgb(91,199,97)]">
                          View
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>

                      {/* Seller Info */}
                      {product.author && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                          {avatar && (
                            <img
                              src={avatar}
                              alt={product.author.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {product.author.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {product.author.postCount} listings
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
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
          </div>
        )}
      </div>
    </div>
  );
}
