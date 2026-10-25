import Link from "next/link";
import { Activity, ArrowRight, Box, CalendarDays, Crosshair, NotebookPen } from "lucide-react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { HeroScene } from "./hero-scene";
import { SocialIcon } from "../ui/social-icon";

/**
 * "~Turning~ Ideas / into ~Digital~ / Reality." → three lines; ~marked~ words are dimmed.
 * Each word slides up in turn.
 */
function Headline({ text }: { text: string }) {
  const lines = text.split(" / ");
  let n = 0;
  return (
    <h1 className="display text-[clamp(46px,6.6vw,96px)] leading-[0.98]" aria-label={text.replaceAll("~", "").replaceAll(" / ", " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((w, wi) => {
            const delay = 150 + n++ * 90;
            return (
              <span key={wi}>
                {wi > 0 && " "}
                <span className="word">
                  <span className={w.startsWith("~") ? "dim" : "silver"} style={{ animationDelay: `${delay}ms` }}>
                    {w.replaceAll("~", "")}
                  </span>
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

const statIcons = [Box, NotebookPen, CalendarDays, Activity];

export function Hero({ image }: { image?: string }) {
  const github = profile.socials.find((s) => s.label === "GitHub");
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <HeroScene image={image} className="-right-[300px] left-0 -z-10 opacity-60 lg:right-0 lg:left-[30%] lg:opacity-100" />

      <div className="container-page relative flex min-h-[min(100svh,880px)] flex-col justify-center pt-28 pb-10 lg:pt-32">
        <div className="max-w-[640px]">
          <p className="eyebrow enter flex items-center gap-2.5">
            <span className="live-dot size-1.5 rounded-full bg-accent" />
            {profile.tagline}
          </p>
          <div className="mt-6">
            <Headline text={profile.headline} />
          </div>
          <p className="enter enter-3 mt-7 max-w-[470px] text-[16.5px] leading-relaxed text-fg-2">{profile.intro}</p>
          <div className="enter enter-4 mt-9 flex flex-wrap gap-3">
            <Link href="/#projects" className="btn btn-light group">
              Explore My Work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            {github && (
              <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <SocialIcon label="GitHub" size={15} /> GitHub Profile
              </a>
            )}
          </div>
          <div className="enter enter-5 mt-10 flex max-w-[420px] items-start gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line-strong text-fg-2">
              <Crosshair size={17} strokeWidth={1.6} />
            </span>
            <div>
              <p className="eyebrow">Currently focused on</p>
              <p className="mt-1 text-[13.5px] leading-snug text-fg-2">{profile.focus}</p>
            </div>
          </div>
        </div>

        {/* Quote over the artwork */}
        <figure className="fade-in absolute top-[30%] right-[6%] hidden max-w-[200px] lg:block">
          <blockquote className="text-[15px] leading-snug text-fg/85">
            <span className="mr-1 font-display text-xl text-fg-3">“</span>
            {profile.heroQuote}
          </blockquote>
          <span className="mt-4 block h-px w-8 bg-fg-3" />
        </figure>

        {/* Scroll cue */}
        <a
          href="#projects"
          aria-label="Scroll to projects"
          className="absolute top-1/2 right-4 hidden -translate-y-1/2 flex-col items-center gap-4 text-fg-3 transition-colors hover:text-fg xl:flex"
        >
          <span className="relative grid size-11 place-items-center rounded-full border border-line-strong">
            <span className="scroll-cue size-1.5 rounded-full bg-fg" />
            <span className="spin-slow absolute inset-[-5px] rounded-full border border-dashed border-line" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] [writing-mode:vertical-rl]">SCROLL</span>
        </a>
      </div>

      {/* Stats */}
      <div className="container-page relative pb-6">
        <dl className="panel enter enter-5 grid grid-cols-2 gap-y-6 px-6 py-6 backdrop-blur md:grid-cols-4 md:px-10">
          {profile.stats.map((s, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <div key={s.label} className={cn("flex items-center gap-4 md:justify-center", i > 0 && "md:border-l md:border-line")}>
                <Icon size={24} strokeWidth={1.4} className="shrink-0 text-fg-2" />
                <div>
                  <dd className="font-display text-[22px] font-semibold tracking-tight">{s.value}</dd>
                  <dt className="text-[12.5px] text-fg-3">{s.label}</dt>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
