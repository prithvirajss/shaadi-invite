"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import OpeningScreen from "./OpeningScreen";
import CoupleSection from "./CoupleSection";
import LanguageToggle from "./LanguageToggle";
import MusicPlayer from "./MusicPlayer";
import type { EventKey } from "@/types";

// Below-the-fold sections are lazy-loaded to keep the initial bundle small
// for guests opening the link over mobile 4G.
const EventTimeline = dynamic(() => import("./EventTimeline"));
const FamilySection = dynamic(() => import("./FamilySection"));
const RsvpForm = dynamic(() => import("./RsvpForm"));
const BlessingsWall = dynamic(() => import("./BlessingsWall"));
const ContactSection = dynamic(() => import("./ContactSection"));

export default function HomeClient({
  guestName,
  visibleKeys,
}: {
  guestName: string | null;
  visibleKeys: EventKey[] | null;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {!opened && <OpeningScreen guestName={guestName} onOpened={() => setOpened(true)} />}

      <div className="fixed top-4 right-4 z-30">
        <LanguageToggle />
      </div>

      <CoupleSection />
      <EventTimeline visibleKeys={visibleKeys} />
      <FamilySection />
      <RsvpForm defaultName={guestName} visibleKeys={visibleKeys} />
      <BlessingsWall />
      <ContactSection />
      <MusicPlayer />
    </main>
  );
}
