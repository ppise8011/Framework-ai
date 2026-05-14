// src/app/page.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingSection } from "@/components/landing/PricingSection";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <PricingSection />
      <Footer />
    </main>
  );
}