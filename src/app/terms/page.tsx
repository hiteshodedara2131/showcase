import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — Showcase 3D Web Studio",
  description:
    "Review the terms and conditions governing the use of Showcase 3D Web Studio's browser-based viewer and material editor.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <Header />

      <main id="main-content" className="flex-1 py-14 sm:py-20">
        <div className="container-atelier max-w-3xl space-y-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Legal Agreement
              </span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
              Terms of Service
            </h1>
            <p className="mt-2 text-xs font-mono text-outline">
              Last Updated & Effective: September 27, 2026
            </p>
          </div>

          <div className="space-y-8 text-sm text-on-surface-variant leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using Showcase 3D Web Studio (&quot;the Service&quot;), including our 3D model viewer, material shader lab, and product editor, you agree to be bound by these Terms of Service. If you disagree with any portion of these terms, you must discontinue use immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                2. Ownership of Your 3D Assets & Intellectual Property
              </h2>
              <p>
                <strong>You retain 100% full, exclusive intellectual property ownership</strong> of any 3D models, textures, or CAD files you load into the Service. Showcase 3D Studio claims no license, copyright, or ownership over your proprietary designs. Because models are processed locally in your client device&apos;s WebGL memory, we never copy, index, or distribute your intellectual property.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                3. Permitted Commercial Use of 4K Exports
              </h2>
              <p>
                All 4K transparent PNG cutouts, configuration snapshots, and marketing renders exported from our 3D Studio editor are your property. You are granted royalty-free, commercial rights to use these exported images in your e-commerce storefronts, advertising campaigns, lookbooks, and pitch presentations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                4. Prohibited Uses
              </h2>
              <p>
                When using the Service, you agree not to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Attempt to reverse-engineer, decompile, or extract proprietary WebGL shader routines for malicious redistribution.</li>
                <li>Upload 3D assets that infringe upon third-party copyrights, trademarks, or trade secrets.</li>
                <li>Conduct denial-of-service attacks or inject malicious payloads into model buffer readers.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                5. Disclaimer of Warranties & Limitation of Liability
              </h2>
              <p>
                The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. While our engine strives for maximum hardware compatibility and 60 FPS performance, we do not warrant that all legacy GPU chipsets or non-standard 3D formats will render without visual artifacts. In no event shall Showcase 3D Studio be liable for indirect, incidental, or consequential damages resulting from model rendering errors.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                6. Contact Information
              </h2>
              <p>
                For questions regarding these Terms of Service, contact our legal department at <span className="font-mono text-primary font-semibold">legal@showcase-3d.com</span>.
              </p>
            </section>
          </div>

          <div className="pt-8 border-t border-border-hairline flex items-center justify-between text-xs font-mono">
            <Link href="/" className="text-primary hover:underline">
              ← Return to Home
            </Link>
            <Link href="/privacy" className="text-outline hover:text-on-surface">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
