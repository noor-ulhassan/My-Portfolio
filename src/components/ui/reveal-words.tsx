"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { motionTags, type MotionTagName } from "./motion-tag";

type RevealWordsProps = {
  text: string;
  as?: MotionTagName;
  className?: string;
  /** Stagger between words, in seconds. */
  stagger?: number;
  delay?: number;
};

/** Splits text into words and reveals them one after another. Used for the hero. */
export function RevealWords({
  text,
  as = "span",
  className,
  stagger = 0.06,
  delay = 0,
}: RevealWordsProps) {
  const MotionTag = motionTags[as];
  const words = text.split(" ");

  return (
    <MotionTag
      className={cn("inline", className)}
      initial="hidden"
      animate="visible"
      aria-label={text}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          // Bottom padding + matching negative margin keeps the reveal mask from
          // clipping descenders while preserving the tight visual line-height.
          className="inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]"
        >
          <motion.span
            className="inline-block"
            aria-hidden
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
