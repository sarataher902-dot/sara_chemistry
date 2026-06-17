import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import ContactPageClient from "@/components/sections/ContactPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <PageLayout>
      <PageHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      <ContactPageClient />
    </PageLayout>
  );
}
