import { Fragment } from "react";
import { MapPin } from "lucide-react";
import { profile, socials } from "@/content/site";
import { Icon } from "@/components/icon";
import { ActionLink } from "@/components/ui/action-link";
import { Magnetic } from "@/components/ui/magnetic";
import { RevealWords } from "@/components/ui/reveal-words";
import { Reveal } from "@/components/ui/reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { ScrollCue } from "./scroll-cue";
import { FloatingTech } from "./floating-tech";

/** Signature phrases to lift out of the muted tagline. */
const HIGHLIGHT = ["MERN", "Next.js", "full-stack"];

function emphasize(text: string, phrases: string[]) {
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  return text.split(re).map((part, i) =>
    phrases.some((p) => p.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className="font-medium text-foreground">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden pt-28 pb-24 text-center"
    >
      {/* background layers */}
      <div className="grid-lines pointer-events-none absolute inset-0 -z-20 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -z-20 size-[46rem] -translate-x-1/2 rounded-full bg-accent/6 blur-[150px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-0 -z-20 size-[32rem] translate-x-1/4 rounded-full bg-accent-strong/5 blur-[130px]"
        aria-hidden
      />
      <Spotlight className="-top-40 left-0 -z-10 opacity-70 md:-top-28 md:left-1/4" />
      <FloatingTech />

      <div className="container-x relative z-10 flex flex-col items-center">
        <Reveal className="mb-6">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted">
            <span className="relative flex size-2">
              {profile.available && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.available ? "Available for work" : "Open to opportunities"}
          </span>
        </Reveal>

        <Reveal delay={0.08} className="mb-4">
          <span className="font-mono text-sm tracking-wide text-accent">
            {"// Hey, I’m"}
          </span>
        </Reveal>

        <h1 className="text-display font-semibold tracking-[-0.02em]">
          <RevealWords text={profile.name} wordClassName="text-metallic" />
        </h1>

        <Reveal delay={0.25} className="mt-7">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
            <span className="font-mono text-accent">&lt;/&gt;</span>
            <span className="font-mono text-muted">{profile.role}</span>
          </span>
        </Reveal>

        <Reveal
          as="p"
          delay={0.35}
          className="mt-7 max-w-2xl text-balance text-xl leading-relaxed text-muted sm:text-2xl"
        >
          {emphasize(profile.tagline, HIGHLIGHT)}
        </Reveal>

        <Reveal delay={0.45} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <ActionLink href="#contact" variant="primary" className="px-7 py-3.5 text-base">
              Let&rsquo;s connect
            </ActionLink>
          </Magnetic>
          <ActionLink href="#work" variant="outline" arrow={false} className="px-7 py-3.5 text-base">
            View projects
          </ActionLink>
        </Reveal>

        <Reveal delay={0.55} className="mt-10 flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-faint">
            <MapPin className="size-4" strokeWidth={1.5} aria-hidden />
            {profile.location}
          </span>
          <span className="h-4 w-px bg-border-strong" aria-hidden />
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-accent"
              >
                <Icon name={s.icon} className="size-[1.15rem]" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <ScrollCue />
    </section>
  );
}
