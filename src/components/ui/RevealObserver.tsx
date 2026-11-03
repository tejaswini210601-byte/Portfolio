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
    // sections can be re-ordered by the Parents/Recruiters switch, so re-scan when the page changes
    let pending = 0;
    const mo = new MutationObserver(() => {
      if (!pending) pending = window.setTimeout(() => ((pending = 0), scan()), 100);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      clearTimeout(pending);
      obs.disconnect();
    };
  }, []);
  return null;
}
