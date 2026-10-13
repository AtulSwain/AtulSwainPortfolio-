"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { profile } from "@/content/profile";
import { sections } from "@/lib/nav";
import { asset, cn } from "@/lib/utils";
import { LocalTime } from "../ui/clock";
import { ThemeControls } from "../ui/theme-controls";
import { openPalette } from "./command-palette";

/** Tracks which home-page section is in view. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>("index");
  useEffect(() => {
    if (!enabled) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

function Avatar({ photo, size = 44 }: { photo?: string; size?: number }) {
  return (
    <span
      className="relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-bg-sunk ring-1 ring-line"
      style={{ width: size, height: size }}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(photo)} alt="" className="size-full object-cover" width={size} height={size} />
      ) : (
        <span className="display text-[18px] italic text-fg">AS</span>
      )}
    </span>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);
  const current = (id: string) => (onHome ? active === id : id === "work" && pathname.startsWith("/work"));

  return (
    <ul className="space-y-0.5">
      {sections.map((s, i) => (
        <li key={s.id}>
          <Link
            href={s.href}
            onClick={onNavigate}
            aria-current={current(s.id) ? "true" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-lg py-1.5 pr-2 text-[14.5px] transition-colors",
              current(s.id) ? "text-fg" : "text-fg-3 hover:text-fg",
            )}
          >
            <span className="w-5 font-mono text-[10.5px] text-fg-3">{String(i).padStart(2, "0")}</span>
            <span
              className={cn(
                "h-px bg-current transition-all duration-500 ease-out-expo",
                current(s.id) ? "w-6 bg-accent" : "w-2 group-hover:w-4",
              )}
            />
            {s.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SearchButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openPalette}
      className={cn(
        "flex h-10 items-center gap-2.5 rounded-xl border border-line bg-bg px-3 text-sm text-fg-3 transition-colors hover:border-fg-3 hover:text-fg",
        className,
      )}
    >
      <Search size={15} />
      <span className="flex-1 text-left">Search or jump to…</span>
      <kbd className="kbd">⌘K</kbd>
    </button>
  );
}

function Status() {
  if (!profile.availability) return null;
  return (
    <p className="flex items-center gap-2 text-[13px] text-fg-2">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-50 motion-reduce:hidden" />
        <span className="relative size-2 rounded-full bg-emerald-500" />
      </span>
      {profile.availability}
    </p>
  );
}

export function Sidebar({ photo }: { photo?: string }) {
  return (
    <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line px-7 py-8 lg:flex">
      <Link href="/" className="group flex items-center gap-3">
        <Avatar photo={photo} />
        <span>
          <span className="display block text-[26px] leading-none">{profile.name}</span>
          <span className="mt-1 block text-[12.5px] text-fg-3">{profile.shortRole}</span>
        </span>
      </Link>

      <div className="mt-6">
        <Status />
      </div>

      <SearchButton className="mt-8" />

      <nav aria-label="Sections" className="mt-8">
        <NavList />
      </nav>

      <div className="mt-auto space-y-5">
        <div className="flex items-baseline justify-between border-t border-line pt-5">
          <span className="eyebrow">{profile.location}</span>
          <LocalTime timeZone={profile.timeZone} className="font-mono text-[12px] text-fg-2" />
        </div>
        <div className="flex items-center justify-between">
          <ThemeControls />
          <div className="flex gap-3 text-[13px] text-fg-2">
            {profile.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-fg">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileBar({ photo }: { photo?: string }) {
  const sheet = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    sheet.current?.close();
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur-xl lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <Avatar photo={photo} size={34} />
          <span className="display text-[22px] leading-none">{profile.name}</span>
        </Link>
        <button
          type="button"
          onClick={openPalette}
          aria-label="Search"
          className="ml-auto grid size-10 place-items-center rounded-full border border-line"
        >
          <Search size={16} />
        </button>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => sheet.current?.showModal()}
          className="grid size-10 place-items-center rounded-full border border-line"
        >
          <Menu size={16} />
        </button>
      </header>

      <dialog
        ref={sheet}
        aria-label="Menu"
        onToggle={(e) => setOpen((e.target as HTMLDialogElement).open)}
        onClick={(e) => e.target === sheet.current && sheet.current?.close()}
        className="mt-auto mb-0 w-full max-w-none rounded-t-3xl border border-line bg-bg-elev p-0 text-fg backdrop:bg-transparent"
      >
        <div className="px-6 pt-5 pb-8">
          <div className="flex items-center justify-between">
            <Status />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => sheet.current?.close()}
              className="grid size-9 place-items-center rounded-full border border-line"
            >
              <X size={16} />
            </button>
          </div>
          <nav aria-label="Sections" className="mt-6 [&_a]:py-2.5 [&_a]:text-lg">
            <NavList onNavigate={() => sheet.current?.close()} />
          </nav>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
            <ThemeControls />
            <LocalTime timeZone={profile.timeZone} className="font-mono text-[12px] text-fg-2" />
          </div>
        </div>
      </dialog>
    </>
  );
}
