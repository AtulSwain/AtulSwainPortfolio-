"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, AtSign, Copy, FolderOpen, ExternalLink, Hash, Search, SunMoon } from "lucide-react";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { sections } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { copyText } from "../ui/toast";

type Item = {
  id: string;
  group: "Go to" | "Projects" | "Actions";
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

export const openPalette = () => window.dispatchEvent(new Event("app:palette"));

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

export function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const close = useCallback(() => dialog.current?.close(), []);
  const open = useCallback(() => {
    if (!dialog.current || dialog.current.open) return;
    setQuery("");
    setActive(0);
    dialog.current.showModal();
    requestAnimationFrame(() => input.current?.focus());
  }, []);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      ...sections.map((s) => ({
        id: `s-${s.id}`,
        group: "Go to" as const,
        label: s.label,
        icon: <Hash size={15} />,
        run: go(s.href),
      })),
      { id: "s-top", group: "Go to", label: "Top of page", icon: <Hash size={15} />, run: go("/#top") },
      { id: "s-all", group: "Go to", label: "All work", hint: "/work", icon: <FolderOpen size={15} />, run: go("/work/") },
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: "Projects" as const,
        label: p.title,
        hint: p.category,
        icon: <ArrowRight size={15} />,
        run: go(`/work/${p.slug}/`),
      })),
      {
        id: "a-copy",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: <Copy size={15} />,
        run: () => copyText(profile.email, "Email copied"),
      },
      {
        id: "a-mail",
        group: "Actions",
        label: "Send an email",
        icon: <AtSign size={15} />,
        run: () => (window.location.href = `mailto:${profile.email}`),
      },
      {
        id: "a-theme",
        group: "Actions",
        label: "Toggle light / dark theme",
        icon: <SunMoon size={15} />,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      ...profile.socials.map((s) => ({
        id: `a-${s.label}`,
        group: "Actions" as const,
        label: `Open ${s.label}`,
        hint: s.handle,
        icon: <ExternalLink size={15} />,
        run: () => window.open(s.href, "_blank", "noopener"),
      })),
    ];
  }, [router, resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    const id = filtered[active]?.id;
    if (id) document.getElementById(`pi-${id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, filtered]);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialog.current?.open) close();
        else open();
      } else if (e.key === "/" && !isTyping(e.target) && !dialog.current?.open) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("app:palette", open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("app:palette", open);
    };
  }, [open, close]);

  const run = (item?: Item) => {
    if (!item) return;
    close();
    item.run();
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialog}
      aria-label="Command palette"
      onClick={(e) => e.target === dialog.current && close()}
      className="m-auto mt-[12vh] w-[min(620px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-line bg-bg-elev p-0 text-fg shadow-2xl backdrop:bg-transparent"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search size={16} className="text-fg-3" />
        <input
          ref={input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, filtered.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              run(filtered[active]);
            }
          }}
          placeholder="Search projects, sections, actions…"
          aria-label="Search"
          aria-controls="palette-list"
          aria-activedescendant={filtered[active] ? `pi-${filtered[active].id}` : undefined}
          className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-fg-3"
        />
        <kbd className="kbd">esc</kbd>
      </div>

      <ul id="palette-list" role="listbox" className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
        {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-fg-3">Nothing matches “{query}”.</li>}
        {filtered.map((item, i) => {
          const header = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          return (
            <li key={item.id} role="presentation">
              {header && <p className="eyebrow px-3 pt-3 pb-1.5">{header}</p>}
              <button
                id={`pi-${item.id}`}
                role="option"
                aria-selected={i === active}
                type="button"
                onMouseMove={() => setActive(i)}
                onClick={() => run(item)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14.5px]",
                  i === active ? "bg-bg-sunk text-fg" : "text-fg-2",
                )}
              >
                <span className={cn("text-fg-3", i === active && "text-accent")}>{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.hint && <span className="truncate font-mono text-[11px] text-fg-3">{item.hint}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[11.5px] text-fg-3">
        <span className="flex items-center gap-1.5"><kbd className="kbd">↑</kbd><kbd className="kbd">↓</kbd> navigate</span>
        <span className="flex items-center gap-1.5"><kbd className="kbd">↵</kbd> open</span>
        <span className="ml-auto flex items-center gap-1.5"><kbd className="kbd">/</kbd> anywhere to search</span>
      </div>
    </dialog>
  );
}
