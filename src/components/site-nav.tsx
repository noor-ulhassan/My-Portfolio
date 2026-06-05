"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, profile } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { ActionLink } from "./ui/action-link";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Toggle the condensed pill state once the hero scrolls away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for whichever section is in view.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function openMenu() {
    window.dispatchEvent(new Event("lenis:stop"));
    setOpen(true);
  }

  function closeMenu() {
    // Resume scrolling synchronously so anchor links inside the menu can ease.
    window.dispatchEvent(new Event("lenis:start"));
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress hairline */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <nav className="container-x">
        <div
          className={cn(
            "mt-3 flex items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-4",
            scrolled
              ? "border border-border bg-surface/70 backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
        >
          <a
            href="#top"
            className="group flex items-center gap-2 pl-2 pr-3 font-serif text-lg tracking-tight"
          >
            <img
              src="/profile.jpeg"
              alt={profile.name}
              className="size-7 rounded-full object-cover"
            />
            <span className="hidden sm:inline">{profile.name.split(" ")[0]}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    active === item.id
                      ? "text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ActionLink
              href="#contact"
              variant="primary"
              arrow={false}
              className="hidden px-5 py-2.5 sm:inline-flex"
            >
              Let&rsquo;s talk
            </ActionLink>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-border-strong text-foreground md:hidden"
            >
              <Menu className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-x flex items-center justify-end pt-3">
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="mt-3 grid size-10 place-items-center rounded-full border border-border-strong text-foreground"
              >
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </div>
            <ul className="container-x flex flex-1 flex-col justify-center gap-2">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={closeMenu}
                    className="flex items-baseline gap-4 py-3 font-serif text-5xl tracking-tight hover:text-accent"
                  >
                    <span className="label text-faint">{`0${i + 1}`}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
