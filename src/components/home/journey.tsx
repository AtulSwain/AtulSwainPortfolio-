import Link from "next/link";
import { journey } from "@/content/profile";
import { getProject } from "@/content/projects";
import { cn, pad } from "@/lib/utils";
import { SectionHeading } from "../ui/section-heading";

export function Journey() {
  return (
    <section id="journey" className="container-page py-16 md:py-20">
      <SectionHeading
        label="Journey"
        title="From Hello World to production"
        intro="Every project taught me something the last one couldn’t."
      />
      <ol className="relative mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {journey.map((entry, i) => (
          <li
            key={i}
            className={cn(
              "panel spotlight lift reveal relative flex flex-col p-6",
              entry.current && "border-accent/40",
              i === journey.length - 1 && "md:col-span-2 lg:col-span-1",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-accent">{pad(i + 1)}</span>
              <time className="font-mono text-[11px] tracking-[0.06em] text-fg-3 uppercase">{entry.date}</time>
            </div>
            <h3 className="mt-5 font-display text-[17px] font-semibold tracking-tight">{entry.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-fg-2">{entry.body}</p>
            {entry.projects && entry.projects.length > 0 && (
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {entry.projects.map((slug) => {
                  const p = getProject(slug);
                  return p ? (
                    <li key={slug}>
                      <Link
                        href={`/work/${slug}/`}
                        className="chip px-2.5 py-0.5 text-[11px] transition-colors hover:border-accent hover:text-accent"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            )}
            {entry.current && (
              <p className="mt-auto flex items-center gap-2 pt-4 text-[12px] text-accent">
                <span className="live-dot size-1.5 rounded-full bg-accent" /> In progress
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
