import Link from "next/link";
import { caseStudies, dataIntro, dataProcess } from "@/content/data-science";
import { pad } from "@/lib/utils";

function Cell({ n, code, children }: { n?: number; code?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid gap-x-4 md:grid-cols-[64px_1fr]">
      {code && (
        <>
          <span className="hidden pt-3 text-right font-mono text-[11px] text-fg-3 md:block">In [{n ?? " "}]:</span>
          <pre className="overflow-x-auto rounded-xl border border-line bg-bg px-4 py-3 font-mono text-[13px] leading-relaxed text-fg">
            <code>{code}</code>
          </pre>
        </>
      )}
      {children && (
        <>
          <span className="hidden pt-4 text-right font-mono text-[11px] text-accent md:block">{n ? `Out[${n}]:` : ""}</span>
          <div className="pt-3 md:col-start-2">{children}</div>
        </>
      )}
    </div>
  );
}

const C = ({ children }: { children: React.ReactNode }) => <span className="text-fg-3">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-accent">{children}</span>;

const series = [62, 58, 64, 55, 60, 48, 52, 41, 44, 36, 38, 27, 30, 22, 18];
const baseline = [66, 64, 66, 62, 63, 60, 61, 58, 59, 57, 57, 55, 56, 54, 53];
const toPath = (pts: number[]) => pts.map((v, i) => `${i ? "L" : "M"}${(i / (pts.length - 1)) * 400},${v * 2.4}`).join(" ");

/** The data science section, presented as a Jupyter-style notebook. */
export function Notebook() {
  return (
    <div className="card reveal mt-12 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-line bg-bg-sunk/60 px-5 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </span>
        <span className="font-mono text-[12px] text-fg-2">how-i-work.ipynb</span>
        <span className="ml-auto flex items-center gap-2 font-mono text-[11px] text-fg-3">
          <span className="size-1.5 rounded-full bg-emerald-500" /> Python 3
        </span>
      </div>

      <div className="space-y-6 p-5 md:p-8">
        {/* Markdown cell */}
        <div className="md:pl-[80px]">
          <p className="max-w-2xl text-[17px] leading-relaxed text-fg-2">{dataIntro}</p>
        </div>

        <Cell
          n={1}
          code={
            <>
              <C># the four steps I follow on every analysis</C>
              {"\n"}process = [{dataProcess.map((s, i) => (
                <span key={s.title}>
                  <S>&quot;{s.title.toLowerCase()}&quot;</S>
                  {i < dataProcess.length - 1 ? ", " : ""}
                </span>
              ))}]
            </>
          }
        >
          <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
            {dataProcess.map((s, i) => (
              <li key={s.title} className="bg-bg-elev p-5">
                <span className="font-mono text-[11px] text-accent">{pad(i + 1)}</span>
                <h3 className="display mt-3 text-[26px]">{s.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-fg-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </Cell>

        <Cell
          n={2}
          code={
            <>
              case_studies.<span className="text-fg">head</span>()
            </>
          }
        >
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[720px] text-left text-[13.5px]">
              <thead className="bg-bg-sunk/60 font-mono text-[11px] text-fg-3">
                <tr>
                  <th className="px-4 py-2.5 font-normal"> </th>
                  <th className="px-4 py-2.5 font-normal">title</th>
                  <th className="px-4 py-2.5 font-normal">question</th>
                  <th className="px-4 py-2.5 font-normal">data</th>
                  <th className="px-4 py-2.5 font-normal">methods</th>
                  <th className="px-4 py-2.5 font-normal">status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {caseStudies.map((cs, i) => (
                  <tr key={cs.title} className="align-top transition-colors hover:bg-bg-sunk/50">
                    <td className="px-4 py-3 font-mono text-[11px] text-fg-3">{i}</td>
                    <td className="px-4 py-3 font-medium">
                      {cs.project ? (
                        <Link href={`/work/${cs.project}/`} className="link-draw">
                          {cs.title} ↗
                        </Link>
                      ) : (
                        cs.title
                      )}
                      <p className="mt-1 max-w-[260px] text-[12.5px] font-normal leading-snug text-fg-3">{cs.summary}</p>
                    </td>
                    <td className="px-4 py-3 text-fg-2">{cs.question}</td>
                    <td className="px-4 py-3 text-fg-2">{cs.data}</td>
                    <td className="px-4 py-3 text-fg-2">{cs.methods}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full border border-line px-2 py-0.5 font-mono text-[10.5px] whitespace-nowrap text-accent">
                        {cs.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 font-mono text-[11px] text-fg-3">
            {caseStudies.length} rows × 5 columns
          </p>
        </Cell>

        <Cell
          n={3}
          code={
            <>
              plot(model, baseline, title=<S>&quot;fig. 01&quot;</S>)  <C># illustrative</C>
            </>
          }
        >
          <figure className="rounded-xl border border-line bg-bg p-5">
            <svg viewBox="0 0 400 200" className="draw h-[180px] w-full overflow-visible md:h-[230px]" aria-hidden>
              {[40, 80, 120, 160].map((y) => (
                <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="var(--line)" strokeDasharray="2 4" />
              ))}
              <path d={toPath(baseline)} pathLength={1} data-draw fill="none" stroke="var(--fg-3)" strokeWidth="1.2" strokeDasharray="4 4" />
              <path d={toPath(series)} pathLength={1} data-draw fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <circle cx="400" cy={series.at(-1)! * 2.4} r="4" fill="var(--accent)" />
            </svg>
            <figcaption className="mt-3 flex flex-wrap items-center gap-4 font-mono text-[11px] text-fg-3">
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-accent" /> model</span>
              <span className="flex items-center gap-1.5"><span className="w-4 border-t border-dashed border-fg-3" /> baseline</span>
              <span className="ml-auto">Illustrative — real figures arrive with each case study.</span>
            </figcaption>
          </figure>
        </Cell>

        <Cell
          code={
            <>
              <C># next analysis loading</C>
              <span className="ml-1 inline-block h-[1.1em] w-[7px] translate-y-[3px] animate-pulse bg-accent motion-reduce:animate-none" />
            </>
          }
        />
      </div>
    </div>
  );
}
