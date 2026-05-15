"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Bell, Globe, Key, Save, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

const inputClass = "field-surface rounded-md px-4 py-2.5 text-sm";

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    appName: "Framework",
    supportEmail: "support@framework.ai",
    freeCredits: "3",
    proCredits: "100",
    maintenanceMode: false,
    emailNotifs: true,
    paymentNotifs: true,
    razorpayMode: "test",
    stripeMode: "test",
  });

  const update = (key: keyof typeof settings, value: string | boolean) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="mb-1 text-2xl font-bold text-white">Admin Settings</h1>
        <p className="text-sm text-gray-400">Configure global platform settings.</p>
      </div>

      <Section title="General" icon={Globe}>
        <Field label="App Name">
          <input value={settings.appName} onChange={(event) => update("appName", event.target.value)} className={inputClass} />
        </Field>
        <Field label="Support Email">
          <input value={settings.supportEmail} onChange={(event) => update("supportEmail", event.target.value)} className={inputClass} />
        </Field>
        <Field label="Maintenance Mode">
          <Toggle value={settings.maintenanceMode} onChange={(value) => update("maintenanceMode", value)} label="Put site in maintenance mode" />
        </Field>
      </Section>

      <Section title="Credit Limits" icon={Key}>
        <Field label="Free Plan Credits">
          <input type="number" value={settings.freeCredits} onChange={(event) => update("freeCredits", event.target.value)} className={inputClass} />
        </Field>
        <Field label="Pro Plan Credits / Month">
          <input type="number" value={settings.proCredits} onChange={(event) => update("proCredits", event.target.value)} className={inputClass} />
        </Field>
      </Section>

      <Section title="Payment Gateways" icon={Shield}>
        <Field label="Razorpay Mode">
          <ModeButtons value={settings.razorpayMode} onChange={(value) => update("razorpayMode", value)} />
        </Field>
        <Field label="Stripe Mode">
          <ModeButtons value={settings.stripeMode} onChange={(value) => update("stripeMode", value)} />
        </Field>
      </Section>

      <Section title="Notifications" icon={Bell}>
        <Field label="Email Notifications">
          <Toggle value={settings.emailNotifs} onChange={(value) => update("emailNotifs", value)} label="Send email on new signups" />
        </Field>
        <Field label="Payment Alerts">
          <Toggle value={settings.paymentNotifs} onChange={(value) => update("paymentNotifs", value)} label="Alert on failed payments" />
        </Field>
      </Section>

      <Button onClick={handleSave} loading={saving} className="w-full gap-2 rounded-md sm:w-auto">
        <Save size={15} />
        Save All Settings
      </Button>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <section className="space-y-5 rounded-md border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <h2 className="flex items-center gap-2 font-semibold text-white">
        <Icon size={16} className="text-indigo-400" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3 sm:items-center sm:gap-4">
      <label className="text-sm text-gray-400 sm:col-span-1">{label}</label>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

function ModeButtons({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex gap-2">
      {["test", "live"].map((mode) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={`rounded-md border px-4 py-2 text-xs font-medium capitalize transition-all ${
            value === mode
              ? "border-indigo-500/40 bg-indigo-600/20 text-indigo-300"
              : "border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
          }`}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition-all ${value ? "bg-indigo-600" : "bg-white/10"}`}
        aria-pressed={value}
      >
        <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${value ? "left-6" : "left-1"}`} />
      </button>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}
