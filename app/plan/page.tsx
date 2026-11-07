import type { Metadata } from "next";
import { Suspense } from "react";
import site from "@/site.config";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyProvider, CurrencySwitch, PlanForm } from "@/components/PlanForm";

export const metadata: Metadata = {
  title: site.nav.cta.label,
  alternates: { canonical: "/plan" },
};

export default function PlanPage() {
  return (
    <CurrencyProvider>
      <PageHeader label={site.nav.cta.label} title={site.plan.title} lead={site.plan.lead}>
        <div className="mt-8">
          <CurrencySwitch />
        </div>
      </PageHeader>
      <div className="grid gap-10 px-gutter pb-section lg:grid-cols-[1fr_44rem_1fr]">
        <div className="lg:col-start-2">
          <Suspense>
            <PlanForm />
          </Suspense>
        </div>
      </div>
    </CurrencyProvider>
  );
}
