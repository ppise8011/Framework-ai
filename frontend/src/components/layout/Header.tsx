"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#workflow" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-brand-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-brand-gold text-brand-ink shadow-lg shadow-brand-gold/20">
            <span className="text-sm font-bold">F</span>
          </div>
          <div>
            <span className="block text-base font-bold tracking-wide text-white">Framework</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400 sm:block">
              AI interiors
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-brand-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="rounded-sm">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="brand" size="sm" className="rounded-sm uppercase tracking-wide">
              Start Free
            </Button>
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 text-gray-300 transition-colors hover:text-white md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-brand-ink px-4 py-4 md:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-sm font-medium text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="sm" className="w-full rounded-sm border-brand-gold text-brand-gold">
                Login
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setIsOpen(false)}>
              <Button variant="brand" size="sm" className="w-full rounded-sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
