"use client";

import { motion } from "framer-motion";
import { Download, SlidersHorizontal, Sparkles, Upload } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload the room",
    description: "Start with one existing photo. Framework reads the room condition, proportions, and design constraints.",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Tune the brief",
    description: "Select room type, style direction, materials, must-keep pieces, and the level of visual ambition.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Generate options",
    description: "Create layouts, render moods, and alternate directions that are easy to compare and refine.",
  },
  {
    step: "04",
    icon: Download,
    title: "Present the result",
    description: "Export the winning direction for clients, contractors, social posts, or your project archive.",
  },
];

export function HowItWorks() {
  return (
    <section id="workflow" className="section-y bg-brand-ink">
      <div className="landing-container">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">
              Workflow
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl"
            >
              From rough photo to polished design story.
            </motion.h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-gray-300">
            Each step is intentionally simple, but the output stays useful for
            homeowners, designers, and professional review conversations.
          </p>
        </div>

        <div className="relative grid gap-4 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="interactive-lift relative rounded-md border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md hover:border-brand-gold/25"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-gold text-brand-ink">
                  <step.icon size={22} />
                </div>
                <span className="text-3xl font-bold text-white/10">{step.step}</span>
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
