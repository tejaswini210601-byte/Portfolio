"use client";
import { useState } from "react";
import { FAMILIES, PROJECTS, SKILLS, type Family } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";
import TechLogo, { tintOf } from "../ui/TechLogo";

/** "The periodic table of my stack": every résumé skill is an element tile. */
export default function Skills() {
  const [filter, setFilter] = useState<Family | "All">("All");
  const [sel, setSel] = useState(SKILLS[0].name);
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const skill = SKILLS.find((s) => s.name === sel)!;
  const usedIn = PROJECTS.filter((p) => p.tech.includes(sel));
  const tint = tintOf(sel);

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead index="02" label="Skills" title="The periodic table of my" accent="stack." id="skills-title" />

        <div className="chips rv" role="group" aria-label="Filter skills by family">
          {(["All", ...FAMILIES] as const).map((f) => (
            <button key={f} className={`chip ${filter === f ? "on" : ""}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="pt-layout">
          <div ref={gridRef} className={`pt-grid ${inView ? "go" : ""}`}>
            {SKILLS.map((s, i) => {
              const row = Math.floor(i / 8),
                col = i % 8;
              const dim = filter !== "All" && s.family !== filter;
              return (
                <button
                  key={s.name}
                  className={`el ${dim ? "dim" : ""} ${sel === s.name ? "sel" : ""}`}
                  style={{ ["--d" as string]: `${(row + col) * 40}ms` }}
                  onMouseEnter={() => setSel(s.name)}
                  onFocus={() => setSel(s.name)}
                  onClick={() => setSel(s.name)}
                  aria-label={`${s.name}, ${s.family}`}
                >
                  <span className="el-n mono">{i + 1}</span>
                  <span className="el-s">{s.symbol}</span>
                  <span className="el-name">{s.name}</span>
                  <span className="el-f mono">{s.family}</span>
                </button>
              );
            })}
          </div>

          <aside className="inspector card" aria-live="polite">
            <div className="ins-logo" key={sel} style={{ ["--t" as string]: tint ?? "#0d0d0d" }}>
              <TechLogo name={sel} size={tint ? 110 : 96} />
            </div>
            <p className="mono ins-k">
              {String(SKILLS.indexOf(skill) + 1).padStart(2, "0")} · {skill.family}
            </p>
            <h3 className="ins-name">{skill.name}</h3>
            <p className="mono ins-k2">Used in</p>
            {usedIn.length ? (
              <ul className="ins-list">
                {usedIn.map((p) => (
                  <li key={p.id}>{p.title}</li>
                ))}
              </ul>
            ) : (
              <p className="ins-none">Part of the toolkit I teach and work with.</p>
            )}
          </aside>
        </div>
      </div>

      <style>{`
        .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:36px}
        .chip{height:36px;padding:0 16px;border-radius:999px;font-size:13.5px;font-weight:550;box-shadow:inset 0 0 0 1px rgba(13,13,13,.18);transition:background .3s,color .3s}
        .chip:hover{background:#fff}
        .chip.on{background:var(--ink);color:#fff;box-shadow:none}
        .pt-layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:24px;margin-top:28px;align-items:start}
        .pt-grid{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px}
        .el{position:relative;aspect-ratio:1/1.08;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);display:flex;flex-direction:column;justify-content:space-between;padding:8px 9px;text-align:left;opacity:0;transform:translate(-10px,14px) scale(.96);transition:opacity .6s var(--ease) var(--d),transform .7s var(--ease) var(--d),background .25s,color .25s,box-shadow .3s}
        .pt-grid.go .el{opacity:1;transform:none}
        .pt-grid.go .el.dim{opacity:.22}
        .el:hover,.el.sel{background:var(--ink);color:#fff;box-shadow:0 14px 30px -14px rgba(0,0,0,.5)}
        .el:hover .el-n,.el:hover .el-f,.el.sel .el-n,.el.sel .el-f{color:#bdbdbd}
        .el-n{font-size:9.5px;color:var(--mute)}
        .el-s{font-weight:750;font-size:clamp(18px,2vw,28px);letter-spacing:-.04em;line-height:1}
        .el-name{font-size:10.5px;font-weight:600;line-height:1.15;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
        .el-f{font-size:8.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute)}
        .inspector{position:sticky;top:96px;padding:24px;min-height:440px}
        .ins-logo{height:170px;border-radius:20px;display:grid;place-items:center;background:radial-gradient(closest-side,color-mix(in srgb,var(--t) 16%,transparent),transparent 80%),var(--paper);animation:pop .6s var(--ease)}
        @keyframes pop{0%{transform:scale(.86);opacity:0}100%{transform:none;opacity:1}}
        .ins-k{margin:18px 0 0;font-size:11px;color:var(--mute);text-transform:uppercase;letter-spacing:.06em}
        .ins-name{margin:6px 0 0;font-size:30px;font-weight:750;letter-spacing:-.04em;line-height:1.05}
        .ins-k2{margin:20px 0 8px;font-size:11px;color:var(--mute);text-transform:uppercase;letter-spacing:.06em}
        .ins-list{margin:0;padding:0;list-style:none}
        .ins-list li{padding:9px 0;border-top:1px solid var(--line);font-weight:550;font-size:14.5px}
        .ins-none{margin:0;color:var(--ink-2);font-size:14.5px}
        @media (max-width:1000px){.pt-layout{grid-template-columns:1fr}.inspector{position:static;min-height:0}}
        @media (max-width:640px){.pt-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.el-s{font-size:22px}}
      `}</style>
    </section>
  );
}
