"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** ← / → move between case studies. */
export function PagerKeys({ prev, next }: { prev: string; next: string }) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch(prev);
    router.prefetch(next);
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) || document.querySelector("dialog[open]")) return;
      if (e.key === "ArrowLeft") router.push(prev);
      if (e.key === "ArrowRight") router.push(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prev, next]);
  return null;
}
