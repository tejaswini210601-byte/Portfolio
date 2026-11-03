import { PROJECTS, type Project } from "@/lib/data";
import TechLogo, { ConceptIcon } from "../ui/TechLogo";

const LOOK: Record<Project["ui"], { icon: string; c: string }> = {
  line: { icon: "robot", c: "coral" },
  obstacle: { icon: "sensor", c: "sky" },
  home: { icon: "build", c: "mint" },
  scratch: { icon: "blocks", c: "sun" },
  app: { icon: "app", c: "grape" },
  olympiad: { icon: "medal", c: "pink" },
  module: { icon: "geometry", c: "sky" },
};

/** Projects from the résumé, as playful sticker cards. */
export default function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="proj-title">
      <div className="wrap">
        <p className="eyebrow rv">🛠️ Projects</p>
        <h2 className="h2 rv" id="proj-title">
          Things we <span className="mark" style={{ ["--hl" as string]: "var(--coral)" }}>built</span> together.
        </h2>
        <p className="lead rv">Robots, games, apps and maths challenges that I designed and built with my students.</p>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => {
            const l = LOOK[p.ui];
            return (
              <article key={p.id} className={`proj rv ${i === 0 ? "wide" : ""}`} style={{ ["--i" as string]: i % 3, ["--c" as string]: `var(--${l.c})`, ["--cs" as string]: `var(--${l.c}-soft)` }}>
                <div className="proj-art" aria-hidden="true">
                  <span className="proj-ic"><ConceptIcon name={l.icon} size={i === 0 ? 74 : 54} stroke={1.8} /></span>
                  <span className="proj-n">{p.index}</span>
                </div>
                <div className="proj-body">
                  <p className="proj-k">{p.kicker}</p>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="proj-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="pill"><TechLogo name={t} size={14} />{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <style>{`
        .proj-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:44px}
        .proj{background:#fff;border-radius:28px;overflow:hidden;box-shadow:inset 0 0 0 2.5px var(--ink),0 6px 0 var(--ink);display:flex;flex-direction:column;transition:transform .45s var(--bounce),box-shadow .45s var(--bounce)}
        .proj:hover{transform:translateY(-6px);box-shadow:inset 0 0 0 2.5px var(--ink),0 12px 0 var(--ink)}
        .proj.wide{grid-column:span 2;flex-direction:row}
        .proj-art{position:relative;min-height:150px;background:var(--cs);display:grid;place-items:center;border-bottom:2.5px solid var(--ink);background-image:radial-gradient(color-mix(in srgb,var(--c) 45%,transparent) 1.5px,transparent 1.7px);background-size:18px 18px}
        .proj.wide .proj-art{flex:0 0 42%;border-bottom:0;border-right:2.5px solid var(--ink)}
        .proj-ic{width:96px;height:96px;border-radius:28px;display:grid;place-items:center;background:var(--c);box-shadow:inset 0 0 0 2.5px var(--ink),0 5px 0 var(--ink);transition:transform .6s var(--bounce)}
        .proj.wide .proj-ic{width:140px;height:140px;border-radius:40px}
        .proj:hover .proj-ic{transform:rotate(-8deg) scale(1.06)}
        .proj-n{position:absolute;top:14px;left:16px;font-family:var(--font-fredoka);font-weight:650;background:#fff;border-radius:999px;padding:2px 10px;box-shadow:inset 0 0 0 2px var(--ink);font-size:14px}
        .proj-body{padding:22px;display:flex;flex-direction:column;gap:8px;flex:1}
        .proj-k{margin:0;font-weight:800;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
        .proj h3{margin:0;font-size:23px;font-weight:650;line-height:1.12}
        .proj.wide h3{font-size:clamp(26px,2.4vw,34px)}
        .proj-body>p:not(.proj-k){margin:0;color:var(--ink-2);font-size:15.5px;line-height:1.5}
        .proj-tech{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:8px}
        @media (max-width:1000px){.proj-grid{grid-template-columns:1fr 1fr}}
        @media (max-width:640px){.proj-grid{grid-template-columns:1fr}.proj.wide{grid-column:auto;flex-direction:column}.proj.wide .proj-art{border-right:0;border-bottom:2.5px solid var(--ink);flex-basis:auto}}
      `}</style>
    </section>
  );
}
