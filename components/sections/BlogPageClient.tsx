"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Search, Clock, Tag, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { formatDate, cn } from "@/lib/utils";

const categoryColors: Record<string, { bg: string; text: string }> = {
  daily:    { bg: "bg-blue-100",   text: "text-blue-700" },
  study:    { bg: "bg-purple-100", text: "text-purple-700" },
  concepts: { bg: "bg-teal-100",   text: "text-teal-700" },
  news:     { bg: "bg-orange-100", text: "text-orange-700" },
};

const categoryEmoji: Record<string, string> = {
  daily: "🌍",
  study: "📚",
  concepts: "⚗️",
  news: "📰",
};

export default function BlogPageClient() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchSearch =
        search === "" ||
        post.titleEn.toLowerCase().includes(search.toLowerCase()) ||
        post.titleAr.includes(search) ||
        post.excerptEn.toLowerCase().includes(search.toLowerCase());

      const matchCat =
        activeCategory === "all" || post.category === activeCategory;

      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  const categories = ["all", "daily", "study", "concepts", "news"] as const;
  const featured = blogPosts.find((p) => p.featured);

  return (
    <>
      {/* Filters bar */}
      <section className="py-8 bg-white border-b border-navy-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("search")}
                className="w-full ps-10 pe-4 py-2.5 text-sm rounded-xl border border-navy-200 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all",
                    activeCategory === cat
                      ? "bg-teal-500 text-white border-teal-500"
                      : "bg-white text-navy-600 border-navy-200 hover:border-teal-300"
                  )}
                >
                  {cat !== "all" && <span>{categoryEmoji[cat]}</span>}
                  {t(`categories.${cat}` as "categories.all")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured post (shown only when no filter active) */}
      {activeCategory === "all" && search === "" && featured && (
        <section className="py-12 bg-section-gradient border-b border-navy-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/${locale}/blog/${featured.slug}`}
              className="group grid lg:grid-cols-2 gap-0 bg-white rounded-3xl border border-navy-100 overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Image */}
              <div className="h-56 lg:h-auto min-h-[280px] bg-gradient-to-br from-navy-800 to-navy-950 relative flex items-center justify-center">
                <div className="absolute inset-0 molecule-bg opacity-20" />
                <span className="text-8xl relative z-10 opacity-30">⚗️</span>
                <div className="absolute top-4 start-4">
                  <span className={cn("text-xs font-bold px-3 py-1.5 rounded-full", categoryColors[featured.category]?.bg, categoryColors[featured.category]?.text)}>
                    {categoryEmoji[featured.category]} {featured.category}
                  </span>
                </div>
                <div className="absolute top-4 end-4">
                  <span className="text-xs font-bold bg-teal-500 text-white px-3 py-1.5 rounded-full">
                    {isRTL ? "مميز" : "Featured"}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-navy-400 mb-4">
                  <span>{formatDate(featured.date, locale)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.readTime} {isRTL ? "دقائق" : "min read"}
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {isRTL ? featured.titleAr : featured.titleEn}
                </h2>
                <p className="text-navy-500 leading-relaxed mb-6">
                  {isRTL ? featured.excerptAr : featured.excerptEn}
                </p>
                <div className="flex items-center gap-2 text-teal-600 font-semibold">
                  {t("readMore")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All articles grid */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-navy-400 mb-8">
            {filtered.length} {isRTL ? "مقال" : "articles"}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-navy-400">
              {isRTL ? "لا توجد نتائج" : "No articles found"}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-navy-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="h-44 bg-gradient-to-br from-navy-800 to-navy-950 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 molecule-bg opacity-20" />
                    <span className="text-6xl opacity-25 relative z-10">
                      {categoryEmoji[post.category]}
                    </span>
                    <div className="absolute bottom-3 start-3">
                      <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full", categoryColors[post.category]?.bg, categoryColors[post.category]?.text)}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-navy-400 mb-2.5">
                      <span>{formatDate(post.date, locale)}</span>
                      <span>·</span>
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime} {isRTL ? "دق" : "min"}</span>
                    </div>

                    <h3 className="font-bold text-navy-900 leading-snug mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
                      {isRTL ? post.titleAr : post.titleEn}
                    </h3>

                    <p className="text-navy-500 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {isRTL ? post.excerptAr : post.excerptEn}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-navy-50">
                      <div className="flex gap-1.5 flex-wrap">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 text-[10px] text-navy-400 bg-navy-50 px-2 py-0.5 rounded-full">
                            <Tag className="w-2 h-2" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-teal-600 font-semibold text-xs flex items-center gap-1">
                        {t("readMore")} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
