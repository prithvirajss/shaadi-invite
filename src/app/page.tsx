import { Suspense } from "react";
import HomeClientWrapper from "@/components/HomeClientWrapper";

// Statically exported (GitHub Pages has no server), so ?name=/?events=
// are read client-side by HomeClientWrapper via useSearchParams, which
// requires a Suspense boundary at build time.
export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeClientWrapper />
    </Suspense>
  );
}
