// src/components/ui/Button.tsx
import { cn } from "@/utils/classNames";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "brand" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-brand-gold hover:bg-brand-gold-light text-brand-ink border border-brand-gold shadow-lg shadow-brand-gold/15",
      brand: "bg-brand-gold hover:bg-brand-gold-light text-brand-ink border border-brand-gold shadow-lg shadow-brand-gold/15",
      secondary: "bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/10",
      outline: "border border-brand-gold/50 text-brand-gold hover:bg-brand-gold/10",
      ghost: "text-gray-400 hover:text-white hover:bg-white/5",
      danger: "bg-red-600 hover:bg-red-500 text-white",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-sm",
      md: "px-5 py-2.5 text-sm rounded-sm",
      lg: "px-8 py-3.5 text-base rounded-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
