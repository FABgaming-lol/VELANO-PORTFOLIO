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
    "Velano, an AVOLIRO division, engineers scalable digital systems for serious brands.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#0B0D10] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}