import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative grid min-h-[80dvh] place-items-center px-4 pt-28 pb-20 text-center">
      <div className="backdrop" aria-hidden />
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-6 text-[clamp(56px,10vw,128px)]">
          Lost <span className="gradient-text">the plot.</span>
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
