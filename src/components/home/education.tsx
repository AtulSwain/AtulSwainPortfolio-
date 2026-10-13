import { education, studying } from "@/content/profile";

export function EducationList() {
  return (
    <div className="mt-12">
      <ul className="card divide-y divide-line">
        {education.map((e) => (
          <li key={e.title} className="reveal grid gap-3 p-6 md:grid-cols-12 md:gap-6 md:p-8">
            <p className="font-mono text-[11.5px] tracking-[0.08em] text-fg-3 uppercase md:col-span-3 md:pt-2">{e.period}</p>
            <div className="md:col-span-4">
              <h3 className="display text-[30px] leading-[1.05]">{e.title}</h3>
              <p className="mt-1 text-[14px] text-fg-3">{e.place}</p>
            </div>
            <div className="md:col-span-5">
              <p className="text-[15.5px] leading-relaxed text-fg-2">{e.body}</p>
              {e.tags && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <li key={t} className="rounded-full bg-bg-sunk px-2.5 py-1 text-[12px] text-fg-2">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="reveal mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        <p className="eyebrow shrink-0">Currently studying</p>
        <ul className="flex flex-wrap gap-2">
          {studying.map((s) => (
            <li key={s} className="rounded-full border border-line px-3.5 py-1.5 text-[13.5px] text-fg-2">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
