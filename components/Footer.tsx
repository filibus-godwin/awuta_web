import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <p>© {new Date().getFullYear()} Awuta Data</p>

          <div className="flex gap-6">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
