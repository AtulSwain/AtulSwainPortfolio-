import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, dataIntro, dataProcess } from "@/content/data-science";
import { SectionHeading } from "../ui/section-heading";

export function DataScience() {
  return (
    <section id="data" className="container-page py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading label="Data science" title="Questions first, then data" intro={dataIntro} />
          <ol className="reveal mt-10 space-y-0">
            {dataProcess.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 pb-7 last:pb-0">
                {i < dataProcess.length - 1 && <span aria-hidden className="absolute top-9 bottom-0 left-[17px] w-px bg-line" />}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-bg-elev font-mono text-[12px] text-accent">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-[18px] font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-fg-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4 lg:pt-6">
          {caseStudies.map((cs, i) => (
            <article key={cs.title} className={i === 0 ? "panel ring-gradient spotlight reveal p-7 md:p-8" : "panel spotlight reveal p-7 md:p-8"}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="pill py-1 text-[12px]">
                  <span className={i === 0 ? "size-1.5 rounded-full bg-amber-400" : "size-1.5 rounded-full bg-emerald-500"} />
                  {cs.status}
                </span>
                <span className="font-mono text-[11px] text-fg-3">Case study {String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="display mt-5 text-[30px]">{cs.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{cs.summary}</p>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["Question", cs.question],
                    ["Data", cs.data],
                    ["Methods", cs.methods],
                    ["Result", cs.result],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-bg-sunk p-4">
                    <dt className="eyebrow">{k}</dt>
                    <dd className="mt-1.5 text-[14px] leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
              {cs.project && (
                <Link href={`/work/${cs.project}/`} className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                  <span className="link-draw">Read the full case study</span>
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
