"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/lib/data";
import { CopyEmail, LocalTime, Magnetic, RollText } from "./bits";
import { ScrollRevealText } from "./reveal";
import { useScrollTo } from "./smooth-scroll";

const LINKS = [
  { label: "GitHub", href: PROFILE.github },
  { label: "LinkedIn", href: PROFILE.linkedin },
  { label: "Email", href: `mailto:${PROFILE.email}` },
  { label: "Call", href: `tel:${PROFILE.phone.replace(/\s/g, "")}` },
];

export default function Contact() {
  const scrollTo = useScrollTo();

  return (
    <footer id="contact" className="mx-auto max-w-[1400px] px-4 pt-24 sm:px-8">
      <div className="border-t border-line pt-24 text-center sm:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">(05) What’s next?</p>
        <ScrollRevealText
          as="h2"
          className="mx-auto mt-8 max-w-[12ch] justify-center font-display text-[13vw] font-medium leading-[0.95] tracking-[-0.05em] text-ink sm:text-[9vw] lg:text-[120px]"
          text="Let’s get to know each other"
        />
        <p className="mx-auto mt-8 max-w-md text-lg text-muted-ink">
          Internships, collaborations, or just a good conversation about AI — my inbox is open.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <CopyEmail size="lg" />
          <Magnetic>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-line px-7 text-sm font-medium uppercase tracking-wide text-ink transition-colors hover:bg-surface sm:text-base"
            >
              Say hi on LinkedIn <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mt-32 flex flex-col gap-8 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink"
              >
                <RollText>{l.label}</RollText>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-ink">
          <span>
            Kochi <LocalTime />
          </span>
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <button
            onClick={() => scrollTo("top")}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-invert hover:text-invert-ink"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Oversized signature */}
      <div aria-hidden className="select-none overflow-hidden">
        <p className="translate-y-[18%] whitespace-nowrap text-center font-display text-[21vw] font-semibold leading-none tracking-[-0.06em] text-surface">
          Shahin Ali
        </p>
      </div>
    </footer>
  );
}
