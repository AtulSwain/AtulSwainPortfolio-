"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ui/theme-toggle";
import { LocalTime } from "./ui/local-time";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/work/", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#journey", label: "Journey" },
  { href: "/#data", label: "Data" },
  { href: "/#contact", label: "Contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    setHidden(y > 240 && y > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.5, ease }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
          scrolled && !open
            ? "border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-16 items-center gap-6">
          <Link href="/" className="group mr-auto flex items-baseline gap-2" aria-label={`${profile.name} — home`}>
            <span className="display text-[22px] leading-none">{profile.name}</span>
            <span className="hidden font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase transition-colors group-hover:text-accent sm:inline">
              Portfolio
            </span>
          </Link>

          <LocalTime
            timeZone={profile.timeZone}
            className="hidden font-mono text-[11px] tracking-[0.12em] text-fg-3 uppercase lg:inline"
          />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = item.href === "/work/" && pathname.startsWith("/work");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-[13.5px] transition-colors hover:text-fg",
                        active ? "text-fg" : "text-fg-2",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ThemeToggle />

          <button
            type="button"
            className="relative grid size-9 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={cn("absolute h-px w-4 bg-fg transition-transform duration-500", open ? "rotate-45" : "-translate-y-[3px]")} />
            <span className={cn("absolute h-px w-4 bg-fg transition-transform duration-500", open ? "-rotate-45" : "translate-y-[3px]")} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-bg pt-24 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="container-x flex-1">
              <ul>
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-4"
                      >
                        <span className="display text-5xl">{item.label}</span>
                        <span className="font-mono text-xs text-fg-3">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="container-x flex items-center justify-between pb-8 font-mono text-[11px] tracking-[0.12em] text-fg-3 uppercase">
              <span>{profile.location}</span>
              <LocalTime timeZone={profile.timeZone} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
