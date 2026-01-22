"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Vendors List Products",
      description:
        "Verified vendors showcase their premium products with detailed descriptions and transparent pricing.",
      color: "border-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      number: "02",
      title: "Buyers Discover & Explore",
      description:
        "Find exactly what you need with intelligent search and personalized recommendations.",
      color: "border-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      number: "03",
      title: "Secure Purchase",
      description:
        "Complete seamless transactions with secure payments and real-time order tracking.",
      color: "border-emerald-400",
      bg: "bg-emerald-400/10",
    },
  ];

  const features = [
    {
      title: "Verified Vendors",
      description: "Rigorous verification ensures quality and trust",
      highlight: "99.8% satisfaction",
    },
    {
      title: "Secure Payments",
      description: "Bank-level encryption protects all transactions",
      highlight: "SSL encrypted",
    },
    {
      title: "Quality Assurance",
      description: "Every product undergoes thorough quality checks",
      highlight: "100% inspected",
    },
    {
      title: "Community Trust",
      description: "Join thousands of verified marketplace members",
      highlight: "50k+ members",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-32 bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 tracking-widest uppercase">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            Process
            <div className="w-1 h-1 rounded-full bg-blue-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white tracking-tight">
            How It <span className="font-medium">Works</span>
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A streamlined three-step process designed for security and
            efficiency.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-emerald-400/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 md:mt-32"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white">
              Built on <span className="font-medium">Trust</span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group"
              >
                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {feature.description}
                      </p>
                      <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {feature.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            Ready to get started?
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
