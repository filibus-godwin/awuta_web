import React from "react";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  const filePath = path.join(
    process.cwd(),
    "content",
    "awuta-privacy-policy.md",
  );
  const markdown = fs.readFileSync(filePath, "utf8");

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Content Container */}
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 tracking-widest uppercase">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              Privacy Policy
              <div className="w-1 h-1 rounded-full bg-green-500" />
            </div>

            <h1 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-2">
              Privacy <span className="font-medium">Policy</span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400">
              Last updated:{" "}
              <span className="font-medium">27th December 2025</span>
            </p>
          </div>

          {/* Privacy Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                title: "Age 16+",
                description: "Minimum age",
                color: "text-green-500",
                bg: "bg-green-100 dark:bg-green-900/30",
              },
              {
                title: "Data Security",
                description: "Protected storage",
                color: "text-blue-500",
                bg: "bg-blue-100 dark:bg-blue-900/30",
              },
              {
                title: "Your Control",
                description: "Access & delete",
                color: "text-purple-500",
                bg: "bg-purple-100 dark:bg-purple-900/30",
              },
              {
                title: "No Data Sales",
                description: "We don't sell data",
                color: "text-amber-500",
                bg: "bg-amber-100 dark:bg-amber-900/30",
              },
            ].map((badge, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center"
              >
                <div
                  className={`w-8 h-8 rounded-lg ${badge.bg} flex items-center justify-center mx-auto mb-2`}
                >
                  <Shield className={`w-4 h-4 ${badge.color}`} />
                </div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  {badge.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {badge.description}
                </div>
              </div>
            ))}
          </div>

          {/* Markdown Content */}
          <div className="privacy-markdown prose prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6 mt-2 pb-4 border-b border-gray-200 dark:border-gray-800"
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
                      className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mt-8 mb-4"
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
                        className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3"
                        {...props}
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium mr-3">
                          {number}
                        </span>
                        {title}
                      </h3>
                    );
                  }

                  const letterMatch = text.match(/^([a-z])\.\s+(.*)/i);
                  if (letterMatch) {
                    const [, letter, title] = letterMatch;
                    const id = `${letter}-${title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`;

                    return (
                      <h3
                        id={id}
                        className="text-base md:text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3"
                        {...props}
                      >
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm mr-2">
                          {letter}
                        </span>
                        {title}
                      </h3>
                    );
                  }

                  return (
                    <h3
                      className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3"
                      {...props}
                    >
                      {children}
                    </h3>
                  );
                },
                p: ({ node, ...props }) => (
                  <p
                    className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
                    {...props}
                  />
                ),
                strong: ({ node, ...props }) => (
                  <strong
                    className="font-medium text-gray-900 dark:text-white"
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
                          ? "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                          : isExternalLink
                            ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2"
                            : "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                      }
                      target={isExternalLink ? "_blank" : undefined}
                      rel={isExternalLink ? "noopener noreferrer" : undefined}
                      {...props}
                    />
                  );
                },
                ul: ({ node, ...props }) => (
                  <ul
                    className="space-y-2 mb-4 pl-5 list-disc marker:text-gray-400"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => {
                  const children = props.children as any;
                  const isToc =
                    Array.isArray(children) &&
                    children.some((child) =>
                      child?.props?.children
                        ?.toString()
                        .includes("Introduction"),
                    );

                  if (isToc) {
                    return (
                      <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Table of Contents
                        </h3>
                        <div className="space-y-2">{children}</div>
                      </div>
                    );
                  }

                  return (
                    <ol
                      className="space-y-2 mb-4 pl-5 list-decimal marker:text-gray-400"
                      {...props}
                    />
                  );
                },
                li: ({ node, children, ...props }) => {
                  const isTocItem = React.Children.toArray(children).some(
                    (child) => {
                      if (!React.isValidElement(child)) return false;

                      const props = child.props as { href?: string };
                      return (
                        typeof props.href === "string" &&
                        props.href.startsWith("#")
                      );
                    },
                  );

                  if (isTocItem) {
                    return (
                      <li className="mb-0" {...props}>
                        <div className="group">
                          {React.Children.map(children, (child) => {
                            if (
                              React.isValidElement(child) &&
                              typeof child.type === "string" &&
                              child.type === "a"
                            ) {
                              const { href, children: linkChildren } =
                                child.props as {
                                  href?: string;
                                  children?: React.ReactNode;
                                };

                              if (!href) return child;

                              const text =
                                React.Children.toArray(linkChildren).join("");
                              const numberMatch = text.match(/^(\d+)\.\s*(.*)/);

                              return (
                                <a
                                  href={href}
                                  className="flex items-center gap-3 p-3 rounded border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-colors"
                                >
                                  <div className="shrink-0 w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium text-sm">
                                    {numberMatch?.[1] ?? ""}
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    {numberMatch?.[2] ?? text}
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
                      className="text-gray-600 dark:text-gray-400 mb-1"
                      {...props}
                    >
                      {children}
                    </li>
                  );
                },
                hr: ({ node, ...props }) => (
                  <hr
                    className="my-6 border-gray-200 dark:border-gray-800"
                    {...props}
                  />
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Your Data Rights
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Access and update your profile information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Request deletion of your vendor profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Withdraw consent where applicable</span>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Transparency Promise
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Clear explanation of data collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>No sale of personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Easy contact for questions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Box */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 mt-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Questions About Privacy?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  If you have any questions or concerns about how we handle your
                  data, please don't hesitate to contact us.
                </p>
                <a
                  href="mailto:awuta.app@gmail.com"
                  className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                >
                  <Mail className="w-4 h-4" />
                  awuta.app@gmail.com
                </a>
              </div>
              <Link
                href="/"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-center"
              >
                I Understand Privacy Policy
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
                © 2025-2026 Awuta. All rights reserved. This policy may be
                updated periodically.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Data Protection Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
