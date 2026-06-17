import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import NewsletterSection from "@/components/sections/NewsletterSection";
import { kidsActivities } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kids" });
  return { title: t("title"), description: t("subtitle") };
}

const categoryIcons: Record<string, string> = {
  experiments: "🧪",
  worksheets: "📄",
  books: "📚",
  activities: "🎨",
};

const featuredBooks = [
  {
    icon: "🔬",
    titleEn: "My First Chemistry Book",
    titleAr: "كتابي الأول في الكيمياء",
    descEn: "Colourful illustrations explaining atoms, molecules, and everyday chemistry for children aged 6–10.",
    descAr: "رسوم توضيحية ملونة تشرح الذرات والجزيئات والكيمياء اليومية للأطفال من سن 6-10.",
    ageEn: "Ages 6–10",
    ageAr: "الأعمار 6-10",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: "⚗️",
    titleEn: "Science Experiments at Home",
    titleAr: "تجارب علمية في المنزل",
    descEn: "20 safe, fun experiments using kitchen ingredients. Step-by-step guides with the science explained simply.",
    descAr: "20 تجربة آمنة وممتعة باستخدام مكونات المطبخ. أدلة خطوة بخطوة مع الشرح العلمي البسيط.",
    ageEn: "Ages 7–12",
    ageAr: "الأعمار 7-12",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: "🌍",
    titleEn: "Elements All Around Us",
    titleAr: "العناصر من حولنا",
    descEn: "A beautifully illustrated journey through the periodic table, connecting each element to daily life.",
    descAr: "رحلة مصورة بشكل جميل عبر الجدول الدوري، تربط كل عنصر بالحياة اليومية.",
    ageEn: "Ages 8–14",
    ageAr: "الأعمار 8-14",
    color: "from-emerald-400 to-teal-500",
  },
];

const printableSheets = [
  { icon: "⚛️", titleEn: "Blank Periodic Table", titleAr: "جدول دوري فارغ", diffEn: "Fill-in", diffAr: "للملء" },
  { icon: "🔗", titleEn: "Bonding Diagrams", titleAr: "مخططات الترابط", diffEn: "Colour & Label", diffAr: "لون وسمّ" },
  { icon: "🌡️", titleEn: "States of Matter", titleAr: "حالات المادة", diffEn: "Cut & Sort", diffAr: "قصّ ورتّب" },
  { icon: "🧫", titleEn: "Lab Safety Rules", titleAr: "قواعد سلامة المختبر", diffEn: "Poster", diffAr: "ملصق" },
  { icon: "📊", titleEn: "Particle Model Chart", titleAr: "مخطط النموذج الجسيمي", diffEn: "Draw & Label", diffAr: "ارسم وسمّ" },
  { icon: "⚗️", titleEn: "Lab Equipment Match", titleAr: "مطابقة معدات المختبر", diffEn: "Matching", diffAr: "مطابقة" },
];

export default async function KidsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kids" });
  const isRTL = locale === "ar";

  return (
    <PageLayout>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

      {/* Category nav cards */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: "activities", label: t("activities"), href: "#activities", color: "from-pink-500 to-rose-500", bg: "bg-pink-50 hover:bg-pink-100" },
              { key: "worksheets", label: t("worksheets"), href: "#worksheets", color: "from-violet-500 to-purple-500", bg: "bg-violet-50 hover:bg-violet-100" },
              { key: "books",      label: t("books"),      href: "#books",      color: "from-emerald-500 to-teal-500",  bg: "bg-emerald-50 hover:bg-emerald-100" },
              { key: "experiments",label: t("experiments"),href: "#experiments",color: "from-amber-500 to-orange-500",  bg: "bg-amber-50 hover:bg-amber-100" },
            ].map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`group rounded-2xl p-6 text-center border border-transparent transition-all duration-200 ${item.bg}`}
              >
                <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform`}>
                  {categoryIcons[item.key]}
                </div>
                <p className="font-bold text-navy-900 text-sm">{item.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Activities / Experiments */}
      <section id="activities" className="py-16 lg:py-20 bg-section-gradient scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {isRTL ? "تجارب وأنشطة ممتعة" : "Fun Experiments & Activities"}
            </h2>
            <p className="text-navy-500">
              {isRTL
                ? "آمنة، بسيطة، وممتعة — مثالية للأطفال من سن 5 إلى 14 عاماً"
                : "Safe, simple, and fun — perfect for children aged 5–14"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {kidsActivities.map((act) => (
              <div
                key={act.id}
                className="group bg-white rounded-2xl border border-navy-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="h-28 bg-gradient-to-br from-navy-50 to-teal-50 flex items-center justify-center text-5xl">
                  {act.icon}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                      {isRTL ? `عمر ${act.ageRange}` : `Age ${act.ageRange}`}
                    </span>
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full capitalize">
                      {act.difficulty}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-900 mb-1 group-hover:text-teal-600 transition-colors">
                    {isRTL ? act.titleAr : act.titleEn}
                  </h3>
                  <p className="text-navy-500 text-xs leading-relaxed">
                    {isRTL ? act.descAr : act.descEn}
                  </p>
                  <button className="mt-3 w-full py-2 text-xs font-bold text-teal-600 border border-teal-200 rounded-xl hover:bg-teal-50 transition-colors">
                    {isRTL ? "عرض التعليمات" : "View Instructions"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Printable Worksheets */}
      <section id="worksheets" className="py-16 lg:py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {isRTL ? "أوراق عمل قابلة للطباعة" : "Printable Worksheets"}
            </h2>
            <p className="text-navy-500">
              {isRTL ? "تحميل مجاني — جاهزة للطباعة والاستخدام في الفصل أو المنزل" : "Free to download — ready to print and use in class or at home"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {printableSheets.map((sheet, idx) => (
              <div
                key={idx}
                className="group bg-white border border-navy-100 rounded-2xl p-4 text-center hover:border-teal-300 hover:shadow-card transition-all duration-200 cursor-pointer"
              >
                <div className="text-3xl mb-2">{sheet.icon}</div>
                <p className="text-xs font-bold text-navy-900 leading-tight mb-1">
                  {isRTL ? sheet.titleAr : sheet.titleEn}
                </p>
                <p className="text-[10px] text-teal-600 font-semibold">
                  {isRTL ? sheet.diffAr : sheet.diffEn}
                </p>
                <div className="mt-3 w-full py-1.5 text-[10px] font-bold bg-teal-50 text-teal-600 rounded-lg group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  {isRTL ? "تنزيل" : "Download"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books section */}
      <section id="books" className="py-16 lg:py-20 bg-gradient-to-br from-navy-950 to-navy-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {isRTL ? "كتب تعليمية للأطفال" : "Educational Books for Kids"}
            </h2>
            <p className="text-navy-300">
              {isRTL ? "كتب علمية مكتوبة ومختارة بعناية لتشجيع الفضول لدى الأطفال" : "Science books written and curated to nurture children's curiosity"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredBooks.map((book, idx) => (
              <div
                key={idx}
                className="group bg-navy-800/50 border border-navy-700 hover:border-teal-500/40 rounded-3xl p-7 hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${book.color} flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                  {book.icon}
                </div>
                <span className="text-[10px] font-bold text-teal-400 bg-teal-400/10 px-2.5 py-1 rounded-full">
                  {isRTL ? book.ageAr : book.ageEn}
                </span>
                <h3 className="text-white font-bold text-lg mt-3 mb-2 group-hover:text-teal-300 transition-colors">
                  {isRTL ? book.titleAr : book.titleEn}
                </h3>
                <p className="text-navy-400 text-sm leading-relaxed mb-5">
                  {isRTL ? book.descAr : book.descEn}
                </p>
                <button className="w-full py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl hover:opacity-90 transition-opacity">
                  {isRTL ? "احصل على الكتاب" : "Get the Book"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEM CTA */}
      <section id="experiments" className="py-16 bg-gradient-to-r from-teal-500 to-cyan-500 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h2
            className="text-3xl font-extrabold text-white mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {isRTL ? "هل تريد المزيد من محتوى STEM؟" : "Want More STEM Content?"}
          </h2>
          <p className="text-white/90 text-lg mb-7">
            {isRTL
              ? "اشترك في النشرة الإخبارية لتلقي أنشطة علمية أسبوعية وموارد مجانية للأطفال."
              : "Subscribe to the newsletter for weekly science activities and free resources for kids."}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-colors shadow-md"
          >
            {isRTL ? "تواصل معنا" : "Get in Touch"}
          </Link>
        </div>
      </section>

      <NewsletterSection />
    </PageLayout>
  );
}
