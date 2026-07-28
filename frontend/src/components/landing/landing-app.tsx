"use client";

import { Download, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";
import { SignInModal } from "@/components/landing/sign-in-modal";
import { StepCard } from "@/components/landing/step-card";
import { StepFooter } from "@/components/landing/step-footer";
import { StepProgress } from "@/components/landing/step-progress";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  delay,
  downloadTextFile,
  generateMockResults,
  type GenerationResult,
} from "@/lib/mock-generation";
import { cn } from "@/lib/utils";

type TransitionDirection = "forward" | "back";

const GENERATION_DELAY_MS = 2800;

export default function LandingApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult | null>(null);
  const [transitionDirection, setTransitionDirection] =
    useState<TransitionDirection>("forward");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const displayStep = isGenerating ? 3 : currentStep;

  const canAccessStep = useCallback(
    (step: number): boolean => {
      if (isGenerating) {
        return step === 3;
      }
      if (step === 1) {
        return true;
      }
      if (step === 2) {
        return uploadedFile !== null;
      }
      if (step === 3) {
        return uploadedFile !== null && jobDescription.trim().length > 0;
      }
      return false;
    },
    [uploadedFile, jobDescription, isGenerating],
  );

  const navigateToStep = useCallback(
    (step: number) => {
      if (!canAccessStep(step)) {
        return;
      }
      setTransitionDirection(step < currentStep ? "back" : "forward");
      setCurrentStep(step);
    },
    [canAccessStep, currentStep],
  );

  const handleFileSelect = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleContinue = () => {
    if (!uploadedFile) {
      return;
    }
    setTransitionDirection("forward");
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setTransitionDirection("back");
      setCurrentStep(1);
    } else if (currentStep === 3 && !isGenerating) {
      setTransitionDirection("back");
      setCurrentStep(2);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !jobDescription.trim()) {
      return;
    }

    setResults(null);
    setIsGenerating(true);
    setTransitionDirection("forward");
    setCurrentStep(3);

    await delay(GENERATION_DELAY_MS);

    setResults(generateMockResults(jobDescription, uploadedFile));
    setIsGenerating(false);
  };

  const handleStartOver = () => {
    setUploadedFile(null);
    setJobDescription("");
    setResults(null);
    setIsGenerating(false);
    setTransitionDirection("back");
    setCurrentStep(1);
  };

  const handleStepIndicatorClick = (step: number) => {
    if (
      step === 3 &&
      uploadedFile &&
      jobDescription.trim() &&
      !results &&
      !isGenerating
    ) {
      void handleGenerate();
      return;
    }
    navigateToStep(step);
  };

  const transitionClass =
    transitionDirection === "forward"
      ? "step-enter-forward"
      : "step-enter-back";

  return (
    <>
      <Navbar onSignInClick={() => setShowSignInModal(true)} />
      <SignInModal
        open={showSignInModal}
        onClose={() => setShowSignInModal(false)}
      />

      <main>
        {/* Hero */}
        <section
          className="mx-auto max-w-3xl px-5 pt-14 pb-10 text-center sm:px-8 sm:pt-20 sm:pb-14"
          aria-labelledby="hero-heading"
        >
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-sage-light px-4 py-1.5 text-[11px] font-medium tracking-[0.12em] text-sage uppercase">
            <span
              className="size-1.5 rounded-full bg-sage"
              aria-hidden="true"
            />
            Personalized applications
          </p>
          <h1
            id="hero-heading"
            className="font-serif text-4xl leading-[1.15] tracking-tight text-charcoal sm:text-5xl md:text-[3.25rem]"
          >
            Apply as who you{" "}
            <em className="font-serif text-sage italic">actually</em> are
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-charcoal-muted sm:text-lg">
            Most applications look the same. Yours won&apos;t. Share your career
            history and we&apos;ll craft materials that represent you, precisely
            matched to every role.
          </p>
          <StepProgress
            currentStep={displayStep}
            onStepClick={handleStepIndicatorClick}
            canAccessStep={canAccessStep}
            className="mt-8"
          />
        </section>

        {/* Steps */}
        <section
          id="how-it-works"
          className={cn(
            "mx-auto px-5 pb-16 sm:px-8 sm:pb-24",
            currentStep === 3 ? "max-w-4xl" : "max-w-2xl",
          )}
          aria-live="polite"
        >
          <div className="relative min-h-[320px]">
            {/* Step 1: Upload */}
            {currentStep === 1 && (
              <div key="step-1" className={transitionClass}>
                <StepCard
                  step={1}
                  title="Share your career history"
                  subtitle="Your experience, in any format"
                >
                  <p className="mb-5 text-sm leading-relaxed text-charcoal-muted">
                    Upload your CV, LinkedIn export, or any document that
                    captures your experience. We&apos;ll extract what matters
                    and build your profile from there.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="sr-only"
                    onChange={(e) => {
                      handleFileSelect(e.target.files);
                      e.target.value = "";
                    }}
                    aria-label="Upload CV or resume"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFileSelect(e.dataTransfer.files);
                    }}
                    className={cn(
                      "flex w-full flex-col items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center transition-colors",
                      "bg-beige hover:border-sage-muted hover:bg-beige/80",
                      isDragging && "border-sage bg-sage-light/50",
                      uploadedFile && "border-sage/40",
                    )}
                  >
                    <span className="mb-4 flex size-10 items-center justify-center rounded-full bg-white text-charcoal/60 shadow-sm">
                      <Upload
                        className="size-5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm font-medium text-charcoal">
                      {uploadedFile
                        ? uploadedFile.name
                        : "Drop your CV or resume here"}
                    </span>
                    <span className="mt-1.5 text-xs text-charcoal-muted">
                      {uploadedFile
                        ? `${(uploadedFile.size / 1024).toFixed(0)} KB · click to replace`
                        : "or click to browse · PDF, DOCX, TXT"}
                    </span>
                  </button>
                  <div className="mt-6 flex flex-col gap-4 border-t border-stone-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <StepFooter
                      hint="All files processed privately"
                      onPrimary={handleContinue}
                      primaryLabel="Continue"
                      primaryDisabled={!uploadedFile}
                    />
                  </div>
                </StepCard>
              </div>
            )}

            {/* Step 2: Job description */}
            {currentStep === 2 && (
              <div key="step-2" className={transitionClass}>
                <StepCard
                  step={2}
                  title="Tell us about the role"
                  subtitle="Paste a job description or link"
                  footer={
                    <StepFooter
                      hint="We only use this to tailor your materials"
                      showBack
                      onBack={handleBack}
                      onPrimary={() => void handleGenerate()}
                      primaryLabel="Generate"
                      primaryDisabled={!jobDescription.trim()}
                    />
                  }
                >
                  <p className="mb-5 text-sm leading-relaxed text-charcoal-muted">
                    Share the position you&apos;re applying for. We&apos;ll
                    analyze requirements and align your resume and cover letter
                    to match.
                  </p>
                  <label htmlFor="job-description" className="sr-only">
                    Job description
                  </label>
                  <textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here…"
                    rows={8}
                    className={cn(
                      "w-full resize-y rounded-xl border border-stone-200 bg-beige px-4 py-3 text-sm leading-relaxed text-charcoal",
                      "placeholder:text-charcoal-muted/70",
                      "transition-colors focus:border-sage-muted focus:outline-none focus:ring-2 focus:ring-sage/20",
                    )}
                  />
                </StepCard>
              </div>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && (
              <div key="step-3" className={transitionClass}>
                {isGenerating ? (
                  <StepCard
                    step={3}
                    title="Review your materials"
                    subtitle="Tailored to you and the role"
                  >
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <Spinner
                        className="size-8 border-[3px]"
                        label="Generating materials"
                      />
                      <p className="mt-6 font-serif text-xl text-charcoal">
                        Crafting your application
                      </p>
                      <p className="mt-2 max-w-sm text-sm text-charcoal-muted">
                        Analyzing the role and aligning your resume and cover
                        letter…
                      </p>
                    </div>
                  </StepCard>
                ) : results ? (
                  <ResultsContent
                    results={results}
                    onBack={handleBack}
                    onStartOver={handleStartOver}
                  />
                ) : null}
              </div>
            )}
          </div>
        </section>

        <Pricing />
      </main>

      <Footer />
    </>
  );
}

function ResultsContent({
  results,
  onBack,
  onStartOver,
}: {
  results: GenerationResult;
  onBack: () => void;
  onStartOver: () => void;
}) {
  const scoreColor =
    results.atsScore >= 85
      ? "text-sage"
      : results.atsScore >= 70
        ? "text-charcoal"
        : "text-amber-700";

  return (
    <StepCard
      step={3}
      title="Review your materials"
      subtitle="Tailored to you and the role"
      footer={
        <StepFooter
          hint="Mock preview — no real AI connected yet"
          showBack
          onBack={onBack}
          onPrimary={onStartOver}
          primaryLabel="Start over"
          showPrimaryArrow={false}
        />
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-stone-200/80 bg-beige/50 px-5 py-4">
            <p className="text-[11px] font-medium tracking-[0.12em] text-charcoal-muted uppercase">
              ATS match score
            </p>
            <p
              className={cn(
                "mt-2 font-serif text-4xl tracking-tight",
                scoreColor,
              )}
            >
              {results.atsScore}
              <span className="text-2xl text-charcoal-muted">/100</span>
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-sage transition-all duration-700 ease-out"
                style={{ width: `${results.atsScore}%` }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-stone-200/80 bg-beige/50 px-5 py-4">
            <p className="text-[11px] font-medium tracking-[0.12em] text-charcoal-muted uppercase">
              Missing keywords
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {results.missingKeywords.map((keyword) => (
                <li
                  key={keyword}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-charcoal-muted"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <PreviewBlock
            title="Resume"
            content={results.resumePreview}
            onDownload={() =>
              downloadTextFile("drafted-resume.txt", results.resumePreview)
            }
          />
          <PreviewBlock
            title="Cover letter"
            content={results.coverLetterPreview}
            onDownload={() =>
              downloadTextFile(
                "drafted-cover-letter.txt",
                results.coverLetterPreview,
              )
            }
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:flex-1"
            onClick={() =>
              downloadTextFile("drafted-resume.txt", results.resumePreview)
            }
          >
            <Download className="size-4" aria-hidden="true" />
            Download resume
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full sm:flex-1"
            onClick={() =>
              downloadTextFile(
                "drafted-cover-letter.txt",
                results.coverLetterPreview,
              )
            }
          >
            <Download className="size-4" aria-hidden="true" />
            Download cover letter
          </Button>
        </div>
      </div>
    </StepCard>
  );
}

function PreviewBlock({
  title,
  content,
  onDownload,
}: {
  title: string;
  content: string;
  onDownload: () => void;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-stone-200/80 bg-beige/50">
      <div className="flex items-center justify-between gap-3 border-b border-stone-200/60 px-4 py-3">
        <h3 className="font-serif text-base text-charcoal">{title}</h3>
        <Button type="button" variant="outline" size="sm" onClick={onDownload}>
          <Download className="size-3.5" aria-hidden="true" />
          Download
        </Button>
      </div>
      <pre className="max-h-56 overflow-auto whitespace-pre-wrap px-4 py-4 font-sans text-xs leading-relaxed text-charcoal-muted sm:text-sm">
        {content}
      </pre>
    </div>
  );
}
