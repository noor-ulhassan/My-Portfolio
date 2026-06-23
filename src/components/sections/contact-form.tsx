"use client";

import { useState, useId, type FormEvent } from "react";
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
  "w-full rounded-xl border bg-surface/40 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-faint focus:border-accent focus:ring-2 focus:ring-accent/30";

export function ContactForm({ toEmail }: { toEmail: string }) {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");
  const [usedMailto, setUsedMailto] = useState(false);

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function openMailto() {
    const subject = encodeURIComponent(`Portfolio message from ${fields.name}`);
    const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`);
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot — real users never fill this hidden field.
    const form = e.currentTarget;
    if ((form.elements.namedItem("company") as HTMLInputElement)?.value) return;

    const found = validate(fields);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...fields, company: "" }),
      });

      // Server-side validation echoes field errors.
      if (res.status === 422) {
        const json = await res.json().catch(() => null);
        if (json?.errors) setErrors(json.errors as Errors);
        setStatus("idle");
        return;
      }

      // Email backend isn't configured — fall back to the visitor's mail client.
      if (res.status === 503) {
        openMailto();
        setUsedMailto(true);
        setStatus("success");
        setFields({ name: "", email: "", message: "" });
        return;
      }

      if (!res.ok) throw new Error("Request failed");

      setUsedMailto(false);
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setServerError("Something went wrong. Please try again, or email me directly.");
      setStatus("error");
    }
  }

  return (
    <div className="relative rounded-3xl border border-border bg-surface/30 p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-4 py-12 text-center"
            role="status"
          >
            <span className="grid size-14 place-items-center rounded-full bg-accent/15 text-accent">
              <Check className="size-7" strokeWidth={2} aria-hidden />
            </span>
            <h3 className="text-metallic font-display text-2xl font-semibold tracking-tight">
              {usedMailto ? "Opening your email app" : "Message sent"}
            </h3>
            <p className="max-w-xs text-pretty text-muted">
              {usedMailto
                ? "Your email client should open with the message ready to send."
                : "Thanks for reaching out — I'll get back to you soon."}
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
              className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" error={errors.name}>
                {(id, describedBy) => (
                  <input
                    id={id}
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={describedBy}
                    className={cn(fieldBase, errors.name ? "border-red-500/60" : "border-border")}
                  />
                )}
              </Field>
              <Field label="Email" name="email" error={errors.email}>
                {(id, describedBy) => (
                  <input
                    id={id}
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={describedBy}
                    className={cn(fieldBase, errors.email ? "border-red-500/60" : "border-border")}
                  />
                )}
              </Field>
            </div>

            <Field label="Message" name="message" error={errors.message}>
              {(id, describedBy) => (
                <textarea
                  id={id}
                  name="message"
                  rows={5}
                  value={fields.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell me about your project, role, or idea…"
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy}
                  className={cn(
                    fieldBase,
                    "resize-none",
                    errors.message ? "border-red-500/60" : "border-border",
                  )}
                />
              )}
            </Field>

            <div aria-live="polite">
              {status === "error" && (
                <p className="flex items-center gap-2 text-sm text-red-500" role="alert">
                  <AlertCircle className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
                  {serverError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-metallic-orange group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium text-accent-contrast transition-colors duration-300 hover:brightness-[1.04] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" strokeWidth={2} aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden
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
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: (id: string, describedBy: string | undefined) => React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-${name}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-widest text-faint">
        {label}
      </label>
      {children(id, error ? errorId : undefined)}
      <AnimatePresence>
        {error && (
          <motion.span
            id={errorId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-500"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
