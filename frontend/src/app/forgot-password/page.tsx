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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-ink px-4 py-10">
      <div className="absolute inset-0 auth-blueprint opacity-35" />
      <div className="auth-line top-[28%] left-0 w-[54%]" />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/login" className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
          <ArrowLeft size={16} />
          Back to login
        </Link>

        {!sent ? (
          <>
            <h1 className="mb-2 text-3xl font-bold text-white">Forgot password?</h1>
            <p className="mb-8 text-gray-300">
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
                    className="field-surface rounded-sm py-3 pl-10 pr-4 text-sm placeholder-gray-500"
                  />
                </div>
              </div>
              <Button type="submit" variant="brand" className="w-full rounded-sm uppercase tracking-wide" size="lg" loading={loading}>
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="auth-shimmer mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-sm border border-brand-gold/25 bg-brand-gold/10">
              <Mail size={28} className="text-brand-gold" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">Check your inbox</h2>
            <p className="mb-8 text-sm text-gray-300">
              We sent a password reset link to{" "}
              <span className="font-medium text-white">{email}</span>
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
