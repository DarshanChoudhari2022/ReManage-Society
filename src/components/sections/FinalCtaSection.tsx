"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function FinalCtaSection() {
  return (
    <section
      className="py-12 md:py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #ff7820 0%, #ffa35c 40%, #06b6d4 85%, #0ea5e9 100%)"
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        >
          <div className="max-w-xl space-y-2">
            <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
              Ready to simplify society operations?
            </h2>
            <p className="text-sm leading-relaxed text-white/90 sm:text-base">
              Book a walkthrough for your committee or download the resident app. Plans start at just Rs. 10/flat/month.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[320px]">
            <motion.div
              whileHover={{ y: -3, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="group relative overflow-hidden rounded-full"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-4 top-0 z-10 h-px -translate-x-full bg-gradient-to-r from-transparent via-orange-400 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <Button asChild size="lg" variant="secondary" className="w-full justify-center transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-slate-950/15">
                <Link href="/contact">
                  Book a demo
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ y: -3, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="group relative overflow-hidden rounded-full"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-4 top-0 z-10 h-px -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="w-full justify-center border border-white/25 text-white transition-shadow duration-300 hover:bg-white/10 hover:text-white group-hover:shadow-lg group-hover:shadow-slate-950/10"
              >
                <a href={siteConfig.links.apk}>
                  <Download className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                  Download resident app
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
