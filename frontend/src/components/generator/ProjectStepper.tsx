"use client";

import { Check } from "lucide-react";

const steps = [
  { id: 1, label: "Upload Room", short: "Upload" },
  { id: 2, label: "Room Details", short: "Details" },
  { id: 3, label: "Choose Style", short: "Style" },
  { id: 4, label: "Add Assets", short: "Assets" },
  { id: 5, label: "Generate", short: "Generate" },
];

export function ProjectStepper({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-10 w-full rounded-sm border border-white/10 bg-brand-panel/80 p-5 shadow-2xl shadow-black/20 backdrop-blur">
      <div className="relative flex items-start justify-between">
        <div className="absolute left-4 right-4 top-4 h-px bg-white/10" />
        <div
          className="absolute left-4 top-4 h-px bg-gradient-to-r from-brand-gold to-brand-gold-light transition-all duration-500"
          style={{ width: `calc((100% - 2rem) * ${progress / 100})` }}
        />

        {steps.map((step) => {
          const isDone = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 ${
                  isDone
                    ? "border-brand-gold bg-brand-gold text-brand-ink"
                    : isActive
                      ? "border-brand-gold bg-brand-ink text-brand-gold shadow-lg shadow-brand-gold/15"
                      : "border-white/10 bg-brand-night text-gray-600"
                }`}
                aria-label={step.label}
              >
                {isDone ? <Check size={14} /> : step.id}
              </div>
              <span
                className={`hidden text-center text-xs font-medium transition-colors sm:block ${
                  isActive ? "text-white" : isDone ? "text-brand-gold" : "text-gray-600"
                }`}
              >
                {step.short}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
