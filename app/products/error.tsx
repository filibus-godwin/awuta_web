"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold mb-2">Something went wrong 😕</h2>

      <p className="text-gray-600 mb-6">
        We couldn’t load the products. Please try again.
      </p>

      <button
        onClick={reset}
        className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}
