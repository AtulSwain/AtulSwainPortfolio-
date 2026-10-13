import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[80dvh] place-items-center pt-24 text-center">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-6 text-[clamp(72px,14vw,200px)] leading-[0.85]">
          Lost <em className="text-accent">the plot.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-fg-2">This page doesn’t exist — but plenty of others do.</p>
        <Link
          href="/"
          className="mt-10 inline-flex h-12 items-center rounded-full bg-fg px-6 text-sm font-medium text-bg"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
