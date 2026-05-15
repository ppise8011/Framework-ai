import { SignupForm } from "@/components/auth/SignupForm";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-ink px-4 py-10 sm:py-12">
      <div className="absolute inset-0 auth-blueprint opacity-35" />
      <div className="auth-line top-[18%] left-0 w-[54%]" />
      <div className="auth-line bottom-[16%] right-0 w-[48%]" />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center gap-2 sm:mb-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-gold shadow-lg shadow-brand-gold/25">
            <span className="text-sm font-bold text-brand-ink">F</span>
          </div>
          <span className="text-lg font-bold tracking-wide text-white">Framework</span>
        </Link>

        <div className="mb-8">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold sm:tracking-[0.24em]">
            <Sparkles size={14} />
            Design workspace
          </p>
          <h1 className="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl">Create your account</h1>
          <p className="leading-relaxed text-gray-300">Start designing with AI - free forever</p>
        </div>

        <SignupForm />

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-gold hover:text-brand-gold-light font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
