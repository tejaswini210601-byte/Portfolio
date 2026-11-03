import { asset, SKILLS } from "@/lib/data";

/** Real brand logos copied into /public/logos (devicon = MIT, simple-icons = CC0). */
export const BRAND: Record<string, { file: string; tint: string }> = {
  python: { file: "python", tint: "#3776AB" },
  java: { file: "java", tint: "#E76F00" },
  scratch: { file: "scratch", tint: "#4D97FF" },
  html5: { file: "html5", tint: "#E34F26" },
  arduino: { file: "arduino", tint: "#00979D" },
  googleclassroom: { file: "googleclassroom", tint: "#0F9D58" },
  moodle: { file: "moodle", tint: "#F98012" },
  kahoot: { file: "kahoot", tint: "#46178F" },
  openai: { file: "openai", tint: "#412991" },
  claude: { file: "claude", tint: "#D97757" },
  googlegemini: { file: "googlegemini", tint: "#8E75B2" },
  vscode: { file: "vscode", tint: "#007ACC" },
  git: { file: "git", tint: "#F05032" },
  github: { file: "github", tint: "#181717" },
  canva: { file: "canva", tint: "#00C4CC" },
  zoom: { file: "zoom", tint: "#0B5CFF" },
  googlemeet: { file: "googlemeet", tint: "#00897B" },
};

/** Thin line icons (1.5px stroke, 24 grid) for concept skills that have no brand logo. */
export const CONCEPT: Record<string, React.ReactNode> = {
  game: (<><rect x="2.5" y="7" width="19" height="10" rx="5" /><path d="M7 10v4M5 12h4" /><circle cx="16" cy="11" r=".6" /><circle cx="18" cy="13" r=".6" /></>),
  app: (<><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" /><rect x="9" y="6" width="6" height="6" rx="1" /></>),
  blocks: (<><path d="M3 5h7v2h2V5h3v5H3z" /><path d="M6 13h8v2h2v-2h5v5H6z" /></>),
  robot: (<><rect x="5" y="8" width="14" height="10" rx="2.5" /><path d="M12 4v4M9 18v3M15 18v3" /><circle cx="9.5" cy="12.5" r="1" /><circle cx="14.5" cy="12.5" r="1" /><circle cx="12" cy="3.5" r=".8" /></>),
  gear: (<><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" /></>),
  chip: (<><rect x="6" y="6" width="12" height="12" rx="1.5" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" /></>),
  sensor: (<><circle cx="7" cy="12" r="2" /><path d="M11 8.5a5 5 0 0 1 0 7M14 6a8.5 8.5 0 0 1 0 12M17 3.5a12 12 0 0 1 0 17" /></>),
  algebra: (<><path d="M4 6l6 12M10 6L4 18" /><path d="M14 10h6M17 7v6M14 16h6" /></>),
  geometry: (<><path d="M12 3l9 16H3z" /><circle cx="12" cy="13.5" r="3" /></>),
  number: (<><path d="M9 3L7 21M17 3l-2 18M4 8.5h17M3 15.5h17" /></>),
  ruler: (<><rect x="2.5" y="8" width="19" height="8" rx="1" /><path d="M6 8v3M9.5 8v4M13 8v3M16.5 8v4" /></>),
  logic: (<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M7.8 7.8l3 7.8M16.2 7.8l-3 7.8" /></>),
  medal: (<><circle cx="12" cy="15" r="5.5" /><path d="M8.5 10.5L5 3h4l3 6 3-6h4l-3.5 7.5" /><path d="M12 12.5v5" /></>),
  puzzle: (<><path d="M4 4h6a2 2 0 1 1 4 0h6v6a2 2 0 1 0 0 4v6h-6a2 2 0 1 0-4 0H4v-6a2 2 0 1 1 0-4z" /></>),
  pattern: (<><circle cx="5" cy="5" r="1.5" /><circle cx="12" cy="5" r="1.5" /><circle cx="19" cy="5" r="1.5" /><rect x="3.5" y="10.5" width="3" height="3" /><rect x="10.5" y="10.5" width="3" height="3" /><rect x="17.5" y="10.5" width="3" height="3" /><path d="M5 17l-2 3h4zM12 17l-2 3h4zM19 17l-2 3h4z" /></>),
  book: (<><path d="M3 5.5C6 4 9 4 12 6c3-2 6-2 9-.5v13c-3-1.5-6-1.5-9 .5-3-2-6-2-9-.5z" /><path d="M12 6v13" /></>),
  plan: (<><rect x="4" y="3.5" width="16" height="17" rx="2" /><path d="M8 8.5h8M8 12h8M8 15.5h5" /></>),
  build: (<><path d="M3 21h18M5 21V11l7-6 7 6v10" /><path d="M10 21v-6h4v6" /></>),
  screen: (<><rect x="2.5" y="4" width="19" height="13" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M10 8.5l4 2-4 2z" /></>),
  check: (<><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 12.5l2.8 2.8L16.5 9" /></>),
  person: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>),
  people: (<><circle cx="9" cy="8" r="3.5" /><circle cx="17" cy="9.5" r="2.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M15.5 14.2c3 0 6 1.8 6 5" /></>),
  chat: (<><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>),
  code: (<><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></>),
  spark: (<><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" /><path d="M18.5 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></>),
  students: (<><circle cx="12" cy="7" r="3" /><circle cx="5" cy="9" r="2.2" /><circle cx="19" cy="9" r="2.2" /><path d="M6.5 20c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5M1.5 18c0-2.3 1.6-4 3.8-4M22.5 18c0-2.3-1.6-4-3.8-4" /></>),
  calendar: (<><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /><path d="M8 14h2M12 14h2M16 14h0M8 17h2M12 17h2" /></>),
  age: (<><circle cx="12" cy="6" r="2.5" /><path d="M12 8.5v6M8 11h8M12 14.5l-3 6M12 14.5l3 6" /></>),
  grade: (<><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6" /></>),
};

export const isBrand = (skillName: string) => !!SKILLS.find((s) => s.name === skillName)?.logo;

export function ConceptIcon({ name, size = 24, stroke = 1.5 }: { name: string; size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {CONCEPT[name] ?? CONCEPT.spark}
    </svg>
  );
}

/** Renders a skill's brand logo if it has one, otherwise its concept line icon. */
export default function TechLogo({ name, size = 24 }: { name: string; size?: number }) {
  const s = SKILLS.find((k) => k.name === name);
  if (s?.logo && BRAND[s.logo]) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset(`/logos/${BRAND[s.logo].file}.svg`)} alt="" width={size} height={size} style={{ width: size, height: size, objectFit: "contain" }} loading="lazy" />;
  }
  return <ConceptIcon name={s?.concept ?? "spark"} size={size} />;
}

export const tintOf = (name: string) => {
  const s = SKILLS.find((k) => k.name === name);
  return s?.logo ? BRAND[s.logo]?.tint : undefined;
};
