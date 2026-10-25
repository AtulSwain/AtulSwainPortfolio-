"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { asset, cn } from "@/lib/utils";

// Deterministic star field (same on server and client).
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}
const rand = rng(42);
const stars = Array.from({ length: 90 }, () => ({
  x: rand() * 800,
  y: rand() * 460,
  r: 0.4 + rand() * 1.1,
  t: 2.5 + rand() * 4,
  d: rand() * 4,
  tw: rand() > 0.55,
}));

/** Layer that shifts with the pointer by `depth` pixels. */
const layer = (depth: number): React.CSSProperties => ({
  transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth * 0.6}px), 0)`,
  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform",
});

/**
 * The hero artwork: a lone figure under a beam of light, a dark planet rising
 * behind the ridges. Drawn in SVG so it is sharp at every size and costs no
 * image download. Put your own artwork at public/images/hero/hero.webp to replace it.
 */
export function HeroScene({ image, className }: { image?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={cn("pointer-events-none absolute inset-y-0 overflow-hidden", className)} aria-hidden>
      {image ? (
        <div className="absolute -inset-6" style={layer(-10)}>
          <Image src={asset(image)} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
      ) : (
        <svg viewBox="0 0 800 700" preserveAspectRatio="xMaxYMax slice" className="fade-in absolute inset-0 size-full">
          <defs>
            <radialGradient id="sky" cx="58%" cy="10%" r="80%">
              <stop offset="0%" stopColor="#1b1b1c" />
              <stop offset="60%" stopColor="#0a0a0b" />
              <stop offset="100%" stopColor="#070707" />
            </radialGradient>
            <radialGradient id="planet" cx="35%" cy="25%" r="85%">
              <stop offset="0%" stopColor="#2a2a2b" />
              <stop offset="45%" stopColor="#111112" />
              <stop offset="100%" stopColor="#060606" />
            </radialGradient>
            <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#fff" stopOpacity="0.15" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.05" />
              <stop offset="35%" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#0d0d0d" />
            </linearGradient>
            <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c1c1c" />
              <stop offset="100%" stopColor="#090909" />
            </linearGradient>
            <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#262626" />
              <stop offset="18%" stopColor="#111" />
              <stop offset="100%" stopColor="#060606" />
            </linearGradient>
            <filter id="blur-lg" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <filter id="blur-sm" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <rect width="800" height="700" fill="url(#sky)" />

          {/* Stars */}
          <g style={layer(4)}>
            {stars.map((s, i) => (
              <circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="#fff"
                opacity={s.tw ? undefined : 0.35}
                className={s.tw ? "twinkle" : undefined}
                style={s.tw ? ({ "--t": `${s.t}s`, "--d": `${s.d}s` } as React.CSSProperties) : undefined}
              />
            ))}
          </g>

          {/* Planet */}
          <g style={layer(8)}>
            <g className="drift">
              <circle cx="560" cy="330" r="255" fill="#fff" opacity="0.05" filter="url(#blur-lg)" />
              <circle cx="560" cy="330" r="250" fill="url(#planet)" />
              <circle cx="560" cy="330" r="250" fill="none" stroke="url(#rim)" strokeWidth="1.4" />
            </g>
          </g>

          {/* Far ridge */}
          <g style={layer(12)}>
            <path
              d="M0 520 L50 478 L95 500 L150 438 L205 486 L255 452 L300 478 L350 430 L395 462 L440 425 L470 448 L520 410 L575 455 L630 405 L690 450 L740 418 L800 445 L800 700 L0 700 Z"
              fill="url(#far)"
              opacity="0.9"
            />
          </g>

          {/* Mid ridge */}
          <g style={layer(18)}>
            <path
              d="M0 600 L40 556 L85 578 L140 515 L190 560 L240 532 L290 575 L345 540 L380 562 L800 700 L0 700 Z"
              fill="url(#mid)"
            />
            <path d="M560 700 L620 560 L660 585 L720 520 L770 560 L800 540 L800 700 Z" fill="url(#mid)" />
          </g>

          {/* Beam */}
          <g className="beam">
            <polygon points="452,0 488,0 520,580 420,580" fill="#fff" opacity="0.10" filter="url(#blur-lg)" />
            <polygon points="466,0 474,0 482,566 458,566" fill="url(#beam)" filter="url(#blur-sm)" />
            <polygon points="468.5,0 471.5,0 474,566 466,566" fill="url(#beam)" />
          </g>

          {/* Foreground rock + figure */}
          <g style={layer(26)}>
            <ellipse cx="470" cy="571" rx="46" ry="7" fill="#fff" opacity="0.28" filter="url(#blur-sm)" />
            <path
              d="M300 700 L345 645 L385 618 L420 592 L446 574 L498 572 L522 584 L560 604 L600 596 L648 624 L700 612 L760 642 L800 632 L800 700 Z"
              fill="url(#rock)"
            />
            <path d="M446 574 L498 572 L522 584" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1" />
            {/* Figure — a lone traveller in a long coat, lit from above */}
            <g fill="#040404" stroke="#f0f0f0" strokeOpacity="0.32" strokeWidth="0.7" strokeLinejoin="round">
              <path d="M470 476.5 C 464.5 476.5 461.5 481 461.8 486.5 C 462 491.5 465.5 495.5 470 495.5 C 474.5 495.5 478 491.5 478.2 486.5 C 478.5 481 475.5 476.5 470 476.5 Z" />
              <path d="M462.5 497 C 466 495 474 495 477.5 497 L 484.5 501.5 C 486.5 503 487.6 505.5 487.8 508.5 L 489.2 532 C 489.3 534.2 487.4 535.6 485.6 534.6 L 483.4 512 L 483.6 549 L 456.4 549 L 456.6 512 L 454.4 534.6 C 452.6 535.6 450.7 534.2 450.8 532 L 452.2 508.5 C 452.4 505.5 453.5 503 455.5 501.5 Z" />
              <path d="M460.2 548 L 458.6 569.5 L 457 571.6 L 465.8 571.6 L 466.6 569 L 468.6 552 L 471.4 552 L 473.4 569 L 474.2 571.6 L 483 571.6 L 481.4 569.5 L 479.8 548 Z" />
            </g>
            <path d="M465 478 C 468 475.5 472 475.5 475 478" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" />
          </g>

          {/* Mist */}
          <rect x="0" y="540" width="800" height="160" fill="url(#mid)" opacity="0.35" />
        </svg>
      )}

      {/* Blend into the page: fade bottom and left edges */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bg to-transparent" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-bg via-bg/70 to-transparent lg:w-1/3 lg:via-bg/50" />
    </div>
  );
}
