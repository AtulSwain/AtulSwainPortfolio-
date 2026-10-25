import { BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { education, studying } from "@/content/profile";
import { SectionHeading } from "../ui/section-heading";

const icons = [GraduationCap, BookOpen, Sparkles];

export function Education() {
  return (
    <section id="education" className="container-page py-16 md:py-20">
      <SectionHeading label="Education" title="Study & learning" intro="Formal study gave me the foundations. Building things taught me the rest." />
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {education.map((e, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={e.title} className="panel spotlight lift reveal flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl border border-line-strong text-accent">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <span className="font-mono text-[11px] text-fg-3">{e.period}</span>
              </div>
              <h3 className="mt-5 font-display text-[17px] font-semibold tracking-tight">{e.title}</h3>
              <p className="mt-0.5 text-[13px] text-fg-3">{e.place}</p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-fg-2">{e.body}</p>
              {e.tags && (
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {e.tags.map((t) => (
                    <li key={t} className="chip px-2.5 py-0.5 text-[11px]">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <div className="reveal mt-5 flex flex-col gap-3 md:flex-row md:items-center">
        <p className="eyebrow shrink-0 md:mr-3">Currently studying</p>
        <ul className="flex flex-wrap gap-2">
          {studying.map((s) => (
            <li key={s} className="chip text-[12px]">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
