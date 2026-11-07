"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import site from "@/site.config";
import { MONTHS } from "@/lib/brand";

/* Currency ---------------------------------------------------------------- */

const plan = site.plan;
const base = plan.currencies[0];
const CurrencyCtx = createContext<{ code: string; set: (c: string) => void }>({ code: base.code, set: () => {} });

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, set] = useState(base.code);
  return <CurrencyCtx.Provider value={{ code, set }}>{children}</CurrencyCtx.Provider>;
}

export function CurrencySwitch() {
  const { code, set } = useContext(CurrencyCtx);
  if (plan.currencies.length < 2) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div role="radiogroup" aria-label="Currency" className="flex rounded-full border border-line p-0.5">
        {plan.currencies.map((c) => (
          <button
            key={c.code}
            type="button"
            role="radio"
            aria-checked={c.code === code}
            onClick={() => set(c.code)}
            className={`rounded-full px-3 py-1 text-[13px] transition-colors ${c.code === code ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"}`}
          >
            {c.code}
          </button>
        ))}
      </div>
      <span className="text-[12px] text-accent">
        Per person, sharing. Non-{base.code} prices approximate (rates as of {plan.ratesDate}).
      </span>
    </div>
  );
}

function useMoney() {
  const { code } = useContext(CurrencyCtx);
  const cur = plan.currencies.find((c) => c.code === code) ?? base;
  const fmt = new Intl.NumberFormat(site.site.lang, { style: "currency", currency: cur.code, maximumFractionDigits: 0 });
  const round = (n: number) => {
    const v = n * cur.rate;
    const step = v >= 10000 ? 500 : 100;
    return Math.round(v / step) * step;
  };
  return (min: number | null, max: number | null) =>
    min === null ? `Under ${fmt.format(round(max ?? 0))}` : max === null ? `${fmt.format(round(min))}+` : `${fmt.format(round(min))} – ${fmt.format(round(max))}`;
}

/* Form bits --------------------------------------------------------------- */

const inputCls =
  "w-full rounded-media border border-line bg-paper px-3 py-2.5 text-[16px] outline-none focus:border-ink aria-[invalid=true]:border-highlight";

function Field({ label, id, hint, error, children }: { label: string; id: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-medium">
        {label}
      </label>
      {hint && <p className="-mt-1 text-[13px] text-accent">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-highlight">
          {error}
        </p>
      )}
    </div>
  );
}

function Group({ legend, hint, children }: { legend: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-2 text-[15px] font-medium">{legend}</legend>
      {hint && <p className="-mt-2 text-[13px] text-accent">{hint}</p>}
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Chip({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`cursor-pointer rounded-full border px-4 py-2 text-[14px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-highlight ${
        checked ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/50"
      }`}
    >
      <input className="sr-only" type={type} name={name} value={value} checked={checked} onChange={onChange} />
      {children}
    </label>
  );
}

/* The form ---------------------------------------------------------------- */

type State = {
  month: string;
  year: string;
  days: string;
  visit: string;
  interests: string[];
  pace: string;
  stayStyle: string;
  adults: string;
  children: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  contact: string;
  notes: string;
  website: string;
};

export function PlanForm() {
  const params = useSearchParams();
  const { code } = useContext(CurrencyCtx);
  const money = useMoney();
  const ctx = {
    journey: params.get("journey") ?? "",
    stay: params.get("stay") ?? "",
  };
  const journeyTitle = site.journeys.find((j) => j.slug === ctx.journey)?.title;
  const stayName = site.stay.stays.find((s) => s.slug === ctx.stay)?.name;
  const [f, setF] = useState<State>({
    month: "",
    year: "",
    days: String(plan.defaultDays),
    visit: "first",
    interests: [],
    pace: "balanced",
    stayStyle: "mix",
    adults: "2",
    children: "0",
    budget: "unsure",
    name: "",
    email: "",
    phone: "",
    contact: "email",
    notes: journeyTitle ? `I’m interested in ${journeyTitle}.` : stayName ? `I’d like to stay at ${stayName}.` : "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const top = useRef<HTMLDivElement>(null);
  const year = useMemo(() => new Date().getFullYear(), []);
  const set = <K extends keyof State>(k: K, v: State[K]) => setF((s) => ({ ...s, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    const errs: Record<string, string> = {};
    if (!f.month) errs.month = "Choose a month, or “Flexible”";
    if (!f.name.trim()) errs.name = "Please tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) errs.email = "Please check your email address";
    if (f.contact !== "email" && f.phone.trim().length < 6) errs.phone = "Please add a phone number so we can reach you that way";
    if (Object.keys(errs).length) {
      setErrors(errs);
      setStatus("error");
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, currency: code, ...ctx }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.fields ?? { form: data.error ?? "Something went wrong. Please try again." });
        setStatus("error");
        return;
      }
      setStatus("done");
      top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setErrors({ form: "We couldn’t send that. Please check your connection and try again." });
      setStatus("error");
    }
  }

  return (
    <div ref={top} className="scroll-mt-[calc(var(--header-h)+2rem)]">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-[50vh] flex-col items-start justify-center gap-4 py-16"
          >
            <p className="text-h2">{plan.thanks}</p>
            <p className="max-w-[40ch] text-body text-ink-soft">{plan.thanksBody}</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="flex flex-col gap-12">
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
              </label>
            </div>

            <section aria-labelledby="s-when" className="flex flex-col gap-6">
              <h2 id="s-when" className="text-h3">
                When
              </h2>
              <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
                <Field label="Month" id="f-month" error={errors.month}>
                  <select
                    id="f-month"
                    className={inputCls}
                    value={f.month}
                    onChange={(e) => set("month", e.target.value)}
                    aria-invalid={!!errors.month}
                    aria-describedby={errors.month ? "f-month-error" : undefined}
                  >
                    <option value="">Choose a month</option>
                    <option value="flexible">Flexible, advise me</option>
                    {MONTHS.map((m, i) => (
                      <option key={m} value={String(i + 1)}>
                        {m}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Year" id="f-year">
                  <select id="f-year" className={inputCls} value={f.year} onChange={(e) => set("year", e.target.value)}>
                    <option value="">Not sure</option>
                    {[year, year + 1, year + 2].map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </Field>
                <Field label="How many days" id="f-days">
                  <input id="f-days" type="number" min={3} max={60} className={inputCls} value={f.days} onChange={(e) => set("days", e.target.value)} />
                </Field>
              </div>
            </section>

            <section aria-labelledby="s-you" className="flex flex-col gap-6">
              <h2 id="s-you" className="text-h3">
                Your trip
              </h2>
              <Group legend={plan.firstVisitQuestion}>
                {[
                  ["first", "First time"],
                  ["returning", "Returning"],
                ].map(([v, l]) => (
                  <Chip key={v} type="radio" name="visit" value={v} checked={f.visit === v} onChange={() => set("visit", v)}>
                    {l}
                  </Chip>
                ))}
              </Group>
              <Group legend="What do you love?" hint="Choose as many as you like.">
                {plan.interests.map((v) => (
                  <Chip
                    key={v}
                    type="checkbox"
                    name="interests"
                    value={v}
                    checked={f.interests.includes(v)}
                    onChange={() => set("interests", f.interests.includes(v) ? f.interests.filter((x) => x !== v) : [...f.interests, v])}
                  >
                    <span className="capitalize">{v}</span>
                  </Chip>
                ))}
              </Group>
              <Group legend="Pace">
                {plan.paces.map((p) => (
                  <Chip key={p.value} type="radio" name="pace" value={p.value} checked={f.pace === p.value} onChange={() => set("pace", p.value)}>
                    <span className="capitalize">{p.value}</span>
                    <span className="sr-only">: </span>
                    <span className={`ml-2 text-[12px] ${f.pace === p.value ? "text-paper/70" : "text-accent"}`}>{p.hint}</span>
                  </Chip>
                ))}
              </Group>
              <Group legend="Where would you like to stay?">
                {plan.stayStyles.map((s) => (
                  <Chip key={s.value} type="radio" name="stayStyle" value={s.value} checked={f.stayStyle === s.value} onChange={() => set("stayStyle", s.value)}>
                    <span className="capitalize">{s.label}</span>
                  </Chip>
                ))}
              </Group>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Adults" id="f-adults">
                  <input id="f-adults" type="number" min={1} max={20} className={inputCls} value={f.adults} onChange={(e) => set("adults", e.target.value)} />
                </Field>
                <Field label="Children" id="f-children" hint="Under 16">
                  <input id="f-children" type="number" min={0} max={20} className={inputCls} value={f.children} onChange={(e) => set("children", e.target.value)} />
                </Field>
              </div>
              <Group legend="Budget per person, excluding flights">
                {plan.budgets.map((b) => (
                  <Chip key={b.value} type="radio" name="budget" value={b.value} checked={f.budget === b.value} onChange={() => set("budget", b.value)}>
                    {money(b.min, b.max)}
                  </Chip>
                ))}
                <Chip type="radio" name="budget" value="unsure" checked={f.budget === "unsure"} onChange={() => set("budget", "unsure")}>
                  Not sure yet
                </Chip>
              </Group>
            </section>

            <section aria-labelledby="s-contact" className="flex flex-col gap-6">
              <h2 id="s-contact" className="text-h3">
                How to reach you
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" id="f-name" error={errors.name}>
                  <input
                    id="f-name"
                    autoComplete="name"
                    required
                    className={inputCls}
                    value={f.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "f-name-error" : undefined}
                  />
                </Field>
                <Field label="Email" id="f-email" error={errors.email}>
                  <input
                    id="f-email"
                    type="email"
                    autoComplete="email"
                    required
                    className={inputCls}
                    value={f.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "f-email-error" : undefined}
                  />
                </Field>
                <Field label="Phone" id="f-phone" hint="Optional, unless you’d like a call" error={errors.phone}>
                  <input
                    id="f-phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputCls}
                    value={f.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "f-phone-error" : undefined}
                  />
                </Field>
              </div>
              <Group legend="Best way to reach you">
                {[
                  ["email", "Email"],
                  ["phone", "Phone"],
                ].map(([v, l]) => (
                  <Chip key={v} type="radio" name="contact" value={v} checked={f.contact === v} onChange={() => set("contact", v)}>
                    {l}
                  </Chip>
                ))}
              </Group>
              <Field label="Anything else?" id="f-notes" hint="Dietary needs, mobility, a birthday, a place you’ve always wanted to see.">
                <textarea id="f-notes" rows={5} className={inputCls} value={f.notes} onChange={(e) => set("notes", e.target.value)} />
              </Field>
            </section>

            <div className="flex flex-col items-start gap-3 border-t border-line pt-8">
              {errors.form && (
                <p role="alert" className="text-[14px] text-highlight">
                  {errors.form}
                </p>
              )}
              <button type="submit" disabled={status === "sending"} className="h-12 rounded-full bg-ink px-8 text-[15px] text-paper disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send to a specialist"}
              </button>
              <p className="max-w-[52ch] text-[13px] text-accent">
                No obligation and no payment. We use your details only to plan your trip. See our{" "}
                <a href="/legal/privacy" className="underline underline-offset-4">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
