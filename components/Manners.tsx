import site from "@/site.config";
import { Reveal } from "./Reveal";

export function Manners() {
  const m = site.manners;
  return (
    <section id="manners" aria-labelledby="manners-h" className="bg-paper px-gutter py-section">
      <header className="mb-12 text-center lg:mb-[4vw]">
        <h2 id="manners-h" className="text-label text-ink">
          {m.title}
        </h2>
        <p className="mx-auto mt-3 max-w-[36ch] text-body text-ink-soft">{m.lead}</p>
      </header>
      <ul className="flex flex-col items-center">
        {m.items.map((it, i) => (
          <li key={it.title} className="group w-full">
            <Reveal className="flex flex-col items-center py-2 text-center md:py-[0.6vw]">
              <span className="font-display text-[11vw] leading-[0.85] font-light tracking-[-0.01em] text-accent-light uppercase transition-colors duration-500 group-hover:text-accent md:text-[min(5.5vw,6rem)]">
                {it.title}
              </span>
              <span className="mt-2 flex max-w-[44ch] items-start gap-2 text-left text-body text-ink-soft md:mt-[0.5vw]">
                <span aria-hidden="true" className={`mt-[0.45em] size-1.5 shrink-0 rounded-full ${i % 2 ? "bg-accent" : "bg-highlight"}`} />
                {it.body}
              </span>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
