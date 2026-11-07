"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children into view once. */
export function Reveal({
  children,
  delay = 0,
  className,
  amount = 0.3,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: "1rem" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

type Tag = "h1" | "h2" | "h3" | "p";

/** Heading whose words slide up out of a mask when scrolled into view. */
export function SplitWords({
  text,
  className,
  as = "h2",
  stagger = 0.06,
  delay = 0,
  id,
}: {
  text: string;
  className?: string;
  as?: Tag;
  stagger?: number;
  delay?: number;
  id?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const T = as;
    return (
      <T id={id} className={className}>
        {text}
      </T>
    );
  }
  const words = text.split(" ");
  const M = motion[as];
  return (
    <M
      id={id}
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 1, ease } } }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </M>
  );
}
