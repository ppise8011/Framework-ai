"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ban, Eye, Mail, MoreHorizontal, Search, UserCheck } from "lucide-react";

const users = [
  { id: "1", name: "John Doe", email: "john@email.com", type: "Homeowner", plan: "Pro", status: "active", joined: "May 1, 2025", generations: 24 },
  { id: "2", name: "Sara Khan", email: "sara@email.com", type: "Designer", plan: "Free", status: "active", joined: "May 3, 2025", generations: 2 },
  { id: "3", name: "Raj Sharma", email: "raj@email.com", type: "Architect", plan: "Premium", status: "active", joined: "Apr 28, 2025", generations: 87 },
  { id: "4", name: "Aisha Malik", email: "aisha@email.com", type: "Real Estate", plan: "Pro", status: "banned", joined: "Apr 20, 2025", generations: 15 },
  { id: "5", name: "Priya Singh", email: "priya@email.com", type: "Homeowner", plan: "Free", status: "active", joined: "Apr 15, 2025", generations: 1 },
  { id: "6", name: "Arjun Dev", email: "arjun@email.com", type: "Commercial", plan: "Premium", status: "active", joined: "Apr 10, 2025", generations: 143 },
];

const planColor: Record<string, string> = {
  Free: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  Pro: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Premium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const statusColor: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  banned: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const plans = ["All", "Free", "Pro", "Premium"];

  const query = search.toLowerCase();
  const filtered = users.filter((user) => {
    const matchSearch = user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    const matchPlan = planFilter === "All" || user.plan === planFilter;
    return matchSearch && matchPlan;
  });

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">User Management</h1>
          <p className="text-sm text-gray-400">{users.length} total users registered</p>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-md border border-indigo-500/20 bg-indigo-500/10 px-4 py-2">
          <UserCheck size={14} className="text-indigo-400" />
          <span className="text-sm font-medium text-indigo-300">342 Active Subscribers</span>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 lg:flex-row">
        <div className="relative w-full lg:max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field-surface rounded-md py-2.5 pl-10 pr-4 text-sm placeholder-gray-600"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {plans.map((plan) => (
            <button
              key={plan}
              onClick={() => setPlanFilter(plan)}
              className={`rounded-md border px-4 py-2 text-xs font-medium transition-all ${
                planFilter === plan
                  ? "border-indigo-500/40 bg-indigo-600/20 text-indigo-300"
                  : "border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
              }`}
            >
              {plan}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-white/10 bg-white/[0.03]">
        <div className="hidden grid-cols-12 gap-4 border-b border-white/[0.06] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 lg:grid">
          <div className="col-span-4">User</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Plan</div>
          <div className="col-span-1 text-center">Gens</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {filtered.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.04 }}
              className="grid gap-4 px-5 py-4 transition-all hover:bg-white/[0.02] lg:grid-cols-12 lg:items-center"
            >
              <div className="flex items-center gap-3 lg:col-span-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{user.name}</p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="text-xs text-gray-400 lg:col-span-2">{user.type}</div>
              <div className="lg:col-span-2">
                <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${planColor[user.plan]}`}>
                  {user.plan}
                </span>
              </div>
              <div className="text-sm font-semibold text-white lg:col-span-1 lg:text-center">{user.generations}</div>
              <div className="lg:col-span-2">
                <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusColor[user.status]}`}>
                  {user.status}
                </span>
              </div>

              <div className="relative flex justify-end lg:col-span-1 lg:justify-center">
                <button
                  onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}
                  className="rounded-md p-1.5 text-gray-500 transition-all hover:bg-white/5 hover:text-white"
                  aria-label={`Open actions for ${user.name}`}
                >
                  <MoreHorizontal size={15} />
                </button>

                {menuOpen === user.id && (
                  <div className="absolute right-0 top-8 z-20 w-40 overflow-hidden rounded-md border border-white/10 bg-[#12121f] shadow-xl">
                    <button className="flex w-full items-center gap-2 px-3 py-2.5 text-xs text-gray-400 transition-all hover:bg-white/5 hover:text-white">
                      <Eye size={13} /> View Details
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2.5 text-xs text-gray-400 transition-all hover:bg-white/5 hover:text-white">
                      <Mail size={13} /> Send Email
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2.5 text-xs text-red-400 transition-all hover:bg-red-500/5">
                      <Ban size={13} />
                      {user.status === "banned" ? "Unban User" : "Ban User"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-gray-500">
          Showing {filtered.length} of {users.length} users
        </p>
        <div className="flex gap-2">
          {["1", "2", "3"].map((page) => (
            <button
              key={page}
              className={`h-8 w-8 rounded-md text-sm font-medium transition-all ${
                page === "1" ? "bg-indigo-600 text-white" : "border border-white/10 bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
