"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True once (or while) an element is on screen. */
export function useInView<T extends Element>(opts: IntersectionObserverInit & { once?: boolean } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { once = true, ...io } = opts;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        if (once) obs.disconnect();
      } else if (!once) setInView(false);
    }, io);
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}

/** 0 → 1 progress of the page scrolling through an element (rAF-throttled). */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, start = 0.75, end = 0.35) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = vh * end - r.height;
      const v = (from - r.top) / (from - to);
      setP(Math.min(1, Math.max(0, v)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [ref, start, end]);
  return p;
}
