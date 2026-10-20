"use client";

import { useSearchParams } from "next/navigation";
import HomeClient from "./HomeClient";
import { events } from "@/content";
import type { EventKey } from "@/types";

export default function HomeClientWrapper() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("name");
  const eventsCode = searchParams.get("events");

  let visibleKeys: EventKey[] | null = null;
  if (eventsCode) {
    const codes = eventsCode.split(",").map((c) => c.trim().toLowerCase());
    const matched = events.filter((e) => codes.includes(e.shortCode)).map((e) => e.key);
    if (matched.length > 0) visibleKeys = matched;
  }

  return <HomeClient guestName={guestName} visibleKeys={visibleKeys} />;
}
