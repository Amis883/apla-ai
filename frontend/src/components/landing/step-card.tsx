"use client";

import { cn } from "@/lib/utils";

export interface StepCardProps {
  step: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function StepCard({
  step,
  title,
  subtitle,
  children,
  footer,
  className,
}: StepCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm",
        className
      )}
    >
      <header className="border-b border-stone-100 px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex items-start gap-4">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-cream font-sans text-sm font-medium text-charcoal"
            aria-hidden="true"
          >
            {step}
          </span>
          <div>
            <h2 className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl">
              {title}
            </h2>
            <p className="mt-0.5 text-sm text-charcoal-muted">{subtitle}</p>
          </div>
        </div>
      </header>

      <div className="px-6 py-5 sm:px-8 sm:py-6">{children}</div>

      {footer ? (
        <footer className="flex flex-col gap-4 border-t border-stone-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          {footer}
        </footer>
      ) : null}
    </article>
  );
}
