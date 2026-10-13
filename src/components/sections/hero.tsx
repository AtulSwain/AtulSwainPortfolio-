"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { Portrait } from "../ui/portrait";
import { MaskText } from "../ui/reveal";
import { Magnetic } from "../ui/magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

function Letters({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <span className={className} aria-hidden>
      {word.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.3, ease, delay: delay + i * 0.045 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-block text-fg"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero({ photo }: { photo?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [-3, 4]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="container-x">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <p className="eyebrow">
            {profile.location} <span className="mx-2 text-line">/</span> Portfolio {new Date().getFullYear()}
          </p>
          {profile.availability && (
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev/60 px-3 py-1.5 text-[12px] text-fg-2 backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </p>
          )}
        </motion.div>

        {/* Name + portrait */}
        <div className="relative mt-10 md:mt-14">
          <motion.h1
            style={{ y: nameY }}
            className="display relative z-10 text-[clamp(84px,19vw,300px)] leading-[0.82] tracking-[-0.045em]"
            aria-label={profile.name}
          >
            <Letters word={first} delay={0.25} className="block" />
            <Letters word={last} delay={0.45} className="block pl-[0.62em] italic text-fg-2 md:pl-[1.15em]" />
          </motion.h1>

          <motion.div
            style={{ y: portraitY, rotate: portraitRotate }}
            className="absolute top-[4%] right-0 z-0 w-[34%] max-w-[340px] sm:w-[28%] md:top-[-6%] md:right-[4%] md:w-[22%]"
          >
            <motion.div
              initial={{ scale: 0.92, clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.6, ease, delay: 0.6 }}
            >
              <Portrait src={photo} name={profile.name} priority />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1.6 }}
              className="absolute -bottom-4 -left-10 hidden rounded-full border border-line bg-bg-elev px-3.5 py-2 font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-fg-2 uppercase shadow-sm md:block"
            >
              Building <span className="text-fg-3">→</span> <RotatingWord words={profile.roles} />
            </motion.div>
          </motion.div>
        </div>

        {/* Statement */}
        <motion.div style={{ opacity: fade }} className="mt-14 grid gap-10 border-t border-line pt-10 md:mt-20 md:grid-cols-12">
          <h2 className="display text-[clamp(30px,3.6vw,52px)] leading-[1.05] md:col-span-7">
            <MaskText text={profile.headline.lead} immediate delay={0.9} />{" "}
            <em className="text-accent">
              <MaskText text={profile.headline.emphasis} immediate delay={1.0} />
            </em>{" "}
            <MaskText text={profile.headline.tail} immediate delay={1.15} />
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.3 }}
            className="md:col-span-4 md:col-start-9"
          >
            <p className="text-[17px] leading-relaxed text-fg-2">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="/work/"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-transform active:scale-[0.97]"
                >
                  View my work
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                </Link>
              </Magnetic>
              <Link
                href="/#contact"
                className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-medium transition-colors hover:border-fg"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-16 hidden items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-fg-3 uppercase transition-colors hover:text-fg md:inline-flex"
        >
          <span className="grid size-9 place-items-center rounded-full border border-line">
            <motion.span animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <ArrowDownRight size={14} />
            </motion.span>
          </span>
          Scroll to explore
        </motion.a>
      </div>
    </section>
  );
}
