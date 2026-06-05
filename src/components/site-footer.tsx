import { ArrowUp } from "lucide-react";
import { navItems, profile, socials } from "@/content/site";
import { Icon } from "./icon";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-x flex flex-col gap-10 py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <a href="#top" className="font-serif text-2xl tracking-tight">
            {profile.name}
          </a>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="link-underline text-sm text-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon name={s.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 text-sm text-faint sm:flex-row sm:items-center">
          <p>
            &copy; {year} {profile.name}. Built with Next.js &amp; Tailwind.
          </p>
          <a
            href="#top"
            className="link-underline inline-flex items-center gap-1.5 hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5" strokeWidth={1.75} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
