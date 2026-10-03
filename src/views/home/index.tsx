import React from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { HomeHeroSection } from "./sections/HomeHeroSection";
import { ModelStageSection } from "./sections/ModelStageSection";
import { CuratedWorkSection } from "./sections/CuratedWorkSection";
import { CoreMechanicsSection } from "./sections/CoreMechanicsSection";
import { EnterpriseSection } from "./sections/EnterpriseSection";
import { ContactCtaSection } from "./sections/ContactCtaSection";

export default function HomeView() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col selection:bg-primary selection:text-on-primary-container">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Section 1: Hero Section with 100MB 3D Model Dropzone */}
        <HomeHeroSection />

        {/* Section 2: Dedicated Interactive 3D Viewport Stage */}
        <ModelStageSection />

        {/* Section 3: Curated 3D Studio Showcase Presets */}
        <CuratedWorkSection />

        {/* Section 4: 3D Model Editing Capabilities */}
        <CoreMechanicsSection />

        {/* Section 5: Engine Architecture & Standards */}
        <EnterpriseSection />

        {/* Section 6: Launch CTA */}
        <ContactCtaSection />
      </main>

      <Footer />
    </div>
  );
}
