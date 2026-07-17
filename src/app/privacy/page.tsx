import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${profile.name}'s portfolio site handles your data.`,
};

const LAST_UPDATED = "June 23, 2026";

function Clause({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-metallic font-display text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-pretty leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      {/* minimal top bar (full nav would point at homepage anchors) */}
      <header className="border-b border-border">
        <div className="container-x flex items-center justify-between py-5">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
            aria-label={`${profile.name} — home`}
          >
            <span className="text-metallic">{profile.name.split(" ")[0]}</span>
            <span className="text-accent">.</span>
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden
            />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container-x max-w-3xl py-16 sm:py-24">
        <span className="label">{"// legal"}</span>
        <h1 className="text-metallic mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-faint">Last updated {LAST_UPDATED}</p>

        <div className="mt-12 flex flex-col gap-10">
          <Clause title="Overview">
            <p>
              This is the personal portfolio of {profile.name}. It&rsquo;s a static
              marketing site with a single contact form — there are no accounts, no
              logins, and no tracking pixels. This page explains exactly what data the
              site touches and why.
            </p>
          </Clause>

          <Clause title="What I collect">
            <p>
              The only information collected is what you choose to send through the
              contact form: your <strong className="text-foreground">name</strong>, your{" "}
              <strong className="text-foreground">email address</strong>, and your{" "}
              <strong className="text-foreground">message</strong>. Nothing is collected
              if you simply browse the site.
            </p>
          </Clause>

          <Clause title="How it&rsquo;s used">
            <p>
              Your submission is used for one purpose: to read your message and reply to
              you. It is never sold, rented, or used for marketing.
            </p>
          </Clause>

          <Clause title="Third-party services">
            <ul className="flex flex-col gap-2">
              <li className="flex gap-3">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" aria-hidden />
                <span>
                  <strong className="text-foreground">Resend</strong> delivers contact-form
                  messages to my inbox. Your name, email, and message pass through Resend
                  solely for delivery.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" aria-hidden />
                <span>
                  <strong className="text-foreground">The hosting provider</strong> may keep
                  standard server logs (such as IP address and request time) for security
                  and reliability, as is typical for any website.
                </span>
              </li>
            </ul>
          </Clause>

          <Clause title="Cookies & analytics">
            <p>
              This site sets no cookies and runs no third-party analytics or advertising
              trackers.
            </p>
          </Clause>

          <Clause title="Data retention">
            <p>
              Contact messages live in my email inbox and are kept only as long as needed
              to handle your enquiry. You can ask me to delete our correspondence at any
              time.
            </p>
          </Clause>

          <Clause title="Your rights">
            <p>
              You can request access to, correction of, or deletion of any personal data
              you&rsquo;ve sent me. Just reach out using the contact details below and
              I&rsquo;ll take care of it.
            </p>
          </Clause>

          <Clause title="Changes to this policy">
            <p>
              If this policy changes, the updated version will be posted here with a new
              &ldquo;last updated&rdquo; date.
            </p>
          </Clause>

          <Clause title="Contact">
            <p>
              Questions about your data? Email me at{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-metallic-orange underline-offset-4 hover:underline"
              >
                {profile.email}
              </a>
              .
            </p>
          </Clause>
        </div>
      </main>
    </>
  );
}
