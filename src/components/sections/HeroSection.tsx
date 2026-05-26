"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroTrustCard } from "@/components/sections/HeroTrustCard";
import { trustPillars } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[min(88vh,840px)] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.06, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-slate-900/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(37,99,235,0.12),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background/90 via-background/40 to-transparent backdrop-blur-[4px] sm:h-32"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-16 lg:px-10 xl:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-3xl space-y-6"
        >
          <div className="space-y-4">
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55 }}
              className="text-hero text-white"
            >
              STREAMLINE SOCIETY OPERATIONS FROM ENTRY TO ACCOUNTING
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="text-lead max-w-xl text-slate-200"
            >
              {siteConfig.description}
            </motion.p>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-slate-900 shadow-lg shadow-black/20 hover:bg-slate-100"
            >
              <Link href="/contact">
                Book a demo
                <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/50 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              <a href={siteConfig.links.login}>
                <LogIn />
                Sign in
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5 lg:mt-16">
          {trustPillars.map((item, index) => (
            <HeroTrustCard
              key={item.label}
              icon={item.icon}
              label={item.label}
              description={item.description}
              theme={item.theme}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
