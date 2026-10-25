import { ArrowRight, ArrowUpRight, BarChart3, Code2, MessagesSquare, Waypoints } from "lucide-react";
import { lab } from "@/content/lab";
import { SectionHeading } from "../ui/section-heading";

const icons = { chat: MessagesSquare, graph: Waypoints, chart: BarChart3, code: Code2 };

export function Lab() {
  return (
    <section id="lab" className="container-page py-16 md:py-20">
      <SectionHeading
        label="AI Lab"
        title="Play. Experiment. Build."
        aside={<p className="flex items-center gap-2 text-[13px] text-fg-2">Live tools and experiments — try them directly <ArrowRight size={14} /></p>}
      />
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {lab.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.title} className="reveal">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="panel spotlight lift group flex h-full items-start gap-5 p-6"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-xl border border-line-strong bg-bg-sunk text-fg transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
                  <Icon size={24} strokeWidth={1.5} />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-[16.5px] font-semibold tracking-tight">{item.title}</span>
                  <span className="mt-1 text-[13.5px] leading-relaxed text-fg-2">{item.body}</span>
                  <span className="btn btn-lime mt-4 h-8 w-max gap-1.5 rounded-full px-3.5 text-[12.5px] font-semibold">
                    {item.cta ?? "Try now"}
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
