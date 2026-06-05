"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, AlertCircle, Send } from "lucide-react";
import { contact } from "@/content/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, message }: Fields): Errors {
  const errors: Errors = {};
  if (name.trim().length < 2) errors.name = "Please tell me your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (message.trim().length < 10) errors.message = "A little more detail, please (10+ chars).";
  return errors;
}

const fieldBase =
  "w-full rounded-xl border bg-surface/40 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-faint focus:border-accent";

export function ContactForm({ toEmail }: { toEmail: string }) {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // honeypot: real users never fill this hidden field
    const form = e.currentTarget;
    if ((form.elements.namedItem("company") as HTMLInputElement)?.value) return;

    const found = validate(fields);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setStatus("submitting");
    try {
      if (contact.formEndpoint) {
        const res = await fetch(contact.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(fields),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // No endpoint configured — fall back to the visitor's email client.
        const subject = encodeURIComponent(`Portfolio message from ${fields.name}`);
        const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`);
        window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
      }
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative rounded-3xl border border-border bg-surface/30 p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-4 py-12 text-center"
          >
            <span className="grid size-14 place-items-center rounded-full bg-accent/15 text-accent">
              <Check className="size-7" strokeWidth={2} />
            </span>
            <h3 className="font-serif text-2xl">Message sent</h3>
            <p className="max-w-xs text-pretty text-muted">
              Thanks for reaching out — I&rsquo;ll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="link-underline text-sm text-accent"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Ada Lovelace"
                  className={cn(fieldBase, errors.name ? "border-red-500/60" : "border-border")}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  className={cn(fieldBase, errors.email ? "border-red-500/60" : "border-border")}
                />
              </Field>
            </div>

            <Field label="Message" error={errors.message}>
              <textarea
                name="message"
                rows={5}
                value={fields.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell me about your project, role, or idea…"
                className={cn(
                  fieldBase,
                  "resize-none",
                  errors.message ? "border-red-500/60" : "border-border",
                )}
              />
            </Field>

            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="size-4" strokeWidth={1.75} />
                Something went wrong. Please try again or email me directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-contrast transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" strokeWidth={2} />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-widest text-faint">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-500"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
