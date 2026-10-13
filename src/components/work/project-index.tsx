"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import type { Project } from "@/content/types";
import { ProjectCover } from "../ui/project-cover";

type Row = { project: Project; cover?: string };

/** A typographic list of projects. On desktop, a preview follows the cursor. */
export function ProjectIndex({ rows, startIndex = 1 }: { rows: Row[]; startIndex?: number }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 28, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 28, mass: 0.5 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-line">
        {rows.map(({ project }, i) => (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/work/${project.slug}/`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-6 transition-colors md:grid-cols-12 md:py-8"
            >
              <span className="font-mono text-[11px] text-fg-3 md:col-span-1">
                {String(startIndex + i).padStart(2, "0")}
              </span>
              <span className="display text-[clamp(28px,4.2vw,60px)] leading-none transition-[transform,color] duration-700 ease-out-expo group-hover:translate-x-3 group-hover:text-accent md:col-span-6">
                {project.title}
              </span>
              <span className="hidden text-[15px] text-fg-2 md:col-span-3 md:block">{project.tagline}</span>
              <span className="font-mono text-[11px] tracking-[0.1em] text-fg-3 uppercase md:col-span-2 md:text-right">
                {project.category} · {project.year}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden w-[340px] md:block"
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={rows[active].project.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCover
                    project={rows[active].project}
                    src={rows[active].cover}
                    className="aspect-[16/11]"
                    sizes="340px"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
