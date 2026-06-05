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
  "group/al inline-flex items-center gap-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent px-6 py-3 text-accent-contrast hover:bg-accent-soft",
  outline:
    "border border-border-strong px-6 py-3 text-foreground hover:border-accent hover:text-accent",
  ghost: "px-2 py-1 text-foreground hover:text-accent",
};

/** Shared call-to-action link with a hover-nudging arrow. */
export function ActionLink({
  children,
  variant = "primary",
  arrow = true,
  className,
  ...props
}: ActionLinkProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover/al:translate-x-0.5 group-hover/al:-translate-y-0.5"
          strokeWidth={1.75}
          aria-hidden
        />
      )}
    </a>
  );
}
