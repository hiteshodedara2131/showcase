import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { getSeoPage, getAllSeoSlugs, SEO_PAGES } from "@/data/seoPages";
import {
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Layers,
  ChevronRight,
  Cpu,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface SeoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) {
    return {
      title: "Tool Not Found — Showcase 3D Web Studio",
    };
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
      url: `https://showcase-3d.com/tools/${page.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function ToolSeoPage({ params }: SeoPageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) {
    notFound();
  }

  const otherTools = SEO_PAGES.filter((p) => p.slug !== page.slug).slice(0, 4);

  // Structured JSON-LD Schema: WebApplication + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: page.headline,
        description: page.subtitle,
        applicationCategory: "DesignApplication",
        operatingSystem: "WebBrowser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-14 sm:py-20 border-b border-border-hairline bg-surface-container-low/40 relative overflow-hidden">
          <div className="container-atelier max-w-4xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-outline mb-6">
              <Link href="/" className="hover:text-on-surface transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/tools/3d-model-viewer" className="hover:text-on-surface transition-colors">
                Tools
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-on-surface truncate">{page.badge}</span>
            </nav>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                {page.badge}
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface leading-[1.15]">
              {page.headline}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              {page.subtitle}
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
              <Link
                href={page.ctaUrl}
                className="px-6 py-3 rounded-[3px] bg-primary text-white font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-md"
              >
                <span>{page.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/editor"
                className="px-5 py-3 rounded-[3px] border border-border-hairline bg-surface hover:bg-surface-container text-on-surface transition-colors"
              >
                Open 3D Studio
              </Link>
            </div>

            {/* Quick Spec Ribbon */}
            <div className="mt-10 pt-6 border-t border-border-hairline grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Zap className="w-4 h-4 text-primary" />
                <span>60 FPS WebGL</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% In-Browser Privacy</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Cpu className="w-4 h-4 text-primary" />
                <span>Zero Installation</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>ACES Tone Mapping</span>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="py-14 sm:py-18 border-b border-border-hairline">
          <div className="container-atelier max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <Layers className="w-4 h-4 text-primary" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface">
                Key Architectural Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {page.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg border border-border-hairline bg-surface-container-low hover:border-primary/40 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl text-primary mb-3 block">
                    {feat.icon}
                  </span>
                  <h3 className="font-headline text-lg font-bold text-on-surface mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications Table */}
        <section className="py-14 sm:py-18 border-b border-border-hairline bg-surface-container-low/30">
          <div className="container-atelier max-w-4xl">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface mb-6">
              Technical Specifications & System Profile
            </h2>

            <div className="rounded-md border border-border-hairline bg-surface overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface-container-high text-on-surface-variant border-b border-border-hairline">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Parameter / Architecture</th>
                    <th className="py-3 px-4 font-semibold">Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-hairline/60">
                  {page.specifications.map((spec, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-3 px-4 text-on-surface-variant font-medium">{spec.label}</td>
                      <td className="py-3 px-4 text-on-surface font-semibold">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Benefits & Use Cases */}
        <section className="py-14 sm:py-18 border-b border-border-hairline">
          <div className="container-atelier max-w-4xl">
            {page.benefits.map((b, bIdx) => (
              <div key={bIdx} className="space-y-4">
                <h2 className="font-headline text-2xl font-bold text-on-surface">
                  {b.title}
                </h2>
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {b.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-3 p-4 rounded-md border border-border-hairline bg-surface-container-low"
                    >
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-on-surface leading-relaxed">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-14 sm:py-18 border-b border-border-hairline bg-surface-container-low/30">
          <div className="container-atelier max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <HelpCircle className="w-4 h-4 text-primary" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {page.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-5 rounded-lg border border-border-hairline bg-surface"
                >
                  <h3 className="font-headline text-base font-bold text-on-surface mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other 3D Tools Navigation */}
        <section className="py-14">
          <div className="container-atelier max-w-4xl">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface mb-6">
              Explore Related 3D Web Studio Solutions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {otherTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="p-4 rounded-md border border-border-hairline bg-surface-container-low hover:border-primary/50 transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-mono text-primary font-semibold block mb-1">
                      {tool.badge}
                    </span>
                    <h4 className="font-headline text-xs font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      {tool.headline}
                    </h4>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-outline group-hover:text-primary transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Conversion Banner */}
        <section className="py-14 border-t border-border-hairline bg-surface-container-low/80">
          <div className="container-atelier max-w-3xl text-center">
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface">
              Ready to Experience Physical 3D on the Web?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-xl mx-auto">
              Launch our live 3D specimen stage or open the full 3D studio editor to test real-time PBR material shaders, calibrated studio lighting, and instant 4K cutouts.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
              <Link
                href="/editor"
                className="px-6 py-3 rounded-[3px] bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-md"
              >
                Open 3D Studio Editor
              </Link>
              <Link
                href="/#stage-section"
                className="px-6 py-3 rounded-[3px] border border-border-hairline bg-surface hover:bg-surface-container text-on-surface transition-colors"
              >
                Go to 3D Viewport Stage
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
