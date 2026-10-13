import Link from "next/link";
import { profile } from "@/content/profile";
import { LocalTime } from "./ui/local-time";
import { BackToTop } from "./ui/back-to-top";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="display text-4xl">{profile.name}</p>
          <p className="mt-3 max-w-sm text-sm text-fg-2">{profile.role}.</p>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-4">Site</p>
          <ul className="space-y-2 text-sm text-fg-2">
            <li><Link className="link-draw hover:text-fg" href="/work/">Work</Link></li>
            <li><Link className="link-draw hover:text-fg" href="/#about">About</Link></li>
            <li><Link className="link-draw hover:text-fg" href="/#journey">Journey</Link></li>
            <li><Link className="link-draw hover:text-fg" href="/#education">Education</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-2 text-sm text-fg-2">
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a className="link-draw hover:text-fg" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a className="link-draw hover:text-fg" href={`mailto:${profile.email}`}>Email</a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 md:text-right">
          <p className="eyebrow mb-4">Local time</p>
          <LocalTime timeZone={profile.timeZone} className="display text-4xl" />
          <p className="mt-1 text-sm text-fg-3">{profile.location}</p>
        </div>
      </div>

      <div className="container-x">
        <div className="flex items-center justify-between border-t border-line py-6 font-mono text-[11px] tracking-[0.12em] text-fg-3 uppercase">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
