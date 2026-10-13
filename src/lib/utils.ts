import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a /public path with the deploy base path (needed on GitHub Pages). */
export const asset = (path: string) => (path.startsWith("/") ? `${base}${path}` : path);

export const pad = (n: number) => String(n).padStart(2, "0");
