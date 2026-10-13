"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const accents = [
  { id: "terracotta", label: "Terracotta", swatch: "#b4532a" },
  { id: "cobalt", label: "Cobalt", swatch: "#2f55c7" },
  { id: "forest", label: "Forest", swatch: "#2f6b4a" },
  { id: "plum", label: "Plum", swatch: "#7a3b78" },
] as const;

export type AccentId = (typeof accents)[number]["id"];

export function setAccent(id: AccentId) {
  const root = document.documentElement;
  if (id === "terracotta") delete root.dataset.accent;
  else root.dataset.accent = id;
  try {
    localStorage.setItem("accent", id);
  } catch {}
  window.dispatchEvent(new Event("app:accent"));
}

function useAccent() {
  const [accent, set] = useState<AccentId>("terracotta");
  useEffect(() => {
    const read = () => set((document.documentElement.dataset.accent as AccentId) ?? "terracotta");
    read();
    window.addEventListener("app:accent", read);
    return () => window.removeEventListener("app:accent", read);
  }, []);
  return accent;
}

/** Runs before paint (inlined in <head>) so the chosen accent never flashes. */
export const accentScript = `try{var a=localStorage.getItem("accent");if(a&&a!=="terracotta")document.documentElement.dataset.accent=a}catch(e){}`;

export function ThemeControls({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const accent = useAccent();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        onClick={() => setTheme(dark ? "light" : "dark")}
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        className="grid size-8 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-fg hover:text-fg"
      >
        {dark ? <Moon size={14} strokeWidth={1.7} /> : <Sun size={14} strokeWidth={1.7} />}
      </button>
      <div role="radiogroup" aria-label="Accent colour" className="flex items-center gap-1.5">
        {accents.map((a) => (
          <button
            key={a.id}
            type="button"
            role="radio"
            aria-checked={accent === a.id}
            aria-label={a.label}
            title={a.label}
            onClick={() => setAccent(a.id)}
            className={cn(
              "size-4 rounded-full ring-offset-2 ring-offset-bg transition-transform hover:scale-110",
              accent === a.id && "ring-1 ring-fg",
            )}
            style={{ background: a.swatch }}
          />
        ))}
      </div>
    </div>
  );
}
