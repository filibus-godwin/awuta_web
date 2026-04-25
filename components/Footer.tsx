"use client";

import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Products", href: "/products" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
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
    <footer className="border-t border-gray-200 mt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Brand & Contact */}
          <div className="space-y-6">
            <div>
              <div className="text-2xl font-medium text-gray-900 mb-3">
                Awuta
              </div>
              <p className="text-gray-600 max-w-sm">
                A marketplace for buying and selling products in Nigeria with
                verified sellers and secure payments.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.target}
                  rel={contact.target ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <contact.icon className="w-4 h-4" />
                  <span>{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Links */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">
              Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>&copy; {currentYear} Awuta. All rights reserved.</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="inline-flex items-center gap-1">
                Made with{" "}
                <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in
                Nigeria
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Awuta is a product of Defsignal
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-300 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 text-gray-700" />
      </button>
    </footer>
  );
}
