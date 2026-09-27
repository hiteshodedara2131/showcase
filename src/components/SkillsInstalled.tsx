"use client";

import React from "react";
import { CheckCircle2, Sparkles, BookOpen, Layers, Zap, ShieldCheck } from "lucide-react";

const SKILLS = [
  {
    name: "frontend-design",
    creator: "Anthropic",
    purpose: "Distinctive Visual Direction & Bespoke Art Direction",
    description: "Guides aesthetic palettes, typography systems, layout individuality, and avoids template clichés.",
    color: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30",
    badge: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    name: "react-best-practices",
    creator: "Vercel Engineering",
    purpose: "High-Performance Next.js & React 19 Patterns",
    description: "Contains 70+ in-depth rules for zero unnecessary re-renders, bundle size minimization, and async streaming.",
    color: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/30",
    badge: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    name: "web-design-guidelines",
    creator: "Vercel",
    purpose: "Usability, Accessibility & Polish Audits",
    description: "Design review checklist for contrast, responsive touch targets, keyboard navigation, and polish.",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    name: "r3f-fundamentals",
    creator: "EnzeD Community",
    purpose: "R3F Scene Architecture & Render Loop",
    description: "Canvas configuration, memory cleanup, frameloop management, and typed Three.js scene primitives.",
    color: "from-purple-500/20 to-indigo-500/10",
    border: "border-purple-500/30",
    badge: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    name: "r3f-loaders",
    creator: "EnzeD Community",
    purpose: "3D Asset Pipeline, GLB/GLTF & DRACO Loading",
    description: "Specialized for shoe, jewelry & product models with useGLTF, preloading, clone management, and cache lifecycles.",
    color: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/30",
    badge: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
];

export default function SkillsInstalled() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-mono mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Active Agent Skill Suite Loaded</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Configured Skills & Architectural Foundations
        </h2>
        <p className="mt-3 text-sm text-zinc-400 max-w-2xl">
          Saved in <code className="text-zinc-200 font-mono">.agents/skills/</code> and{" "}
          <code className="text-zinc-200 font-mono">~/.gemini/config/skills/</code>. Ready to guide all upcoming 3D product showcase development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILLS.map((s) => (
          <div
            key={s.name}
            className={`p-6 rounded-3xl border bg-gradient-to-br ${s.color} ${s.border} backdrop-blur-xl flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-xl`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${s.badge}`}>
                  {s.creator}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">{s.name}</h3>
              <p className="text-xs font-medium text-zinc-300 mt-1">{s.purpose}</p>
              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">{s.description}</p>
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Status: Active</span>
              <span>Loaded in workspace</span>
            </div>
          </div>
        ))}

        {/* 6th Card: Tech Stack Snapshot */}
        <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border text-indigo-400 bg-indigo-500/10 border-indigo-500/20">
                Core Stack
              </span>
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
            <h3 className="text-base font-semibold text-white tracking-tight">Next.js 16 + Tailwind v4</h3>
            <p className="text-xs font-medium text-zinc-300 mt-1">Turbopack & Modern CSS Engine</p>
            <ul className="text-xs text-zinc-400 mt-3 space-y-1.5 font-mono">
              <li>• Next.js: v16.3.6 (Turbopack)</li>
              <li>• React: v19.2.8</li>
              <li>• Tailwind CSS: v4 (@import &quot;tailwindcss&quot;)</li>
              <li>• Three.js: v0.186.1</li>
              <li>• React Three Fiber: v9.8.1</li>
            </ul>
          </div>
          <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-emerald-400">
            <span>Turbopack Ready</span>
            <span>Zero Config v4</span>
          </div>
        </div>
      </div>
    </section>
  );
}
