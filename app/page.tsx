"use client";

import {
  motion,
  useScroll,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ================= MOTION SYSTEM ================= */

const section = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/* ================= COUNT UP ================= */

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  useEffect(() => {
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const a = scrollYProgress.on("change", (latest) => {
      motionValue.set(Math.floor(latest * value));
    });

    const b = motionValue.on("change", (latest) => {
      setDisplay(Math.min(latest, value));
    });

    return () => {
      a();
      b();
    };
  }, [motionValue, scrollYProgress, value, prefersReduced]);

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

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 pt-16 overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-40" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={section}
          className="relative max-w-6xl mx-auto text-center"
        >
          <motion.span variants={item} className="uppercase text-xs tracking-[0.35em] text-gray-400">
            AVOLIRO / VELANO
          </motion.span>

          <motion.h1 variants={item} className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems,
            <br />
            engineered for scale<span className="accent">.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano engineers scalable digital systems for brands that operate seriously.
          </motion.p>
        </motion.div>
      </section>

      <Divider />

      {/* METRICS */}
      <motion.section
        className="px-6 py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={section}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <Metric label="Systems shipped" value={32} />
          <Metric label="Performance gain (%)" value={68} />
          <Metric label="Delivery speed increase (%)" value={54} />
        </div>
      </motion.section>

      <Divider />

      {/* TIMELINE */}
      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            className="absolute left-2 top-0 w-px bg-white/20"
            style={{ scaleY: scrollYProgress, originY: 0 }}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={section}
            className="space-y-16 pl-10"
          >
            {timeline.map((t) => (
              <motion.div key={t.title} variants={item}>
                <h3 className="text-xl font-semibold mb-3">{t.title}</h3>
                <p className="text-gray-400">{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* CASES */}
      <motion.section
        className="px-6 py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={section}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {cases.map((c) => (
            <motion.div
              key={c.title}
              variants={item}
              className="surface rounded-xl p-8 border border-white/10 depth card-physics"
            >
              <span className="text-xs uppercase tracking-widest text-gray-500">
                {c.type}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-3 text-gray-400 text-sm">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Divider />

      {/* CTA */}
      <motion.section
        className="px-6 py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={section}
      >
        <motion.div variants={item} className="max-w-4xl mx-auto surface rounded-2xl p-14 text-center depth">
          <h2 className="text-3xl font-bold mb-6">Engage Velano</h2>
          <p className="text-gray-400 mb-10">
            This is for teams that build for the long term.
          </p>
          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-14 py-4 rounded-lg bg-white text-black font-semibold"
          >
            Initiate Contact
          </a>
        </motion.div>
      </motion.section>

    </main>
  );
}

/* ================= UTILS ================= */

function Divider() {
  return <div className="divider" />;
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <motion.div variants={item} className="surface rounded-xl p-10 depth">
      <div className="text-5xl font-extrabold mb-3">
        <CountUp value={value} />
        <span className="accent">+</span>
      </div>
      <p className="text-gray-400">{label}</p>
    </motion.div>
  );
}

/* ================= DATA ================= */

const timeline = [
  { title: "System Audit", desc: "Deep analysis of brand and constraints." },
  { title: "Architecture Design", desc: "Structure engineered for scale." },
  { title: "Engineering & Iteration", desc: "AI-assisted development." },
  { title: "Launch & Optimization", desc: "Continuous improvement post-launch." },
];

const cases = [
  {
    type: "SYSTEM BUILD",
    title: "High-conversion brand platform",
    desc: "Scalable architecture with optimized UX.",
  },
  {
    type: "FRONT-END",
    title: "Performance-critical web app",
    desc: "UI rebuilt for speed and clarity.",
  },
  {
    type: "AI WORKFLOW",
    title: "AI delivery pipeline",
    desc: "Faster delivery without quality loss.",
  },
];
