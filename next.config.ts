import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo-name>, so we read that from an env var.
// Locally it is empty, so the site runs at http://localhost:3000/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export", // build a plain static site into /out (no server needed)
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
