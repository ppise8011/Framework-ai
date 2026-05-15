"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth.store";

const userTypes = [
  "Homeowner",
  "Architect",
  "Interior Designer",
  "Real Estate",
  "Commercial",
];

export function SignupForm() {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    userType: "",
    password: "",
    agree: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.fullName || !form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!form.agree) {
      setError("Please accept the terms and conditions");
      return;
    }
    try {
      await signup({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        userType: form.userType || "Homeowner",
      });
      toast.success("Account created");
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed. Please try again.";
      setError(message);
    }
  };

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="interactive-lift flex w-full items-center justify-center gap-3 rounded-sm border border-white/10 bg-white/5 py-3 text-sm font-medium text-white hover:bg-white/10"
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" />
          <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" />
          <path fill="#FBBC05" d="M4.5 10.48A4.8 4.8 0 0 1 4.5 7.5V5.43H1.83a8 8 0 0 0 0 7.12l2.67-2.07z" />
          <path fill="#EA4335" d="M8.98 3.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.43L4.5 7.5c.53-1.56 1.98-4.32 4.48-4.32z" />
        </svg>
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs text-gray-400 bg-brand-ink px-3 w-fit mx-auto">
          or sign up with email
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-sm px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-300 text-sm font-medium mb-1.5 block">Full Name *</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold" />
            <input
              type="text"
              placeholder="John Doe"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className="field-surface rounded-sm py-3 pl-10 pr-4 text-sm placeholder-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-300 text-sm font-medium mb-1.5 block">Email *</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold" />
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="field-surface rounded-sm py-3 pl-10 pr-4 text-sm placeholder-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-300 text-sm font-medium mb-1.5 block">Phone</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold" />
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="field-surface rounded-sm py-3 pl-10 pr-4 text-sm placeholder-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-300 text-sm font-medium mb-1.5 block">I am a</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {userTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => update("userType", type)}
                className={`interactive-lift rounded-sm border px-3 py-2 text-xs font-medium ${
                  form.userType === type
                    ? "bg-brand-gold/20 border-brand-gold/70 text-brand-gold-light"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-gray-300 text-sm font-medium mb-1.5 block">Password *</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gold" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="field-surface rounded-sm py-3 pl-10 pr-10 text-sm placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => update("agree", e.target.checked)}
            className="mt-0.5 accent-brand-gold"
          />
          <span className="text-gray-400 text-xs leading-relaxed">
            I agree to the{" "}
            <a href="#" className="text-brand-gold hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-brand-gold hover:underline">Privacy Policy</a>
          </span>
        </label>

        <Button type="submit" variant="brand" className="w-full rounded-sm uppercase tracking-wide" size="lg" loading={isLoading}>
          Create Free Account
        </Button>
      </form>
    </div>
  );
}
