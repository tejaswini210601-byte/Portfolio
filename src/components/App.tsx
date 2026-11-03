"use client";
import { SmoothScroll } from "@/lib/scroll";
import RevealObserver from "./ui/RevealObserver";
import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";

/** The whole site is one continuous scroll — sections in this exact order. */
export default function App() {
  return (
    <>
      <SmoothScroll />
      <RevealObserver />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] btn btn-primary">
        Skip to content
      </a>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
