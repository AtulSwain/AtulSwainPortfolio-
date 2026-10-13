import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { CopyButton } from "../ui/copy-button";
import { LocalTime } from "../ui/clock";
import { SocialIcon } from "../ui/social-icon";

export function Contact() {
  return (
    <section id="contact" className="container-page py-16 md:py-24">
      <div className="panel ring-gradient reveal relative isolate overflow-hidden px-6 py-16 text-center md:px-12 md:py-24">
        <div aria-hidden className="backdrop opacity-80" style={{ height: "100%" }} />
        <p className="pill">
          <span className="live-dot size-2 rounded-full bg-emerald-500" />
          {profile.availability || "Get in touch"}
        </p>
        <h2 className="display mx-auto mt-6 max-w-3xl text-[clamp(40px,6vw,76px)]">
          Have an idea? <span className="gradient-text">Let’s build it.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-fg-2">
          A project, a role, or a dataset with a question in it — I’d love to hear about it.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-fg px-6 text-[14.5px] font-medium text-bg"
          >
            <Mail size={16} /> {profile.email}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <CopyButton text={profile.email} className="h-12 px-6" />
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13.5px] text-fg-2">
          {profile.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-fg">
              <SocialIcon label={s.label} /> {s.handle ?? s.label}
            </a>
          ))}
          <span className="inline-flex items-center gap-2">
            {profile.location} · <LocalTime timeZone={profile.timeZone} />
          </span>
        </div>
      </div>
    </section>
  );
}
