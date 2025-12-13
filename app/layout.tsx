import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELANO — An AVOLIRO Division",
  description:
    "Velano engineers scalable, high-performance digital systems under AVOLIRO.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-main text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}