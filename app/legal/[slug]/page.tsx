import type { Metadata } from "next";
import { notFound } from "next/navigation";
import site from "@/site.config";
import { PageHeader } from "@/components/PageHeader";

export function generateStaticParams() {
  return Object.keys(site.legal).map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = site.legal[slug];
  return page ? { title: page.title, alternates: { canonical: `/legal/${slug}` } } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = site.legal[slug];
  if (!page) notFound();
  return (
    <>
      <PageHeader label={site.brand.name} title={page.title} />
      <div className="prose-w px-gutter pb-section">
        {page.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </>
  );
}
