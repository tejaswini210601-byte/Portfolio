"use client";
import { useEffect, useRef } from "react";
import { BUBBLES, HERO, PROFILE } from "@/lib/data";
import { useAudience } from "@/lib/audience";
import { prefersReducedMotion } from "@/lib/hooks";
import { scrollToTarget } from "@/lib/scroll";
import Character from "../art/Character";
import Robot from "../art/Robot";
import { AudienceSwitch } from "../Navigation";

/** Playful bits floating around the character. depth = how much they move with the mouse (3D parallax). */
const BITS = [
  { k: "robot", x: "0%", y: "50%", d: 40, s: 96 },
  { k: "blocks", x: "74%", y: "64%", d: 32, s: 92 },
  { k: "pi", x: "8%", y: "12%", d: 26, s: 64 },
  { k: "star", x: "86%", y: "86%", d: 48, s: 52 },
  { k: "gear", x: "86%", y: "36%", d: 18, s: 58 },
  { k: "plus", x: "0%", y: "36%", d: 52, s: 42 },
];

function Bit({ k }: { k: string }) {
  switch (k) {
    case "robot":
      return <Robot />;
    case "blocks":
      return (
        <svg viewBox="0 0 100 90" aria-hidden="true">
          <path d="M6 10h34v6h10v-6h44v26H6z" fill="#FFC93C" stroke="#1E1B4B" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M18 44h30v6h10v-6h36v26H18z" fill="#4D96FF" stroke="#1E1B4B" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M6 76h88" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "pi":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="3" y="3" width="58" height="58" rx="16" fill="#2EC4B6" stroke="#1E1B4B" strokeWidth="3.5" />
          <text x="32" y="44" textAnchor="middle" fontSize="34" fontWeight="700" fill="#fff" fontFamily="var(--font-fredoka)">π</text>
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 60 60" aria-hidden="true">
          <path d="M30 4l7.6 15.6 17.2 2.5-12.4 12.1 2.9 17.1L30 43.2l-15.3 8.1 2.9-17.1L5.2 22.1l17.2-2.5z" fill="#FF8FB1" stroke="#1E1B4B" strokeWidth="3.5" strokeLinejoin="round" />
        </svg>
      );
    case "gear":
      return (
        <svg viewBox="0 0 60 60" aria-hidden="true" className="spin-slow">
          <path d="M26 4h8l1.5 7 5 2 6-4 5.5 5.5-4 6 2 5 7 1.5v8l-7 1.5-2 5 4 6-5.5 5.5-6-4-5 2L34 56h-8l-1.5-7-5-2-6 4-5.5-5.5 4-6-2-5L4 34v-8l7-1.5 2-5-4-6L14.5 8l6 4 5-2z" fill="#8B5CF6" stroke="#1E1B4B" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="30" cy="30" r="8" fill="#fff" stroke="#1E1B4B" strokeWidth="3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path d="M16 4h8v12h12v8H24v12h-8V24H4v-8h12z" fill="#FF6B6B" stroke="#1E1B4B" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function Hero() {
  const { who } = useAudience();
  const h = HERO[who];
  const stageRef = useRef<HTMLDivElement>(null);

  // 3D tilt + parallax of the floating bits, following the pointer
  useEffect(() => {
    const st = stageRef.current;
    if (!st || prefersReducedMotion()) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const on = (e: PointerEvent) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
    };
    const loop = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      st.style.setProperty("--px", x.toFixed(3));
      st.style.setProperty("--py", y.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", on, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("pointermove", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-dots" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy" key={who}>
          <div className="hero-switch rv is-in"><AudienceSwitch big /></div>
          <p className="eyebrow hero-eye">{h.eyebrow}</p>
          <h1 id="hero-title" className="hero-h1">
            {h.title[0]} <span className="mark" style={{ ["--hl" as string]: who === "parents" ? "var(--sun)" : "var(--mint)" }}>{h.title[1]}</span> {h.title[2]}
          </h1>
          <p className="hero-sub">{h.sub}</p>
          <div className="hero-ctas">
            {"download" in h.primary ? (
              <a className="btn btn-sun" href={h.primary.href} download>{h.primary.label} ↓</a>
            ) : (
              <a className="btn btn-sun" href={h.primary.href}>{h.primary.label} →</a>
            )}
            <button className="btn btn-white" onClick={() => scrollToTarget(h.secondary.target)}>{h.secondary.label}</button>
          </div>
          <ul className="hero-trust">
            <li><b>500+</b> students</li>
            <li><b>6+</b> years</li>
            <li><b>Ages 5–17</b></li>
          </ul>
        </div>

        <div className="stage" ref={stageRef}>
          <div className="stage-tilt">
            <div className="blob" aria-hidden="true" />
            <p className="tap-hint" aria-hidden="true">👆 Tap me!</p>
            <div className="stage-char">
              <Character lines={BUBBLES[who]} size={440} label={`Cartoon of ${PROFILE.name}`} />
            </div>
            {BITS.map((b, i) => (
              <span key={b.k} className="bit" style={{ left: b.x, top: b.y, width: b.s, ["--d" as string]: b.d, ["--fd" as string]: `${i * -0.8}s` }}>
                <span className="float" style={{ ["--fr" as string]: `${i % 2 ? -6 : 6}deg`, display: "block" }}><Bit k={b.k} /></span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero{position:relative;min-height:100svh;display:flex;align-items:center;padding:110px 0 70px;overflow:hidden}
        .hero-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(30,27,75,.13) 1.4px,transparent 1.6px);background-size:26px 26px;mask-image:radial-gradient(ellipse at 70% 45%,#000 20%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse at 70% 45%,#000 20%,transparent 70%)}
        .hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:clamp(24px,4vw,64px);align-items:center}
        .hero-copy{animation:copyin .7s var(--bounce) both}
        @keyframes copyin{from{opacity:0;transform:translateY(16px)}}
        .hero-switch{margin-bottom:22px}
        .hero-eye{font-size:12px}
        .hero-h1{font-weight:650;font-size:clamp(42px,5.6vw,80px);line-height:1.02;letter-spacing:-.02em;margin:18px 0 0}
        .hero-sub{margin:20px 0 0;font-size:clamp(17px,1.4vw,19.5px);color:var(--ink-2);max-width:50ch}
        .hero-ctas{display:flex;flex-wrap:wrap;gap:14px;margin-top:30px}
        .hero-trust{list-style:none;display:flex;flex-wrap:wrap;gap:10px;margin:28px 0 0;padding:0}
        .hero-trust li{background:#fff;border-radius:999px;padding:8px 14px;font-size:14.5px;box-shadow:inset 0 0 0 1.5px var(--line)}
        .hero-trust b{font-family:var(--font-fredoka);font-weight:650}

        .stage{position:relative;perspective:1200px;--px:0;--py:0}
        .stage-tilt{position:relative;aspect-ratio:1/1.02;transform-style:preserve-3d;transform:rotateY(calc(var(--px)*10deg)) rotateX(calc(var(--py)*-8deg))}
        .blob{position:absolute;inset:8% 6% 4%;border-radius:46% 54% 50% 50%/52% 46% 54% 48%;background:var(--sun);box-shadow:inset 0 0 0 3px var(--ink),0 10px 0 var(--ink);animation:morph 12s ease-in-out infinite;transform:translateZ(-40px)}
        @keyframes morph{50%{border-radius:56% 44% 42% 58%/44% 58% 42% 56%}}
        .tap-hint{position:absolute;z-index:3;left:6%;bottom:12%;margin:0;background:#fff;border-radius:999px;padding:6px 14px;font-family:var(--font-fredoka);font-weight:600;font-size:15px;box-shadow:inset 0 0 0 2px var(--ink),0 4px 0 var(--ink);transform:translateZ(70px) rotate(-6deg);animation:nudge 2.4s ease-in-out infinite}
        @keyframes nudge{50%{transform:translateZ(70px) rotate(-6deg) translateY(-6px)}}
        .stage-char{position:absolute;left:50%;bottom:4%;width:78%;transform:translateX(-50%) translateZ(30px);display:flex;justify-content:center}
        .stage-char .chr{width:100%}
        .bit{position:absolute;transform:translate3d(calc(var(--px)*var(--d)*-1px),calc(var(--py)*var(--d)*-1px),60px);filter:drop-shadow(0 6px 0 rgba(30,27,75,.18))}
        .bit svg{width:100%;height:auto;display:block}
        .spin-slow{animation:spin 14s linear infinite}
        .robot-eyes{animation:rblink 4s infinite;transform-box:fill-box;transform-origin:center}
        @keyframes rblink{0%,92%,100%{transform:none}95%{transform:scaleY(.1)}}
        .robot-tip{animation:tip 1.2s ease-in-out infinite alternate}
        @keyframes tip{to{fill:#FFC93C}}

        @media (max-width:960px){
          .hero{padding-top:96px}
          .hero-grid{grid-template-columns:1fr}
          .stage{order:-1;max-width:460px;width:100%;margin:0 auto}
        }
      `}</style>
    </section>
  );
}
