"use client";

import { motion, useScroll, useTransform } from "motion/react";

/** Minimal "scroll" indicator near the hero base that fades as you scroll. */
export function ScrollCue() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
    >
      <div className="flex flex-col items-center gap-2 text-faint">
        <span className="label text-faint">Scroll</span>
        <span className="relative flex h-10 w-px overflow-hidden bg-border-strong">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-accent"
            animate={{ y: ["-100%", "250%"] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </div>
    </motion.div>
  );
}
