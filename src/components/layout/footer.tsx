import Link from "next/link";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { sections } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-fg font-display text-[13px] font-bold text-bg">AS</span>
            <span className="font-display text-[16px] font-semibold tracking-tight">{profile.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-fg-2">{profile.role}.</p>
          <p className="mt-4 text-[12.5px] text-fg-3">
            Press <kbd className="kbd">/</kbd> anywhere to search.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow">Sections</p>
          <ul className="mt-4 space-y-2 text-[14px] text-fg-2">
            {sections.map((s) => (
              <li key={s.id}>
                <Link href={s.href} className="link-draw hover:text-fg">{s.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow">Featured</p>
          <ul className="mt-4 space-y-2 text-[14px] text-fg-2">
            {projects.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}/`} className="link-draw hover:text-fg">{p.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/work/" className="link-draw text-accent">All work →</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-[14px] text-fg-2">
            <li><a href={`mailto:${profile.email}`} className="link-draw hover:text-fg">Email</a></li>
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-fg">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-page flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 text-[12.5px] text-fg-3">
        <span>© {new Date().getFullYear()} {profile.name}. Built with Next.js & Tailwind CSS.</span>
        <a href="#top" className="link-draw hover:text-fg">Back to top ↑</a>
      </div>
    </footer>
  );
}
