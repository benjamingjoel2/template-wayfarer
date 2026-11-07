import type { CSSProperties, ReactNode } from "react";

/** Inner-page header: small label, word-by-word title, rising lead. */
export function PageHeader({ label, title, lead, children }: { label: string; title: string; lead?: string; children?: ReactNode }) {
  const words = title.split(" ");
  return (
    <header className="px-gutter pt-[calc(var(--header-h)+48px)] pb-12 lg:pt-[calc(var(--header-h)+5vw)] lg:pb-[4vw]">
      <p className="label mb-4">{label}</p>
      <h1 className="max-w-[16ch] text-h2" aria-label={title}>
        {words.map((w, i) => (
          <span key={i} aria-hidden="true" className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
            <span className="word-up inline-block" style={{ "--d": `${0.1 + i * 0.07}s` } as CSSProperties}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </h1>
      {lead && (
        <div className="rise-in mt-5 max-w-[38ch] text-lead lg:mt-[1.4vw]" style={{ "--d": "0.35s" } as CSSProperties}>
          {lead}
        </div>
      )}
      {children}
    </header>
  );
}
