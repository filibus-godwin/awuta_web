import React from "react";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  User,
  Mail,
  Globe,
  CheckCircle,
  Database,
  Bell,
} from "lucide-react";
import TOCScrollHandler from "@/components/TOCScrollHandler";

export default function PrivacyPolicyPage() {
  const filePath = path.join(
    process.cwd(),
    "content",
    "awuta-privacy-policy.md"
  );
  const markdown = fs.readFileSync(filePath, "utf8");

  return (
    <>
      <TOCScrollHandler />
      <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950/20 py-8 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          {/* <div className="mb-8 md:mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-semibold">Back to Home</span>
            </Link>
          </div> */}

          {/* Content Container */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700">
            {/* Header Section */}
            <div className="text-center mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
                <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Data Protection
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Last updated:{" "}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  27th December 2025
                </span>
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Your data is protected</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Transparent practices</span>
                </div>
              </div>
            </div>

            {/* Privacy Badges */}
            <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                      Age 16+
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Minimum age
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-700 dark:text-blue-300">
                      Data Security
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Protected storage
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-700 dark:text-purple-300">
                      Your Control
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Access & delete
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-700 dark:text-amber-300">
                      No Data Sales
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We don't sell data
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Markdown Content */}
            <div className="privacy-markdown prose prose-lg dark:prose-invert prose-headings:scroll-mt-24 max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 mt-2 pb-4 border-b-2 border-emerald-100 dark:border-emerald-900"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => {
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
                          <span className="shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 font-bold text-lg flex items-center justify-center">
                            {number}
                          </span>
                          <span>{title}</span>
                        </h3>
                      );
                    }

                    // Handle subheadings like "a. Information You Provide"
                    const letterMatch = text.match(/^([a-z])\.\s+(.*)/i);
                    if (letterMatch) {
                      const [, letter, title] = letterMatch;
                      const id = `${letter}-${title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`;

                      return (
                        <h3
                          id={id}
                          className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 flex items-center gap-3"
                          {...props}
                        >
                          <span className="shrink-0 w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center">
                            {letter}
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
                      className="font-bold text-gray-900 dark:text-white bg-emerald-50 dark:bg-emerald-900/20 px-1 py-0.5 rounded"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => {
                    const isTocLink = props.href?.startsWith("#");
                    const isExternalLink = props.href?.startsWith("http");

                    return (
                      <a
                        className={
                          isTocLink
                            ? "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                            : isExternalLink
                            ? "text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 underline underline-offset-4 decoration-2 hover:decoration-blue-400 transition-colors"
                            : "text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 underline"
                        }
                        target={isExternalLink ? "_blank" : undefined}
                        rel={isExternalLink ? "noopener noreferrer" : undefined}
                        {...props}
                      />
                    );
                  },
                  ul: ({ node, ...props }) => (
                    <ul
                      className="space-y-2 mb-6 pl-5 list-disc marker:text-emerald-500"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => {
                    // Check if it's the TOC list
                    const children = props.children as any;
                    const isToc =
                      Array.isArray(children) &&
                      children.some((child) =>
                        child?.props?.children
                          ?.toString()
                          .includes("Introduction")
                      );

                    if (isToc) {
                      return (
                        <div className="mb-12">
                          <div className="p-6 bg-linear-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                              <div className="w-2 h-8 bg-linear-to-b from-emerald-500 to-blue-500 rounded-full"></div>
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
                        className="space-y-2 mb-6 pl-5 list-decimal marker:text-emerald-500 marker:font-bold"
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
                                    className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all duration-200 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/10"
                                  >
                                    <div className="shrink-0 w-8 h-8 rounded-md bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                                      {numberMatch ? numberMatch[1] : ""}
                                    </div>
                                    <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
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
                        className="text-gray-700 dark:text-gray-300 mb-2 flex items-start gap-2"
                        {...props}
                      >
                        <span className="text-emerald-500 dark:text-emerald-400 mt-1.5 shrink-0">
                          •
                        </span>
                        <span>{children}</span>
                      </li>
                    );
                  },
                  hr: ({ node, ...props }) => (
                    <div className="my-8">
                      <hr
                        className="border-emerald-300 dark:border-emerald-700"
                        {...props}
                      />
                    </div>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>

            {/* Key Points Summary */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Your Data Rights
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>Access and update your profile information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>Request deletion of your vendor profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span>Withdraw consent where applicable</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Transparency Promise
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Clear explanation of data collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>No sale of personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Easy contact for questions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Box */}
            <div className="mt-10 p-6 md:p-8 rounded-2xl bg-linear-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 border border-emerald-200 dark:border-emerald-800 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Questions About Privacy?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    If you have any questions or concerns about how we handle
                    your data, please don't hesitate to contact us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="mailto:awuta.app@gmail.com"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg"
                    >
                      <Mail className="w-4 h-4" />
                      awuta.app@gmail.com
                    </a>
                    <a
                      href="https://www.awuta.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 font-medium rounded-lg border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                    >
                      <Globe className="w-4 h-4" />
                      www.awuta.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer section */}
            <div className="mt-14 pt-10 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        Privacy Commitment
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your data protection is our priority
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
                    This Privacy Policy outlines how we protect and handle your
                    personal information in accordance with data protection
                    principles.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>I Understand Privacy Policy</span>
                  </Link>

                  <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
                    Policy version: 2025.12.27
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-500 dark:text-gray-500 text-sm text-center md:text-left">
                    © 2025-2026 Awuta. All rights reserved. This policy may be
                    updated periodically.
                  </p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Data Protection Compliant</span>
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
