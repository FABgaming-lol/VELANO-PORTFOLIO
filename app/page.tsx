"use client";

import { motion, useScroll, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ================= MOTION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

/* ================= COUNT UP ================= */

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  useEffect(() => {
    const unsubScroll = scrollYProgress.on("change", (latest) => {
      motionValue.set(Math.floor(latest * value));
    });

    const unsubMotion = motionValue.on("change", (latest) => {
      setDisplay(Math.min(latest, value));
    });

    return () => {
      unsubScroll();
      unsubMotion();
    };
  }, [motionValue, scrollYProgress, value]);

  return <div ref={ref}>{display}</div>;
}

/* ================= PAGE ================= */

export default function Page() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-main text-white">

      {/* SCROLL PROGRESS */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50"
      />

      {/* NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-black/50 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm tracking-widest font-semibold">
            VELANO
          </span>

          <div className="hidden md:flex gap-6 text-sm text-gray-400">
            <a href="#systems" className="hover:text-white">Systems</a>
            <a href="#process" className="hover:text-white">Process</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#proof" className="hover:text-white">Proof</a>
            <a href="#contact" className="text-white">Contact</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 pt-16 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-5xl mx-auto"
        >
          <span className="uppercase text-xs tracking-[0.35em] text-gray-400">
            An AVOLIRO Division
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems built
            <br />for scale<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano engineers high-performance digital systems for brands
            that care about longevity, clarity, and leverage.
          </p>

          <div className="mt-12">
            <a
              href="#contact"
              className="inline-block px-10 py-4 bg-white text-black font-semibold rounded-lg"
            >
              Start a conversation
            </a>
          </div>
        </motion.div>
      </section>

      {/* SYSTEMS */}
      <section id="systems" className="px-6 py-28">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">What We Engineer</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {systems.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="surface p-8 rounded-xl border border-white/10 depth"
              >
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PHILOSOPHY */}
      <section id="pricing" className="px-6 py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Pricing Philosophy</h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Velano does not sell fixed packages or templates.
            <br /><br />
            Pricing is based on system complexity, scope,
            and long-term value — not hours or pages.
            <br /><br />
            If you’re looking for the cheapest option,
            Velano is not a fit.
            <br />
            If you’re looking for clarity, structure,
            and leverage — we should talk.
          </p>
        </div>
      </section>

      {/* METRICS */}
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <Metric label="Systems shipped" value={32} />
          <Metric label="Avg performance gain (%)" value={68} />
          <Metric label="Delivery speed increase (%)" value={54} />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-6 py-32">
        <div className="max-w-4xl mx-auto surface rounded-2xl p-14 text-center depth">
          <h2 className="text-3xl font-bold mb-6">
            Let’s Build Something Serious
          </h2>

          <p className="text-gray-400 mb-10">
            Reach out if you’re building for the long term.
          </p>

          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-14 py-4 rounded-lg bg-white text-black font-semibold"
          >
            Contact Velano
          </a>
        </div>
      </section>

    </main>
  );
}

/* ================= COMPONENTS ================= */

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="surface rounded-xl p-10 depth">
      <div className="text-5xl font-extrabold mb-3">
        <CountUp value={value} />
        <span className="accent">+</span>
      </div>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

/* ================= DATA ================= */

const systems = [
  {
    title: "Interface Architecture",
    desc: "Clear, scalable UI systems built for real products.",
  },
  {
    title: "Front-End Engineering",
    desc: "Performance-first engineering with long-term maintainability.",
  },
  {
    title: "AI-Accelerated Delivery",
    desc: "Speed without sacrificing correctness or structure.",
  },
  {
    title: "Scalable Codebases",
    desc: "Systems designed to evolve, not collapse.",
  },
];
