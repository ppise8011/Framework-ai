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
    <section id="workflow" className="bg-brand-ink py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-brand-gold">
              Workflow
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl"
            >
              From rough photo to polished design story.
            </motion.h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-gray-300">
            Each step is intentionally simple, but the output stays useful for
            homeowners, designers, and professional review conversations.
          </p>
        </div>

        <div className="relative grid gap-5 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-gold/45 to-transparent lg:block" />
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
            >
              <div className="mb-10 flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center bg-brand-gold text-brand-ink">
                  <step.icon size={26} />
                </div>
                <span className="text-4xl font-bold text-white/10">{step.step}</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
