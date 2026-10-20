export type Lang = "hi" | "en";

export type EventKey =
  | "mataPujan"
  | "ganeshPujan"
  | "mandap"
  | "haldi"
  | "sangeet"
  | "varNikasi"
  | "shubhLagna"
  | "ashirwad";

export interface WeddingEvent {
  key: EventKey;
  nameHi: string;
  nameEn: string;
  dayDateHi: string;
  dayDateEn: string;
  timeHi: string;
  timeEn: string;
  venueHi: string;
  venueEn: string;
  /** ISO datetime (IST) used for .ics + calendar generation */
  startIso: string;
  endIso: string;
  /** Google Maps URL — fill with real coordinates */
  mapUrl: string;
  noteHi?: string;
  noteEn?: string;
  /** Short code used in ?events= query param, e.g. "mp" for Mata Pujan */
  shortCode: string;
}

export interface FamilyGroup {
  titleHi: string;
  titleEn: string;
  namesHi: string;
  namesEn: string;
}

export interface RsvpPayload {
  name: string;
  phone: string;
  guestCount: number;
  events: EventKey[];
}

export interface Blessing {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  created_at: string;
}
