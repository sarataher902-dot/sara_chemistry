import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import BlogPageClient from "@/components/sections/BlogPageClient";
import NewsletterSection from "@/components/sections/NewsletterSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <PageLayout>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      <BlogPageClient />
      <NewsletterSection />
    </PageLayout>
  );
}
