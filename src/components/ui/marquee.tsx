import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  /** Seconds for one full loop. Lower = faster. */
  duration?: number;
  className?: string;
};

/** Edge-faded, infinitely scrolling row of words. Pauses on hover. */
export function Marquee({ items, duration = 40, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "marquee-pause group relative flex overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="animate-marquee flex shrink-0 items-center"
          style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
        >
          {items.map((item, i) => (
            <li key={`${item}-${i}`} className="flex items-center">
              <span className="whitespace-nowrap px-8 font-serif text-2xl text-muted sm:text-3xl">
                {item}
              </span>
              <span className="text-accent/60" aria-hidden>
                &#8226;
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
