"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import site from "@/site.config";
import { Media } from "./Media";

const CYCLE = [
  "var(--color-accent)",
  "var(--color-highlight)",
  "var(--color-tertiary)",
];

/** Cards that stack as you scroll; the middle word of the title changes colour per card. */
export function IncludedStack() {
  const items = site.stay.included;
  const [before, word, after] = site.stay.includedTitle;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => setI(Math.min(items.length - 1, Math.floor(p * items.length))));
  return (
    <div ref={ref} className="relative px-gutter pb-section">
      <div className="sticky top-[var(--header-h)] z-20 bg-paper pt-6 pb-4 lg:top-0 lg:pt-[3vw] lg:pb-[2vw]">
        <h3 className="text-center font-display text-[40px] leading-none text-accent md:text-[7vw] lg:text-h2">
          {before}{" "}
          <span className="transition-colors duration-700" style={{ color: CYCLE[i % CYCLE.length] }}>
            {word}
          </span>{" "}
          {after}
        </h3>
      </div>
      <ol>
        {items.map((it) => (
          <li
            key={it.title}
            className="sticky top-[var(--stack-top)] grid h-[65svh] grid-cols-1 content-start gap-2.5 border-t border-accent-light bg-paper pt-3.5 md:h-[40vh] md:grid-cols-[1fr_2fr_1fr] md:gap-5 md:pt-5 lg:h-[60vh] lg:pt-[2vw]"
          >
            <h4 className="text-h3">{it.title}</h4>
            <div className="relative h-[34svh] overflow-hidden rounded-media md:mx-auto md:h-[30vh] md:w-[55%] lg:h-[46vh]">
              <Media photo={it.photo} />
            </div>
            <p className="text-body md:max-w-[28ch]">{it.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
