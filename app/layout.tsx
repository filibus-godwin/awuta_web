import "./globals.css";

export const metadata = {
  title: "Awuta",
  description: "Buy and sell products easily in Nigeria",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
