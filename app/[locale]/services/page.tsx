import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, ArrowRight, Calendar, Clock } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTABanner from "@/components/sections/CTABanner";
import { services } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}

// Extra bullet points per service
const serviceFeatures: Record<string, { en: string[]; ar: string[] }> = {
  tutoring: {
    en: ["Personalised lesson plan", "Interactive whiteboard", "Session recording available", "WhatsApp support between sessions"],
    ar: ["خطة درس مخصصة", "سبورة بيضاء تفاعلية", "تسجيل الجلسة متاح", "دعم واتساب بين الجلسات"],
  },
  igcse: {
    en: ["Full syllabus coverage", "Past paper practice", "Mark scheme analysis", "Predicted topic focus"],
    ar: ["تغطية كاملة للمنهج", "ممارسة الأوراق السابقة", "تحليل مخطط العلامات", "التركيز على المواضيع المتوقعة"],
  },
  studyPlan: {
    en: ["Personalised timeline", "Topic prioritisation", "Weekly milestones", "Progress check-ins"],
    ar: ["جدول زمني شخصي", "ترتيب أولويات المواضيع", "معالم أسبوعية", "متابعة التقدم"],
  },
  content: {
    en: ["SEO-friendly science articles", "Curriculum-aligned worksheets", "Rapid turnaround", "Editable source files"],
    ar: ["مقالات علمية صديقة لـ SEO", "أوراق عمل متوافقة مع المنهج", "تسليم سريع", "ملفات مصدر قابلة للتحرير"],
  },
  worksheets: {
    en: ["Topic-specific questions", "Difficulty graded", "Fully worked solutions", "PDF & editable formats"],
    ar: ["أسئلة خاصة بالموضوع", "مدرّجة حسب الصعوبة", "حلول مكتملة", "تنسيقات PDF وقابلة للتحرير"],
  },
  group: {
    en: ["Up to 6 students", "Collaborative problem solving", "Peer discussion", "Recording shared post-session"],
    ar: ["حتى 6 طلاب", "حل المشكلات التعاوني", "نقاش بين الأقران", "التسجيل يُشارك بعد الجلسة"],
  },
};

const processSteps = [
  { numEn: "01", titleEn: "Book a Free Consultation", titleAr: "احجز استشارة مجانية", descEn: "Fill out the contact form or message on WhatsApp.", descAr: "املأ نموذج الاتصال أو أرسل رسالة على واتساب." },
  { numEn: "02", titleEn: "Assessment & Matching", titleAr: "التقييم والمطابقة", descEn: "Brief diagnostic to understand your level, goals and schedule.", descAr: "تشخيص موجز لفهم مستواك وأهدافك وجدولك الزمني." },
  { numEn: "03", titleEn: "Start Your Sessions", titleAr: "ابدأ جلساتك", descEn: "Get your personalised plan and dive straight into learning.", descAr: "احصل على خطتك الشخصية وابدأ التعلم على الفور." },
  { numEn: "04", titleEn: "Track Your Progress", titleAr: "تتبع تقدمك", descEn: "Regular reviews to ensure you're on track for success.", descAr: "مراجعات منتظمة للتأكد من سيرك نحو النجاح." },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const isRTL = locale === "ar";

  return (
    <PageLayout>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

      {/* Services grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((svc) => {
              const key = svc.id as keyof typeof serviceFeatures;
              const features = serviceFeatures[key];
              const tKey = `items.${svc.id}` as "items.tutoring";

              return (
                <div
                  key={svc.id}
                  className="group flex flex-col bg-white rounded-3xl border border-navy-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-br from-navy-900 to-navy-800 p-7">
                    <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-3xl mb-5 group-hover:scale-105 transition-transform">
                      {svc.icon}
                    </div>
                    <h3
                      className="text-white text-xl font-extrabold mb-2 leading-snug group-hover:text-teal-300 transition-colors"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {t(`${tKey}.title` as "items.tutoring.title")}
                    </h3>
                    {svc.priceFrom && (
                      <p className="text-teal-400 text-sm font-medium">
                        {isRTL ? `يبدأ من $${svc.priceFrom}` : `From $${svc.priceFrom}`}
                        {svc.durationMinutes && (
                          <span className="text-navy-400 ms-2 flex items-center gap-1 inline-flex">
                            <Clock className="w-3 h-3" />
                            {svc.durationMinutes}{isRTL ? " دقيقة" : " min"}
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-7">
                    <p className="text-navy-500 text-sm leading-relaxed mb-5">
                      {t(`${tKey}.desc` as "items.tutoring.desc")}
                    </p>

                    <ul className="space-y-2.5 mb-7 flex-1">
                      {(isRTL ? features.ar : features.en).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-navy-600">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/${locale}/contact`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all text-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      {t("bookNow")}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-24 bg-section-gradient">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-navy-900"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {isRTL ? "كيف يعمل" : "How It Works"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-8 start-[12.5%] end-[12.5%] h-0.5 bg-gradient-to-r from-teal-400 to-teal-200" />

            {processSteps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                {/* Step number circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center font-extrabold text-lg shadow-glow mb-5"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {step.numEn}
                </div>
                <h3 className="font-bold text-navy-900 mb-2 text-sm">
                  {isRTL ? step.titleAr : step.titleEn}
                </h3>
                <p className="text-navy-500 text-xs leading-relaxed">
                  {isRTL ? step.descAr : step.descEn}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-900 text-white font-semibold rounded-xl hover:bg-navy-800 transition-colors"
            >
              {isRTL ? "ابدأ اليوم" : "Get Started Today"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTABanner />
    </PageLayout>
  );
}
