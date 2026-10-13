"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/profile";
import { asset } from "@/lib/utils";
import { MaskText, Reveal } from "../ui/reveal";
import { Magnetic } from "../ui/magnetic";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-28 md:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/2 left-1/2 aspect-square w-[120%] -translate-x-1/2 rounded-full opacity-60 blur-3xl md:w-[70%]"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 18%, transparent), transparent)" }}
      />
      <div className="container-x relative">
        <Reveal className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-accent">06</span>
          <span className="h-px w-8 bg-line" />
          <span className="eyebrow">Contact</span>
        </Reveal>

        <h2 className="display mt-10 text-[clamp(56px,12vw,200px)] leading-[0.86] tracking-[-0.04em]">
          <MaskText text="Let’s build" />
          <br />
          <em className="text-accent">
            <MaskText text="something good." delay={0.15} />
          </em>
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="max-w-lg text-lg leading-relaxed text-fg-2">
              Have a project, a role, or a dataset with a question in it? I’d love to hear about it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-fg pr-2 pl-7 text-[15px] font-medium text-bg"
                >
                  {profile.email}
                  <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-14 items-center gap-2 rounded-full border border-line px-6 text-sm transition-colors hover:border-fg"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy email"}
              </button>
              {profile.resume && (
                <a
                  href={asset(profile.resume)}
                  className="inline-flex h-14 items-center rounded-full border border-line px-6 text-sm transition-colors hover:border-fg"
                >
                  Résumé
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <ul className="divide-y divide-line border-y border-line">
              {profile.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4"
                  >
                    <span className="display text-2xl">{s.label}</span>
                    <span className="flex items-center gap-2 text-sm text-fg-3 transition-colors group-hover:text-fg">
                      {s.handle}
                      <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
