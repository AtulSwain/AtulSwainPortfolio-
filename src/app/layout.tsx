import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { CommandPalette } from "@/components/layout/command-palette";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toast";
import { SpotlightTracker } from "@/components/ui/spotlight-tracker";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

const description = `${profile.name} — ${profile.role}. ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`),
  title: { default: `${profile.name} — Portfolio`, template: `%s — ${profile.name}` },
  description,
  authors: [{ name: profile.name }],
  openGraph: { type: "website", title: `${profile.name} — Portfolio`, description, siteName: profile.name },
  twitter: { card: "summary_large_image", title: `${profile.name} — Portfolio`, description },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#070707" },
  ],
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  url: siteUrl,
  sameAs: profile.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${sora.variable}`}>
      <body className="min-h-dvh antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="relative isolate">
          {children}
        </main>
        <Footer />
        <CommandPalette />
        <Toaster />
        <SpotlightTracker />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
