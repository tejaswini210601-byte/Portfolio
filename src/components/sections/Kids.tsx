"use client";
import { useEffect, useState } from "react";
import { KID_GAINS } from "@/lib/data";
import Character from "../art/Character";
import Kid, { type KidProps } from "../art/Kid";
import Robot from "../art/Robot";
import { ConceptIcon } from "../ui/TechLogo";

const KIDS: (KidProps & { name: string })[] = [
  { name: "kid with curly hair", skin: "#8D5524", hair: "#1b1b1b", shirt: "#FF6B6B", style: "curly" },
  { name: "kid with a bun", skin: "#F1C27D", hair: "#5a3825", shirt: "#4D96FF", style: "bun", glasses: true },
  { name: "kid with braids", skin: "#C68642", hair: "#2b1a12", shirt: "#2EC4B6", style: "braids", flip: true },
];

/** Illustrated classroom: Tejaswini + kids building a robot. Hover (or tap) the scene and the kids cheer. */
export default function Kids() {
  const [cheer, setCheer] = useState(false);

  // a little cheer every few seconds so the scene feels alive
  useEffect(() => {
    const t = setInterval(() => {
      setCheer(true);
      setTimeout(() => setCheer(false), 1200);
    }, 5200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="kids" className="section kids" aria-labelledby="kids-title">
      <div className="wrap kids-grid">
        <div>
          <p className="eyebrow rv">🎒 For kids</p>
          <h2 className="h2 rv" id="kids-title">
            Where kids <span className="mark" style={{ ["--hl" as string]: "var(--pink)" }}>light up</span> and learn by building.
          </h2>
          <p className="lead rv">
            I&apos;ve taught children aged 5–17 in schools, NGOs, summer camps and live online classes. My favourite moment is when a child&apos;s robot moves for the first time, or their game finally works after debugging.
          </p>
          <div className="gains">
            {KID_GAINS.map((g, i) => (
              <div key={g.title} className="gain rv" style={{ ["--i" as string]: i, ["--c" as string]: `var(--${g.color})`, ["--cs" as string]: `var(--${g.color}-soft)` }}>
                <span className="gain-ic"><ConceptIcon name={g.icon} size={26} stroke={2} /></span>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`scene card rv ${cheer ? "cheer" : ""}`}
          onMouseEnter={() => setCheer(true)}
          onMouseLeave={() => setCheer(false)}
          onClick={() => { setCheer(true); setTimeout(() => setCheer(false), 1400); }}
          role="img"
          aria-label="Illustration: Tejaswini at a table with four children building a robot together"
        >
          <div className="sc-board" aria-hidden="true">
            <span>if</span> <b>sensor</b> <span>then</span> <b>turn left</b>
          </div>
          <div className="sc-teacher"><Character size={210} idleWave={false} label="Cartoon of Tejaswini teaching" /></div>
          <div className="sc-kids">
            {KIDS.map((k, i) => (
              <div key={k.name} className="sc-kid" style={{ ["--i" as string]: i }}><Kid {...k} /></div>
            ))}
          </div>
          <div className="sc-table" aria-hidden="true" />
          <div className="sc-robot" aria-hidden="true"><Robot /></div>
          <div className="sc-hearts" aria-hidden="true">
            {["⭐", "💛", "🎉", "⭐", "💙"].map((e, i) => <span key={i} style={{ ["--i" as string]: i }}>{e}</span>)}
          </div>
          <p className="sc-hint">Hover or tap the class 👆</p>
        </div>
      </div>

      <style>{`
        .kids{background:#fff;border-block:2px solid var(--ink)}
        .kids-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(32px,5vw,72px);align-items:center}
        .gains{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:30px}
        .gain{background:var(--cs);border-radius:22px;padding:18px;box-shadow:inset 0 0 0 2px var(--ink)}
        .gain-ic{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:var(--c);color:var(--ink);box-shadow:inset 0 0 0 2px var(--ink)}
        .gain h3{margin:12px 0 0;font-size:19px;font-weight:650;line-height:1.15}
        .gain p{margin:6px 0 0;font-size:15px;color:var(--ink-2);line-height:1.45}

        .scene{position:relative;aspect-ratio:5/4.4;overflow:hidden;background:linear-gradient(#E0ECFF 0 58%,#FFE7B8 58%);cursor:pointer}
        .sc-board{position:absolute;top:8%;left:50%;transform:translateX(-50%);background:#1E1B4B;color:#fff;border-radius:16px;padding:12px 18px;font-family:var(--font-fredoka);font-size:clamp(13px,1.4vw,17px);white-space:nowrap;box-shadow:0 0 0 6px #fff,0 0 0 8px var(--ink)}
        .sc-board span{color:var(--sun)} .sc-board b{font-weight:500;color:#7CF5E0}
        .sc-teacher{position:absolute;left:1%;bottom:17%;width:36%}
        .sc-teacher .chr{width:100%}
        .sc-kids{position:absolute;right:2%;bottom:12%;width:60%;display:grid;grid-template-columns:repeat(3,1fr);gap:0 4px;align-items:end}
        .sc-kid{transition:transform .5s var(--bounce);transition-delay:calc(var(--i)*60ms)}
        .sc-kid:nth-child(odd){transform:translateY(8%)}
        .kid{width:100%;height:auto;display:block}
        .kid-arm{transition:transform .45s var(--bounce);transform-box:view-box}
        .kid-arm.l{transform-origin:44px 150px}.kid-arm.r{transform-origin:116px 150px}
        .scene.cheer .kid-arm.l{transform:rotate(130deg)}
        .scene.cheer .kid-arm.r{transform:rotate(-130deg)}
        .scene.cheer .sc-kid{transform:translateY(-10%)}
        .sc-table{position:absolute;z-index:1;left:-2%;right:-2%;bottom:0;height:20%;background:#C98A55;border-top:3px solid var(--ink);box-shadow:inset 0 10px 0 #E0A56D}
        .sc-robot{position:absolute;left:40%;bottom:12%;width:13%;z-index:2;transform:translateX(-50%);transition:transform .6s var(--bounce)}
        .scene.cheer .sc-robot{transform:translateX(-50%) translateY(-14px) rotate(-6deg)}
        .sc-hearts span{position:absolute;bottom:40%;left:calc(30% + var(--i)*12%);font-size:22px;opacity:0;transform:translateY(0) scale(.6)}
        .scene.cheer .sc-hearts span{animation:pop 1.2s var(--ease) forwards;animation-delay:calc(var(--i)*80ms)}
        @keyframes pop{0%{opacity:0;transform:translateY(0) scale(.6)}30%{opacity:1}100%{opacity:0;transform:translateY(-120px) scale(1.2)}}
        .sc-hint{position:absolute;bottom:3%;right:4%;margin:0;font-size:12.5px;font-weight:800;color:var(--ink-2);background:#fff;padding:4px 10px;border-radius:999px;box-shadow:inset 0 0 0 1.5px var(--ink)}
        @media (max-width:960px){.kids-grid{grid-template-columns:1fr}.scene{max-width:560px;width:100%;margin:0 auto}}
        @media (max-width:520px){.gains{grid-template-columns:1fr}}
      `}</style>
    </section>
  );
}
