import { profile, skills } from "@/content/profile";
import { Portrait } from "../ui/portrait";
import { Reveal, ScrollText } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { CountUp } from "../ui/count-up";

export function About({ photo }: { photo?: string }) {
  const [lead, ...rest] = profile.about;

  return (
    <section id="about" className="scroll-mt-20 py-28 md:py-40">
      <div className="container-x">
        <SectionHeading index="01" label="About" title="A little about me" />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
          {/* Portrait column */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <Portrait src={photo} name={profile.name} className="max-w-[380px]" />
              </Reveal>
              <Reveal delay={0.1}>
                <dl className="mt-8 max-w-[380px] divide-y divide-line border-y border-line">
                  {profile.facts.map((f) => (
                    <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="eyebrow">{f.label}</dt>
                      <dd className="text-right text-sm">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          {/* Story column */}
          <div className="md:col-span-7 md:col-start-6">
            <ScrollText text={lead} className="display text-[clamp(28px,3.2vw,46px)] leading-[1.12]" />

            <div className="mt-12 grid gap-6 text-[17px] leading-relaxed text-fg-2 sm:grid-cols-2">
              {rest.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <blockquote className="mt-16 border-l-2 border-accent pl-6">
                <p className="display text-2xl leading-snug italic md:text-3xl">“{profile.pullQuote}”</p>
              </blockquote>
            </Reveal>

            {/* Stats */}
            <dl className="mt-16 grid grid-cols-2 border-t border-line md:grid-cols-4">
              {profile.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06} className="border-b border-line py-6 pr-4 md:border-b-0">
                  <dd className="display text-5xl md:text-6xl">
                    <CountUp value={s.value} />
                  </dd>
                  <dt className="mt-2 text-[13px] text-fg-3">{s.label}</dt>
                </Reveal>
              ))}
            </dl>

            {/* Toolkit */}
            <div className="mt-20">
              <Reveal>
                <p className="eyebrow mb-6">Toolkit</p>
              </Reveal>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((g, i) => (
                  <Reveal key={g.title} delay={i * 0.05} className="bg-bg p-6 transition-colors hover:bg-bg-elev">
                    <h3 className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">{g.title}</h3>
                    <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-[15px] text-fg-2">
                      {g.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
