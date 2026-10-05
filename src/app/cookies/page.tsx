import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Cookie, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie & Local Storage Policy — Showcase 3D Web Studio",
  description:
    "Learn how Showcase 3D Web Studio utilizes strictly necessary local storage and IndexedDB for 3D model streaming with zero third-party tracking.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <Header />

      <main id="main-content" className="flex-1 py-14 sm:py-20">
        <div className="container-atelier max-w-3xl space-y-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Storage Transparency
              </span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
              Cookie & Local Storage Policy
            </h1>
            <p className="mt-2 text-xs font-mono text-outline">
              Last Updated: September 27, 2026
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border-hairline bg-surface-container-low space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>NO THIRD-PARTY TRACKING COOKIES</span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
              Showcase 3D Web Studio does not deploy advertising cookies, tracking pixels, or cross-site fingerprinting scripts. We strictly use modern HTML5 Web Storage APIs solely to make 3D model visualization fast and seamless.
            </p>
          </div>

          <div className="space-y-8 text-sm text-on-surface-variant leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                1. What Technologies We Use
              </h2>
              <p>
                Rather than relying on legacy HTTP cookies, our application utilizes modern browser client storage:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong>IndexedDB:</strong> A high-capacity local database inside your browser used to temporarily hold 3D model files (up to 100MB) when you drag and drop a GLB into the hero section dropzone, enabling seamless passing into the 3D Studio editor without network upload delays.
                </li>
                <li>
                  <strong>localStorage:</strong> Stores your active theme preference (dark/light mode) and interface drawer toggle states so your workspace setup persists between visits.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                2. How to Clear Local 3D Data
              </h2>
              <p>
                You maintain total control over your local browser memory at all times:
              </p>
              <p>
                • Clicking &quot;Reset&quot; inside the 3D Studio clears the active model and purges the IndexedDB buffer.<br />
                • Clearing your browser&apos;s site data or history immediately removes all cached 3D assets and local storage keys.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                3. Questions & Contact
              </h2>
              <p>
                For technical questions regarding our client storage architecture, email <span className="font-mono text-primary font-semibold">engineering@showcase-3d.com</span>.
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
