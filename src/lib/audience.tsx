"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { Audience } from "./data";

/**
 * Remembers who is visiting: "parents" or "recruiters".
 * - You can link straight to a view: ...?for=recruiters (handy in job emails!)
 * - The choice is remembered in this browser (localStorage), wrapped in try/catch
 *   because some browsers block storage.
 */
const Ctx = createContext<{ who: Audience; setWho: (a: Audience) => void }>({ who: "parents", setWho: () => {} });

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [who, setWhoState] = useState<Audience>("parents");

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("for");
    if (q === "parents" || q === "recruiters") return setWhoState(q);
    try {
      const saved = localStorage.getItem("audience");
      if (saved === "parents" || saved === "recruiters") setWhoState(saved);
    } catch {}
  }, []);

  const setWho = (a: Audience) => {
    setWhoState(a);
    try {
      localStorage.setItem("audience", a);
    } catch {}
  };

  return <Ctx.Provider value={{ who, setWho }}>{children}</Ctx.Provider>;
}

export const useAudience = () => useContext(Ctx);
