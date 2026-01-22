"use client";

import Link from "next/link";
import {
  ArrowUp,
  Mail,
  MapPin,
  Phone,
  Heart,
  ChevronRight,
  Globe,
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription
      console.log("Subscribing email:", email);
      setEmail("");
      // Add your newsletter logic here
    }
  };

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "For Vendors", href: "/vendors" },
        { label: "For Buyers", href: "/buyers" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Features", href: "/features" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "FAQs", href: "/faq" },
        { label: "Status", href: "/status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
      ],
    },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@awuta.com", href: "mailto:hello@awuta.com" },
    { icon: Phone, text: "+234 810 646 9653", href: "tel:08106469653" },
    {
      icon: MapPin,
      text: "Bauchi, Nigeria",
      href: "https://maps.google.com/?q=Bauchi+Nigeria",
      target: "_blank",
    },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Newsletter Section */}
        {/* <div className="mb-12">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Stay updated with Awuta
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              Get the latest updates, tips, and marketplace insights delivered
              to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1"
              >
                Subscribe
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div> */}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Brand & Contact */}
          <div className="space-y-6">
            {/* Brand */}
            <div>
              <div className="text-2xl font-medium text-gray-900 dark:text-white mb-3">
                Awuta
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Empowering African commerce through secure, verified marketplace
                transactions.
              </p>

              {/* Tagline */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                <Heart className="w-3 h-3 fill-current" />
                <span>Trusted by vendors across Africa</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.target}
                  rel={contact.target ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                  <contact.icon className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform">
                    {contact.text}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group flex items-center gap-2"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-800 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright & Made with love */}
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>© {currentYear} Awuta. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1">
                Made with{" "}
                <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />{" "}
                in Nigeria
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Awuta is a product of Defsignal • BN: 123456789
            </p>
          </div>

          {/* Language & Currency Selector */}
          {/* <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Globe className="w-4 h-4" />
              <select className="bg-transparent focus:outline-none cursor-pointer">
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="sw">Swahili</option>
                <option value="yo">Yoruba</option>
                <option value="ha">Hausa</option>
              </select>
            </div>

            <select className="text-sm bg-transparent text-gray-500 dark:text-gray-400 focus:outline-none cursor-pointer">
              <option value="ngn">NGN ₦</option>
              <option value="usd">USD $</option>
              <option value="eur">EUR €</option>
              <option value="gbp">GBP £</option>
            </select>
          </div> */}
        </div>

        {/* Trust Badges */}
        {/* <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 dark:text-gray-500">
            <span>PCI DSS Compliant</span>
            <span>•</span>
            <span>GDPR Ready</span>
            <span>•</span>
            <span>256-bit Encryption</span>
            <span>•</span>
            <span>10K+ Verified Users</span>
          </div>
        </div> */}
      </div>

      {/* Back to Top - Enhanced */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-50 group"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-600/20 dark:group-hover:border-blue-400/20 transition-colors" />
      </button>
    </footer>
  );
}
