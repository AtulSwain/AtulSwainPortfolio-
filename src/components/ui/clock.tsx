"use client";

import { useSyncExternalStore } from "react";

// One shared ticking clock for every component that shows the time.
const listeners = new Set<() => void>();
let now = 0;
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 20_000);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/** Current timestamp on the client, 0 during prerender. */
export const useNow = () =>
  useSyncExternalStore(
    subscribe,
    () => (now ||= Date.now()),
    () => 0,
  );

function parts(ts: number, timeZone: string) {
  const d = new Date(ts);
  const hm = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone })
    .formatToParts(d)
    .reduce<Record<string, string>>((acc, p) => ((acc[p.type] = p.value), acc), {});
  const hour = Number(hm.hour) % 24;
  const minute = Number(hm.minute);
  return { label: `${hm.hour}:${hm.minute}`, hour, minute };
}

export function LocalTime({ timeZone, suffix = "IST", className }: { timeZone: string; suffix?: string; className?: string }) {
  const ts = useNow();
  return (
    <span className={className}>
      <span className="tabular-nums">{ts ? parts(ts, timeZone).label : "--:--"}</span>
      {suffix ? ` ${suffix}` : ""}
    </span>
  );
}

const phase = (h: number) =>
  h < 5 ? "Late night" : h < 12 ? "Morning" : h < 17 ? "Afternoon" : h < 21 ? "Evening" : "Night";

/** A 24-hour strip with a marker at the current local time. */
export function DayBar({ timeZone }: { timeZone: string }) {
  const ts = useNow();
  const p = ts ? parts(ts, timeZone) : null;
  const pct = p ? ((p.hour * 60 + p.minute) / 1440) * 100 : 50;
  const awake = p ? p.hour >= 8 && p.hour < 23 : true;

  return (
    <div>
      <div className="relative h-8 overflow-hidden rounded-full border border-line bg-[linear-gradient(90deg,var(--bg-sunk)_0%,var(--bg-sunk)_25%,color-mix(in_srgb,var(--accent)_14%,var(--bg))_45%,color-mix(in_srgb,var(--accent)_14%,var(--bg))_70%,var(--bg-sunk)_90%)]">
        {[6, 12, 18].map((h) => (
          <span key={h} className="absolute inset-y-2 w-px bg-line" style={{ left: `${(h / 24) * 100}%` }} />
        ))}
        {p && (
          <span
            className="pulse absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
            style={{ left: `${pct}%` }}
          />
        )}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-fg-3">
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>
      <p className="mt-3 text-sm text-fg-2">
        {p ? (
          <>
            {phase(p.hour)} in Mumbai — {awake ? "probably at my desk." : "likely asleep, but I’ll reply soon."}
          </>
        ) : (
          "Mumbai, India"
        )}
      </p>
    </div>
  );
}
