"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS, asset } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";

/** A hanging lanyard ID card: damped pendulum that reacts to the pointer, flips on hover / tap / Enter. */
function IdCard() {
  const swingRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const el = swingRef.current;
    if (!el || prefersReducedMotion()) return;
    let angle = 0,
      vel = 0,
      lastX: number | null = null,
      lastT = 0,
      raf = 0;
    const start = performance.now();
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastX !== null) {
        const dx = e.clientX - lastX;
        const dt = Math.max(16, now - lastT);
        vel += (dx / dt) * 0.9; // pointer velocity → angular push
      }
      lastX = e.clientX;
      lastT = now;
    };
    const loop = (t: number) => {
      const idle = Math.sin((t - start) / 1400) * 1.4; // gentle idle sway
      vel += (-0.045 * angle); // spring back to rest
      vel *= 0.92; // damping
      angle = Math.max(-22, Math.min(22, angle + vel));
      el.style.transform = `rotate(${angle + idle}deg)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const strap = `${PROFILE.name} · ${PROFILE.shortRole} · `;

  return (
    <div className="lanyard">
      <div className="swing" ref={swingRef}>
        <div className="strap" aria-hidden="true">
          <div className="strap-text mono">
            <span>{strap.repeat(4)}</span>
            <span>{strap.repeat(4)}</span>
          </div>
        </div>
        <div className="clip" aria-hidden="true">
          <span />
        </div>
        <div
          className={`idcard ${flipped ? "is-flipped" : ""}`}
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={`ID card for ${PROFILE.name}. Press to flip and read the back.`}
          onClick={() => setFlipped((f) => !f)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setFlipped((f) => !f);
            }
          }}
        >
          <div className="face front">
            <div className="band mono">EDUCATOR ID</div>
            <div className="photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/portrait-bust.webp")} alt={`Portrait of ${PROFILE.name}`} width={128} height={156} loading="lazy" />
            </div>
            <p className="id-name">{PROFILE.name}</p>
            <p className="id-role">Coding &amp; Robotics Instructor</p>
            <dl className="id-rows mono">
              <div><dt>Dept.</dt><dd>STEM Education</dd></div>
              <div><dt>Since</dt><dd>2019</dd></div>
              <div><dt>Based</dt><dd>Joensuu, FI</dd></div>
            </dl>
            <div className="id-foot">
              <div className="barcode" aria-hidden="true" />
              <div className="holo" aria-hidden="true" />
            </div>
          </div>
          <div className="face back">
            <p className="mono back-k">What I am</p>
            <ul>
              <li>Mathematics Educator &amp; Coding/Robotics Instructor</li>
              <li>BCA · MSc in Information Technology (UEF, in progress)</li>
              <li>500+ students trained · 100+ live online sessions</li>
              <li>Built: {PROJECTS.slice(0, 3).map((p) => p.title).join(", ")}</li>
              <li>10th Standard — 95%</li>
            </ul>
            <div className="sig">
              <span className="sig-name">{PROFILE.firstName}</span>
              <span className="mono">If found, say hello · {PROFILE.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead index="01" label="About" title="A teacher who" accent="builds." id="about-title" />
        <div className="about-grid">
          <div className="about-left">
            <h3 className="about-hi rv">
              Hi, I&apos;m <span className="accent">{PROFILE.firstName}.</span>
            </h3>
            <p className="rv" style={{ ["--i" as string]: 1 }}>{PROFILE.resumeSummary}</p>
            <p className="rv" style={{ ["--i" as string]: 2 }}>{PROFILE.extraLine}</p>
            <div className="about-btns rv" style={{ ["--i" as string]: 3 }}>
              <a className="btn btn-primary" href={PROFILE.resume} download>Résumé ↓</a>
              {PROFILE.github && <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
              {PROFILE.linkedin && <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
            </div>
          </div>

          <IdCard />

          <div className="about-right">
            <p className="mono facts-k rv">Quick facts</p>
            <dl className="facts">
              {[
                ["Location", PROFILE.location],
                ["Education", "MSc in Information Technology — University of Eastern Finland"],
                ["Current role", "Curriculum Developer & Coding/Robotics Trainer"],
                ["Languages", PROFILE.languages.join(", ")],
                ["Email", PROFILE.email],
              ].map(([k, v], i) => (
                <div key={k} className="rv" style={{ ["--i" as string]: i }}>
                  <dt className="mono">{k}</dt>
                  <dd>{k === "Email" ? <a href={`mailto:${v}`}>{v}</a> : v}</dd>
                </div>
              ))}
            </dl>
            <blockquote className="rv">“{PROFILE.quote}”</blockquote>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(24px,4vw,64px);margin-top:clamp(48px,7vh,80px);align-items:stretch}
        .about-left,.about-right{display:flex;flex-direction:column;gap:18px;padding-top:24px}
        .about-hi{font-size:clamp(28px,2.6vw,38px);font-weight:700;letter-spacing:-.04em;margin:0}
        .about-left p{color:var(--ink-2);font-size:17px;line-height:1.6;margin:0}
        .about-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
        .facts-k{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);margin:0}
        .facts{margin:0}
        .facts div{display:grid;grid-template-columns:110px 1fr;gap:12px;padding:14px 0;border-top:1px solid var(--line)}
        .facts dt{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);padding-top:3px}
        .facts dd{margin:0;font-weight:550;letter-spacing:-.01em;overflow-wrap:anywhere}
        .facts a{text-decoration:underline;text-underline-offset:3px}
        .about-right blockquote{margin:12px 0 0;font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,1.9vw,28px);line-height:1.25;color:var(--ink-2)}

        .lanyard{position:relative;display:flex;justify-content:center;margin-top:-40px;perspective:1400px}
        .swing{display:flex;flex-direction:column;align-items:center;transform-origin:50% 0;will-change:transform}
        .strap{width:30px;height:96px;background:#1a1a1a;overflow:hidden;position:relative;border-radius:0 0 3px 3px}
        .strap-text{position:absolute;left:50%;top:0;writing-mode:vertical-rl;font-size:9px;letter-spacing:.18em;color:#cfcfcf;white-space:nowrap;transform:translateX(-50%);animation:strap 18s linear infinite;display:flex}
        @keyframes strap{to{transform:translate(-50%,-50%)}}
        .clip{width:46px;height:30px;margin-top:-4px;border-radius:8px;background:linear-gradient(180deg,#e6e6e6,#9a9a9a 55%,#cfcfcf);box-shadow:inset 0 1px 0 #fff,0 4px 8px rgba(0,0,0,.25);display:grid;place-items:center}
        .clip span{width:20px;height:6px;border-radius:3px;background:#5a5a5a}
        .idcard{position:relative;width:300px;height:404px;margin-top:-6px;transform-style:preserve-3d;transition:transform .9s var(--ease);cursor:pointer;border-radius:22px}
        @media (hover:hover){.idcard:hover{transform:rotateY(180deg)}}
        .idcard.is-flipped{transform:rotateY(180deg)}
        @media (hover:hover){.idcard.is-flipped:hover{transform:rotateY(0)}}
        .face{position:absolute;inset:0;border-radius:22px;background:#fff;backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:inset 0 0 0 1px var(--line),0 40px 60px -30px rgba(0,0,0,.35);overflow:hidden;display:flex;flex-direction:column;align-items:center}
        .front::before{content:"";position:absolute;top:14px;left:50%;width:44px;height:8px;margin-left:-22px;border-radius:4px;background:var(--paper);box-shadow:inset 0 1px 2px rgba(0,0,0,.2)}
        .band{width:100%;background:var(--ink);color:#fff;text-align:center;font-size:11px;letter-spacing:.3em;padding:34px 0 12px}
        .photo{width:128px;height:156px;margin-top:16px;border-radius:16px;padding:3px;background:linear-gradient(145deg,#d9d9d9,#7d7d7d,#e9e9e9);box-shadow:0 0 0 8px rgba(13,13,13,.035);overflow:hidden}
        .photo img{width:100%;height:100%;object-fit:cover;border-radius:13px;transition:transform .8s var(--ease)}
        .idcard:hover .photo img{transform:scale(1.07)}
        .id-name{margin:14px 0 0;font-weight:750;font-size:20px;letter-spacing:-.03em}
        .id-role{margin:2px 0 0;font-size:12.5px;color:var(--mute)}
        .id-rows{margin:12px 0 0;width:100%;padding:0 26px;font-size:10.5px}
        .id-rows div{display:flex;justify-content:space-between;padding:4px 0;border-top:1px dashed var(--line)}
        .id-rows dt{color:var(--mute)} .id-rows dd{margin:0;font-weight:600}
        .id-foot{margin-top:auto;width:100%;display:flex;justify-content:space-between;align-items:center;padding:0 26px 16px}
        .barcode{width:120px;height:26px;background:repeating-linear-gradient(90deg,#111 0 2px,transparent 2px 4px,#111 4px 5px,transparent 5px 8px,#111 8px 11px,transparent 11px 12px)}
        .holo{width:34px;height:34px;border-radius:50%;background:conic-gradient(#f2f2f2,#b9b9b9,#ffffff,#8e8e8e,#e2e2e2,#f2f2f2);box-shadow:inset 0 0 0 1px rgba(0,0,0,.1)}
        .back{transform:rotateY(180deg);padding:30px 26px 22px;align-items:stretch}
        .back-k{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);margin:0 0 12px}
        .back ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px}
        .back li{font-size:13.5px;line-height:1.4;font-weight:550;padding-left:16px;position:relative}
        .back li::before{content:"";position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:var(--ink)}
        .sig{margin-top:auto;border-top:1px solid var(--line);padding-top:10px;display:flex;flex-direction:column;gap:4px}
        .sig-name{font-family:var(--font-serif);font-style:italic;font-size:28px}
        .sig .mono{font-size:9.5px;color:var(--mute);overflow-wrap:anywhere}

        @media (max-width:1100px){
          .about-grid{grid-template-columns:1fr;max-width:640px;margin-inline:auto}
          .lanyard{order:-1;margin-top:-60px}
          .strap{height:110px}
        }
      `}</style>
    </section>
  );
}
