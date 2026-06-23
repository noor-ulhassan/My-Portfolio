import type { CSSProperties } from "react";
import { skills } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechIcon, getTechColor } from "@/components/tech-icon";

/** A single tech: monochrome glyph + label that warms to its brand color on hover. */
function TechChip({ name }: { name: string }) {
  return (
    <li
      className="group/chip flex items-center gap-2.5 rounded-xl border border-border bg-surface/40 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-2/60 hover:ring-1 hover:ring-accent/20"
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
    <div className="group relative mt-14 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
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
              <span className="font-display text-2xl font-medium text-muted">{name}</span>
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
    <section id="skills" className="section border-t border-border">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Stack"
          title={
            <>
              Tech <span className="serif-italic text-metallic-orange">Stack.</span>
            </>
          }
          intro="The languages, frameworks, and tools I work with most."
        />
      </div>

      <TechMarquee items={allSkills} />

      <div className="container-x mt-14">
        <div className="divide-y divide-border border-y border-border">
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
