// When deployed to GitHub Pages as a project site (username.github.io/repo),
// the site is served from a subpath. next.config.ts reads the same env var
// to set Next's own `basePath`/`assetPrefix` (which auto-prefixes anything
// Next controls: next/font, CSS, metadata icons/OG images, app/manifest.ts).
// A handful of plain hardcoded `/public` references (e.g. the audio tag)
// aren't touched by that, so they go through this helper instead.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
