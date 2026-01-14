import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PrivacyPolicyPage() {
  const filePath = path.join(
    process.cwd(),
    "content",
    "awuta-privacy-policy.md"
  );

  const markdown = fs.readFileSync(filePath, "utf8");

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <article className="prose prose-emerald dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
