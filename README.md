# Atul Swain — Portfolio

My personal portfolio: who I am, what I've built, the journey so far, data science work and education.

**Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · next-themes · Playwright

**Features:** dark-first design with light mode · floating nav · hero with profile card · services, principles and stats · featured projects in browser frames · timeline · data-science case studies · skills with a usage chart computed from your projects · ⌘K / `/` command palette · ←/→ between case studies · CSS-only scroll animations (content never depends on JavaScript)

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm start          # serve ./out at http://localhost:4173
npm run typecheck
npm test           # Playwright browser tests (build first)
npm run check      # all of the above
```

The first time you run tests: `npx playwright install chromium`.

Needs Node 20.9 or newer.

## Updating the site

All content lives in `src/content/`. You never need to touch components to change what the site says.

| What | Where |
|---|---|
| Name, intro, about text, stats, services, principles, socials, email, availability | `src/content/profile.ts` → `profile` |
| Skills / toolkit | `src/content/profile.ts` → `skills` |
| Journey timeline | `src/content/profile.ts` → `journey` |
| Education & what you're studying | `src/content/profile.ts` → `education`, `studying` |
| Projects (each gets its own page at `/work/<slug>`) | `src/content/projects.ts` |
| Data science process & case studies | `src/content/data-science.ts` |

### Add your photo

Put a portrait at `public/images/profile/photo.jpg` (about 1200×1500). It replaces the monogram everywhere automatically.
Optionally add `public/images/profile/about.jpg` for a different photo in the About section.

### Add a project

1. Create `public/images/projects/<slug>/` and put a `cover.webp` (or .jpg/.png) in it — a 16:10 screenshot works best.
2. Add an entry to `src/content/projects.ts` (copy an existing one). Set `featured: true` to show it as a big card on the home page.
3. Optional: add `gallery` images and `metrics`.

No screenshot yet? Leave `cover` out and a designed cover is generated from the project's `palette` colours.

### Add a data science project

Edit the first entry in `src/content/data-science.ts`. For a full write-up, also add it to `projects.ts` with `category: "Data"` and set the case study's `project` field to its slug.

### Résumé

Put a PDF at `public/resume.pdf` and set `resume: "/resume.pdf"` in `profile.ts`.

## Deploying

### GitHub Pages (included)

`.github/workflows/deploy.yml` type-checks, builds and runs the browser tests on every push and pull request.
Pushes to `main` that pass are deployed. A broken change never goes live.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Vercel

Import the repo on vercel.com — no settings needed. Set `NEXT_PUBLIC_SITE_URL` to your domain for correct social previews.

## Structure

```
src/
  app/                 routes: home, /work, /work/[slug], 404, sitemap, robots
  components/
    layout/            navbar (+ mobile menu), command palette, footer
    home/              hero, about, work, journey, data science, skills, education, contact
    work/              archive browser (filter + grid/list), case-study keyboard paging
    ui/                building blocks (portrait, covers, clock, toast, theme controls…)
  content/             ← everything you edit
  lib/                 helpers
public/images/         photos and project screenshots
tests/                 Playwright tests (every page, mobile + desktop, palette, filters, no-JS)
```
