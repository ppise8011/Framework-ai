"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Free",
    price: "Rs. 0",
    period: "forever",
    description: "Try the workflow on a few rooms.",
    features: ["3 AI generations", "Basic 2D renders", "Standard quality", "1 project save"],
    excluded: ["3D renders", "Walkthrough videos", "HD downloads"],
    cta: "Get Started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "Rs. 999",
    period: "per month",
    description: "Best for homeowners and independent designers.",
    features: [
      "100 AI generations/month",
      "2D and 3D renders",
      "HD quality exports",
      "No watermark",
      "Unlimited project saves",
      "Priority generation",
    ],
    excluded: ["Walkthrough videos"],
    cta: "Start Pro",
    href: "/signup?plan=pro",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "Rs. 2,499",
    period: "per month",
    description: "For professional teams and client delivery.",
    features: [
      "Unlimited generations",
      "2D, 3D and video renders",
      "4K quality outputs",
      "Team collaboration",
      "Commercial usage rights",
      "Priority support",
    ],
    excluded: [],
    cta: "Start Premium",
    href: "/signup?plan=premium",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-brand-paper py-24 text-brand-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-accent-dark">
            Pricing
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold leading-tight sm:text-5xl"
          >
            Clear plans for real design work.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-graphite">
            Start small, upgrade when the workflow becomes part of your project rhythm.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`relative flex flex-col border p-7 ${
                plan.highlighted
                  ? "border-brand-gold bg-brand-ink text-white shadow-2xl shadow-brand-ink/25"
                  : "border-brand-ink/10 bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-6 bg-brand-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-ink">
                  Most popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <p className={plan.highlighted ? "text-gray-300" : "text-brand-graphite"}>
                  {plan.description}
                </p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? "mb-1 text-gray-400" : "mb-1 text-brand-graphite"}>
                    / {plan.period}
                  </span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="shrink-0 text-brand-gold" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.excluded.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm opacity-45">
                    <Minus size={16} className="shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="mt-auto">
                <Button
                  variant={plan.highlighted ? "brand" : "outline"}
                  className={`w-full rounded-sm uppercase tracking-wide ${
                    plan.highlighted
                      ? "border-brand-gold bg-brand-gold text-brand-ink hover:bg-brand-gold-light"
                      : "border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
