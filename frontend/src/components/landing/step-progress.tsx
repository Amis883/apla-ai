"use client";

import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  canAccessStep: (step: number) => boolean;
  className?: string;
}

export function StepProgress({
  currentStep,
  onStepClick,
  canAccessStep,
  className,
}: StepProgressProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      role="tablist"
      aria-label="Application steps"
    >
      {[1, 2, 3].map((stepNumber) => {
        const isActive = stepNumber === currentStep;
        const isComplete = stepNumber < currentStep;
        const isAccessible = canAccessStep(stepNumber);

        return (
          <button
            key={stepNumber}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Step ${stepNumber}`}
            disabled={!isAccessible}
            onClick={() => onStepClick(stepNumber)}
            className={cn(
              "rounded-full transition-all duration-300 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
              "disabled:cursor-not-allowed disabled:opacity-40",
              isAccessible && !isActive && "cursor-pointer hover:opacity-80",
              isActive && "h-1.5 w-6 bg-sage",
              isComplete && !isActive && "h-1.5 w-1.5 bg-sage/50",
              !isActive && !isComplete && "h-1.5 w-1.5 bg-stone-300"
            )}
          />
        );
      })}
    </div>
  );
}
