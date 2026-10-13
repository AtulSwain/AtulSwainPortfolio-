import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { asset } from "@/lib/utils";
import { CopyButton } from "../ui/copy-button";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="reveal relative overflow-hidden rounded-[28px] bg-fg p-8 text-bg md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/2 -right-1/4 aspect-square w-[80%] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--accent), transparent)" }}
        />
        <p className="eyebrow relative flex items-center gap-3 text-bg/60!">
          <span className="text-accent">05</span>
          <span className="h-px w-6 bg-bg/25" />
          Contact
        </p>
        <h2 className="display relative mt-6 text-[clamp(48px,7.5vw,120px)] leading-[0.9]">
          Let’s build <em className="text-accent">something good.</em>
        </h2>
        <p className="relative mt-6 max-w-lg text-[17px] leading-relaxed text-bg/70">
          Have a project, a role, or a dataset with a question in it? I’d love to hear about it.
        </p>

        <div className="relative mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-bg pr-1.5 pl-5 text-[14.5px] font-medium text-fg"
          >
            {profile.email}
            <span className="grid size-9 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </a>
          <CopyButton text={profile.email} className="h-12 border-bg/25 text-bg hover:border-bg" />
          {profile.resume && (
            <a href={asset(profile.resume)} className="inline-flex h-12 items-center rounded-full border border-bg/25 px-5 text-sm hover:border-bg">
              Résumé
            </a>
          )}
        </div>

        <ul className="relative mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-bg/15 pt-6 text-[14px] text-bg/70">
          {profile.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-bg">
                {s.label} <span className="text-bg/40">{s.handle}</span>
              </a>
            </li>
          ))}
          <li className="ml-auto text-bg/50">
            Press <kbd className="kbd border-bg/25 bg-transparent text-bg/70">/</kbd> to search anything
          </li>
        </ul>
      </div>
    </section>
  );
}
