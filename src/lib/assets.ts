import "server-only";
import fs from "node:fs";
import path from "node:path";

/** True when a file exists in /public. Runs at build time, so dropping in a photo just works. */
export function publicFileExists(src?: string): src is string {
  if (!src || /^https?:\/\//.test(src)) return Boolean(src);
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/** Returns the path if the file exists, otherwise undefined. */
export const existing = (src?: string) => (publicFileExists(src) ? src : undefined);
