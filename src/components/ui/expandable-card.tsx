"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";

const fast = { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const };
const layoutFast = { layout: { duration: 0.2, ease: [0.32, 0.72, 0, 1] as const } };

export type ExpandableCardItem = {
  id: string;
  title: string;
  /** Shown only in expanded overlay */
  description: string;
  icon: LucideIcon;
  accent: string;
  /** Subtle tinted background + border (matches icon color) */
  subtleBg: string;
  /** Short label for compact UI (e.g. phone dock) */
  shortLabel?: string;
};

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-slate-800"
      aria-hidden
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function useExpandableCard() {
  const [active, setActive] = useState<ExpandableCardItem | null>(null);
  const layoutId = useId();
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActive(null), []);
  useOutsideClick(ref, close);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return { active, setActive, layoutId, ref };
}

export function ExpandableCardOverlay({
  active,
  setActive,
  layoutId,
  ref,
}: {
  active: ExpandableCardItem | null;
  setActive: (item: ExpandableCardItem | null) => void;
  layoutId: string;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fast}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {active ? (
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fast}
              className="pointer-events-auto absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md lg:hidden"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              key={active.id}
              ref={ref}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={fast}
              className="pointer-events-auto h-auto w-max max-w-[min(100vw-2rem,24rem)] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`flex items-center gap-3 bg-gradient-to-br px-4 py-3 ${active.accent}`}>
                <motion.div
                  layoutId={`header-${active.id}-${layoutId}`}
                  transition={layoutFast}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20"
                >
                  <active.icon
                    className="h-5 w-5 text-white"
                    strokeWidth={2}
                    aria-hidden
                  />
                </motion.div>
                <motion.span
                  layoutId={`title-${active.id}-${layoutId}`}
                  transition={layoutFast}
                  className="font-heading text-base font-semibold leading-snug text-white"
                >
                  {active.title}
                </motion.span>
              </div>
              <div className="px-4 py-3">
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={fast}
                  className="text-sm leading-relaxed text-slate-600"
                >
                  {active.description}
                </motion.p>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function ExpandableFeatureCard({
  item,
  layoutId,
  onSelect,
  className,
  style,
  sharedLayout = true,
}: {
  item: ExpandableCardItem;
  layoutId: string;
  onSelect: (item: ExpandableCardItem) => void;
  className?: string;
  style?: CSSProperties;
  sharedLayout?: boolean;
}) {
  const Icon = item.icon;
  const iconClasses = `inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 md:h-10 md:w-10 ${item.accent}`;
  const titleClasses = "font-heading text-[0.8125rem] md:text-[0.9375rem] font-semibold leading-snug text-slate-900";

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item)}
      style={style}
      whileHover={{ y: -5, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={`group relative w-full overflow-hidden md:w-max md:min-w-[12rem] md:max-w-[19.25rem] cursor-pointer rounded-xl border text-left shadow-sm transition-shadow hover:shadow-lg ${item.subtleBg} ${className ?? ""}`}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-orange-400/40 transition-opacity duration-300 group-hover:opacity-100"
      />
      <motion.span
        aria-hidden
        initial={false}
        className="pointer-events-none absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-orange-400 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <div className="relative flex items-center gap-2.5 px-3 py-2.5 md:gap-3 md:px-3.5 md:py-3">
        {sharedLayout ? (
          <motion.div
            layoutId={`header-${item.id}-${layoutId}`}
            transition={layoutFast}
            className={iconClasses}
          >
            <Icon className="h-[18px] w-[18px] text-white" strokeWidth={2} aria-hidden />
          </motion.div>
        ) : (
          <div className={iconClasses}>
            <Icon className="h-[18px] w-[18px] text-white" strokeWidth={2} aria-hidden />
          </div>
        )}
        {sharedLayout ? (
          <motion.span
            layoutId={`title-${item.id}-${layoutId}`}
            transition={layoutFast}
            className={titleClasses}
          >
            {item.title}
          </motion.span>
        ) : (
          <span className={titleClasses}>{item.title}</span>
        )}
      </div>
    </motion.button>
  );
}

export function ExpandableQuickAction({
  item,
  layoutId,
  onSelect,
}: {
  item: ExpandableCardItem;
  layoutId: string;
  onSelect: (item: ExpandableCardItem) => void;
}) {
  const Icon = item.icon;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="group relative flex min-w-0 flex-1 flex-col items-center gap-1 overflow-hidden rounded-xl px-1.5 py-2 transition-colors hover:bg-slate-50"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-2 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-orange-400 to-transparent transition-transform duration-500 group-hover:translate-x-full"
      />
      <motion.div layoutId={`header-${item.id}-${layoutId}`} transition={layoutFast} className="relative">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 sm:h-10 sm:w-10 ${item.accent}`}
        >
          <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" strokeWidth={2} aria-hidden />
        </span>
      </motion.div>
      <span className="truncate text-[8px] font-bold text-slate-600 sm:text-[9px]">
        {item.shortLabel ?? item.title}
      </span>
    </motion.button>
  );
}

/** Map quick-action content to compact dock labels */
export function quickActionToCard(
  action: (typeof import("@/lib/content").appQuickActions)[number]
): ExpandableCardItem {
  const shortLabels: Record<string, string> = {
    marketplace: "Market",
    documents: "Docs",
  };

  return {
    id: `quick-${action.id}`,
    title: action.title,
    description: action.description,
    icon: action.icon,
    accent: action.accent,
    subtleBg: "border-slate-200/90 bg-white",
    shortLabel: shortLabels[action.id] ?? action.label,
  };
}

export function showcaseToCard(feature: {
  slug: string;
  title: string;
  extendedDescription: string;
  icon: LucideIcon;
  accent: string;
  iconBg: string;
}): ExpandableCardItem {
  return {
    id: `feature-${feature.slug}`,
    title: feature.title,
    description: feature.extendedDescription,
    icon: feature.icon,
    accent: feature.accent,
    subtleBg: `${feature.iconBg} ring-1 border-slate-200/60`,
  };
}
