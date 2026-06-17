"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Search, ArrowRight, BookOpen, Lightbulb, FileText } from "lucide-react";
import { chemistryTopics } from "@/lib/data";
import { cn } from "@/lib/utils";

const difficultyColor = {
  foundation: "text-green-700 bg-green-50 border-green-200",
  intermediate: "text-yellow-700 bg-yellow-50 border-yellow-200",
  advanced: "text-red-700 bg-red-50 border-red-200",
};

const examTips = [
  {
    icon: "✍️",
    titleEn: "Use precise scientific vocabulary",
    titleAr: "استخدم مصطلحات علمية دقيقة",
    descEn: "Examiners look for exact terms like 'electrostatic forces of attraction' rather than vague descriptions.",
    descAr: "يبحث الممتحنون عن مصطلحات دقيقة مثل 'قوى التجاذب الكهروستاتيكية' بدلاً من الأوصاف الغامضة.",
  },
  {
    icon: "📐",
    titleEn: "Always show your working in calculations",
    titleAr: "أظهر دائماً خطوات عملك في الحسابات",
    descEn: "Method marks are awarded even if your final answer is wrong — never skip steps.",
    descAr: "تُمنح علامات الطريقة حتى إذا كانت إجابتك النهائية خاطئة — لا تتخط الخطوات.",
  },
  {
    icon: "🔍",
    titleEn: "Read the command word carefully",
    titleAr: "اقرأ كلمة الأمر بعناية",
    descEn: "'Describe' wants observations; 'Explain' wants reasons. Mixing these up costs easy marks.",
    descAr: "'صف' تتطلب ملاحظات؛ 'اشرح' تتطلب أسباباً. الخلط بينهما يكلفك علامات سهلة.",
  },
  {
    icon: "⏰",
    titleEn: "Manage your time: 1 minute per mark",
    titleAr: "نظّم وقتك: دقيقة واحدة لكل علامة",
    descEn: "If a question is worth 4 marks, aim to spend about 4 minutes — no more.",
    descAr: "إذا كان السؤال يستحق 4 علامات، استهدف قضاء حوالي 4 دقائق — لا أكثر.",
  },
];

const studyGuides = [
  {
    icon: BookOpen,
    titleEn: "12-Week Revision Roadmap",
    titleAr: "خارطة طريق المراجعة لـ 12 أسبوعاً",
    descEn: "A structured plan covering every topic before your exam date.",
    descAr: "خطة منظمة تغطي كل موضوع قبل تاريخ امتحانك.",
  },
  {
    icon: Lightbulb,
    titleEn: "Active Recall Techniques",
    titleAr: "تقنيات الاستذكار النشط",
    descEn: "Flashcards, practice questions, and spaced repetition methods.",
    descAr: "البطاقات التعليمية وأسئلة التدريب وطرق التكرار المتباعد.",
  },
  {
    icon: FileText,
    titleEn: "Past Paper Strategy Guide",
    titleAr: "دليل استراتيجية الأوراق السابقة",
    descEn: "How to use past papers effectively for maximum score improvement.",
    descAr: "كيفية استخدام الأوراق السابقة بفعالية لتحسين أقصى للنتيجة.",
  },
];

export default function LearnPageClient() {
  const t = useTranslations("learn");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryKeyMap: Record<string, string> = {
    "atomic-structure": "atomic",
    "chemical-bonding": "bonding",
    "stoichiometry": "stoichiometry",
    "electrochemistry": "electrochemistry",
    "energetics": "energetics",
    "reaction-kinetics": "kinetics",
    "acids-and-bases": "acids",
    "organic-chemistry": "organic",
    "metals": "metals",
    "atmosphere": "atmosphere",
  };

  const filteredTopics = useMemo(() => {
    return chemistryTopics.filter((topic) => {
      const matchesSearch =
        search === "" ||
        topic.titleEn.toLowerCase().includes(search.toLowerCase()) ||
        topic.titleAr.includes(search) ||
        topic.descEn.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "all" || categoryKeyMap[topic.slug] === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const categories = [
    "all",
    "atomic",
    "bonding",
    "states",
    "stoichiometry",
    "electrochemistry",
    "energetics",
    "kinetics",
    "equilibrium",
    "acids",
    "organic",
    "metals",
    "atmosphere",
  ];

  return (
    <>
      {/* Search + Filters */}
      <section className="py-10 bg-white border-b border-navy-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search")}
              className="w-full ps-12 pe-4 py-3.5 rounded-2xl border border-navy-200 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all text-navy-800"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-teal-500 text-white border-teal-500 shadow-sm"
                    : "bg-white text-navy-600 border-navy-200 hover:border-teal-300 hover:text-teal-600"
                )}
              >
                {t(`categories.${cat}` as "categories.all")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16 lg:py-20 bg-section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTopics.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-navy-400 text-lg">
                {locale === "ar" ? "لا توجد نتائج" : "No topics found"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  id={topic.slug}
                  className="group bg-white rounded-2xl border border-navy-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Header */}
                  <div className={`p-6 ${topic.bg}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm">
                        {topic.icon}
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border",
                          difficultyColor[topic.difficulty as keyof typeof difficultyColor]
                        )}
                      >
                        {topic.difficulty}
                      </span>
                    </div>
                    <h3 className="font-bold text-navy-900 text-lg group-hover:text-teal-700 transition-colors">
                      {isRTL ? topic.titleAr : topic.titleEn}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="text-navy-500 text-sm leading-relaxed mb-4">
                      {isRTL ? topic.descAr : topic.descEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-navy-400 font-medium">
                        {topic.topicsCount} {isRTL ? "موضوعاً فرعياً" : "subtopics"}
                      </span>
                      <button className="inline-flex items-center gap-1 text-sm text-teal-600 font-semibold group-hover:gap-2 transition-all">
                        {isRTL ? "استكشف" : "Explore"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Exam Tips */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("examTips.title")}
            </h2>
            <p className="text-navy-500">{t("examTips.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {examTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-navy-50 to-teal-50/50 rounded-2xl p-6 border border-navy-100"
              >
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h3 className="font-bold text-navy-900 text-sm mb-2 leading-snug">
                  {isRTL ? tip.titleAr : tip.titleEn}
                </h3>
                <p className="text-navy-500 text-xs leading-relaxed">
                  {isRTL ? tip.descAr : tip.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Guides */}
      <section className="py-16 lg:py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("studyGuides.title")}
            </h2>
            <p className="text-navy-300">{t("studyGuides.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {studyGuides.map((guide, idx) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={idx}
                  href={`/${locale}/resources`}
                  className="group bg-navy-800/50 border border-navy-700 hover:border-teal-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-teal-400" />
                  </div>
                  <h3 className="text-white font-bold mb-2 group-hover:text-teal-300 transition-colors">
                    {isRTL ? guide.titleAr : guide.titleEn}
                  </h3>
                  <p className="text-navy-400 text-sm leading-relaxed">
                    {isRTL ? guide.descAr : guide.descEn}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
