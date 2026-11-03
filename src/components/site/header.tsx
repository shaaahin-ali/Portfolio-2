"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/data";
import { CopyEmail, LocalTime, RollText, ThemeToggle } from "./bits";
import { useLenis, useScrollTo } from "./smooth-scroll";

const NAV = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
];

export default function Header() {
  const scrollTo = useScrollTo();
  const getLenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setScrolled(y > 24);
  });

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, getLenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`transition-[background-color,backdrop-filter] duration-500 ${
            scrolled && !open ? "bg-paper/80 backdrop-blur-md" : "bg-transparent"
          }`}
        >
          <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:h-20 sm:px-8">
            <button
              onClick={() => go("top")}
              className="font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-ink"
            >
              <RollText>{PROFILE.name}</RollText>
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <ul className="mr-2 hidden items-center gap-7 md:flex">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => go(item.id)}
                      className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink"
                    >
                      <RollText>{item.label}</RollText>
                    </button>
                  </li>
                ))}
              </ul>
              <ThemeToggle />
              <CopyEmail className="hidden sm:inline-flex" />
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-invert md:hidden"
              >
                <span
                  className={`absolute h-[1.5px] w-4 bg-invert-ink transition-transform duration-300 ${
                    open ? "rotate-45" : "-translate-y-[3px]"
                  }`}
                />
                <span
                  className={`absolute h-[1.5px] w-4 bg-invert-ink transition-transform duration-300 ${
                    open ? "-rotate-45" : "translate-y-[3px]"
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>
        <motion.div className="h-px origin-left bg-ink" style={{ scaleX: progress }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-4 pb-8 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {NAV.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.button
                    onClick={() => go(item.id)}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex w-full items-baseline gap-3 font-display text-6xl font-medium tracking-tight text-ink"
                  >
                    <span className="font-mono text-xs text-muted-ink">0{i + 1}</span>
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <CopyEmail />
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-muted-ink">
                <span>Kochi, IN</span>
                <LocalTime />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
