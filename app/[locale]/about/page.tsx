import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import CTABanner from "@/components/sections/CTABanner";
import { GraduationCap, Heart, Target, Sparkles } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const isRTL = locale === "ar";

  const timeline = t.raw("experience.items") as Array<{
    year: string;
    title: string;
    org: string;
    desc: string;
  }>;

  const principles = t.raw("philosophy.principles") as string[];

  return (
    <PageLayout>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

      {/* Bio Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Portrait sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 to-navy-950 aspect-[4/5]">
                  <div className="absolute inset-0 molecule-bg opacity-30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-6xl shadow-glow">
                      👩‍🔬
                    </div>
                    <div className="text-center px-6">
                      <p
                        className="text-white text-xl font-bold"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        Sara Taher
                      </p>
                      <p className="text-teal-400 text-sm mt-1">
                        {isRTL ? "معلمة كيمياء IGCSE" : "IGCSE Chemistry Educator"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick facts */}
                <div className="mt-6 space-y-3">
                  {[                    { icon: GraduationCap, labelEn: "BSc in Chemistry", labelAr: "بكالوريوس العلوم قسم الكيمياء" },
                    { icon: Sparkles, labelEn: "5+ Years Teaching Experience", labelAr: "أكثر من 5 سنوات خبرة تدريس" },
                    { icon: Target, labelEn: "500+ Students Worldwide", labelAr: "أكثر من 500 طالب حول العالم" },
                  ].map((item) => (
                    <div
                      key={item.labelEn}
                      className="flex items-center gap-3 bg-navy-50 rounded-xl px-4 py-3"
                    >
                      <item.icon className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span className="text-sm text-navy-700 font-medium">
                        {isRTL ? item.labelAr : item.labelEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Story */}
              <div>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-5"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t("bio.title")}
                </h2>
                <div className="space-y-4 text-navy-600 leading-relaxed text-lg">
                  <p>{t("bio.p1")}</p>
                  <p>{t("bio.p2")}</p>
                  <p>{t("bio.p3")}</p>
                </div>
              </div>

              {/* Philosophy */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 border border-teal-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h2
                    className="text-xl sm:text-2xl font-extrabold text-navy-900"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t("philosophy.title")}
                  </h2>
                </div>
                <p className="text-navy-600 leading-relaxed mb-5">{t("philosophy.p1")}</p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {principles.map((p, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 bg-white/70 rounded-xl px-4 py-3 text-sm text-navy-700 font-medium"
                    >
                      <span className="text-teal-500 font-bold">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-28 bg-section-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("experience.title")}
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute start-[15px] sm:start-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-teal-400 via-teal-300 to-transparent sm:-translate-x-1/2" />

            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row gap-6 sm:gap-10 ${
                    idx % 2 === 1 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute start-0 sm:start-1/2 top-1.5 w-8 h-8 -translate-x-1/2 sm:-translate-x-1/2 rounded-full bg-white border-4 border-teal-400 shadow-card flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden sm:block sm:flex-1" />

                  {/* Content */}
                  <div className="sm:flex-1 ps-12 sm:ps-0">
                    <div className="bg-white rounded-2xl border border-navy-100 shadow-card p-6">
                      <span className="inline-block text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full mb-2">
                        {item.year}
                      </span>
                      <h3 className="font-bold text-navy-900 text-lg mb-1">{item.title}</h3>
                      <p className="text-teal-600 text-sm font-medium mb-2">{item.org}</p>
                      <p className="text-navy-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-navy-800 flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Target className="w-7 h-7 text-white" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {t("mission.title")}
          </h2>
          <p className="text-navy-600 text-lg leading-relaxed">{t("mission.body")}</p>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}
