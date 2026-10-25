import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, dataIntro, dataProcess } from "@/content/data-science";
import { SectionHeading } from "../ui/section-heading";

export function DataScience() {
  return (
    <section id="data" className="container-page py-16 md:py-20">
      <SectionHeading label="Data science" title="Questions first, then data" intro={dataIntro} />

      <ol className="mt-10 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line md:grid-cols-4">
        {dataProcess.map((s, i) => (
          <li key={s.title} className="reveal group bg-bg-elev p-6 transition-colors hover:bg-bg-elev-2">
            <span className="font-display text-[34px] font-semibold text-fg-3/60 transition-colors group-hover:text-accent">
              0{i + 1}
            </span>
            <h3 className="mt-4 font-display text-[16px] font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-2">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {caseStudies.map((cs, i) => (
          <article key={cs.title} className="panel spotlight reveal p-6 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="chip gap-2 text-[11px]">
                <span className={i === 0 ? "size-1.5 rounded-full bg-amber-400" : "size-1.5 rounded-full bg-accent"} />
                {cs.status}
              </span>
              <span className="font-mono text-[11px] text-fg-3">Case study {String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 font-display text-[22px] font-semibold tracking-tight">{cs.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-fg-2">{cs.summary}</p>
            <dl className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {(
                [
                  ["Question", cs.question],
                  ["Data", cs.data],
                  ["Methods", cs.methods],
                  ["Result", cs.result],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-bg-sunk p-3.5">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-1 text-[13px] leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
            {cs.project && (
              <Link href={`/work/${cs.project}/`} className="group mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent">
                <span className="link-draw">Read the full case study</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
