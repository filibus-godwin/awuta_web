// app/products/error.tsx
"use client";

import { useEffect } from "react";
import { RefreshCw, AlertCircle, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-linear-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-red-500/10 to-orange-500/10 rounded-full blur-2xl" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Something went wrong
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          We couldn't load the products. Please try again or return to the
          homepage.
        </p>

        {error.digest && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <code className="text-xs text-gray-500 dark:text-gray-400 break-all">
              Error ID: {error.digest}
            </code>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="group px-6 py-3 bg-linear-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 font-semibold"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Try again
          </button>

          <Link
            href="/"
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 font-semibold"
          >
            <Home className="w-4 h-4" />
            Go Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
