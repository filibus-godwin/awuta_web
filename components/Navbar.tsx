"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Awuta
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/products">Products</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          <Link href="/products" onClick={() => setOpen(false)}>
            Products
          </Link>
          <Link href="/privacy" onClick={() => setOpen(false)}>
            Privacy
          </Link>
          <Link href="/terms" onClick={() => setOpen(false)}>
            Terms
          </Link>
        </div>
      )}
    </header>
  );
}
