import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 text-[13px] text-fg-3">
        <span>
          © {new Date().getFullYear()} {profile.name} · Built with Next.js
        </span>
        <span className="flex items-center gap-5">
          <Link href="/work/" className="link-draw hover:text-fg">All work</Link>
          <a href={`mailto:${profile.email}`} className="link-draw hover:text-fg">Email</a>
          <a href="#main" className="link-draw hover:text-fg">Back to top ↑</a>
        </span>
      </div>
    </footer>
  );
}
