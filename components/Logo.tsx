export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="9" fill="url(#gn-logo-g)" />
      {/* outer ring */}
      <circle cx="20" cy="20" r="13" stroke="rgba(255,255,255,0.92)" strokeWidth="1.8" fill="none" />
      {/* inner ring */}
      <circle cx="20" cy="20" r="7.5" stroke="rgba(255,255,255,0.60)" strokeWidth="1.2" fill="none" />
      {/* centre dot */}
      <circle cx="20" cy="20" r="2.4" fill="rgba(255,255,255,0.88)" />
      <defs>
        <linearGradient id="gn-logo-g" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#c8930a" />
          <stop offset="100%" stopColor="#9a7008" />
        </linearGradient>
      </defs>
    </svg>
  );
}
