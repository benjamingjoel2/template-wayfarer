"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import site from "@/site.config";
import { Media } from "./Media";
import { Button } from "./Button";

const ease = [0.22, 1, 0.36, 1] as const;

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function RoundButton({ dir, label, onClick, className = "" }: { dir: "prev" | "next"; label: string; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid size-12 place-items-center rounded-full bg-paper/90 text-ink shadow-md backdrop-blur transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      <Chevron dir={dir} />
    </button>
  );
}

export function StaySlider() {
  const stays = site.stay.stays;
  const [i, setI] = useState(0);
  const cur = stays[i];
  const next = stays[(i + 1) % stays.length];
  const go = (d: number) => setI((x) => (x + d + stays.length) % stays.length);
  const strip = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const facts = [{ label: "Type", value: cur.type }, ...Object.entries(cur.facts).map(([label, value]) => ({ label, value }))];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Stays"
      className="relative px-gutter pb-section"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h3 className="label">Stays</h3>
          <p className="mt-1 text-[15px] text-ink-soft">{stays.length} places to stay. Browse them all.</p>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <span className="text-label tabular-nums text-accent" aria-live="polite">
            {i + 1} / {stays.length}
          </span>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous stay"
            className="grid size-11 place-items-center rounded-full border border-ink/30 transition-colors hover:bg-ink hover:text-paper"
          >
            <Chevron dir="prev" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next stay"
            className="grid size-11 place-items-center rounded-full bg-ink text-paper transition-transform hover:scale-105"
          >
            <Chevron dir="next" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={cur.slug}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${stays.length}: ${cur.name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="grid grid-cols-1 gap-grid md:grid-cols-[1.25fr_1fr_0.6fr]"
        >
          <div
            className="relative aspect-[4/3] touch-pan-y overflow-hidden rounded-media md:aspect-auto md:min-h-[36vw]"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }}
          >
            <Media photo={cur.photos[0]} />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 to-transparent" />
            <RoundButton dir="prev" label="Previous stay" onClick={() => go(-1)} className="absolute top-1/2 left-3 -translate-y-1/2" />
            <RoundButton dir="next" label="Next stay" onClick={() => go(1)} className="absolute top-1/2 right-3 -translate-y-1/2" />
            <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-[13px] text-paper tabular-nums md:hidden">
              {i + 1} / {stays.length} · Swipe for more
            </span>
          </div>
          <div className="flex flex-col gap-4 md:px-[1vw]">
            <div className="flex items-center gap-2">
              <span className="label capitalize">{cur.type}</span>
            </div>
            <h4 className="font-display text-[40px] leading-none md:text-[7vw] lg:text-[4vw]">{cur.name}</h4>
            <p className="max-w-[40ch] text-body">{cur.summary}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button href={`/plan?stay=${cur.slug}`}>Ask about this stay</Button>
              <button
                type="button"
                onClick={() => go(1)}
                className="group inline-flex items-center gap-2 text-[15px] text-ink underline-offset-4 hover:underline"
              >
                Next: {next.name}
                <span className="transition-transform group-hover:translate-x-1">
                  <Chevron dir="next" />
                </span>
              </button>
            </div>
            <dl className="mt-auto grid grid-cols-2 gap-x-5 gap-y-2.5 border-t border-line pt-3">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col">
                  <dt className="text-label text-accent first-letter:uppercase">{f.label}</dt>
                  <dd className="text-label text-ink first-letter:uppercase">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative hidden aspect-[3/4] self-start overflow-hidden rounded-media md:block">
            <Media photo={cur.photos[1]} />
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        ref={strip}
        role="group"
        aria-label="Choose a stay"
        className="-mx-[var(--gutter)] mt-6 flex snap-x scroll-px-[var(--gutter)] gap-2.5 overflow-x-auto px-gutter pt-1 pb-2 [scrollbar-width:none]"
      >
        {stays.map((s, n) => (
          <button
            key={s.slug}
            data-i={n}
            type="button"
            aria-pressed={n === i}
            onClick={() => {
              setI(n);
              strip.current
                ?.querySelector(`[data-i="${n}"]`)
                ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
            }}
            className={`group flex w-[8.5rem] shrink-0 snap-start flex-col gap-1.5 text-left transition-opacity md:w-[9.5rem] ${
              n === i ? "opacity-100" : "opacity-55 hover:opacity-100"
            }`}
          >
            <span
              className={`relative block aspect-[3/2] w-full overflow-hidden rounded-media ring-2 ring-offset-2 ring-offset-paper transition-[box-shadow] ${
                n === i ? "ring-ink" : "ring-transparent"
              }`}
            >
              <Media photo={s.photos[0]} decorative />
            </span>
            <span className="truncate text-[13px] leading-tight">{s.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
