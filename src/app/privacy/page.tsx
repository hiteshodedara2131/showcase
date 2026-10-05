import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Showcase 3D Web Studio",
  description:
    "Showcase 3D Web Studio's privacy policy. Learn how we handle client data and our strict commitment to zero cloud storage for your 3D assets.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <Header />

      <main id="main-content" className="flex-1 py-14 sm:py-20">
        <div className="container-atelier max-w-3xl space-y-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Legal & Data Protection
              </span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs font-mono text-outline">
              Last Updated & Effective: September 27, 2026
            </p>
          </div>

          {/* Privacy Highlight Card */}
          <div className="p-5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              <Lock className="w-4 h-4" />
              <span>CORE COMMITMENT: ZERO CLOUD RETENTION OF 3D MODELS</span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
              When you drop or upload a 3D model (.glb or .gltf) into our viewer or editor, the file is parsed and rendered entirely inside your browser&apos;s local WebGL memory and IndexedDB. Your proprietary 3D CAD files are never transmitted to, inspected by, or stored on external cloud servers.
            </p>
          </div>

          <div className="space-y-8 text-sm text-on-surface-variant leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                1. Information We Collect
              </h2>
              <p>
                Showcase 3D Web Studio adheres to data minimization principles. We only collect the minimal information necessary to deliver our WebGL viewing and configuration tools:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Local Session Data:</strong> User-selected camera positions, material presets, and active colorways stored in your browser&apos;s local storage.</li>
                <li><strong>Voluntary Contact Submissions:</strong> Your name, email address, and inquiry details submitted through our contact form.</li>
                <li><strong>Anonymous Telemetry:</strong> High-level hardware capability metrics (such as WebGL 2.0 support and approximate frame rates) to ensure smooth cross-browser performance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                2. How Your 3D Models Are Handled
              </h2>
              <p>
                Unlike traditional cloud render farms, Showcase 3D Studio utilizes pure client-side WebGL acceleration. When you load a model:
              </p>
              <p>
                • Binary array buffers decode into GPU VRAM via standard browser APIs.<br />
                • The model remains sandboxed within your local browser process.<br />
                • Closing your browser tab or clearing browser cache immediately purges all model data from memory.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                3. Cookies & Local Storage
              </h2>
              <p>
                We do not deploy third-party advertising cookies or cross-site tracking scripts. We utilize strictly necessary local storage keys for interface themes (light/dark mode) and IndexedDB memory storage to allow fluid transitions between the hero dropzone and 3D studio editor.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                4. GDPR & CCPA Compliance
              </h2>
              <p>
                If you are a resident of the European Economic Area (EEA) or California, you retain complete rights to access, rectify, or request deletion of any personal data submitted via our contact forms. To exercise your rights, email us at <span className="font-mono text-primary font-semibold">privacy@showcase-3d.com</span>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                5. Changes to This Policy
              </h2>
              <p>
                We may periodically update this policy to reflect enhancements in WebGL security or legal requirements. Material updates will be highlighted directly on this page.
              </p>
            </section>
          </div>

          <div className="pt-8 border-t border-border-hairline flex items-center justify-between text-xs font-mono">
            <Link href="/" className="text-primary hover:underline">
              ← Return to Home
            </Link>
            <Link href="/terms" className="text-outline hover:text-on-surface">
              Terms of Service →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
