import { HOW_I_TEACH } from "@/lib/data";
import { ConceptIcon } from "../ui/TechLogo";

const COLORS = ["sun", "sky", "coral", "mint"];

/** How I teach: four steps joined by a dashed, wiggly path. */
export default function How() {
  return (
    <section id="how" className="section how" aria-labelledby="how-title">
      <div className="wrap">
        <p className="eyebrow rv">🍎 How I teach</p>
        <h2 className="h2 rv" id="how-title">
          Fun for kids. <span className="mark" style={{ ["--hl" as string]: "var(--sky)" }}>Clear</span> for parents.
        </h2>
        <div className="steps">
          <svg className="steps-path" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 30 C 120 0, 200 60, 330 30 S 540 0, 660 30 S 880 60, 1000 30" fill="none" stroke="#1E1B4B" strokeWidth="3" strokeDasharray="10 10" />
          </svg>
          {HOW_I_TEACH.map((s, i) => (
            <div key={s.title} className="step rv" style={{ ["--i" as string]: i, ["--c" as string]: `var(--${COLORS[i]})` }}>
              <span className="step-ic"><ConceptIcon name={s.icon} size={32} stroke={2} /><b>{i + 1}</b></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .steps{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;margin-top:56px}
        .steps-path{position:absolute;left:6%;right:6%;top:24px;width:88%;height:60px;z-index:0}
        .step{position:relative;z-index:1;text-align:center;display:flex;flex-direction:column;align-items:center}
        .step-ic{position:relative;width:96px;height:96px;border-radius:50%;display:grid;place-items:center;background:var(--c);box-shadow:inset 0 0 0 3px var(--ink),0 6px 0 var(--ink);transition:transform .5s var(--bounce)}
        .step:hover .step-ic{transform:translateY(-6px) rotate(-8deg)}
        .step-ic b{position:absolute;top:-6px;right:-6px;width:32px;height:32px;border-radius:50%;background:#fff;display:grid;place-items:center;font-family:var(--font-fredoka);font-weight:650;box-shadow:inset 0 0 0 2.5px var(--ink)}
        .step h3{margin:20px 0 0;font-size:22px;font-weight:650}
        .step p{margin:8px 0 0;color:var(--ink-2);font-size:15.5px;line-height:1.5;max-width:28ch}
        @media (max-width:900px){.steps{grid-template-columns:1fr 1fr;row-gap:44px}.steps-path{display:none}}
        @media (max-width:520px){.steps{grid-template-columns:1fr}}
      `}</style>
    </section>
  );
}
