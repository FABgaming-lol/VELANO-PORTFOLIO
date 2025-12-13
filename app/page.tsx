"use client";

import { motion } from "framer-motion";

/* ================= MOTION PRESETS ================= */

const section = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ================= PAGE ================= */

export default function Page() {
  return (
    <main className="bg-main text-white">

      {/* HERO */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={section}
        className="min-h-screen flex items-center px-6 pt-16"
      >
        <div className="max-w-6xl mx-auto text-center">
          <span className="uppercase text-xs tracking-[0.35em] text-gray-400">
            AVOLIRO / VELANO
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems,
            <br />
            engineered for scale<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano engineers scalable digital systems for brands
            that operate seriously.
          </p>
        </div>
      </motion.section>

      <Divider />

      {/* SYSTEMS */}
      <motion.section
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-6 py-28"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">
            What Velano Engineers
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {systems.map((s) => (
              <motion.div
                key={s.title}
                variants={item}
                className="surface rounded-xl p-8 border border-white/10 depth"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {s.title}
                </h3>
                <p className="text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Divider />

      {/* TIMELINE */}
      <motion.section
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-6 py-28"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-20">
            How Velano Operates
          </h2>

          <div className="space-y-16">
            {timeline.map((t) => (
              <motion.div
                key={t.title}
                variants={item}
                className="relative pl-10"
              >
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-white" />
                <h3 className="text-xl font-semibold mb-3">
                  {t.title}
                </h3>
                <p className="text-gray-400">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Divider />

      {/* CTA */}
      <motion.section
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-6 py-32"
      >
        <div className="max-w-4xl mx-auto surface rounded-2xl p-14 text-center depth">
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
        </div>
      </motion.section>

    </main>
  );
}

/* ================= HELPERS ================= */

function Divider() {
  return <div className="divider" />;
}

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

const timeline = [
  {
    title: "System Audit",
    desc: "Deep analysis of brand and constraints.",
  },
  {
    title: "Architecture Design",
    desc: "Clear structure engineered for scale.",
  },
  {
    title: "Engineering & Iteration",
    desc: "AI-assisted development with constant refinement.",
  },
  {
    title: "Launch & Optimization",
    desc: "Continuous improvement post-launch.",
  },
];
