import site from "@/site.config";
import { Media } from "./Media";
import { Reveal, SplitWords } from "./Reveal";
import { LocalClock, Sunrise, ThisMonth } from "./LocalFacts";

export function About() {
  const { about, destination } = site;
  return (
    <section id="about" aria-label={`About ${site.brand.name}`} className="relative -mt-[100svh] bg-paper px-gutter py-section">
      <header className="mb-[var(--section-header,3.5rem)] max-w-[62rem]">
        <SplitWords text={about.title} className="text-h2" />
        <Reveal>
          <p className="mt-5 max-w-[34ch] text-lead lg:mt-[1.4vw]">{about.lead}</p>
        </Reveal>
      </header>
      <div className="grid grid-cols-1 gap-grid md:grid-cols-4">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-media md:col-span-3 md:aspect-auto md:min-h-[34vw]">
          <Media photo={about.photo} />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-ink/50 via-ink/10 to-transparent" />
          <p className="absolute top-4 right-4 max-w-[22rem] text-body text-paper md:top-[1.4vw] md:right-[1.4vw]">{about.photoCaption}</p>
        </Reveal>
        <Reveal className="flex flex-col gap-grid">
          <dl className="grid grid-cols-2 gap-x-5 gap-y-3 border-t border-line pt-3 md:grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col">
              <dt className="label">Country</dt>
              <dd className="text-label">{destination.country}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="label">{destination.clockLabel}</dt>
              <dd className="text-label">
                <LocalClock />
              </dd>
            </div>
            <div className="col-span-2 flex flex-col md:col-span-1 lg:col-span-2">
              <dt className="label">This month</dt>
              <dd className="text-label">
                <ThisMonth />
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="label">Sunrise in {destination.sunrise.city}</dt>
              <dd className="text-label">
                <Sunrise />
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
