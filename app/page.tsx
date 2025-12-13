export default function Page() {
  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems,
            <br />
            engineered for scale.
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano designs and builds precise, scalable web systems
            for brands that operate seriously.
          </p>
        </div>
      </section>

      <Divider />

      {/* WHY */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-lg leading-relaxed">
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
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            What Velano Builds
          </h2>

          <ul className="space-y-4 text-gray-400 text-lg">
            <li>Brand-driven interface architecture</li>
            <li>Performance-first front-end systems</li>
            <li>AI-accelerated engineering workflows</li>
            <li>Clean, maintainable, scalable codebases</li>
          </ul>
        </div>
      </section>

      <Divider />

      {/* FILTER */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-lg">
            Velano is not for rushed timelines, templates,
            or cost-cutting compromises.
            <br />
            This is for teams that value precision
            and long-term leverage.
          </p>
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Engage Velano
          </h2>

          <a
            href="mailto:hello@velano.dev?subject=Project Inquiry"
            className="inline-block px-12 py-4 bg-white text-black font-semibold rounded-lg transition-transform hover:-translate-y-1"
          >
            Initiate Contact
          </a>
        </div>
      </section>

    </main>
  );
}

function Divider() {
  return <div className="border-t border-white/10" />;
}