import Image from "next/image";
import { MapPin, GraduationCap, Layers } from "lucide-react";
import type { ComponentType } from "react";
import { profile, stats, education } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CodeCard } from "@/components/ui/code-card";
import { Journey } from "./journey";

function Chip({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3.5 py-1.5 text-sm">
      <Icon className="size-4 shrink-0 text-accent" strokeWidth={1.75} />
      <span className="text-metallic">{children}</span>
    </span>
  );
}

const codeEntries = [
  { key: "role", value: profile.role },
  { key: "based", value: profile.location },
  { key: "stack", value: ["React", "Node.js", "TypeScript", "MongoDB"] },
  { key: "focus", value: ["Next.js", "Performance"] },
  { key: "education", value: education[0]?.credential ?? "Software Engineering" },
];

export function About() {
  const firstName = profile.name.split(" ")[0].toLowerCase();

  return (
    <section id="about" className="section border-t border-border">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              A bit <span className="serif-italic text-metallic-orange">About me.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
          {/* portrait with corner brackets */}
          <Reveal className="relative mx-auto w-full max-w-sm">
            <span className="absolute -left-2 -top-2 z-10 size-7 border-l-2 border-t-2 border-accent/60" aria-hidden />
            <span className="absolute -right-2 -top-2 z-10 size-7 border-r-2 border-t-2 border-accent/60" aria-hidden />
            <span className="absolute -bottom-2 -left-2 z-10 size-7 border-b-2 border-l-2 border-accent/60" aria-hidden />
            <span className="absolute -bottom-2 -right-2 z-10 size-7 border-b-2 border-r-2 border-accent/60" aria-hidden />
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border">
              <Image
                src="/profile2.jpeg"
                alt={profile.name}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background via-background/70 to-transparent p-5">
                <div className="text-metallic font-display text-xl font-semibold tracking-tight">
                  {profile.name}
                </div>
                <div className="font-mono text-xs text-accent">
                  &lt;{profile.role} /&gt;
                </div>
              </div>
            </div>
          </Reveal>

          {/* statement + summary + chips + stats */}
          <div className="flex flex-col gap-7">
            <Reveal
              as="p"
              className="text-metallic text-balance font-display text-3xl font-medium leading-snug tracking-tight sm:text-4xl"
            >
              I build full-stack web apps, and I care about how they{" "}
              <span className="serif-italic font-normal text-metallic-orange">feel to use</span>.
            </Reveal>

            <Reveal as="p" delay={0.1} className="max-w-xl text-pretty leading-relaxed text-muted">
              {profile.summary}
            </Reveal>

            <Reveal delay={0.15} className="flex flex-wrap gap-2.5">
              <Chip icon={MapPin}>{profile.location}</Chip>
              <Chip icon={GraduationCap}>
                {education[0]?.credential ?? "Software Engineering"}
              </Chip>
              <Chip icon={Layers}>MERN + Next.js</Chip>
            </Reveal>

            {stats.length > 0 && (
              <div className="grid grid-cols-3 gap-4 border-t border-border pt-6 sm:gap-6">
                {stats.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.08}>
                    <div className="text-metallic font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">
                      {stat.label}
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* me, as code + the journey */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="label">{"// me, as code"}</span>
            </div>
            <CodeCard varName={firstName} entries={codeEntries} />
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="label">{"// the journey"}</span>
            </div>
            <Journey />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
