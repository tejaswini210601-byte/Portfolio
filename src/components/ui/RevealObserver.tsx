"use client";
import { useEffect } from "react";

/** One observer for the whole page: adds .is-in to every .rv / .rv-mask when it scrolls into view (once). */
export default function RevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    const scan = () => document.querySelectorAll(".rv:not(.is-in), .rv-mask:not(.is-in)").forEach((el) => obs.observe(el));
    scan();
    const t = setTimeout(scan, 600);
    return () => {
      clearTimeout(t);
      obs.disconnect();
    };
  }, []);
  return null;
}
