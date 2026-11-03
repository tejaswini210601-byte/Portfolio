"use client";
import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/data";
import { useAudience } from "@/lib/audience";
import { lockScroll, scrollToTarget } from "@/lib/scroll";

const LINKS = {
  parents: [
    { id: "kids", label: "For kids" },
    { id: "learn", label: "What they learn" },
    { id: "how", label: "How I teach" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
  recruiters: [
    { id: "numbers", label: "Impact" },
    { id: "journey", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
};

/** The "For Parents / For Recruiters" switch. Used in the nav and in the hero. */
export function AudienceSwitch({ big = false }: { big?: boolean }) {
  const { who, setWho } = useAudience();
  return (
    <div className={`aud ${big ? "big" : ""}`} role="radiogroup" aria-label="Show this site for">
      <span className="aud-knob" style={{ transform: who === "parents" ? "translateX(0)" : "translateX(100%)" }} />
      <button role="radio" aria-checked={who === "parents"} className={who === "parents" ? "on" : ""} onClick={() => setWho("parents")}>
        👨‍👩‍👧 For Parents
      </button>
      <button role="radio" aria-checked={who === "recruiters"} className={who === "recruiters" ? "on" : ""} onClick={() => setWho("recruiters")}>
        💼 For Recruiters
      </button>
      <style>{`
        .aud{position:relative;display:inline-grid;grid-template-columns:1fr 1fr;padding:4px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 2px var(--ink)}
        .aud button{position:relative;z-index:1;padding:8px 14px;border-radius:999px;font-family:var(--font-fredoka);font-weight:600;font-size:14px;white-space:nowrap;transition:color .3s}
        .aud button.on{color:var(--ink)}
        .aud button:not(.on){color:var(--mute)}
        .aud-knob{position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:999px;background:var(--sun);box-shadow:inset 0 0 0 2px var(--ink);transition:transform .45s var(--bounce)}
        .aud.big button{padding:12px 22px;font-size:16px}
      `}</style>
    </div>
  );
}

export default function Navigation() {
  const { who } = useAudience();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(scrollY > 30);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    lockScroll(open);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToTarget(id), open ? 300 : 0);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Main">
        <button className="nav-brand" onClick={() => go("top")} aria-label="Back to top">
          <span className="nav-logo">T</span>
          <span className="nav-name">{PROFILE.firstName}</span>
        </button>
        <div className="nav-links">
          {LINKS[who].map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <AudienceSwitch />
          <button className="nav-menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mmenu">Menu</button>
        </div>
      </nav>

      <div id="mmenu" className={`mmenu ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <button className="nav-menu mmenu-x" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>Close</button>
        <AudienceSwitch big />
        <ol>
          {LINKS[who].map((l, i) => (
            <li key={l.id} style={{ ["--i" as string]: i }}>
              <a href={`#${l.id}`} tabIndex={open ? 0 : -1} onClick={(e) => { e.preventDefault(); go(l.id); }}>{l.label}</a>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .nav{position:fixed;z-index:50;top:12px;left:var(--gutter);right:var(--gutter);display:flex;align-items:center;justify-content:space-between;gap:14px;padding:8px 8px 8px 10px;border-radius:999px;transition:background .3s,box-shadow .3s}
        .nav.is-scrolled{background:rgba(255,255,255,.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 0 0 2px var(--ink),0 4px 0 var(--ink)}
        .nav-brand{display:flex;align-items:center;gap:10px}
        .nav-logo{width:42px;height:42px;border-radius:14px;display:grid;place-items:center;background:var(--coral);color:#fff;font-family:var(--font-fredoka);font-weight:700;font-size:22px;box-shadow:inset 0 0 0 2px var(--ink);transform:rotate(-6deg);transition:transform .5s var(--bounce)}
        .nav-brand:hover .nav-logo{transform:rotate(8deg) scale(1.08)}
        .nav-name{font-family:var(--font-fredoka);font-weight:650;font-size:20px}
        .nav-links{display:flex;gap:2px}
        .nav-links a{padding:9px 13px;border-radius:999px;font-weight:800;font-size:14.5px;color:var(--ink-2);transition:background .2s}
        .nav-links a:hover{background:var(--sun-soft);color:var(--ink)}
        .nav-right{display:flex;align-items:center;gap:8px}
        .nav-right .aud{transition:opacity .3s,transform .4s var(--bounce)}
        .nav:not(.is-scrolled) .nav-right .aud{opacity:0;transform:translateY(-8px);pointer-events:none}
        .nav-menu{display:none;height:42px;padding:0 18px;border-radius:999px;background:#fff;font-family:var(--font-fredoka);font-weight:600;box-shadow:inset 0 0 0 2px var(--ink)}
        .mmenu{position:fixed;inset:0;z-index:70;background:var(--sun-soft);padding:84px var(--gutter) 40px;display:flex;flex-direction:column;gap:28px;clip-path:circle(0% at calc(100% - 48px) 34px);visibility:hidden;transition:clip-path .7s var(--ease),visibility 0s .7s}
        .mmenu.open{clip-path:circle(150% at calc(100% - 48px) 34px);visibility:visible;transition:clip-path .7s var(--ease)}
        .mmenu-x{display:block!important;position:absolute;top:14px;right:var(--gutter)}
        .mmenu ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
        .mmenu li{opacity:0;transform:translateY(24px);transition:opacity .5s,transform .6s var(--bounce);transition-delay:calc(var(--i)*60ms + 150ms)}
        .mmenu.open li{opacity:1;transform:none}
        .mmenu li a{font-family:var(--font-fredoka);font-weight:650;font-size:clamp(34px,9vw,52px);line-height:1.15}
        @media (max-width:1180px){.nav-links{display:none}}
        @media (max-width:760px){.nav-right .aud{display:none}.nav-menu{display:block}}
      `}</style>
    </>
  );
}
