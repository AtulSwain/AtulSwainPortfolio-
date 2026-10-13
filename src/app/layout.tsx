import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MobileBar, Sidebar } from "@/components/layout/sidebar";
import { CommandPalette } from "@/components/layout/command-palette";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toast";
import { accentScript } from "@/components/ui/theme-controls";
import { profile } from "@/content/profile";
import { existing } from "@/lib/assets";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

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
    { media: "(prefers-color-scheme: light)", color: "#f2efe9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0d" },
  ],
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
  const photo = existing(profile.photo);

  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="lg:grid lg:grid-cols-[var(--sidebar)_1fr]">
            <Sidebar photo={photo} />
            <div className="min-w-0">
              <MobileBar photo={photo} />
              <main id="main" className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-12">
                {children}
              </main>
              <Footer />
            </div>
          </div>
          <CommandPalette />
          <Toaster />
        </ThemeProvider>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
