import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/content/site";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/ui/reveal";
import { MailButton } from "@/components/ui/mail-button";
import { Spotlight } from "@/components/ui/spotlight";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="section relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute -top-40 right-0 -z-10 size-[36rem] rounded-full bg-accent/6 blur-[130px]"
        aria-hidden
      />
      <Spotlight className="-top-60 right-0 -z-10 opacity-60 md:right-1/4" />

      <div className="container-x flex flex-col gap-12">
        <Reveal className="flex items-center gap-3">
          <span className="label text-faint tabular-nums">05</span>
          <span className="label">Contact</span>
          <span className="h-px w-10 bg-border-strong" aria-hidden />
        </Reveal>

        <Reveal
          as="h2"
          className="text-metallic max-w-4xl text-balance font-display text-display font-semibold tracking-[-0.02em]"
        >
          Let&rsquo;s make something{" "}
          <span className="serif-italic font-normal text-metallic-orange">worth shipping</span>.
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* left: pitch + direct links */}
          <div className="flex flex-col gap-8">
            <Reveal as="p" delay={0.1} className="max-w-md text-pretty text-lg leading-relaxed text-muted">
              {profile.available
                ? "I'm currently available for new roles and freelance work. Have a project, a role, or just an idea? Drop a line below — or reach out directly."
                : "Always happy to talk shop, swap ideas, or hear about interesting problems. Use the form, or reach out directly."}
            </Reveal>

            <Reveal delay={0.15}>
              <MailButton email={profile.email} />
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col divide-y divide-border border-t border-border">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                >
                  <span className="flex items-center gap-3">
                    <Icon name={s.icon} className="size-4 text-accent" />
                    <span className="flex flex-col">
                      <span className="text-sm text-foreground">{s.label}</span>
                      <span className="font-mono text-xs text-faint">{s.handle}</span>
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </a>
              ))}
            </Reveal>
          </div>

          {/* right: contact form */}
          <Reveal delay={0.1}>
            <ContactForm toEmail={profile.email} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
