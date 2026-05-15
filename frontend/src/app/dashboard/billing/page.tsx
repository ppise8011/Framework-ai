"use client";

import { motion } from "framer-motion";
import { Calendar, CreditCard, Download, Receipt } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const invoices = [
  { id: "INV-001", plan: "Pro Plan", amount: "Rs. 999", date: "May 1, 2025", status: "paid" },
  { id: "INV-002", plan: "Pro Plan", amount: "Rs. 999", date: "Apr 1, 2025", status: "paid" },
  { id: "INV-003", plan: "Pro Plan", amount: "Rs. 999", date: "Mar 1, 2025", status: "paid" },
];

export default function BillingPage() {
  return (
    <div className="dashboard-content max-w-3xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">Account</p>
        <h1 className="text-3xl font-bold text-white">Billing</h1>
        <p className="mt-2 text-sm text-gray-400">Manage your subscription and payment history.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-md border border-brand-gold/20 bg-gradient-to-br from-brand-gold/12 to-white/[0.02] p-6"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="mb-1 text-xs text-gray-400">Current Plan</p>
            <h2 className="text-xl font-bold text-white">Free Plan</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">Active</span>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Credits", value: "3 / 3" },
            { label: "Renews", value: "Never" },
            { label: "Price", value: "Rs. 0/mo" },
          ].map((item) => (
            <div key={item.label} className="rounded-md bg-white/5 p-3 text-center">
              <div className="text-sm font-bold text-white">{item.value}</div>
              <div className="mt-0.5 text-xs text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>

        <Link href="/dashboard/subscription">
          <Button className="gap-2 rounded-md">
            <CreditCard size={16} />
            Upgrade Plan
          </Button>
        </Link>
      </motion.div>

      <section className="rounded-md border border-white/10 bg-brand-panel/80 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
          <CreditCard size={16} className="text-brand-gold" />
          Payment Method
        </h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-12 items-center justify-center rounded-md bg-gradient-to-br from-brand-gold to-accent-dark">
              <span className="text-xs font-bold text-brand-ink">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Card not connected</p>
              <p className="text-xs text-gray-500">Add a card when upgrading</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full rounded-md sm:w-auto">
            Change
          </Button>
        </div>
      </section>

      <section className="overflow-hidden rounded-md border border-white/10 bg-brand-panel/80">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h3 className="flex items-center gap-2 font-semibold text-white">
            <Receipt size={16} className="text-brand-gold" />
            Billing History
          </h3>
        </div>

        <div className="divide-y divide-white/10">
          {invoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.07 }}
              className="flex flex-col gap-3 px-5 py-4 transition-all hover:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-4 sm:px-6"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-gold/10">
                <Receipt size={15} className="text-brand-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{invoice.plan}</p>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar size={10} />
                  {invoice.date} / {invoice.id}
                </p>
              </div>
              <span className="text-sm font-semibold text-white sm:ml-auto">{invoice.amount}</span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                {invoice.status}
              </span>
              <button className="rounded-md p-1.5 text-gray-600 transition-all hover:bg-white/5 hover:text-white" aria-label="Download invoice">
                <Download size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
