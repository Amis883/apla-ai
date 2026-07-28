"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface StepFooterProps {
  hint?: string;
  onBack?: () => void;
  onPrimary: () => void;
  primaryLabel: string;
  primaryDisabled?: boolean;
  primaryLoading?: boolean;
  showBack?: boolean;
  showPrimaryArrow?: boolean;
}

export function StepFooter({
  hint,
  onBack,
  onPrimary,
  primaryLabel,
  primaryDisabled = false,
  primaryLoading = false,
  showBack = false,
  showPrimaryArrow = true,
}: StepFooterProps) {
  return (
    <>
      {hint ? (
        <p className="text-xs text-charcoal-muted">{hint}</p>
      ) : (
        <span className="hidden sm:block" aria-hidden="true" />
      )}
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
        {showBack && onBack ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={primaryLoading}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>
        ) : null}
        <Button
          type="button"
          variant="outline"
          onClick={onPrimary}
          disabled={primaryDisabled || primaryLoading}
          className="w-full sm:w-auto"
        >
          {primaryLoading ? (
            <Spinner className="size-4" label="Processing" />
          ) : null}
          {primaryLabel}
          {!primaryLoading && showPrimaryArrow ? (
            <ArrowRight className="size-4" aria-hidden="true" />
          ) : null}
        </Button>
      </div>
    </>
  );
}
