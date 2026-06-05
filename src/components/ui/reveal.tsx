"use client";

import { type Variants } from "motion/react";
import type { ReactNode } from "react";
import { motionTags, type MotionTagName } from "./motion-tag";

const variants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

type RevealProps = {
  children: ReactNode;
  as?: MotionTagName;
  className?: string;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** Re-run the animation every time it enters the viewport. */
  repeat?: boolean;
};

/** Fade + lift + de-blur a block as it scrolls into view. */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  repeat = false,
}: RevealProps) {
  const MotionTag = motionTags[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "0px 0px -12% 0px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
