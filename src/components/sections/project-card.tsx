"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";
import { TechIcon } from "@/components/tech-icon";

function initials(title: string) {
  return title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  // Cursor-following warm highlight.
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%)`;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.08 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/40 transition-colors duration-500 hover:border-border-strong",
        project.featured ? "md:col-span-2 md:grid md:grid-cols-2" : "",
      )}
    >
      {/* spotlight layer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* visual panel (featured only) */}
      {project.featured && (
        <div className="relative order-last hidden overflow-hidden border-border md:order-first md:flex md:border-r">
          <div className="grid-lines absolute inset-0 opacity-50" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative flex flex-1 items-center justify-center p-10">
            <span className="font-serif text-[7rem] leading-none tracking-tight text-foreground/85 transition-transform duration-700 group-hover:scale-105">
              {initials(project.title)}
            </span>
          </div>
        </div>
      )}

      {/* content */}
      <div className="relative flex flex-1 flex-col gap-5 p-7 sm:p-9">
        <div className="flex items-center justify-between">
          <span className="label text-faint tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-faint">
            {project.meta}
          </span>
        </div>

        <h3 className="font-serif text-3xl tracking-tight sm:text-4xl">
          {project.title}
        </h3>

        <p className="text-pretty leading-relaxed text-muted">
          {project.description}
        </p>

        {project.highlights.length > 0 && (
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2 h-px w-4 shrink-0 bg-accent" aria-hidden />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="flex items-center gap-1.5 rounded-full border border-border bg-surface-2/60 px-3 py-1 font-mono text-[0.7rem] text-muted"
            >
              <TechIcon name={t} className="size-3.5 text-faint" />
              {t}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 pt-2">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
            >
              Live <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground"
            >
              <Icon name="github" className="size-4" /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
