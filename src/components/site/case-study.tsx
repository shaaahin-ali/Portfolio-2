"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/data";
import { useLenis } from "./smooth-scroll";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Full-height sheet with the long-form story of one project. */
export default function CaseStudy({
  index,
  onIndex,
  onClose,
}: {
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const getLenis = useLenis();
  const scroller = useRef<HTMLDivElement>(null);
  const [shot, setShot] = useState(0);
  const [dir, setDir] = useState(1);

  // Guard against an index past this project's screenshots.
  const current = Math.min(shot, project.images.length - 1);

  const step = useCallback(
    (d: number) => {
      setDir(d);
      setShot((s) => (s + d + project.images.length) % project.images.length);
    },
    [project.images.length]
  );

  // Freeze the page behind the sheet.
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [getLenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  const goTo = (i: number) => {
    setShot(0);
    scroller.current?.scrollTo({ top: 0 });
    onIndex(i);
  };

  const meta = [
    { k: "Role", v: project.role },
    { k: "Timeline", v: project.duration },
    { k: "Status", v: project.status },
    { k: "Team", v: project.teamSize ? `${project.teamSize} people` : "Solo" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[70]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={scroller}
        data-lenis-prevent
        className="absolute inset-x-0 bottom-0 top-3 overflow-y-auto overscroll-contain rounded-t-[28px] bg-paper text-ink sm:top-6"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper/90 px-4 py-3 backdrop-blur-md sm:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink">
            Case study {String(index + 1).padStart(2, "0")}/{String(PROJECTS.length).padStart(2, "0")}
          </span>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-invert text-invert-ink transition-transform hover:rotate-90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
            className="mx-auto max-w-[1200px] px-4 pb-10 pt-10 sm:px-8 sm:pt-16"
          >
            {/* Title */}
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink">{project.category}</p>
            <h2 className="mt-3 font-display text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              {project.title}
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-muted-ink sm:text-2xl">{project.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-invert px-5 text-sm font-medium text-invert-ink"
                >
                  Visit live site <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:bg-surface"
                >
                  View on GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>

            {/* Meta */}
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {meta.map((m) => (
                <div key={m.k} className="bg-paper p-4 sm:p-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-ink">{m.k}</dt>
                  <dd className="mt-1.5 text-[15px] font-medium">{m.v}</dd>
                </div>
              ))}
            </dl>

            {/* Gallery */}
            <div className="mt-10">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface">
                <AnimatePresence initial={false} custom={dir}>
                  <motion.div
                    key={`${project.id}-${current}`}
                    custom={dir}
                    className="absolute inset-0"
                    initial={{ x: `${dir * 100}%` }}
                    animate={{ x: "0%" }}
                    exit={{ x: `${-dir * 100}%` }}
                    transition={{ duration: 0.6, ease: EASE }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) step(1);
                      else if (info.offset.x > 60) step(-1);
                    }}
                  >
                    <Image
                      src={project.images[current].src}
                      alt={`${project.title} — ${project.images[current].caption}`}
                      fill
                      sizes="(min-width: 1200px) 1150px, 100vw"
                      className="pointer-events-none object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
                {project.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      onClick={() => step(-1)}
                      aria-label="Previous screenshot"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink backdrop-blur transition-transform hover:scale-110"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Next screenshot"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink backdrop-blur transition-transform hover:scale-110"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-sm text-muted-ink">{project.images[current].caption}</p>
                <span className="font-mono text-[11px] text-muted-ink">
                  {String(current + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {project.images.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => {
                      setDir(i > current ? 1 : -1);
                      setShot(i);
                    }}
                    aria-label={`Show ${img.caption}`}
                    className={`relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg border-2 transition sm:w-32 ${
                      i === current ? "border-ink" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.src} alt="" fill sizes="128px" className="object-cover object-top" />
                  </button>
                ))}
              </div>
            </div>

            {/* Story */}
            <div className="mt-16 grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink">Overview</h3>
              <p className="text-xl leading-relaxed sm:text-2xl">{project.overview}</p>

              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink">The problem</h3>
              <p className="text-lg leading-relaxed text-muted-ink">{project.challenge}</p>

              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink">How I solved it</h3>
              <ol className="divide-y divide-line border-y border-line">
                {project.problemSolving.map((p, i) => (
                  <li key={i} className="flex gap-5 py-5">
                    <span className="font-mono text-xs text-muted-ink">{String(i + 1).padStart(2, "0")}</span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ol>

              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink">Highlights</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 rounded-xl bg-surface p-4 text-[15px] leading-snug">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                    {h}
                  </li>
                ))}
              </ul>

              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink">Stack</h3>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Next */}
            <button
              onClick={() => goTo((index + 1) % PROJECTS.length)}
              data-cursor="Next"
              className="group mt-24 block w-full border-t border-line pt-8 text-left"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink">Next project</span>
              <span className="mt-2 flex items-center justify-between font-display text-5xl font-medium tracking-[-0.04em] text-muted-ink transition-colors group-hover:text-ink sm:text-7xl">
                {next.title}
                <ArrowRight className="h-10 w-10 transition-transform group-hover:translate-x-2 sm:h-14 sm:w-14" />
              </span>
            </button>
          </motion.article>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
