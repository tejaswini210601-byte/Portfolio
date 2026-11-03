"use client";
import { useRef } from "react";
import { TIMELINE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";

/** One vertical path for education + experience. The spine draws with scroll; each stop lights up as it's reached. */
export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const p = useScrollProgress(listRef, 0.7, 0.55);
  const stops = [...TIMELINE].sort((a, b) => a.sort - b.sort);

  return (
    <section id="experience" className="section exp" aria-labelledby="exp-title">
      <div className="wrap">
        <SectionHead index="05" label="Experience & education" title="The path so" accent="far." id="exp-title" />
        <div className="tl-wrap">
        <span className="tl-spine" aria-hidden="true">
          <span style={{ transform: `scaleY(${p})` }} />
        </span>
        <ol className="tl" ref={listRef}>
          {stops.map((s, i) => {
            const lit = p >= (i + 0.35) / (stops.length + 0.6);
            return (
              <li key={s.title} className={`stop ${lit ? "lit" : ""}`}>
                <span className="dot" aria-hidden="true" />
                <p className="mono st-year">
                  {s.year} <span className="st-kind">{s.kind === "work" ? "Work" : "Education"}</span>
                </p>
                <h3 className="st-title">{s.title}</h3>
                <p className="st-place">{s.place}</p>
                <p className="st-detail">{s.detail}</p>
              </li>
            );
          })}
          <li className={`stop next ${p > 0.97 ? "lit" : ""}`}>
            <span className="dot" aria-hidden="true" />
            <div className="next-card">
              <p className="mono st-year">Next</p>
              <h3 className="st-title">
                Your <span className="accent">team?</span>
              </h3>
            </div>
          </li>
        </ol>
        </div>
      </div>
      <style>{`
        .tl-wrap{position:relative;margin-top:clamp(48px,7vh,80px);max-width:880px}
        .tl{position:relative;list-style:none;margin:0;padding:0 0 0 clamp(36px,6vw,90px);max-width:880px}
        .tl-spine{position:absolute;left:clamp(10px,2vw,30px);top:8px;bottom:40px;width:2px;background:var(--soft);border-radius:2px}
        .tl-spine span{position:absolute;inset:0;background:var(--ink);transform-origin:50% 0;border-radius:2px}
        .stop{position:relative;padding-bottom:clamp(40px,6vh,64px);opacity:.35;transition:opacity .6s var(--ease)}
        .stop.lit{opacity:1}
        .dot{position:absolute;left:calc(-1 * clamp(36px,6vw,90px) + clamp(10px,2vw,30px) - 7px);top:4px;width:16px;height:16px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--faint);transition:background .4s,box-shadow .4s,transform .6s var(--ease)}
        .stop.lit .dot{background:var(--ink);box-shadow:0 0 0 6px rgba(13,13,13,.08);transform:scale(1.1)}
        .st-year{margin:0;font-size:12px;color:var(--mute);display:flex;gap:10px;align-items:center}
        .st-kind{padding:3px 9px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--line);font-size:10px;text-transform:uppercase;letter-spacing:.06em}
        .st-title{margin:10px 0 0;font-size:clamp(22px,2.4vw,34px);font-weight:750;letter-spacing:-.04em;line-height:1.08}
        .st-place{margin:6px 0 0;font-weight:600;color:var(--ink-2)}
        .st-detail{margin:10px 0 0;color:var(--mute);line-height:1.6;max-width:62ch}
        .next-card{border:1.5px dashed rgba(13,13,13,.25);border-radius:24px;padding:24px 28px}
        .next-card .st-title{margin-top:6px}
      `}</style>
    </section>
  );
}
