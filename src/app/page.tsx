import React from "react";
import ShowcaseViewport from "@/components/ShowcaseViewport";
import SkillsInstalled from "@/components/SkillsInstalled";
import { Box, Sparkles, ArrowRight, Terminal, Compass, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/70 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white">Dimension3D</span>
              <span className="ml-2 text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
                v1.0 Base
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Tailwind v4 • Turbopack</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-6 sm:pt-16">
          {/* Subtle Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ready for 3D Shoes, Rings, & Luxury Product Showcases</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
              Interactive 3D Showcase <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Engine & Portfolio Foundation
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Powered by the latest Next.js 16, Tailwind CSS v4, React 19, and React Three Fiber v9. Built to create unforgettable 3D product experiences.
            </p>
          </div>
        </section>

        {/* 3D Viewport Experience */}
        <ShowcaseViewport />

        {/* Saved Skills & Architectural Foundations */}
        <SkillsInstalled />

        {/* Next Steps / Developer Quick Guide */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 sm:p-10 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              Ready for Your 3D Models
            </h3>
            <p className="text-sm text-zinc-400 max-w-3xl mb-6">
              To showcase your custom 3D products (such as shoes, rings, or sneakers), simply place your compressed <code className="text-indigo-300 font-mono">.glb</code> or <code className="text-indigo-300 font-mono">.gltf</code> models into <code className="text-indigo-300 font-mono">public/models/</code>. The active <code className="text-indigo-300 font-mono">r3f-loaders</code> skill guides the asset pipeline with automatic caching and zero memory leaks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80">
                <span className="text-indigo-400 font-semibold block mb-1">01. Place Models</span>
                <span className="text-zinc-500">public/models/shoe.glb or ring.glb</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80">
                <span className="text-indigo-400 font-semibold block mb-1">02. Load with useGLTF</span>
                <span className="text-zinc-500">Preload with Suspense & Draco</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80">
                <span className="text-indigo-400 font-semibold block mb-1">03. Custom Lighting</span>
                <span className="text-zinc-500">Studio HDRI & PBR materials</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-8 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Base Project Configured • Ready for 3D Product Development</span>
          </div>
          <span>Next.js 16 + Tailwind CSS v4 + React Three Fiber v9</span>
        </div>
      </footer>
    </div>
  );
}
