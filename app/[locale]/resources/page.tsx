import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import ResourcesPageClient from "@/components/sections/ResourcesPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });

  return (
    <PageLayout>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      <ResourcesPageClient />
    </PageLayout>
  );
}
