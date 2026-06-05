import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiSocketdotio,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiGit,
  SiDocker,
  SiVercel,
  SiJest,
} from "react-icons/si";
import { TbApi, TbDatabase, TbInfinity } from "react-icons/tb";

type TechMeta = { icon: IconType; color: string };

/**
 * Maps a tech name (as written in content/site.ts) to its brand glyph and
 * official brand color. Add an entry here when you add a new skill.
 * Keys are matched case-insensitively; unknown techs fall back gracefully.
 */
const TECH: Record<string, TechMeta> = {
  typescript: { icon: SiTypescript, color: "#3178C6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  python: { icon: SiPython, color: "#3776AB" },
  sql: { icon: TbDatabase, color: "#E0814E" },
  react: { icon: SiReact, color: "#61DAFB" },
  "next.js": { icon: SiNextdotjs, color: "#EDEDED" },
  "tailwind css": { icon: SiTailwindcss, color: "#38BDF8" },
  "framer motion": { icon: SiFramer, color: "#E0814E" },
  redux: { icon: SiRedux, color: "#764ABC" },
  "node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  express: { icon: SiExpress, color: "#EDEDED" },
  rest: { icon: TbApi, color: "#E0814E" },
  graphql: { icon: SiGraphql, color: "#E10098" },
  websockets: { icon: SiSocketdotio, color: "#EDEDED" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  postgresql: { icon: SiPostgresql, color: "#4169E1" },
  prisma: { icon: SiPrisma, color: "#EDEDED" },
  redis: { icon: SiRedis, color: "#FF4438" },
  git: { icon: SiGit, color: "#F05032" },
  docker: { icon: SiDocker, color: "#2496ED" },
  vercel: { icon: SiVercel, color: "#EDEDED" },
  jest: { icon: SiJest, color: "#C21325" },
  "ci/cd": { icon: TbInfinity, color: "#E0814E" },
};

const FALLBACK: TechMeta = { icon: TbApi, color: "#E0814E" };

export function getTech(name: string): TechMeta {
  return TECH[name.toLowerCase()] ?? FALLBACK;
}

/**
 * A tech glyph. Monochrome (inherits text color) by default; pass a `colored`
 * flag to render it in its brand color instead.
 */
export function TechIcon({
  name,
  className,
  colored = false,
}: {
  name: string;
  className?: string;
  colored?: boolean;
}) {
  const { icon: Glyph, color } = getTech(name);
  return (
    <Glyph
      className={className}
      style={colored ? { color } : undefined}
      aria-hidden
    />
  );
}

export function getTechColor(name: string) {
  return getTech(name).color;
}
