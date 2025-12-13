"use client";

import { motion, useScroll, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 * i,
      duration: 0.8,
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

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 pt-16 overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-6xl mx-auto text-center"
        >
          <span className="uppercase text-xs tracking-[0.35em] text-gray-400">
            AVOLIRO / VELANO
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems,
            <br />
            engineered for scale<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano engineers scalable digital systems for brands that operate seriously.
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* METRICS */}
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <Metric label="Systems shipped" value={32} />
          <Metric label="Performance gain (%)" value={68} />
          <Metric label="Delivery speed increase (%)" value={54} />
        </div>
      </section>

      <Divider />

      {/* TIMELINE */}
      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-20">
            How Velano Operates
          </h2>

          <div className="space-y-16">
            {timeline.map((t, i) => (
              <motion.div
                key={t.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="relative pl-10"
              >
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-white" />
                <h3 className="text-xl font-semibold mb-3">{t.title}</h3>
                <p className="text-gray-400">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* CASES */}
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Proof of Execution
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((c) => (
              <div key={c.title} className="surface rounded-xl p-8 border border-white/10 depth">
                <span className="text-xs uppercase tracking-widest text-gray-500">
                  {c.type}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                <p className="mt-3 text-gray-400 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto surface rounded-2xl p-14 text-center depth">
          <h2 className="text-3xl font-bold mb-6">
            Engage Velano
          </h2>

          <p className="text-gray-400 mb-10">
            This is for teams that build for the long term.
          </p>

          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-14 py-4 rounded-lg bg-white text-black font-semibold"
          >
            Initiate Contact
          </a>
        </div>
      </section>

    </main>
  );
}

/* ================= COMPONENTS ================= */

function Divider() {
  return <div className="divider" />;
}

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
