"use client";

import React, { useEffect, useRef } from "react";

const sectionsIds = ["about", "services", "stack", "projects", "testimonials", "contact"];

export default function HomePage() {
  const heroInnerRef = useRef<HTMLDivElement | null>(null);

  // Set year
  useEffect(() => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
  }, []);

  // Theme toggle
  useEffect(() => {
    const root = document.documentElement;
    const saved = typeof window !== "undefined" ? localStorage.getItem("velano-theme") : null;

    const applyTheme = (theme: "light" | "dark") => {
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      const btn = document.getElementById("themeToggle");
      if (btn) btn.textContent = theme === "light" ? "Dark" : "Light";
      localStorage.setItem("velano-theme", theme);
    };

    applyTheme(saved === "dark" || saved === "light" ? (saved as any) : "light");

    const toggle = () => {
      const current = root.classList.contains("dark") ? "dark" : "light";
      applyTheme(current === "light" ? "dark" : "light");
    };

    const btn = document.getElementById("themeToggle");
    btn?.addEventListener("click", toggle);
    return () => btn?.removeEventListener("click", toggle);
  }, []);

  // Scroll progress
  useEffect(() => {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${(scrollTop / docHeight) * 100}%`;
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active nav highlight
  useEffect(() => {
    const links = document.querySelectorAll(".nav-link");

    const updateActive = () => {
      let current: string | null = null;
      const offset = 120;
      sectionsIds.forEach((id) => {
        const sec = document.getElementById(id);
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top - offset <= 0) current = id;
      });
      links.forEach((a) =>
        a.getAttribute("data-section") === current
          ? a.classList.add("active-link")
          : a.classList.remove("active-link")
      );
    };

    window.addEventListener("scroll", updateActive);
    window.addEventListener("resize", updateActive);
    updateActive();
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  // Section reveal cascade
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      ".reveal-about, .reveal-services, .reveal-stack, .reveal-panel, .reveal-testimonials, .reveal-contact"
    );

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.classList.add("visible-section");
              el.style.transitionDelay = `${
                Array.from(sections).indexOf(el) * 0.07
              }s`;
              obs.unobserve(el);
            }
          }),
        { threshold: 0.15 }
      );
      sections.forEach((sec) => obs.observe(sec));
      return () => obs.disconnect();
    } else {
      sections.forEach((sec) => sec.classList.add("visible-section"));
    }
  }, []);

  // Project card reveal
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("project-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    cards.forEach((c) => obs.observe(c));
  }, []);

  // Testimonials slider
  useEffect(() => {
    const testimonials = document.querySelectorAll<HTMLElement>(".testimonial");
    const dots = document.querySelectorAll<HTMLElement>(".dot");
    let current = 0;
    const show = (i: number) => {
      testimonials.forEach((t) => t.classList.remove("active"));
      dots.forEach((d) => d.classList.remove("active"));
      testimonials[i].classList.add("active");
      dots[i].classList.add("active");
      current = i;
    };
    dots.forEach((d) =>
      d.addEventListener("click", () => show(Number(d.dataset.index)))
    );
    const interval = setInterval(() => show((current + 1) % testimonials.length), 7000);
    return () => clearInterval(interval);
  }, []);

  // Parallax upgrade
  useEffect(() => {
    const hero = document.getElementById("hero");
    const el = heroInnerRef.current;
    if (!hero || !el) return;

    el.style.transition = "transform 0.12s ease-out";

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `translate(${x * 12}px, ${y * 8}px)`;
    };
    const onLeave = () => (el.style.transform = "translate(0,0)");

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Magnetic hover upgrade
  useEffect(() => {
    const btns = document.querySelectorAll<HTMLButtonElement>(".btn-magnetic");
    const strength = 0.12;
    btns.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      };
      const onLeave = () => (btn.style.transform = "translate(0,0)");
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
    });
  }, []);

  // Contact scroll buttons
  useEffect(() => {
    const go = () =>
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("contactOpenPrimary")?.addEventListener("click", go);
    document.getElementById("contactOpenFooter")?.addEventListener("click", go);
    return () => {
      document.getElementById("contactOpenPrimary")?.removeEventListener("click", go);
      document.getElementById("contactOpenFooter")?.removeEventListener("click", go);
    };
  }, []);

  // Contact form validation + mailto
  useEffect(() => {
    const form = document.getElementById("contactForm") as HTMLFormElement | null;
    if (!form) return;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const messageInput = document.getElementById("message") as HTMLTextAreaElement;
    const errorName = document.getElementById("errorName") as HTMLElement;
    const errorEmail = document.getElementById("errorEmail") as HTMLElement;
    const errorMessage = document.getElementById("errorMessage") as HTMLElement;
    const successMessage = document.getElementById("successMessage") as HTMLElement;

    const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    const submit = (e: Event) => {
      e.preventDefault();
      let valid = true;
      successMessage.style.display = "none";
      const n = nameInput.value.trim();
      const m = emailInput.value.trim();
      const msg = messageInput.value.trim();
      errorName.style.display = n ? "none" : "block";
      errorEmail.style.display = m && validEmail(m) ? "none" : "block";
      errorMessage.style.display = msg.length >= 10 ? "none" : "block";
      valid = n && validEmail(m) && msg.length >= 10;
      if (!valid) return;
      successMessage.style.display = "flex";
      const mailto = `mailto:hello@velano.dev?subject=${encodeURIComponent(
        `New Project Inquiry — ${n}`
      )}&body=${encodeURIComponent(
        `Name: ${n}\nEmail: ${m}\n\nProject Details:\n${msg}\n\n—\nVelano\nFull Stack Developer\nvelano.dev`
      )}`;
      setTimeout(() => (window.location.href = mailto), 600);
    };
    form.addEventListener("submit", submit);
    return () => form.removeEventListener("submit", submit);
  }, []);

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <div
        id="scrollProgress"
        className="fixed left-0 top-0 h-[3px] w-0 bg-black dark:bg-white z-50 origin-left"
      />

      <div id="top" className="max-w-[1280px] mx-auto min-h-screen flex flex-col px-4">
        {/* HEADER */}
        <header className="h-[100px] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="w-[42px] h-[42px]" alt="logo" />
            <div className="font-black text-[24px] tracking-[0.32em]">VELANO</div>
          </div>
          <div className="flex gap-2 items-center">
            {[
              { href: "#about", id: "about", label: "About" },
              { href: "#services", id: "services", label: "Services" },
              { href: "#stack", id: "stack", label: "Stack" },
              { href: "#projects", id: "projects", label: "Projects" },
              { href: "#testimonials", id: "testimonials", label: "Clients" },
              { href: "#contact", id: "contact", label: "Contact" },
            ].map((l) => (
              <a
                key={l.id}
                href={l.href}
                data-section={l.id}
                className="nav-link hidden md:inline-flex uppercase text-[12px] tracking-[0.14em] px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 transition-all"
              >
                {l.label}
              </a>
            ))}
            <button
              id="themeToggle"
              className="uppercase text-[11px] tracking-[0.12em] px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700"
            >
              Light
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 pb-20">
          {/* HERO */}
          <section id="hero" className="mt-10 relative overflow-hidden">
            <div ref={heroInnerRef}>
              <h1 className="text-[clamp(52px,7vw,92px)] font-black max-w-[900px] leading-[1.04] mb-8">
                I build clean, bold &amp; unforgettable digital experiences.
              </h1>
              <p className="max-w-[520px] text-[18px] leading-relaxed text-neutral-600 dark:text-neutral-400 mb-10">
                I’m a full-stack developer using AI as my co-pilot to ship premium, minimal websites that feel expensive and perform even better.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  className="btn-magnetic uppercase text-[13px] px-6 py-3 rounded-lg border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                  id="contactOpenPrimary"
                >
                  Let’s Build Something
                </button>
                <button
                  className="btn-magnetic uppercase text-[13px] px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-700 dark:text-neutral-200"
                  onClick={() =>
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Work
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-[11px] px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400">
                  Next.js · React · Node
                </span>
                <span className="text-[11px] px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400">
                  AI-assisted workflow
                </span>
              </div>
            </div>
          </section>

          <hr className="border-neutral-300 dark:border-neutral-800 my-20" />

          {/* ABOUT */}
          <section id="about" className="reveal-about flex flex-wrap items-center gap-10">
            <img src="/logo.png" className="w-[100px] h-[100px]" alt="logo" />
            <div>
              <img src="/wordmark.png" className="w-[180px] mb-3" alt="wordmark" />
              <h2 className="text-[34px] font-black mb-3">About Me</h2>
              <p className="text-[17px] text-neutral-600 dark:text-neutral-400 leading-[1.7] max-w-[650px]">
                I’m a full-stack developer who builds mind-blowing websites with a secret power:
                I don’t code alone — I code with AI.
                <br /><br />
                Together, we create clean, bold and ridiculously efficient experiences that look premium, load fast and convert better.
              </p>
            </div>
          </section>

          <hr className="border-neutral-300 dark:border-neutral-800 my-20" />

          {/* SERVICES */}
          <section id="services" className="reveal-services">
            <h3 className="uppercase text-[12px] tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-2">Services</h3>
            <h2 className="text-[26px] font-extrabold mb-6">What I do for you</h2>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Design-driven frontends",
                  desc: "Ultra-clean interfaces that feel like product, not templates.",
                  meta: "Landing pages · Dashboards · Marketing sites",
                },
                {
                  title: "Full-stack builds",
                  desc: "I wire up APIs, auth flows and databases so your product works as good as it looks.",
                  meta: "Next.js · Node · Auth · REST",
                },
                {
                  title: "AI-assisted workflow",
                  desc: "Ship faster with tight iteration cycles — human taste, AI superpower.",
                  meta: "Faster delivery · More experiments",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-neutral-300 dark:border-neutral-800 p-5 hover:-translate-y-[2px] transition-all"
                >
                  <h3 className="font-bold mb-2">{s.title}</h3>
                  <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mb-2">{s.desc}</p>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">{s.meta}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-neutral-300 dark:border-neutral-800 my-20" />

          {/* STACK */}
          <section id="stack" className="reveal-stack">
            <h3 className="uppercase text-[12px] tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-2">Tech stack</h3>
            <h2 className="text-[26px] font-extrabold mb-6">Tools I trust</h2>

            <div className="flex flex-wrap gap-2">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Node.js",
                "REST APIs",
                "PostgreSQL",
                "Tailwind UX systems",
                "Framer Motion-style animations",
                "AI-assisted prototyping",
              ].map((item) => (
                <span
                  key={item}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:-translate-y-[1px] transition-all"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <hr className="border-neutral-300 dark:border-neutral-800 my-20" />

          {/* PROJECTS */}
          <section id="projects">
            <aside className="reveal-panel rounded-2xl border border-neutral-300 dark:border-neutral-800 p-6">
              <div className="uppercase text-[13px] tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-4">
                Selected builds
              </div>
              {[
                {
                  name: "Atlas Launch Surface",
                  desc: "Conversion-focused launch site with narrative sections.",
                  metric: "+32% conversion uplift",
                },
                {
                  name: "Monochrome Dashboard",
                  desc: "Minimal analytics UI — dark-first and distraction-free.",
                  metric: "120ms view changes",
                },
                {
                  name: "Linear-grade Portfolio",
                  desc: "Portfolio template for serious developers and creators.",
                  metric: "Clone, adapt & ship fast",
                },
              ].map((p) => (
                <div key={p.name} className="project-card rounded-xl border border-neutral-300 dark:border-neutral-800 p-4 mb-3 bg-neutral-50 dark:bg-neutral-900/40">
                  <div className="font-bold text-[14px] mb-1">{p.name}</div>
                  <p className="text-[12px] text-neutral-600 dark:text-neutral-400 mb-1">{p.desc}</p>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{p.metric}</div>
                </div>
              ))}
            </aside>
          </section>

          <hr className="border-neutral-300 dark:border-neutral-800 my-20" />

          {/* TESTIMONIALS */}
          <section id="testimonials" className="reveal-testimonials">
            <h3 className="uppercase text-[12px] tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-2">Clients</h3>
            <h2 className="text-[26px] font-extrabold mb-6">Feedback that matters</h2>

            <div className="relative overflow-hidden rounded-2xl border border-neutral-300 dark:border-neutral-800 p-6 bg-neutral-50 dark:bg-neutral-900/40">
              {[
                {
                  q: "We asked for a landing page — we got a launch-ready product.",
                  name: "Product founder",
                  role: "SaaS Startup",
                },
                {
                  q: "No fluff — everything had purpose. Confident design.",
                  name: "Creative Lead",
                  role: "Brand refresh",
                },
                {
                  q: "AI-assisted workflow meant we iterated 3x faster.",
                  name: "Solo Founder",
                  role: "MVP build",
                },
              ].map((t, i) => (
                <div key={t.name} className={`testimonial ${i === 0 ? "active" : ""}`} data-index={i}>
                  <p className="text-[15px] text-neutral-600 dark:text-neutral-400 mb-3">{`“${t.q}”`}</p>
                  <div className="text-[13px] font-semibold">{t.name}</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{t.role}</div>
                </div>
              ))}

              <div className="flex gap-2 mt-3">
                <span className="dot active w-2 h-2 rounded-full bg-neutral-700 dark:bg-neutral-300" data-index="0"></span>
                <span className="dot w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-700" data-index="1"></span>
                <span className="dot w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-700" data-index="2"></span>
              </div>
            </div>
          </section>

          <hr className="border-neutral-300 dark:border-neutral-800 my-20" />

          {/* CONTACT */}
          <section id="contact" className="reveal-contact">
            <h3 className="uppercase text-[12px] tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-2">Contact</h3>
            <h2 className="text-[26px] font-extrabold mb-6">Let’s build something</h2>

            <form id="contactForm" noValidate className="max-w-xl space-y-3">
              {/* Name */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.12em] mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none"
                />
                <div id="errorName" className="text-[10px] text-red-500 mt-1 hidden">
                  Please add your name.
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.12em] mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none"
                />
                <div id="errorEmail" className="text-[10px] text-red-500 mt-1 hidden">
                  Enter a valid email address.
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.12em] mb-1" htmlFor="message">
                  Project details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Timeline, budget, goals…"
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-800 bg-transparent px-3 py-2 outline-none min-h-[90px]"
                />
                <div id="errorMessage" className="text-[10px] text-red-500 mt-1 hidden">
                  Give at least a few words about the project.
                </div>
              </div>

              {/* Success */}
              <div id="successMessage" className="hidden text-[11px] text-emerald-500 flex items-center gap-2 mt-1">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-emerald-500">
                  <path
                    d="M4 13l5 5L20 7"
                    fill="none"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="check-path"
                  />
                </svg>
                <span>Message validated! Opening mail…</span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-magnetic mt-3 inline-flex items-center justify-center uppercase text-[13px] px-6 py-3 rounded-lg border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
              >
                Send email
              </button>
            </form>
          </section>

          {/* FOOTER */}
          <footer className="mt-20 pt-10 border-t border-neutral-300 dark:border-neutral-800 flex flex-wrap items-center justify-between text-neutral-600 dark:text-neutral-400 text-[12px]">
            <span>
              © <span id="year"></span> VELANO — Full Stack Developer
            </span>
            <div className="flex gap-4 items-center">
              <button
                id="contactOpenFooter"
                className="px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800"
              >
                Contact
              </button>
              <button
                onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}
                className="px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800"
              >
                Top
              </button>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}