import type { ReactNode } from "react";
import type { NavKey } from "@/content/content.data";

/** 共通の stroke アイコン用ラッパ。サイズは利用側のCSS（svg{width/height}）で決まる。 */
function Stroke({ sw = 1.8, children }: { sw?: number; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/* ---------- よく使う単体アイコン ---------- */
export const ArrowRight = ({ sw = 2 }: { sw?: number }) => (
  <Stroke sw={sw}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);

/* ---------- ブランド/連絡アイコン（200KB級の生PNGをインラインSVGに置換） ---------- */
export const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-1.95c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.05.78 2.12v3.15c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
export const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-7-6.1 7H1.7l8-9.2L1 2h7l4.8 6.4L18.9 2Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z" />
  </svg>
);
export const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const ArrowUpRight = ({ sw = 2 }: { sw?: number }) => (
  <Stroke sw={sw}>
    <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </Stroke>
);

export const Check = ({ sw = 2 }: { sw?: number }) => (
  <Stroke sw={sw}>
    <path d="M20 6 9 17l-5-5" />
  </Stroke>
);

export const PlusCircle = () => (
  <Stroke sw={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </Stroke>
);

export const ChevronLeft = () => (
  <Stroke sw={2}>
    <path d="M15 6l-6 6 6 6" />
  </Stroke>
);

export const ChevronRight = () => (
  <Stroke sw={2}>
    <path d="M9 6l6 6-6 6" />
  </Stroke>
);

/* ---------- ナビアイコン ---------- */
export const navIcons: Record<NavKey, ReactNode> = {
  home: (
    <Stroke>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9.5 20v-6h5v6" />
    </Stroke>
  ),
  works: (
    <Stroke>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3 12h18" />
    </Stroke>
  ),
  research: (
    <Stroke>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 16h6" />
    </Stroke>
  ),
  about: (
    <Stroke>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </Stroke>
  ),
};

/* ---------- データ駆動リスト用アイコンレジストリ ---------- */
export const icons: Record<string, ReactNode> = {
  user: (
    <Stroke sw={1.6}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </Stroke>
  ),
  building: (
    <Stroke sw={1.6}>
      <path d="M3 21h18M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M15 21V9h3a1 1 0 0 1 1 1v11M8 8h.01M11 8h.01M8 12h.01M11 12h.01M8 16h.01M11 16h.01" />
    </Stroke>
  ),
  cap: (
    <Stroke sw={1.6}>
      <path d="M2 9l10-4 10 4-10 4L2 9Z" />
      <path d="M6 11v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5M22 9v5" />
    </Stroke>
  ),
  atom: (
    <Stroke sw={1.6}>
      <circle cx="12" cy="12" r="2.2" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </Stroke>
  ),
  pin: (
    <Stroke sw={1.6}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Stroke>
  ),
  globe: (
    <Stroke sw={1.6}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </Stroke>
  ),
  heart: (
    <Stroke sw={1.6}>
      <path d="M12 20s-7-4.6-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5C19 15.4 12 20 12 20Z" />
    </Stroke>
  ),
  star: (
    <Stroke sw={1.6}>
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
    </Stroke>
  ),
  gem: (
    <Stroke sw={1.6}>
      <path d="M5.5 4h13l3 5-9.5 11L3 9l2.5-5Z" />
      <path d="M3 9h18M9 4l-1 5 4 11 4-11-1-5" />
    </Stroke>
  ),
  shield: (
    <Stroke sw={1.6}>
      <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Stroke>
  ),
  book: (
    <Stroke sw={1.6}>
      <path d="M4 5a2 2 0 0 1 2-2h11v15H6a2 2 0 0 0-2 2V5Z" />
      <path d="M9 8h5M9 11h5" />
    </Stroke>
  ),
  monitor: (
    <Stroke sw={1.6}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M9 21h6M12 17v4M7 8h7M7 11h4" />
    </Stroke>
  ),
  checkCircle: (
    <Stroke sw={1.7}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5L16 9" />
    </Stroke>
  ),
  codeStack: (
    <Stroke sw={1.7}>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" />
    </Stroke>
  ),
  link: (
    <Stroke sw={1.7}>
      <path d="M10 14a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 10a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
    </Stroke>
  ),
  sparkle: (
    <Stroke sw={1.6}>
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z" />
      <path d="M18 15l.7 1.8L20.5 17.5 18.7 18.2 18 20l-.7-1.8L15.5 17.5l1.8-.7L18 15Z" />
    </Stroke>
  ),
  pen: (
    <Stroke sw={1.6}>
      <path d="M14.5 3.5 20.5 9.5 8 22H2v-6L14.5 3.5Z" />
      <path d="m12 6 6 6" />
    </Stroke>
  ),
  chart: (
    <Stroke sw={1.6}>
      <path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6" />
    </Stroke>
  ),
  network: (
    <Stroke sw={1.6}>
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="12" cy="17.5" r="2" />
      <path d="M7.6 8.4 10.6 16M16.4 8.4 13.4 16M8 7h8" />
    </Stroke>
  ),
  grid: (
    <Stroke sw={1.6}>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </Stroke>
  ),
  question: (
    <Stroke sw={1.6}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 16.5h.01" />
    </Stroke>
  ),
  wand: (
    <Stroke sw={1.6}>
      <path d="M14.5 5.5a3 3 0 0 0-4 4L4 16v3h3l6.5-6.5a3 3 0 0 0 4-4l-2 2-2-2 2-2Z" />
    </Stroke>
  ),
  layers: (
    <Stroke sw={1.6}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </Stroke>
  ),
  people: (
    <Stroke sw={1.6}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 6.5a3 3 0 0 1 0 6M21 19c0-2.4-1.6-4.2-3.8-4.8" />
    </Stroke>
  ),
  terrain: (
    <Stroke sw={1.5}>
      <path d="M3 20h18L14 8l-3 5-2-3-6 10Z" />
    </Stroke>
  ),
  sun: (
    <Stroke sw={1.5}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </Stroke>
  ),
  noise: (
    <Stroke sw={1}>
      <circle cx="6" cy="7" r="1" />
      <circle cx="11" cy="5" r="1" />
      <circle cx="16" cy="8" r="1" />
      <circle cx="8" cy="12" r="1" />
      <circle cx="14" cy="13" r="1" />
      <circle cx="18" cy="11" r="1" />
      <circle cx="6" cy="17" r="1" />
      <circle cx="12" cy="18" r="1" />
      <circle cx="17" cy="16" r="1" />
    </Stroke>
  ),
  cube: (
    <Stroke sw={1.5}>
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </Stroke>
  ),
  /* about の Tech I Use エンブレム */
  postgres: (
    <Stroke sw={1.5}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </Stroke>
  ),
  react: (
    <Stroke sw={1.5}>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </Stroke>
  ),
  tailwind: (
    <Stroke sw={1.5}>
      <path d="M7 10c1-2.5 2.7-3.7 5-3.7 3.5 0 3.7 2.6 6 3.2-1 2.5-2.7 3.7-5 3.7-3.5 0-3.7-2.6-6-3.2Z" />
      <path d="M2.5 14.5c1-2.5 2.7-3.7 5-3.7 3.5 0 3.7 2.6 6 3.2-1 2.5-2.7 3.7-5 3.7-3.5 0-3.7-2.6-6-3.2Z" />
    </Stroke>
  ),
  github: (
    <Stroke sw={1.5}>
      <path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.3 1.1 2.9.8.1-.7.3-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.7c0 .3.2.6.7.5A10 10 0 0 0 22 12.3C22 6.6 17.5 2 12 2Z" />
    </Stroke>
  ),
};

/** Home の Tech I Use（名前→アイコン） */
export const homeTechIcons: Record<string, ReactNode> = {
  "Next.js": (
    <Stroke sw={1.6}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8v8M9 8l6 8M15 9v3" />
    </Stroke>
  ),
  TypeScript: (
    <Stroke sw={1.6}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 11h5M10.5 11v6M14 16c.6.8 3 .9 3-.6 0-1.4-3-1-3-2.4 0-1.3 2.2-1.2 2.8-.4" />
    </Stroke>
  ),
  React: icons.react,
  "Tailwind CSS": icons.tailwind,
  "Claude API": icons.sparkle,
  "Gemini API": icons.sun,
  Python: icons.codeStack,
  "Supabase / PostgreSQL": icons.postgres,
  "Vercel / GitHub": icons.github,
};
