import Link from "next/link";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
  { label: "Forgot Password", href: "/forgot-password" },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-brand-night py-12 text-white">
      <div className="landing-container">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-brand-gold text-brand-ink">
                <span className="text-sm font-bold">F</span>
              </div>
              <div>
                <span className="block text-lg font-bold tracking-wide">Framework</span>
                <span className="text-xs uppercase tracking-[0.24em] text-gray-500">AI interiors</span>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              AI-powered interior design for homeowners, designers, architects,
              and teams turning rooms into clear visual decisions.
            </p>
            <div className="mt-8 rounded-md border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">contact@frameworkdesign.com</p>
              <p className="mt-1 text-sm text-gray-400">Pune, Maharashtra</p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-gold">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-gold">Account</h4>
            <ul className="space-y-3">
              {accountLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex-row">
          <p>(c) 2026 Framework. All rights reserved.</p>
          <p>Built for faster design conversations.</p>
        </div>
      </div>
    </footer>
  );
}
