import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import ShopPageClient from "@/components/sections/ShopPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });

  return (
    <PageLayout>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      <ShopPageClient />
    </PageLayout>
  );
}
