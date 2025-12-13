"use client";

import {
  motion,
  useScroll,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ================= MOTION PRESETS ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 * i,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
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
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.18],
    reduceMotion ? [1, 1] : [1, 0.85]
  );

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.18],
    reduceMotion ? [0, 0] : [0, -40]
  );

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
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative max-w-6xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="uppercase text-xs tracking-[0.35em] text-gray-400"
          >
            AVOLIRO / VELANO
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Digital systems,
            <br />
            engineered for scale<span className="accent">.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Velano engineers scalable digital systems for brands that operate seriously.
          </motion.p>
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

          <div className="space-y-20 relative">
            <div className="absolute left-[5px] top-0 bottom-0 w-px bg-white/20" />

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

      {/* CTA */}
      <section className="px-6 py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto surface rounded-2xl p-14 text-center depth"
        >
          <h2 className="text-3xl font-bold mb-6">
            Engage Velano
          </h2>

          <p className="text-gray-400 mb-10">
            This is for teams that build for the long term.
          </p>

          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-14 py-4 rounded-lg bg-white text-black font-semibold hover:-translate-y-1 transition-transform"
          >
            Initiate Contact
          </a>
        </motion.div>
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
