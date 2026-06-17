"use client";

import { useTranslations, useLocale } from "next-intl";
import { Star, Quote } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="py-20 lg:py-28 bg-section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionBadge className="mb-4">{t("badge")}</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-navy-900"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-navy-100 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 relative"
            >
              <Quote className="w-8 h-8 text-teal-100 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-navy-600 text-sm leading-relaxed mb-5 italic">
                "{isRTL ? item.textAr : item.textEn}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-navy-50">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-navy-600 flex items-center justify-center text-white text-sm font-bold">
                  {(isRTL ? item.nameAr : item.nameEn).charAt(0)}
                </div>
                <div>
                  <p className="text-navy-900 font-semibold text-sm">
                    {isRTL ? item.nameAr : item.nameEn}
                  </p>
                  <p className="text-navy-400 text-xs">
                    {isRTL ? item.roleAr : item.roleEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
