"use client";

import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const subscriptions = [
  { plan: "Free", users: "906", revenue: "Rs. 0", credits: "3/user" },
  { plan: "Pro", users: "271", revenue: "Rs. 2,70,729", credits: "100/month" },
  { plan: "Premium", users: "71", revenue: "Rs. 1,77,429", credits: "Unlimited" },
];

export default function AdminSubscriptionsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="mb-1 text-2xl font-bold text-white">Subscriptions</h1>
        <p className="text-sm text-gray-400">Monitor plan distribution, credits, and subscription revenue.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {subscriptions.map((plan, index) => (
          <motion.div
            key={plan.plan}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="interactive-lift rounded-md border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-green-500/10 text-green-300">
              <CreditCard size={18} />
            </div>
            <h2 className="text-xl font-bold text-white">{plan.plan}</h2>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="flex justify-between text-gray-400"><span>Users</span><span className="text-white">{plan.users}</span></div>
              <div className="flex justify-between text-gray-400"><span>Revenue</span><span className="text-white">{plan.revenue}</span></div>
              <div className="flex justify-between text-gray-400"><span>Credits</span><span className="text-white">{plan.credits}</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
