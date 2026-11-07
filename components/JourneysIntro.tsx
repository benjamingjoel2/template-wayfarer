"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import site from "@/site.config";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Button } from "./Button";

/** The photo grows from a small card to full screen as you scroll, then the caption fades in. */
export function JourneysIntro() {
  const j = site.journeysIntro;
  const count = site.journeys.length;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.42, 1]);
  const opacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  const cols = [j.principles.slice(0, 2), j.principles.slice(2)];

  return (
    <section id="journeys" aria-labelledby="journeys-h" className="relative bg-paper">
      <div ref={ref} className="relative h-[260svh]">
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
          <h2
            id="journeys-h"
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[14vw] leading-none text-ink lg:text-[min(6.5vw,6rem)]"
          >
            {j.title}
          </h2>
          <motion.div className="relative h-svh w-full overflow-hidden" style={reduce ? undefined : { scale }}>
            <div className="absolute inset-0 overflow-hidden">
              <div role="img" aria-label={j.photo.alt} className="absolute -inset-[4%]">
                <Media photo={j.photo} decorative />
              </div>
            </div>
            <motion.p
              style={reduce ? undefined : { opacity }}
              className="absolute inset-x-0 bottom-[8vh] mx-auto max-w-[34ch] px-gutter text-center text-body text-paper"
            >
              {j.caption}
            </motion.p>
          </motion.div>
        </div>
      </div>
      <div className="px-gutter pt-section">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.2fr_1fr] md:gap-grid">
          {cols.map((col, c) => (
            <div key={c} className={`flex flex-col gap-10 lg:gap-[3vw] ${c ? "md:order-3" : ""}`}>
              {col.map((p, n) => (
                <Reveal key={p.title} delay={0.1 * n}>
                  <h3 className="text-h3">{p.title}</h3>
                  <p className="mt-2 max-w-[34ch] text-body">{p.body}</p>
                </Reveal>
              ))}
            </div>
          ))}
          <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-[28rem] overflow-hidden rounded-media md:order-2">
            <Media photo={j.principlesPhoto} />
          </Reveal>
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="/journeys">{count === 1 ? "See the journey" : `See all ${count} journeys`}</Button>
        </div>
      </div>
    </section>
  );
}
