"use client";

import { motion } from "framer-motion";

/* ===== ANIMATION ===== */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Page() {
  return (
    <main className="bg-main text-white">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-40" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
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
            Velano builds precise, scalable digital systems for
            brands that operate seriously.
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* METRICS */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <Metric value="30+" label="Systems shipped" />
          <Metric value="2–3×" label="Delivery speed" />
          <Metric value="Long-term" label="Scalability focus" />
        </div>
      </section>

      <Divider />

      {/* PROCESS */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            How Velano Works
          </h2>

          <div className="space-y-14">
            {steps.map((s) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative pl-10"
              >
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-white" />
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* CASES */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">
            Proof of Execution
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((c) => (
              <div
                key={c.title}
                className="surface rounded-xl p-8 border border-white/10 depth"
              >
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
      <section className="px-6 py-28">
        <div className="max-w-4xl mx-auto surface rounded-2xl p-14 text-center depth">
          <h2 className="text-3xl font-bold mb-6">
            Engage Velano
          </h2>

          <p className="text-gray-400 mb-10">
            Built for teams that value systems over shortcuts.
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

/* ===== HELPERS ===== */

function Divider() {
  return <div className="divider" />;
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="surface rounded-xl p-10 depth">
      <div className="text-4xl font-extrabold mb-3">{value}</div>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

/* ===== DATA ===== */

const steps = [
  {
    title: "System Audit",
    desc: "We analyze brand, product, and technical constraints.",
  },
  {
    title: "Architecture Design",
    desc: "Clear structure engineered for longevity and scale.",
  },
  {
    title: "Execution",
    desc: "AI-accelerated development with human control.",
  },
  {
    title: "Optimization",
    desc: "Continuous refinement post-launch.",
  },
];

const cases = [
  {
    type: "SYSTEM BUILD",
    title: "High-conversion platform",
    desc: "Scalable architecture designed for growth.",
  },
  {
    type: "FRONT-END",
    title: "Performance-critical UI",
    desc: "Rebuilt for speed, clarity, and maintainability.",
  },
  {
    type: "AI WORKFLOW",
    title: "AI-assisted delivery",
    desc: "Faster execution without sacrificing quality.",
  },
];
