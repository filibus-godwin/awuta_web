import React from "react";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle, Mail } from "lucide-react";

export default function TermsPage() {
  const filePath = path.join(process.cwd(), "content", "awuta-terms-of-use.md");
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
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              Terms of Use
              <div className="w-1 h-1 rounded-full bg-blue-500" />
            </div>

            <h1 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-2">
              Terms of <span className="font-medium">Use</span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400">
              Last updated:{" "}
              <span className="font-medium">8th January, 2026</span>
            </p>
          </div>

          {/* Markdown Content */}
          <div className="terms-markdown prose prose-gray dark:prose-invert max-w-none">
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
                  return (
                    <a
                      className={
                        isTocLink
                          ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                          : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      }
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
                        .includes("Acceptance of Terms"),
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
                                  className="flex items-center gap-3 p-3 rounded border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                                >
                                  <div className="shrink-0 w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium text-sm">
                                    {numberMatch?.[1] ?? ""}
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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

          {/* Important Notice */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-amber-50 dark:bg-amber-900/20">
            <div className="flex items-start gap-4">
              <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Important Notice
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  By using Awuta, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms of Use. If
                  you do not agree, please discontinue use of the Service
                  immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © 2026 Awuta. All rights reserved.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This document may be updated periodically.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                  Version 2026.01.08
                </span>
                <Link
                  href="/"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  I Understand & Agree
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
