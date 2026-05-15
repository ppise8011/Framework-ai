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
    <section id="features" className="section-y relative overflow-hidden bg-brand-paper text-brand-ink">
      <div className="absolute inset-0 opacity-[0.18]" />

      <div className="landing-container relative z-10">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent-dark">
              Everything you need
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl"
            >
              A calmer, faster way to shape interior decisions.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-base leading-8 text-brand-graphite"
          >
            Framework keeps the messy parts of early design moving: analysis,
            layout options, visual atmosphere, and presentation material in one
            production-minded flow.
          </motion.p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="interactive-lift group rounded-md border border-brand-ink/10 bg-white/75 p-5 shadow-sm shadow-brand-ink/5 hover:bg-white sm:p-6"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-md border border-brand-gold/40 bg-brand-gold/15 text-accent-dark transition-transform group-hover:-translate-y-1">
                <feature.icon size={22} />
              </div>
              <h3 className="mb-3 text-lg font-bold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-brand-graphite">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
