"use client";
import { PROFILE, asset } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { BRAND, ConceptIcon } from "../ui/TechLogo";

// Logos that orbit the monogram (outer ring = real brand logos, inner ring = maths/robotics line icons)
const OUTER = ["python", "scratch", "arduino", "html5", "java", "googleclassroom"];
const INNER = ["robot", "geometry", "algebra", "blocks", "sensor"];
const ROLES = PROFILE.role.split("|").map((r) => r.trim());

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-ghost" aria-hidden="true">
        {PROFILE.firstName.toUpperCase()}
      </div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="tag rv">{PROFILE.location}</p>
          <h1 id="hero-title" className="hero-h1">
            <span className="rv-mask" style={{ ["--i" as string]: 1 }}>
              <span>{PROFILE.heroRole[0]}</span>
            </span>
            <span className="rv-mask" style={{ ["--i" as string]: 2 }}>
              <span className="accent">{PROFILE.heroRole[1]}</span>
            </span>
          </h1>
          <p className="hero-sub rv" style={{ ["--i" as string]: 3 }}>
            Hi, I&apos;m {PROFILE.name}. I teach mathematics, coding and robotics to children aged 5–17 — 500+ students so far.
          </p>
          <div className="hero-ctas rv" style={{ ["--i" as string]: 4 }}>
            <button className="btn btn-primary" onClick={() => scrollToTarget("work")}>
              Explore work
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToTarget("contact")}>
              Let&apos;s talk
            </button>
            <a className="btn btn-ghost" href={PROFILE.resume} download>
              Résumé ↓
            </a>
          </div>
        </div>

        <div className="orbit rv" style={{ ["--i" as string]: 2 }} role="img" aria-label="Monogram TS surrounded by the tools Tejaswini teaches: Python, Scratch, Arduino, HTML, Java, Google Classroom, robotics and mathematics">
          <div className="ring ring-outer">
            {OUTER.map((k, i) => (
              <span key={k} className="sat" style={{ ["--a" as string]: `${(360 / OUTER.length) * i}deg`, ["--t" as string]: BRAND[k].tint }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(`/logos/${BRAND[k].file}.svg`)} alt="" width={30} height={30} />
              </span>
            ))}
          </div>
          <div className="ring ring-inner">
            {INNER.map((k, i) => (
              <span key={k} className="sat sat-sm" style={{ ["--a" as string]: `${(360 / INNER.length) * i + 20}deg` }}>
                <ConceptIcon name={k} size={20} />
              </span>
            ))}
          </div>
          <div className="core">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/portrait-round.webp")} alt={`Portrait of ${PROFILE.name}`} width={420} height={420} fetchPriority="high" />
          </div>
          <span className="core-lbl mono">{PROFILE.shortRole}</span>
        </div>

        <ol className="hero-roles">
          {ROLES.map((r, i) => (
            <li key={r} className="rv" style={{ ["--i" as string]: 3 + i }}>
              <span className="mono">0{i + 1}</span>
              {r}
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .hero{position:relative;min-height:100svh;display:flex;align-items:center;padding-top:110px;padding-bottom:60px;overflow:hidden}
        .hero-ghost{position:absolute;left:50%;top:50%;transform:translate(-50%,-56%);font-weight:800;font-size:clamp(70px,15.5vw,270px);letter-spacing:-.06em;line-height:1;color:transparent;-webkit-text-stroke:1.2px rgba(13,13,13,.12);white-space:nowrap;pointer-events:none;user-select:none}
        .hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:end;gap:clamp(24px,3vw,48px)}
        .hero-h1{font-weight:750;font-size:clamp(44px,5.6vw,88px);letter-spacing:-.05em;line-height:.98;margin:18px 0 0}
        .hero-h1 .accent{font-size:1.08em}
        .hero-sub{margin-top:22px;max-width:36ch;color:var(--ink-2);font-size:17px;line-height:1.55}
        .hero-ctas{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
        .hero-roles{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px;justify-self:end;max-width:300px}
        .hero-roles li{display:flex;gap:14px;align-items:baseline;padding:14px 0;border-top:1px solid var(--line);font-weight:600;letter-spacing:-.02em;font-size:17px}
        .hero-roles li span{font-size:11px;color:var(--mute);font-weight:500}

        .orbit{--S:min(68svh,560px);position:relative;width:var(--S);height:var(--S);align-self:center}
        .ring{position:absolute;inset:0;border-radius:50%;border:1px dashed rgba(13,13,13,.16);animation:spin 70s linear infinite}
        .ring-inner{inset:19%;border-style:solid;border-color:var(--line);animation-duration:50s;animation-direction:reverse}
        .sat{position:absolute;left:50%;top:50%;width:62px;height:62px;margin:-31px;border-radius:20px;background:#fff;display:grid;place-items:center;box-shadow:inset 0 0 0 1px var(--line),0 14px 30px -14px color-mix(in srgb,var(--t,#000) 55%,transparent);transform:rotate(var(--a)) translateY(calc(var(--S)/-2)) rotate(calc(var(--a)*-1))}
        .sat img{animation:spin 70s linear infinite reverse}
        .sat-sm{width:46px;height:46px;margin:-23px;border-radius:14px;color:var(--ink-2);transform:rotate(var(--a)) translateY(calc(var(--S)*-.31)) rotate(calc(var(--a)*-1))}
        .sat-sm svg{animation:spin 50s linear infinite}
        .core{position:absolute;inset:31%;border-radius:50%;background:#fff;padding:6px;box-shadow:inset 0 0 0 1px var(--line),0 40px 80px -36px rgba(0,0,0,.4);overflow:hidden}
        .core img{width:100%;height:100%;object-fit:cover;border-radius:50%;filter:grayscale(.15);transition:transform 1s var(--ease),filter .6s}
        .core:hover img{transform:scale(1.05);filter:none}
        .core-lbl{position:absolute;left:50%;bottom:24%;transform:translate(-50%,50%);background:var(--ink);color:#fff;padding:7px 14px;border-radius:999px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
        @keyframes spin{to{rotate:360deg}}

        @media (max-width:1100px){
          .hero-grid{grid-template-columns:1fr;justify-items:center;text-align:center}
          .hero-copy{order:2;display:flex;flex-direction:column;align-items:center}
          .orbit{order:1;--S:min(62vw,420px)}
          .hero-roles{display:none}
          .hero-ctas{justify-content:center}
          .hero-ghost{top:32%}
        }
        @media (max-width:480px){.orbit{--S:64vw}.sat{width:46px;height:46px;margin:-23px;border-radius:14px}.sat img{width:22px;height:22px}.sat-sm{width:36px;height:36px;margin:-18px}}
      `}</style>
    </section>
  );
}
