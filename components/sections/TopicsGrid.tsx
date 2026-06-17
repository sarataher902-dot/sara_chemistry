"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { chemistryTopics } from "@/lib/data";

const difficultyColor = {
  foundation: "text-green-600 bg-green-50",
  intermediate: "text-yellow-700 bg-yellow-50",
  advanced: "text-red-600 bg-red-50",
};

export default function TopicsGrid() {
  const t = useTranslations("home.topics");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="py-20 lg:py-28 bg-section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionBadge className="mb-4">{t("badge")}</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("title")}
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {chemistryTopics.slice(0, 8).map((topic) => (
            <Link
              key={topic.id}
              href={`/${locale}/learn#${topic.slug}`}
              className="group bg-white rounded-2xl border border-navy-100 p-5 hover:border-teal-200 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${topic.bg} flex items-center justify-center text-xl`}
                >
                  {topic.icon}
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${difficultyColor[topic.difficulty as keyof typeof difficultyColor]}`}
                >
                  {topic.difficulty}
                </span>
              </div>

              <h3 className="font-bold text-navy-900 mb-1.5 group-hover:text-teal-600 transition-colors">
                {isRTL ? topic.titleAr : topic.titleEn}
              </h3>
              <p className="text-navy-500 text-sm leading-relaxed line-clamp-2">
                {isRTL ? topic.descAr : topic.descEn}
              </p>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-navy-50">
                <span className="text-xs text-navy-400">
                  {topic.topicsCount} {isRTL ? "موضوعاً" : "topics"}
                </span>
                <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/learn`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy-200 text-navy-700 font-semibold rounded-xl hover:border-teal-400 hover:text-teal-600 transition-all duration-200"
          >
            {isRTL ? "عرض جميع المواضيع" : "View All Topics"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
