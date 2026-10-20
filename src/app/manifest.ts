import type { MetadataRoute } from "next";
import { siteMeta } from "@/content";
import { BASE_PATH } from "@/lib/basePath";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMeta.titleHi,
    short_name: "P & P Wedding",
    description: siteMeta.ogDescription,
    start_url: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#FFF8EC",
    theme_color: "#6B0F1A",
    lang: "hi",
    icons: [
      { src: `${BASE_PATH}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${BASE_PATH}/icons/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
  };
}
