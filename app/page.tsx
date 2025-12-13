"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Page() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-main text-white">

      {/* ================= SCROLL PROGRESS (A) ================= */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50"
      />

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm tracking-widest font-semibold">
            AVOLIRO<span className="accent"> / </span>VELANO
          </span>

          <Magnetic>
            <a
              href="#contact"
              className="text-sm px-4 py-2 border border-white/20 rounded-md"
            >
              Engage
            </a>
          </Magnetic>
        </div>
      </header>

      {/* ================= HERO (B) ================= */}
      <section className="relative min-h-screen flex items-center px-6 pt-16 overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-6xl mx-auto text-center"
        >
          <span className="uppercase text-xs tracking-[0.35em] text-gray-400">
            Digital Systems Division
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems,
            <br />
            engineered for scale<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano engineers scalable digital systems for
            brands that operate seriously.
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* ================= SYSTEMS ================= */}
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">
            What Velano Engineers
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {systems.map((s) => (
              <Magnetic key={s.title}>
                <div className="surface rounded-xl p-8 border border-white/10 depth">
                  <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-gray-400">{s.desc}</p>
                </div>
              </Magnetic>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ================= CASES ================= */}
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Proof of Execution
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((c) => (
              <Magnetic key={c.title}>
                <div className="surface rounded-xl p-8 border border-white/10 depth">
                  <span className="text-xs uppercase tracking-widest text-gray-500">
                    {c.type}
                  </span>

                  <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>

                  <p className="mt-3 text-gray-400 text-sm">
                    {c.desc}
                  </p>
                </div>
              </Magnetic>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ================= CTA ================= */}
      <section id="contact" className="px-6 py-32">
        <div className="max-w-4xl mx-auto surface rounded-2xl p-14 text-center depth">
          <h2 className="text-3xl font-bold mb-6">
            Engage Velano
          </h2>

          <p className="text-gray-400 mb-10">
            This is for teams that build for the long term.
          </p>

          <Magnetic>
            <a
              href="mailto:hello@velano.dev?subject=Project Inquiry"
              className="inline-block px-14 py-4 rounded-lg bg-white text-black font-semibold"
            >
              Initiate Contact
            </a>
          </Magnetic>
        </div>
      </section>

    </main>
  );
}

/* ================= COMPONENTS ================= */

function Divider() {
  return <div className="divider" />;
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }

  function onMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0,0)";
  }

  return (
    <div
      ref={ref}
      className="magnetic inline-block"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

/* ================= DATA ================= */

const systems = [
  {
    title: "Interface Architecture",
    desc: "Brand-driven UI systems with structure and intent.",
  },
  {
    title: "Front-End Engineering",
    desc: "Performance-first, scalable front-end systems.",
  },
  {
    title: "AI-Accelerated Delivery",
    desc: "Speed without compromise using AI workflows.",
  },
  {
    title: "Scalable Codebases",
    desc: "Clean, maintainable systems built to grow.",
  },
];

const cases = [
  {
    type: "SYSTEM BUILD",
    title: "High-conversion brand platform",
    desc: "Engineered scalable architecture with optimized UX.",
  },
  {
    type: "FRONT-END",
    title: "Performance-critical web app",
    desc: "Rebuilt UI systems for speed and clarity.",
  },
  {
    type: "AI WORKFLOW",
    title: "AI delivery pipeline",
    desc: "Reduced turnaround without sacrificing quality.",
  },
];
