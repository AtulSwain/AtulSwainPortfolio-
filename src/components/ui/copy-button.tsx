"use client";

import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { copyText } from "./toast";

export function CopyButton({
  text,
  label = "Copy email",
  done = "Email copied",
  className,
}: {
  text: string;
  label?: string;
  done?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => copyText(text, done)}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-fg",
        className,
      )}
    >
      <Copy size={14} />
      {label}
    </button>
  );
}
