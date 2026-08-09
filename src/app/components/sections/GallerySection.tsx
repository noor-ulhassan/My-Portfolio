import { SectionShell } from "../SectionShell";
import { RichText } from "../RichText";
import type { Block } from "../types";

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
  aspectRatio?: "square" | "video" | "portrait";
}

export interface GalleryData {
  description?: Block[];
  items: GalleryItem[];
}

export function GallerySection({ title, data }: { title: string; data: GalleryData }) {
  return (
    <SectionShell title={title}>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        {data.description && (
          <div className="mb-6 space-y-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <RichText blocks={data.description} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.items.map((item, i) => {
            const aspectClass =
              item.aspectRatio === "portrait"
                ? "aspect-[3/4]"
                : item.aspectRatio === "video"
                ? "aspect-video"
                : "aspect-square";

            return (
              <div
                key={i}
                className={`relative group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 ${aspectClass}`}
              >
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.alt || ""}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <video
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                
                {/* Caption overlay */}
                {item.caption && (
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="p-4 text-sm font-medium text-white translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
