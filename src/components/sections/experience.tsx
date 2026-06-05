import { experience, education } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  return (
    <section id="experience" className="section border-t border-border">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Experience"
          title={
            <>
              Where I&rsquo;ve <span className="serif-italic text-accent">worked</span>
            </>
          }
          intro="Roles that shaped how I build software and collaborate with teams."
        />

        <ol className="mt-14 border-l border-border">
          {experience.map((job, i) => (
            <Reveal
              as="li"
              key={`${job.company}-${job.period}`}
              delay={i * 0.05}
              className="relative grid gap-4 pb-12 pl-8 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-8"
            >
              <span
                className="absolute -left-[6.5px] top-1.5 size-3 rounded-full border-2 border-background bg-accent"
                aria-hidden
              />
              <div className="font-mono text-sm uppercase tracking-widest text-faint">
                {job.period}
                {job.location && (
                  <div className="mt-1 normal-case tracking-normal text-faint/80">
                    {job.location}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-serif text-2xl tracking-tight sm:text-3xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-accent">{job.company}</p>
                </div>

                <p className="max-w-2xl text-pretty leading-relaxed text-muted">
                  {job.summary}
                </p>

                <ul className="flex flex-col gap-2 text-sm text-muted">
                  {job.achievements.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span className="mt-2 h-px w-4 shrink-0 bg-accent" aria-hidden />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                {job.stack && job.stack.length > 0 && (
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {job.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[0.7rem] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Education */}
        {education.length > 0 && (
          <div className="mt-20">
            <Reveal className="flex items-center gap-3">
              <span className="label text-faint tabular-nums">04</span>
              <span className="label">Education</span>
              <span className="h-px w-10 bg-border-strong" aria-hidden />
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {education.map((edu, i) => (
                <Reveal
                  key={edu.credential}
                  delay={i * 0.05}
                  className="rounded-2xl border border-border bg-surface/40 p-7 transition-colors hover:border-border-strong"
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-faint">
                    {edu.period}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl tracking-tight">
                    {edu.credential}
                  </h3>
                  <p className="mt-1 text-accent">{edu.institution}</p>
                  {edu.detail && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {edu.detail}
                    </p>
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
