"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import CaseStudy from "./case-study";

// Where each card sits across the row, and how fast it drifts relative to the scroll.
const LAYOUT = [
  { align: "md:ml-[4%]", speed: 0 },
  { align: "md:ml-auto md:mr-[4%]", speed: -60 },
  { align: "md:ml-[18%]", speed: 30 },
  { align: "md:ml-auto md:mr-[14%]", speed: -40 },
  { align: "md:ml-[8%]", speed: 20 },
];

export default function Work() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const headingScale = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.82, 0.75]);
  const headingOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
  const hint = useTransform(scrollYProgress, [0, 0.12], [0.15, 1]);

  return (
    <section ref={ref} id="work" className="relative">
      <div className="sticky top-0 z-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-4">
        <motion.h2
          style={{ scale: headingScale, opacity: headingOpacity }}
          className="text-center font-display text-[24vw] font-medium leading-[0.88] tracking-[-0.055em] text-ink md:whitespace-nowrap md:text-[12.5vw] md:leading-none"
        >
          Featured work
        </motion.h2>
        <motion.p
          style={{ opacity: hint }}
          className="mt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-muted-ink"
        >
          (Scroll to explore · {String(PROJECTS.length).padStart(2, "0")} projects)
        </motion.p>
      </div>

      <div className="relative z-10 -mt-[45svh] space-y-[16svh] px-4 pb-[24svh] md:pb-[40svh] sm:px-8 md:space-y-[22svh]">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            layout={LAYOUT[i % LAYOUT.length]}
            onOpen={() => setActive(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <CaseStudy
            key="case-study"
            index={active}
            onIndex={setActive}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  layout,
  onOpen,
}: {
  project: Project;
  index: number;
  layout: (typeof LAYOUT)[number];
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [layout.speed, -layout.speed]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 ? 3 : -3, 0, index % 2 ? -2 : 2]);

  // Flip through the project's screenshots while hovered.
  const [hovered, setHovered] = useState(false);
  const [shot, setShot] = useState(0);
  useEffect(() => {
    if (!hovered) return;
    const id = setInterval(() => setShot((s) => (s + 1) % project.images.length), 900);
    return () => clearInterval(id);
  }, [hovered, project.images.length]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8 }}
      className={`w-full will-change-transform md:w-[46%] lg:w-[40%] ${layout.align}`}
    >
      <button
        onClick={onOpen}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          setShot(0);
        }}
        data-cursor="Open"
        className="group block w-full text-left"
        aria-label={`Open case study: ${project.title}`}
      >
        <motion.div
          style={{ rotate }}
          className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={shot}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={project.images[shot].src}
                alt={`${project.title} — ${project.images[shot].caption}`}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 46vw, 100vw"
                className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full bg-paper/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink backdrop-blur">
              {project.category}
            </span>
            {project.status === "Ongoing" && (
              <span className="flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Building
              </span>
            )}
          </div>
          {hovered && project.images.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-1">
              {project.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors ${i === shot ? "bg-white" : "bg-white/35"}`}
                />
              ))}
            </div>
          )}
        </motion.div>
        <div className="-mx-2 mt-2 flex items-start justify-between gap-4 rounded-2xl bg-paper px-2 pb-3 pt-3">
          <div>
            <h3 className="flex items-center gap-1.5 font-display text-2xl font-medium tracking-tight text-ink sm:text-[28px]">
              {project.title}
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </h3>
            <p className="mt-1 text-[15px] text-muted-ink">{project.tagline}</p>
          </div>
          <span className="font-mono text-[11px] text-muted-ink">
            {String(index + 1).padStart(2, "0")}/{String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>
      </button>
    </motion.div>
  );
}
