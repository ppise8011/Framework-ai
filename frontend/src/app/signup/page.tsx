import { SignupForm } from "@/components/auth/SignupForm";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-brand-ink flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 auth-blueprint opacity-35" />
      <div className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="auth-line top-[18%] left-0 w-[54%]" />
      <div className="auth-line bottom-[16%] right-0 w-[48%]" />

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-brand-gold rounded-sm flex items-center justify-center shadow-lg shadow-brand-gold/25">
            <span className="text-brand-ink font-bold text-sm">F</span>
          </div>
          <span className="text-white font-bold text-lg tracking-wide">Framework</span>
        </Link>

        <div className="mb-8">
          <p className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-[0.24em] mb-3">
            <Sparkles size={14} />
            Design workspace
          </p>
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight">Create your account</h1>
          <p className="text-gray-300 leading-relaxed">Start designing with AI - free forever</p>
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
