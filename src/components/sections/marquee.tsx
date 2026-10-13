import { skills } from "@/content/profile";

export function Marquee() {
  const items = skills.flatMap((g) => g.items);
  const row = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden border-y border-line py-5" aria-label="Skills">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <ul className="marquee-track flex w-max items-center">
        {row.map((item, i) => (
          <li key={i} className="flex items-center" aria-hidden={i >= items.length}>
            <span className="display px-6 text-3xl text-fg-2 italic md:text-4xl">{item}</span>
            <span className="text-accent" aria-hidden>✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
