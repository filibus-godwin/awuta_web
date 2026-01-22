"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Features() {
  const features = [
    {
      title: "Smart Discovery",
      description: "AI-powered search finds exactly what you're looking for",
      benefits: ["Personalized results", "Smart filters", "Instant matching"],
    },
    {
      title: "Verified Trust",
      description: "Every vendor and product meets our quality standards",
      benefits: [
        "Vendor verification",
        "Product certification",
        "User reviews",
      ],
    },
    {
      title: "Secure Communication",
      description: "Encrypted messaging with file sharing capabilities",
      benefits: [
        "End-to-end encryption",
        "Secure file sharing",
        "Real-time chat",
      ],
    },
  ];

  const userGroups = [
    {
      title: "For Buyers",
      items: [
        "Personalized recommendations",
        "Secure payment protection",
        "Real-time order tracking",
        "Verified seller ratings",
      ],
    },
    {
      title: "For Vendors",
      items: [
        "Analytics dashboard",
        "Inventory management",
        "Marketing tools",
        "Performance insights",
      ],
    },
    {
      title: "Mobile Experience",
      items: [
        "iOS & Android apps",
        "Offline mode support",
        "Push notifications",
        "Biometric login",
      ],
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Minimal background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 dark:bg-purple-900/10 rounded-full blur-3xl" />
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
            <div className="w-1 h-1 rounded-full bg-purple-500" />
            Features
            <div className="w-1 h-1 rounded-full bg-purple-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white tracking-tight mb-4">
            Designed for <span className="font-medium">Modern Commerce</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Intelligent tools that transform how buyers and vendors connect in
            today's marketplace.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 md:mb-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                {/* Feature number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-sm font-medium">
                  0{index + 1}
                </div>

                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* User Groups Section with Images */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20 md:mb-32"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-2">
              Built for <span className="font-medium">Everyone</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tailored solutions for every user on our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {userGroups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                {/* User image placeholder */}
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {/* Placeholder for African buyer images */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4" />
                      <div className="text-sm">Modern African Buyer</div>
                    </div>
                  </div>
                </div>

                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  {group.title}
                </h4>

                <ul className="space-y-3">
                  {group.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ArrowRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-50 dark:bg-gray-800/30 rounded-2xl p-8 md:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="w-1 h-1 rounded-full bg-green-500" />
                Security & Trust
              </div>

              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
                Your Data is Protected
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We employ bank-level encryption, regular security audits, and
                compliance with global data protection standards to ensure
                complete peace of mind.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "GDPR Compliant", value: "100%" },
                  { label: "PCI DSS Certified", value: "Tier 1" },
                  { label: "256-bit Encryption", value: "AES-256" },
                  { label: "Security Score", value: "9.8/10" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <div className="text-2xl font-medium text-gray-900 dark:text-white mb-1">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security visualization */}
            <div className="relative">
              <div className="aspect-square rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
