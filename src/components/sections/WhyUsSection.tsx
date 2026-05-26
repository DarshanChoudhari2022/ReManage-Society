"use client";

import { motion } from "framer-motion";
import { CreditCard, Layers, Smartphone, Users } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SectionHeading } from "@/components/sections/SectionHeading";

const items = [
  {
    icon: Smartphone,
    title: "Mobile & web together",
    description: "Residents, committee, and guards on the surfaces they already use.",
  },
  {
    icon: CreditCard,
    title: "India-first billing",
    description: "UPI-friendly maintenance flows with treasurer-visible collections.",
  },
  {
    icon: Users,
    title: "Occupancy-aware roles",
    description: "Owners, tenants, and committee permissions stay distinct.",
  },
  {
    icon: Layers,
    title: "Modular by design",
    description: "Enable visitors, billing, notices, and community as you grow.",
  },
];

export function WhyUsSection() {
  return (
    <section className="bg-background pb-10 pt-6 md:pb-12 md:pt-8">
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-10 xl:px-12">
        <SectionHeading
          badge="Why MySocietyHub"
          title="Purpose-built for Indian gated communities"
          description="Not a generic property CRM — a governed stack for security, finance, and community operations."
        />
        <div className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative bg-white"
            >
              <div className="relative h-full w-full">
                <GlowingEffect
                  blur={1}
                  borderWidth={3}
                  spread={90}
                  glow
                  disabled={false}
                  proximity={72}
                  inactiveZone={0.01}
                  movementDuration={0.2}
                />
                <div className="relative overflow-hidden bg-white p-5">
                  <item.icon
                    className="pointer-events-none absolute -bottom-2 -right-2 h-20 w-20 text-primary/[0.07]"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <h3 className="relative font-heading text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="relative mt-2 text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
