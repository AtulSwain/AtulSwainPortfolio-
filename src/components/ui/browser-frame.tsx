import { cn } from "@/lib/utils";

/** Wraps a screenshot in a minimal browser window. */
export function BrowserFrame({ url, children, className }: { url?: string; children: React.ReactNode; className?: string }) {
  const host = url?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className={cn("overflow-hidden rounded-[14px] border border-line bg-bg-sunk", className)}>
      <div className="flex items-center gap-3 border-b border-line px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        {host && (
          <span className="mx-auto max-w-[70%] truncate rounded-md bg-bg-elev px-3 py-0.5 font-mono text-[10.5px] text-fg-3">
            {host}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
