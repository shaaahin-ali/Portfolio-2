"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { useRef, useState } from "react";
import { TOOLBOX } from "@/lib/data";
import { SectionLabel } from "./reveal";

export default function Toolbox() {
  const [hovered, setHovered] = useState<string | null>(null);
  const all = TOOLBOX.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);

  return (
    <section id="toolbox" className="overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionLabel index="03">Toolbox</SectionLabel>
      </div>

      {/* Rows speed up and flip direction with your scroll */}
      <div className="mt-12 space-y-2 sm:space-y-4">
        <VelocityRow items={all.slice(0, half)} baseVelocity={-2.2} />
        <VelocityRow items={all.slice(half)} baseVelocity={2.2} muted />
      </div>

      <div className="mx-auto mt-20 grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-12 px-4 sm:px-8 md:grid-cols-5">
        {TOOLBOX.map((group) => (
          <div
            key={group.group}
            onPointerEnter={() => setHovered(group.group)}
            onPointerLeave={() => setHovered(null)}
            className={`transition-opacity duration-300 ${hovered && hovered !== group.group ? "opacity-30" : ""}`}
          >
            <h3 className="border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink">
              {group.group}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-[17px] text-ink transition-transform duration-300 hover:translate-x-1.5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function VelocityRow({ items, baseVelocity, muted }: { items: string[]; baseVelocity: number; muted?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref, { margin: "100px 0px" });
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const dir = useRef(1);
  const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!onScreen) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    x.set(x.get() + move);
  });

  const row = [...items, ...items];

  return (
    <div ref={ref} className="flex whitespace-nowrap">
      <motion.div style={{ x: pos }} className="flex shrink-0 will-change-transform">
        {row.map((item, i) => (
          <span
            key={i}
            className={`flex items-center font-display text-[13vw] font-medium leading-none tracking-[-0.04em] sm:text-[8vw] ${
              muted ? "text-faint" : "text-ink"
            }`}
          >
            {item}
            <span className="mx-[0.35em] text-[0.4em] text-signal">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
