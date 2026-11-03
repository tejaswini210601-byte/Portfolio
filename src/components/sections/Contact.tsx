"use client";
import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { useAudience } from "@/lib/audience";
import { scrollToTarget } from "@/lib/scroll";
import Robot from "../art/Robot";

export default function Contact() {
  const { who } = useAudience();
  const [copied, setCopied] = useState(false);
  const subject = who === "parents" ? "Classes for my child" : "Opportunity for Tejaswini";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="ct-card">
          <div className="ct-robot float" aria-hidden="true"><Robot /></div>
          <p className="eyebrow">💌 Contact</p>
          <h2 className="h2" id="contact-title">
            {who === "parents" ? (
              <>Let&apos;s get your child <span className="mark" style={{ ["--hl" as string]: "var(--pink)" }}>building!</span></>
            ) : (
              <>Let&apos;s work <span className="mark" style={{ ["--hl" as string]: "var(--mint)" }}>together.</span></>
            )}
          </h2>
          <p className="lead">
            {who === "parents"
              ? "Tell me your child's age and what they're curious about, and I'll get back to you."
              : "Open to STEM education, curriculum development and online teaching roles. I'm happy to share a demo lesson."}
          </p>
          <div className="ct-mail">
            <a className="btn btn-sun" href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}`}>✉️ {PROFILE.email}</a>
            <button className="btn btn-white" onClick={copy}>{copied ? "Copied ✓" : "Copy email"}</button>
            <span className="sr-only" aria-live="polite">{copied ? "Email copied" : ""}</span>
          </div>
          <ul className="ct-list">
            <li><span>Phone</span><a href={PROFILE.phoneHref}>{PROFILE.phone}</a></li>
            <li><span>Based in</span><b>{PROFILE.location}</b></li>
            {PROFILE.linkedin && <li><span>LinkedIn</span><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">tejaswini-stemteacher ↗</a></li>}
            {PROFILE.github && <li><span>GitHub</span><a href={PROFILE.github} target="_blank" rel="noreferrer">tejaswini210601-byte ↗</a></li>}
            <li><span>Résumé</span><a href={PROFILE.resume} download>Download PDF ↓</a></li>
          </ul>
        </div>
      </div>
      <footer className="wrap foot">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <button onClick={() => scrollToTarget("top")}>Back to top ↑</button>
        <span>Made with 💛 and Next.js</span>
      </footer>
      <style>{`
        .ct-card{position:relative;background:var(--sun-soft);border-radius:40px;padding:clamp(28px,5vw,64px);box-shadow:inset 0 0 0 3px var(--ink),0 10px 0 var(--ink);overflow:hidden}
        .ct-robot{position:absolute;right:clamp(16px,4vw,60px);top:clamp(16px,4vw,48px);width:clamp(80px,11vw,150px)}
        .ct-mail{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
        .ct-mail .btn{max-width:100%;overflow:hidden;text-overflow:ellipsis}
        .ct-list{list-style:none;margin:32px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
        .ct-list li{display:flex;flex-direction:column;background:#fff;border-radius:18px;padding:12px 16px;box-shadow:inset 0 0 0 2px var(--ink)}
        .ct-list span{font-size:12.5px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--mute)}
        .ct-list a,.ct-list b{font-weight:800;overflow-wrap:anywhere}
        .ct-list a:hover{text-decoration:underline}
        .foot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:60px;padding-bottom:28px;font-size:14.5px;color:var(--ink-2);font-weight:700}
        .foot button{font-weight:800;color:var(--ink)}
        @media (max-width:640px){.ct-robot{opacity:.35}}
      `}</style>
    </section>
  );
}
