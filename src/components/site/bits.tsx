"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Check, Copy, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { PROFILE, type Logo } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Black pill that copies the email and swaps its label to a confirmation. */
export function CopyEmail({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <Magnetic>
      <button
        onClick={copy}
        data-cursor="Copy"
        aria-label={`Copy email address ${PROFILE.email}`}
        className={cn(
          "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-invert font-medium uppercase tracking-wide text-invert-ink transition-transform active:scale-95",
          size === "lg" ? "h-14 px-7 text-sm sm:text-base" : "h-10 px-4 text-[12px]",
          className
        )}
      >
        <span className="relative block overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={copied ? "done" : "email"}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="block whitespace-nowrap"
            >
              {copied ? "Email copied!" : PROFILE.email}
            </motion.span>
          </AnimatePresence>
        </span>
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 opacity-70" />}
      </button>
    </Magnetic>
  );
}

function subscribeToTheme(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.classList.contains("dark"),
    () => false
  );

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line text-ink transition-colors hover:bg-surface"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/** Live clock in Kochi. Renders empty on the server to avoid a hydration mismatch. */
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: PROFILE.timezone,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className={cn("tabular-nums", className)}>{now || "--:--:--"}</span>;
}

/** Pulls its child gently toward the pointer. */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

/** Text that rolls to a duplicate of itself on hover. */
export function RollText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("group/roll relative inline-block overflow-hidden align-top", className)}>
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/roll:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/roll:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

/** Rounded tile for an organisation logo, padded when the artwork needs breathing room. */
export function LogoTile({ logo, alt, className }: { logo: Logo; alt: string; className?: string }) {
  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-xl border border-line transition-transform duration-500",
        className
      )}
      style={{ backgroundColor: logo.bg }}
    >
      <Image
        src={logo.src}
        alt={alt}
        fill
        sizes="160px"
        className={logo.fit === "contain" ? "object-contain p-2" : "object-cover object-[50%_40%]"}
      />
    </span>
  );
}
