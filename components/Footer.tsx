import Link from "next/link";
import site from "@/site.config";
import { Year } from "./Year";

export function Footer() {
  const year = new Date().getFullYear();
  const { brand, contact, footer } = site;
  return (
    <footer id="footer" className="relative overflow-clip bg-night text-paper">
      <div className="px-gutter pt-16 pb-6 lg:pt-[5vw]">
        <div className="grid grid-cols-2 gap-x-grid gap-y-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <p className="flex items-baseline gap-2">
              <span className="font-display text-[28px] leading-none">{brand.name}</span>
              {brand.nativeName && <span className="font-native text-xs opacity-70">{brand.nativeName}</span>}
            </p>
            <p className="max-w-[30ch] text-body text-paper/80">{brand.tagline}</p>
            <a href={`mailto:${contact.email}`} className="text-label underline-offset-4 hover:underline">
              {contact.email}
            </a>
            <address className="max-w-[34ch] text-label not-italic text-paper/70">{contact.address.join(", ")}</address>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="label mb-3 text-paper/60">{col.title}</h2>
              <ul className="flex flex-col gap-1.5 text-label text-paper/85">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link className="inline-block py-0.5 hover:text-paper" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-paper/15 pt-5 pl-12 text-label text-paper/70 lg:mt-[5vw] lg:pl-16">
          <span>
            © <Year initial={year} /> {brand.name}
          </span>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-1">
            {footer.legal.map((l) => (
              <Link key={l.href} className="hover:text-paper" href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
