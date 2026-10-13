"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { journey } from "@/content/profile";
import { getProject } from "@/content/projects";
import { cn, pad } from "@/lib/utils";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="journey" className="scroll-mt-20 bg-bg-sunk/60 py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Journey"
          title="How I got here"
          intro="Every project taught me something the last one couldn’t. Here’s the path, in order."
        />

        <ol ref={ref} className="relative mt-20 md:mt-28">
          {/* Track + progress */}
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-[calc(25%+7px)]" aria-hidden />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent md:left-[calc(25%+7px)]"
            aria-hidden
          />

          {journey.map((entry, i) => (
            <li key={i} className="relative grid gap-3 pb-16 pl-10 last:pb-0 md:grid-cols-4 md:gap-0 md:pl-0">
              <Reveal className="md:pr-10 md:text-right">
                <time className="font-mono text-[12px] tracking-[0.1em] text-fg-3 uppercase">{entry.date}</time>
              </Reveal>

              <span
                className={cn(
                  "absolute top-[3px] left-0 size-[15px] rounded-full border bg-bg md:left-[25%]",
                  entry.current ? "border-accent" : "border-fg-3",
                )}
                aria-hidden
              >
                <span className={cn("absolute inset-[3px] rounded-full", entry.current ? "animate-pulse bg-accent" : "bg-fg-3/40")} />
              </span>

              <Reveal delay={0.05} className="md:col-span-3 md:pl-14">
                <p className="font-mono text-[11px] text-accent">Chapter {pad(i + 1)}</p>
                <h3 className="display mt-2 text-[clamp(28px,3.4vw,44px)] leading-[1.05]">{entry.title}</h3>
                <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-fg-2">{entry.body}</p>
                {entry.projects && entry.projects.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {entry.projects.map((slug) => {
                      const p = getProject(slug);
                      if (!p) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/work/${slug}/`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-3 py-1 text-[13px] text-fg-2 transition-colors hover:border-fg hover:text-fg"
                          >
                            {p.title}
                            <span aria-hidden className="text-fg-3">↗</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
