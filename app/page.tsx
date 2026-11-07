import site from "@/site.config";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Values } from "@/components/Values";
import { Stay } from "@/components/Stay";
import { JourneysIntro } from "@/components/JourneysIntro";
import { Itinerary } from "@/components/Itinerary";
import { Night } from "@/components/Night";
import { Manners } from "@/components/Manners";
import { Faq } from "@/components/Faq";

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: site.brand.name,
      description: site.brand.description,
      url: site.site.url,
      email: site.contact.email,
      telephone: site.contact.phone,
      address: site.contact.address.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: site.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
      })),
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <About />
      <Values />
      <Stay />
      <JourneysIntro />
      <Itinerary />
      <Night />
      <Manners />
      <Faq />
    </>
  );
}
