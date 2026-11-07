import site from "@/site.config";
import { Media } from "./Media";
import { SplitWords } from "./Reveal";
import { Marquee } from "./Marquee";

/** Day-by-day cards for the featured journey. */
export function Itinerary() {
  const j = site.journeys.find((x) => x.featured && x.itinerary?.length) ?? site.journeys.find((x) => x.itinerary?.length);
  if (!j?.itinerary) return null;
  const title = j.itineraryTitle ?? j.title;
  return (
    <section aria-labelledby="week-h" className="bg-paper pt-section pb-section">
      <div className="mb-10 px-gutter lg:mb-[3vw]">
        <SplitWords id="week-h" text={title} className="max-w-[12ch] text-h2" />
        {j.itineraryLead && <p className="mt-5 max-w-[42ch] text-body">{j.itineraryLead}</p>}
      </div>
      <Marquee label={title}>
        {j.itinerary.map((d, n) => (
          <article
            key={d.title}
            className="relative isolate mr-2.5 flex h-[78svh] max-h-[640px] w-[80vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-media p-4 pl-[var(--gutter)] text-paper first:ml-[var(--gutter)] md:mr-4 md:h-[36vw] md:max-h-none md:w-[26vw] md:p-[1vw] md:first:ml-0 md:first:pl-[1vw]"
          >
            <div className="absolute inset-0 -z-10">
              <Media photo={d.photo} />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/25 to-ink/80" />
            </div>
            <header className="flex items-start justify-between gap-3">
              <h3 className="text-h3">{d.title}</h3>
              <span className="shrink-0 pt-1 text-label">Day {n + 1}</span>
            </header>
            <div className="grid gap-2 text-[14px] leading-snug lg:text-[0.95vw]">
              <p className="label text-paper/70">{d.place}</p>
              <dl className="grid gap-2">
                {(["morning", "afternoon", "evening"] as const).map((k) => (
                  <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-2 border-t border-paper/25 pt-2 lg:grid-cols-[6vw_1fr]">
                    <dt className="capitalize text-paper/70">{k}</dt>
                    <dd>{d[k]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </Marquee>
    </section>
  );
}
