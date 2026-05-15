"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  CreditCard,
  DollarSign,
  FolderOpen,
  Receipt,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  trend,
  trendValue,
  delay = 0,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  trend?: "up" | "down";
  trendValue?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="interactive-lift rounded-md border border-white/10 bg-white/[0.03] p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
              trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
            }`}
          >
            {trend === "up" ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="mb-1 text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </motion.div>
  );
}

function RecentRow({
  avatar,
  name,
  sub,
  badge,
  badgeColor,
  value,
  delay,
}: {
  avatar: string;
  name: string;
  sub: string;
  badge?: string;
  badgeColor?: string;
  value?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-3 border-b border-white/[0.05] py-3 last:border-0"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
        {avatar}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{name}</p>
        <p className="truncate text-xs text-gray-500">{sub}</p>
      </div>
      {badge && (
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${badgeColor}`}>
          {badge}
        </span>
      )}
      {value && <span className="shrink-0 text-sm font-semibold text-white">{value}</span>}
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: "-",
    totalProjects: "-",
    totalGenerations: "-",
    totalRevenue: "-",
    activeSubscribers: "-",
    failedPayments: "-",
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setStats({
        totalUsers: "1,248",
        totalProjects: "3,672",
        totalGenerations: "12,490",
        totalRevenue: "Rs. 2,34,800",
        activeSubscribers: "342",
        failedPayments: "12",
      });
    }, 600);

    return () => window.clearTimeout(timeout);
  }, []);

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "bg-blue-500/20", trend: "up" as const, trendValue: "+12%" },
    { label: "Total Projects", value: stats.totalProjects, icon: FolderOpen, color: "bg-indigo-500/20", trend: "up" as const, trendValue: "+8%" },
    { label: "AI Generations", value: stats.totalGenerations, icon: Sparkles, color: "bg-purple-500/20", trend: "up" as const, trendValue: "+24%" },
    { label: "Active Subscribers", value: stats.activeSubscribers, icon: Activity, color: "bg-green-500/20", trend: "up" as const, trendValue: "+5%" },
    { label: "Total Revenue", value: stats.totalRevenue, icon: DollarSign, color: "bg-amber-500/20", trend: "up" as const, trendValue: "+18%" },
    { label: "Failed Payments", value: stats.failedPayments, icon: CreditCard, color: "bg-red-500/20", trend: "down" as const, trendValue: "-3%" },
  ];

  const recentUsers = [
    { avatar: "J", name: "John Doe", sub: "john@email.com", badge: "Pro", badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", delay: 0.1 },
    { avatar: "S", name: "Sara Khan", sub: "sara@email.com", badge: "Free", badgeColor: "bg-gray-500/10 text-gray-400 border-gray-500/20", delay: 0.15 },
    { avatar: "R", name: "Raj Sharma", sub: "raj@email.com", badge: "Premium", badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20", delay: 0.2 },
    { avatar: "A", name: "Aisha Malik", sub: "aisha@email.com", badge: "Pro", badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", delay: 0.25 },
  ];

  const recentPayments = [
    { avatar: "J", name: "John Doe", sub: "Pro Plan - May 10", value: "Rs. 999", delay: 0.1 },
    { avatar: "R", name: "Raj Sharma", sub: "Premium - May 10", value: "Rs. 2,499", delay: 0.15 },
    { avatar: "S", name: "Sara Khan", sub: "Pro Plan - May 9", value: "Rs. 999", delay: 0.2 },
    { avatar: "A", name: "Aisha Malik", sub: "Premium - May 9", value: "Rs. 2,499", delay: 0.25 },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="rounded-md border border-red-500/15 bg-gradient-to-br from-red-900/20 to-orange-900/10 p-5">
        <h1 className="mb-1 text-xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">Full platform overview for Framework AI Interior Design.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, index) => (
          <StatCard key={card.label} {...card} delay={index * 0.07} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-md border border-white/10 bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <h2 className="flex items-center gap-2 font-semibold text-white">
              <Users size={15} className="text-indigo-400" />
              Recent Users
            </h2>
            <Link href="/admin/users" className="text-xs text-indigo-400 hover:text-indigo-300">
              View all
            </Link>
          </div>
          <div className="px-5 py-2">
            {recentUsers.map((user) => (
              <RecentRow key={user.name} {...user} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-white/10 bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <h2 className="flex items-center gap-2 font-semibold text-white">
              <Receipt size={15} className="text-green-400" />
              Recent Payments
            </h2>
            <Link href="/admin/payments" className="text-xs text-indigo-400 hover:text-indigo-300">
              View all
            </Link>
          </div>
          <div className="px-5 py-2">
            {recentPayments.map((payment) => (
              <RecentRow key={payment.name + payment.sub} {...payment} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Most Used Style", value: "Luxury Modern", marker: "01" },
          { label: "Top Room Type", value: "Living Room", marker: "02" },
          { label: "Avg Generation/Day", value: "420", marker: "03" },
          { label: "Success Rate", value: "98.4%", marker: "04" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.07 }}
            className="rounded-md border border-white/10 bg-white/[0.03] p-4 text-center"
          >
            <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-red-500/10 text-xs font-bold text-red-300">
              {item.marker}
            </div>
            <div className="text-sm font-bold text-white">{item.value}</div>
            <div className="mt-0.5 text-xs text-gray-500">{item.label}</div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
