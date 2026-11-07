import site from "@/site.config";
import { Media } from "./Media";
import { Reveal, SplitWords } from "./Reveal";
import { Seal } from "./Seal";
import { IncludedStack } from "./IncludedStack";
import { StaySlider } from "./StaySlider";

export function Stay() {
  const { stay } = site;
  return (
    <section id="stay" aria-label={stay.navLabel} className="bg-paper">
      <div className="px-gutter py-section">
        <header className="mb-14 max-w-[62rem] lg:mb-[3.5rem]">
          <SplitWords text={stay.title} className="text-h2" />
          <Reveal>
            <p className="mt-5 max-w-[36ch] text-lead lg:mt-[1.4vw]">{stay.lead}</p>
          </Reveal>
        </header>
        <div className="grid grid-cols-4 gap-grid">
          <Reveal className="relative col-span-2 aspect-[3/2] self-start overflow-hidden rounded-media md:col-span-1">
            <Media photo={stay.photos.small} />
          </Reveal>
          <Reveal className="relative col-span-4 row-start-2 aspect-[4/5] md:col-span-2 md:col-start-2 md:row-start-1">
            <div className="absolute inset-0 overflow-hidden rounded-media">
              <Media photo={stay.photos.large} />
            </div>
            <div className="absolute -bottom-8 left-1/2 size-16 -translate-x-1/2 md:size-[5.5vw]">
              <Seal />
            </div>
          </Reveal>
          <Reveal className="col-span-2 self-end md:col-span-1 md:row-start-1">
            <p className="text-body">{stay.body}</p>
          </Reveal>
        </div>
      </div>
      <IncludedStack />
      <StaySlider />
    </section>
  );
}
