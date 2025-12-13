import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELANO — Digital Systems & Web Infrastructure",
  description:
    "Velano designs and engineers high-performance digital systems for brands that value clarity, authority, and scale.",
  metadataBase: new URL("https://velano.dev"),
  openGraph: {
    title: "VELANO",
    description:
      "High-performance digital systems built for brands that refuse to look small.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 antialiased`}
      >
        {/* Global page wrapper */}
        <div className="relative min-h-screen overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}