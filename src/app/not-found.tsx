import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative grid min-h-[80dvh] place-items-center px-4 pt-28 pb-20 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(200_240_74/0.08),transparent_70%)]" />
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-6 text-[clamp(56px,10vw,128px)]">
          <span className="silver">Lost</span> <span className="text-accent">the plot.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-fg-2">
          This page doesn’t exist. Press <kbd className="kbd">/</kbd> to search, or head back home.
        </p>
        <Link href="/" className="btn btn-light mt-10">
          Back home
        </Link>
      </div>
    </div>
  );
}
