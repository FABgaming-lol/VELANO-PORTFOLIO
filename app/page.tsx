"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const html = document.documentElement;

    if (saved === "dark") {
      html.classList.add("dark");
      setTheme("dark");
    } else {
      html.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";

    html.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((item) => observer.observe(item));
  }, []);

  return (
    <main className="min-h-screen">

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed right-4 top-4 z-50 w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center p-1 transition-colors duration-300"
        aria-label="Toggle Theme"
      >
        <span
          className={`w-6 h-6 bg-white dark:bg-black rounded-full transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>

      {/* HERO */}
      <section className="section reveal text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
          Digital systems built for
          <br />
          brands that refuse to look small.
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6 text-lg">
          Velano designs and engineers high-performance web experiences —
          fast, precise, and built to scale.
        </p>
      </section>

      {/* POSITIONING */}
      <section className="section reveal text-center">
        <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed">
          Most websites fail because they are fragmented — design without strategy,
          code without intent, and growth without structure.
          <br /><br />
          Velano fixes this by building complete digital infrastructure,
          not isolated features.
        </p>
      </section>

      {/* CAPABILITIES */}
      <section className="section reveal text-center">
        <h2 className="text-3xl font-bold mb-8">What Velano Builds</h2>

        <div className="max-w-3xl mx-auto grid gap-6 text-gray-700 dark:text-gray-300">
          <p>• Brand-first web design with clear hierarchy</p>
          <p>• Fast, scalable front-end systems</p>
          <p>• AI-accelerated workflows without quality loss</p>
          <p>• Clean architecture built for long-term growth</p>
        </div>
      </section>

      {/* FILTER */}
      <section className="section reveal text-center">
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Velano is not for people looking for cheap work or quick hacks.
          <br />
          It is for founders and teams who care about clarity, authority, and scale.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section reveal text-center">
        <h2 className="text-3xl font-bold mb-6">Request Access</h2>

        <a
          href="mailto:hello@velano.dev?subject=Project Inquiry"
          className="inline-block px-10 py-4 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold transition-colors"
        >
          Start a Conversation
        </a>
      </section>

    </main>
  );
}