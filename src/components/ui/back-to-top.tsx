"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="uppercase transition-colors hover:text-fg"
    >
      Back to top ↑
    </button>
  );
}
