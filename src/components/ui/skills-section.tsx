"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Code2,
  Database,
  Globe,
  Brain,
  GitBranch,
  Terminal,
  Layout,
  Server,
  MessageSquare,
  Users,
  Lightbulb,
  Target,
} from "lucide-react";

interface SkillCardProps {
  icon: React.ReactNode;
  name: string;
  isDark: boolean;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, name, isDark, index }) => {
  const [inView, setInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    const current = ref.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`,
      }}
    >
      <div
        className="p-6 rounded-2xl transition-all duration-500 flex flex-col items-center gap-3 text-center"
        style={{
          backgroundColor: isDark
            ? isHovered
              ? "rgba(195, 228, 29, 0.08)"
              : "hsl(0 0% 5%)"
            : isHovered
            ? "rgba(195, 228, 29, 0.1)"
            : "hsl(0 0% 94%)",
          border: `1px solid ${
            isHovered
              ? "rgba(195, 228, 29, 0.4)"
              : isDark
              ? "hsl(0 0% 12%)"
              : "hsl(0 0% 88%)"
          }`,
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 20px 40px rgba(195, 228, 29, 0.1)"
            : "none",
        }}
      >
        <div
          className="transition-transform duration-500"
          style={{
            color: isHovered ? "#C3E41D" : isDark ? "hsl(0 0% 60%)" : "hsl(0 0% 45%)",
            transform: isHovered ? "scale(1.2)" : "scale(1)",
          }}
        >
          {icon}
        </div>
        <span
          className="text-sm font-semibold tracking-wide"
          style={{
            fontFamily: "'Fira Code', monospace",
            color: isHovered ? "#C3E41D" : isDark ? "hsl(0 0% 80%)" : "hsl(0 0% 30%)",
          }}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

interface SkillsSectionProps {
  isDark: boolean;
}

export default function SkillsSection({ isDark }: SkillsSectionProps) {
  const [titleInView, setTitleInView] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTitleInView(true);
      },
      { threshold: 0.1 }
    );
    const current = titleRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const technicalSkills = [
    { icon: <Code2 className="w-8 h-8" />, name: "Python" },
    { icon: <Terminal className="w-8 h-8" />, name: "C / C++" },
    { icon: <Code2 className="w-8 h-8" />, name: "Java" },
    { icon: <Globe className="w-8 h-8" />, name: "React" },
    { icon: <Layout className="w-8 h-8" />, name: "JavaScript" },
    { icon: <Server className="w-8 h-8" />, name: "Next.js" },
    { icon: <Globe className="w-8 h-8" />, name: "TypeScript" },
    { icon: <Layout className="w-8 h-8" />, name: "HTML / CSS" },
    { icon: <Brain className="w-8 h-8" />, name: "FastAPI" },
    { icon: <Database className="w-8 h-8" />, name: "PostgreSQL" },
    { icon: <Database className="w-8 h-8" />, name: "MySQL" },
    { icon: <Database className="w-8 h-8" />, name: "SQL / SQLite" },
    { icon: <Database className="w-8 h-8" />, name: "Pinecone" },
    { icon: <Server className="w-8 h-8" />, name: "Docker" },
    { icon: <GitBranch className="w-8 h-8" />, name: "Git" },
    { icon: <Brain className="w-8 h-8" />, name: "Machine Learning" },
    { icon: <Database className="w-8 h-8" />, name: "DSA" },
    { icon: <Code2 className="w-8 h-8" />, name: "OOP" },
    { icon: <Server className="w-8 h-8" />, name: "REST API" },
    { icon: <Terminal className="w-8 h-8" />, name: "Postman" },
  ];


  const softSkills = [
    { icon: <MessageSquare className="w-8 h-8" />, name: "Communication" },
    { icon: <Lightbulb className="w-8 h-8" />, name: "Creativity" },
    { icon: <Users className="w-8 h-8" />, name: "Leadership" },
    { icon: <Target className="w-8 h-8" />, name: "Problem Solving" },
    { icon: <Brain className="w-8 h-8" />, name: "Critical Thinking" },
    { icon: <Users className="w-8 h-8" />, name: "Teamwork" },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl"
        style={{ backgroundColor: "#C3E41D" }}
      />

      <div className="max-w-6xl mx-auto">
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
            SKILLS
          </h2>
          <div
            className="w-24 h-1 rounded-full mb-16"
            style={{ backgroundColor: "#C3E41D" }}
          />
        </div>

        {/* Technical Skills */}
        <div className="mb-16">
          <h3
            className="text-xs uppercase tracking-[0.3em] mb-8 font-bold"
            style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }}
          >
            Technical Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {technicalSkills.map((skill, i) => (
              <SkillCard
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                isDark={isDark}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3
            className="text-xs uppercase tracking-[0.3em] mb-8 font-bold"
            style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }}
          >
            Soft Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {softSkills.map((skill, i) => (
              <SkillCard
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                isDark={isDark}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
