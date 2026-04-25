"use client";

import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[rgb(0,15,0)]">
      {/* Hero Banner Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/banner.png"
          alt="Awuta Marketplace"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 dark:from-[rgb(0,15,0)]/95 dark:via-[rgb(0,15,0)]/80 dark:to-[rgb(0,15,0)]/40" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-20 lg:py-0">
        <div className="max-w-2xl">
          <div className="mb-6">
            <div className="text-sm md:text-base font-light tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3 uppercase">
              Buy & Sell with
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[rgb(13,41,23)] dark:text-white">
              Confidence
            </h1>
            <div className="text-sm md:text-base font-light tracking-[0.3em] text-gray-500 dark:text-gray-400 mt-3 uppercase">
              On Awuta
            </div>
          </div>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-lg">
            A marketplace where sellers are verified and payments are secure.
            Browse products from real sellers across Nigeria.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/products"
              className="px-8 py-4 rounded-full bg-[rgb(91,199,97)] text-white font-medium hover:bg-[rgb(75,170,80)] transition-colors duration-300 flex items-center gap-3 uppercase tracking-widest text-sm"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Shield className="w-3 h-3 text-[rgb(91,199,97)]" />
            <span>Payments secured by Paystack</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
