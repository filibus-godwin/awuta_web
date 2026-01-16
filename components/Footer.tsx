"use client";

import Link from "next/link";
import {
  Apple,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
  Globe,
  Heart,
  ArrowUpRight,
  Store,
  ShoppingBag,
  TrendingUp,
  Users,
  MessageSquare,
  Shield,
} from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "For Vendors", href: "/vendors", icon: Store },
        { label: "For Buyers", href: "/buyers", icon: ShoppingBag },
        { label: "How It Works", href: "/how-it-works", icon: TrendingUp },
        { label: "Features", href: "/features", icon: Shield },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about", icon: Users },
        { label: "Contact", href: "/contact", icon: MessageSquare },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "/help", icon: ArrowUpRight },
        { label: "Blog", href: "/blog", icon: ArrowUpRight },
        { label: "Community", href: "/community", icon: Users },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy", icon: Shield },
        { label: "Terms of Service", href: "/terms", icon: ArrowUpRight },
        { label: "Cookie Policy", href: "/cookies", icon: ArrowUpRight },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/awuta", label: "Twitter" },
    {
      icon: Instagram,
      href: "https://instagram.com/awuta",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/awuta",
      label: "LinkedIn",
    },
    { icon: Github, href: "https://github.com/awuta", label: "GitHub" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@awuta.com", href: "mailto:hello@awuta.com" },
    { icon: Phone, text: "+234 810 646 9653", href: "tel:08106469653" },
    {
      icon: MapPin,
      text: "Flat 1, House No. 4 Off Dass Park Road, Dogon Yaro Roundabout, Bauchi, Bauchi State.",
      href: "#",
    },
  ];

  return (
    <footer className="relative mt-24 md:mt-32 border-t border-gray-200/50 dark:border-gray-800/50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-50/30 dark:to-gray-900/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Brand & Contact */}
          <div className="space-y-8">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="w-6 h-6 text-white">A</div>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Awuta
                </span>
                <div className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium inline-block ml-2">
                  Beta
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              Awuta is a product of Defsignal
            </p>
            <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              The future of marketplace transactions. Connecting verified
              vendors with premium buyers in a secure, seamless ecosystem.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                  <contact.icon className="w-4 h-4" />
                  <span>{contact.text}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>

            {/* App Download Buttons */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                Download our mobile app
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="group flex items-center gap-3 px-5 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all active:scale-95">
                  <Apple className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">Download on the</div>
                    <div className="font-semibold text-sm">App Store</div>
                  </div>
                </button>
                <button className="group flex items-center gap-3 px-5 py-3 bg-white/10 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all active:scale-95">
                  <FaGooglePlay className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">Get it on</div>
                    <div className="font-semibold text-sm">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group text-sm"
                      >
                        <link.icon className="w-3 h-3 opacity-60" />
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-gray-500 dark:text-gray-500 text-sm">
            © {currentYear} Awuta Data. All rights reserved.
            <span className="mx-2">•</span>
            <span className="inline-flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" />{" "}
              in Nigeria.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Language & Currency */}
          <div className="flex items-center gap-4 text-sm">
            <select className="bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none cursor-pointer">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <select className="bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none cursor-pointer">
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
              <option value="ngn">NGN</option>
            </select>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 dark:text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>GDPR Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>10K+ Verified Users</span>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-xl z-50"
          aria-label="Back to top"
        >
          <ArrowUpRight className="w-5 h-5 rotate-45 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </footer>
  );
}
