import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { getBlogPost, getAllBlogSlugs, BLOG_POSTS } from "@/data/blogs";
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found — Showcase 3D Web Studio",
    };
  }

  return {
    title: `${post.title} — Showcase 3D Studio`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Structured JSON-LD for SEO Article indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Showcase 3D Web Studio",
      url: "https://showcase-3d.com",
    },
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main id="main-content" className="flex-1">
        {/* Article Header & Breadcrumbs */}
        <section className="py-10 sm:py-14 border-b border-border-hairline bg-surface-container-low/40">
          <div className="container-atelier max-w-4xl">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-outline mb-6">
              <Link href="/" className="hover:text-on-surface transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-on-surface transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-on-surface truncate">{post.category}</span>
            </nav>

            {/* Tag & Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4">
              <span className="px-2.5 py-0.5 rounded-xs bg-primary/10 text-primary font-semibold">
                {post.category}
              </span>
              <span className="text-outline">•</span>
              <span className="flex items-center gap-1 text-outline">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="text-outline">•</span>
              <span className="flex items-center gap-1 text-outline">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface leading-[1.15]">
              {post.title}
            </h1>

            {/* Excerpt Lead */}
            <p className="mt-4 text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author Byline */}
            <div className="mt-8 pt-6 border-t border-border-hairline flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 text-primary font-mono text-sm font-semibold flex items-center justify-center">
                  {post.author.avatar}
                </div>
                <div>
                  <span className="text-sm font-semibold text-on-surface block">
                    {post.author.name}
                  </span>
                  <span className="text-xs font-mono text-outline block">
                    {post.author.role}
                  </span>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-[2px] bg-surface-container border border-border-hairline text-on-surface-variant"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Article Body Content */}
        <section className="py-12 sm:py-16">
          <div className="container-atelier max-w-3xl">
            {/* Introduction Lead */}
            <div className="text-base sm:text-lg leading-relaxed text-on-surface/90 font-serif sm:font-sans mb-10 pb-8 border-b border-border-hairline/80">
              {post.content.introduction}
            </div>

            {/* Core Sections */}
            <div className="space-y-12">
              {post.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                    {section.heading}
                  </h2>

                  {section.body.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm sm:text-base leading-relaxed text-on-surface-variant whitespace-pre-line"
                    >
                      {para}
                    </p>
                  ))}

                  {/* Callout Notice */}
                  {section.callout && (
                    <div className="my-6 p-4 rounded-md border-l-4 border-primary bg-surface-container-low border border-border-hairline">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="font-mono text-xs font-semibold text-primary uppercase">
                          {section.callout.title}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  )}

                  {/* Code Snippet */}
                  {section.codeSnippet && (
                    <div className="my-6 rounded-md border border-border-hairline bg-surface-container-lowest overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-surface-container-high border-b border-border-hairline text-[11px] font-mono text-outline">
                        <span>{section.codeSnippet.language}</span>
                        <span>Terminal / Source</span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-on-surface overflow-x-auto leading-relaxed">
                        <code>{section.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="mt-12 p-6 rounded-lg bg-surface-container-low border border-border-hairline">
              <h3 className="font-headline text-lg font-bold text-on-surface mb-2">
                Summary & Key Takeaway
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {post.content.conclusion}
              </p>
            </div>

            {/* Back to Blog Button */}
            <div className="mt-10 pt-6 border-t border-border-hairline flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Publications</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles Carousel / Grid */}
        <section className="py-14 border-t border-border-hairline bg-surface-container-low/30">
          <div className="container-atelier max-w-4xl">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface mb-6">
              Related Technical Reads
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.slug}
                  className="p-4 rounded-md border border-border-hairline bg-surface-container-low hover:border-primary/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-outline block mb-1">
                      {rel.category} • {rel.readTime}
                    </span>
                    <h4 className="font-headline text-sm font-bold text-on-surface hover:text-primary transition-colors leading-snug">
                      <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                  </div>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="mt-4 text-[11px] font-mono font-semibold text-primary inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive CTA to 3D Customizer */}
        <section className="py-12 border-t border-border-hairline bg-surface-container-low/80">
          <div className="container-atelier max-w-2xl text-center">
            <h3 className="font-headline text-2xl font-bold text-on-surface">
              Test These Principles in the 3D Studio
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-on-surface-variant">
              Apply dielectric PBR shaders, calibrate 5500K studio lights, and inspect 3D models at 60 FPS in our live browser editor.
            </p>
            <div className="mt-5 flex justify-center gap-3 font-mono text-xs">
              <Link
                href="/editor"
                className="px-5 py-2.5 rounded-[3px] bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                Launch 3D Studio Editor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
