export default function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1="0" y1="12" x2="95" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <line x1="145" y1="12" x2="240" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <path
        d="M110 12C112 6 118 4 120 4C122 4 128 6 130 12C128 18 122 20 120 20C118 20 112 18 110 12Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="120" cy="12" r="2.2" fill="var(--color-ivory, #FFF8EC)" />
    </svg>
  );
}
