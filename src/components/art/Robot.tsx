/** A friendly original robot (SVG) with blinking LED eyes and a spinning antenna light. */
export default function Robot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 130" className={`robot ${className}`} aria-hidden="true">
      <line x1="60" y1="8" x2="60" y2="24" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />
      <circle className="robot-tip" cx="60" cy="8" r="6" fill="#FF6B6B" />
      <rect x="22" y="24" width="76" height="54" rx="16" fill="#4D96FF" stroke="#1E1B4B" strokeWidth="4" />
      <rect x="32" y="36" width="56" height="30" rx="10" fill="#1E1B4B" />
      <g className="robot-eyes">
        <circle cx="48" cy="51" r="6" fill="#7CF5E0" />
        <circle cx="72" cy="51" r="6" fill="#7CF5E0" />
      </g>
      <rect x="30" y="82" width="60" height="30" rx="10" fill="#FFC93C" stroke="#1E1B4B" strokeWidth="4" />
      <circle cx="46" cy="97" r="4" fill="#FF6B6B" />
      <circle cx="60" cy="97" r="4" fill="#2EC4B6" />
      <circle cx="74" cy="97" r="4" fill="#8B5CF6" />
      <circle cx="40" cy="120" r="9" fill="#1E1B4B" />
      <circle cx="80" cy="120" r="9" fill="#1E1B4B" />
      <circle cx="40" cy="120" r="3" fill="#fff" />
      <circle cx="80" cy="120" r="3" fill="#fff" />
    </svg>
  );
}
