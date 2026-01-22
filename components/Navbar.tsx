"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Apple,
  Menu,
  X,
  ShoppingBag,
  Shield,
  Zap,
  ChevronRight,
  Sparkles,
  Globe,
  Moon,
  Sun,
} from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setDarkMode(mediaQuery.matches);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { label: "Products", href: "/products", icon: ShoppingBag },
    // { label: "Vendors", href: "/vendors", icon: Sparkles },
    // { label: "Features", href: "/features", icon: Zap },
    { label: "Privacy Policy", href: "/privacy", icon: Shield },
    { label: "Terms", href: "/terms", icon: Sparkles },
  ];

  return (
    <header
      className={`
        fixed top-0 inset-x-0 z-50 transition-all duration-500
        ${
          scrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg shadow-black/5 py-3"
            : "bg-transparent py-6"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo with Animation */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 rounded-xl border border-blue-400/30"
            />
          </motion.div>

          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
              Awuta
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium tracking-widest uppercase">
              Premium
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative px-6 py-2"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                <span className="font-medium text-sm tracking-wide">
                  {item.label}
                </span>
              </motion.div>

              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500"
                whileHover={{
                  width: "80%",
                  left: "10%",
                  transition: { duration: 0.3 },
                }}
              />
            </Link>
          ))}
        </nav>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </motion.button>

          {/* Language Selector */}
          {/* <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">EN</span>
          </button> */}

          {/* Download Button - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex items-center gap-3"
          >
            <button className="group relative overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 font-medium text-sm hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                <Apple className="w-4 h-4" />
                Download
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-2xl"
          >
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-500 transition-colors" />
                </Link>
              ))}

              {/* Mobile App Downloads */}
              <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 px-4">
                  Download Our App
                </div>

                <div className="grid grid-cols-2 gap-3 px-4">
                  <button className="group relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/20">
                        <Apple className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs opacity-80">Download on</div>
                        <div className="font-semibold">App Store</div>
                      </div>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>

                  <button className="group relative overflow-hidden p-4 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300">
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/20 dark:bg-white/10">
                        <FaGooglePlay className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs opacity-80">Get it on</div>
                        <div className="font-semibold">Play Store</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Mobile Footer */}
                <div className="mt-6 px-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Version 2.0</span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Secure & Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
