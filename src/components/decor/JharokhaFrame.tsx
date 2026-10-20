/**
 * Original SVG decorative arch inspired by Rajasthani "jharokha" window frames.
 * Used as a border frame around hero/section content.
 */
export default function JharokhaFrame({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 520V200C20 100 110 20 200 20C290 20 380 100 380 200V520"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path
        d="M45 520V205C45 115 120 45 200 45C280 45 355 115 355 205V520"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />
      {/* Scalloped arch crown */}
      <path
        d="M110 160C130 130 160 120 200 120C240 120 270 130 290 160"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.8"
      />
      {Array.from({ length: 7 }).map((_, i) => {
        const cx = 110 + i * (180 / 6);
        return (
          <circle
            key={i}
            cx={cx}
            cy={145 - 18 * Math.sin((Math.PI * i) / 6)}
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.7"
          />
        );
      })}
      {/* corner finials */}
      <circle cx="20" cy="30" r="8" fill="currentColor" opacity="0.5" />
      <circle cx="380" cy="30" r="8" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
