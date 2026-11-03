"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { LocalTime } from "./bits";
import { MaskLines, TypeIn } from "./reveal";
import { useScrollTo } from "./smooth-scroll";

const RING = "ASPIRING AI ENGINEER • FULL-STACK DEVELOPER • OPEN TO INTERNSHIPS • ";

export default function Hero({ ready }: { ready: boolean }) {
  const scrollTo = useScrollTo();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Portrait tilts toward the pointer.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 22);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-4 pb-16 pt-28 sm:px-8"
    >
      <motion.div
        style={{ opacity: fade, y: lift }}
        className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16 lg:gap-24"
      >
        {/* Portrait with orbiting label */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-52 w-52 sm:h-64 sm:w-64 lg:h-80 lg:w-80"
          style={{ perspective: 800 }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <svg viewBox="0 0 200 200" className="spin-slow absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] text-muted-ink">
            <defs>
              <path id="ring" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
            </defs>
            <text className="fill-current font-mono text-[8.6px] tracking-[0.2em]">
              <textPath href="#ring">{RING}</textPath>
            </text>
          </svg>
          <motion.div
            style={{ rotateX: srx, rotateY: sry }}
            data-cursor="Hi!"
            className="relative h-full w-full overflow-hidden rounded-full bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]"
          >
            <Image
              src="/hero-profile.jpg"
              alt="Portrait of Shahin Ali"
              fill
              priority
              sizes="(min-width: 1024px) 320px, 256px"
              className="scale-110 object-cover object-[50%_35%] grayscale transition-[filter,transform] duration-700 hover:scale-100 hover:grayscale-0"
            />
          </motion.div>
          <motion.span
            initial={{ scale: 0 }}
            animate={ready ? { scale: 1 } : {}}
            transition={{ delay: 1, type: "spring", stiffness: 300, damping: 15 }}
            className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-signal text-xl shadow-lg sm:bottom-5 sm:right-5"
            aria-hidden
          >
            👋
          </motion.span>
        </motion.div>

        {/* Headline */}
        <div className="text-center md:text-left">
          <MaskLines
            immediate={ready}
            delay={0.15}
            className="font-display text-[13vw] font-medium leading-[0.92] tracking-[-0.04em] sm:text-[9vw] md:text-[5.8vw] xl:text-[84px]"
            lineClassName={(i) => (i === 0 ? "text-ink" : "text-muted-ink")}
            lines={[
              <>Aspiring</>,
              <>AI Engineer &</>,
              <>Full-Stack</>,
              <>Developer</>,
            ]}
          />
          <div className="mx-auto mt-8 max-w-xl space-y-4 text-lg leading-snug text-ink md:mx-0 sm:text-xl">
            <p>
              <TypeIn
                start={ready}
                delay={0.9}
                text="Learning by shipping — most recently RAG-based LLM agent pipelines as a Software Developer Intern at QuanHack Solutions."
              />
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="text-muted-ink"
            >
              Studying CS at Govt. Model Engineering College, Kochi. Off the keyboard I sketch, design posters and
              play football.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Meta row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute inset-x-4 bottom-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-ink sm:inset-x-8"
      >
        <span className="flex items-center gap-2 text-ink">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          Open to internships
        </span>
        <span className="hidden sm:inline">
          Kochi, IN — <LocalTime /> IST
        </span>
        <button onClick={() => scrollTo("work")} className="group flex items-center gap-2 text-ink">
          Scroll
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            ↓
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
}
