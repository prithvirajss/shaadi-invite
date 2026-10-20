/**
 * Original SVG mandala motif used as a subtle rotating background accent.
 */
export default function MandalaPattern({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 12 });
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {petals.map((_, i) => {
        const angle = (360 / petals.length) * i;
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M100 15C108 35 108 50 100 60C92 50 92 35 100 15Z"
              fill="currentColor"
              opacity="0.35"
            />
            <circle cx="100" cy="30" r="3" fill="currentColor" opacity="0.5" />
          </g>
        );
      })}
      <circle cx="100" cy="100" r="10" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
