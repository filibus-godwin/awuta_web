"use client";

import { ArrowRight, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Sellers List Products",
      description:
        "Verified sellers list their products with photos, descriptions, and transparent pricing.",
      color: "border-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      number: "02",
      title: "Buyers Browse & Discover",
      description:
        "Find what you need by browsing listings or searching for specific products.",
      color: "border-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      number: "03",
      title: "Pay Securely",
      description:
        "Complete your purchase through Paystack with secure payment processing.",
      color: "border-emerald-400",
      bg: "bg-emerald-400/10",
    },
  ];

  const features = [
    {
      title: "Verified Sellers",
      description: "Sellers are verified through BVN validation before they can sell",
    },
    {
      title: "Secure Payments",
      description: "All payments are processed securely through Paystack",
    },
    {
      title: "Transparent Pricing",
      description: "Product prices are listed upfront with no hidden fees",
    },
    {
      title: "Mobile App",
      description: "Available on iOS and Android for shopping on the go",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-32 bg-white dark:bg-[rgb(0,25,0)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 tracking-widest uppercase">
            <div className="w-1 h-1 rounded-full bg-[rgb(91,199,97)]" />
            Process
            <div className="w-1 h-1 rounded-full bg-[rgb(91,199,97)]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white tracking-tight">
            How It <span className="font-medium">Works</span>
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A simple three-step process from listing to purchase.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-emerald-400/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Step indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div
                    className={`relative w-16 h-16 rounded-full border-2 ${step.color} ${step.bg} flex items-center justify-center`}
                  >
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {step.number}
                    </span>
                    {index < steps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute -right-12 text-gray-400 dark:text-gray-600" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 md:mt-32">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white">
              What We <span className="font-medium">Offer</span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="relative group">
                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[rgb(91,199,97)] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
