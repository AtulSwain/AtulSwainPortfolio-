import Link from "next/link";
import { journey } from "@/content/profile";
import { getProject } from "@/content/projects";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../ui/section-heading";

export function Journey() {
  return (
    <section id="journey" className="container-page py-16 md:py-24">
      <SectionHeading
        label="Journey"
        title="From Hello World to production"
        intro="Every project taught me something the last one couldn’t. Here’s the path, in order."
        center
      />

      <ol className="relative mx-auto mt-14 max-w-3xl">
        <span aria-hidden className="absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-accent via-line to-accent-2 md:left-1/2" />
        {journey.map((entry, i) => {
          const right = i % 2 === 1;
          return (
            <li key={i} className="reveal relative grid pb-10 pl-12 last:pb-0 md:grid-cols-2 md:gap-12 md:pl-0">
              <span
                aria-hidden
                className={cn(
                  "absolute top-5 left-[9px] grid size-[13px] place-items-center rounded-full border-2 bg-bg md:left-[calc(50%-6px)]",
                  entry.current ? "border-accent" : "border-line-strong",
                )}
              >
                {entry.current && <span className="live-dot size-1.5 rounded-full bg-accent" />}
              </span>
              <div className={cn("md:text-right", right && "md:order-2 md:text-left")}>
                <time className="mt-3.5 inline-block font-mono text-[12px] tracking-[0.06em] text-accent uppercase">{entry.date}</time>
              </div>
              <div className={cn("panel spotlight mt-2 p-6 md:mt-0", right && "md:order-1")}>
                <h3 className="font-display text-[20px] font-semibold tracking-tight">{entry.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{entry.body}</p>
                {entry.projects && entry.projects.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {entry.projects.map((slug) => {
                      const p = getProject(slug);
                      return p ? (
                        <li key={slug}>
                          <Link
                            href={`/work/${slug}/`}
                            className="inline-block rounded-full bg-bg-sunk px-2.5 py-1 text-[12px] text-fg-2 transition-colors hover:bg-accent hover:text-accent-ink"
                          >
                            {p.title}
                          </Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
