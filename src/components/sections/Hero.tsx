"use client";
import { useEffect, useRef, useState } from "react";
import { HERO, PROFILE, asset } from "@/lib/data";
import { useAudience } from "@/lib/audience";
import { prefersReducedMotion } from "@/lib/hooks";
import { scrollToTarget } from "@/lib/scroll";
import { AudienceSwitch } from "../Navigation";

/**
 * Cursor-tracking 3D hero.
 *
 * How it works:
 * - scripts/build-hero-frames.py cut my Google Flow video into 64 still frames,
 *   one for every direction around a circle (frame 0 = looking right, 16 = up, 32 = left, 48 = down)
 *   plus center.webp (looking straight at you).
 * - Here we preload those images and, every animation frame (~60 times a second),
 *   work out the angle from my face to your cursor with Math.atan2.
 * - The angle is smoothed (shortest way round the circle) and we draw exactly ONE
 *   matching frame on a <canvas>. No video seeking, no blending, so no lag or "ghost faces".
 * - If your cursor is close to my face, I look straight at you.
 */
const COUNT = 64;
const FW = 1094, FH = 620;          // frame size
const FACE = { x: 0.52, y: 0.36 };  // where my face is inside a frame (0–1)
export const HERO_BG = "#f1a323";    // the exact background colour of the video

const lerpAngle = (a: number, b: number, t: number) => {
  const d = ((b - a + 540) % 360) - 180; // shortest way round
  return a + d * t;
};

export default function Hero() {
  const { who } = useAudience();
  const h = HERO[who];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = prefersReducedMotion();
    const frames: HTMLImageElement[] = [];
    const center = new Image();
    center.src = asset("/hero/frames/center.webp");
    let loaded = 0;
    // load the 64 direction frames after the centre one, so the first paint is fast
    center.onload = () => {
      setReady(true);
      draw(center);
      if (reduce) return;
      for (let i = 0; i < COUNT; i++) {
        const im = new Image();
        im.decoding = "async";
        im.src = asset(`/hero/frames/${String(i).padStart(2, "0")}.webp`);
        im.onload = () => loaded++;
        frames[i] = im;
      }
    };

    let W = 0, H = 0, dpr = 1;
    let box = { x: 0, y: 0, w: 0, h: 0 }; // where the frame is drawn (CSS pixels)
    const layout = () => {
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      const mobile = W < 820;
      if (mobile) {
        // phone: me in the top part, text below
        const vh = Math.min(H, window.innerHeight);
        const w = Math.max(W * 1.45, (vh * 0.6 * FW) / FH);
        const hh = (w * FH) / FW;
        box = { x: (W - w) / 2, y: vh * 0.62 - hh, w, h: hh };
      } else {
        // desktop: fill the height, shift me right so the text on the left has room
        const hh = H * 0.93;
        const w = (hh * FW) / FH;
        box = { x: W * 0.64 - w / 2, y: H - hh, w, h: hh };
      }
    };

    let current: HTMLImageElement | null = null;
    function draw(img: HTMLImageElement) {
      if (img === current && cv.dataset.drawn === "1") return;
      current = img;
      cv.dataset.drawn = "1";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = HERO_BG;
      ctx.fillRect(0, 0, W, H);
      ctx.drawImage(img, box.x, box.y, box.w, box.h);
      // soften the frame's edges into the background so there's no visible box
      const fade = (x0: number, y0: number, x1: number, y1: number, rx: number, ry: number, rw: number, rh: number) => {
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, HERO_BG);
        g.addColorStop(1, HERO_BG + "00");
        ctx.fillStyle = g;
        ctx.fillRect(rx, ry, rw, rh);
      };
      const f = Math.min(80, box.w * 0.08);
      fade(box.x, 0, box.x + f, 0, box.x - 2, box.y, f + 2, box.h);
      fade(box.x + box.w, 0, box.x + box.w - f, 0, box.x + box.w - f, box.y, f + 2, box.h);
      fade(0, box.y, 0, box.y + f, box.x, box.y - 2, box.w, f + 2);
      if (box.y + box.h < H - 2) fade(0, box.y + box.h, 0, box.y + box.h - f * 1.6, box.x, box.y + box.h - f * 1.6, box.w, f * 1.6 + 2);
    }

    const redraw = () => {
      layout();
      cv.dataset.drawn = "0";
      if (current) draw(current);
    };
    layout();
    addEventListener("resize", redraw);

    // pointer tracking
    let mx = -1, my = -1, last = 0, angle = 0, inited = false, visible = true;
    let cx = 0, cy = 0, rx = 0, ry = 0; // custom cursor + its trailing ring
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top; last = performance.now();
    };
    addEventListener("pointermove", onMove, { passive: true });
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);

    const coarse = window.matchMedia("(hover: none)").matches;
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      // custom cursor follows instantly; the ring trails behind
      if (cursorRef.current && ringRef.current && mx >= 0) {
        cx = mx; cy = my;
        rx += (cx - rx) * 0.18; ry += (cy - ry) * 0.18;
        cursorRef.current.style.transform = `translate(${cx}px,${cy}px)`;
        ringRef.current.style.transform = `translate(${rx}px,${ry}px)`;
      }
      if (!visible || !current || reduce) return;
      const fx = box.x + box.w * FACE.x, fy = box.y + box.h * FACE.y;
      if (loaded < COUNT) return draw(center);
      const now = performance.now();
      const idle = now - last > 5000 || mx < 0;
      let target: number;
      if (idle) {
        // on phones (no cursor) I glance around by myself every few seconds, then look back at you
        if (!coarse) return draw(center);
        const k = (now % 9000) / 9000;
        if (k < 0.62) return draw(center);
        target = 90 - ((k - 0.62) / 0.38) * 360;
      } else {
        const dx = mx - fx, dy = my - fy;
        if (Math.hypot(dx, dy) < Math.min(W, H) * 0.12) return draw(center); // look straight at you
        target = (Math.atan2(-dy, dx) * 180) / Math.PI; // 0 = right, 90 = up
      }
      angle = inited ? lerpAngle(angle, target, 0.26) : target;
      inited = true;
      const idx = ((Math.round(((angle % 360) + 360) % 360 / (360 / COUNT)) % COUNT) + COUNT) % COUNT;
      draw(frames[idx]);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", redraw);
      removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <section id="hero" className="hero3d" aria-labelledby="hero-title" style={{ background: HERO_BG }}>
      <canvas ref={canvasRef} className={`h3-canvas ${ready ? "on" : ""}`} role="img" aria-label={`3D portrait of ${PROFILE.name} that turns to look at your cursor`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!ready && <img className="h3-poster" src={asset("/hero/frames/center.webp")} alt="" />}

      <div className="wrap h3-text" key={who}>
        <div className="h3-switch"><AudienceSwitch /></div>
        <p className="h3-hi">Hi, I&apos;m</p>
        <h1 id="hero-title" className="h3-name">{PROFILE.firstName}</h1>
        <p className="h3-role">{h.eyebrow}</p>
        <p className="h3-bio">{h.sub}</p>
        <div className="h3-ctas">
          {"download" in h.primary ? (
            <a className="h3-btn solid" href={h.primary.href} download>{h.primary.label} <span aria-hidden="true">↓</span></a>
          ) : (
            <a className="h3-btn solid" href={h.primary.href}>{h.primary.label} <span aria-hidden="true">→</span></a>
          )}
          <button className="h3-btn glass" onClick={() => scrollToTarget(who === "parents" ? "learn" : "contact")}>
            {who === "parents" ? h.secondary.label : "Let's talk"}
          </button>
        </div>
      </div>

      <div className="h3-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="h3-ring" ref={ringRef} aria-hidden="true" />
      <p className="h3-hint" aria-hidden="true">Move your cursor, I&apos;ll follow it 👀</p>

      <style>{`
        .hero3d{position:relative;height:100svh;min-height:600px;overflow:hidden;color:var(--ink)}
        .h3-canvas,.h3-poster{position:absolute;inset:0;width:100%;height:100%;display:block}
        .h3-poster{object-fit:cover;object-position:64% 100%}
        .h3-canvas{opacity:0;transition:opacity .6s}
        .h3-canvas.on{opacity:1}
        @media (hover:hover) and (pointer:fine){.hero3d,.hero3d *{cursor:none}}
        .h3-text{position:absolute;left:0;right:0;bottom:clamp(36px,8vh,90px);pointer-events:none}
        .h3-text>*{pointer-events:auto;max-width:400px}
        .h3-switch{margin-bottom:22px}
        .h3-hi{margin:0;font-family:var(--font-body);font-weight:800;font-size:15px;letter-spacing:.32em;text-transform:uppercase}
        .h3-name{margin:0;font-family:var(--font-script),cursive;font-weight:700;font-size:clamp(68px,8.4vw,128px);line-height:1;letter-spacing:0;text-shadow:0 6px 18px rgba(30,27,75,.22);animation:namein 1s var(--bounce) both}
        @keyframes namein{from{opacity:0;transform:translateY(20px) scale(.96)}}
        .h3-role{margin:10px 0 0;font-weight:800;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;opacity:.85}
        .h3-bio{margin:12px 0 0;max-width:360px!important;font-size:16px;line-height:1.55;font-weight:600}
        .h3-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}
        .h3-btn{display:inline-flex;align-items:center;gap:8px;height:50px;padding:0 24px;border-radius:999px;font-family:var(--font-fredoka);font-weight:600;font-size:16.5px;transition:transform .3s var(--bounce),box-shadow .3s,background .3s}
        .h3-btn.solid{background:#fff;color:var(--ink);box-shadow:0 10px 24px -10px rgba(30,27,75,.5)}
        .h3-btn.glass{background:rgba(255,255,255,.22);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.9)}
        .h3-btn:hover{transform:translateY(-3px) scale(1.03)}
        .h3-btn.glass:hover{background:rgba(255,255,255,.4)}
        .h3-cursor,.h3-ring{position:absolute;left:0;top:0;pointer-events:none;z-index:5;border-radius:50%;display:none}
        .h3-cursor{width:10px;height:10px;margin:-5px;background:#fff;box-shadow:0 0 14px 4px rgba(255,255,255,.75)}
        .h3-ring{width:42px;height:42px;margin:-21px;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.95),0 0 22px rgba(255,255,255,.35);transition:width .3s var(--bounce),height .3s var(--bounce),margin .3s var(--bounce)}
        .hero3d:has(a:hover,button:hover) .h3-ring{width:64px;height:64px;margin:-32px}
        @media (hover:hover) and (pointer:fine){.h3-cursor,.h3-ring{display:block}}
        .h3-hint{position:absolute;right:var(--gutter);bottom:28px;margin:0;font-weight:800;font-size:13px;background:rgba(255,255,255,.3);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:7px 14px;border-radius:999px}
        @media (hover:none){.h3-hint{display:none}}
        @media (max-width:819px){
          .hero3d{height:auto;min-height:100svh;display:flex;flex-direction:column;justify-content:flex-end}
          .h3-text{position:relative;bottom:auto;padding-top:62svh;padding-bottom:36px}
          .h3-name{font-size:clamp(60px,17vw,84px)}
          .h3-switch{position:absolute;top:calc(62svh - 64px);left:var(--gutter)}
        }
      `}</style>
    </section>
  );
}
