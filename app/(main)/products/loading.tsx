// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-12">
          <div className="h-10 w-64 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl mb-6 animate-pulse" />
          <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded-lg mb-8 animate-pulse" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="mb-10">
          <div className="h-14 bg-gray-100 dark:bg-gray-800/50 rounded-2xl w-full max-w-2xl animate-pulse" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="relative">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                {/* Image Skeleton */}
                <div className="aspect-square bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse" />

                {/* Content Skeleton */}
                <div className="p-6">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 animate-pulse" />
                  <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 animate-pulse" />
                  <div className="h-8 w-24 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
