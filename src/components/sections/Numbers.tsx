"use client";
import { useEffect, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import { prefersReducedMotion, useInView } from "@/lib/hooks";
import { ConceptIcon } from "../ui/TechLogo";

const COLORS = ["sun", "sky", "mint", "coral", "grape", "pink"];

function CountUp({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) return setV(to);
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1400);
      setV(Math.round(to * (1 - Math.pow(1 - k, 4)))); // easeOutQuart
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{v}{suffix}</>;
}

/** Big numbers from the résumé that count up when they scroll into view. */
export default function Numbers() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  return (
    <section id="numbers" className="section nums" aria-labelledby="nums-title">
      <div className="wrap">
        <p className="eyebrow rv">📈 Impact</p>
        <h2 className="h2 rv" id="nums-title">
          The story <span className="mark" style={{ ["--hl" as string]: "var(--sun)" }}>in numbers.</span>
        </h2>
        <div className="num-grid" ref={ref}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={a.label} className="num rv" style={{ ["--i" as string]: i, ["--c" as string]: `var(--${COLORS[i]})`, ["--cs" as string]: `var(--${COLORS[i]}-soft)` }}>
              <span className="num-ic"><ConceptIcon name={a.icon} size={26} stroke={2} /></span>
              <span className="num-v" aria-label={a.display ?? `${a.value}${a.suffix}`}>
                {a.display ?? <CountUp to={a.value} suffix={a.suffix} run={inView} />}
              </span>
              <h3>{a.label}</h3>
              <p>{a.caption}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .num-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:44px}
        .num{background:var(--cs);border-radius:28px;padding:24px;box-shadow:inset 0 0 0 2.5px var(--ink),0 6px 0 var(--ink);position:relative;overflow:hidden}
        .num::after{content:"";position:absolute;right:-30px;bottom:-30px;width:120px;height:120px;border-radius:50%;background:var(--c);opacity:.35}
        .num-ic{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:var(--c);box-shadow:inset 0 0 0 2px var(--ink)}
        .num-v{display:block;margin-top:14px;font-family:var(--font-fredoka);font-weight:650;font-size:clamp(52px,6vw,80px);line-height:1;font-variant-numeric:tabular-nums}
        .num h3{margin:8px 0 0;font-size:20px;font-weight:650}
        .num p{position:relative;z-index:1;margin:4px 0 0;color:var(--ink-2);font-size:15px;line-height:1.45}
        @media (max-width:900px){.num-grid{grid-template-columns:1fr 1fr}}
        @media (max-width:520px){.num-grid{grid-template-columns:1fr}}
      `}</style>
    </section>
  );
}
