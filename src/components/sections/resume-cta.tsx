import { profile } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { Magnetic } from "@/components/ui/magnetic";

export function ResumeCta() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 px-6 py-12 text-center sm:px-12">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div
            className="pointer-events-none absolute left-1/2 top-0 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/6 blur-[120px]"
            aria-hidden
          />
          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-5">
            <span className="label">{"// resume"}</span>
            <h2 className="text-metallic font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Want the{" "}
              <span className="serif-italic font-normal text-metallic-orange">full picture</span>?
            </h2>
            <p className="text-pretty leading-relaxed text-muted">
              Grab my resume for a detailed look at my experience, projects, and the stack
              behind them.
            </p>
            <Magnetic>
              <ActionLink
                href={profile.resumeUrl}
                variant="primary"
                download
                arrow={false}
                className="px-7 py-3.5 text-base"
              >
                Download resume
              </ActionLink>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
