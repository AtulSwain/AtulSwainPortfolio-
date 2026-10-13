import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile, skills } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { existing } from "@/lib/assets";
import { Portrait } from "../ui/portrait";
import { ProjectCover } from "../ui/project-cover";
import { DayBar, LocalTime } from "../ui/clock";
import { CopyButton } from "../ui/copy-button";

export function Intro({ photo }: { photo?: string }) {
  const latest = featuredProjects[0];

  return (
    <section id="index" aria-label="Introduction" className="pt-6 lg:pt-12">
      <div className="grid gap-4 md:grid-cols-6 xl:grid-cols-12">
        {/* Hello */}
        <div className="card enter flex flex-col p-7 md:col-span-6 md:p-10 xl:col-span-8 xl:row-span-2">
          <p className="eyebrow">Portfolio · {new Date().getFullYear()}</p>
          <h1 className="display mt-6 text-[clamp(44px,5.6vw,88px)] leading-[0.95]">
            Hi, I’m {profile.firstName}. {profile.headline.lead}{" "}
            <em className="text-accent">{profile.headline.emphasis}</em> {profile.headline.tail}
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-fg-2">{profile.intro}</p>

          <div className="mt-auto pt-10">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#work"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg"
              >
                See my work
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-45" />
              </Link>
              <CopyButton text={profile.email} />
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-1 text-sm text-fg-3">
              <li className="eyebrow mr-1 self-center">I build</li>
              {profile.roles.map((r, i) => (
                <li key={r}>
                  {r}
                  {i < profile.roles.length - 1 && <span className="ml-2 text-line">/</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Portrait */}
        <div className="card enter enter-1 relative flex min-h-[420px] overflow-hidden p-3 md:col-span-3 xl:col-span-4 xl:row-span-2">
          <Portrait src={photo} name={profile.name} priority fixedRatio={false} className="w-full flex-1" />
          <p className="absolute right-6 bottom-6 left-6 flex items-center justify-between rounded-full bg-bg/80 px-4 py-2 text-[12.5px] backdrop-blur">
            <span>{profile.name}</span>
            <span className="text-fg-3">{profile.location}</span>
          </p>
        </div>

        {/* Now */}
        <div className="card enter enter-2 p-7 md:col-span-3 xl:col-span-4">
          <p className="eyebrow">Now</p>
          <ul className="mt-5 space-y-3">
            {profile.now.map((n) => (
              <li key={n} className="flex gap-3 text-[15px] leading-snug">
                <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                {n}
              </li>
            ))}
          </ul>
        </div>

        {/* Time */}
        <div className="card enter enter-3 p-7 md:col-span-3 xl:col-span-4">
          <div className="flex items-baseline justify-between">
            <p className="eyebrow">Local time</p>
            <LocalTime timeZone={profile.timeZone} className="display text-3xl" />
          </div>
          <div className="mt-5">
            <DayBar timeZone={profile.timeZone} />
          </div>
        </div>

        {/* Stats */}
        <dl className="card enter enter-4 grid grid-cols-2 p-2 md:col-span-3 xl:col-span-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="rounded-2xl p-5 transition-colors hover:bg-bg-sunk">
              <dd className="display text-[44px] leading-none">{s.value}</dd>
              <dt className="mt-2 text-[12.5px] leading-snug text-fg-3">{s.label}</dt>
            </div>
          ))}
        </dl>

        {/* Latest project */}
        {latest && (
          <Link
            href={`/work/${latest.slug}/`}
            className="card enter enter-5 group grid overflow-hidden md:col-span-6 md:grid-cols-5 xl:col-span-12"
          >
            <div className="flex flex-col p-7 md:col-span-2 md:p-9">
              <p className="eyebrow">Latest work · {latest.category}</p>
              <h2 className="display mt-4 text-5xl">{latest.title}</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-fg-2">{latest.tagline}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium">
                <span className="link-draw">Read the case study</span>
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </div>
            <div className="relative overflow-hidden border-t border-line md:col-span-3 md:border-t-0 md:border-l">
              <div className="h-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
                <ProjectCover project={latest} src={existing(latest.cover)} className="aspect-[16/9] h-full md:aspect-auto md:min-h-[300px]" sizes="(min-width: 1280px) 600px, 100vw" />
              </div>
            </div>
          </Link>
        )}

        {/* Toolkit */}
        <div className="card reveal p-7 md:col-span-6 md:p-9 xl:col-span-8">
          <p className="eyebrow">Toolkit</p>
          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
            {skills.map((g) => (
              <div key={g.title}>
                <h3 className="text-[13px] font-medium text-accent">{g.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-fg-2">{g.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <figure className="reveal flex flex-col justify-between rounded-[22px] bg-accent p-7 text-accent-ink md:col-span-6 md:p-9 xl:col-span-4">
          <span className="display text-6xl leading-none opacity-60">“</span>
          <blockquote className="display mt-2 text-[30px] leading-[1.12]">{profile.pullQuote}</blockquote>
          <figcaption className="mt-6 text-[12.5px] opacity-75">— How I like to work</figcaption>
        </figure>
      </div>

      {/* About */}
      <div className="reveal mt-24 grid gap-8 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">About</p>
        <div className="md:col-span-9">
          <p className="display text-[clamp(28px,3vw,42px)] leading-[1.15]">{profile.about[0]}</p>
          <div className="mt-8 grid gap-6 text-[16.5px] leading-relaxed text-fg-2 md:grid-cols-2">
            {profile.about.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {profile.facts.map((f) => (
              <div key={f.label} className="bg-bg p-4">
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-1.5 text-[14px]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
