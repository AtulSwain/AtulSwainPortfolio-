import { BarChart3, Code2, Sparkles } from "lucide-react";
import { profile } from "@/content/profile";
import { SectionHeading } from "../ui/section-heading";

const icons = [Code2, Sparkles, BarChart3];

export function About() {
  return (
    <section id="about" className="container-page py-16 md:py-24">
      {/* Stats */}
      <dl className="panel reveal grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
        {profile.stats.map((s, i) => (
          <div key={s.label} className={i < 2 ? "border-b border-line p-6 md:border-b-0 md:p-8" : "p-6 md:p-8"}>
            <dd className="display text-[clamp(36px,4vw,52px)]">{s.value}</dd>
            <dt className="mt-2 text-[13px] text-fg-3">{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading label="About me" title="Curious builder, honest numbers." />
          <div className="reveal mt-8 space-y-5 text-[16.5px] leading-relaxed text-fg-2">
            {profile.about.map((p, i) => (
              <p key={i} className={i === 0 ? "text-[19px] leading-relaxed text-fg" : undefined}>
                {p}
              </p>
            ))}
          </div>
          <dl className="reveal mt-8 grid grid-cols-2 gap-3">
            {profile.facts.map((f) => (
              <div key={f.label} className="rounded-2xl border border-line p-4">
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-1.5 text-[14px]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:pt-24">
          <p className="eyebrow reveal">How I work</p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2">
            {profile.principles.map((p, i) => (
              <li key={p.title} className="panel spotlight reveal p-6">
                <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                <h3 className="mt-3 font-display text-[19px] font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{p.body}</p>
              </li>
            ))}
          </ol>
          <figure className="reveal mt-3 rounded-[20px] border border-line bg-bg-sunk p-6">
            <blockquote className="font-display text-[22px] leading-snug font-medium tracking-tight">“{profile.pullQuote}”</blockquote>
          </figure>
        </div>
      </div>

      {/* Services */}
      <div className="mt-24">
        <SectionHeading label="What I do" title="Three things I’m good at" />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {profile.services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={s.title} className="panel spotlight reveal flex flex-col p-7">
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-bg-sunk text-accent">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <h3 className="mt-6 font-display text-[22px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-fg-2">{s.body}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {s.tools.map((t) => (
                    <li key={t} className="rounded-full bg-bg-sunk px-2.5 py-1 text-[12px] text-fg-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
