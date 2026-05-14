"use client";

import { motion } from "framer-motion";
import { Cpu, Download, Layers3, Palette, Route, WandSparkles } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Room intelligence",
    description: "Detects room type, proportions, lighting, openings, and existing furniture cues from a single image.",
  },
  {
    icon: Layers3,
    title: "2D and 3D concepts",
    description: "Move from layout thinking to atmospheric render options without rebuilding the idea from scratch.",
  },
  {
    icon: Route,
    title: "Walkthrough ready",
    description: "Generate cinematic movement through redesigned spaces for clients who need to feel the proposal.",
  },
  {
    icon: Palette,
    title: "Curated style systems",
    description: "Work with modern, luxury, Japandi, industrial, Scandinavian, and custom mood directions.",
  },
  {
    icon: WandSparkles,
    title: "Prompt refinement",
    description: "Turn loose ideas into structured design prompts with materials, mood, and functional constraints.",
  },
  {
    icon: Download,
    title: "Presentation exports",
    description: "Save high-resolution views for reviews, client decks, PDFs, and project archives.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden bg-brand-paper py-24 text-brand-ink">
      <div className="absolute inset-0 blueprint-grid opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-accent-dark">
              Everything you need
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold leading-tight sm:text-5xl"
            >
              A calmer, faster way to shape interior decisions.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-lg leading-relaxed text-brand-graphite"
          >
            Framework keeps the messy parts of early design moving: analysis,
            layout options, visual atmosphere, and presentation material in one
            production-minded flow.
          </motion.p>
        </div>

        <div className="grid gap-px overflow-hidden border border-brand-ink/10 bg-brand-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-brand-paper p-7 transition-colors hover:bg-white"
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center border border-brand-gold/50 bg-brand-gold/15 text-accent-dark transition-transform group-hover:-translate-y-1">
                <feature.icon size={22} />
              </div>
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-brand-graphite">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
