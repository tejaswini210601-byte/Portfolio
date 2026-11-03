"use client";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/hooks";

/**
 * "Cartoon Wini": an original, hand-drawn SVG character.
 * Interactive: head, eyes and hair follow the cursor (or finger) with a smooth lerp,
 * she blinks on her own, and tapping her makes her wave and "talk".
 *
 * How the "3D" feel works: each layer (back hair, face, eyes, front hair) moves a
 * different amount — the closer to the viewer, the more it moves (parallax).
 */
export default function Character({
  lines = [],
  size = 420,
  label = "Cartoon of Tejaswini",
  idleWave = true,
}: {
  lines?: string[];
  size?: number;
  label?: string;
  idleWave?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const frontRef = useRef<SVGGElement>(null);
  const backRef = useRef<SVGGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const [blink, setBlink] = useState(false);
  const [waving, setWaving] = useState(false);
  const [talking, setTalking] = useState(false);
  const [line, setLine] = useState(-1);

  // Cursor / touch tracking → smoothed with requestAnimationFrame
  useEffect(() => {
    const reduce = prefersReducedMotion();
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const t0 = performance.now();
    let lastMove = 0;
    const onMove = (cx: number, cy: number) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const ox = r.left + r.width / 2, oy = r.top + r.height * 0.42;
      tx = Math.max(-1, Math.min(1, (cx - ox) / (innerWidth * 0.45)));
      ty = Math.max(-1, Math.min(1, (cy - oy) / (innerHeight * 0.5)));
      lastMove = performance.now();
    };
    const pm = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => e.touches[0] && onMove(e.touches[0].clientX, e.touches[0].clientY);
    const loop = (t: number) => {
      // when nobody moves for a while, she looks around gently by herself
      if (t - lastMove > 3500) {
        const k = (t - t0) / 1000;
        tx = Math.sin(k * 0.7) * 0.45;
        ty = Math.sin(k * 0.45) * 0.2;
      }
      x += (tx - x) * 0.09;
      y += (ty - y) * 0.09;
      const set = (el: SVGGElement | null, mx: number, my: number, rot = 0) =>
        el && el.setAttribute("transform", `translate(${(x * mx).toFixed(2)} ${(y * my).toFixed(2)}) rotate(${(x * rot).toFixed(2)} 200 330)`);
      set(backRef.current, 5, 3, 3);
      set(headRef.current, 13, 9, 5);
      set(frontRef.current, 17, 11, 5.5);
      set(eyesRef.current, 22, 15, 5);
      set(bodyRef.current, 3, 1);
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) {
      addEventListener("pointermove", pm, { passive: true });
      addEventListener("touchmove", tm, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      removeEventListener("pointermove", pm);
      removeEventListener("touchmove", tm);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Natural blinking every 2.5–5.5s
  useEffect(() => {
    let to: ReturnType<typeof setTimeout>;
    const next = () => {
      to = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        next();
      }, 2500 + Math.random() * 3000);
    };
    next();
    return () => clearTimeout(to);
  }, []);

  // Say hello once shortly after she appears
  useEffect(() => {
    if (!idleWave || prefersReducedMotion()) return;
    const t = setTimeout(() => poke(), 1100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const poke = () => {
    setWaving(true);
    setTalking(true);
    if (lines.length) setLine((l) => (l + 1) % lines.length);
    setTimeout(() => setWaving(false), 1800);
    setTimeout(() => setTalking(false), 1500);
  };

  const SKIN = "#B57A57", SKIN_SH = "#9C6447", HAIR = "#1d1411";

  return (
    <div className="chr" ref={wrapRef} style={{ ["--s" as string]: `${size}px` }}>
      {lines.length > 0 && (
        <div className={`chr-bubble ${line >= 0 ? "on" : ""}`} aria-live="polite" key={line}>
          {line >= 0 ? lines[line] : ""}
        </div>
      )}
      <button className="chr-btn" onClick={poke} aria-label={`${label}. Tap to say hello.`}>
        <svg viewBox="0 0 400 480" width="100%" height="100%" role="img" aria-hidden="true">
          <defs>
            <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={HAIR} />
              <stop offset=".55" stopColor="#2a1914" />
              <stop offset="1" stopColor="#9a5a2c" />
            </linearGradient>
            <radialGradient id="faceGrad" cx=".45" cy=".4" r=".7">
              <stop offset="0" stopColor="#C68A66" />
              <stop offset="1" stopColor={SKIN} />
            </radialGradient>
            <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#ECE8F4" />
            </linearGradient>
            <radialGradient id="pearl" cx=".35" cy=".35" r=".7">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#E7DED2" />
            </radialGradient>
          </defs>

          {/* soft floor shadow */}
          <ellipse cx="200" cy="474" rx="150" ry="8" fill="rgba(30,27,75,.10)" />

          {/* BACK HAIR — long, wavy, brown ends */}
          <g ref={backRef}>
            <path
              fill="url(#hairGrad)"
              d="M200 92c-74 0-118 52-120 124-1 40-12 64-22 92-12 34-4 66 10 92 10 18 4 36 14 52 18 10 44 6 60-6l22-120h72l22 120c16 12 42 16 60 6 10-16 4-34 14-52 14-26 22-58 10-92-10-28-21-52-22-92-2-72-46-124-120-124z"
            />
            {/* curl highlights */}
            <path d="M86 330c10 20 2 40 16 58M318 330c-10 20-2 40-16 58M76 270c-6 18 0 34 8 48M324 270c6 18 0 34-8 48" stroke="#c0773f" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".55" />
          </g>

          {/* BODY — neck, shirt, pearls */}
          <g ref={bodyRef}>
            <path d="M176 300h48v58c0 10-48 10-48 0z" fill={SKIN_SH} />
            <path fill="url(#shirtGrad)" d="M60 480c4-70 40-112 104-124l36 52 36-52c64 12 100 54 104 124z" />
            <path d="M164 356l36 52-14 18-34-58zM236 356l-36 52 14 18 34-58z" fill="#fff" stroke="#D9D3E6" strokeWidth="2" />
            <path d="M200 408v72" stroke="#D9D3E6" strokeWidth="2" />
            <circle cx="200" cy="440" r="3.2" fill="#D9D3E6" />
            <circle cx="200" cy="466" r="3.2" fill="#D9D3E6" />
            <path d="M176 340c6 30 42 30 48 0" fill={SKIN} />
            {Array.from({ length: 15 }).map((_, i) => {
              const a = Math.PI * (0.12 + (0.76 * i) / 14);
              return <circle key={i} cx={200 - Math.cos(a) * 34} cy={338 + Math.sin(a) * 30} r="4.6" fill="url(#pearl)" stroke="#d8cfc2" strokeWidth=".8" />;
            })}
          </g>

          {/* HEAD */}
          <g ref={headRef}>
            {/* ears */}
            <ellipse cx="114" cy="230" rx="14" ry="20" fill={SKIN_SH} />
            <ellipse cx="286" cy="230" rx="14" ry="20" fill={SKIN_SH} />
            {/* face */}
            <path fill="url(#faceGrad)" d="M200 112c58 0 90 40 90 104 0 64-36 116-90 116s-90-52-90-116c0-64 32-104 90-104z" />
            {/* cheeks */}
            <ellipse cx="148" cy="262" rx="16" ry="9" fill="#E07E6A" opacity=".32" />
            <ellipse cx="252" cy="262" rx="16" ry="9" fill="#E07E6A" opacity=".32" />
            {/* eyebrows */}
            <path d="M140 186c12-9 30-10 44-4M216 182c14-6 32-5 44 4" stroke="#24160f" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* nose */}
            <path d="M200 238c-4 12-8 20-2 24 4 2 8 1 10-1" stroke={SKIN_SH} strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* mouth */}
            {talking ? (
              <g className="chr-talk">
                <ellipse cx="200" cy="292" rx="20" ry="12" fill="#5b2a2a" />
                <ellipse cx="200" cy="298" rx="11" ry="5" fill="#d9767a" />
              </g>
            ) : (
              <path d="M174 284c14 16 38 16 52 0" stroke="#8B4B4E" strokeWidth="6" fill="none" strokeLinecap="round" />
            )}
          </g>

          {/* EYES (move the most) */}
          <g ref={eyesRef}>
            <g className={`chr-eyes ${blink ? "blink" : ""}`}>
              {[164, 236].map((cx) => (
                <g key={cx}>
                  <ellipse cx={cx} cy="222" rx="17" ry="19" fill="#fff" />
                  <circle cx={cx} cy="224" r="11.5" fill="#4a2a17" />
                  <circle cx={cx} cy="224" r="5.8" fill="#120905" />
                  <circle cx={cx + 4} cy="219" r="3.4" fill="#fff" />
                  <path d={`M${cx - 18} 210c10-10 26-10 36 0`} stroke="#1a0f0b" strokeWidth="4" fill="none" strokeLinecap="round" />
                </g>
              ))}
            </g>
            {/* glasses: soft hexagon frames */}
            <g fill="none" stroke="#8F969E" strokeWidth="4.5" strokeLinejoin="round">
              <path d="M136 206l12-12h32l12 12v24l-12 14h-32l-12-14z" />
              <path d="M208 206l12-12h32l12 12v24l-12 14h-32l-12-14z" />
              <path d="M192 212c4-4 12-4 16 0" />
              <path d="M136 210l-22 4M264 210l22 4" />
            </g>
            <path d="M150 204l14-8" stroke="#fff" strokeWidth="3" opacity=".7" strokeLinecap="round" />
            <path d="M222 204l14-8" stroke="#fff" strokeWidth="3" opacity=".7" strokeLinecap="round" />
          </g>

          {/* FRONT HAIR — centre parting */}
          <g ref={frontRef}>
            <path fill={HAIR} d="M200 100c-54 0-96 34-100 96 18-8 30-28 40-50 14 20 34 30 56 32 2-30 4-56 4-78zM200 100c54 0 96 34 100 96-18-8-30-28-40-50-14 20-34 30-56 32-2-30-4-56-4-78z" />
            <path d="M200 102v26" stroke="#3a241b" strokeWidth="2" />
            <path d="M120 170c-14 40-12 80-4 108M280 170c14 40 12 80 4 108" stroke={HAIR} strokeWidth="18" fill="none" strokeLinecap="round" />
          </g>

          {/* WAVING ARM */}
          <g className={`chr-arm ${waving ? "wave" : ""}`}>
            <path d="M318 470c10-50 18-92 28-128" stroke="#fff" strokeWidth="34" strokeLinecap="round" fill="none" />
            <path d="M318 470c10-50 18-92 28-128" stroke="#E6E1EF" strokeWidth="34" strokeLinecap="round" fill="none" opacity=".35" />
            <g transform="translate(348 320)">
              <ellipse cx="0" cy="0" rx="20" ry="23" fill={SKIN} />
              <path d="M-14-14v-16M-5-20v-18M5-20v-17M14-14v-13" stroke={SKIN} strokeWidth="9" strokeLinecap="round" />
              <path d="M-20 4l-12-10" stroke={SKIN} strokeWidth="9" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </button>

      <style>{`
        .chr{position:relative;width:var(--s);max-width:100%;aspect-ratio:400/480}
        .chr-btn{display:block;width:100%;height:100%;padding:0;border-radius:40px;cursor:pointer;-webkit-tap-highlight-color:transparent}
        .chr-btn:focus-visible{outline:3px solid var(--grape);outline-offset:6px}
        .chr-eyes{transform-box:fill-box;transform-origin:center;transition:transform .07s}
        .chr-eyes.blink{transform:scaleY(.08)}
        .chr-arm{transform-box:view-box;transform-origin:318px 470px;transform:rotate(26deg) translateY(90px);opacity:0;transition:transform .5s var(--bounce),opacity .3s}
        .chr-arm.wave{opacity:1;transform:rotate(0) translateY(0);animation:wave .45s ease-in-out .35s 3 alternate}
        @keyframes wave{to{transform:rotate(-14deg)}}
        .chr-talk{animation:talk .18s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
        @keyframes talk{to{transform:scaleY(.45)}}
        .chr-bubble{position:absolute;z-index:2;top:2%;right:-6%;max-width:230px;background:#fff;color:var(--ink);border-radius:22px 22px 22px 6px;padding:12px 16px;font-family:var(--font-display);font-weight:600;font-size:16px;line-height:1.3;box-shadow:0 14px 30px -14px rgba(30,27,75,.35),inset 0 0 0 2px var(--ink);opacity:0;transform:translateY(8px) scale(.9);transform-origin:0 100%;transition:opacity .3s,transform .5s var(--bounce);pointer-events:none}
        .chr-bubble.on{opacity:1;transform:none}
        @media (max-width:640px){.chr-bubble{right:0;top:-4%;font-size:14px;max-width:180px}}
      `}</style>
    </div>
  );
}
