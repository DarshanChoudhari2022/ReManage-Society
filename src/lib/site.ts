const appBase = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

/** Marketing site fallbacks when dashboard URL is not configured */
const fallbackAppPath = "/contact";

export const siteConfig = {
  name: "MySocietyHub",
  legalName: "Society Connect",
  tagline: "Smart society management for residents and committees",
  description:
    "Approve visitors, pay maintenance, and keep notices, complaints, and records in one secure place — without gate calls or scattered group chats.",
  contact: {
    email: "demo@MySocietyHub.co",
    phone: "+91 98765 43210",
    whatsapp: "https://wa.me/911800181800",
    whatsappDisplay: "+91-1800181800",
    call: "tel:+911800181800",
  },
  links: {
    app: appBase ?? fallbackAppPath,
    apk: process.env.NEXT_PUBLIC_APK_URL ?? "#download-apk",
    login: appBase ? `${appBase}/login` : fallbackAppPath,
    register: appBase ? `${appBase}/register` : fallbackAppPath,
    gate: appBase ? `${appBase}/gate` : fallbackAppPath,
  },
} as const;
