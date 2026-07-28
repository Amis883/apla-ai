import { Check, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const freeFeatures = [
  { label: "1 application per month", included: true },
  { label: "Basic CV parsing", included: true },
  { label: "Cover letter generation", included: false },
  { label: "Role-specific tailoring", included: false },
  { label: "Unlimited applications", included: false },
  { label: "Priority support", included: false },
] as const;

const proFeatures = [
  "Unlimited applications",
  "Advanced CV parsing",
  "Cover letter generation",
  "Role-specific tailoring",
  "Application tracking",
  "Priority support",
] as const;

function FeatureItem({
  label,
  included = true,
}: {
  label: string;
  included?: boolean;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 text-sm",
        !included && "text-charcoal/40"
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border",
          included
            ? "border-sage/30 bg-sage-light text-sage"
            : "border-stone-200 bg-transparent"
        )}
        aria-hidden="true"
      >
        {included ? <Check className="size-3" strokeWidth={2.5} /> : null}
      </span>
      {label}
    </li>
  );
}

function PricingCard({
  name,
  price,
  note,
  features,
  cta,
  popular = false,
}: {
  name: string;
  price: string;
  note: string;
  features: React.ReactNode;
  cta: string;
  popular?: boolean;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm sm:p-8",
        popular ? "border-charcoal/20" : "border-stone-200/80"
      )}
    >
      {popular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-charcoal px-3 py-1 text-[10px] font-medium tracking-wider text-white uppercase">
          Most popular
        </span>
      ) : null}

      <header className="mb-6 border-b border-stone-100 pb-6">
        <p className="text-[11px] font-medium tracking-[0.14em] text-charcoal-muted uppercase">
          {name}
        </p>
        <p className="mt-2 font-serif text-4xl tracking-tight text-charcoal">
          {price}
        </p>
        <p className="mt-1 text-sm text-charcoal-muted">{note}</p>
      </header>

      <ul className="mb-8 flex flex-1 flex-col gap-3">{features}</ul>

      <Button variant="outline" className="w-full">
        {cta}
      </Button>
    </article>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="pricing-heading"
    >
      <header className="mb-12 text-center sm:mb-16">
        <p className="text-[11px] font-medium tracking-[0.14em] text-charcoal-muted uppercase">
          Pricing
        </p>
        <h2
          id="pricing-heading"
          className="mt-3 font-serif text-3xl tracking-tight text-charcoal sm:text-4xl"
        >
          Honest, simple pricing
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-charcoal-muted">
          Pay when it matters. No annual lock-in, no hidden limits.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <PricingCard
          name="Free"
          price="€0"
          note="no card required"
          cta="Start for free"
          features={freeFeatures.map((f) => (
            <FeatureItem
              key={f.label}
              label={f.label}
              included={f.included}
            />
          ))}
        />
        <PricingCard
          name="Pro"
          price="€19 / mo"
          note="cancel any time"
          cta="Try Pro free for 7 days"
          popular
          features={proFeatures.map((label) => (
            <FeatureItem key={label} label={label} />
          ))}
        />
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-xs text-charcoal-muted">
        <Lock className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        Payments processed securely. No commitment after the trial.
      </p>
    </section>
  );
}
