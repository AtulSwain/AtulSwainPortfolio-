import {
  siClaude,
  siFastapi,
  siFlask,
  siGit,
  siGithubactions,
  siJavascript,
  siLangchain,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siReact,
  siSocketdotio,
  siSqlite,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVite,
  type SimpleIcon,
} from "simple-icons";
import { skills } from "@/content/profile";
import { projects } from "@/content/projects";
import { SectionHeading } from "../ui/section-heading";

// Tool name (as written in profile.ts) → brand icon.
const icons: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Node.js": siNodedotjs,
  Python: siPython,
  FastAPI: siFastapi,
  Flask: siFlask,
  "Tailwind CSS": siTailwindcss,
  PostgreSQL: siPostgresql,
  SQLite: siSqlite,
  "Socket.IO": siSocketdotio,
  "three.js": siThreedotjs,
  pandas: siPandas,
  NumPy: siNumpy,
  Git: siGit,
  "GitHub Actions": siGithubactions,
  "Claude API": siClaude,
  LangChain: siLangchain,
  Vite: siVite,
};

/** Very dark brand colours are drawn in white so they stay visible. */
function tint(hex: string) {
  const n = parseInt(hex, 16);
  const l = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return l < 0.35 ? "#f3f3f1" : `#${hex}`;
}

// Counted straight from the stacks in projects.ts.
const tracked: { label: string; match: string[] }[] = [
  { label: "HTML & CSS", match: ["HTML", "CSS", "Tailwind CSS"] },
  { label: "JavaScript", match: ["JavaScript"] },
  { label: "TypeScript", match: ["TypeScript"] },
  { label: "Python", match: ["Python"] },
  { label: "React / Next.js", match: ["React", "Next.js"] },
  { label: "Node.js", match: ["Node.js"] },
  { label: "Real-time (Socket.IO / WebRTC)", match: ["Socket.IO", "WebRTC"] },
  { label: "SQL databases", match: ["SQLite", "PostgreSQL", "MySQL"] },
];

export function Skills() {
  const all = skills.flatMap((g) => g.items);
  const withIcon = all.filter((t) => icons[t]);
  const usage = tracked
    .map((t) => ({ ...t, count: projects.filter((p) => p.stack.some((s) => t.match.includes(s))).length }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count);
  const max = Math.max(...usage.map((u) => u.count));

  return (
    <section id="skills" className="container-page py-16 md:py-20">
      <SectionHeading label="Skills" title="Tools I Work With" />

      <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10">
        {withIcon.map((name) => {
          const icon = icons[name];
          const color = tint(icon.hex);
          return (
            <li key={name} className="reveal">
              <div
                className="panel lift group flex aspect-square flex-col items-center justify-center gap-2.5 rounded-[14px] p-2"
                style={{ "--brand": color } as React.CSSProperties}
                title={name}
              >
                <svg viewBox="0 0 24 24" className="size-8 transition-transform duration-500 ease-out-expo group-hover:scale-110" fill={color} aria-hidden>
                  <path d={icon.path} />
                </svg>
                <span className="text-center text-[11px] leading-tight text-fg-2 transition-colors group-hover:text-fg">{name}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="panel reveal grid gap-5 p-6 sm:grid-cols-2">
          {skills.map((g) => (
            <div key={g.title}>
              <h3 className="eyebrow text-fg-2!">{g.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-fg-2">{g.items.join(" · ")}</p>
            </div>
          ))}
        </div>
        <figure className="panel reveal p-6">
          <figcaption className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-[15px] font-semibold tracking-tight">Across my projects</h3>
            <span className="text-[12px] text-fg-3">of {projects.length} projects</span>
          </figcaption>
          <ul className="mt-5 space-y-3.5">
            {usage.map((u) => (
              <li key={u.label}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="text-fg-2">{u.label}</span>
                  <span className="font-mono text-[12px] tabular-nums">{u.count}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg-sunk">
                  <div className="bar-grow h-full rounded-full bg-accent" style={{ width: `${(u.count / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}
