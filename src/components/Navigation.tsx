"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { lockScroll, scrollToTarget } from "@/lib/scroll";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0, show: false });

  // Scroll state + top progress bar (rAF throttled, writes transform directly — no re-render per frame)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  // Which section is in the middle of the screen?
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id === "certifications" ? "work" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["hero", ...NAV.map((n) => n.id), "certifications"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Slide the ink pill under the active link
  useEffect(() => {
    const wrap = linksRef.current;
    const a = wrap?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!wrap || !a) return setInd((s) => ({ ...s, show: false }));
    setInd({ x: a.offsetLeft, w: a.offsetWidth, show: true });
  }, [active, scrolled]);

  useEffect(() => {
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToTarget(id), open ? 350 : 0);
  };

  return (
    <>
      <div className="nav-progress" aria-hidden="true">
        <div ref={barRef} />
      </div>
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Main">
        <button className="nav-brand" onClick={() => go("top")} aria-label="Back to top">
          <span className="nav-mark mono">{PROFILE.initials}</span>
          <span className="nav-name">{PROFILE.name}</span>
        </button>
        <div className="nav-links" ref={linksRef}>
          <span className="nav-ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w, opacity: ind.show ? 1 : 0 }} />
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              data-id={n.id}
              className={active === n.id ? "on" : ""}
              aria-current={active === n.id ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(n.id);
              }}
            >
              {n.label}
            </a>
          ))}
        </div>
        <button className="nav-menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu">
          Menu
        </button>
      </nav>

      <div id="mobile-menu" className={`mmenu ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <button className="mmenu-close nav-menu" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
          Close
        </button>
        <ol>
          {NAV.map((n, i) => (
            <li key={n.id} style={{ ["--i" as string]: i }}>
              <a
                href={`#${n.id}`}
                tabIndex={open ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  go(n.id);
                }}
              >
                <span className="mono">0{i + 1}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ol>
        <a className="mmenu-mail" href={`mailto:${PROFILE.email}`} tabIndex={open ? 0 : -1}>
          {PROFILE.email}
        </a>
      </div>

      <style>{`
        .nav-progress{position:fixed;inset:0 0 auto;height:2px;z-index:60;pointer-events:none}
        .nav-progress>div{height:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(0)}
        .nav{position:fixed;z-index:50;top:14px;left:var(--gutter);right:var(--gutter);display:flex;align-items:center;justify-content:space-between;gap:16px;pointer-events:none}
        .nav>*{pointer-events:auto}
        .nav-brand{display:flex;align-items:center;gap:12px}
        .nav-mark{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:600;box-shadow:inset 0 0 0 1.5px var(--ink);transition:background .4s,color .4s,transform .8s var(--ease)}
        .nav-brand:hover .nav-mark{transform:rotate(360deg)}
        .nav.is-scrolled .nav-mark{background:var(--ink);color:#fff}
        .nav-name{font-weight:650;letter-spacing:-.02em;transition:opacity .4s,transform .5s var(--ease)}
        .nav.is-scrolled .nav-name{opacity:0;transform:translateX(-8px);pointer-events:none}
        .nav-links{position:relative;display:flex;gap:2px;padding:5px;border-radius:999px;transition:background .4s,box-shadow .4s}
        .nav.is-scrolled .nav-links{background:rgba(255,255,255,.72);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line),0 10px 30px -18px rgba(0,0,0,.3)}
        .nav-links a{position:relative;z-index:1;padding:9px 15px;border-radius:999px;font-size:14px;font-weight:550;color:var(--ink-2);transition:color .35s}
        .nav-links a.on{color:#fff}
        .nav-links a:not(.on):hover{color:var(--ink)}
        .nav-ind{position:absolute;left:0;top:5px;bottom:5px;border-radius:999px;background:var(--ink);transition:transform .6s var(--ease),width .6s var(--ease),opacity .3s}
        .nav-menu{display:none;height:44px;padding:0 20px;border-radius:999px;font-weight:600;font-size:14px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line)}
        .mmenu{position:fixed;inset:0;z-index:70;background:var(--paper);clip-path:circle(0% at calc(100% - 50px) 36px);transition:clip-path .8s var(--ease);padding:96px var(--gutter) 40px;display:flex;flex-direction:column;visibility:hidden}
        .mmenu.open{clip-path:circle(150% at calc(100% - 50px) 36px);visibility:visible}
        .mmenu-close{display:block;position:absolute;top:14px;right:var(--gutter)}
        .mmenu ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
        .mmenu li{opacity:0;transform:translateY(30px);transition:opacity .6s var(--ease),transform .8s var(--ease);transition-delay:calc(var(--i)*60ms + 150ms)}
        .mmenu.open li{opacity:1;transform:none}
        .mmenu li a{display:flex;align-items:baseline;gap:14px;font-size:clamp(40px,11vw,64px);font-weight:700;letter-spacing:-.045em;line-height:1.05}
        .mmenu li a span{font-size:12px;color:var(--mute);letter-spacing:0;font-weight:500}
        .mmenu-mail{margin-top:auto;font-family:var(--font-mono);font-size:13px;color:var(--mute)}
        @media (max-width:900px){.nav-links{display:none}.nav-menu{display:block}}
      `}</style>
    </>
  );
}
