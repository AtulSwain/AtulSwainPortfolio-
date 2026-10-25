"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { profile } from "@/content/profile";
import { sections } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { openPalette } from "./command-palette";

const primary = sections.filter((s) => s.primary);

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    if (!enabled) return;
    const ids = primary.map((s) => s.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setActive(ids.filter((id) => visible.has(id)).at(-1) ?? "top");
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${profile.name} — home`}>
      <span className="font-display text-[30px] leading-none font-bold tracking-tighter">
        A<span className="text-accent transition-colors group-hover:text-fg">.</span>
      </span>
      <span className="hidden leading-tight sm:block">
        <span className="block font-display text-[13px] font-semibold tracking-[0.14em] uppercase">{profile.name}</span>
        <span className="block font-mono text-[9.5px] tracking-[0.18em] text-fg-3 uppercase">AI & Full-stack developer</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);
  const sheet = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => sheet.current?.close(), [pathname]);

  const isCurrent = (id: string) => (onHome ? active === id : id === "projects" && pathname.startsWith("/work"));

  return (
    <>
      <div className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[2px] bg-accent" aria-hidden />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled ? "border-b border-line bg-bg/70 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-page flex h-[72px] items-center gap-6">
          <Logo />

          <ul className="mx-auto hidden items-center gap-1 lg:flex">
            {primary.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  aria-current={isCurrent(s.id) ? "true" : undefined}
                  className={cn(
                    "relative px-3.5 py-2 text-[13.5px] transition-colors duration-300",
                    isCurrent(s.id) ? "text-accent" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {s.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-all duration-300",
                      isCurrent(s.id) ? "scale-100 opacity-100" : "scale-0 opacity-0",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button
              type="button"
              onClick={openPalette}
              className="hidden h-10 items-center gap-3 rounded-[10px] border border-line-strong px-3 text-[12.5px] text-fg-3 transition-colors hover:border-fg-3 hover:text-fg sm:flex"
            >
              <Search size={15} />
              <span>Search</span>
              <kbd className="kbd">Ctrl K</kbd>
            </button>
            <button
              type="button"
              onClick={openPalette}
              aria-label="Search"
              className="grid size-10 place-items-center rounded-[10px] border border-line-strong sm:hidden"
            >
              <Search size={16} />
            </button>
            <Link href="/#contact" className="btn btn-ghost group hidden h-10 rounded-[10px] px-4 text-[13px] md:inline-flex">
              Let’s Talk <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => sheet.current?.showModal()}
              className="grid size-10 place-items-center rounded-[10px] border border-line-strong lg:hidden"
            >
              <Menu size={17} />
            </button>
          </div>
        </nav>
      </header>

      <dialog
        ref={sheet}
        aria-label="Menu"
        onClick={(e) => e.target === sheet.current && sheet.current?.close()}
        className="mt-auto mb-0 w-full max-w-none rounded-t-[24px] border border-line-strong bg-bg-elev p-0 text-fg"
      >
        <div className="px-6 pt-4 pb-10">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line-strong" />
          <div className="flex items-center justify-between">
            <span className="eyebrow">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => sheet.current?.close()}
              className="grid size-9 place-items-center rounded-full border border-line-strong"
            >
              <X size={16} />
            </button>
          </div>
          <ul className="mt-3">
            {sections.map((s, i) => (
              <li key={s.id} className="border-b border-line last:border-0">
                <Link href={s.href} onClick={() => sheet.current?.close()} className="flex items-center justify-between py-3.5">
                  <span className="font-display text-[22px] font-semibold tracking-tight">{s.label}</span>
                  <span className="font-mono text-[11px] text-fg-3">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
