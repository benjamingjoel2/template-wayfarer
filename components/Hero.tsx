import site from "@/site.config";
import { heroWords } from "@/lib/brand";
import { Media } from "./Media";

/**
 * Full-screen photo hero. The section is sticky inside a 200svh wrapper, so the
 * next section slides up over it like a curtain.
 */
export function Hero() {
  const [a, b] = heroWords();
  const [left, right] = site.hero.tags;
  // Keep both halves on one line on any screen: shrink the type for long names.
  const chars = Math.max(1, a.length + b.length + 1);
  const fit = `min(var(--text-hero), calc((100vw - 2 * var(--gutter)) / ${(chars * 0.6).toFixed(2)}))`;
  return (
    <div id="top" className="relative h-[200svh]">
      <section aria-label={site.brand.name} className="sticky top-0 flex h-svh flex-col overflow-hidden bg-night">
        <div className="absolute inset-0 overflow-hidden">
          <div role="img" aria-label={site.hero.photo.alt} className="drift absolute -inset-[4%]">
            <Media photo={site.hero.photo} priority decorative />
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/0 to-night/70" />
        <div className="relative mt-auto px-gutter pb-[3vw] text-paper lg:pb-[1.2vw]">
          <div className="flex items-end justify-between gap-6">
            <p className="rise-in flex flex-wrap gap-x-3 text-body" style={{ "--d": "0.9s" } as React.CSSProperties}>
              {left.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
            <p
              className="rise-in flex flex-wrap justify-end gap-x-3 text-right text-body"
              style={{ "--d": "1s" } as React.CSSProperties}
            >
              {right.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
          </div>
          <h1 className="mt-2 flex justify-between font-display text-hero whitespace-nowrap uppercase lg:mt-0" style={{ fontSize: fit }}>
            <span className="sr-only">
              {site.brand.name}. {site.brand.tagline}
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
              <span className="word-up block" style={{ "--d": "0.25s" } as React.CSSProperties}>
                {a}
              </span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
              <span className="word-up block" style={{ "--d": "0.37s" } as React.CSSProperties}>
                {b}
              </span>
            </span>
          </h1>
        </div>
      </section>
    </div>
  );
}
