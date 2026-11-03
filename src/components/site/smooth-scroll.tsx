"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";

const LenisContext = createContext<() => Lenis | null>(() => null);

/** Returns a getter for the running Lenis instance (null when smooth scroll is off). */
export function useLenis() {
  return useContext(LenisContext);
}

/** Scrolls to an element id, using Lenis when it is running. */
export function useScrollTo() {
  const getLenis = useLenis();
  return (id: string) => {
    const lenis = getLenis();
    const el = id === "top" ? 0 : document.getElementById(id);
    if (el === null) return;
    if (lenis) lenis.scrollTo(el, { offset: id === "top" ? 0 : -40, duration: 1.4 });
    else if (el === 0) window.scrollTo({ top: 0, behavior: "smooth" });
    else el.scrollIntoView({ behavior: "smooth" });
  };
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const getLenis = useCallback(() => lenis.current, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    let raf = 0;
    const loop = (t: number) => {
      instance.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    lenis.current = instance;
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  return <LenisContext.Provider value={getLenis}>{children}</LenisContext.Provider>;
}
