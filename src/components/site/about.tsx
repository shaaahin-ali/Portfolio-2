"use client";

import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { JOURNEY, STATS } from "@/lib/data";
import { LogoTile } from "./bits";
import { FadeIn, ScrollRevealText, SectionLabel } from "./reveal";

// One tile per organisation from the leadership roles.
const COMMUNITIES = JOURNEY.Leadership.filter(
  (e, i, all) => e.logo && all.findIndex((o) => o.org === e.org) === i
);

const INTERESTS = ["AI Agents", "Cloud", "Machine Learning", "Web", "Game Dev", "Sketching", "Design", "Football"];

export default function About() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const photoRotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section id="about" className="mx-auto max-w-[1400px] px-4 py-28 sm:px-8 sm:py-40">
      <SectionLabel index="02">About</SectionLabel>

      <ScrollRevealText
        as="h2"
        className="mt-10 max-w-[22ch] font-display text-[9vw] font-medium leading-[1.02] tracking-[-0.035em] text-ink sm:text-[6vw] lg:text-[64px]"
        text="I love building intelligent systems where AI meets thoughtful, full-stack product design."
      />

      <div className="mt-20 grid gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
        <motion.div ref={photoRef} style={{ y: photoY, rotate: photoRotate }} className="mx-auto w-full max-w-sm">
          <div
            data-cursor="That's me"
            className="group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/profile.png"
              alt="Shahin Ali, smiling"
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink backdrop-blur">
              Hey, I&apos;m Shahin 👋
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col justify-center">
          <FadeIn>
            <p className="text-xl leading-relaxed text-ink sm:text-2xl">
              I&apos;m a B.Tech Computer Science student at Govt. Model Engineering College, Kochi, with a CGPA of
              9.2 — and I spend most of my time shipping things.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-ink">
              From semantic retrieval systems and vector-grounded Q&amp;A to disaster response platforms and deepfake
              detection, I love turning complex problems into elegant, production-ready products. Off the keyboard
              I&apos;m sketching, designing posters for campus events, or leading event teams at Excel and IEDC.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {INTERESTS.map((tag, i) => (
                <motion.li
                  key={tag}
                  whileHover={{ y: -3, rotate: i % 2 ? 3 : -3 }}
                  className="rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:bg-invert hover:text-invert-ink"
                >
                  {tag}
                </motion.li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 border-t border-line pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-ink">Communities I’ve led in</p>
              <ul className="mt-4 flex flex-wrap gap-4">
                {COMMUNITIES.map((c) => (
                  <motion.li key={c.org} whileHover={{ y: -4, rotate: -2 }} className="flex items-center gap-3">
                    <LogoTile logo={c.logo!} alt={`${c.org} logo`} className="h-14 w-24" />
                    <span className="text-sm leading-tight text-ink">
                      {c.org}
                      <span className="block text-muted-ink">{c.title}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>

      <dl className="mt-24 grid grid-cols-2 border-t border-line md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`border-b border-line py-8 md:border-b-0 ${i % 2 === 0 ? "pr-4" : "pl-4 md:pl-0"} ${
              i > 0 ? "md:border-l md:pl-6" : ""
            }`}
          >
            <dd className="font-display text-6xl font-medium tracking-[-0.04em] text-ink sm:text-7xl">
              <Counter to={s.value} decimals={s.decimals ?? 0} />
              {s.suffix}
            </dd>
            <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-ink">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Counter({ to, decimals }: { to: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setVal });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toFixed(decimals)}
    </span>
  );
}
