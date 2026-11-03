"use client";
import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

/** Each letter hops when the cursor passes over it. */
function HopLine({ text }: { text: string }) {
  return (
    <span className="hop" aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span key={i} className="hl" onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.classList.remove("go");
          void el.offsetWidth; // restart animation
          el.classList.add("go");
        }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="tag rv">07 — Contact</p>
        <h2 className="ct-h" id="contact-title">
          <span className="sr-only">Let&apos;s build something together.</span>
          <span className="rv-mask"><span><HopLine text="Let's build" /></span></span>
          <span className="rv-mask" style={{ ["--i" as string]: 1 }}><span className="accent"><HopLine text="something together." /></span></span>
        </h2>

        <div className="ct-row">
          <div className="ct-main">
            <div className="ct-mail rv">
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <button className="copy" onClick={copy}>
                {copied ? "Copied ✓" : "Copy"}
              </button>
              <span className="sr-only" aria-live="polite">{copied ? "Email copied to clipboard" : ""}</span>
            </div>
            <ul className="ct-links rv" style={{ ["--i" as string]: 1 }}>
              <li><span className="mono">Phone</span><a href={PROFILE.phoneHref}>{PROFILE.phone}</a></li>
              <li><span className="mono">Based in</span><span>{PROFILE.location}</span></li>
              <li><span className="mono">Résumé</span><a href={PROFILE.resume} download>Download PDF ↓</a></li>
              {PROFILE.github && <li><span className="mono">GitHub</span><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>}
              {PROFILE.linkedin && <li><span className="mono">LinkedIn</span><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>}
            </ul>
          </div>
          <a className="badge" href={`mailto:${PROFILE.email}`} aria-label="Say hello by email">
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
              <text><textPath href="#circ" textLength="486" lengthAdjust="spacing">say hello · say hello · say hello · </textPath></text>
            </svg>
            <span className="badge-c">✉</span>
          </a>
        </div>
      </div>

      <footer className="wrap foot">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <button onClick={() => scrollToTarget("top")}>Back to top ↑</button>
        <span className="mono">Built with Next.js</span>
      </footer>

      <style>{`
        .contact{padding-bottom:40px}
        .ct-h{margin:22px 0 0;font-weight:750;font-size:clamp(46px,9vw,150px);letter-spacing:-.055em;line-height:.95}
        .ct-h .accent{letter-spacing:-.03em}
        .hl{display:inline-block}
        .hl.go{animation:hop .55s var(--ease)}
        @keyframes hop{0%{transform:none}35%{transform:translateY(-.14em)}70%{transform:translateY(.02em)}100%{transform:none}}
        .ct-row{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;margin-top:clamp(40px,7vh,72px)}
        .ct-main{min-width:0;flex:1}
        .ct-mail{display:flex;flex-wrap:wrap;align-items:center;gap:14px}
        .ct-mail a{font-size:clamp(22px,3.4vw,46px);font-weight:650;letter-spacing:-.035em;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:8px;overflow-wrap:anywhere}
        .copy{height:36px;padding:0 16px;border-radius:999px;font-size:13px;font-weight:600;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);transition:background .3s,color .3s}
        .copy:hover{background:var(--ink);color:#fff}
        .ct-links{list-style:none;margin:32px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0 32px;max-width:760px}
        .ct-links li{display:flex;flex-direction:column;gap:4px;padding:14px 0;border-top:1px solid var(--line);font-weight:600}
        .ct-links .mono{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);font-weight:500}
        .ct-links a:hover{text-decoration:underline;text-underline-offset:3px}
        .badge{position:relative;flex:none;width:170px;height:170px;display:grid;place-items:center;overflow:hidden;border-radius:50%}
        .badge svg{position:absolute;inset:0;animation:spin 16s linear infinite}
        .badge text{font-family:var(--font-mono);font-size:15px;letter-spacing:.14em;text-transform:uppercase;fill:var(--ink)}
        .badge-c{width:66px;height:66px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:24px;transition:transform .6s var(--ease)}
        .badge:hover .badge-c{transform:scale(1.12) rotate(-12deg)}
        .foot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-top:clamp(80px,12vh,120px);padding-top:24px;padding-bottom:24px;border-top:1px solid var(--line);font-size:14px;color:var(--mute)}
        .foot button{font-weight:600;color:var(--ink)}
        .foot .mono{font-size:12px}
        @media (max-width:700px){.ct-row{flex-direction:column;align-items:flex-start}.ct-main{width:100%}.badge{align-self:flex-end;width:130px;height:130px}}
      `}</style>
    </section>
  );
}
