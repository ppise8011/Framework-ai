import {
  ArrowRight,
  Clock,
  Download,
  FolderOpen,
  LayoutTemplate,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const stats = [
  { label: "Projects", value: "0", icon: FolderOpen },
  { label: "Generations", value: "0", icon: Sparkles },
  { label: "Downloads", value: "0", icon: Download },
  { label: "Credits Left", value: "3", icon: TrendingUp },
];

const quickActions = [
  {
    label: "Create room design",
    desc: "Upload a room photo and generate a new design direction.",
    href: "/dashboard/create-project",
    icon: Plus,
  },
  {
    label: "Review projects",
    desc: "Open saved work, compare outputs, and continue edits.",
    href: "/dashboard/my-projects",
    icon: LayoutTemplate,
  },
  {
    label: "Manage plan",
    desc: "Upgrade credits, unlock HD exports, and enable video.",
    href: "/dashboard/subscription",
    icon: TrendingUp,
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="relative overflow-hidden rounded-sm border border-white/10 bg-brand-panel shadow-2xl shadow-black/20">
        <div className="absolute inset-0 project-panel-two opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-panel via-brand-panel/90 to-brand-panel/40" />
        <div className="relative z-10 grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-brand-gold">
              Design workspace
            </p>
            <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Build your next interior concept from one room photo.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-300">
              Start with a room, define the brief, choose a style, and generate a client-ready visual direction.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard/create-project">
                <Button variant="brand" size="lg" className="w-full rounded-sm uppercase tracking-wide sm:w-auto">
                  <Plus size={17} />
                  Create Design
                </Button>
              </Link>
              <Link href="/dashboard/my-projects">
                <Button variant="outline" size="lg" className="w-full rounded-sm border-white/15 text-white hover:bg-white/5 sm:w-auto">
                  View Projects
                  <ArrowRight size={17} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-sm border border-brand-gold/20 bg-black/35 p-5 backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Free plan</p>
                <p className="text-xs text-gray-400">3 credits available</p>
              </div>
              <span className="rounded-sm bg-brand-gold/15 px-3 py-1 text-xs font-bold text-brand-gold">
                3 / 3
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full rounded-full bg-brand-gold" />
            </div>
            <p className="mt-5 text-xs leading-relaxed text-gray-400">
              Each 2D or 3D generation uses one credit. Video walkthroughs require a Pro plan.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-sm border border-white/10 bg-brand-panel/90 p-5 shadow-xl shadow-black/10">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
              <stat.icon size={18} />
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">{stat.label}</div>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Quick actions</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="group">
              <div className="h-full rounded-sm border border-white/10 bg-brand-panel/90 p-5 transition-all hover:-translate-y-0.5 hover:border-brand-gold/35 hover:bg-brand-panel2">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-sm bg-white/5 text-brand-gold">
                  <action.icon size={20} />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{action.label}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">{action.desc}</p>
                  </div>
                  <ArrowRight size={16} className="mt-1 shrink-0 text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-brand-gold" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent projects</h2>
            <Link href="/dashboard/my-projects" className="text-sm font-medium text-brand-gold hover:text-brand-gold-light">
              View all
            </Link>
          </div>
          <div className="rounded-sm border border-dashed border-white/12 bg-brand-panel/60 p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-white/5 text-gray-500">
              <Clock size={24} />
            </div>
            <h3 className="font-semibold text-white">No projects yet</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
              Create your first design to see saved outputs, downloads, and project history here.
            </p>
          </div>
        </div>

        <div className="rounded-sm border border-brand-gold/20 bg-gradient-to-br from-brand-gold/12 to-white/[0.02] p-6">
          <p className="mb-2 text-sm font-bold text-brand-gold">Pro workflow</p>
          <h3 className="text-xl font-bold text-white">Need more than still renders?</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Upgrade when you are ready for more credits, HD exports, and cinematic walkthrough videos.
          </p>
          <Link href="/dashboard/subscription" className="mt-6 inline-flex">
            <Button variant="outline" size="sm" className="rounded-sm border-brand-gold/50 text-brand-gold hover:bg-brand-gold/10">
              Upgrade plan
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
