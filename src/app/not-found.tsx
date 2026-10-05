import React from "react";
import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found · Showcase 3D Web Studio",
  description: "The requested page could not be located. Return to the studio or jump to a working surface.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      <main id="main-content" className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-2xl w-full text-center py-16 sm:py-24">
          {/* Architectural mark */}
          <div className="inline-flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-widest text-outline">
            <span className="w-8 h-px bg-primary" />
            <span>Error · 404 · Not Found</span>
            <span className="w-8 h-px bg-primary" />
          </div>

          {/* Big numeric display */}
          <h1 className="font-headline text-7xl sm:text-8xl lg:text-[140px] font-bold text-on-surface leading-none tracking-tighter">
            4<span className="text-primary">0</span>4
          </h1>

          <p className="mt-6 text-base sm:text-lg text-on-surface max-w-md mx-auto leading-relaxed">
            The spatial surface you requested could not be located in this studio.
            It may have been renamed, removed, or never existed.
          </p>

          {/* Quick links */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto font-mono text-xs">
            <Link
              href="/"
              className="flex items-center justify-between gap-2 p-4 rounded-sm bg-surface-container-low border border-border-hairline hover:border-primary transition-colors text-left"
            >
              <span className="flex items-center gap-2 text-on-surface">
                <Home className="w-3.5 h-3.5 text-primary" />
                <span>Return to Home</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-outline" />
            </Link>
            <Link
              href="/editor"
              className="flex items-center justify-between gap-2 p-4 rounded-sm bg-surface-container-low border border-border-hairline hover:border-primary transition-colors text-left"
            >
              <span className="flex items-center gap-2 text-on-surface">
                <Search className="w-3.5 h-3.5 text-primary" />
                <span>Open 3D Studio</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-outline" />
            </Link>
          </div>

          {/* Diagnostic strip */}
          <div className="mt-10 pt-6 border-t border-border-hairline font-mono text-[10px] uppercase tracking-widest text-outline">
            <span>STUDIO · ATELIER · v0.1.0</span>
            <span className="mx-2">·</span>
            <span>Coordinate (0, 0, 0)</span>
          </div>
        </div>
      </main>
    </div>
  );
}
