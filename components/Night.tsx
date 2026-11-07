"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import site, { type Photo } from "@/site.config";
import { pad2 } from "@/lib/brand";
import { Media } from "./Media";
import { Button } from "./Button";

function Panel({ photo, index, last, children }: { photo: Photo; index: number; last: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  return (
    <div ref={ref} className={`relative ${last ? "h-svh" : "h-[200svh]"} ${index ? "-mt-[100svh]" : ""}`} style={{ zIndex: index + 1 }}>
      <motion.div className="sticky top-0 h-svh overflow-hidden bg-night" style={reduce || index === 0 ? undefined : { scaleX }}>
        <div className="absolute inset-0 overflow-hidden">
          <div role="img" aria-label={photo.alt} className="absolute -inset-[4%]">
            <Media photo={photo} decorative />
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-night/10" />
        <div className="absolute inset-x-0 bottom-0 px-gutter pb-[8vh] text-paper lg:pb-[6vw]">{children}</div>
      </motion.div>
    </div>
  );
}

/** Full-screen panels that stack on top of each other as you scroll. */
export function Night() {
  const n = site.night;
  const cta = site.nav.cta;
  return (
    <section id="a-night" aria-labelledby="a-night-h" className="relative bg-night">
      <Panel photo={n.photo} index={0} last={false}>
        <div className="grid gap-4 md:grid-cols-2 md:items-end md:gap-grid">
          <h2 id="a-night-h" className="text-h2">
            {n.title}
          </h2>
          <p className="max-w-[30ch] text-lead">{n.intro}</p>
        </div>
      </Panel>
      {n.stages.map((s, i) => (
        <Panel key={s.title} photo={s.photo} index={i + 1} last={i === n.stages.length - 1}>
          <p className="label text-paper/70">
            {pad2(i + 1)} / {pad2(n.stages.length)}
            {s.native && <span className="ml-3 font-native">{s.native}</span>}
          </p>
          <h3 className="mt-2 font-display text-[54px] leading-none md:text-[9vw] lg:text-[6vw]">{s.title}</h3>
          <p className="mt-4 max-w-[34ch] text-body lg:mt-[1vw]">{s.body}</p>
        </Panel>
      ))}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[22rem] px-gutter md:block">
        <div className="pointer-events-auto sticky top-[calc(var(--header-h)+2rem)] flex flex-col items-end gap-3 text-right text-paper">
          <p className="max-w-[16rem] text-label">{n.cta}</p>
          <Button href={cta.href} variant="outline-light">
            {cta.label}
          </Button>
        </div>
      </div>
      <div className="relative z-20 px-gutter py-8 text-paper md:hidden">
        <p className="mb-3 text-label">{n.cta}</p>
        <Button href={cta.href} variant="outline-light" className="w-full">
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
