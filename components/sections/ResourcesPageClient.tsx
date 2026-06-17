"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Download, Lock, Star, Filter, Search, FileText } from "lucide-react";
import { resources } from "@/lib/data";
import { cn } from "@/lib/utils";

const typeFilters = ["all", "free", "premium", "notes", "worksheets", "practice", "revision"] as const;

export default function ResourcesPageClient() {
  const t = useTranslations("resources");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchSearch =
        search === "" ||
        r.titleEn.toLowerCase().includes(search.toLowerCase()) ||
        r.titleAr.includes(search);

      const matchFilter =
        activeFilter === "all" ||
        (activeFilter === "free" && !r.premium) ||
        (activeFilter === "premium" && r.premium) ||
        r.type === activeFilter;

      return matchSearch && matchFilter;
    });
  }, [activeFilter, search]);

  return (
    <>
      {/* Filters bar */}
      <section className="py-8 bg-white border-b border-navy-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isRTL ? "ابحث في الموارد..." : "Search resources..."}
                className="w-full ps-10 pe-4 py-2.5 text-sm rounded-xl border border-navy-200 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <Filter className="w-4 h-4 text-navy-400 flex-shrink-0" />
              {typeFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "flex-shrink-0 px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all",
                    activeFilter === f
                      ? "bg-teal-500 text-white border-teal-500"
                      : "bg-white text-navy-600 border-navy-200 hover:border-teal-300"
                  )}
                >
                  {t(`filters.${f}` as "filters.all")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources grid */}
      <section className="py-16 lg:py-20 bg-section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Count */}
          <p className="text-sm text-navy-400 mb-6">
            {filtered.length} {isRTL ? "مورد" : "resources"}{" "}
            {activeFilter !== "all" && `· ${t(`filters.${activeFilter}` as "filters.all")}`}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <FileText className="w-12 h-12 text-navy-200 mx-auto mb-4" />
              <p className="text-navy-400">{t("subtitle")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((resource) => (
                <div
                  key={resource.id}
                  className="group bg-white rounded-2xl border border-navy-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Top banner */}
                  <div
                    className={cn(
                      "px-5 pt-5 pb-4 flex items-start justify-between",
                      resource.premium
                        ? "bg-gradient-to-r from-amber-50 to-orange-50"
                        : "bg-gradient-to-r from-teal-50 to-cyan-50"
                    )}
                  >
                    <span className="text-4xl">{resource.icon}</span>
                    <div className="flex flex-col items-end gap-1.5">
                      {resource.premium ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-white px-2.5 py-1 rounded-full">
                          <Lock className="w-2.5 h-2.5" />
                          {t("filters.premium")}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-teal-500 text-white px-2.5 py-1 rounded-full">
                          {t("filters.free")}
                        </span>
                      )}
                      <span className="text-[10px] text-navy-400 capitalize bg-white/60 px-2 py-0.5 rounded-full">
                        {resource.type}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="font-bold text-navy-900 leading-snug mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
                      {isRTL ? resource.titleAr : resource.titleEn}
                    </h3>
                    <p className="text-navy-500 text-sm leading-relaxed line-clamp-3 mb-4">
                      {isRTL ? resource.descAr : resource.descEn}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-3 text-xs text-navy-400 mb-4">
                      <span>{resource.pages} {isRTL ? "صفحة" : "pages"}</span>
                      <span>·</span>
                      <span>{resource.format}</span>
                      {!resource.premium && resource.downloads > 0 && (
                        <>
                          <span>·</span>
                          <span>{resource.downloads.toLocaleString()} {isRTL ? "تنزيل" : "downloads"}</span>
                        </>
                      )}
                    </div>

                    {/* Rating */}
                    {!resource.premium && resource.rating > 0 && (
                      <div className="flex items-center gap-1.5 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3.5 h-3.5",
                              i < Math.floor(resource.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-navy-200 fill-navy-200"
                            )}
                          />
                        ))}
                        <span className="text-xs text-navy-400 font-medium">{resource.rating}</span>
                      </div>
                    )}

                    {/* CTA */}
                    {resource.premium ? (
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
                        <Lock className="w-3.5 h-3.5" />
                        {t("unlock")}
                      </button>
                    ) : (
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold rounded-xl transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        {t("download")}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Premium CTA strip */}
      <section className="py-14 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-orange-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">🔓</div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {isRTL ? "افتح وصولاً كاملاً إلى جميع الموارد" : "Unlock Full Access to All Resources"}
          </h2>
          <p className="text-navy-500 mb-6">
            {isRTL
              ? "احصل على جميع الملاحظات المميزة وأوراق العمل والحزم بسعر واحد."
              : "Get all premium notes, worksheets, and packs at one price."}
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md">
            <Lock className="w-4 h-4" />
            {isRTL ? "احصل على الوصول المميز" : "Get Premium Access"}
          </button>
        </div>
      </section>
    </>
  );
}
