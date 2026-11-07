"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import site from "@/site.config";
import { Media } from "./Media";

export function Faq() {
  const items = site.faq.items;
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <section id="faq" aria-labelledby="faq-h" className="bg-paper px-gutter py-section">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-grid">
        <h2 id="faq-h" className="text-h2 md:sticky md:top-[calc(var(--header-h)+1rem)] md:self-start">
          {site.faq.title}
        </h2>
        <ul className="border-t border-line">
          {items.map((it, i) => {
            const isOpen = open === i;
            const id = `${uid}-${i}`;
            return (
              <li key={it.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-3 text-left lg:py-[0.9vw]"
                  >
                    <span className="flex items-center gap-3">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="font-sans text-[20px] leading-tight tracking-[-0.02em] lg:text-[calc(.7vw+1.25rem)]">{it.q}</span>
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className={`shrink-0 text-accent transition-transform duration-500 ease-soft ${isOpen ? "rotate-45" : ""}`}
                    >
                      <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={id}
                      role="region"
                      aria-label={it.q}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-4 pt-1 pb-6 md:grid-cols-[1fr_1.2fr] md:gap-grid">
                        <div className="grid grid-cols-[1.6fr_1fr] items-end gap-2.5">
                          <div className="relative aspect-[4/5] overflow-hidden rounded-media">
                            <Media photo={it.photos[0]} />
                          </div>
                          <div className="relative aspect-[3/4] overflow-hidden rounded-media">
                            <Media photo={it.photos[1]} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          {it.a.map((p, n) => (
                            <p key={n} className="text-body">
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
