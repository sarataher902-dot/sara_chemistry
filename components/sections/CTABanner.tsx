"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTABanner() {
  const t = useTranslations("home.cta");
  const locale = useLocale();

  return (
    <section className="py-20 lg:py-24 bg-navy-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      <div className="orb orb-teal w-80 h-80 -top-20 left-1/4 opacity-10" />
      <div className="orb orb-cyan w-64 h-64 bottom-0 right-1/4 opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5 mb-6">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span className="text-teal-400 text-sm font-medium">
            {locale === "ar" ? "ابدأ رحلتك اليوم" : "Start Your Journey Today"}
          </span>
        </div>

        <h2
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {t("title")}
        </h2>

        <p className="text-navy-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-400 hover:to-teal-500 shadow-glow hover:shadow-glow-lg transition-all duration-300 text-base"
          >
            {t("primary")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={`/${locale}/resources`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 text-base backdrop-blur-sm"
          >
            {t("secondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
