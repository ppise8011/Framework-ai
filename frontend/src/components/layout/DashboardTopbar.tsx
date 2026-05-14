"use client";

import Link from "next/link";
import { Bell, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-brand-night/88 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="relative hidden flex-1 items-center sm:flex">
          <Search size={16} className="absolute left-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects, rooms, styles..."
            className="w-full max-w-md rounded-sm border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-brand-gold/60 focus:bg-white/[0.07]"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/dashboard/create-project">
            <Button variant="brand" size="sm" className="hidden rounded-sm uppercase tracking-wide sm:flex">
              <Plus size={15} />
              New Design
            </Button>
          </Link>

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-brand-gold/50 hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-gold" />
          </button>

          <Link
            href="/dashboard/profile"
            className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-gold text-sm font-bold text-brand-ink"
            aria-label="Open profile"
          >
            U
          </Link>
        </div>
      </div>
    </header>
  );
}
