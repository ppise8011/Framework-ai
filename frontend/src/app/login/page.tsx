import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { Building2, DraftingCompass, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-ink flex overflow-hidden">
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative">
        <div className="absolute inset-0 auth-blueprint opacity-35" />
        <div className="absolute left-0 top-24 h-40 w-40 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="w-full max-w-md relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-brand-gold rounded-sm flex items-center justify-center shadow-lg shadow-brand-gold/25">
              <span className="text-brand-ink font-bold text-sm">F</span>
            </div>
            <span className="text-white font-bold text-lg tracking-wide">Framework</span>
          </Link>

          <div className="mb-8">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.28em] mb-3">
              Architecture studio access
            </p>
            <h1 className="text-4xl font-bold text-white mb-3 leading-tight">Welcome back</h1>
            <p className="text-gray-300 leading-relaxed">
              Sign in to continue shaping spaces from blueprint to experience.
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-gray-500 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-brand-gold hover:text-brand-gold-light font-medium">
              Sign up free
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 border-l border-white/10 items-end justify-center relative overflow-hidden bg-brand-graphite">
        <div className="absolute inset-0 auth-project-image" />
        <div className="absolute inset-0 auth-blueprint opacity-20 mix-blend-screen" />
        <div className="auth-line top-[21%] left-0 w-[72%]" />
        <div className="auth-line top-[58%] right-0 w-[58%]" />

        <div className="absolute right-12 top-16 auth-float rounded-sm border border-white/20 bg-black/30 backdrop-blur-md p-4">
          <DraftingCompass className="text-brand-gold" size={28} />
        </div>
        <div className="absolute left-14 top-1/3 auth-float-delay rounded-sm border border-white/20 bg-black/30 backdrop-blur-md px-4 py-3 text-white">
          <div className="text-xl font-bold">500+</div>
          <div className="text-xs text-gray-300">Projects</div>
        </div>

        <div className="relative z-10 w-full px-12 pb-14">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-white/15 bg-black/35 px-4 py-2 text-sm text-white backdrop-blur-md">
              <Sparkles size={16} className="text-brand-gold" />
              Beyond blueprints, into experiences
            </div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-sm bg-brand-gold text-brand-ink shadow-xl shadow-black/30">
              <Building2 size={30} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Design Your Dream Space
            </h2>
            <p className="text-gray-200 text-base leading-relaxed max-w-md">
              Join designers and homeowners transforming interiors with clear planning,
              cinematic renders, and AI-powered workflows.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-10 max-w-lg">
            {[
              { value: "50K+", label: "Designs" },
              { value: "10K+", label: "Users" },
              { value: "99%", label: "Satisfied" },
            ].map((s) => (
              <div key={s.label} className="border border-white/15 bg-black/35 p-4 backdrop-blur-md">
                <div className="text-white font-bold text-2xl">{s.value}</div>
                <div className="text-gray-300 text-xs uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
