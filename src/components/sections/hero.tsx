import { MapPin } from "lucide-react";
import { profile, socials } from "@/content/site";
import { Icon } from "@/components/icon";
import { ActionLink } from "@/components/ui/action-link";
import { RevealWords } from "@/components/ui/reveal-words";
import { Reveal } from "@/components/ui/reveal";
import { ScrollCue } from "./scroll-cue";

export function Hero() {
  const parts = profile.name.trim().split(/\s+/);
  const lastWord = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  const leadWords = parts.length > 1 ? parts.slice(0, -1).join(" ") : "";

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* faint textured grid sitting behind the type */}
      <div
        className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden
      />
      {/* warm radial glow anchored bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 -z-10 size-[40rem] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden
      />

      <div className="container-x">
        <Reveal className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1.5 text-xs text-muted backdrop-blur">
            <span className="relative flex size-2">
              {profile.available && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.available ? "Available for work" : "Open to opportunities"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-faint">
            <MapPin className="size-3.5" strokeWidth={1.5} aria-hidden />
            {profile.location}
          </span>
        </Reveal>

        <h1 className="font-serif text-display tracking-[-0.02em]">
          {leadWords && <RevealWords text={leadWords} className="block" />}
          <span className="block">
            <RevealWords
              text={lastWord}
              className="serif-italic text-accent"
              delay={leadWords ? 0.15 : 0}
            />
          </span>
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
          <Reveal
            delay={0.3}
            as="p"
            className="max-w-md text-balance text-xl leading-relaxed text-muted sm:text-2xl"
          >
            {profile.role} — {profile.tagline}
          </Reveal>

          <Reveal delay={0.4} className="flex flex-col gap-6 md:items-end">
            <div className="flex flex-wrap gap-3">
              <ActionLink href="#work" variant="primary">
                View selected work
              </ActionLink>
              <ActionLink href={profile.resumeUrl} variant="outline" arrow={false} download>
                Download resume
              </ActionLink>
            </div>
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
      </div>

      <ScrollCue />
    </section>
  );
}
