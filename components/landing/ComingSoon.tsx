"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  UserCheck,
  ShoppingBag,
  CreditCard,
  Store,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const features = [
    {
      icon: UserCheck,
      title: "Verified Sellers",
      description: "Every seller is verified through BVN validation",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Transactions powered by Paystack",
    },
    {
      icon: ShoppingBag,
      title: "Product Catalog",
      description: "Browse real listings with photos and pricing",
    },
    {
      icon: Store,
      title: "Seller Storefronts",
      description: "Each seller gets their own profile page",
    },
    {
      icon: Shield,
      title: "Cart & Invoicing",
      description: "Add to cart, get an invoice, and pay securely",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/banner.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/assets/logo.png"
            alt="Awuta"
            width={80}
            height={32}
            className="mx-auto mb-4"
          />
          <div className="text-center">
            <span className="text-2xl font-bold text-[rgb(13,41,23)] tracking-tight">
              Awuta
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-sm font-medium tracking-[0.3em] text-[rgb(91,199,97)] uppercase mb-4">
            Coming Soon
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[rgb(13,41,23)] mb-6">
            A Better Way to{" "}
            <span className="font-medium">Buy & Sell</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
            A marketplace where sellers are verified and payments are secure.
            We're building something great for Nigeria.
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="w-full max-w-md mx-auto mb-16">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[rgb(91,199,97)] focus:ring-1 focus:ring-[rgb(91,199,97)] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[rgb(91,199,97)] text-white font-medium hover:bg-[rgb(75,170,80)] transition-colors whitespace-nowrap"
              >
                Join Waitlist
              </button>
            </form>
          ) : (
            <div className="text-center p-4 rounded-lg bg-[rgb(91,199,97)]/10 border border-[rgb(91,199,97)]/20">
              <p className="text-[rgb(13,41,23)] font-medium">
                Thank you! We'll notify you when we launch.
              </p>
            </div>
          )}
          <p className="text-xs text-gray-500 text-center mt-3">
            Be the first to know when Awuta launches. No spam.
          </p>
        </div>

        {/* Feature Preview */}
        <div className="w-full max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-medium tracking-[0.2em] text-gray-500 uppercase text-center mb-8">
            What we're building
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50"
              >
                <feature.icon className="w-6 h-6 text-[rgb(91,199,97)] mx-auto mb-3" />
                <h3 className="text-sm font-medium text-[rgb(13,41,23)] mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Browse Early Listings */}
        <div className="mb-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-[rgb(13,41,23)] font-medium hover:bg-white/80 hover:border-gray-400 transition-colors text-sm"
          >
            Browse early listings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-gray-200/50 bg-white/60 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Contact */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-4">
            <a
              href="mailto:hello@awuta.com"
              className="inline-flex items-center gap-1.5 hover:text-gray-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              hello@awuta.com
            </a>
            <a
              href="tel:08106469653"
              className="inline-flex items-center gap-1.5 hover:text-gray-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +234 810 646 9653
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Bauchi, Nigeria
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
            <Link
              href="/privacy"
              className="hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300">&bull;</span>
            <Link
              href="/terms"
              className="hover:text-gray-700 transition-colors"
            >
              Terms of Use
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Awuta. A product of Defsignal.
          </p>
        </div>
      </div>
    </div>
  );
}
