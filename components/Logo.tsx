export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="9" fill="url(#gn-logo-g)" />
      <circle cx="20" cy="20" r="11" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" fill="none" />
      <text x="20" y="25" textAnchor="middle" fontSize="13" fontWeight="900" fontFamily="serif" fill="white">Au</text>
      <defs>
        <linearGradient id="gn-logo-g" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#c8930a" />
          <stop offset="100%" stopColor="#9a7008" />
        </linearGradient>
      </defs>
    </svg>
  );
}
