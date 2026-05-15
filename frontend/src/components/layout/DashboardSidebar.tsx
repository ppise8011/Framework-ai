"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/classNames";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Download,
  FolderOpen,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plus,
  Receipt,
  Sparkles,
  User,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Create Design", href: "/dashboard/create-project", icon: Plus, highlight: true },
  { label: "My Projects", href: "/dashboard/my-projects", icon: FolderOpen },
  { label: "AI Generations", href: "/dashboard/ai-generation", icon: Sparkles },
  { label: "Downloads", href: "/dashboard/downloads", icon: Download },
];

const bottomItems = [
  { label: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
  { label: "Billing", href: "/dashboard/billing", icon: Receipt },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Help", href: "/contact", icon: HelpCircle },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-full flex-col border-r border-white/10 bg-brand-night/90 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 lg:flex",
          "w-[280px]"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <Link href="/" className={cn("flex min-w-0 items-center gap-3", collapsed && "mx-auto")}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-brand-gold text-brand-ink shadow-lg shadow-brand-gold/20">
              <span className="text-sm font-bold">F</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <span className="block truncate text-sm font-bold tracking-wide text-white">Framework</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                  Studio
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "rounded-full border border-white/10 p-1 text-gray-500 transition-colors hover:border-brand-gold/50 hover:text-white",
              collapsed && "absolute -right-3 top-8 bg-brand-panel"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
              "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                  collapsed && "justify-center px-2",
                  item.highlight && !isActive
                    ? "bg-brand-gold text-brand-ink shadow-lg shadow-brand-gold/15 hover:bg-brand-gold-light"
                    : isActive
                      ? "border border-brand-gold/30 bg-brand-gold/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon
                  size={18}
                  className={cn(
                    "shrink-0",
                    item.highlight && !isActive
                      ? "text-brand-ink"
                      : isActive
                        ? "text-brand-gold"
                        : "text-gray-500 group-hover:text-brand-gold"
                  )}
                />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="mx-3 mb-3 rounded-md border border-brand-gold/20 bg-brand-gold/10 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400">AI Credits</span>
              <span className="text-xs font-bold text-brand-gold">3 / 3</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full rounded-full bg-brand-gold" />
            </div>
            <Link
              href="/dashboard/subscription"
              className="mt-3 block text-center text-xs font-semibold text-brand-gold transition-colors hover:text-brand-gold-light"
            >
              Upgrade plan
            </Link>
          </div>
        )}

        <div className="space-y-1 border-t border-white/10 px-3 py-4">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                  collapsed && "justify-center px-2",
                  isActive ? "bg-brand-gold/10 text-white" : "text-gray-500 hover:bg-white/5 hover:text-white"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={16} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}

          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-gray-500 transition-all hover:bg-red-500/5 hover:text-red-400",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-brand-panel/95 px-2 py-2 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-around">
          {[...navItems.slice(0, 4), bottomItems[2]].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-sm px-3 py-1.5 transition-all",
                  isActive ? "text-brand-gold" : "text-gray-500"
                )}
              >
                <item.icon size={20} />
                <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
