"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WizardShellProps {
  steps: string[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
  isLastStep: boolean;
  isSubmitting?: boolean;
  canProceed?: boolean;
  children: React.ReactNode;
}

export function WizardShell({
  steps,
  currentStep,
  onNext,
  onBack,
  onSubmit,
  isLastStep,
  isSubmitting,
  canProceed = true,
  children,
}: WizardShellProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
      {/* Progress */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-300",
                  i < currentStep && "bg-accent text-white",
                  i === currentStep && "bg-accent text-white ring-4 ring-accent/20",
                  i > currentStep && "bg-surface-elevated text-text-secondary"
                )}
              >
                {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 sm:w-12 transition-colors duration-300",
                    i < currentStep ? "bg-accent" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-text-secondary">{steps[currentStep]}</p>
      </div>

      {/* Content */}
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-8 w-full max-w-lg">
        {currentStep > 0 && (
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        )}
        <div className="flex-1" />
        {isLastStep ? (
          <Button
            onClick={onSubmit}
            disabled={!canProceed || isSubmitting}
            className="gap-2"
            size="lg"
          >
            {isSubmitting ? "Submitting..." : "Launch Your Profile"}
            {!isSubmitting && <Check className="h-4 w-4" />}
          </Button>
        ) : (
          <Button onClick={onNext} disabled={!canProceed} className="gap-2">
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
