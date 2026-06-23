import { education } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Education() {
  if (education.length === 0) return null;
  const [degree, ...rest] = education;

  return (
    <section id="education" className="section border-t border-border">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Education"
          title={
            <>
              Where I <span className="serif-italic text-metallic-orange">Studied.</span>
            </>
          }
        />

        {/* primary degree */}
        <Reveal className="relative mt-14 overflow-hidden rounded-2xl border border-border bg-surface/40 p-7 sm:p-9">
          <span
            className="absolute bottom-7 left-0 top-7 w-0.5 rounded bg-linear-to-b from-accent to-transparent"
            aria-hidden
          />
          <div className="flex flex-col gap-4 pl-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-faint">
                {degree.period}
              </span>
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.7rem] text-accent">
                Degree
              </span>
            </div>
            <h3 className="text-metallic font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {degree.credential}
            </h3>
            <p className="text-accent">{degree.institution}</p>
            {degree.detail && (
              <p className="max-w-2xl text-pretty leading-relaxed text-muted">{degree.detail}</p>
            )}
          </div>
        </Reveal>

        {/* certificates & courses */}
        {rest.length > 0 && (
          <div className="mt-12">
            <Reveal className="mb-6 flex items-center gap-3">
              <span className="label">Courses &amp; credentials</span>
              <span className="h-px w-10 bg-border-strong" aria-hidden />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {rest.map((edu, i) => (
                <Reveal
                  key={edu.credential}
                  delay={i * 0.05}
                  className="rounded-2xl border border-border bg-surface/40 p-7 transition-colors hover:border-accent/40"
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-faint">
                    {edu.period}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                    {edu.credential}
                  </h3>
                  <p className="mt-1 text-accent">{edu.institution}</p>
                  {edu.detail && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">{edu.detail}</p>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
