"use client";

import { Button } from "@/components/ui/button";

interface NavbarProps {
  onSignInClick: () => void;
}

export function Navbar({ onSignInClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/60 bg-cream/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
          onClick={(e) => e.preventDefault()}
        >
          <span
            className="size-2 rounded-full bg-sage"
            aria-hidden="true"
          />
          <span className="font-serif text-xl tracking-tight text-charcoal">
            Apla
          </span>
        </a>

        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="#how-it-works"
            className="text-sm text-charcoal/70 transition-colors hover:text-charcoal"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-sm text-charcoal/70 transition-colors hover:text-charcoal"
          >
            Pricing
          </a>
          <Button
            type="button"
            size="sm"
            className="rounded-lg px-4"
            onClick={onSignInClick}
          >
            Sign in
          </Button>
        </div>
      </nav>
    </header>
  );
}
