import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/content/site";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";

export function Contact() {
  return (
    <section id="contact" className="section relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute -top-40 right-0 -z-10 size-[36rem] rounded-full bg-accent/10 blur-[130px]"
        aria-hidden
      />

      <div className="container-x flex flex-col items-start gap-12">
        <Reveal className="flex items-center gap-3">
          <span className="label">Contact</span>
          <span className="h-px w-10 bg-border-strong" aria-hidden />
        </Reveal>

        <Reveal
          as="h2"
          className="max-w-4xl text-balance font-serif text-[length:var(--text-display)] leading-[var(--text-display)] tracking-[-0.02em]"
        >
          Let&rsquo;s make something{" "}
          <span className="serif-italic text-accent">worth shipping</span>.
        </Reveal>

        <Reveal as="p" delay={0.1} className="max-w-xl text-pretty text-lg leading-relaxed text-muted">
          {profile.available
            ? "I'm currently available for new roles and freelance work. Have a project, a role, or just an idea? My inbox is open."
            : "Always happy to talk shop, swap ideas, or hear about interesting problems."}
        </Reveal>

        <Reveal delay={0.15}>
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-medium text-accent-contrast transition-colors hover:bg-accent-soft"
            >
              {profile.email}
              <ArrowUpRight
                className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
                aria-hidden
              />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.2} className="w-full border-t border-border pt-10">
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-border pb-4 transition-colors hover:border-accent"
              >
                <span className="flex items-center gap-3">
                  <Icon name={s.icon} className="size-4 text-accent" />
                  <span className="flex flex-col">
                    <span className="text-sm text-foreground">{s.label}</span>
                    <span className="font-mono text-xs text-faint">{s.handle}</span>
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
