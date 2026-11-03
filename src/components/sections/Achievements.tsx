"use client";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, type Achievement } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import { ConceptIcon } from "../ui/TechLogo";

/** Counts up from 0 the first time the card is seen (easeOutQuart, 1.4s). */
function CountUp({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) return setV(to);
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1400);
      setV(Math.round(to * (1 - Math.pow(1 - k, 4))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <span className="ach-num" aria-label={`${to}${suffix}`}>
      {v}
      {suffix}
    </span>
  );
}

/** Pinned horizontal gallery: vertical scroll moves the card track sideways. */
export default function Achievements() {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [travel, setTravel] = useState(0);
  const [seen, setSeen] = useState<boolean[]>(() => ACHIEVEMENTS.map(() => false));
  const [center, setCenter] = useState(0);

  useEffect(() => {
    const measure = () => {
      const tr = trackRef.current;
      if (!tr) return;
      setTravel(Math.max(0, tr.scrollWidth - window.innerWidth + 40));
    };
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const o = outerRef.current,
        tr = trackRef.current;
      if (!o || !tr) return;
      const r = o.getBoundingClientRect();
      const total = o.offsetHeight - innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      tr.style.transform = `translate3d(${-p * travel}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      // which card is nearest the viewport centre? which have been seen?
      const cards = Array.from(tr.querySelectorAll<HTMLElement>(".ach"));
      let best = 0,
        bestD = Infinity;
      const nextSeen: number[] = [];
      cards.forEach((c, i) => {
        const b = c.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - innerWidth / 2);
        if (d < bestD) (bestD = d), (best = i);
        if (b.left < innerWidth * 0.92 && b.right > 0 && r.top < innerHeight * 0.6) nextSeen.push(i);
      });
      setCenter(best);
      if (nextSeen.length) setSeen((s) => (nextSeen.some((i) => !s[i]) ? s.map((v, i) => v || nextSeen.includes(i)) : s));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, [travel]);

  const n = ACHIEVEMENTS.length;

  return (
    <section id="achievements" ref={outerRef} className="achs" style={{ height: `calc(100svh + ${travel}px)` }} aria-labelledby="ach-title">
      <div className="ach-pin">
        <div className="wrap ach-head">
          <div>
            <p className="tag rv">06 — Achievements</p>
            <h2 className="h2" id="ach-title">
              <span className="rv-mask"><span>By the <span className="accent">numbers.</span></span></span>
            </h2>
          </div>
          <span className="ach-prog" aria-hidden="true"><span ref={barRef} /></span>
        </div>
        <div className="ach-track" ref={trackRef}>
          {ACHIEVEMENTS.map((a: Achievement, i) => (
            <article key={a.label} className={`ach ${center === i ? "near" : ""}`}>
              <div className="ach-top">
                <span className="ach-logo"><ConceptIcon name={a.icon} size={34} stroke={1.4} /></span>
                <span className="mono ach-i">
                  {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
              </div>
              <div className="ach-bot">
                <div className="ach-text">
                  <h3>{a.label}</h3>
                  <p>{a.caption}</p>
                  <p className="mono ach-d">{a.detail}</p>
                </div>
                <CountUp to={a.value} suffix={a.suffix} run={seen[i]} />
              </div>
            </article>
          ))}
          <div className="ach-end">
            <span className="accent">and counting</span> →
          </div>
        </div>
      </div>
      <style>{`
        .achs{position:relative}
        .ach-pin{position:sticky;top:0;height:100svh;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:clamp(28px,5vh,56px)}
        .ach-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
        .ach-prog{width:min(220px,30vw);height:2px;background:var(--soft);border-radius:2px;overflow:hidden;margin-bottom:14px}
        .ach-prog span{display:block;height:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(0)}
        .ach-track{display:flex;gap:20px;padding-left:max(var(--gutter),calc((100vw - 1320px)/2));padding-right:var(--gutter);will-change:transform;width:max-content}
        .ach{flex:none;width:clamp(300px,40vw,540px);height:clamp(260px,36vh,310px);background:#fff;border-radius:28px;box-shadow:inset 0 0 0 1px var(--line);padding:24px 26px;display:flex;flex-direction:column;justify-content:space-between;transition:transform .7s var(--ease),box-shadow .7s var(--ease)}
        .ach.near{transform:translateY(-12px);box-shadow:inset 0 0 0 1px var(--line),0 40px 70px -36px rgba(0,0,0,.38)}
        .ach-top{display:flex;justify-content:space-between;align-items:flex-start}
        .ach-logo{width:72px;height:72px;border-radius:20px;display:grid;place-items:center;background:radial-gradient(closest-side,rgba(13,13,13,.08),transparent),var(--paper);transition:box-shadow .6s}
        .ach.near .ach-logo{box-shadow:0 0 0 6px rgba(13,13,13,.04),0 16px 30px -16px rgba(0,0,0,.35)}
        .ach-i{font-size:12px;color:var(--mute)}
        .ach-bot{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}
        .ach-text h3{margin:0;font-size:20px;font-weight:700;letter-spacing:-.03em}
        .ach-text p{margin:6px 0 0;font-size:14px;color:var(--ink-2);line-height:1.45;max-width:28ch}
        .ach-text .ach-d{font-size:11px;color:var(--mute)}
        .ach-num{font-weight:800;font-size:clamp(64px,8vw,118px);letter-spacing:-.06em;line-height:.85;font-variant-numeric:tabular-nums}
        .ach-end{flex:none;align-self:center;font-size:clamp(28px,3vw,44px);font-weight:600;letter-spacing:-.03em;padding:0 40px 0 20px;white-space:nowrap}
        @media (max-width:640px){.ach-text p{max-width:20ch}.ach{padding:20px}}
      `}</style>
    </section>
  );
}
