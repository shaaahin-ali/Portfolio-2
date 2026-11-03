"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Award,
  BookOpen,
  Trophy,
  Briefcase,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Star,
  Zap,
} from "lucide-react";

interface ExperienceSectionProps {
  isDark: boolean;
}

/* ─── Internship Card (collapsible) ──────────────────────────────────────── */

interface InternshipCardProps {
  title: string;
  company: string;
  duration: string;
  shortDesc: string;
  fullDesc: string;
  stack: string[];
  isDark: boolean;
  index: number;
}

const InternshipCard: React.FC<InternshipCardProps> = ({
  title,
  company,
  duration,
  shortDesc,
  fullDesc,
  stack,
  isDark,
  index,
}) => {
  const [inView, setInView] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const toggle = useCallback(() => setExpanded((p) => !p), []);

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden transition-all duration-700"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
        backgroundColor: isDark ? "rgba(245,166,35,0.04)" : "rgba(245,166,35,0.03)",
        border: `1px solid ${isDark ? "rgba(245,166,35,0.18)" : "rgba(245,166,35,0.22)"}`,
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, #F5A623, #F5A62360)" }} />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[9px] font-black uppercase tracking-[0.25em] px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "rgba(245,166,35,0.15)", color: "#F5A623", border: "1px solid rgba(245,166,35,0.3)" }}
              >
                Internship
              </span>
              <span className="text-xs font-medium" style={{ color: isDark ? "hsl(0 0% 45%)" : "hsl(0 0% 55%)" }}>
                {duration}
              </span>
            </div>
            <h4 className="text-xl font-black tracking-tight" style={{ fontFamily: "'Fira Code', monospace" }}>
              {title}
            </h4>
            <p className="text-sm font-semibold mt-0.5" style={{ color: "#F5A623" }}>
              {company}
            </p>
          </div>
        </div>

        {/* Short description — always visible */}
        <p
          className="text-sm leading-relaxed mt-3"
          style={{
            fontFamily: "'Antic', sans-serif",
            color: isDark ? "hsl(0 0% 62%)" : "hsl(0 0% 42%)",
          }}
        >
          {shortDesc}
        </p>

        {/* Expanded content */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{ maxHeight: expanded ? "400px" : "0px", opacity: expanded ? 1 : 0 }}
        >
          <p
            className="text-sm leading-relaxed mt-3"
            style={{
              fontFamily: "'Antic', sans-serif",
              color: isDark ? "hsl(0 0% 58%)" : "hsl(0 0% 45%)",
            }}
          >
            {fullDesc}
          </p>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {stack.map((s) => (
              <span
                key={s}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: isDark ? "rgba(245,166,35,0.1)" : "rgba(245,166,35,0.08)",
                  color: "#F5A623",
                  border: "1px solid rgba(245,166,35,0.2)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={toggle}
          className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 hover:gap-2"
          style={{ color: "#F5A623" }}
        >
          {expanded ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> Show more</>
          )}
        </button>
      </div>
    </div>
  );
};

/* ─── Role Card (Key Roles & Positions) ─────────────────────────────────── */

interface RoleCardProps {
  title: string;
  org: string;
  description: string;
  isDark: boolean;
  index: number;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, org, description, isDark, index }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className="p-5 rounded-2xl transition-all duration-500 hover:-translate-y-1"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.65s ease ${index * 100}ms`,
        backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 96%)",
        border: `1px solid ${isDark ? "hsl(0 0% 11%)" : "hsl(0 0% 88%)"}`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#C3E41D" }} />
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold" style={{ color: "#C3E41D" }}>
          {org}
        </span>
      </div>
      <h4 className="text-base font-bold mb-2" style={{ fontFamily: "'Fira Code', monospace" }}>
        {title}
      </h4>
      <p className="text-sm leading-relaxed" style={{
        fontFamily: "'Antic', sans-serif",
        color: isDark ? "hsl(0 0% 58%)" : "hsl(0 0% 45%)",
      }}>
        {description}
      </p>
    </div>
  );
};

/* ─── Certification Card ─────────────────────────────────────────────────── */

interface CertCardProps {
  title: string;
  provider: string;
  note?: string;
  isDark: boolean;
  index: number;
}

const CertCard: React.FC<CertCardProps> = ({ title, provider, note, isDark, index }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className="flex items-start gap-4 p-4 rounded-xl transition-all duration-500 hover:-translate-y-0.5"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease ${index * 90}ms`,
        backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 96%)",
        border: `1px solid ${isDark ? "rgba(99,179,237,0.12)" : "rgba(99,179,237,0.18)"}`,
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: "rgba(99,179,237,0.1)", border: "1px solid rgba(99,179,237,0.2)" }}
      >
        <Award className="w-4 h-4" style={{ color: "#63B3ED" }} />
      </div>
      <div>
        <p className="text-sm font-bold leading-snug" style={{ fontFamily: "'Fira Code', monospace" }}>
          {title}
        </p>
        <p className="text-xs font-medium mt-0.5" style={{ color: "#63B3ED" }}>
          {provider}
        </p>
        {note && (
          <p className="text-xs mt-1" style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 55%)" }}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
};

/* ─── Achievement Item ───────────────────────────────────────────────────── */

interface AchievementItemProps {
  text: string;
  isDark: boolean;
  index: number;
  isHighlight?: boolean;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ text, isDark, index, isHighlight }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className="flex items-start gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:translate-x-1"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.55s ease ${index * 80}ms`,
        backgroundColor: isHighlight
          ? isDark ? "rgba(195,228,29,0.04)" : "rgba(195,228,29,0.05)"
          : "transparent",
        border: isHighlight
          ? `1px solid ${isDark ? "rgba(195,228,29,0.12)" : "rgba(195,228,29,0.18)"}`
          : "none",
      }}
    >
      {isHighlight
        ? <Trophy className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#C3E41D" }} />
        : <Star className="w-3 h-3 mt-1 shrink-0" style={{ color: isDark ? "hsl(0 0% 35%)" : "hsl(0 0% 60%)" }} />
      }
      <p className="text-sm leading-relaxed" style={{
        fontFamily: "'Antic', sans-serif",
        color: isDark ? "hsl(0 0% 62%)" : "hsl(0 0% 40%)",
      }}>
        {text}
      </p>
    </div>
  );
};

/* ─── Section Label ──────────────────────────────────────────────────────── */

function SectionLabel({ label, isDark }: { label: string; isDark: boolean }) {
  return (
    <h3
      className="text-[10px] uppercase tracking-[0.35em] mb-6 font-black flex items-center gap-3"
      style={{ color: isDark ? "hsl(0 0% 40%)" : "hsl(0 0% 55%)" }}
    >
      <span className="inline-block h-px w-6 bg-current opacity-40" />
      {label}
    </h3>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */

export default function ExperienceSection({ isDark }: ExperienceSectionProps) {
  const [titleInView, setTitleInView] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleInView(true); },
      { threshold: 0.1 }
    );
    const el = titleRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const internships = [
    {
      title: "Software Developer Intern",
      company: "QuanHack Solutions",
      duration: "Ongoing",
      shortDesc: "Building RAG-based LLM agent pipelines for autonomous multi-step enterprise workflows.",
      fullDesc:
        "Working on backend development for scalable AI-driven enterprise applications — designing and integrating LLM agent pipelines that handle multi-step autonomous decision-making. Gained hands-on experience with API integration, vector database management (ChromaDB, FAISS), and Docker-based deployment pipelines relevant to cloud networking and system scaling.",
      stack: ["React", "TypeScript", "Next.js", "FastAPI", "RAG", "LLMs", "Docker", "ChromaDB", "FAISS", "PostgreSQL"],
    },
    {
      title: "Game Developer Intern",
      company: "Groop Games",
      duration: "2 Months",
      shortDesc: "Built a Minimax (Alpha-Beta Pruning) solver and core gameplay systems for a trick-taking puzzle game.",
      fullDesc:
        "Developed a hybrid DDS and Minimax (Alpha-Beta Pruning) solver to generate mathematically optimal solutions for a trick-taking puzzle game, achieving consistent near-perfect play. Designed and implemented 300+ puzzles across 6 difficulty tiers with difficulty scaling logic, optimized solver performance for low-latency gameplay, and integrated core game state management.",
      stack: ["Flutter", "Dart", "C++", "SQLite"],
    },
  ];

  const roles = [
    {
      title: "Ambience Manager",
      org: "Excel MEC 2026",
      description: "Directed visual aesthetics and environmental design for the annual techno-cultural festival of Model Engineering College.",
    },
    {
      title: "Chief Publicity Officer",
      org: "IEDC MEC 2025",
      description: "Led publicity strategy for start-up events at the Innovation & Entrepreneurship Development Centre — campaigns, branding, and outreach.",
    },
    {
      title: "Events Head",
      org: "Excel MEC 2025",
      description: "Spearheaded operations and event coordination for the national-level techno-managerial fest of Model Engineering College.",
    },
  ];

  const certifications = [
    {
      title: "Pursuing Honours Degree — Computer Science & Engineering",
      provider: "KTU",
      note: "In progress alongside B.Tech",
    },
    {
      title: "Fundamentals of Building AI Agents",
      provider: "IBM · Coursera",
    },
    {
      title: "Cloud Computing",
      provider: "NPTEL — IIT Kharagpur",
    },
    {
      title: "Python Programming",
      provider: "Kaggle",
    },
  ];

  const achievements = [
    { text: "Participated in IEEE MAGIC 3.0 Hackathon — built a library management system within 24 hours in a team of 4, ranked Top 10", highlight: true },
    { text: "Active member of Design & Management Team, Excel MEC — contributing to event organization and operations", highlight: false },
    { text: "Member of Design Team, IEDC MEC — designed promotional posters and visual assets for technical events", highlight: false },
    { text: "Completed 3-day NLP Workshop conducted by ICFOSS", highlight: false },
    { text: "Participated in Drone Workshop conducted by Excel MEC 2025", highlight: false },
    { text: "Attended Agent Development Kit Hands-on Workshop, Excel MEC 2025", highlight: false },
  ];

  return (
    <section
      id="experience"
      className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl -translate-x-1/2 pointer-events-none"
        style={{ backgroundColor: "#C3E41D" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div
          ref={titleRef}
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
            style={{ fontFamily: "'Fira Code', monospace", color: "#C3E41D" }}
          >
            EXPERIENCE
          </h2>
          <div className="w-24 h-1 rounded-full mb-16" style={{ backgroundColor: "#C3E41D" }} />
        </div>

        {/* ── 1. Internships ──────────────────────────────────────────── */}
        <div className="mb-20">
          <SectionLabel label="Work Experience" isDark={isDark} />
          <div className="grid md:grid-cols-2 gap-5">
            {internships.map((item, i) => (
              <InternshipCard key={item.company} {...item} isDark={isDark} index={i} />
            ))}
          </div>
        </div>

        {/* ── 2. Key Roles & Positions ────────────────────────────────── */}
        <div className="mb-20">
          <SectionLabel label="Key Roles & Positions" isDark={isDark} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role, i) => (
              <RoleCard key={role.title} {...role} isDark={isDark} index={i} />
            ))}
          </div>
        </div>

        {/* ── 3. Certifications ───────────────────────────────────────── */}
        <div className="mb-20">
          <SectionLabel label="Certifications" isDark={isDark} />
          <div className="grid sm:grid-cols-2 gap-3">
            {certifications.map((cert, i) => (
              <CertCard key={cert.title} {...cert} isDark={isDark} index={i} />
            ))}
          </div>
        </div>

        {/* ── 4. Achievements & Activities ────────────────────────────── */}
        <div>
          <SectionLabel label="Achievements & Activities" isDark={isDark} />
          <div className="space-y-1">
            {achievements.map((a, i) => (
              <AchievementItem
                key={i}
                text={a.text}
                isDark={isDark}
                index={i}
                isHighlight={a.highlight}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
