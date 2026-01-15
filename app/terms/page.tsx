import React from "react";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  FileText,
  Scale,
  Mail,
  Globe,
  CheckCircle,
} from "lucide-react";
import TOCScrollHandler from "@/components/TOCScrollHandler";

export default function TermsPage() {
  const filePath = path.join(process.cwd(), "content", "awuta-terms-of-use.md");
  const markdown = fs.readFileSync(filePath, "utf8");

  return (
    <>
      <TOCScrollHandler />
      <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950/20 py-8 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          {/* <div className="mb-8 md:mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-semibold">Back to Home</span>
            </Link>
          </div> */}

          {/* Content Container */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700">
            {/* Header Section */}
            <div className="text-center mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Legal Terms
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Terms of Use
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Last updated:{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  8th January, 2026
                </span>
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Read carefully</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  <span>Legal agreement</span>
                </div>
              </div>
            </div>

            {/* Markdown Content - SIMPLIFIED */}
            <div className="terms-markdown prose prose-lg dark:prose-invert prose-headings:scroll-mt-24 max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Simple overrides without complex logic
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 mt-2 pb-4 border-b-2 border-blue-100 dark:border-blue-900"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => {
                    // Extract text for ID
                    const children = props.children as string;
                    const id =
                      typeof children === "string"
                        ? children.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                        : "section";

                    return (
                      <h2
                        id={id}
                        className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mt-12 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700"
                        {...props}
                      />
                    );
                  },
                  h3: ({ node, children, ...props }) => {
                    const text = children?.toString() || "";
                    const match = text.match(/^(\d+)\.\s+(.*)/);

                    if (match) {
                      const [, number, title] = match;
                      const id = `${number}-${title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`;

                      return (
                        <h3
                          id={id}
                          className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mt-10 mb-4 flex items-center gap-4"
                          {...props}
                        >
                          <span className="shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-lg flex items-center justify-center">
                            {number}
                          </span>
                          <span>{title}</span>
                        </h3>
                      );
                    }

                    return (
                      <h3
                        className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mt-10 mb-4"
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  p: ({ node, ...props }) => (
                    <p
                      className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      className="font-bold text-gray-900 dark:text-white"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => {
                    const isTocLink = props.href?.startsWith("#");
                    return (
                      <a
                        className={
                          isTocLink
                            ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                            : "text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 underline"
                        }
                        {...props}
                      />
                    );
                  },
                  ul: ({ node, ...props }) => (
                    <ul className="space-y-2 mb-6 pl-5 list-disc" {...props} />
                  ),
                  ol: ({ node, ...props }) => {
                    // Check if it's the TOC list by looking at the content
                    const children = props.children as any;
                    const isToc =
                      Array.isArray(children) &&
                      children.some((child) =>
                        child?.props?.children
                          ?.toString()
                          .includes("Acceptance of Terms")
                      );

                    if (isToc) {
                      return (
                        <div className="mb-12">
                          <div className="p-6 bg-linear-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                              <div className="w-2 h-8 bg-linear-to-b from-blue-500 to-purple-500 rounded-full"></div>
                              Table of Contents
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {children}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <ol
                        className="space-y-2 mb-6 pl-5 list-decimal"
                        {...props}
                      />
                    );
                  },
                  li: ({ node, children, ...props }) => {
                    // Check if it's a TOC item
                    const isTocItem = React.Children.toArray(children).some(
                      (child) =>
                        typeof child === "object" &&
                        "props" in child &&
                        child.props?.href?.startsWith("#")
                    );

                    if (isTocItem) {
                      return (
                        <li className="mb-0" {...props}>
                          <div className="group">
                            {React.Children.map(children, (child) => {
                              if (
                                React.isValidElement(child) &&
                                child.type === "a"
                              ) {
                                const href = child.props.href;
                                const text = child.props.children;
                                const numberMatch = text
                                  ?.toString()
                                  .match(/^(\d+)\.\s*(.*)/);

                                return (
                                  <a
                                    href={href}
                                    className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200"
                                  >
                                    <div className="shrink-0 w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                      {numberMatch ? numberMatch[1] : ""}
                                    </div>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                      {numberMatch ? numberMatch[2] : text}
                                    </span>
                                  </a>
                                );
                              }
                              return child;
                            })}
                          </div>
                        </li>
                      );
                    }

                    return (
                      <li
                        className="text-gray-700 dark:text-gray-300 mb-2"
                        {...props}
                      >
                        {children}
                      </li>
                    );
                  },
                  hr: ({ node, ...props }) => (
                    <div className="my-8">
                      <hr
                        className="border-gray-300 dark:border-gray-700"
                        {...props}
                      />
                    </div>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>

            {/* Important Notice Box */}
            <div className="mt-12 p-6 md:p-8 rounded-2xl bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Important Notice
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    By using Awuta, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms of Use. If
                    you do not agree, please discontinue use of the Service
                    immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer section */}
            <div className="mt-14 pt-10 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Scale className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        Legal Agreement
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Terms of Use • Awuta Platform
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
                    This document constitutes a binding legal agreement between
                    you and Awuta. Keep a copy for your records.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>I Understand & Agree</span>
                  </Link>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-500 dark:text-gray-500 text-sm text-center md:text-left">
                    © 2026 Awuta. All rights reserved. This document may be
                    updated periodically.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                      Version 2026.01.08
                    </span>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">Nigeria</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
