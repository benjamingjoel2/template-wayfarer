import type { Metadata } from "next";
import Link from "next/link";
import site from "@/site.config";
import { MONTHS_SHORT } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: site.journeysIntro.title,
  alternates: { canonical: "/journeys" },
};

export default function JourneysPage() {
  const j = site.journeysIntro;
  return (
    <>
      <PageHeader label={j.title} title={j.pageTitle} lead={j.pageLead} />
      <ul className="grid gap-x-[var(--gap)] gap-y-14 px-gutter pb-section md:grid-cols-2 lg:grid-cols-3">
        {site.journeys.map((x) => (
          <li key={x.slug}>
            <Reveal>
              <Link className="group flex flex-col gap-3" href={`/plan?journey=${x.slug}`}>
                <span className="relative block aspect-[4/5] overflow-hidden rounded-media">
                  <span className="absolute inset-0 transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.04]">
                    <Media photo={x.photo} />
                  </span>
                </span>
                <span className="flex items-baseline justify-between gap-3 text-[13px] text-accent">
                  <span>{x.days} days</span>
                  <span className="text-ink">{x.price}</span>
                </span>
                <span className="font-display text-[28px] leading-tight lg:text-[2vw]">{x.title}</span>
                <span className="text-body text-ink-soft">{x.summary}</span>
                {x.bestMonths.length > 0 && (
                  <span className="text-[13px] text-accent">Best: {x.bestMonths.map((m) => MONTHS_SHORT[m - 1]).join(" · ")}</span>
                )}
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
}
