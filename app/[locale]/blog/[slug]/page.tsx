import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Clock, Tag, Calendar, Share2 } from "lucide-react";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: locale === "ar" ? post.titleAr : post.titleEn,
    description: locale === "ar" ? post.excerptAr : post.excerptEn,
  };
}

// Placeholder article body paragraphs
const bodyParagraphsEn = [
  "Understanding chemistry in everyday contexts transforms what many students see as abstract formulas into tangible insights. When we encounter a chemical concept in real life, it suddenly becomes memorable, relevant, and genuinely interesting.",
  "The key is to always connect what you read in a textbook to something you've experienced. Take acids and bases: instead of memorising that citric acid has a pH of around 2, remember that it's the sharp tang you feel when you eat a lemon. That sensation is proton transfer in action.",
  "One of the most powerful tools any chemistry student has is the ability to ask 'why?' at every step. Why does salt melt ice? Why does bread turn brown in an oven? Why does soap clean grease? Each question opens a doorway into a deeper understanding of chemical principles.",
  "As you progress through your chemistry studies, you'll notice that the same handful of core ideas — electrostatic attraction, energy minimisation, equilibrium — appear in completely different contexts. Mastering these underlying principles is far more valuable than memorising hundreds of isolated facts.",
  "The IGCSE Chemistry syllabus is designed to build this kind of conceptual foundation. Each topic connects to the others. Bonding theory explains physical properties. Energetics connects to reaction rates. Understanding these links is what separates students who merely pass from those who truly excel.",
];

const bodyParagraphsAr = [
  "يحوّل فهم الكيمياء في السياقات اليومية ما يراه كثير من الطلاب مجرد معادلات مجردة إلى رؤى ملموسة. عندما نواجه مفهوماً كيميائياً في الحياة الحقيقية، يصبح فجأة لا يُنسى وذا صلة ومثيراً للاهتمام حقاً.",
  "المفتاح هو ربط ما تقرأه في الكتاب المدرسي دائماً بشيء عشته. خذ الأحماض والقواعد مثلاً: بدلاً من حفظ أن حمض الستريك له pH حوالي 2، تذكر اللذعة الحادة التي تشعر بها عند تناول الليمون. هذا الإحساس هو انتقال البروتون في العمل.",
  "أحد أقوى الأدوات التي يمتلكها أي طالب كيمياء هي القدرة على السؤال 'لماذا؟' في كل خطوة. لماذا يذيب الملح الجليد؟ لماذا يتحول الخبز إلى اللون البني في الفرن؟ لماذا ينظف الصابون الدهون؟ كل سؤال يفتح باباً نحو فهم أعمق للمبادئ الكيميائية.",
  "مع تقدمك في دراسة الكيمياء، ستلاحظ أن نفس حفنة المفاهيم الأساسية — التجاذب الكهروستاتيكي وتقليل الطاقة والتوازن — تظهر في سياقات مختلفة تماماً. إتقان هذه المبادئ الأساسية أكثر قيمة بكثير من حفظ مئات الحقائق المعزولة.",
  "تم تصميم منهج كيمياء IGCSE لبناء هذا النوع من الأساس المفاهيمي. كل موضوع يرتبط بالآخرين. نظرية الترابط تشرح الخصائص الفيزيائية. الطاقة ترتبط بمعدلات التفاعل. فهم هذه الروابط هو ما يميز الطلاب الذين ينجحون فحسب عن أولئك الذين يتفوقون حقاً.",
];

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const isRTL = locale === "ar";
  const title = isRTL ? post.titleAr : post.titleEn;
  const excerpt = isRTL ? post.excerptAr : post.excerptEn;
  const bodyParagraphs = isRTL ? bodyParagraphsAr : bodyParagraphsEn;

  const relatedPosts = blogPosts.filter(
    (p) => p.id !== post.id && p.category === post.category
  ).slice(0, 3);

  return (
    <PageLayout>
      {/* Article Hero */}
      <section className="relative pt-32 pb-16 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="orb orb-teal w-80 h-80 -top-20 -right-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-navy-300 hover:text-teal-400 text-sm mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            {isRTL ? "العودة إلى المقالات" : "Back to Articles"}
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30 px-3 py-1.5 rounded-full capitalize">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-navy-400">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} {isRTL ? "دقائق للقراءة" : "min read"}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {title}
          </h1>
          <p className="text-navy-300 text-lg leading-relaxed mb-8">{excerpt}</p>

          <div className="flex items-center gap-5 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
                S
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Sara Mohamed</p>
                <p className="text-navy-400 text-xs">{isRTL ? "معلمة كيمياء IGCSE" : "IGCSE Chemistry Educator"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-navy-400">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date, locale)}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 0C1200 30 960 40 720 40C480 40 240 30 0 0L0 40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main content */}
            <article className="prose-chemistry">
              {bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              {/* Pull quote */}
              <blockquote className="border-s-4 border-teal-400 ps-6 py-2 my-8 not-italic">
                <p className="text-xl font-semibold text-navy-800 leading-snug">
                  {isRTL
                    ? "إتقان المبادئ الأساسية أكثر قيمة من حفظ مئات الحقائق المعزولة."
                    : "Mastering the underlying principles is far more valuable than memorising hundreds of isolated facts."}
                </p>
              </blockquote>

              {bodyParagraphs.slice(2).map((para, idx) => (
                <p key={`b-${idx}`}>{para}</p>
              ))}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-navy-100 not-prose">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs text-navy-500 bg-navy-50 border border-navy-100 px-3 py-1.5 rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Share */}
              <div className="bg-navy-50 rounded-2xl p-5">
                <p className="font-bold text-navy-900 mb-3 flex items-center gap-2 text-sm">
                  <Share2 className="w-4 h-4 text-teal-500" />
                  {isRTL ? "شارك المقال" : "Share Article"}
                </p>
                <div className="flex gap-2">
                  {["Twitter", "LinkedIn", "WhatsApp"].map((s) => (
                    <button
                      key={s}
                      className="flex-1 py-2 text-xs font-semibold bg-white border border-navy-200 rounded-xl hover:border-teal-400 hover:text-teal-600 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* About author */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border border-teal-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <p className="font-bold text-navy-900 text-sm">Sara Mohamed</p>
                    <p className="text-teal-600 text-xs">{isRTL ? "IGCSE كيمياء" : "IGCSE Chemistry"}</p>
                  </div>
                </div>
                <p className="text-navy-600 text-xs leading-relaxed mb-3">
                  {isRTL
                    ? "معلمة كيمياء وصانعة محتوى علمي بخبرة تزيد عن 8 سنوات."
                    : "Chemistry educator and science content creator with 8+ years of experience."}
                </p>
                <Link
                  href={`/${locale}/about`}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                >
                  {isRTL ? "اقرأ المزيد عني ←" : "Learn more about me →"}
                </Link>
              </div>

              {/* Book session CTA */}
              <div className="bg-navy-900 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-3">🎓</div>
                <p className="text-white font-bold text-sm mb-2">
                  {isRTL ? "احجز جلسة تدريس" : "Book a Tutoring Session"}
                </p>
                <p className="text-navy-300 text-xs mb-4">
                  {isRTL ? "تعلم شخصياً مع سارة" : "Learn 1-on-1 with Sara"}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="block w-full py-2 text-xs font-bold bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  {isRTL ? "احجز الآن" : "Book Now"}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-14 bg-section-gradient border-t border-navy-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-xl font-extrabold text-navy-900 mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {isRTL ? "مقالات ذات صلة" : "Related Articles"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/${locale}/blog/${rp.slug}`}
                  className="group bg-white rounded-2xl border border-navy-100 p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3 text-xs text-navy-400">
                    <Clock className="w-3 h-3" />
                    {rp.readTime} {isRTL ? "دق" : "min"}
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                    {isRTL ? rp.titleAr : rp.titleEn}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
