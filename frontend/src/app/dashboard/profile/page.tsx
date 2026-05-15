"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building, Camera, Mail, Phone, Save, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

const userTypes = ["Homeowner", "Architect", "Interior Designer", "Real Estate", "Commercial"];

export default function ProfilePage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    company: "",
    userType: "Homeowner",
    bio: "",
  });

  const update = (key: string, value: string) => setForm((previous) => ({ ...previous, [key]: value }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 1200);
  };

  return (
    <div className="dashboard-content max-w-3xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">Settings</p>
        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
        <p className="mt-2 text-sm text-gray-400">Manage your account information.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-5 rounded-md border border-white/10 bg-brand-panel/80 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
      >
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gradient-to-br from-brand-gold to-accent-dark text-3xl font-bold text-brand-ink">
            {form.fullName.charAt(0)}
          </div>
          <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-night bg-brand-gold transition-all hover:bg-brand-gold-light" aria-label="Change avatar">
            <Camera size={13} className="text-brand-ink" />
          </button>
        </div>
        <div>
          <p className="font-semibold text-white">{form.fullName}</p>
          <p className="text-sm text-gray-500">{form.email}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-2.5 py-0.5 text-xs text-brand-gold">Free Plan</span>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-300">Active</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-5 rounded-md border border-white/10 bg-brand-panel/80 p-6"
      >
        <h2 className="font-semibold text-white">Personal Information</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { key: "fullName", label: "Full Name", icon: User, type: "text", placeholder: "John Doe" },
            { key: "email", label: "Email", icon: Mail, type: "email", placeholder: "you@example.com" },
            { key: "phone", label: "Phone", icon: Phone, type: "tel", placeholder: "+91 98765 43210" },
            { key: "company", label: "Company", icon: Building, type: "text", placeholder: "Optional" },
          ].map((field) => (
            <div key={field.key}>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">{field.label}</label>
              <div className="relative">
                <field.icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={(event) => update(field.key, event.target.value)}
                  className="w-full rounded-md border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-brand-gold/60"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-400">Bio</label>
          <textarea
            rows={3}
            placeholder="Tell us about yourself..."
            value={form.bio}
            onChange={(event) => update("bio", event.target.value)}
            className="w-full resize-none rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-brand-gold/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-gray-400">I am a</label>
          <div className="flex flex-wrap gap-2">
            {userTypes.map((type) => (
              <button
                key={type}
                onClick={() => update("userType", type)}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${
                  form.userType === type
                    ? "border-brand-gold/40 bg-brand-gold/15 text-brand-gold"
                    : "border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} loading={saving} className="w-full gap-2 rounded-md sm:w-auto">
          <Save size={15} />
          {saved ? "Saved" : "Save Changes"}
        </Button>
      </motion.div>

      <div className="rounded-md border border-red-500/15 bg-red-500/5 p-6">
        <h2 className="mb-1 font-semibold text-red-300">Danger Zone</h2>
        <p className="mb-4 text-sm text-gray-500">Permanently delete your account and all data. This cannot be undone.</p>
        <Button variant="danger" size="sm">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
