import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import LearnPageClient from "@/components/sections/LearnPageClient";
import CTABanner from "@/components/sections/CTABanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learn" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learn" });

  return (
    <PageLayout>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      <LearnPageClient />
      <CTABanner />
    </PageLayout>
  );
}
