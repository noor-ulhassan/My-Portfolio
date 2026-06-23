import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: Variant;
  /** Show a trailing arrow that nudges on hover. */
  arrow?: boolean;
};

const base =
  "group/al inline-flex items-center gap-2 rounded-full text-sm font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  primary:
    "bg-metallic-orange px-6 py-3 text-accent-contrast transition-colors duration-300 hover:brightness-[1.04]",
  outline:
    "border border-accent/40 px-6 py-3 text-metallic-orange transition-colors duration-300 hover:border-accent/70 hover:bg-accent/10",
  ghost: "px-2 py-1 text-metallic-orange transition-opacity duration-300 hover:opacity-80",
};

/** Shared call-to-action link with a hover-nudging arrow. */
export function ActionLink({
  children,
  variant = "primary",
  arrow = true,
  className,
  ...props
}: ActionLinkProps) {
  // Outline/ghost text is a clipped (transparent) gradient, so the arrow needs
  // its own colour or it would render invisible.
  const arrowColor = variant === "primary" ? "" : "text-accent";
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && (
        <ArrowUpRight
          className={cn(
            "size-4 transition-transform duration-300 group-hover/al:translate-x-0.5 group-hover/al:-translate-y-0.5",
            arrowColor,
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      )}
    </a>
  );
}
