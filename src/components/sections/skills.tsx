import { skills } from "@/content/site";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";

export function Skills() {
  const allSkills = skills.flatMap((group) => group.items);

  return (
    <section aria-label="Skills and tools" className="section border-t border-border">
      <Marquee items={allSkills} className="mb-16 py-2" />

      <div className="container-x">
        <Reveal className="flex items-center gap-3">
          <span className="label">Toolbox</span>
          <span className="h-px w-10 bg-border-strong" aria-hidden />
        </Reveal>

        <dl className="mt-10 divide-y divide-border border-y border-border">
          {skills.map((group, i) => (
            <Reveal
              key={group.label}
              delay={i * 0.05}
              className="grid gap-3 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8"
            >
              <dt className="font-mono text-sm uppercase tracking-widest text-faint">
                {group.label}
              </dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-lg text-foreground transition-colors hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
