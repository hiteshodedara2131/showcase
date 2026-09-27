"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Sparkles,
  Box,
  Palette,
  Sliders,
  RotateCw,
  Layers,
  ChevronRight,
  ExternalLink,
  Code2,
  Cpu,
  Eye,
  CheckCircle2,
} from "lucide-react";

// Dynamic import with SSR disabled for WebGL canvas
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-3">
      <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-widest font-mono">Initializing 3D Engine...</span>
    </div>
  ),
});

type ModelType = "torus" | "sphere" | "ring" | "gem";

const COLOR_PRESETS = [
  { name: "Cyber Violet", hex: "#8b5cf6" },
  { name: "Neon Emerald", hex: "#10b981" },
  { name: "Solar Amber", hex: "#f59e0b" },
  { name: "Rose Quartz", hex: "#f43f5e" },
  { name: "Hyper Blue", hex: "#3b82f6" },
  { name: "Liquid Silver", hex: "#e2e8f0" },
];

export default function ShowcaseViewport() {
  const [model, setModel] = useState<ModelType>("torus");
  const [color, setColor] = useState("#8b5cf6");
  const [wireframe, setWireframe] = useState(false);
  const [roughness, setRoughness] = useState(0.15);
  const [metalness, setMetalness] = useState(0.85);
  const [distortion, setDistortion] = useState(0.4);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Banner / Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
            Next.js 16 (App Router) + Tailwind CSS v4 + React 19 + R3F v9
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive 3D Viewport Ready</span>
        </div>
      </div>

      {/* Main Grid: 3D Stage + Control Inspector */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 3D Canvas Box */}
        <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-black rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl backdrop-blur-xl group">
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 text-xs text-zinc-300">
            <RotateCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Drag to rotate • Scroll to zoom</span>
          </div>

          {/* Quick Model Selector Pills */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-zinc-800">
            {(["torus", "ring", "gem", "sphere"] as ModelType[]).map((m) => (
              <button
                key={m}
                onClick={() => setModel(m)}
                className={`px-3 py-1 text-xs font-medium rounded-lg capitalize transition-all ${
                  model === m
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* R3F Canvas Container */}
          <Scene3D
            currentModel={model}
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            distortion={distortion}
          />

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-xs text-zinc-400">
            <span className="font-mono bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md border border-zinc-800/80">
              Mesh: {model.toUpperCase()} | PBR Shader: MeshDistort
            </span>
            <span className="font-mono bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md border border-zinc-800/80">
              WebGL 2.0 • 60 FPS
            </span>
          </div>
        </div>

        {/* Right Side: Material Inspector & Studio Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-200">
                PBR Material Inspector
              </h2>
            </div>

            <div className="space-y-5 mt-5">
              {/* Color Presets */}
              <div>
                <label className="text-xs font-medium text-zinc-400 flex items-center justify-between mb-2.5">
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-zinc-400" />
                    Color Palette
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500">{color}</span>
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.hex}
                      onClick={() => setColor(p.hex)}
                      title={p.name}
                      style={{ backgroundColor: p.hex }}
                      className={`h-8 rounded-lg transition-transform hover:scale-110 relative ${
                        color === p.hex ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-105" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-3.5 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>Distortion Wave</span>
                    <span className="font-mono">{distortion.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={distortion}
                    onChange={(e) => setDistortion(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>Metalness</span>
                    <span className="font-mono">{metalness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={metalness}
                    onChange={(e) => setMetalness(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>Roughness</span>
                    <span className="font-mono">{roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs font-medium flex items-center justify-between transition-colors ${
                    wireframe
                      ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-300"
                      : "bg-zinc-800/50 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    Toggle Wireframe Geometry
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40">
                    {wireframe ? "ON" : "OFF"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Model Details Card */}
          <div className="bg-gradient-to-br from-indigo-950/40 via-zinc-900/60 to-zinc-950/80 border border-indigo-900/30 rounded-3xl p-6 backdrop-blur-xl">
            <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5" /> Model Pipeline Ready
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Equipped with <code className="text-indigo-300 font-mono">r3f-loaders</code> and{" "}
              <code className="text-indigo-300 font-mono">r3f-fundamentals</code>. Ready to import your 3D product models (GLTF/GLB shoes, rings, luxury goods) with Draco compression & cache retention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
