"use client";

import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Aisha Bello",
      role: "Fashion Retailer",
      content:
        "Awuta transformed my small boutique into a thriving online business. The platform's verification system gives buyers confidence, and I've doubled my sales in just three months.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&auto=format&fit=crop",
    },
    {
      name: "Chinedu Okoro",
      role: "Tech Gadgets Vendor",
      content:
        "As a vendor dealing with premium electronics, security was my biggest concern. Awuta's secure payment system and buyer verification gave me the peace of mind I needed.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
    },
    {
      name: "Fatima Ahmed",
      role: "Artisan Seller",
      content:
        "The platform made it so easy to showcase my handmade products. The analytics tools helped me understand what my customers want, and the community support is amazing.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop",
    },
    {
      name: "David Okafor",
      role: "Wholesale Distributor",
      content:
        "Managing multiple vendors was chaotic until I discovered Awuta. The centralized dashboard and communication tools streamlined everything. My business has never been more organized.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=200&auto=format&fit=crop",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 tracking-widest uppercase">
            <div className="w-1 h-1 rounded-full bg-amber-500" />
            Testimonials
            <div className="w-1 h-1 rounded-full bg-amber-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
            Trusted by <span className="font-medium">Vendors</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Hear from vendors who have transformed their businesses with our
            platform.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 md:p-12">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-gray-300 dark:text-gray-700 mb-6" />

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                  "{testimonials[currentIndex].content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonials[currentIndex].rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentIndex === index
                      ? "bg-gray-900 dark:bg-white"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: "50+", label: "Active Vendors" },
            { value: "4.9", label: "Average Rating" },
            { value: "95%", label: "Satisfaction Rate" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg"
            >
              <div className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
