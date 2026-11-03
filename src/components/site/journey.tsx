"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { JOURNEY } from "@/lib/data";
import { LogoTile } from "./bits";
import { MaskLines, SectionLabel } from "./reveal";

const TABS = Object.keys(JOURNEY);

export default function Journey() {
  const [tab, setTab] = useState(TABS[0]);
  const [open, setOpen] = useState<number | null>(0);

  const select = (t: string) => {
    setTab(t);
    setOpen(t === TABS[0] ? 0 : null);
  };

  return (
    <section id="journey" className="mx-auto max-w-[1400px] px-4 py-28 sm:px-8 sm:py-40">
      <SectionLabel index="04">Journey</SectionLabel>

      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <MaskLines
          className="font-display text-[11vw] font-medium leading-[0.95] tracking-[-0.045em] sm:text-[7vw] lg:text-[84px]"
          lineClassName={(i) => (i === 0 ? "text-ink" : "text-muted-ink")}
          lines={["Where I’ve been", "& what I’ve led."]}
        />

        <div role="tablist" aria-label="Journey categories" className="grid w-full grid-cols-2 gap-1 rounded-[22px] bg-surface p-1 sm:flex sm:w-fit sm:self-start sm:rounded-full lg:self-auto">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => select(t)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors sm:px-5 ${
                tab === t ? "text-invert-ink" : "text-muted-ink hover:text-ink"
              }`}
            >
              {tab === t && (
                <motion.span
                  layoutId="journey-pill"
                  className="absolute inset-0 rounded-full bg-invert"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="mt-14 border-t border-line"
        >
          {JOURNEY[tab].map((entry, i) => {
            const expandable = !!(entry.detail || entry.tags);
            const isOpen = open === i && expandable;
            return (
              <motion.li
                key={`${entry.org}-${entry.title}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="border-b border-line"
              >
                <button
                  onClick={() => expandable && setOpen(isOpen ? null : i)}
                  aria-expanded={expandable ? isOpen : undefined}
                  disabled={!expandable}
                  className="group grid w-full grid-cols-1 gap-2 py-8 text-left disabled:cursor-default sm:grid-cols-[180px_1fr_auto] sm:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
                >
                  <span className="flex items-center gap-4 sm:flex-col sm:items-start">
                    <span className="font-display text-lg text-muted-ink sm:text-xl">{entry.period}</span>
                    {entry.logo && (
                      <LogoTile
                        logo={entry.logo}
                        alt={`${entry.org} logo`}
                        className="order-first h-12 w-20 group-hover:-rotate-3 group-hover:scale-105 sm:order-none sm:h-16 sm:w-28"
                      />
                    )}
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-medium leading-tight tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 sm:text-[28px]">
                      {entry.org}, {entry.title}.
                    </span>
                    {entry.place && <span className="mt-1 block text-[15px] text-muted-ink">{entry.place}</span>}
                    {entry.summary && (
                      <span className="mt-3 block max-w-xl text-[16px] leading-relaxed text-ink/80">
                        {entry.summary}
                      </span>
                    )}
                  </span>
                  {expandable && (
                    <span
                      className={`hidden h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:bg-invert group-hover:text-invert-ink sm:flex ${
                        isOpen ? "rotate-45 bg-invert text-invert-ink" : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-10 sm:grid-cols-[180px_1fr] sm:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_40px]">
                        <span className="hidden sm:block" />
                        <div>
                          {entry.detail && (
                            <p className="max-w-xl text-[16px] leading-relaxed text-muted-ink">{entry.detail}</p>
                          )}
                          {entry.tags && (
                            <ul className="mt-5 flex flex-wrap gap-2">
                              {entry.tags.map((t) => (
                                <li key={t} className="rounded-full bg-surface px-3 py-1 text-[13px] text-ink">
                                  {t}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}
