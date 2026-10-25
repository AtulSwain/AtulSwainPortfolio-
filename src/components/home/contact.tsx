import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { CopyButton } from "../ui/copy-button";
import { LocalTime } from "../ui/clock";
import { SocialIcon } from "../ui/social-icon";

export function Contact() {
  return (
    <section id="contact" className="container-page py-16 md:py-20">
      <div className="panel reveal relative isolate overflow-hidden px-7 py-10 md:px-12 md:py-14">
        <div aria-hidden className="absolute -top-32 -right-20 -z-10 size-[420px] rounded-full bg-accent/10 blur-3xl" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">
              <span className="text-accent">//</span> Let’s connect
            </p>
            <h2 className="display mt-3 text-[clamp(30px,4vw,52px)]">
              <span className="silver">Let’s Build Something</span> <span className="text-accent">Amazing</span>
            </h2>
            <p className="mt-3 text-[15px] text-fg-2">Open to opportunities, collaborations, and exciting projects.</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-fg-3">
              <span className="flex items-center gap-2">
                <span className="live-dot size-1.5 rounded-full bg-accent" /> {profile.availability}
              </span>
              <span>
                {profile.location} · <LocalTime timeZone={profile.timeZone} />
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <ul className="flex items-center gap-2">
              {profile.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="grid size-11 place-items-center rounded-full border border-line-strong text-fg-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <SocialIcon label={s.label} size={17} />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  title={profile.email}
                  className="grid size-11 place-items-center rounded-full border border-line-strong text-fg-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <Mail size={17} />
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <CopyButton text={profile.email} className="h-12 rounded-[10px] px-5" />
              <a href={`mailto:${profile.email}`} className="btn btn-lime group h-12">
                Get in Touch <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
