import type { NextConfig } from "next";

// Deployed statically to GitHub Pages at
// https://prithvirajss.github.io/shaadi-invite/ — a project site, so it's
// served from a subpath. The GitHub Actions workflow sets
// NEXT_PUBLIC_BASE_PATH via actions/configure-pages; `npm run dev`/local
// builds default to no base path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true, // no Image Optimization server on static export
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
