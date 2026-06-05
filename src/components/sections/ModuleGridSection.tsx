"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { appQuickActions, appShowcaseFeatures } from "@/lib/content";
import { showcaseScatterBySlug, type ShowcaseScatterSlot } from "@/lib/showcase-scatter";
import {
  ExpandableCardOverlay,
  ExpandableFeatureCard,
  ExpandableQuickAction,
  quickActionToCard,
  showcaseToCard,
  useExpandableCard,
} from "@/components/ui/expandable-card";

function FloatingCloud({
  slot,
  children,
  reduceMotion,
}: {
  slot: Pick<ShowcaseScatterSlot, "floatDelay" | "floatDuration">;
  children: ReactNode;
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      animate={{
        y: [0, -10, -4, 0],
        x: [0, 5, -4, 0],
      }}
      transition={{
        duration: slot.floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: slot.floatDelay,
      }}
    >
      {children}
    </motion.div>
  );
}

function StaticPhoneMock({
  layoutId,
  onQuickSelect,
}: {
  layoutId: string;
  onQuickSelect: ReturnType<typeof useExpandableCard>["setActive"];
}) {
  return (
    <div className="relative mx-auto w-full max-w-[260px] md:max-w-[320px] lg:max-w-[360px]">
      <div className="overflow-hidden rounded-[2.5rem] border-[11px] border-slate-900 bg-slate-900 shadow-xl">
        <div className="bg-gradient-to-b from-slate-50 to-white px-4 pb-28 pt-3">
          <div className="mb-3 flex justify-between text-[10px] font-semibold text-slate-500">
            <span>9:41</span>
            <span className="rounded-full bg-slate-900/5 px-2.5 py-0.5">ReManage</span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-sm font-bold text-white">
              A4
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">Flat 402 - Tower B</p>
              <p className="text-xs text-slate-500">Good evening</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100">
              <p className="text-[10px] font-bold uppercase tracking-wide text-amber-700">Dues</p>
              <p className="font-heading text-lg font-bold text-slate-900">Rs. 3,500</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
              <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">Gate</p>
              <p className="font-heading text-lg font-bold text-slate-900">2 new</p>
            </div>
          </div>

          <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Today
          </p>
          <div className="mt-2 space-y-2">
            <div className="rounded-xl bg-white p-3 text-xs text-slate-600 shadow-sm ring-1 ring-slate-100">
              AGM reminder - Saturday 10 AM
            </div>
            <div className="rounded-xl bg-white p-3 text-xs text-slate-600 shadow-sm ring-1 ring-slate-100">
              Visitor approved - Swiggy delivery
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-2 left-1/2 z-10 w-[calc(100%+2rem)] max-w-[400px] -translate-x-1/2">
        <div className="flex items-stretch justify-between gap-1 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-lg">
          {appQuickActions.map((action) => (
            <ExpandableQuickAction
              key={action.id}
              item={quickActionToCard(action)}
              layoutId={layoutId}
              onSelect={onQuickSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ModuleGridSection() {
  const { active, setActive, layoutId, ref } = useExpandableCard();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="modules"
      className="border-t border-slate-100 bg-background pb-16 pt-8 md:pb-20 md:pt-10"
    >
      <ExpandableCardOverlay
        active={active}
        setActive={setActive}
        layoutId={layoutId}
        ref={ref}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Enterprise technology
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Full-spectrum society management
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            ReManage Society is your resident super-app. Tap any module to read more, or explore
            everything on the features page.
          </p>
          <Link
            href="/features"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Explore all features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ===== MOBILE / SMALL TABLET: stacked phone + grid ===== */}
        <div className="mt-10 md:hidden">
          {/* Phone mockup - readable size */}
          <div className="mx-auto mb-12 w-full max-w-[280px]">
            <StaticPhoneMock layoutId={layoutId} onQuickSelect={setActive} />
          </div>

          {/* Feature cards in a clean 2-col grid */}
          <div className="grid grid-cols-2 gap-3 px-1">
            {appShowcaseFeatures.map((feature, i) => (
              <motion.div
                key={feature.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <ExpandableFeatureCard
                  item={showcaseToCard(feature)}
                  layoutId={layoutId}
                  onSelect={setActive}
                  sharedLayout={false}
                  className="!min-w-0 !max-w-none min-h-[72px] w-full"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ===== DESKTOP / TABLET: scatter layout ===== */}
        <div className="relative mx-auto mt-6 hidden md:block h-[640px] lg:h-[min(720px,82vh)] lg:min-h-[640px] w-full max-w-6xl overflow-visible">
          <div className="absolute inset-0 md:scale-[0.75] lg:scale-100 origin-center">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              aria-hidden
            >
              <div className="h-[520px] w-[min(360px,42vw)] rounded-[2.75rem]" />
            </div>

            <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 scale-[0.75] xl:scale-[0.85]">
              <StaticPhoneMock layoutId={layoutId} onQuickSelect={setActive} />
            </div>

            {appShowcaseFeatures.map((feature) => {
              const slot = showcaseScatterBySlug[feature.slug];
              if (!slot) return null;

              return (
                <div
                  key={feature.slug}
                  className="absolute left-1/2 top-1/2 z-40 w-auto"
                  style={{
                    transform: `translate(calc(-50% + ${slot.x}px), calc(-50% + ${slot.y}px)) rotate(${slot.rotate}deg)`,
                  }}
                >
                  <FloatingCloud slot={slot} reduceMotion={reduceMotion}>
                    <ExpandableFeatureCard
                      item={showcaseToCard(feature)}
                      layoutId={layoutId}
                      onSelect={setActive}
                    />
                  </FloatingCloud>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-8 md:mt-20 text-center text-sm text-slate-500">
          <span className="font-semibold text-slate-800">12+ modules</span> - 4 roles - one app
        </p>
      </div>
    </section>
  );
}
