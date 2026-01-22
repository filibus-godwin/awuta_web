"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, CheckCircle, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { icon: Shield, text: "Verified Sellers", count: "1K+" },
    { icon: Star, text: "Premium Products", count: "5K+" },
    { icon: CheckCircle, text: "Secure Payments", count: "100%" },
    { icon: Sparkles, text: "Quality Guaranteed", count: "24/7" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-black">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 dark:from-emerald-500/5 dark:via-cyan-500/5 dark:to-blue-500/5 rounded-full blur-3xl"
        />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.1),transparent_50%)]" />

        {/* Grid pattern with dark mode */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0.3 }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0
                ? "bg-blue-500 dark:bg-blue-400"
                : i % 3 === 1
                  ? "bg-purple-500 dark:bg-purple-400"
                  : "bg-pink-500 dark:bg-pink-400"
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-20 lg:py-0">
        <div className="flex flex-col items-center text-center">
          {/* Main Headline with Typography Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 lg:mb-12"
          >
            <div className="text-lg md:text-xl font-light tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2 uppercase">
              Every
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-gray-900 dark:text-white mb-2">
              <span className="relative">
                VENDOR
                <motion.div
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                />
              </span>
            </h1>
            <div className="text-lg md:text-xl font-light tracking-[0.3em] text-gray-500 dark:text-gray-400 mt-2 uppercase">
              Deserves The Spotlight
            </div>
          </motion.div>

          {/* Elegant Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl lg:max-w-3xl mb-12 lg:mb-16"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light px-4">
              Discover{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                verified products
              </span>{" "}
              from trusted sellers with{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                secure, seamless transactions
              </span>
              . Experience shopping redefined with premium quality and
              exceptional service.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16 max-w-3xl w-full px-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/20 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {feature.count}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {feature.text}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Elegant CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center"
          >
            <Link
              href="/shop"
              className="group relative overflow-hidden px-8 lg:px-12 py-4 lg:py-5 rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white text-white dark:text-gray-900 font-medium hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-sm">
                Start Shopping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </Link>

            <Link
              href="/explore"
              className="group px-8 lg:px-12 py-4 lg:py-5 rounded-full border-2 border-gray-900 dark:border-white/30 bg-transparent text-gray-900 dark:text-white font-medium hover:bg-gray-900 dark:hover:bg-white/10 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:border-gray-900 dark:hover:border-white/50 uppercase tracking-widest text-sm"
            >
              Explore Vendors
            </Link>
          </motion.div>

          {/* Trust Badges */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 lg:mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span>4.9/5 Rating</span>
            </div>
            <div className="hidden lg:block w-px h-4 bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>SSL Secured</span>
            </div>
            <div className="hidden lg:block w-px h-4 bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span>24/7 Support</span>
            </div>
          </motion.div> */}
        </div>
      </div>

      {/* Bottom Marquee Banner */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 overflow-hidden bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 dark:from-black/95 dark:via-gray-900/95 dark:to-black/95 border-t border-white/10 dark:border-white/5 py-4 lg:py-6"
      >
        <div className="flex">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex whitespace-nowrap"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="mx-8 text-lg lg:text-xl font-light tracking-widest text-white/80 dark:text-white/70">
                  PREMIUM VENDORS • TRUSTED PRODUCTS • SECURE TRANSACTIONS •
                  EXCEPTIONAL SERVICE •
                </span>
                <Sparkles className="w-5 h-5 text-yellow-400 mx-2" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div> */}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-gray-400 dark:text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent dark:from-gray-500 dark:to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
