"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { PROJECTS } from "@/lib/data";

// Deal every screenshot into four columns, round-robin.
const ALL = PROJECTS.flatMap((p) => p.images.map((img) => ({ ...img, project: p.title })));
const COLUMNS = [0, 1, 2, 3].map((c) => ALL.filter((_, i) => i % 4 === c));

/** Dark panel of endlessly drifting screenshots that opens up as you scroll in. */
export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 20]);
  // Stop the drifting columns while the panel is off-screen.
  const onScreen = useInView(ref, { margin: "100px 0px" });

  return (
    <div ref={ref} className="px-2 sm:px-4">
      <motion.div
        style={{ scale, borderRadius: radius }}
        className={`col-pause relative mx-auto ${onScreen ? "" : "cols-paused"} h-[70svh] max-w-[1600px] overflow-hidden bg-panel sm:h-[90svh]`}
      >
        <div className="absolute inset-0 grid grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-4 md:grid-cols-4">
          {COLUMNS.map((col, c) => (
            <div key={c} className={`relative overflow-hidden ${c > 1 ? "hidden md:block" : ""}`}>
              <div
                className={c % 2 === 0 ? "col-up" : "col-down"}
                style={{ "--dur": `${38 + c * 7}s` } as React.CSSProperties}
              >
                {[...col, ...col].map((img, i) => (
                  <figure
                    key={i}
                    className="group relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-white/5 sm:mb-4"
                  >
                    <Image
                      src={img.src}
                      alt={i < col.length ? `${img.project} — ${img.caption}` : ""}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover object-top opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      {img.project}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-panel to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-panel to-transparent" />
      </motion.div>
    </div>
  );
}
