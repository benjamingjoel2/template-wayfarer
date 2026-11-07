"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

function useMedia(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
}

/**
 * On desktop: drifts sideways on its own, pauses on hover, can be dragged,
 * and has a Pause/Play control. On phones: a native swipeable snap row.
 */
export function Marquee({ children, label, speed = 0.6 }: { children: ReactNode; label: string; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMedia("(min-width: 768px)") && !reduce;
  const [paused, setPaused] = useState(false);
  const hover = useRef(false);
  const x = useRef(0);
  const drag = useRef<{ start: number; x: number } | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!desktop || !el) {
      if (el) el.style.transform = "";
      return;
    }
    let raf = 0;
    let half = el.scrollWidth / 2;
    const ro = new ResizeObserver(() => (half = el.scrollWidth / 2));
    ro.observe(el);
    const tick = () => {
      if (!paused && !hover.current && !drag.current) x.current -= speed;
      if (x.current <= -half) x.current += half;
      if (x.current > 0) x.current -= half;
      el.style.transform = `translate3d(${x.current}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [desktop, paused, speed]);

  const end = () => (drag.current = null);

  return (
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className={
          desktop
            ? "cursor-grab overflow-hidden active:cursor-grabbing"
            : "snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none]"
        }
        onPointerEnter={() => (hover.current = true)}
        onPointerLeave={() => (hover.current = false)}
        onFocusCapture={() => setPaused(true)}
        onPointerDown={(e) => {
          if (!desktop) return;
          drag.current = { start: e.clientX, x: x.current };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (drag.current) x.current = drag.current.x + (e.clientX - drag.current.start);
        }}
        onPointerUp={end}
        onPointerCancel={end}
      >
        <div ref={track} className="flex w-max touch-pan-y will-change-transform">
          <div className="flex">{children}</div>
          {desktop && (
            <div className="flex" aria-hidden="true" inert>
              {children}
            </div>
          )}
        </div>
      </div>
      {desktop && (
        <div className="mt-4 px-gutter">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="text-label text-accent underline-offset-4 hover:underline"
            aria-pressed={paused}
          >
            {paused ? "Play" : "Pause"} motion
          </button>
        </div>
      )}
    </div>
  );
}
