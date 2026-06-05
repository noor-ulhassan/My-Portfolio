import { profile, stats } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section id="about" className="section border-t border-border">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal className="flex items-center gap-3 md:sticky md:top-28">
            <span className="label text-faint tabular-nums">02</span>
            <span className="label">About</span>
            <span className="h-px w-10 bg-border-strong" aria-hidden />
          </Reveal>
        </div>

        <div className="flex flex-col gap-12 md:col-span-8">
          <Reveal
            as="p"
            className="text-balance font-serif text-2xl leading-snug tracking-tight sm:text-3xl"
          >
            {profile.summary}
          </Reveal>

          <Reveal as="p" delay={0.1} className="max-w-xl text-pretty leading-relaxed text-muted">
            I&rsquo;m happiest in the seam between design and engineering — translating
            an idea into a system that&rsquo;s fast, accessible, and a pleasure to use.
            When I&rsquo;m not shipping, I&rsquo;m reading about distributed systems,
            refining my tooling, or contributing to open source.
          </Reveal>

          {stats.length > 0 && (
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-10">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <div className="font-serif text-4xl tracking-tight text-accent sm:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm leading-snug text-muted">
                    {stat.label}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
