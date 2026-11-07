"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import site from "@/site.config";
import { Button } from "./Button";
import { Media } from "./Media";

export const SECTIONS = [
  { id: "about", label: site.about.navLabel },
  { id: "values", label: site.values.title },
  { id: "stay", label: site.stay.navLabel },
  { id: "journeys", label: site.journeysIntro.navLabel },
  { id: "a-night", label: site.night.navLabel },
  { id: "manners", label: site.manners.navLabel },
  { id: "faq", label: site.faq.navLabel },
];

const MORE = site.footer.columns.flatMap((c) => c.links).slice(0, 6);

export function Wordmark({ light }: { light: boolean }) {
  const { name, nativeName, logo } = site.brand;
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo} alt={name} className={`h-7 w-auto lg:h-8 ${light ? "brightness-0 invert" : ""}`} />;
  }
  return (
    <span className={`flex items-baseline gap-2 ${light ? "text-paper" : "text-ink"}`}>
      <span className="font-display text-[26px] leading-none lg:text-[30px]">{name}</span>
      {nativeName && <span className="font-native text-[11px] opacity-70 lg:text-xs">{nativeName}</span>}
    </span>
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";
  const reduce = useReducedMotion();
  const [overHero, setOverHero] = useState(isHome);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  // Hide on scroll down, show on scroll up; transparent while over the hero.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const d = y - lastY.current;
      setOverHero(isHome && y < window.innerHeight - 80);
      if (y < 200) setHidden(false);
      else if (d > 6) setHidden(true);
      else if (d < -6) setHidden(false);
      if (Math.abs(d) > 6 || y < 200) lastY.current = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Highlight the section in the middle of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  // Lock scroll while the mobile menu is open; Escape closes it.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the menu on navigation.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const light = overHero && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-500 ease-soft ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${light ? "bg-transparent" : "bg-paper/85 backdrop-blur-md"}`}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between px-gutter">
          <Link href={isHome ? "#top" : "/"} className="relative z-10" aria-label={`${site.brand.name}, home`}>
            <Wordmark light={light} />
          </Link>
          <nav aria-label="Sections" className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-[1.4vw]">
              {SECTIONS.map((s) => {
                const on = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={href(s.id)}
                      aria-current={on ? "location" : undefined}
                      className={`group relative flex items-center gap-1.5 text-label ${light ? "text-paper" : "text-ink"}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full bg-highlight transition-transform duration-500 ease-soft ${
                          on ? "scale-100" : "scale-0 group-hover:scale-100"
                        }`}
                      />
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <Button href={site.nav.cta.href} variant={light ? "light" : "dark"}>
              {site.nav.cta.label}
            </Button>
          </nav>
          <button
            type="button"
            className={`relative z-10 text-label lg:hidden ${light ? "text-paper" : "text-ink"}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper px-gutter pt-[calc(var(--header-h)+12px)] pb-6 lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Sections">
              <ul className="flex flex-col gap-1">
                {SECTIONS.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.5 }}
                  >
                    <a href={href(s.id)} onClick={() => setOpen(false)} className="font-display text-[11vw] leading-[1.05] sm:text-[8vw]">
                      {s.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <p className="label">{site.nav.menuPrompt}</p>
              <Button href={site.nav.cta.href} className="w-full">
                {site.nav.cta.label}
              </Button>
            </div>
            <div className="mt-auto grid grid-cols-2 gap-4 pt-10">
              <div>
                <p className="label mb-2">More</p>
                <ul className="flex flex-col gap-1 text-[15px]">
                  {MORE.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} onClick={() => setOpen(false)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-media">
                <Media photo={site.nav.menuPhoto} decorative />
                <div className="absolute inset-0 bg-ink/30" />
                <span className="absolute bottom-3 left-3 font-display text-xl text-paper">{site.brand.name}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
