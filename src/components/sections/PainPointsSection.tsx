"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { painPoints } from "@/lib/content";

function PainPointCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-orange-500/10 sm:p-5"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-primary/25 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <Icon className="relative h-4 w-4 text-primary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" strokeWidth={2} aria-hidden />
      <h3 className="mt-3 font-heading text-sm font-semibold leading-snug text-slate-900">
        {title}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{description}</p>
    </motion.article>
  );
}

export function PainPointsSection() {
  return (
    <section className="border-t border-slate-100 bg-background py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
        >
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              The challenge
            </p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.65rem]">
              Less chaos at the gate and in the group chat
            </h2>
            <p className="text-sm leading-relaxed text-slate-500">
              Replace scattered calls, WhatsApp threads, and spreadsheets with one governed
              workflow for your society.
            </p>
          </div>

          <Link
            href="#platform"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-[border-color,background-color,color,box-shadow,gap] duration-200 hover:border-primary/30 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20 hover:gap-2.5"
          >
            See how it works
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </motion.header>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
          {painPoints.map((point, index) => (
            <PainPointCard
              key={point.title}
              icon={point.icon}
              title={point.title}
              description={point.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
