"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, ShieldCheck, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    id: "free",
    name: "Free",
    icon: Star,
    price: { monthly: 0, yearly: 0 },
    features: ["3 AI generations", "Basic 2D renders", "Standard quality", "Watermark included", "1 project save"],
    missing: ["3D renders", "Walkthrough videos", "HD downloads", "Priority support"],
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Zap,
    price: { monthly: 999, yearly: 799 },
    features: ["100 AI generations/month", "2D and 3D renders", "HD quality", "No watermark", "Unlimited saves", "Priority generation", "All download formats"],
    missing: ["Walkthrough videos", "Team collaboration"],
    current: false,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    price: { monthly: 2499, yearly: 1999 },
    features: ["Unlimited generations", "2D, 3D and video", "4K quality", "No watermark", "Walkthrough videos", "Team collaboration", "Commercial rights", "Priority support"],
    missing: [],
    current: false,
  },
];

export default function SubscriptionPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="dashboard-content space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">Subscription</p>
        <h1 className="text-3xl font-bold text-white">Choose your plan</h1>
        <p className="mt-2 text-sm text-gray-400">Upgrade anytime. Cancel anytime.</p>

        <div className="mt-6 inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 p-1">
          {(["monthly", "yearly"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setBilling(item)}
              className={`rounded-md px-5 py-2 text-sm font-medium capitalize transition-all ${
                billing === item ? "bg-brand-gold text-brand-ink" : "text-gray-400 hover:text-white"
              }`}
            >
              {item}
              {item === "yearly" && <span className="ml-2 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-xs text-emerald-300">Save 20%</span>}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="flex items-center justify-between rounded-md border border-brand-gold/20 bg-brand-gold/10 px-5 py-4"
      >
        <div>
          <p className="text-sm font-medium text-white">
            Current Plan: <span className="text-brand-gold">Free</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">3 credits / upgrade to get more generation power.</p>
        </div>
        <div className="h-2 w-2 rounded-full bg-emerald-400" />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`relative flex flex-col rounded-md border p-6 ${
              plan.popular ? "border-brand-gold/50 bg-brand-gold/10 shadow-2xl shadow-brand-gold/5" : "border-white/10 bg-brand-panel/80"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-4 py-1 text-xs font-bold text-brand-ink">
                MOST POPULAR
              </div>
            )}

            <div className="mb-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
                <plan.icon size={18} />
              </div>
              <h3 className="mb-1 text-xl font-bold text-white">{plan.name}</h3>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-white">{plan.price[billing] === 0 ? "Free" : `Rs. ${plan.price[billing]}`}</span>
                {plan.price[billing] > 0 && <span className="mb-1 text-sm text-gray-500">/mo</span>}
              </div>
            </div>

            <ul className="mb-6 flex-1 space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check size={14} className="mt-0.5 shrink-0 text-brand-gold" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
              {plan.missing.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 opacity-35">
                  <div className="mt-2 h-px w-3.5 shrink-0 bg-gray-500" />
                  <span className="text-sm text-gray-500 line-through">{feature}</span>
                </li>
              ))}
            </ul>

            {plan.current ? (
              <div className="w-full rounded-md border border-white/10 py-2.5 text-center text-sm font-medium text-gray-400">Current Plan</div>
            ) : (
              <Button variant={plan.popular ? "brand" : "outline"} className="w-full rounded-md">
                Upgrade to {plan.name}
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      <p className="flex items-center justify-center gap-2 text-center text-xs text-gray-600">
        <ShieldCheck size={14} />
        Secure payment / Cancel anytime / 7-day money back guarantee
      </p>
    </div>
  );
}
