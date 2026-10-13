export type Social = {
  label: string;
  href: string;
  handle?: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Profile = {
  name: string;
  firstName: string;
  /** Short line under your name in the hero. */
  role: string;
  /** Very short role shown in the sidebar. */
  shortRole: string;
  /** What you're up to right now — shown in the "Now" card. */
  now: string[];
  /** Words that rotate in the hero headline. */
  roles: string[];
  location: string;
  /** IANA time zone, used for the live clock. */
  timeZone: string;
  email: string;
  /** Leave empty ("") to hide the availability badge. */
  availability: string;
  /**
   * Path inside /public. Drop your photo at this path and it appears everywhere.
   * Until the file exists, a monogram is shown instead.
   */
  photo: string;
  /** Optional second photo for the About section. Falls back to `photo`. */
  aboutPhoto?: string;
  headline: { lead: string; emphasis: string; tail: string };
  intro: string;
  about: string[];
  pullQuote: string;
  facts: { label: string; value: string }[];
  socials: Social[];
  stats: Stat[];
  resume?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type JourneyEntry = {
  date: string;
  title: string;
  body: string;
  /** Slugs of projects from this chapter (linked automatically). */
  projects?: string[];
  current?: boolean;
};

export type EducationEntry = {
  period: string;
  title: string;
  place: string;
  body: string;
  tags?: string[];
};

export type ProjectCategory =
  | "AI"
  | "Data"
  | "Full-stack"
  | "Real-time"
  | "Business"
  | "Frontend";

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** One short line that sells the project. */
  tagline: string;
  summary: string;
  year: string;
  category: ProjectCategory;
  role: string;
  /** Featured projects get large cards on the home page. */
  featured?: boolean;
  /** Path inside /public. If missing, a designed cover is generated. */
  cover?: string;
  /** Two colours used for the generated cover and accents. */
  palette: [string, string];
  gallery?: ProjectImage[];
  stack: string[];
  links: { live?: string; code?: string };
  highlights: string[];
  metrics?: Stat[];
  sections: ProjectSection[];
};

export type DataStep = {
  title: string;
  body: string;
};

export type CaseStudy = {
  title: string;
  status: string;
  summary: string;
  question: string;
  data: string;
  methods: string;
  result: string;
  /** Slug of a project page with the full write-up, if any. */
  project?: string;
};
