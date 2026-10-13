import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SocialIcon } from "../ui/social-icon";
import { profile, skills } from "@/content/profile";
import { asset } from "@/lib/utils";
import { Portrait } from "../ui/portrait";
import { LocalTime } from "../ui/clock";
import { CopyButton } from "../ui/copy-button";

export function Hero({ photo }: { photo?: string }) {
  const tools = skills.flatMap((g) => g.items);

  return (
    <section id="top" className="relative pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="backdrop" aria-hidden />
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        {/* Copy */}
        <div>
          {profile.availability && (
            <p className="pill enter">
              <span className="live-dot size-2 rounded-full bg-emerald-500" />
              {profile.availability}
            </p>
          )}
          <h1 className="display enter enter-1 mt-7 text-[clamp(42px,5.4vw,72px)]">
            {profile.headline.lead} <span className="gradient-text">{profile.headline.emphasis}</span>{" "}
            {profile.headline.tail}
          </h1>
          <p className="enter enter-2 mt-6 max-w-xl text-[18px] leading-relaxed text-fg-2">{profile.intro}</p>
          <div className="enter enter-3 mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-[14.5px] font-medium text-bg transition-transform active:scale-[0.98]"
            >
              View my projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <CopyButton text={profile.email} className="h-12 px-6" />
            {profile.resume && (
              <a href={asset(profile.resume)} className="inline-flex h-12 items-center rounded-full px-4 text-[14px] text-fg-2 hover:text-fg">
                Résumé ↓
              </a>
            )}
          </div>
        </div>

        {/* ID card */}
        <aside className="panel ring-gradient spotlight enter enter-2 mx-auto w-full max-w-[400px] p-3" aria-label="Profile card">
          <Portrait src={photo} name={profile.name} priority className="aspect-[5/4] rounded-[14px]" />
          <div className="px-3 pt-5 pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="display text-[26px]">{profile.name}</p>
                <p className="mt-1 text-[13.5px] text-fg-2">{profile.shortRole}</p>
              </div>
              <span className="pill shrink-0 px-2.5 py-1 font-mono text-[11px]">
                <LocalTime timeZone={profile.timeZone} />
              </span>
            </div>
            <dl className="mt-5 space-y-2.5 text-[13.5px]">
              <div className="flex items-center gap-2.5 text-fg-2">
                <MapPin size={14} className="text-fg-3" />
                <dt className="sr-only">Location</dt>
                <dd>{profile.location}</dd>
              </div>
              {profile.facts.slice(1, 3).map((f) => (
                <div key={f.label} className="flex justify-between gap-4 border-t border-line pt-2.5">
                  <dt className="text-fg-3">{f.label}</dt>
                  <dd className="text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-2">
              {profile.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-full border border-line text-[13px] transition-colors hover:border-line-strong hover:bg-bg-sunk"
                >
                  <SocialIcon label={s.label} /> {s.label}
                </a>
              ))}
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-full bg-accent text-[13px] font-medium text-accent-ink"
              >
                Say hello
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Tools marquee */}
      <div className="container-page mt-20">
        <p className="eyebrow text-center">Tools I use</p>
        <div className="marquee relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <ul className="marquee-track flex w-max gap-3">
            {[...tools, ...tools].map((t, i) => (
              <li key={i} aria-hidden={i >= tools.length} className="pill shrink-0 px-4 py-2 text-[13.5px]">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
