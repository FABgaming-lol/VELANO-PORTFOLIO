export default function Page() {
  return (
    <main>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="uppercase text-sm tracking-widest text-gray-400">
            AVOLIRO / VELANO
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems,
            <br />
            engineered for scale<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano is an AVOLIRO division designing and building
            precise, scalable digital systems for brands
            that operate seriously.
          </p>
        </div>
      </section>

      <Divider />

      {/* WHY */}
      <section className="px-6 py-24">
        <div className="surface max-w-5xl mx-auto rounded-xl p-10 text-center">
          <p className="text-gray-300 text-lg leading-relaxed">
            Most digital products fail because they are fragmented —
            design without structure, code without intent,
            and growth without systems.
            <br /><br />
            Velano eliminates fragmentation by engineering
            complete digital foundations from day one.
          </p>
        </div>
      </section>

      <Divider />

      {/* SYSTEMS */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            What Velano Builds
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <SystemCard text="Brand-driven interface architecture" />
            <SystemCard text="Performance-first front-end systems" />
            <SystemCard text="AI-accelerated engineering workflows" />
            <SystemCard text="Clean, scalable, maintainable codebases" />
          </div>
        </div>
      </section>

      <Divider />

      {/* FILTER */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-lg">
            Velano is not for rushed timelines, templates,
            or cost-cutting compromises.
            <br />
            This is for teams that value
            <span className="accent"> precision</span> and
            long-term leverage.
          </p>
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section className="px-6 py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Engage Velano
          </h2>

          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-12 py-4 rounded-lg bg-white text-black font-semibold hover:-translate-y-1 transition-transform"
          >
            Initiate Contact
          </a>
        </div>
      </section>

    </main>
  );
}

function Divider() {
  return <div className="divider" />;
}

function SystemCard({ text }: { text: string }) {
  return (
    <div className="surface rounded-xl p-6 text-gray-300 text-lg">
      {text}
    </div>
  );
}