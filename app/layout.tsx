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
    "Velano is an AVOLIRO division engineering scalable digital systems for serious brands.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-main text-white antialiased`}>
        <AvoliroShell>{children}</AvoliroShell>
      </body>
    </html>
  );
}

/* ================= AVOLIRO SHELL ================= */

function AvoliroShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* GLOBAL AVOLIRO HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/55 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-widest">
              AVOLIRO
            </span>
            <span className="text-xs text-gray-500">
              / Digital Systems Group
            </span>
          </div>

          {/* Division Switcher (future-ready) */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <span className="text-white cursor-default">Velano</span>
            <span className="cursor-not-allowed opacity-60">InkForge</span>
            <span className="cursor-not-allowed opacity-60">Labs</span>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="pt-16">{children}</main>

      {/* GLOBAL FOOTER */}
      <footer className="border-t border-white/10 py-14 mt-28">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AVOLIRO</p>
          <p className="mt-2">
            Engineering digital systems across design, development, and growth.
          </p>
        </div>
      </footer>
    </>
  );
}
