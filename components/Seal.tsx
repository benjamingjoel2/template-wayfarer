import site from "@/site.config";

/** Round stamp with the brand name and tagline set on a circle. */
export function Seal() {
  const ring = `${site.brand.name} · ${site.brand.tagline.replace(/\.$/, "")} ·`;
  // Fit the ring text to the circumference (2πr ≈ 276 units at r = 44).
  const fontSize = Math.min(11.5, 276 / (ring.length * 0.92));
  return (
    <svg viewBox="0 0 120 120" className="size-full" aria-hidden="true">
      <defs>
        <path id="seal-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="var(--color-highlight)" />
      <text fontSize={fontSize.toFixed(2)} letterSpacing={fontSize < 11.5 ? 1.5 : 3.2} fill="var(--color-paper)" className="font-sans uppercase">
        <textPath href="#seal-circle">{ring}</textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fontSize="22" fill="var(--color-paper)" className="font-display">
        {site.brand.monogram}
      </text>
    </svg>
  );
}
