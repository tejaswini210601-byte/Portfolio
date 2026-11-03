"use client";
import { useState } from "react";
import { FAMILIES, SKILLS, type Family } from "@/lib/data";
import TechLogo from "../ui/TechLogo";

const FAM_COLOR: Record<Family, string> = {
  Coding: "sun", Robotics: "coral", Mathematics: "pink", Teaching: "mint", EdTech: "sky", AI: "grape", Tools: "sky",
};

/** Skills as colourful sticker tiles, filterable by family. Every skill is from the résumé. */
export default function Skills() {
  const [f, setF] = useState<Family | "All">("All");
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="wrap">
        <p className="eyebrow rv">🧰 Skills</p>
        <h2 className="h2 rv" id="skills-title">
          My teaching <span className="mark" style={{ ["--hl" as string]: "var(--sun)" }}>toolbox.</span>
        </h2>
        <div className="sk-chips rv" role="group" aria-label="Filter skills">
          {(["All", ...FAMILIES] as const).map((x) => (
            <button key={x} className={`sk-chip ${f === x ? "on" : ""}`} aria-pressed={f === x} onClick={() => setF(x)}>{x}</button>
          ))}
        </div>
        <ul className="sk-grid">
          {SKILLS.filter((s) => f === "All" || s.family === f).map((s, i) => (
            <li key={s.name} className="sk" style={{ ["--c" as string]: `var(--${FAM_COLOR[s.family]}-soft)`, ["--d" as string]: `${Math.min(i, 24) * 22}ms` }}>
              <span className="sk-ic"><TechLogo name={s.name} size={22} /></span>
              <span className="sk-t">{s.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .sk-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:30px}
        .sk-chip{height:40px;padding:0 16px;border-radius:999px;font-family:var(--font-fredoka);font-weight:600;font-size:15px;background:#fff;box-shadow:inset 0 0 0 2px var(--ink);transition:background .2s,transform .3s var(--bounce)}
        .sk-chip:hover{transform:translateY(-2px)}
        .sk-chip.on{background:var(--ink);color:#fff}
        .sk-grid{list-style:none;margin:26px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:10px}
        .sk{display:flex;align-items:center;gap:10px;padding:8px 16px 8px 8px;border-radius:999px;background:var(--c);box-shadow:inset 0 0 0 2px var(--ink);font-weight:800;font-size:15px;animation:skin .5s var(--bounce) both;animation-delay:var(--d);transition:transform .3s var(--bounce)}
        .sk:hover{transform:translateY(-3px) rotate(-2deg)}
        @keyframes skin{from{opacity:0;transform:scale(.7)}}
        .sk-ic{width:36px;height:36px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:inset 0 0 0 1.5px var(--line);color:var(--ink)}
      `}</style>
    </section>
  );
}
