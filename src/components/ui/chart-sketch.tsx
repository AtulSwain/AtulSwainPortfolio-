"use client";

import { motion } from "motion/react";

const series = [62, 58, 64, 55, 60, 48, 52, 41, 44, 36, 38, 27, 30, 22, 18];
const baseline = [66, 64, 66, 62, 63, 60, 61, 58, 59, 57, 57, 55, 56, 54, 53];

const toPath = (pts: number[]) =>
  pts.map((v, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 400},${v * 2.4}`).join(" ");

/** Decorative chart that draws itself in — a placeholder visual for case studies. */
export function ChartSketch() {
  const d = toPath(series);
  const area = `${d} L400,200 L0,200 Z`;
  return (
    <svg viewBox="0 0 400 200" className="size-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="var(--line)" strokeDasharray="2 4" />
      ))}
      <motion.path
        d={area}
        fill="url(#chart-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 1 }}
      />
      <motion.path
        d={toPath(baseline)}
        fill="none"
        stroke="var(--fg-3)"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
      <motion.circle
        cx="400"
        cy={series.at(-1)! * 2.4}
        r="4.5"
        fill="var(--accent)"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2, type: "spring", stiffness: 300, damping: 15 }}
      />
    </svg>
  );
}
