"use client";

import Link from "next/link";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";

const testimonials = [
  {
    quote:
      "Moving from manual ledgers to MySocietyHub simplified collections. Residents pay via UPI and treasurers see status without chasing every flat.",
    name: "Rajesh K. Mehta",
    role: "Treasurer",
    place: "Royal Heights · Pune",
  },
  {
    quote:
      "Visitor approvals stopped being phone calls at the gate. Owners get notified instantly — secure and transparent for everyone.",
    name: "Vikas Deshmukh",
    role: "RWA Chairman",
    place: "Green Meadows · Mumbai",
  },
  {
    quote:
      "We piloted billing and notices together — the committee finally has one place to check collections and circulars.",
    name: "Priya Nair",
    role: "Secretary",
    place: "Lakeview Towers · Bengaluru",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-background pb-10 pt-6 md:pb-12 md:pt-8">
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-10 xl:px-12">
        <SectionHeading
          badge="Client voices"
          title="What committee members say"
          description="Demo testimonials for layout — replace with verified society feedback at launch."
          action={{ label: "Contact sales", href: "/contact" }}
        />
        <div className="grid gap-3 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-col border border-slate-200 bg-slate-50/80 p-5"
            >
              <Quote className="h-8 w-8 text-sky-200" aria-hidden />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-4 border-t border-slate-200 pt-3">
                <p className="font-heading text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">
                  {item.role} · {item.place}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500">
          Want to be a pilot society?{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            Talk to our team
          </Link>
        </p>
      </div>
    </section>
  );
}
