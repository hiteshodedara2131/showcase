import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Showcase 3D Web Studio",
  description:
    "Get in touch with the Showcase 3D Web Studio engineering team. We help brands embed WebGL viewers, configure 3D customizers, and prepare CAD/GLB models for the browser.",
  openGraph: {
    title: "Contact — Showcase 3D Web Studio",
    description:
      "Reach the WebGL engineering team behind Showcase 3D Studio for embeds, customizers, and pipeline support.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Header Section */}
        <section className="py-14 sm:py-20 border-b border-border-hairline bg-surface-container-low/40 relative overflow-hidden">
          <div className="container-atelier max-w-4xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Get in Touch
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface leading-[1.15]">
              Contact Showcase 3D Web Studio
            </h1>

            <p className="mt-4 text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              Have questions about embedding our WebGL 3D viewer, configuring custom shoe configurators, or preparing your CAD/GLB models? We are here to help.
            </p>
          </div>
        </section>

        {/* Contact Form & Studio Info (client form) */}
        <section className="py-14 sm:py-18 border-b border-border-hairline">
          <div className="container-atelier max-w-4xl">
            <ContactForm />
          </div>
        </section>

        {/* FAQs */}
        <section className="py-14 sm:py-18 bg-surface-container-low/30">
          <div className="container-atelier max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface">
                Contact &amp; Support Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-lg border border-border-hairline bg-surface">
                <h3 className="font-headline text-sm font-bold text-on-surface mb-1.5">
                  Can you help optimize our brand&apos;s existing 3D models?
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Yes. We assist brands with glTF decimation, Draco/Meshopt compression, 16-bit normal baking, and dielectric PBR material calibration for 60 FPS web delivery.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-border-hairline bg-surface">
                <h3 className="font-headline text-sm font-bold text-on-surface mb-1.5">
                  Do you offer white-label 3D customizer integrations?
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Yes. Our modular architecture allows seamless embedding into Shopify, headless Next.js, Webflow, and custom enterprise e-commerce portals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
