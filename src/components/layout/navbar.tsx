"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { profile } from "@/content/profile";
import { sections } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ui/theme-toggle";
import { openPalette } from "./command-palette";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return setActive(null);
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // The last section (in page order) that crosses the middle band wins; none → nothing highlighted.
        setActive(sections.map((s) => s.id).filter((id) => visible.has(id)).at(-1) ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);
  const sheet = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => sheet.current?.close(), [pathname]);

  const isCurrent = (id: string) => (onHome ? active === id : id === "work" && pathname.startsWith("/work"));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex h-14 max-w-[880px] items-center gap-1 rounded-full border px-2 transition-[background-color,border-color,box-shadow] duration-300",
            scrolled
              ? "border-line bg-bg-elev/75 shadow-[var(--shadow)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 rounded-full py-1.5 pr-3 pl-1.5" aria-label={`${profile.name} — home`}>
            <span className="grid size-8 place-items-center rounded-full bg-fg font-display text-[13px] font-bold text-bg">
              AS
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:block">{profile.name}</span>
          </Link>

          <ul className="ml-auto hidden items-center md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  aria-current={isCurrent(s.id) ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-[13.5px] transition-colors",
                    isCurrent(s.id) ? "bg-bg-sunk text-fg" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1 md:ml-2">
            <button
              type="button"
              onClick={openPalette}
              className="hidden h-9 items-center gap-2 rounded-full border border-line px-3 text-[12.5px] text-fg-3 transition-colors hover:border-line-strong hover:text-fg sm:flex"
            >
              <Search size={14} />
              <kbd className="kbd">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={openPalette}
              aria-label="Search"
              className="grid size-9 place-items-center rounded-full text-fg-2 hover:bg-bg-sunk sm:hidden"
            >
              <Search size={16} />
            </button>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => sheet.current?.showModal()}
              className="grid size-9 place-items-center rounded-full text-fg-2 hover:bg-bg-sunk md:hidden"
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
        className="mt-auto mb-0 w-full max-w-none rounded-t-[28px] border border-line bg-bg-elev p-0 text-fg backdrop:bg-black/40"
      >
        <div className="px-6 pt-4 pb-10">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line-strong" />
          <div className="flex items-center justify-between">
            <span className="eyebrow">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => sheet.current?.close()}
              className="grid size-9 place-items-center rounded-full border border-line"
            >
              <X size={16} />
            </button>
          </div>
          <ul className="mt-4">
            {sections.map((s, i) => (
              <li key={s.id} className="border-b border-line last:border-0">
                <Link
                  href={s.href}
                  onClick={() => sheet.current?.close()}
                  className="flex items-center justify-between py-3.5"
                >
                  <span className="display text-[28px]">{s.label}</span>
                  <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
