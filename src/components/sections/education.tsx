import { education, studying } from "@/content/profile";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

export function Education() {
  return (
    <section id="education" className="scroll-mt-20 bg-bg-sunk/60 py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Education"
          title="Study & learning"
          intro="Formal study gave me the foundations. Building things taught me the rest."
        />

        <ul className="mt-16 border-t border-line md:mt-24">
          {education.map((e, i) => (
            <Reveal as="li" key={i} className="group grid gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-6">
              <p className="font-mono text-[12px] tracking-[0.1em] text-fg-3 uppercase md:col-span-3 md:pt-3">{e.period}</p>
              <div className="md:col-span-5">
                <h3 className="display text-[clamp(30px,3.4vw,46px)] leading-[1.02] transition-colors group-hover:text-accent">
                  {e.title}
                </h3>
                <p className="mt-2 text-[15px] text-fg-3">{e.place}</p>
              </div>
              <div className="md:col-span-4 md:pt-2">
                <p className="text-[16px] leading-relaxed text-fg-2">{e.body}</p>
                {e.tags && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-2.5 py-1 text-[12px] text-fg-2">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex flex-col gap-5 md:flex-row md:items-center">
          <p className="eyebrow shrink-0 md:w-1/4">Currently studying</p>
          <ul className="flex flex-wrap gap-2">
            {studying.map((s) => (
              <li key={s} className="rounded-full bg-bg px-4 py-2 text-sm text-fg-2 ring-1 ring-line">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
