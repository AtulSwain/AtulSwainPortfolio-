import Link from "next/link";
import { ArrowRight, Hammer, Lightbulb, Share2, TrendingUp } from "lucide-react";
import { profile } from "@/content/profile";
import { SectionHeading } from "../ui/section-heading";

const pillarIcons = [Hammer, Lightbulb, Share2, TrendingUp];

export function About() {
  return (
    <section id="about" className="container-page py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr_0.9fr] lg:gap-10">
        {/* Story */}
        <div>
          <SectionHeading label="About" title="More Than Just Code" />
          <p className="reveal mt-5 text-[15px] leading-relaxed text-fg-2">{profile.about[0]}</p>
          <p className="reveal mt-4 text-[15px] leading-relaxed text-fg-2">{profile.about[2]}</p>
          <Link href="/#journey" className="btn btn-ghost reveal group mt-7 h-11 text-[13.5px]">
            Know More About Me <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Pillars */}
        <ol className="relative lg:pt-12">
          <span aria-hidden className="absolute top-5 bottom-5 left-[19px] border-l border-dashed border-line-strong lg:top-16" />
          {profile.pillars.map((p, i) => {
            const Icon = pillarIcons[i % pillarIcons.length];
            return (
              <li key={p.title} className="reveal group relative flex items-start gap-4 py-3">
                <span className="relative grid size-10 shrink-0 place-items-center rounded-full border border-accent/40 bg-bg text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <span className="pt-0.5">
                  <span className="block font-display text-[15.5px] font-semibold tracking-tight">{p.title}</span>
                  <span className="mt-0.5 block text-[13.5px] text-fg-2">{p.body}</span>
                </span>
              </li>
            );
          })}
        </ol>

        {/* Quote */}
        <figure className="reveal relative flex min-h-[260px] items-center overflow-hidden rounded-[18px] border border-line p-8 lg:mt-12">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(80% 60% at 85% 15%, rgb(255 255 255 / 0.10), transparent 60%), radial-gradient(60% 80% at 10% 100%, rgb(200 240 74 / 0.08), transparent 70%), linear-gradient(160deg, #161617, #0a0a0b)",
            }}
          />
          <svg aria-hidden className="absolute inset-0 -z-10 size-full opacity-[0.07]" viewBox="0 0 200 200" preserveAspectRatio="none">
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i} d={`M0 ${20 + i * 13} C 60 ${i * 13}, 120 ${40 + i * 13}, 200 ${10 + i * 13}`} stroke="#fff" fill="none" strokeWidth="0.6" />
            ))}
          </svg>
          <div>
            <blockquote className="font-display text-[19px] leading-snug font-medium tracking-tight">“{profile.aboutQuote}”</blockquote>
            <span className="mt-5 block h-px w-10 bg-fg-3" />
          </div>
        </figure>
      </div>
    </section>
  );
}
