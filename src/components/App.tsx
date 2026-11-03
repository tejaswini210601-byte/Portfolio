"use client";
import { AudienceProvider, useAudience } from "@/lib/audience";
import { SmoothScroll } from "@/lib/scroll";
import RevealObserver from "./ui/RevealObserver";
import Navigation from "./Navigation";
import Hero from "./sections/Hero";
import Kids from "./sections/Kids";
import Learn from "./sections/Learn";
import How from "./sections/How";
import Projects from "./sections/Projects";
import Numbers from "./sections/Numbers";
import Journey from "./sections/Journey";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

/**
 * Same sections for everyone, but the ORDER changes with the switch:
 * parents see the child-friendly parts first, recruiters see experience first.
 */
const SECTIONS = { kids: Kids, learn: Learn, how: How, projects: Projects, numbers: Numbers, journey: Journey, skills: Skills };
type Key = keyof typeof SECTIONS;
const ORDER: Record<"parents" | "recruiters", Key[]> = {
  parents: ["kids", "learn", "how", "projects", "numbers", "journey", "skills"],
  recruiters: ["numbers", "journey", "skills", "projects", "how", "kids", "learn"],
};

function Sections() {
  const { who } = useAudience();
  return (
    <main>
      <Hero />
      {ORDER[who].map((k) => {
        const S = SECTIONS[k];
        return <S key={k} />;
      })}
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <AudienceProvider>
      <SmoothScroll />
      <RevealObserver />
      <a href="#contact" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] btn btn-sun">Skip to contact</a>
      <Navigation />
      <Sections />
    </AudienceProvider>
  );
}
