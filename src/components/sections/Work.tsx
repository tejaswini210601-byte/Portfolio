"use client";
import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import SectionHead from "../ui/SectionHead";
import TechLogo from "../ui/TechLogo";

/** Small grayscale "illustrative UI" for each project — pure CSS/JSX, clearly labelled as not a screenshot. */
function MiniUI({ kind }: { kind: Project["ui"] }) {
  switch (kind) {
    case "line":
      return (
        <div className="mu mu-line">
          <svg viewBox="0 0 200 140" aria-hidden="true">
            <path d="M20 110 C 60 110, 50 30, 100 30 S 150 110, 180 60" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round" />
            <g className="bot"><rect x="-9" y="-7" width="18" height="14" rx="3" fill="#fff" stroke="#111" strokeWidth="1.5" /><circle cx="5" cy="-3" r="1.6" fill="#111" /><circle cx="5" cy="3" r="1.6" fill="#111" /></g>
          </svg>
          <div className="mu-row"><span>IR left</span><b>1</b><span>IR right</span><b>0</b></div>
        </div>
      );
    case "obstacle":
      return (
        <div className="mu mu-obs">
          <div className="radar"><span className="sweep" /><i style={{ left: "62%", top: "30%" }} /><i style={{ left: "30%", top: "45%" }} /></div>
          <div className="mu-row"><span>HC-SR04</span><b>24 cm</b><span>Servo</span><b>90°</b></div>
        </div>
      );
    case "home":
      return (
        <div className="mu mu-home">
          {["Lights", "Fan", "Buzzer"].map((d, i) => (
            <div key={d} className="dev"><span>{d}</span><span className={`tog ${i !== 2 ? "on" : ""}`}><i /></span></div>
          ))}
        </div>
      );
    case "scratch":
      return (
        <div className="mu mu-scratch">
          <div className="blk hat">when green flag clicked</div>
          <div className="blk c">forever<div className="blk in">if touching edge then</div><div className="blk in2">bounce</div><div className="blk in">move 10 steps</div></div>
        </div>
      );
    case "app":
      return (
        <div className="mu mu-app">
          <div className="phone"><div className="ph-bar" /><div className="ph-btn">Button1</div><div className="ph-lbl" /><div className="ph-lbl s" /></div>
          <div className="blk ev">when Button1.Click do</div>
        </div>
      );
    case "olympiad":
      return (
        <div className="mu mu-oly">
          <p className="mono">Problem 07 · Number theory</p>
          <p className="q">Find the smallest n such that n² ends in 44.</p>
          <div className="opts">{["12", "38", "62", "88"].map((o) => <span key={o}>{o}</span>)}</div>
        </div>
      );
    case "module":
      return (
        <div className="mu mu-mod">
          <div className="frac"><span style={{ flex: 3 }} /><span style={{ flex: 1 }} /></div>
          <p className="mono">¾ = 0.75 = 75%</p>
          <div className="bars">{[60, 85, 40, 95].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
        </div>
      );
  }
}

export default function Work() {
  const [open, setOpen] = useState(0);

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead index="03" label="Selected work" title="Things I've" accent="built." id="work-title" />
        <div className="acc rv">
          {PROJECTS.map((p, i) => {
            const isOpen = open === i;
            return (
              <article
                key={p.id}
                className={`panel ${isOpen ? "open" : ""}`}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
                aria-labelledby={`p-${p.id}`}
              >
                <button className="spine" aria-expanded={isOpen} aria-controls={`pb-${p.id}`} tabIndex={0}>
                  <span className="mono sp-n">{p.index}</span>
                  <span className="sp-t" id={`p-${p.id}`}>{p.title}</span>
                  <span className="sp-plus" aria-hidden="true">+</span>
                </button>
                <div className="body" id={`pb-${p.id}`} hidden={!isOpen}>
                  <div className="b-left">
                    <p className="mono b-k">
                      {p.index} — {p.kicker}
                    </p>
                    <h3 className="b-title">{p.title}</h3>
                    <p className="b-desc">{p.description}</p>
                    <ul className="b-feat">
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <div className="b-tech">
                      {p.tech.map((t) => (
                        <span key={t} className="tchip">
                          <TechLogo name={t} size={14} />
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.github && (
                      <a className="btn btn-primary" href={p.github} target="_blank" rel="noreferrer">
                        View on GitHub ↗
                      </a>
                    )}
                  </div>
                  <div className="b-right" aria-hidden="true">
                    <MiniUI kind={p.ui} />
                    <span className="mono mu-label">Illustrative UI</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .acc{display:flex;gap:10px;height:min(78svh,600px);margin-top:clamp(40px,6vh,64px)}
        .panel{position:relative;flex:0 0 64px;min-width:0;border-radius:26px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;transition:flex .8s var(--ease),box-shadow .4s;cursor:pointer}
        .panel.open{flex:1 1 auto;cursor:default;box-shadow:inset 0 0 0 1px var(--line),0 40px 70px -40px rgba(0,0,0,.35)}
        .spine{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0;transition:opacity .3s}
        .panel.open .spine{opacity:0;pointer-events:none}
        .sp-n{font-size:12px;color:var(--mute)}
        .sp-t{min-width:0;writing-mode:vertical-rl;transform:rotate(180deg);font-weight:650;letter-spacing:-.02em;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-height:70%}
        .sp-plus{width:34px;height:34px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);display:grid;place-items:center;font-size:18px;transition:transform .5s var(--ease),background .3s,color .3s}
        .panel:hover .sp-plus{transform:rotate(90deg);background:var(--ink);color:#fff}
        .body{position:absolute;inset:0;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:28px;padding:clamp(24px,3vw,44px);}
        .body[hidden]{display:none}
        .b-left{display:flex;flex-direction:column;gap:14px;align-items:flex-start;animation:bodyin .7s var(--ease) both}
        @keyframes bodyin{from{opacity:0;transform:translateY(14px)}}
        .b-k{margin:0;font-size:12px;color:var(--mute);text-transform:uppercase;letter-spacing:.05em}
        .b-title{margin:0;font-size:clamp(28px,3vw,46px);font-weight:750;letter-spacing:-.045em;line-height:1}
        .b-desc{margin:0;color:var(--ink-2);font-size:16.5px;line-height:1.55;max-width:46ch}
        .b-feat{list-style:none;margin:4px 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:8px 18px;width:100%}
        .b-feat li{font-size:14px;font-weight:550;padding-left:16px;position:relative}
        .b-feat li::before{content:"";position:absolute;left:0;top:8px;width:7px;height:1.5px;background:var(--ink)}
        .b-tech{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}
        .tchip{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:999px;background:var(--paper);font-size:12.5px;font-weight:550}
        .b-right{position:relative;border-radius:20px;background:var(--paper);display:grid;place-items:center;padding:24px;animation:wipe 1s var(--ease) .1s both}
        @keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
        .mu-label{position:absolute;top:14px;left:16px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
        .mu{width:100%;max-width:340px;display:flex;flex-direction:column;gap:14px}
        .mu-row{display:grid;grid-template-columns:auto auto auto auto;justify-content:space-between;gap:8px;font-family:var(--font-mono);font-size:11.5px;background:#fff;border-radius:12px;padding:10px 14px;box-shadow:inset 0 0 0 1px var(--line)}
        .mu-row span{color:var(--mute)}
        .mu-line svg{width:100%;background:#fff;border-radius:16px;box-shadow:inset 0 0 0 1px var(--line)}
        .bot{offset-path:path("M20 110 C 60 110, 50 30, 100 30 S 150 110, 180 60");animation:follow 5s ease-in-out infinite alternate}
        @keyframes follow{from{offset-distance:0%}to{offset-distance:100%}}
        .radar{position:relative;aspect-ratio:1;border-radius:50%;background:repeating-radial-gradient(circle,#fff 0 22px,#ececec 22px 23px);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden}
        .sweep{position:absolute;inset:0;background:conic-gradient(from 0deg,rgba(13,13,13,.28),transparent 70deg);animation:spin 3s linear infinite;border-radius:50%}
        .radar i{position:absolute;width:10px;height:10px;border-radius:50%;background:#111}
        .mu-home{gap:10px}
        .dev{display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:14px;padding:16px 18px;box-shadow:inset 0 0 0 1px var(--line);font-weight:600}
        .tog{width:44px;height:26px;border-radius:999px;background:#d6d4cf;position:relative;transition:background .3s}
        .tog i{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .4s var(--ease)}
        .tog.on{background:var(--ink)} .tog.on i{transform:translateX(18px)}
        .blk{font-size:12.5px;font-weight:600;color:#fff;background:#3a3a3a;border-radius:8px;padding:9px 12px;width:max-content;max-width:100%}
        .blk.hat{border-radius:18px 18px 8px 8px;background:#111}
        .blk.c{background:#555;padding-bottom:16px;display:flex;flex-direction:column;gap:6px;width:100%}
        .blk.in{background:#2a2a2a;margin-left:14px}.blk.in2{background:#777;margin-left:28px}
        .blk.ev{background:#111;align-self:center}
        .phone{align-self:center;width:150px;height:220px;border-radius:24px;background:#fff;box-shadow:inset 0 0 0 1px var(--line),0 20px 30px -20px rgba(0,0,0,.3);padding:14px;display:flex;flex-direction:column;gap:10px}
        .ph-bar{height:8px;width:40%;border-radius:4px;background:var(--soft);align-self:center}
        .ph-btn{margin-top:20px;background:var(--ink);color:#fff;font-size:12px;font-weight:600;border-radius:10px;padding:10px;text-align:center}
        .ph-lbl{height:10px;border-radius:5px;background:var(--soft)}.ph-lbl.s{width:60%}
        .mu-oly{background:#fff;border-radius:18px;padding:20px;box-shadow:inset 0 0 0 1px var(--line)}
        .mu-oly .mono{margin:0;font-size:11px;color:var(--mute)}
        .mu-oly .q{margin:0;font-weight:650;font-size:17px;letter-spacing:-.02em;line-height:1.35}
        .opts{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .opts span{border-radius:10px;padding:10px;text-align:center;font-family:var(--font-mono);font-size:13px;box-shadow:inset 0 0 0 1px var(--line)}
        .opts span:first-child{background:var(--ink);color:#fff}
        .frac{display:flex;gap:4px;height:44px}
        .frac span{border-radius:10px;background:var(--ink)} .frac span:last-child{background:#fff;box-shadow:inset 0 0 0 1px var(--line)}
        .mu-mod .mono{margin:0;font-size:14px;text-align:center}
        .bars{display:flex;align-items:flex-end;gap:10px;height:120px;background:#fff;border-radius:16px;padding:14px;box-shadow:inset 0 0 0 1px var(--line)}
        .bars span{flex:1;border-radius:6px 6px 2px 2px;background:linear-gradient(#3a3a3a,#9a9a9a)}

        @media (max-width:900px){
          .acc{flex-direction:column;height:auto}
          .panel,.panel.open{flex:none;min-height:76px;width:100%}
          .spine{position:relative;width:100%;flex-direction:row;padding:0 20px;height:76px}
          .panel.open .spine{display:none}
          .sp-t{writing-mode:horizontal-tb;transform:none;flex:1;padding:0 14px;text-align:left;max-height:none}
          .body{position:relative;grid-template-columns:1fr;min-width:0;padding:24px}
          .b-feat{grid-template-columns:1fr}
          .b-right{min-height:260px}
        }
      `}</style>
    </section>
  );
}
