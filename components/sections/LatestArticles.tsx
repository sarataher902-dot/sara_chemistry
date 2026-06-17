"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Clock, ArrowRight, Tag } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  daily: "bg-blue-50 text-blue-700",
  study: "bg-purple-50 text-purple-700",
  concepts: "bg-teal-50 text-teal-700",
  news: "bg-orange-50 text-orange-700",
};

export default function LatestArticles() {
  const t = useTranslations("home.articles");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const featured = blogPosts.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionBadge className="mb-4">{t("badge")}</SectionBadge>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-navy-900"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("title")}
            </h2>
            <p className="text-navy-500 mt-2 max-w-xl">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="group inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors whitespace-nowrap"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((post, i) => (
            <article
              key={post.id}
              className={`group bg-white rounded-2xl border border-navy-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-navy-800 to-navy-950 relative overflow-hidden">
                <div className="absolute inset-0 molecule-bg opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-30">
                    {post.category === "daily" ? "🌍" : post.category === "study" ? "📚" : "⚗️"}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-navy-400 mb-3">
                  <span>{formatDate(post.date, locale)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime} {isRTL ? "دقائق" : "min read"}
                  </span>
                </div>

                <h3 className="font-bold text-navy-900 leading-snug mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {isRTL ? post.titleAr : post.titleEn}
                </h3>

                <p className="text-navy-500 text-sm leading-relaxed line-clamp-3 mb-4">
                  {isRTL ? post.excerptAr : post.excerptEn}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-navy-400 bg-navy-50 px-2 py-0.5 rounded-full flex items-center gap-1"
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="text-sm text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-1 group/link"
                  >
                    {t("readMore")}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
