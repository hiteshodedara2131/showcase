import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { BLOG_POSTS } from "@/data/blogs";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "3D WebGL & PBR Materials Blog — Showcase 3D Web Studio",
  description:
    "In-depth technical guides, material science, WebGL optimization, and design case studies for real-time 3D product visualization and commerce.",
  openGraph: {
    title: "3D WebGL & PBR Materials Blog — Showcase 3D Web Studio",
    description:
      "Explore real-time 3D product visualization, glTF optimization, PBR shaders, and commercial studio lighting guides.",
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="py-14 sm:py-20 border-b border-border-hairline bg-surface-container-low/40 relative overflow-hidden">
          <div className="container-atelier relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Articles & Technical Guides
              </span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface max-w-3xl leading-[1.15]">
              Real-Time 3D, WebGL Shaders & Spatial Commerce
            </h1>
            <p className="mt-4 text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
              Explore deep dives into glTF optimization, dielectric footwear PBR materials, ACES filmic tone mapping, and high-performance WebGL graphics pipelines.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12 border-b border-border-hairline">
          <div className="container-atelier">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface">
                Featured Editorial
              </span>
            </div>

            <div className="p-6 sm:p-8 rounded-lg border border-border-hairline bg-surface-container-low hover:border-primary/50 transition-colors group">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-outline mb-3">
                <span className="px-2 py-0.5 rounded-xs bg-primary/10 text-primary font-semibold">
                  {featuredPost.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readTime}
                </span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>

              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface group-hover:text-primary transition-colors">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed max-w-3xl">
                {featuredPost.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-hairline/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/15 text-primary font-mono text-xs font-semibold flex items-center justify-center">
                    {featuredPost.author.avatar}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-on-surface block leading-tight">
                      {featuredPost.author.name}
                    </span>
                    <span className="text-[10px] font-mono text-outline block leading-tight">
                      {featuredPost.author.role}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary group-hover:underline"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* All Articles Grid */}
        <section className="py-14">
          <div className="container-atelier">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface">
                  All Technical Publications ({BLOG_POSTS.length})
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col justify-between p-5 sm:p-6 rounded-lg border border-border-hairline bg-surface-container-low hover:border-primary/40 hover:bg-surface-container transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-outline mb-2.5">
                      <span className="px-2 py-0.5 rounded-xs bg-surface-container-high text-on-surface-variant font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h4 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>

                    <p className="mt-2.5 text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-hairline/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-outline font-mono">
                        By {post.author.name}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary font-mono text-xs font-semibold flex items-center gap-1 group-hover:underline"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Interactive CTA */}
        <section className="py-14 border-t border-border-hairline bg-surface-container-low/60">
          <div className="container-atelier text-center max-w-2xl">
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface">
              Put Shaders & Lighting Into Practice
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Explore the live 3D specimen stage or launch the full 3D studio editor to test PBR materials, tone mapping, and custom GLB model inspection in real time.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
              <Link
                href="/editor"
                className="px-5 py-2.5 rounded-[3px] bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                Launch 3D Studio Editor
              </Link>
              <Link
                href="/#stage"
                className="px-5 py-2.5 rounded-[3px] border border-border-hairline bg-surface hover:bg-surface-container text-on-surface transition-colors"
              >
                View Live 3D Specimen Stage
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
