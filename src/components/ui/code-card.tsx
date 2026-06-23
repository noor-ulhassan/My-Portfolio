import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Entry = { key: string; value: string | string[] };

/* editor-ish token palette (kept readable on the near-black surface) */
const C = {
  kw: "text-accent-soft", // const  (brand orange)
  fn: "text-foreground", // identifier
  key: "text-[#93c5fd]", // property
  str: "text-[#86efac]", // string
  punct: "text-faint", // punctuation
} as const;

function Str({ children }: { children: string }) {
  return <span className={C.str}>&quot;{children}&quot;</span>;
}

function Value({ value }: { value: string | string[] }) {
  if (Array.isArray(value)) {
    return (
      <>
        <span className={C.punct}>[</span>
        {value.map((v, i) => (
          <span key={v}>
            <Str>{v}</Str>
            {i < value.length - 1 && <span className={C.punct}>, </span>}
          </span>
        ))}
        <span className={C.punct}>]</span>
      </>
    );
  }
  return <Str>{value}</Str>;
}

function Line({ n, children }: { n: number; children: ReactNode }) {
  return (
    <span className="grid grid-cols-[1.75rem_1fr] gap-4">
      <span className="select-none text-right text-faint/50">{n}</span>
      <span className="whitespace-pre">{children}</span>
    </span>
  );
}

/**
 * A faux source-file card ("me, as code") rendered from real profile data.
 * Presentational only — no syntax engine, just hand-tokenised spans.
 */
export function CodeCard({
  varName,
  filename = "about.js",
  entries,
  className,
}: {
  varName: string;
  filename?: string;
  entries: Entry[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-[0_14px_40px_-22px_rgb(0_0_0/0.5)] backdrop-blur",
        className,
      )}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-2/60 px-4 py-3">
        <span className="size-3 rounded-full bg-red-400/70" aria-hidden />
        <span className="size-3 rounded-full bg-amber-400/70" aria-hidden />
        <span className="size-3 rounded-full bg-emerald-400/70" aria-hidden />
        <span className="ml-2 font-mono text-xs text-faint">{filename}</span>
      </div>

      {/* code body */}
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed sm:p-6">
        <code className="grid gap-0.5">
          <Line n={1}>
            <span className={C.kw}>const</span>{" "}
            <span className={C.fn}>{varName}</span>{" "}
            <span className={C.punct}>= {"{"}</span>
          </Line>
          {entries.map((e, i) => (
            <Line n={i + 2} key={e.key}>
              {"  "}
              <span className={C.key}>{e.key}</span>
              <span className={C.punct}>: </span>
              <Value value={e.value} />
              <span className={C.punct}>,</span>
            </Line>
          ))}
          <Line n={entries.length + 2}>
            <span className={C.punct}>{"}"}</span>
          </Line>
        </code>
      </pre>
    </div>
  );
}
