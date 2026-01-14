import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  const filePath = path.join(process.cwd(), "content", "awuta-terms-of-use.md");

  const markdown = fs.readFileSync(filePath, "utf8");

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Markdown Content */}
        <article className="prose prose-blue dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
