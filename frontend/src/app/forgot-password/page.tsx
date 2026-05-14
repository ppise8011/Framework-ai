"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-ink flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 auth-blueprint opacity-35" />
      <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="auth-line top-[28%] left-0 w-[54%]" />

      <div className="w-full max-w-md relative z-10">
        <Link href="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-10 transition-colors">
          <ArrowLeft size={16} />
          Back to login
        </Link>

        {!sent ? (
          <>
            <h1 className="text-3xl font-bold text-white mb-2">Forgot password?</h1>
            <p className="text-gray-300 mb-8">
              Enter your email and we&apos;ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm font-medium mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-gold/70 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>
              <Button type="submit" variant="brand" className="w-full rounded-sm uppercase tracking-wide" size="lg" loading={loading}>
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-sm border border-brand-gold/25 flex items-center justify-center mx-auto mb-6 auth-shimmer">
              <Mail size={28} className="text-brand-gold" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Check your inbox</h2>
            <p className="text-gray-300 text-sm mb-8">
              We sent a password reset link to{" "}
              <span className="text-white font-medium">{email}</span>
            </p>
            <Link href="/login">
              <Button variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10">
                Back to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
