import { BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { education, studying } from "@/content/profile";
import { SectionHeading } from "../ui/section-heading";

const icons = [GraduationCap, BookOpen, Sparkles];

export function Education() {
  return (
    <section id="education" className="container-page py-16 md:py-24">
      <SectionHeading
        label="Education"
        title="Study & learning"
        intro="Formal study gave me the foundations. Building things taught me the rest."
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {education.map((e, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={e.title} className="panel spotlight reveal flex flex-col p-7">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-bg-sunk text-accent">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <span className="font-mono text-[11.5px] text-fg-3">{e.period}</span>
              </div>
              <h3 className="mt-6 font-display text-[21px] font-semibold tracking-tight">{e.title}</h3>
              <p className="mt-1 text-[13.5px] text-fg-3">{e.place}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-fg-2">{e.body}</p>
              {e.tags && (
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {e.tags.map((t) => (
                    <li key={t} className="rounded-full bg-bg-sunk px-2.5 py-1 text-[12px] text-fg-2">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <div className="panel reveal mt-4 flex flex-col gap-4 p-6 md:flex-row md:items-center">
        <p className="eyebrow shrink-0 md:w-48">Currently studying</p>
        <ul className="flex flex-wrap gap-2">
          {studying.map((s) => (
            <li key={s} className="pill text-[13px]">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
