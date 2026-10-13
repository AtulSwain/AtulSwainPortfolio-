"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { journey } from "@/content/profile";
import { getProject } from "@/content/projects";
import { cn, pad } from "@/lib/utils";

/** The journey as a horizontal, swipeable reel of chapters. */
export function JourneyReel() {
  const track = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 1);
      setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 16), behavior: "smooth" });
  };

  return (
    <div className="mt-12">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 overflow-hidden bg-line" aria-hidden>
          <div className="h-px origin-left bg-accent transition-transform duration-200" style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }} />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous chapter"
            disabled={edges.start}
            onClick={() => step(-1)}
            className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-fg disabled:opacity-35 disabled:hover:border-line"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next chapter"
            disabled={edges.end}
            onClick={() => step(1)}
            className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-fg disabled:opacity-35 disabled:hover:border-line"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <ol
        ref={track}
        tabIndex={0}
        aria-label="Journey chapters"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto scroll-smooth px-4 sm:scroll-px-6 lg:scroll-px-12 pb-2 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
      >
        {journey.map((entry, i) => (
          <li
            key={i}
            className={cn(
              "card flex w-[min(340px,82vw)] shrink-0 snap-start flex-col p-7",
              entry.current && "border-accent bg-[color-mix(in_srgb,var(--accent)_7%,var(--bg-elev))]",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-accent">Chapter {pad(i + 1)}</span>
              <time className="font-mono text-[11px] tracking-[0.08em] text-fg-3 uppercase">{entry.date}</time>
            </div>
            <h3 className="display mt-10 text-[34px] leading-[1.02]">{entry.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{entry.body}</p>
            {entry.projects && entry.projects.length > 0 && (
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {entry.projects.map((slug) => {
                  const p = getProject(slug);
                  return p ? (
                    <li key={slug}>
                      <Link
                        href={`/work/${slug}/`}
                        className="inline-block rounded-full border border-line bg-bg px-2.5 py-1 text-[12.5px] text-fg-2 transition-colors hover:border-fg hover:text-fg"
                      >
                        {p.title} ↗
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            )}
            {entry.current && (
              <p className="mt-auto flex items-center gap-2 pt-6 text-[12.5px] text-accent">
                <span className="pulse size-2 rounded-full bg-accent" /> In progress
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
