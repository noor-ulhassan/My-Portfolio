"use client";

import { motion } from "motion/react";
import { TechIcon, getTechColor } from "@/components/tech-icon";
import { cn } from "@/lib/utils";

type Node = {
  name: string;
  /** Absolute placement around the centred hero. */
  pos: string;
  /** Bob amplitude (px) and loop duration (s). */
  amp: number;
  dur: number;
  delay: number;
  size?: "sm" | "md" | "lg";
};

/* Brand glyphs arranged in the gutters around the hero copy. Hidden below lg
   so they never crowd the headline on small screens. */
const NODES: Node[] = [
  { name: "React", pos: "left-[5%] top-[20%]", amp: 12, dur: 6.5, delay: 0, size: "lg" },
  { name: "Next.js", pos: "right-[7%] top-[16%]", amp: 10, dur: 7.5, delay: 0.4, size: "md" },
  { name: "TypeScript", pos: "left-[3%] top-[48%]", amp: 9, dur: 8, delay: 0.8, size: "md" },
  { name: "MongoDB", pos: "right-[4%] top-[44%]", amp: 13, dur: 6.8, delay: 0.2, size: "lg" },
  { name: "Tailwind CSS", pos: "left-[9%] bottom-[16%]", amp: 11, dur: 7.2, delay: 0.6, size: "md" },
  { name: "Express", pos: "right-[10%] bottom-[20%]", amp: 8, dur: 8.4, delay: 1, size: "sm" },
  { name: "Git", pos: "left-[17%] bottom-[6%]", amp: 10, dur: 6.2, delay: 0.3, size: "sm" },
  { name: "Node.js", pos: "right-[18%] bottom-[8%]", amp: 12, dur: 7.8, delay: 0.9, size: "md" },
];

const SIZES = {
  sm: "size-12 rounded-xl",
  md: "size-14 rounded-2xl",
  lg: "size-16 rounded-2xl",
} as const;

const GLYPH = { sm: "size-5", md: "size-6", lg: "size-7" } as const;

export function FloatingTech() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block" aria-hidden>
      {NODES.map((node) => {
        const brand = getTechColor(node.name);
        const size = node.size ?? "md";
        return (
          <motion.div
            key={node.name}
            className={cn("absolute", node.pos)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + node.delay, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={{ y: [0, -node.amp, 0] }}
              transition={{ duration: node.dur, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
              className={cn(
                "glass grid place-items-center shadow-[0_6px_20px_rgb(0_0_0/0.3)]",
                SIZES[size],
              )}
            >
              {/* brand-tinted glow puddle */}
              <span
                className="absolute inset-0 rounded-[inherit] opacity-20 blur-md"
                style={{ background: `radial-gradient(circle at 50% 40%, ${brand}, transparent 70%)` }}
              />
              <TechIcon
                name={node.name}
                className={cn("relative", GLYPH[size])}
                colored
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
