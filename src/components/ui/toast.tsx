"use client";

import { useEffect, useState } from "react";

const EVENT = "app:toast";

/** Show a short message at the bottom of the screen. */
export const toast = (message: string) => window.dispatchEvent(new CustomEvent(EVENT, { detail: message }));

export function Toaster() {
  const [msg, setMsg] = useState<{ text: string; id: number } | null>(null);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      setMsg({ text: (e as CustomEvent<string>).detail, id: Date.now() });
      clearTimeout(t);
      t = setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener(EVENT, on);
    return () => {
      window.removeEventListener(EVENT, on);
      clearTimeout(t);
    };
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4">
      {msg && (
        <p key={msg.id} className="enter rounded-full bg-fg px-4 py-2.5 text-sm text-bg shadow-lg">
          {msg.text}
        </p>
      )}
    </div>
  );
}

export async function copyText(text: string, done = "Copied to clipboard") {
  try {
    await navigator.clipboard.writeText(text);
    toast(done);
  } catch {
    toast(text);
  }
}
