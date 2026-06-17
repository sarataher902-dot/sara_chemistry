import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
import TopicsGrid from "@/components/sections/TopicsGrid";
import LatestArticles from "@/components/sections/LatestArticles";
import FeaturedResources from "@/components/sections/FeaturedResources";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTABanner from "@/components/sections/CTABanner";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <AboutPreview />
      <TopicsGrid />
      <LatestArticles />
      <FeaturedResources />
      <TestimonialsSection />
      <CTABanner />
      <NewsletterSection />
    </PageLayout>
  );
}
