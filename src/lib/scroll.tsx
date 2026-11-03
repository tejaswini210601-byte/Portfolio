"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

/** Smoothly scrolls to a section id (uses Lenis when available). */
export function scrollToTarget(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(id === "top" ? 0 : el, { offset: 0, duration: 1.2 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function lockScroll(lock: boolean) {
  if (lenis) (lock ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = lock ? "hidden" : "";
}

/** Mounts Lenis smooth scrolling once for the whole page (skipped for reduced motion). */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
