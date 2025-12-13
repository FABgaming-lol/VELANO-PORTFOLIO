import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELANO — Digital Systems Engineering",
  description:
    "Velano engineers high-performance digital systems for brands that value precision, authority, and scale.",
  metadataBase: new URL("https://velano.dev"),
  openGraph: {
    title: "VELANO",
    description:
      "Technical digital systems built for brands that refuse to look small.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <div className="relative min-h-screen overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}