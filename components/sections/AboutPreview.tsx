"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

export default function AboutPreview() {
  const t = useTranslations("home.about");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const facts = [t("fact1"), t("fact2"), t("fact3")];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual */}
          <div className="relative order-2 lg:order-1">
            {/* Main image placeholder */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 to-navy-950 aspect-[4/5] max-w-sm mx-auto lg:mx-0">
              {/* Chemistry background pattern */}
              <div className="absolute inset-0 molecule-bg opacity-30" />

              {/* Placeholder portrait */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-5xl shadow-glow">
                  👩‍🔬
                </div>
                <div className="text-center px-6">
                  <p className="text-white text-lg font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    Sara Mohamed
                  </p>
                  <p className="text-teal-400 text-sm mt-1">
                    {isRTL ? "معلمة كيمياء IGCSE" : "IGCSE Chemistry Educator"}
                  </p>
                </div>
              </div>

              {/* Floating tag: Replace portrait with real image */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-navy rounded-xl px-4 py-3 border border-teal-500/20">
                  <p className="text-teal-400 text-xs font-mono">
                    {isRTL ? "💡 ضع صورتك المهنية هنا" : "💡 Replace with your photo"}
                  </p>
                </div>
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-2 lg:right-8 bg-white rounded-2xl shadow-card-hover border border-navy-100 px-5 py-4">
              <div className="text-3xl font-extrabold text-navy-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                8+
              </div>
              <div className="text-xs text-navy-500 leading-tight mt-0.5">
                {isRTL ? "سنوات في التدريس" : "Years Teaching"}
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="order-1 lg:order-2">
            <SectionBadge className="mb-4">{t("badge")}</SectionBadge>

            <h2
              className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-5 leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("title")}
            </h2>

            <p className="text-navy-600 text-lg leading-relaxed mb-8">{t("body")}</p>

            {/* Facts */}
            <ul className="space-y-3 mb-8">
              {facts.map((fact) => (
                <li key={fact} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-navy-700 font-medium">{fact}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/about`}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-xl hover:bg-navy-800 transition-all duration-200"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
