// Lightweight profanity filter for the blessings wall.
// Not exhaustive — intended as a simple first line of defense before
// admin approval. Extend this list as needed.
const BLOCKED_WORDS = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "bastard",
  "randi",
  "chutiya",
  "madarchod",
  "bhenchod",
  "behenchod",
  "gandu",
  "harami",
  "saala kutta",
  "kamina",
];

export function containsProfanity(text: string): boolean {
  const normalized = text.toLowerCase().replace(/[^a-z\s]/g, "");
  return BLOCKED_WORDS.some((word) => normalized.includes(word));
}
