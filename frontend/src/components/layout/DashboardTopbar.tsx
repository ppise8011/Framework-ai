"use client";

import Link from "next/link";
import { Bell, LogOut, Plus, Search, Settings, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth.store";

export function DashboardTopbar() {
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const initials =
    user?.fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-brand-night/90 backdrop-blur-xl">
      <div className="dashboard-content flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-1 items-center">
          <Search size={16} className="absolute left-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="field-surface w-full max-w-md rounded-md py-2.5 pl-10 pr-4 text-sm placeholder-gray-600 sm:placeholder:text-transparent md:placeholder:text-gray-600"
          />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <Link href="/dashboard/create-project">
            <Button variant="brand" size="sm" className="hidden rounded-md uppercase tracking-wide sm:flex">
              <Plus size={15} />
              New Design
            </Button>
          </Link>

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-brand-gold/50 hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-gold" />
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-gold text-sm font-bold text-brand-ink"
              aria-label="Open profile menu"
            >
              {initials}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-md border border-white/10 bg-brand-panel shadow-2xl shadow-black/40">
                <div className="border-b border-white/10 px-4 py-3">
                  <p className="truncate text-sm font-medium text-white">{user?.fullName}</p>
                  <p className="truncate text-xs text-gray-500">{user?.email}</p>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 transition-all hover:bg-white/5 hover:text-white"
                  >
                    <User size={14} />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/subscription"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 transition-all hover:bg-white/5 hover:text-white"
                  >
                    <Settings size={14} />
                    Subscription
                  </Link>
                </div>

                <div className="border-t border-white/10 py-1">
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 transition-all hover:bg-red-500/5"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
