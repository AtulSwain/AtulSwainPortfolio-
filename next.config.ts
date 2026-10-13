import type { NextConfig } from "next";

// When deploying to GitHub Pages under a sub-path (e.g. /AtulSwainPortfolio-),
// the deploy workflow sets PAGES_BASE_PATH. Locally and on Vercel it is empty.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
