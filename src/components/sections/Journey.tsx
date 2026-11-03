"use client";
import { useRef } from "react";
import { CERTIFICATIONS, PROFILE, TIMELINE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";

/** Experience + education on one path. The road draws itself as you scroll; stops pop in when reached. */
export default function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const p = useScrollProgress(ref, 0.75, 0.5);
  const stops = [...TIMELINE].sort((a, b) => b.sort - a.sort); // newest first for recruiters

  return (
    <section id="journey" className="section journey" aria-labelledby="journey-title">
      <div className="wrap j-grid">
        <div className="j-head">
          <p className="eyebrow rv">🗺️ Experience & education</p>
          <h2 className="h2 rv" id="journey-title">
            My teaching <span className="mark" style={{ ["--hl" as string]: "var(--grape-soft)" }}>journey.</span>
          </h2>
          <p className="lead rv">From freelance robotics workshops to school classrooms, international online teaching and curriculum design.</p>
          <div className="j-btns rv">
            <a className="btn btn-sun" href={PROFILE.resume} download>Download résumé ↓</a>
            {PROFILE.linkedin && <a className="btn btn-white" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
          </div>
          <div className="certs rv">
            <h3>Always learning</h3>
            <ul>
              {CERTIFICATIONS.map((c) => (
                <li key={c.title}>
                  <b>{c.title}</b>
                  <span>{c.issuer} · {c.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="j-road">
          <span className="j-line" aria-hidden="true"><span style={{ transform: `scaleY(${p})` }} /></span>
          <ol ref={ref}>
            {stops.map((s, i) => {
              const lit = p >= (i + 0.2) / (stops.length + 0.4);
              return (
                <li key={s.title} className={`stop ${lit ? "lit" : ""} ${s.kind}`}>
                  <span className="dot" aria-hidden="true">{s.kind === "work" ? "💼" : "🎓"}</span>
                  <div className="stop-card">
                    <p className="stop-y">{s.year}</p>
                    <h3>{s.title}</h3>
                    <p className="stop-p">{s.place}</p>
                    <p className="stop-d">{s.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <style>{`
        .journey{background:var(--grape-soft);border-block:2px solid var(--ink)}
        .j-grid{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(32px,5vw,72px);align-items:start}
        .j-head{position:sticky;top:100px}
        .j-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}
        .certs{margin-top:30px;background:#fff;border-radius:24px;padding:20px 22px;box-shadow:inset 0 0 0 2px var(--ink)}
        .certs h3{margin:0;font-size:20px;font-weight:650}
        .certs ul{list-style:none;margin:10px 0 0;padding:0}
        .certs li{display:flex;flex-direction:column;padding:10px 0;border-top:1.5px dashed var(--line)}
        .certs b{font-weight:800;line-height:1.3}
        .certs span{font-size:14px;color:var(--mute)}
        .j-road{position:relative;padding-left:64px}
        .j-line{position:absolute;left:23px;top:10px;bottom:10px;width:6px;border-radius:6px;background:rgba(30,27,75,.12)}
        .j-line span{position:absolute;inset:0;border-radius:6px;background:repeating-linear-gradient(var(--ink) 0 14px,var(--sun) 14px 22px);transform-origin:50% 0}
        .j-road ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:22px}
        .stop{position:relative}
        .dot{position:absolute;left:-64px;top:14px;width:52px;height:52px;border-radius:50%;display:grid;place-items:center;font-size:22px;background:#fff;box-shadow:inset 0 0 0 2.5px var(--ink);transform:scale(.7);opacity:.5;transition:transform .5s var(--bounce),opacity .4s,background .3s}
        .stop.lit .dot{transform:none;opacity:1;background:var(--sun)}
        .stop.education.lit .dot{background:var(--mint)}
        .stop-card{background:#fff;border-radius:24px;padding:18px 22px;box-shadow:inset 0 0 0 2px var(--ink);opacity:.55;transform:translateX(12px);transition:opacity .5s,transform .6s var(--bounce),box-shadow .4s}
        .stop.lit .stop-card{opacity:1;transform:none;box-shadow:inset 0 0 0 2px var(--ink),0 5px 0 var(--ink)}
        .stop-y{margin:0;font-weight:800;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:var(--mute)}
        .stop-card h3{margin:4px 0 0;font-size:21px;font-weight:650;line-height:1.15}
        .stop-p{margin:4px 0 0;font-weight:800;color:var(--ink-2)}
        .stop-d{margin:8px 0 0;font-size:15px;color:var(--ink-2);line-height:1.55}
        @media (max-width:960px){.j-grid{grid-template-columns:1fr}.j-head{position:static}}
        @media (max-width:520px){.j-road{padding-left:52px}.dot{left:-52px;width:42px;height:42px;font-size:18px}.j-line{left:18px}}
      `}</style>
    </section>
  );
}
