// app/product/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-3xl animate-pulse" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="space-y-6">
            <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>

            <div className="flex gap-4 pt-6">
              <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
              <div className="h-12 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            </div>

            {/* Seller Skeleton */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
