import { motion } from "motion/react";
import type { ComponentProps } from "react";

/** Intrinsic element tags we animate. Extend as needed. */
export type MotionTagName = "div" | "span" | "p" | "li" | "ul" | "h2" | "h3";

/** Resolve a tag name to its `motion.<tag>` component (no dynamic motion() calls). */
export const motionTags = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  li: motion.li,
  ul: motion.ul,
  h2: motion.h2,
  h3: motion.h3,
} satisfies Record<MotionTagName, unknown>;

export type MotionDivProps = ComponentProps<typeof motion.div>;
