import type { CSSProperties } from "react";
import { skills } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { TechIcon, getTechColor } from "@/components/tech-icon";

/** A single tech: monochrome glyph + label that warms to its brand color on hover. */
function TechChip({ name }: { name: string }) {
  return (
    <li
      className="group/chip flex items-center gap-2.5 rounded-xl border border-border bg-surface/40 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2/60"
      style={{ "--brand": getTechColor(name) } as CSSProperties}
    >
      <TechIcon
        name={name}
        className="size-[1.15rem] text-faint transition-colors duration-300 group-hover/chip:[color:var(--brand)]"
      />
      <span className="text-sm text-foreground">{name}</span>
    </li>
  );
}

function TechMarquee({ items }: { items: string[] }) {
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="animate-marquee flex shrink-0 items-center"
          style={{ "--marquee-duration": "48s" } as CSSProperties}
        >
          {items.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="group/m flex items-center gap-3 px-7"
              style={{ "--brand": getTechColor(name) } as CSSProperties}
            >
              <TechIcon
                name={name}
                className="size-7 text-faint transition-colors duration-300 group-hover/m:[color:var(--brand)]"
              />
              <span className="font-serif text-2xl text-muted">{name}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function Skills() {
  const allSkills = skills.flatMap((group) => group.items);

  return (
    <section aria-label="Skills and tools" className="section border-t border-border">
      <TechMarquee items={allSkills} />

      <div className="container-x mt-16">
        <Reveal className="flex items-center gap-3">
          <span className="label">Toolbox</span>
          <span className="h-px w-10 bg-border-strong" aria-hidden />
        </Reveal>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {skills.map((group, i) => (
            <Reveal
              key={group.label}
              delay={i * 0.05}
              className="grid gap-4 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8"
            >
              <h3 className="pt-1 font-mono text-sm uppercase tracking-widest text-faint">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <TechChip key={item} name={item} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
