import { Quote, Star } from "lucide-react";
import { SectionShell } from "../SectionShell";

export interface Testimonial {
  /** The client's full name, shown beneath their quote. */
  name: string;
  /** Their role, e.g. "Founder" or "Head of Product". */
  role: string;
  /** Optional company or organization name. */
  company?: string;
  /** A verified client quote. Keep this concise: one or two sentences works best. */
  quote: string;
  /** Optional 1–5 client rating. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Optional public profile, company, or case-study link. */
  link?: string;
  /** Optional local image path or public URL. Falls back to initials when omitted. */
  avatar?: string;
}

export interface TestimonialsData {
  /** Add, remove, or reorder client feedback here. An empty array keeps the section off the page. */
  items: Testimonial[];
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = testimonial.rating ?? 0;
  const initials = testimonial.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
  const person = (
    <>
      <span className="block text-sm font-semibold text-black dark:text-white">{testimonial.name}</span>
      <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-500">
        {testimonial.role}
        {testimonial.company && `, ${testimonial.company}`}
      </span>
    </>
  );

  return (
    <figure className="flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-zinc-900/30 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        {rating > 0 ? (
          <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                className={
                  index < rating
                    ? "h-4 w-4 fill-current text-amber-400"
                    : "h-4 w-4 text-gray-300 dark:text-zinc-700"
                }
                strokeWidth={1.5}
              />
            ))}
          </div>
        ) : (
          <span />
        )}
        <Quote aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
      </div>
      <blockquote className="flex-1 text-base leading-relaxed text-gray-700 dark:text-gray-300">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-7 border-t border-gray-200 pt-4 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white text-xs font-bold tracking-wide text-gray-700 dark:border-gray-700 dark:bg-zinc-950 dark:text-gray-300">
            {testimonial.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={testimonial.avatar} alt={`${testimonial.name} profile photo`} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span aria-label={`${testimonial.name} initials`}>{initials}</span>
            )}
          </div>
          {testimonial.link ? (
            <a
              href={testimonial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block rounded-sm outline-offset-4 transition-colors hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-black dark:hover:text-gray-300 dark:focus-visible:outline-white"
            >
              {person}
            </a>
          ) : (
            person
          )}
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Client feedback, designed to be entirely configured from portfolio.json.
 * Place its section object anywhere in the ordered `sections` array.
 */
export function TestimonialsSection({ title, data }: { title: string; data: TestimonialsData }) {
  // No empty-state or placeholder is shown publicly: social proof should only
  // appear when the portfolio owner has genuine, approved feedback to share.
  if (data.items.length === 0) return null;

  return (
    <SectionShell title={title}>
      <div className={`grid gap-4 ${data.items.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {data.items.map((testimonial) => (
          <TestimonialCard key={`${testimonial.name}-${testimonial.company ?? ""}`} testimonial={testimonial} />
        ))}
      </div>
    </SectionShell>
  );
}
