import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[75dvh] place-items-center py-20 text-center">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-6 text-[clamp(64px,11vw,160px)] leading-[0.88]">
          Lost <em className="text-accent">the plot.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-fg-2">
          This page doesn’t exist. Press <kbd className="kbd">/</kbd> to search, or head back home.
        </p>
        <Link href="/" className="mt-10 inline-flex h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg">
          Back home
        </Link>
      </div>
    </div>
  );
}
