import { Search } from "lucide-react";

const tiles = [
  ["#3b1d4f", "#c8f04a"],
  ["#1d2b4f", "#7fb7ff"],
  ["#4f1d2b", "#ff8a7f"],
  ["#1d4f3b", "#7fffcf"],
  ["#4f3b1d", "#ffd37f"],
  ["#2b1d4f", "#c57fff"],
  ["#1d3b4f", "#7fe3ff"],
];

/**
 * An illustration of OTAKUVA's interface layout (navigation, editorial hero,
 * rows). Shown until a real screenshot exists at public/images/projects/otakuva/cover.webp.
 */
export function OtakuvaPreview() {
  return (
    <div className="@container relative aspect-[16/10] overflow-hidden bg-[#08080a] text-white" aria-hidden>
      {/* Nav */}
      <div className="flex items-center gap-[3cqw] px-[4cqw] py-[2.4cqw] text-[1.6cqw]">
        <span className="font-display text-[2.2cqw] font-bold tracking-[0.12em]">OTAKUVA</span>
        <span className="ml-auto hidden gap-[2.4cqw] text-white/55 @[420px]:flex">
          <span className="text-white">Home</span>
          <span>Explore</span>
          <span>Schedule</span>
          <span>Library</span>
          <span>Community</span>
        </span>
        <span className="flex items-center gap-[1cqw] rounded-full border border-white/15 px-[1.6cqw] py-[0.6cqw] text-white/40">
          <Search className="size-[1.6cqw]" /> Search
        </span>
        <span className="size-[3cqw] rounded-full bg-gradient-to-br from-[#c8f04a] to-[#3b6b2a]" />
      </div>

      {/* Hero */}
      <div className="relative mx-[4cqw] h-[52%] overflow-hidden rounded-[1.4cqw]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 90% at 78% 40%, #3d2a6b 0%, transparent 60%), radial-gradient(40% 70% at 95% 90%, #c8f04a40 0%, transparent 70%), linear-gradient(110deg, #0b0b10 30%, #1a1430 100%)",
          }}
        />
        <svg className="absolute right-0 bottom-0 h-full w-[60%] opacity-70" viewBox="0 0 300 160" preserveAspectRatio="xMaxYMax slice">
          <path d="M0 160 L60 90 L90 110 L140 40 L180 95 L220 60 L300 120 L300 160 Z" fill="#000" opacity="0.55" />
          <circle cx="210" cy="55" r="26" fill="#fff" opacity="0.12" />
        </svg>
        <div className="relative flex h-full flex-col justify-center gap-[1.2cqw] px-[4cqw]">
          <span className="text-[1.3cqw] tracking-[0.2em] text-[#c8f04a]">ANIME · STUDIOS · PEOPLE · HISTORY</span>
          <span className="font-display text-[4.4cqw] leading-[1] font-bold italic">
            Your personal
            <br />
            anime life archive.
          </span>
          <span className="text-[1.5cqw] text-white/60">Track · Explore · Discuss · Remember</span>
          <span className="mt-[0.8cqw] w-max rounded-full bg-white px-[2cqw] py-[0.8cqw] text-[1.4cqw] font-semibold text-black">
            Explore anime →
          </span>
        </div>
      </div>

      {/* Row */}
      <div className="px-[4cqw] pt-[2.4cqw]">
        <span className="text-[1.5cqw] font-semibold text-white/80">Continue watching</span>
        <div className="mt-[1.2cqw] flex gap-[1.2cqw]">
          {tiles.map(([a, b], i) => (
            <span
              key={i}
              className="aspect-[2/3] flex-1 rounded-[0.8cqw]"
              style={{ background: `linear-gradient(160deg, ${b}55, ${a} 55%, #050505)` }}
            />
          ))}
        </div>
      </div>
      <span className="absolute right-[2cqw] bottom-[1.6cqw] rounded-full bg-black/60 px-[1.4cqw] py-[0.5cqw] text-[1.2cqw] text-white/50">
        Interface illustration
      </span>
    </div>
  );
}
