"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, CheckCircle, Home, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { roleTabs, type RoleTabKey } from "@/lib/content";

const tabKeys = Object.keys(roleTabs) as RoleTabKey[];

const tabMeta: Record<RoleTabKey, { icon: typeof Home; hint: string }> = {
  residents: { icon: Home, hint: "Daily living & gate" },
  committee: { icon: Building2, hint: "RWA & treasury" },
};

export function RoleTabsSection() {
  const [activeTab, setActiveTab] = useState<RoleTabKey>("residents");
  const active = roleTabs[activeTab];

  return (
    <section id="for-you" className="bg-background pb-10 pt-6 md:pb-12 md:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12">
        <SectionHeading
          badge="Built for your role"
          title="Residents, owners, and committees — one platform"
          description="Pick a perspective to see the workflows MySocietyHub supports out of the box."
          className="max-w-2xl"
        />

        <div className="mt-5 overflow-hidden border border-slate-200 bg-slate-50/80 lg:grid lg:grid-cols-[minmax(0,240px)_1fr]">
          {/* Vertical role selector */}
          <div className="flex border-b border-slate-200 lg:flex-col lg:border-b-0 lg:border-r">
            {tabKeys.map((key) => {
              const meta = tabMeta[key];
              const Icon = meta.icon;
              const isActive = activeTab === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`relative flex flex-1 items-start gap-3 px-4 py-4 text-left transition-colors lg:flex-none lg:px-5 lg:py-5 ${
                    isActive ? "bg-white" : "hover:bg-white/60"
                  }`}
                >
                  {isActive ? (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary lg:bottom-auto lg:left-0 lg:top-0 lg:h-full lg:w-1" />
                  ) : null}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? "bg-primary text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-heading text-sm font-semibold ${
                        isActive ? "text-slate-900" : "text-slate-600"
                      }`}
                    >
                      {roleTabs[key].title}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">{meta.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div className="bg-white p-5 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid gap-6 lg:grid-cols-[1fr_minmax(0,260px)] lg:items-start"
              >
                <div>
                  <h3 className="font-heading text-xl font-semibold text-slate-900 sm:text-2xl">
                    {active.tagline}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{active.description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {active.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          strokeWidth={2.2}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-4">
                  {activeTab === "residents" ? <ResidentPreview /> : <CommitteePreview />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResidentPreview() {
  return (
    <div className="space-y-3">
      <p className="text-eyebrow text-primary">Resident preview</p>
      <div className="rounded-md border border-dashed border-sky-200 bg-white p-3">
        <p className="text-[10px] font-semibold uppercase text-slate-400">Visitor request</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">Delivery · Flat 402</p>
      </div>
      <div className="flex gap-2">
        <span className="flex-1 rounded bg-emerald-500 py-1.5 text-center text-[10px] font-bold text-white">
          Allow
        </span>
        <span className="flex-1 rounded bg-slate-100 py-1.5 text-center text-[10px] font-bold text-slate-600">
          Deny
        </span>
      </div>
      <p className="text-xs text-slate-500">Maintenance ₹3,500 · due 10 Jun</p>
    </div>
  );
}

function CommitteePreview() {
  return (
    <div className="space-y-3">
      <p className="text-eyebrow text-primary">Committee preview</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase text-slate-400">Collections</span>
        <TrendingUp className="h-4 w-4 text-primary" />
      </div>
      <p className="font-heading text-2xl font-semibold text-slate-900">94.8%</p>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-[94.8%] rounded-full bg-primary" />
      </div>
      <p className="text-xs text-slate-500">Expenses, notices & reports in one view</p>
    </div>
  );
}
