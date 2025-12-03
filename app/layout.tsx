import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VELANO — Full Stack Developer",
  description:
    "VELANO — full stack developer using AI-assisted workflows to build clean, bold and unforgettable digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="light" // Light theme default
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} transition-colors duration-300 bg-white text-black dark:bg-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
