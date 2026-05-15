import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { Building2, DraftingCompass, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen overflow-hidden bg-brand-ink">
      <div className="relative flex flex-1 items-center justify-center px-4 py-10 sm:py-12">
        <div className="absolute inset-0 auth-blueprint opacity-35" />
        <div className="auth-line left-0 top-[18%] w-[54%]" />
        <div className="relative z-10 w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-2 sm:mb-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-gold shadow-lg shadow-brand-gold/25">
              <span className="text-sm font-bold text-brand-ink">F</span>
            </div>
            <span className="text-lg font-bold tracking-wide text-white">Framework</span>
          </Link>

          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold sm:tracking-[0.28em]">
              Architecture studio access
            </p>
            <h1 className="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl">Welcome back</h1>
            <p className="leading-relaxed text-gray-300">
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

      <div className="relative hidden flex-1 items-end justify-center overflow-hidden border-l border-white/10 bg-brand-graphite lg:flex">
        <div className="absolute inset-0 auth-project-image" />
        <div className="absolute inset-0 auth-blueprint opacity-20 mix-blend-screen" />
        <div className="auth-line top-[21%] left-0 w-[72%]" />
        <div className="auth-line top-[58%] right-0 w-[58%]" />

        <div className="auth-float absolute right-12 top-16 rounded-sm border border-white/20 bg-black/30 p-4 backdrop-blur-md">
          <DraftingCompass className="text-brand-gold" size={28} />
        </div>
        <div className="auth-float-delay absolute left-14 top-1/3 rounded-sm border border-white/20 bg-black/30 px-4 py-3 text-white backdrop-blur-md">
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
            <h2 className="mb-4 text-4xl font-bold leading-tight text-white">
              Design Your Dream Space
            </h2>
            <p className="max-w-md text-base leading-relaxed text-gray-200">
              Join designers and homeowners transforming interiors with clear planning,
              cinematic renders, and AI-powered workflows.
            </p>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              { value: "50K+", label: "Designs" },
              { value: "10K+", label: "Users" },
              { value: "99%", label: "Satisfied" },
            ].map((s) => (
              <div key={s.label} className="border border-white/15 bg-black/35 p-4 backdrop-blur-md">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-gray-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
