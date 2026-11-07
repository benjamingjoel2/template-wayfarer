import site from "@/site.config";
import { Media } from "./Media";
import { Reveal } from "./Reveal";

/** Sticky full-screen photo with each value scrolling over it. */
export function Values() {
  const { values } = site;
  return (
    <section id="values" aria-labelledby="values-h" className="relative bg-paper">
      <h2 id="values-h" className="py-6 text-center font-display text-[32px] text-accent lg:text-[3.2vw]">
        {values.title}
      </h2>
      <div className="relative">
        <div className="sticky top-0 h-svh overflow-hidden">
          <Media photo={values.photo} />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/30" />
        </div>
        <ul className="relative -mt-[100svh]">
          {values.items.map((v) => (
            <li key={v.title} className="flex h-svh flex-col items-center justify-center px-gutter text-center text-paper">
              <Reveal>
                {v.native && <p className="font-native text-[18px] opacity-80 lg:text-[1.4vw]">{v.native}</p>}
                <h3 className="mt-1 font-display text-[64px] leading-none lg:text-[6vw]">{v.title}</h3>
                <p className="mx-auto mt-4 max-w-[30ch] text-body lg:mt-[1vw]">{v.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
