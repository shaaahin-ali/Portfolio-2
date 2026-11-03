"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Count-up intro shown once per browser session, then slides away. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(id);
    }
    let hide: ReturnType<typeof setTimeout>;
    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        try {
          sessionStorage.setItem("intro-seen", "1");
        } catch {}
        hide = setTimeout(() => setVisible(false), 200);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(hide);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-invert p-6 text-invert-ink sm:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">
            <span>Shahin Ali</span>
            <span>Portfolio ’26</span>
          </div>
          <div className="flex items-end justify-between">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-[16ch] font-display text-2xl leading-tight sm:text-3xl"
            >
              Aspiring AI engineer &amp; full-stack developer.
            </motion.p>
            <span className="font-display text-[22vw] font-medium leading-[0.8] tracking-tighter tabular-nums sm:text-[14vw]">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
