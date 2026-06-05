"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, CircleDollarSign, KeyRound, MessageSquareText, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const outcomes = [
  { icon: KeyRound, label: "Fewer gate calls" },
  { icon: CircleDollarSign, label: "Clearer collections" },
  { icon: MessageSquareText, label: "Trackable requests" },
];

const proofPoints = [
  { value: "12+", label: "operational modules" },
  { value: "4", label: "role-based workspaces" },
  { value: "10+ yrs", label: "society legal expertise" },
];

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-6 sm:px-6 sm:pb-16 sm:pt-12 lg:px-10 lg:pb-20 lg:pt-14">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-orange-700 sm:text-[11px] sm:tracking-[0.16em]">
            <Sparkles className="h-3.5 w-3.5" />
            Society operations that do the busywork
          </p>
          <h1 className="mx-auto mt-4 max-w-5xl font-heading text-[1.92rem] font-semibold leading-[1.03] tracking-[-0.026em] text-slate-950 sm:mt-5 sm:text-[clamp(2.5rem,6.4vw,5.9rem)] sm:leading-[0.98] sm:tracking-[-0.045em]">
            <span className="sm:hidden">Run society workflows from one place</span>
            <span className="hidden sm:inline">Run every society workflow from one place</span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-normal text-slate-600 sm:mt-6 sm:text-xl sm:leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="mt-4 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
            <Button asChild size="lg" className="bg-orange-600 px-8 shadow-lg shadow-orange-600/20 hover:bg-orange-700"><Link href="/contact">Get started <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline" className="hidden border-slate-300 bg-white px-8 shadow-sm sm:inline-flex"><Link href="/features">See the platform</Link></Button>
          </div>

          {/* Starting price anchor */}
          <p className="mt-2 text-sm text-slate-500 sm:mt-4">
            Plans start at{" "}
            <Link href="/pricing" className="font-semibold text-orange-600 underline-offset-4 hover:underline">
              Rs. 10/flat/month
            </Link>
          </p>

          {/* Legal expertise badge — strongest differentiator surfaced above fold */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-3 flex justify-center sm:mt-6"
          >
            <a
              href="https://societyrights.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-orange-200 bg-orange-50/60 px-3 py-2 transition-colors hover:border-orange-300 hover:bg-orange-50 sm:px-4"
            >
              <Scale className="h-4 w-4 text-orange-600" />
              <span className="text-xs font-semibold text-slate-700">
                Backed by <span className="text-orange-600">SocietyRights</span>
                <span className="hidden sm:inline"> - 10+ years legal expertise for housing societies</span>
              </span>
            </a>
          </motion.div>

          <div className="mx-auto mt-3 grid max-w-3xl grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-left shadow-sm sm:mt-6">
            {proofPoints.map((point) => (
              <motion.div
                key={point.label}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                className="group relative overflow-hidden border-r border-slate-200 px-2.5 py-2.5 last:border-r-0 sm:px-5 sm:py-4"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-orange-400 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <p className="font-heading text-base font-semibold leading-none text-slate-950 transition-colors duration-300 group-hover:text-orange-600 sm:text-2xl">{point.value}</p>
                <p className="mt-1 text-[10px] font-medium leading-snug text-slate-500 sm:text-xs">{point.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-5 grid gap-3 sm:mt-9 md:grid-cols-[1.08fr_0.92fr] lg:mt-10">
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="relative min-h-[168px] overflow-hidden rounded-xl bg-slate-950 sm:min-h-[340px] md:min-h-[400px]">
            <Image src="/images/hero-bg.jpg" alt="Residential community managed with ReManage Society" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <motion.div
              whileHover={{ y: -4, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="group absolute right-4 top-4 hidden w-[220px] overflow-hidden rounded-xl border border-white/20 bg-white/92 p-4 text-slate-900 shadow-2xl shadow-slate-950/30 backdrop-blur sm:block"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-orange-400 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-600">Live ops</p>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">On track</span>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-medium text-slate-500">Visitors</span>
                  <span className="font-heading text-lg font-semibold">18</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-medium text-slate-500">Collections</span>
                  <span className="font-heading text-lg font-semibold">82%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Open tickets</span>
                  <span className="font-heading text-lg font-semibold">06</span>
                </div>
              </div>
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-orange-300 sm:text-[10px] sm:tracking-[0.18em]">Built for community operations</p>
              <p className="mt-2 max-w-lg font-heading text-xl font-semibold leading-tight tracking-[-0.02em] sm:mt-3 sm:text-4xl">
                <span className="sm:hidden">One dependable record for society work.</span>
                <span className="hidden sm:inline">One dependable record for the work that keeps a society running.</span>
              </p>
            </div>
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="hidden min-h-[300px] flex-col justify-between rounded-xl bg-orange-600 p-6 text-white md:flex md:min-h-[400px] md:p-8">
            <div className="flex items-center justify-between"><ShieldCheck className="h-7 w-7" /><span className="rounded-full border border-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Committee-first</span></div>
            <div>
              <p className="max-w-xl font-heading text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl">Less time coordinating. More time improving the community.</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                {outcomes.map(({ icon: Icon, label }) => (
                  <motion.li
                    key={label}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    className="group border-t border-white/30 pt-3 text-xs font-semibold"
                  >
                    <Icon className="mb-3 h-4 w-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                    {label}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        <div className="mt-5 hidden flex-wrap justify-center gap-x-6 gap-y-2 sm:flex">
          {["Guided onboarding", "Role-based access", "Exportable records"].map(item => <span key={item} className="flex items-center gap-1.5 text-xs font-medium text-slate-500"><Check className="h-3.5 w-3.5 text-orange-600" />{item}</span>)}
        </div>
      </div>
    </section>
  );
}
