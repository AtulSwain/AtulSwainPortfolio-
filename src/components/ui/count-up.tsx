"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts numeric values up when they scroll into view. Non-numeric values render as-is. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const hasNumber = Boolean(match);
  const isYear = target >= 1900 && target <= 2100;
  const [n, setN] = useState(match && !isYear ? 0 : target);

  useEffect(() => {
    if (!inView || !hasNumber || isYear) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, isYear, hasNumber]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {match[1]}
      <span className="tabular-nums">{n}</span>
      {match[3]}
    </span>
  );
}
