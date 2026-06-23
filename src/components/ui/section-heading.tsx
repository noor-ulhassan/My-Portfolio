import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  /** Two-digit section index, e.g. "01". */
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

/** Shared section header: mono eyebrow + serif title + optional intro. */
export function SectionHeading({
  index,
  label,
  title,
  intro,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal className="flex items-center gap-3">
        {index && (
          <span className="label text-faint tabular-nums">{index}</span>
        )}
        <span className="label">{label}</span>
        <span className="h-px w-10 bg-border-strong" aria-hidden />
      </Reveal>
      <Reveal
        as="h2"
        delay={0.05}
        className="text-metallic max-w-3xl text-balance text-h2 font-semibold tracking-tight"
      >
        {title}
      </Reveal>
      {intro && (
        <Reveal
          as="p"
          delay={0.1}
          className={cn(
            "max-w-xl text-lg leading-relaxed text-muted text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
}
