"use client";

import { useEffect, useState } from "react";

export function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(now)
    : "--:--";
  const zone = now
    ? new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" })
        .formatToParts(now)
        .find((p) => p.type === "timeZoneName")?.value
    : "";

  return (
    <span className={className} suppressHydrationWarning>
      <span className="tabular-nums">{time}</span> {zone === "GMT+5:30" ? "IST" : zone}
    </span>
  );
}
