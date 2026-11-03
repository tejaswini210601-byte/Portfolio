/** Original cartoon kid (SVG). Different skin, hair and shirt per kid; arms go up when the parent has class "cheer". */
export type KidProps = {
  skin: string;
  hair: string;
  shirt: string;
  style: "bun" | "short" | "curly" | "ponytail" | "braids";
  flip?: boolean;
  glasses?: boolean;
};

export default function Kid({ skin, hair, shirt, style, flip, glasses }: KidProps) {
  return (
    <svg viewBox="0 0 160 220" className="kid" aria-hidden="true" style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      {/* back hair */}
      {style === "ponytail" && <path d="M120 60c26 6 30 40 16 62-4-18-10-30-22-38z" fill={hair} />}
      {style === "braids" && (
        <>
          <path d="M40 80c-8 30-6 60 2 80" stroke={hair} strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M120 80c8 30 6 60-2 80" stroke={hair} strokeWidth="12" strokeLinecap="round" fill="none" />
        </>
      )}
      {/* arms (raise on cheer) */}
      <g className="kid-arm l"><path d="M44 150c-14 10-22 26-24 44" stroke={shirt} strokeWidth="16" strokeLinecap="round" fill="none" /><circle cx="20" cy="196" r="8" fill={skin} /></g>
      <g className="kid-arm r"><path d="M116 150c14 10 22 26 24 44" stroke={shirt} strokeWidth="16" strokeLinecap="round" fill="none" /><circle cx="140" cy="196" r="8" fill={skin} /></g>
      {/* body */}
      <path d="M36 220c0-46 18-76 44-76s44 30 44 76z" fill={shirt} />
      <path d="M68 146c4 8 20 8 24 0" fill={skin} />
      {/* head */}
      <circle cx="80" cy="78" r="46" fill={skin} />
      <ellipse cx="36" cy="82" rx="8" ry="10" fill={skin} />
      <ellipse cx="124" cy="82" rx="8" ry="10" fill={skin} />
      {/* hair front */}
      {style === "short" && <path d="M34 72c0-34 22-50 46-50s46 16 46 50c-14-14-30-20-46-20-16 0-32 6-46 20z" fill={hair} />}
      {style === "curly" && (
        <g fill={hair}>
          {[[44, 56], [58, 40], [78, 34], [98, 38], [114, 52], [124, 70], [36, 72]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="16" />)}
        </g>
      )}
      {(style === "bun" || style === "ponytail" || style === "braids") && (
        <path d="M34 78c-2-36 20-56 46-56s48 20 46 56c-10-18-24-28-46-30-22 2-36 12-46 30z" fill={hair} />
      )}
      {style === "bun" && <circle cx="80" cy="22" r="16" fill={hair} />}
      {/* face */}
      <circle cx="64" cy="84" r="6" fill="#1E1B4B" />
      <circle cx="96" cy="84" r="6" fill="#1E1B4B" />
      <circle cx="66" cy="82" r="2" fill="#fff" />
      <circle cx="98" cy="82" r="2" fill="#fff" />
      {glasses && (
        <g fill="none" stroke="#1E1B4B" strokeWidth="3"><circle cx="64" cy="84" r="12" /><circle cx="96" cy="84" r="12" /><path d="M76 84h8" /></g>
      )}
      <ellipse cx="52" cy="100" rx="7" ry="4" fill="#FF8A80" opacity=".45" />
      <ellipse cx="108" cy="100" rx="7" ry="4" fill="#FF8A80" opacity=".45" />
      <path className="kid-smile" d="M68 102c6 8 18 8 24 0" stroke="#1E1B4B" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
