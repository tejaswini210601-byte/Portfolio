import { LEARN_PATHS } from "@/lib/data";
import TechLogo, { ConceptIcon } from "../ui/TechLogo";

/** What kids learn: one colourful card per subject. Cards tilt a little and lift on hover. */
export default function Learn() {
  return (
    <section id="learn" className="section learn" aria-labelledby="learn-title">
      <div className="wrap">
        <p className="eyebrow rv">🧠 What they learn</p>
        <h2 className="h2 rv" id="learn-title">
          Six ways to <span className="mark" style={{ ["--hl" as string]: "var(--mint)" }}>play, build</span> and think.
        </h2>
        <p className="lead rv">From first drag-and-drop blocks to real Python, robots and Olympiad maths: we start wherever your child is.</p>
        <div className="paths">
          {LEARN_PATHS.map((p, i) => (
            <article key={p.title} className="path rv" style={{ ["--i" as string]: i % 3, ["--c" as string]: `var(--${p.color})`, ["--cs" as string]: `var(--${p.color}-soft)`, ["--rot" as string]: `${i % 2 ? 1.2 : -1.2}deg` }}>
              <div className="path-top">
                <span className="path-ic"><ConceptIcon name={p.icon} size={30} stroke={2} /></span>
                <span className="path-n">0{i + 1}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <div className="path-tools">
                {p.tools.map((t) => (
                  <span key={t} className="pill"><TechLogo name={t} size={15} />{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .paths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:44px}
        .path{background:var(--cs);border-radius:28px;padding:24px;box-shadow:inset 0 0 0 2.5px var(--ink),0 6px 0 var(--ink);display:flex;flex-direction:column;gap:10px;transition:transform .45s var(--bounce),box-shadow .45s var(--bounce)}
        .path:hover{transform:translateY(-8px) rotate(var(--rot));box-shadow:inset 0 0 0 2.5px var(--ink),0 12px 0 var(--ink)}
        .path-top{display:flex;justify-content:space-between;align-items:center}
        .path-ic{width:58px;height:58px;border-radius:18px;display:grid;place-items:center;background:var(--c);box-shadow:inset 0 0 0 2.5px var(--ink);transition:transform .5s var(--bounce)}
        .path:hover .path-ic{transform:rotate(-10deg) scale(1.08)}
        .path-n{font-family:var(--font-fredoka);font-weight:600;font-size:15px;color:var(--ink-2)}
        .path h3{margin:6px 0 0;font-size:24px;font-weight:650;line-height:1.1}
        .path p{margin:0;color:var(--ink-2);font-size:15.5px;line-height:1.5}
        .path-tools{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:8px}
        @media (max-width:1000px){.paths{grid-template-columns:1fr 1fr}}
        @media (max-width:620px){.paths{grid-template-columns:1fr}}
      `}</style>
    </section>
  );
}
