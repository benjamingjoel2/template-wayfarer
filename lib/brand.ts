import site from "@/site.config";

const fontStack = (f: { family: string; fallback: string }) =>
  f.family ? `"${f.family}", ${f.fallback}` : f.fallback;

/** CSS custom properties generated from the config (colours + font stacks). */
export function brandCss(): string {
  const c = site.colors;
  const f = site.fonts;
  const vars: Record<string, string> = {
    "--brand-paper": c.paper,
    "--brand-paper-deep": c.paperDeep,
    "--brand-ink": c.ink,
    "--brand-ink-soft": c.inkSoft,
    "--brand-accent": c.accent,
    "--brand-accent-light": c.accentLight,
    "--brand-accent-pale": c.accentPale,
    "--brand-highlight": c.highlight,
    "--brand-tertiary": c.tertiary,
    "--brand-night": c.night,
    "--brand-font-display": fontStack(f.display),
    "--brand-font-sans": fontStack(f.sans),
    "--brand-font-native": fontStack(f.native),
  };
  return `:root{${Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}}`;
}

/** Google Fonts stylesheet URL for every configured font that has a `google` spec. */
export function googleFontsHref(): string | null {
  const specs = [site.fonts.display, site.fonts.sans, site.fonts.native]
    .map((f) => f.google)
    .filter(Boolean);
  if (!specs.length) return null;
  return `https://fonts.googleapis.com/css2?${specs.map((s) => `family=${s}`).join("&")}&display=swap`;
}

/** The two halves of the giant hero headline. */
export function heroWords(): [string, string] {
  const custom = site.brand.heroWords;
  if (custom.length >= 2) return [custom[0], custom.slice(1).join(" ")];
  const name = site.brand.name.trim();
  const parts = name.split(/\s+/);
  if (parts.length > 1) {
    const mid = Math.ceil(parts.length / 2);
    return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
  }
  const mid = Math.ceil(name.length / 2);
  return [name.slice(0, mid), name.slice(mid)];
}

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const MONTHS_SHORT = MONTHS.map((m) => m.slice(0, 3));

export const pad2 = (n: number) => String(n).padStart(2, "0");
