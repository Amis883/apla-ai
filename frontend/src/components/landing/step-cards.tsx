import { StepCard } from "@/components/landing/step-card";

const upcomingSteps = [
  {
    step: 2,
    title: "Tell us about the role",
    subtitle: "Paste a job description or link",
    description:
      "Share the position you're applying for. We'll analyze requirements and align your materials.",
  },
  {
    step: 3,
    title: "Review your materials",
    subtitle: "Tailored to you and the role",
    description:
      "Preview your cover letter and application answers. Edit anything until it sounds exactly like you.",
  },
  {
    step: 4,
    title: "Apply with confidence",
    subtitle: "Export and submit",
    description:
      "Download polished documents or copy directly into application forms. You're ready.",
  },
] as const;

export function StepCards() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {upcomingSteps.map((item) => (
        <StepCard
          key={item.step}
          step={item.step}
          title={item.title}
          subtitle={item.subtitle}
          className="opacity-60 transition-opacity hover:opacity-80"
        >
          <p className="text-sm leading-relaxed text-charcoal-muted">
            {item.description}
          </p>
        </StepCard>
      ))}
    </div>
  );
}
