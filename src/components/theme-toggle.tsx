"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Theme toggle. Both icons render on the server; the active one is revealed via
 * the `.dark` class (set by next-themes before paint), so there's no hydration
 * mismatch and no mount effect needed.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle color theme"
      className="relative grid size-10 place-items-center rounded-full border border-border-strong text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Sun
        className="size-4 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0"
        strokeWidth={1.75}
        aria-hidden
      />
      <Moon
        className="absolute size-4 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100"
        strokeWidth={1.75}
        aria-hidden
      />
    </button>
  );
}
