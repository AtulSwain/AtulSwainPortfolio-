import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, dataIntro, dataProcess } from "@/content/data-science";
import { pad } from "@/lib/utils";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { ChartSketch } from "../ui/chart-sketch";

function Facts({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k} className="border-t border-line pt-3">
          <dt className="eyebrow">{k}</dt>
          <dd className="mt-1.5 text-[15px]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DataScience() {
  const [lead, ...more] = caseStudies;

  return (
    <section id="data" className="scroll-mt-20 border-t border-line py-28 md:py-40">
      <div className="container-x">
        <SectionHeading index="04" label="Data science" title="Questions, then data" intro={dataIntro} />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-24 md:grid-cols-4">
          {dataProcess.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="group relative bg-bg p-7 transition-colors hover:bg-bg-elev">
              <span className="display text-6xl text-fg-3/50 transition-colors group-hover:text-accent">{pad(i + 1)}</span>
              <h3 className="display mt-6 text-3xl">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        {lead && (
          <Reveal className="mt-10">
            <article className="grid overflow-hidden rounded-[24px] border border-line bg-bg-elev md:grid-cols-12">
              <div className="p-8 md:col-span-6 md:p-12">
                <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-accent uppercase">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {lead.status}
                </p>
                <h3 className="display mt-6 text-4xl md:text-5xl">{lead.title}</h3>
                <p className="mt-4 max-w-lg text-[16.5px] leading-relaxed text-fg-2">{lead.summary}</p>
                <div className="mt-10">
                  <Facts
                    items={[
                      ["Question", lead.question],
                      ["Data", lead.data],
                      ["Methods", lead.methods],
                      ["Result", lead.result],
                    ]}
                  />
                </div>
                {lead.project && (
                  <Link href={`/work/${lead.project}/`} className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                    <span className="link-draw">Read the case study</span> <ArrowUpRight size={15} />
                  </Link>
                )}
              </div>
              <div className="relative min-h-[280px] border-t border-line bg-bg-sunk/70 p-8 md:col-span-6 md:border-t-0 md:border-l md:p-12">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase">
                  <span>fig. 01</span>
                  <span className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-accent" />model</span>
                    <span className="flex items-center gap-1.5"><span className="h-0 w-4 border-t border-dashed border-fg-3" />baseline</span>
                  </span>
                </div>
                <div className="mt-8 h-[220px] md:h-[300px]">
                  <ChartSketch />
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {more.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {more.map((cs, i) => (
              <Reveal key={cs.title} delay={i * 0.08}>
                <article className="h-full rounded-[24px] border border-line p-8 md:p-10">
                  <p className="eyebrow text-accent!">{cs.status}</p>
                  <h3 className="display mt-4 text-3xl md:text-4xl">{cs.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-fg-2">{cs.summary}</p>
                  <div className="mt-8">
                    <Facts items={[["Question", cs.question], ["Data", cs.data], ["Methods", cs.methods], ["Result", cs.result]]} />
                  </div>
                  {cs.project && (
                    <Link href={`/work/${cs.project}/`} className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                      <span className="link-draw">Read the case study</span> <ArrowUpRight size={15} />
                    </Link>
                  )}
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.1}>
              <div className="grid h-full min-h-[220px] place-items-center rounded-[24px] border border-dashed border-line p-10 text-center">
                <div>
                  <p className="display text-3xl text-fg-3 italic">More on the way</p>
                  <p className="mt-2 text-sm text-fg-3">New analyses land here as I finish them.</p>
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
