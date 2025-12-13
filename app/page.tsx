export default function Page() {
  return (
    <main className="bg-main text-white">

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="uppercase text-xs tracking-[0.3em] text-gray-400">
            AVOLIRO / VELANO
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
            Digital systems,
            <br />
            engineered for scale<span className="accent">.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Velano is an AVOLIRO division focused on building
            precise, scalable digital systems for brands
            that operate seriously.
          </p>
        </div>
      </section>

      <Divider />

      {/* PROBLEM */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto surface rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-6">
            The problem isn’t design. It’s fragmentation.
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            Most digital products fail because design, development,
            and growth are handled in isolation.
            <br /><br />
            Velano eliminates fragmentation by engineering
            complete digital foundations from day one.
          </p>
        </div>
      </section>

      <Divider />

      {/* SYSTEMS */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">
            What Velano Builds
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <SystemCard
              title="Interface Architecture"
              desc="Brand-driven UI systems with clear hierarchy and intent."
            />
            <SystemCard
              title="Front-End Engineering"
              desc="Performance-first, scalable front-end systems."
            />
            <SystemCard
              title="AI-Accelerated Delivery"
              desc="Speed without compromise, powered by AI workflows."
            />
            <SystemCard
              title="Scalable Codebases"
              desc="Clean, maintainable systems built for long-term growth."
            />
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
            <span className="accent"> precision</span>,
            systems, and long-term leverage.
          </p>
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section className="px-6 py-28">
        <div className="max-w-4xl mx-auto text-center surface rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">
            Engage Velano
          </h2>

          <p className="text-gray-400 mb-8">
            Start a serious conversation about building
            systems that scale.
          </p>

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

function SystemCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="surface rounded-xl p-8 border border-white/10">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}