import { journey } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** "The journey" milestone timeline. Reads `journey` from content/site.ts. */
export function Journey({ className }: { className?: string }) {
  return (
    <ol className={cn("relative border-l border-border", className)}>
      {journey.map((step, i) => (
        <Reveal
          as="li"
          key={step.year}
          delay={i * 0.05}
          className="relative pb-7 pl-8 last:pb-0"
        >
          <span className="absolute -left-[6.5px] top-1 flex size-3">
            {step.current && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            )}
            <span
              className={cn(
                "relative size-3 rounded-full border-2 border-background",
                step.current ? "bg-accent" : "bg-border-strong",
              )}
            />
          </span>
          <div
            className={cn(
              "font-mono text-xs uppercase tracking-widest",
              step.current ? "text-accent" : "text-faint",
            )}
          >
            {step.year}
          </div>
          <h3 className="text-metallic mt-1 font-display text-lg font-semibold tracking-tight">
            {step.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
