import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Showcase 3D Web Studio — Real-Time Spatial Commerce",
  description:
    "Showcase 3D Web Studio builds high-performance browser-based 3D model viewers and real-time PBR material editors for modern digital products.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="py-14 sm:py-20 border-b border-border-hairline bg-surface-container-low/40 relative overflow-hidden">
          <div className="container-atelier max-w-4xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                About Showcase Studio
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface leading-[1.15]">
              Physical Fidelity on the Open Web
            </h1>

            <p className="mt-4 text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              We bridge the gap between high-end desktop CAD rendering and instantaneous, 60 FPS browser-based spatial interaction.
            </p>
          </div>
        </section>

        {/* Mission & Story */}
        <section className="py-14 sm:py-18 border-b border-border-hairline">
          <div className="container-atelier max-w-4xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">
                  Why 3D Belongs in Every Browser
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  For decades, inspecting real 3D products meant installing gigabytes of specialized software, waiting hours in offline render queues, or settling for flat, uninspiring 2D photograph carousels.
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Showcase 3D Web Studio reimagines this experience. Utilizing WebGL 2.0, Three.js r186, and physically based rendering optics, we make complex 3D assets render at 60 FPS in milliseconds—directly inside standard mobile and desktop browsers.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border-hairline bg-surface-container-low space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>CORE ENGINEERING PILLARS</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-on-surface">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>100% In-Browser Privacy:</strong> Models process strictly in local memory with zero server storage.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Dielectric Physical Realism:</strong> No fake chrome or metallic steel look on organic leather and canvas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Instant 60 FPS Performance:</strong> Clamped DPR, optimized shadow maps, and lean glTF asset delivery.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Architecture */}
        <section className="py-14 sm:py-18 border-b border-border-hairline bg-surface-container-low/30">
          <div className="container-atelier max-w-4xl">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface mb-8">
              Technical Stack & Rendering Engine
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-md border border-border-hairline bg-surface">
                <Cpu className="w-5 h-5 text-primary mb-2.5" />
                <h3 className="font-headline text-base font-bold text-on-surface mb-1">
                  WebGL 2.0 & Three.js
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Built on modern Three.js r186 with hardware-accelerated vertex buffers and programmable PBR fragment shaders.
                </p>
              </div>

              <div className="p-5 rounded-md border border-border-hairline bg-surface">
                <Zap className="w-5 h-5 text-primary mb-2.5" />
                <h3 className="font-headline text-base font-bold text-on-surface mb-1">
                  Next.js 16 & Turbopack
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Lightning-fast static generation, edge caching, and server-side rendering for optimal Core Web Vitals and SEO.
                </p>
              </div>

              <div className="p-5 rounded-md border border-border-hairline bg-surface">
                <ShieldCheck className="w-5 h-5 text-primary mb-2.5" />
                <h3 className="font-headline text-base font-bold text-on-surface mb-1">
                  IndexedDB Streaming
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Persistent local model storage up to 100MB allows smooth seamless transitions between the Hero dropzone and Studio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive CTA */}
        <section className="py-14 text-center">
          <div className="container-atelier max-w-2xl">
            <h2 className="font-headline text-2xl font-bold text-on-surface">
              Explore Our Live Viewports
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Test out the Air Jordan 1 Low Dior, Vans Old Skool, and Waffle Runner models directly on the live stage.
            </p>
            <div className="mt-6 flex justify-center gap-3 font-mono text-xs">
              <Link
                href="/editor"
                className="px-6 py-3 rounded-[3px] bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                Launch 3D Studio Editor
              </Link>
              <Link
                href="/#stage"
                className="px-6 py-3 rounded-[3px] border border-border-hairline bg-surface hover:bg-surface-container text-on-surface transition-colors"
              >
                View 3D Stage
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
