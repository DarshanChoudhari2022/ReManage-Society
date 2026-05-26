"use client";

import { motion } from "framer-motion";
import { Download, Play, Smartphone, Tablet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const highlights = [
  { icon: Smartphone, text: "Visitor approvals and maintenance on mobile" },
  { icon: Tablet, text: "Tablet-friendly guard gate console" },
  { icon: Download, text: "Capacitor-ready society deployments" },
];

export function MobileApkSection() {
  return (
    <section id="mobile" className="bg-background py-10 md:py-12">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="text-eyebrow text-primary">Mobile app</p>
          <h2 className="font-heading text-2xl font-semibold text-slate-900 sm:text-3xl">
            Install MySocietyHub on Android today
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Push-friendly approvals, dues, and notices for residents and committee members. Google
            Play is on the roadmap — install the APK directly for pilot societies.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map((item) => (
              <li key={item.text} className="flex items-start gap-2 text-sm text-slate-700">
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                {item.text}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button asChild variant="accent">
              <a href={siteConfig.links.apk}>
                <Download />
                Download APK
              </a>
            </Button>
            <Badge variant="secondary" className="normal-case">
              Google Play — coming soon
            </Badge>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-slate-50 p-6"
        >
          <svg
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 text-sky-200/80"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <div className="relative grid grid-cols-2 gap-3">
            <div className="col-span-2 flex items-center gap-3 border border-slate-200 bg-white p-4">
              <div className="flex h-12 w-12 items-center justify-center bg-orange-500 text-white">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-slate-900">Direct APK</p>
                <p className="text-xs text-slate-500">Available for Android installs</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-300 bg-white p-4 text-center">
              <Play className="h-6 w-6 text-slate-300" />
              <p className="mt-2 text-xs font-semibold text-slate-500">Play Store</p>
              <p className="text-[10px] text-slate-400">Coming soon</p>
            </div>
            <div className="flex flex-col items-center justify-center border border-slate-200 bg-primary p-4 text-center text-white">
              <Smartphone className="h-6 w-6" />
              <p className="mt-2 text-xs font-bold">Live demo</p>
              <p className="text-[10px] text-blue-100">Pilot ready</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
