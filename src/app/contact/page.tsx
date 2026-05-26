"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  User,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Pulsing location-map SVG ─── */
function MapSVG() {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto" aria-hidden="true">
      {/* Map background tiles */}
      <rect width="400" height="320" rx="20" className="fill-slate-50 dark:fill-slate-900/60" />
      {/* Road grid */}
      <line x1="0" y1="160" x2="400" y2="160" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="12" />
      <line x1="200" y1="0" x2="200" y2="320" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="12" />
      <line x1="0" y1="80" x2="400" y2="80" className="stroke-slate-100 dark:stroke-slate-850" strokeWidth="6" />
      <line x1="0" y1="240" x2="400" y2="240" className="stroke-slate-100 dark:stroke-slate-850" strokeWidth="6" />
      <line x1="100" y1="0" x2="100" y2="320" className="stroke-slate-100 dark:stroke-slate-850" strokeWidth="6" />
      <line x1="300" y1="0" x2="300" y2="320" className="stroke-slate-100 dark:stroke-slate-850" strokeWidth="6" />
      {/* Building blocks */}
      {[
        { x: 20, y: 20, w: 60, h: 45 },
        { x: 120, y: 20, w: 55, h: 45 },
        { x: 220, y: 20, w: 60, h: 45 },
        { x: 320, y: 20, w: 60, h: 45 },
        { x: 20, y: 100, w: 60, h: 45 },
        { x: 120, y: 100, w: 55, h: 45 },
        { x: 220, y: 100, w: 60, h: 45 },
        { x: 320, y: 100, w: 60, h: 45 },
        { x: 20, y: 180, w: 60, h: 45 },
        { x: 120, y: 180, w: 55, h: 45 },
        { x: 320, y: 180, w: 60, h: 45 },
        { x: 20, y: 260, w: 60, h: 45 },
        { x: 120, y: 260, w: 55, h: 45 },
        { x: 220, y: 260, w: 60, h: 45 },
        { x: 320, y: 260, w: 60, h: 45 },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="6" className="fill-blue-50/50 dark:fill-blue-950/20" />
      ))}
      {/* Office highlight */}
      <rect x="215" y="175" width="70" height="55" rx="8" fill="var(--color-primary)" fillOpacity="0.1" stroke="var(--color-primary)" strokeWidth="2" />
      {/* Pin outer pulse rings */}
      {[35, 50, 65].map((r, i) => (
        <motion.circle
          key={r}
          cx="250" cy="202" r={r}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1.5"
          initial={{ scale: 0.7, opacity: 0.7 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ delay: i * 0.4, duration: 1.8, repeat: Infinity, repeatType: "loop" }}
        />
      ))}
      {/* Pin base */}
      <motion.circle
        cx="250" cy="202" r="14"
        fill="var(--color-primary)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
      />
      <motion.circle
        cx="250" cy="202" r="6"
        fill="white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
      />
      {/* Label */}
      <rect x="180" y="232" width="140" height="26" rx="6" className="fill-white dark:fill-slate-900 stroke-slate-200/50 dark:stroke-slate-800/50" strokeWidth="1" />
      <text x="250" y="248" textAnchor="middle" fontSize="10" fontWeight="750" className="fill-blue-600 dark:fill-blue-400 font-display">Society Connect HQ</text>
    </svg>
  );
}

/* ─── Animated checkmark SVG ─── */
function SuccessAnimation() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="flex flex-col items-center gap-6 py-12"
    >
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 100 100" className="w-20 h-20" aria-hidden="true">
          <motion.circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="var(--color-success)"
            strokeWidth="4.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.path
            d="M28 50 L43 65 L72 36"
            fill="none"
            stroke="var(--color-success)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </svg>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Message Sent!</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto text-sm leading-relaxed">
          Our onboarding team will reach out within 24 hours to schedule a custom walkthrough.
        </p>
      </div>
    </motion.div>
  );
}

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  societyName?: string;
  flatCount?: string;
  message?: string;
};

const flatCountOptions = ["1–50", "51–100", "101–250", "251–500", "500+"];
const reasonOptions = [
  "Demo Request",
  "Pricing Inquiry",
  "Technical Support",
  "Partnership",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    societyName: "",
    flatCount: "",
    reason: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (data: typeof form): FormErrors => {
    const e: FormErrors = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email address";
    if (data.phone && !data.phone.match(/^[6-9]\d{9}$/)) e.phone = "Enter a valid 10-digit Indian number";
    if (!data.societyName.trim()) e.societyName = "Society name is required";
    if (!data.flatCount) e.flatCount = "Flat count is required";
    if (!data.message.trim() || data.message.trim().length < 20) e.message = "Write at least 20 characters";
    return e;
  };

  const handleChange = (field: string, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const fieldClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white transition-all duration-200 outline-none focus:ring-2 ${
      errors[field] && touched[field]
        ? "border-red-405 focus:ring-red-300/30 dark:focus:ring-red-900/30"
        : "border-slate-200 dark:border-slate-800 focus:ring-blue-300/30 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-500"
    }`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-dark-bg text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
        
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-100 dark:border-slate-800/40">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          
          <div className="relative max-w-3xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30 mb-6"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 leading-[1.1] mb-6"
            >
              We&apos;d love to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-500">
                hear from you
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed"
            >
              Schedule a demo, ask about pricing, or request a sandbox trial. We respond within 24 hours.
            </motion.p>
          </div>
        </section>

        {/* ── Main content ── */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* ── Left: Info + Map ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Contact Details</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Find us at our headquarters or reach out digitally.</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
                    label: "Address",
                    value: "4th Floor, Nexus Tower, Baner–Pashan Link Road, Baner, Pune, Maharashtra 411 045",
                  },
                  {
                    icon: <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
                    label: "Phone",
                    value: "+91 98765 43210",
                    href: "tel:+919876543210",
                  },
                  {
                    icon: <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
                    label: "Email",
                    value: "hello@MySocietyHub.in",
                    href: "mailto:hello@MySocietyHub.in",
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
                    label: "Business Hours",
                    value: "Mon–Sat, 9:00 AM – 7:00 PM IST",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-4 p-4 rounded-2xl bg-slate-50/40 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-850/40 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100/50 dark:border-blue-900/30 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-slate-900 dark:text-white font-medium hover:text-blue-650 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-slate-900 dark:text-white font-medium">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map SVG */}
              <div className="rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/40 shadow-sm p-2 bg-slate-50/20 dark:bg-slate-900/10">
                <MapSVG />
              </div>

              {/* Support channels */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Sales Inquiry", email: "sales@MySocietyHub.in", icon: "💼" },
                  { label: "Technical Support", email: "support@MySocietyHub.in", icon: "🔧" },
                  { label: "Partnership", email: "partners@MySocietyHub.in", icon: "🤝" },
                  { label: "Press & Media", email: "press@MySocietyHub.in", icon: "📰" },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="p-5 rounded-2xl bg-slate-50/40 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-850/40 hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-200"
                  >
                    <div className="text-xl mb-3">{c.icon}</div>
                    <div className="font-bold text-sm mb-1.5 text-slate-900 dark:text-white">{c.label}</div>
                    <a href={`mailto:${c.email}`} className="text-blue-605 dark:text-blue-400 text-xs hover:underline">{c.email}</a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-slate-50/20 dark:bg-slate-900/25 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm p-8 md:p-10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/10 to-transparent dark:from-slate-800/5 dark:to-transparent pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <SuccessAnimation />
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="space-y-1">
                        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                          Request a Demo
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Fill in the details and we&apos;ll set up a personalized sandbox.</p>
                      </div>

                      {/* Name & Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-450">
                            <User className="inline w-3 h-3 mr-1 mb-0.5" />Full Name *
                          </label>
                          <input
                            type="text"
                            placeholder="Arjun Mehta"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            onBlur={() => handleBlur("name")}
                            className={fieldClass("name")}
                          />
                          <AnimatePresence>
                            {errors.name && touched.name && (
                              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5">{errors.name}</motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-450">
                            <Mail className="inline w-3 h-3 mr-1 mb-0.5" />Email Address *
                          </label>
                          <input
                            type="email"
                            placeholder="arjun@example.com"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            onBlur={() => handleBlur("email")}
                            className={fieldClass("email")}
                          />
                          <AnimatePresence>
                            {errors.email && touched.email && (
                              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5">{errors.email}</motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-450">
                          <Phone className="inline w-3 h-3 mr-1 mb-0.5" />Mobile Number
                        </label>
                        <div className="flex">
                          <span className="flex items-center px-3 py-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-800 rounded-l-xl text-slate-450 text-sm font-semibold">+91</span>
                          <input
                            type="tel"
                            placeholder="98765 43210"
                            maxLength={10}
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ""))}
                            onBlur={() => handleBlur("phone")}
                            className={`${fieldClass("phone")} rounded-l-none`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.phone && touched.phone && (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5">{errors.phone}</motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Society name & flat count */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-450">
                            <Building2 className="inline w-3 h-3 mr-1 mb-0.5" />Society Name *
                          </label>
                          <input
                            type="text"
                            placeholder="Green Valley CHS"
                            value={form.societyName}
                            onChange={(e) => handleChange("societyName", e.target.value)}
                            onBlur={() => handleBlur("societyName")}
                            className={fieldClass("societyName")}
                          />
                          <AnimatePresence>
                            {errors.societyName && touched.societyName && (
                              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5">{errors.societyName}</motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-450">
                            No. of Flats *
                          </label>
                          <div className="relative">
                            <select
                              value={form.flatCount}
                              onChange={(e) => handleChange("flatCount", e.target.value)}
                              onBlur={() => handleBlur("flatCount")}
                              className={`${fieldClass("flatCount")} appearance-none pr-10`}
                            >
                              <option value="">Select range</option>
                              {flatCountOptions.map((o) => (
                                <option key={o} value={o}>{o} flats</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                          <AnimatePresence>
                            {errors.flatCount && touched.flatCount && (
                              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1.5">{errors.flatCount}</motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">Reason for Contact</label>
                        <div className="flex flex-wrap gap-2">
                          {reasonOptions.map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => handleChange("reason", r)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-150 ${
                                form.reason === r
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-650"
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-450">
                          Your Message *
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your society, current pain points, and what you'd like to achieve with Society Connect…"
                          value={form.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          onBlur={() => handleBlur("message")}
                          className={`${fieldClass("message")} resize-none`}
                        />
                        <div className="flex justify-between items-center mt-1.5">
                          <AnimatePresence>
                            {errors.message && touched.message && (
                              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs">{errors.message}</motion.p>
                            )}
                          </AnimatePresence>
                          <span className={`text-[10px] font-semibold ml-auto ${form.message.length < 20 ? "text-slate-400" : "text-emerald-500"}`}>
                            {form.message.length}/20 min
                          </span>
                        </div>
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.015 }}
                        whileTap={{ scale: submitting ? 1 : 0.985 }}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-bold text-base transition-colors duration-200 shadow-md shadow-blue-650/20"
                      >
                        {submitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </motion.button>

                      <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
                        We respect your privacy. Your information is never shared with third parties.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ strip ── */}
        <section className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/10 border-t border-slate-100 dark:border-slate-800/40 relative">
          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 space-y-4"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-md">
                Common Questions
              </span>
              <h2 className="text-3xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </motion.div>
            
            <div className="space-y-4">
              {[
                {
                  q: "How long does onboarding take?",
                  a: "Most societies are fully onboarded and live within 48 hours. Our dedicated operations team handles historical member imports, unit mappings, and guard terminal training for your society.",
                },
                {
                  q: "Is there a free trial option?",
                  a: "Yes! We offer a 30-day sandbox trial of the Premium Plan for committee members to evaluate. No credit card required to start.",
                },
                {
                  q: "Can we transition plans or cancel later?",
                  a: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time. Prorated ledger calculations are automatically computed on your next invoice.",
                },
                {
                  q: "Do you support multi-tower estates?",
                  a: "Yes, Society Connect natively supports multi-tower, multi-gate, and wing layout topologies, allowing you to configure customized local rules for specific entry points.",
                },
              ].map((faq) => <FAQItem key={faq.q} {...faq} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl overflow-hidden backdrop-blur-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4.5 text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50/50 dark:hover:bg-slate-850/30 transition-colors duration-150"
      >
        <span>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/40 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
