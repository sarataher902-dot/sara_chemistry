"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, BookOpen, ShoppingBag, Calendar, Atom } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const stats = [
  { keyNum: "stat1", keyLabel: "stat1Label" },
  { keyNum: "stat2", keyLabel: "stat2Label" },
  { keyNum: "stat3", keyLabel: "stat3Label" },
] as const;

// Floating molecule SVG decoration
function MoleculeDecor({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="40" r="18" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <circle cx="40" cy="140" r="18" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <circle cx="160" cy="140" r="18" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <circle cx="100" cy="110" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="100" y1="58" x2="100" y2="98" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="52" y1="130" x2="88" y2="115" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="148" y1="130" x2="112" y2="115" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="40" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="40" cy="140" r="6" fill="currentColor" opacity="0.3" />
      <circle cx="160" cy="140" r="6" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  const localePath = (href: string) => `/${locale}${href}`;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-pattern" />

      {/* Decorative orbs */}
      <div className="orb orb-teal w-96 h-96 -top-32 -right-32" />
      <div className="orb orb-cyan w-64 h-64 bottom-0 left-1/4 opacity-10" />

      {/* Molecule decorations */}
      <MoleculeDecor className="absolute top-20 right-16 w-40 h-40 text-teal-400 opacity-20 hidden lg:block animate-float" />
      <MoleculeDecor className="absolute bottom-24 left-12 w-28 h-28 text-cyan-400 opacity-15 hidden lg:block animate-float" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,184,184,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,184,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-start">
            <div className="flex justify-center lg:justify-start mb-6">
              <SectionBadge variant="white">{t("badge")}</SectionBadge>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("headline")}
            </h1>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 gradient-text"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("subheadline")}
            </h1>

            <p className="text-lg text-navy-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {t("description")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                href={localePath("/learn")}
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 shadow-glow hover:shadow-glow-lg transition-all duration-300"
              >
                <BookOpen className="w-4 h-4" />
                {t("cta1")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href={localePath("/resources")}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 backdrop-blur-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                {t("cta2")}
              </Link>
              <Link
                href={localePath("/contact")}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-teal-400 font-semibold rounded-xl border border-teal-500/50 hover:border-teal-400 hover:bg-teal-500/10 transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                {t("cta3")}
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 justify-center lg:justify-start mt-10 pt-8 border-t border-white/10">
              {stats.map(({ keyNum, keyLabel }) => (
                <div key={keyNum} className="text-center lg:text-start">
                  <div
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t(keyNum)}
                  </div>
                  <div className="text-xs text-navy-400 mt-0.5">{t(keyLabel)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Chemistry visual card */}
          <div className="hidden lg:flex justify-end">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="glass-navy rounded-3xl p-8 border border-teal-500/20 shadow-glow-lg">
                {/* Periodic table mini */}
                <div className="mb-6">
                  <p className="text-navy-300 text-xs uppercase tracking-widest mb-3">
                    {locale === "ar" ? "بعض العناصر الأساسية" : "Selected Elements"}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { symbol: "H", name: "Hydrogen", num: 1, color: "from-sky-400 to-blue-500" },
                      { symbol: "C", name: "Carbon", num: 6, color: "from-gray-400 to-gray-600" },
                      { symbol: "O", name: "Oxygen", num: 8, color: "from-red-400 to-red-600" },
                      { symbol: "N", name: "Nitrogen", num: 7, color: "from-violet-400 to-purple-600" },
                      { symbol: "Na", name: "Sodium", num: 11, color: "from-yellow-400 to-orange-500" },
                      { symbol: "Cl", name: "Chlorine", num: 17, color: "from-green-400 to-emerald-600" },
                      { symbol: "Fe", name: "Iron", num: 26, color: "from-orange-400 to-red-500" },
                      { symbol: "Ca", name: "Calcium", num: 20, color: "from-teal-400 to-cyan-600" },
                    ].map((el) => (
                      <div
                        key={el.symbol}
                        className={`bg-gradient-to-br ${el.color} rounded-xl p-2.5 text-center group hover:scale-105 transition-transform cursor-default`}
                      >
                        <div className="text-white/60 text-[9px] font-mono leading-none">{el.num}</div>
                        <div className="text-white text-xl font-bold leading-none my-0.5">{el.symbol}</div>
                        <div className="text-white/70 text-[8px] leading-none truncate">{el.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="section-sep my-4" />

                {/* Quick links */}
                <div className="space-y-2">
                  {[
                    { icon: "⚛️", labelEn: "Atomic Structure", labelAr: "البنية الذرية", href: "/learn" },
                    { icon: "🧪", labelEn: "Acids & Bases", labelAr: "الأحماض والقواعد", href: "/learn" },
                    { icon: "⚗️", labelEn: "Organic Chemistry", labelAr: "الكيمياء العضوية", href: "/learn" },
                  ].map((item) => (
                    <Link
                      key={item.href + item.labelEn}
                      href={localePath(item.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-navy-200 group-hover:text-white transition-colors">
                        {locale === "ar" ? item.labelAr : item.labelEn}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-teal-400 ms-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Floating atom icon */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-glow animate-float">
                <Atom className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 80L48 74.7C96 69.3 192 58.7 288 53.3C384 48 480 48 576 56C672 64 768 80 864 80C960 80 1056 64 1152 56C1248 48 1344 48 1392 48L1440 48V80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
