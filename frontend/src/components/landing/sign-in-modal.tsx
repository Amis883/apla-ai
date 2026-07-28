"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

export function SignInModal({ open, onClose }: SignInModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sign-in-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close sign in"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-stone-200/80 bg-white p-6 shadow-lg sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-md p-1 text-charcoal-muted transition-colors hover:bg-stone-100 hover:text-charcoal"
          aria-label="Close"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        <h2
          id="sign-in-title"
          className="font-serif text-2xl tracking-tight text-charcoal"
        >
          Sign in to Apla
        </h2>
        <p className="mt-2 text-sm text-charcoal-muted">
          Authentication is not connected yet. This is a preview modal.
        </p>
        <label
          htmlFor="sign-in-email"
          className="mt-6 block text-sm font-medium text-charcoal"
        >
          Email
        </label>
        <input
          id="sign-in-email"
          type="email"
          placeholder="you@example.com"
          className="mt-2 w-full rounded-lg border border-stone-200 bg-beige px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal-muted/70 focus:border-sage-muted focus:outline-none focus:ring-2 focus:ring-sage/20"
        />
        <Button type="button" className="mt-6 w-full" onClick={onClose}>
          Continue
        </Button>
      </div>
    </div>
  );
}
