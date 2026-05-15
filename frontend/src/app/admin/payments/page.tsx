"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { CheckCircle, Clock, Download, Search, XCircle } from "lucide-react";

const payments = [
  { id: "PAY001", user: "John Doe", plan: "Pro", amount: "Rs. 999", gateway: "Razorpay", status: "success", date: "May 10, 2025", txn: "rzp_live_abc123" },
  { id: "PAY002", user: "Raj Sharma", plan: "Premium", amount: "Rs. 2,499", gateway: "Stripe", status: "success", date: "May 10, 2025", txn: "pi_abc456" },
  { id: "PAY003", user: "Sara Khan", plan: "Pro", amount: "Rs. 999", gateway: "Razorpay", status: "failed", date: "May 9, 2025", txn: "rzp_live_def789" },
  { id: "PAY004", user: "Aisha Malik", plan: "Pro", amount: "Rs. 999", gateway: "Razorpay", status: "success", date: "May 9, 2025", txn: "rzp_live_ghi012" },
  { id: "PAY005", user: "Priya Singh", plan: "Premium", amount: "Rs. 2,499", gateway: "Stripe", status: "pending", date: "May 8, 2025", txn: "pi_jkl345" },
];

const statusStyle: Record<string, { color: string; icon: LucideIcon }> = {
  success: { color: "bg-green-500/10 text-green-400 border-green-500/20", icon: CheckCircle },
  failed: { color: "bg-red-500/10 text-red-400 border-red-500/20", icon: XCircle },
  pending: { color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Clock },
};

const gatewayStyle: Record<string, string> = {
  Razorpay: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Stripe: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const parseAmount = (amount: string) => Number(amount.replace(/[^\d]/g, ""));

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Success", "Failed", "Pending"];

  const totalRevenue = payments
    .filter((payment) => payment.status === "success")
    .reduce((sum, payment) => sum + parseAmount(payment.amount), 0);

  const query = search.toLowerCase();
  const filtered = payments.filter((payment) => {
    const matchSearch = payment.user.toLowerCase().includes(query) || payment.txn.toLowerCase().includes(query);
    const matchFilter = filter === "All" || payment.status === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">Payment Management</h1>
          <p className="text-sm text-gray-400">Track all transactions across gateways.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: "Total Revenue", value: `Rs. ${totalRevenue.toLocaleString("en-IN")}`, color: "text-green-400" },
            { label: "Transactions", value: payments.length.toString(), color: "text-white" },
            { label: "Failed", value: payments.filter((payment) => payment.status === "failed").length.toString(), color: "text-red-400" },
          ].map((item) => (
            <div key={item.label} className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-center">
              <div className={`text-base font-bold ${item.color}`}>{item.value}</div>
              <div className="text-xs text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 lg:flex-row">
        <div className="relative w-full lg:max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by user or transaction ID..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field-surface rounded-md py-2.5 pl-10 pr-4 text-sm placeholder-gray-600"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-md border px-4 py-2 text-xs font-medium transition-all ${
                filter === item
                  ? "border-indigo-500/40 bg-indigo-600/20 text-indigo-300"
                  : "border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-white/10 bg-white/[0.03]">
        <div className="hidden grid-cols-12 gap-3 border-b border-white/[0.06] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 lg:grid">
          <div className="col-span-1">ID</div>
          <div className="col-span-2">User</div>
          <div className="col-span-2">Plan</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Gateway</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Actions</div>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {filtered.map((payment, index) => {
            const StatusIcon = statusStyle[payment.status].icon;
            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="grid gap-3 px-5 py-4 transition-all hover:bg-white/[0.02] lg:grid-cols-12 lg:items-center"
              >
                <div className="text-xs font-mono text-gray-600 lg:col-span-1">{payment.id}</div>
                <div className="lg:col-span-2">
                  <p className="text-sm font-medium text-white">{payment.user}</p>
                  <p className="truncate text-xs text-gray-600">{payment.date}</p>
                </div>
                <div className="text-sm text-gray-300 lg:col-span-2">{payment.plan}</div>
                <div className="text-sm font-bold text-white lg:col-span-2">{payment.amount}</div>
                <div className="lg:col-span-2">
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${gatewayStyle[payment.gateway]}`}>
                    {payment.gateway}
                  </span>
                </div>
                <div className="lg:col-span-2">
                  <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle[payment.status].color}`}>
                    <StatusIcon size={11} />
                    {payment.status}
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <button className="rounded-md p-1.5 text-gray-500 transition-all hover:bg-white/5 hover:text-white" aria-label={`Download invoice ${payment.id}`}>
                    <Download size={13} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
