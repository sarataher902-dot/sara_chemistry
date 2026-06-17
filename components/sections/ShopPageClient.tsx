"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ShoppingCart, Eye, Star, Lock, Tag, Sparkles } from "lucide-react";
import { shopProducts } from "@/lib/data";
import { cn } from "@/lib/utils";

const badgeStyles: Record<string, string> = {
  bestseller: "bg-gradient-to-r from-amber-400 to-orange-400 text-white",
  new:        "bg-gradient-to-r from-teal-500 to-cyan-500 text-white",
  popular:    "bg-gradient-to-r from-violet-500 to-purple-500 text-white",
};

const badgeLabels: Record<string, { en: string; ar: string }> = {
  bestseller: { en: "Bestseller", ar: "الأكثر مبيعاً" },
  new:        { en: "New",        ar: "جديد" },
  popular:    { en: "Popular",    ar: "شائع" },
};

export default function ShopPageClient() {
  const t = useTranslations("shop");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "notes", "worksheets", "revision", "books"] as const;

  const filtered = useMemo(() => {
    if (activeCategory === "all") return shopProducts;
    return shopProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const available = filtered.filter((p) => !p.comingSoon);
  const upcoming  = filtered.filter((p) =>  p.comingSoon);

  return (
    <>
      {/* Trust bar */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-navy-600">
            {[
              { icon: "✅", en: "Instant PDF download", ar: "تنزيل فوري للـ PDF" },
              { icon: "🔒", en: "Secure checkout", ar: "دفع آمن" },
              { icon: "📧", en: "Support via email & WhatsApp", ar: "دعم عبر البريد والواتساب" },
              { icon: "⭐", en: "500+ happy students", ar: "أكثر من 500 طالب سعيد" },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span>{item.icon}</span>
                {isRTL ? item.ar : item.en}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category filters */}
      <section className="py-6 bg-white border-b border-navy-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full border transition-all",
                  activeCategory === cat
                    ? "bg-navy-900 text-white border-navy-900"
                    : "bg-white text-navy-600 border-navy-200 hover:border-navy-400"
                )}
              >
                {t(`categories.${cat}` as "categories.all")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 lg:py-20 bg-section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {available.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                {available.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-3xl border border-navy-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Product image placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-navy-800 to-navy-950 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 molecule-bg opacity-20" />
                      <span className="relative z-10 text-7xl opacity-40">{product.icon}</span>

                      {product.badge && (
                        <div className="absolute top-4 start-4">
                          <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full", badgeStyles[product.badge])}>
                            {isRTL ? badgeLabels[product.badge].ar : badgeLabels[product.badge].en}
                          </span>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button className="flex items-center gap-1.5 px-4 py-2 bg-white text-navy-900 text-xs font-bold rounded-xl hover:bg-teal-50 transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                          {t("preview")}
                        </button>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3
                          className="font-bold text-navy-900 leading-snug group-hover:text-teal-700 transition-colors"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {isRTL ? product.titleAr : product.titleEn}
                        </h3>
                        <span className="flex-shrink-0 text-xs font-medium bg-navy-50 text-navy-500 px-2.5 py-1 rounded-full capitalize">
                          {product.category}
                        </span>
                      </div>

                      <p className="text-navy-500 text-sm leading-relaxed line-clamp-2 mb-4">
                        {isRTL ? product.descAr : product.descEn}
                      </p>

                      {/* Rating */}
                      {product.reviews > 0 && (
                        <div className="flex items-center gap-1.5 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={cn("w-3.5 h-3.5", i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-navy-200 fill-navy-200")} />
                          ))}
                          <span className="text-xs text-navy-400">{product.rating} ({product.reviews})</span>
                        </div>
                      )}

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-navy-50">
                        <div>
                          <span className="text-2xl font-extrabold text-navy-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="ms-2 text-sm text-navy-400 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-bold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-sm hover:shadow-glow">
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {t("addToCart")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Coming Soon */}
          {upcoming.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-teal-500" />
                <h2 className="text-lg font-extrabold text-navy-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {isRTL ? "قادم قريباً" : "Coming Soon"}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((product) => (
                  <div key={product.id} className="bg-white rounded-3xl border border-dashed border-navy-200 overflow-hidden opacity-70">
                    <div className="h-36 bg-navy-50 flex items-center justify-center">
                      <span className="text-5xl opacity-30">{product.icon}</span>
                    </div>
                    <div className="p-6">
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-navy-100 text-navy-500 px-2.5 py-1 rounded-full mb-3">
                        <Lock className="w-2.5 h-2.5" />
                        {t("comingSoon")}
                      </div>
                      <h3 className="font-bold text-navy-600 text-sm leading-snug mb-1">
                        {isRTL ? product.titleAr : product.titleEn}
                      </h3>
                      <p className="text-navy-400 text-xs leading-relaxed">
                        {isRTL ? product.descAr : product.descEn}
                      </p>
                      <p className="text-sm font-bold text-navy-500 mt-4">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bundle upsell banner */}
      <section className="py-14 bg-gradient-to-r from-navy-900 to-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">📦</div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {isRTL ? "وفّر 40% مع الحزمة الشاملة" : "Save 40% with the Complete Bundle"}
          </h2>
          <p className="text-navy-300 mb-6">
            {isRTL
              ? "احصل على جميع الملاحظات وأوراق العمل وحزم المراجعة بسعر واحد مخفض."
              : "Get all notes, worksheets, and revision packs at one discounted price."}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="text-center">
              <p className="text-navy-400 text-sm line-through">{isRTL ? "القيمة الإجمالية $89" : "Total value $89"}</p>
              <p className="text-3xl font-extrabold text-white">$49</p>
            </div>
            <button className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-xl hover:from-teal-400 hover:to-teal-500 transition-all shadow-glow">
              {isRTL ? "احصل على الحزمة" : "Get the Bundle"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
