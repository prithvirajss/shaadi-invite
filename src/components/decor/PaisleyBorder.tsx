/**
 * Original repeating paisley (keri/ambi) motif used as a thin horizontal
 * border strip, e.g. above/below section titles.
 */
export default function PaisleyBorder({ className = "" }: { className?: string }) {
  const count = 10;
  return (
    <svg
      viewBox={`0 0 ${count * 40} 40`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {Array.from({ length: count }).map((_, i) => (
        <g key={i} transform={`translate(${i * 40} 0)`}>
          <path
            d="M20 6C28 6 34 12 34 20C34 28 28 32 22 32C18 32 15 29 15 25C15 22 17 20 20 20C21.5 20 22 21 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.7"
          />
          <circle cx="20" cy="22" r="1.4" fill="currentColor" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}
