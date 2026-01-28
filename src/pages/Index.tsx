import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { RedesignShowcase } from "@/components/home/RedesignShowcase";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TrustBuilders } from "@/components/home/TrustBuilders";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <TrustBuilders />
      <RedesignShowcase />
      <TestimonialsSection />
      <AboutPreview />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
