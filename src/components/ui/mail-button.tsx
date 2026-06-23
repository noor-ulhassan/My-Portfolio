"use client";

import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./magnetic";

/**
 * Primary email CTA. A magnetic pull plus an arrow that flies out the
 * top-right while a fresh one slides up to replace it.
 */
export function MailButton({ email }: { email: string }) {
  return (
    <Magnetic strength={0.4}>
      <a
        href={`mailto:${email}`}
        className="bg-metallic-orange group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-lg font-medium text-accent-contrast transition-colors duration-300 hover:brightness-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="relative">{email}</span>

        {/* arrow fly-out / fly-in */}
        <span className="relative grid size-5 place-items-center overflow-hidden">
          <ArrowUpRight
            className="col-start-1 row-start-1 size-5 transition-transform duration-300 ease-out group-hover:translate-x-6 group-hover:-translate-y-6"
            strokeWidth={2}
            aria-hidden
          />
          <ArrowUpRight
            className="col-start-1 row-start-1 size-5 -translate-x-6 translate-y-6 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
            strokeWidth={2}
            aria-hidden
          />
        </span>
      </a>
    </Magnetic>
  );
}
