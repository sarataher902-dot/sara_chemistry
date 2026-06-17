"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Download, Lock, Star, ArrowRight } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { resources } from "@/lib/data";

export default function FeaturedResources() {
  const t = useTranslations("home.resources");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const featured = resources.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionBadge variant="white" className="mb-4">{t("badge")}</SectionBadge>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("title")}
            </h2>
            <p className="text-navy-300 mt-2 max-w-xl">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/resources`}
            className="group inline-flex items-center gap-2 text-teal-400 font-semibold hover:text-teal-300 transition-colors whitespace-nowrap"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((resource) => (
            <div
              key={resource.id}
              className="group bg-navy-800/50 border border-navy-700 hover:border-teal-500/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Icon and Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{resource.icon}</div>
                <div className="flex flex-col items-end gap-1.5">
                  {resource.premium ? (
                    <span className="text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-navy-900 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      {t("premium")}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-teal-400 text-navy-900 px-2 py-0.5 rounded-full">
                      {t("free")}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-white font-semibold leading-snug mb-2 text-sm line-clamp-2 group-hover:text-teal-300 transition-colors">
                {isRTL ? resource.titleAr : resource.titleEn}
              </h3>
              <p className="text-navy-400 text-xs leading-relaxed line-clamp-3 mb-4">
                {isRTL ? resource.descAr : resource.descEn}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-navy-500 mb-4">
                <span>{resource.pages}p</span>
                <span>·</span>
                <span>{resource.format}</span>
                {!resource.premium && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {resource.rating}
                    </span>
                  </>
                )}
              </div>

              {/* Action */}
              {resource.premium ? (
                <Link
                  href={`/${locale}/resources`}
                  className="flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-navy-900 text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Lock className="w-3 h-3" />
                  {t("preview")}
                </Link>
              ) : (
                <Link
                  href={`/${locale}/resources`}
                  className="flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-teal-500/20 border border-teal-500/30 text-teal-400 text-xs font-bold rounded-xl hover:bg-teal-500/30 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  {t("download")}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
