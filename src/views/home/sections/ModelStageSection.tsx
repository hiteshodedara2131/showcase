"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  RotateCw,
  SlidersHorizontal,
  X,
  ArrowRight,
  Maximize2,
  Sparkles,
} from "lucide-react";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant gap-3 bg-surface-container">
      <div className="w-9 h-9 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-widest font-mono text-outline">
        Initializing Spatial Viewport...
      </span>
    </div>
  ),
});

type ModelType = "dior_jordan" | "vans_oldskool" | "shoe" | "nike_shoe" | "helmet" | "ring" | "torus";

const COLOR_PRESETS = [
  { name: "Safety Terracotta", hex: "#d9532f" },
  { name: "Platinum Silver", hex: "#e5e2e0" },
  { name: "Carbon Obsidian", hex: "#1a1a19" },
  { name: "Champagne Gold", hex: "#e9c349" },
  { name: "Cyber Emerald", hex: "#4edea3" },
];

const ENVIRONMENT_OPTIONS = [
  { id: "studio" as const, name: "Clean Studio", tag: "5500K" },
  { id: "city" as const, name: "City Lights", tag: "3200K" },
  { id: "dawn" as const, name: "Soft Dawn", tag: "6000K" },
  { id: "sunset" as const, name: "Golden Sunset", tag: "Warm" },
  { id: "apartment" as const, name: "Neutral Interior", tag: "Soft" },
];

const STAGE_CAMERA_ANGLES = [
  {
    id: "cam-front",
    code: "CAM_01",
    name: "Front 3/4 View",
    pos: [2.2, 1.2, 2.6] as [number, number, number],
    target: [0, 0.45, 0] as [number, number, number],
  },
  {
    id: "cam-iso",
    code: "CAM_02",
    name: "Top Isometric",
    pos: [0.1, 3.4, 1.8] as [number, number, number],
    target: [0, 0.45, 0] as [number, number, number],
  },
  {
    id: "cam-macro",
    code: "CAM_03",
    name: "Macro Detail",
    pos: [-1.4, 0.95, -1.9] as [number, number, number],
    target: [-0.3, 0.52, -0.7] as [number, number, number],
  },
  {
    id: "cam-profile",
    code: "CAM_04",
    name: "Lateral Profile",
    pos: [3.4, 0.65, 0.0] as [number, number, number],
    target: [0, 0.45, 0] as [number, number, number],
  },
];

export const ModelStageSection: React.FC = () => {
  // 3D Model & PBR Properties State - Natural leather & footwear defaults (dielectric, non-steel)
  const [model, setModel] = useState<ModelType>("dior_jordan");
  const [color, setColor] = useState("#d9532f");
  const [wireframe, setWireframe] = useState(false);
  const [roughness, setRoughness] = useState(0.72);
  const [metalness, setMetalness] = useState(0.0);
  const [autoRotate] = useState(true);
  const [rotationSpeed] = useState(1);

  // Environment & Camera State
  const [activeEnv, setActiveEnv] = useState<"studio" | "city" | "dawn" | "sunset" | "apartment">("studio");
  const [activeCam, setActiveCam] = useState(STAGE_CAMERA_ANGLES[0]);
  const [activeTool, setActiveTool] = useState<"orbit" | "pan" | "zoom">("orbit");

  // Sidebar Inspector Open/Close
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section
      id="stage"
      className="container-atelier py-12 sm:py-16 md:py-20 border-t border-outline-variant/30 relative max-w-full overflow-hidden scroll-mt-20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
              Live 3D Viewport Stage
            </span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-on-surface font-bold tracking-tight">
            Interactive Specimen Viewer &amp; Shader Lab
          </h2>
        </div>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-md leading-relaxed">
          Full 360° orbit mechanics, calibrated HDRI studio lighting, and organic PBR material shaders with natural leather, canvas, and rubber response.
        </p>
      </div>

      {/* Specimen Switcher & Environment Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-3 bg-surface-container-low p-2 rounded-[4px] border border-border-hairline text-xs font-mono">
        {/* Model Switcher Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-outline uppercase text-[10px] mr-1 hidden lg:inline">SPECIMEN:</span>
          {[
            { id: "dior_jordan" as const, label: "Air Jordan 1 Low Dior", tag: "LUXURY" },
            { id: "vans_oldskool" as const, label: "Vans Old Skool", tag: "CLASSIC" },
            { id: "shoe" as const, label: "Waffle Runner V2", tag: "STUDIO" },
            { id: "nike_shoe" as const, label: "Nike Air Retro", tag: "" },
            { id: "helmet" as const, label: "Tactical Helmet", tag: "" },
            { id: "ring" as const, label: "Solitaire Ring", tag: "" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setModel(m.id)}
              className={`px-2.5 py-1 rounded-[2px] border text-xs whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                model === m.id
                  ? "bg-primary text-white border-primary font-semibold shadow-xs"
                  : "bg-surface-container border-border-hairline text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span>{m.label}</span>
              {m.tag && (
                <span className={`text-[8px] font-mono px-1 py-0.2 rounded-xs uppercase ${model === m.id ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                  {m.tag}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Environment Selector Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-outline uppercase text-[10px] mr-1 hidden lg:inline">HDRI:</span>
          {ENVIRONMENT_OPTIONS.map((env) => (
            <button
              key={env.id}
              onClick={() => setActiveEnv(env.id)}
              className={`px-2 py-1 rounded-[2px] border text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                activeEnv === env.id
                  ? "bg-surface-container-highest border-primary text-primary font-semibold"
                  : "bg-surface-container border-border-hairline text-outline hover:text-on-surface"
              }`}
            >
              {env.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Interactive Viewport Stage Canvas */}
      <div className="canvas-viewport-stage rounded-[4px] border border-outline-variant/60 shadow-2xl studio-grid relative overflow-hidden h-[420px] sm:h-[500px] md:h-[560px]">
        {/* Top-Left Instruction HUD */}
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 sm:gap-2 bg-surface-container/85 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-[2px] border border-outline-variant/50 text-[10px] sm:text-xs text-on-surface-variant font-mono select-none">
          <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary animate-spin" style={{ animationDuration: "12s" }} />
          <span className="hidden sm:inline">DRAG TO ORBIT • SCROLL TO ZOOM • PEDESTAL RESTING</span>
          <span className="sm:hidden">ORBIT • ZOOM</span>
        </div>

        {/* Top-Right Control Bar: Properties Inspector Drawer Toggle */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            id="model-inspector-toggle-btn"
            aria-label="Toggle 3D Model Property Inspector Sidebar"
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[3px] border text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider transition-all select-none cursor-pointer shadow-lg active:scale-95 ${
              sidebarOpen
                ? "bg-primary text-white border-primary shadow-primary/30"
                : "bg-surface-container/95 hover:bg-surface-container-high text-on-surface border-outline-variant/70 hover:border-primary backdrop-blur-md hover:shadow-primary/15"
            }`}
          >
            <SlidersHorizontal className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary transition-transform duration-300 ${sidebarOpen ? "rotate-90 text-white" : ""}`} />
            <span className="hidden sm:inline">{sidebarOpen ? "Close Controls" : "Shader Controls"}</span>
            <span className="sm:hidden">{sidebarOpen ? "Close" : "Controls"}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${sidebarOpen ? "bg-white" : "bg-primary animate-pulse"}`} />
          </button>
        </div>

        {/* Floating Left Camera Navigation Toolbar (Tabs for Orbit, Pan, Zoom, Reset) */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col space-y-1 bg-surface/90 backdrop-blur-md p-1 rounded-[3px] border border-border-hairline shadow-sm">
          <button
            onClick={() => setActiveTool("orbit")}
            className={`w-8 h-8 flex items-center justify-center rounded-[2px] transition-colors cursor-pointer ${
              activeTool === "orbit"
                ? "bg-on-surface text-surface shadow-xs"
                : "text-outline hover:text-on-surface hover:bg-surface-container"
            }`}
            title="360 Orbit Mode [1]"
          >
            <span className="material-symbols-outlined text-[17px]">360</span>
          </button>

          <button
            onClick={() => setActiveTool("pan")}
            className={`w-8 h-8 flex items-center justify-center rounded-[2px] transition-colors cursor-pointer ${
              activeTool === "pan"
                ? "bg-on-surface text-surface shadow-xs"
                : "text-outline hover:text-on-surface hover:bg-surface-container"
            }`}
            title="Pan Viewport Mode [2]"
          >
            <span className="material-symbols-outlined text-[17px]">pan_tool</span>
          </button>

          <button
            onClick={() => setActiveTool("zoom")}
            className={`w-8 h-8 flex items-center justify-center rounded-[2px] transition-colors cursor-pointer ${
              activeTool === "zoom"
                ? "bg-on-surface text-surface shadow-xs"
                : "text-outline hover:text-on-surface hover:bg-surface-container"
            }`}
            title="Dolly Zoom Mode [3]"
          >
            <span className="material-symbols-outlined text-[17px]">zoom_in</span>
          </button>

          <div className="h-px bg-border-hairline my-0.5" />

          <button
            onClick={() => {
              setActiveCam(STAGE_CAMERA_ANGLES[0]);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-[2px] text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            title="Fit Frame / Reset Camera Frustum [F]"
          >
            <span className="material-symbols-outlined text-[17px]">filter_center_focus</span>
          </button>
        </div>

        {/* 3D Canvas Scene */}
        <Scene3D
          currentModel={model}
          color={color}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
          distortion={0.25}
          autoRotate={autoRotate}
          rotationSpeed={rotationSpeed}
          environmentPreset={activeEnv}
          cameraPos={activeCam.pos}
          cameraTarget={activeCam.target}
          activeTool={activeTool}
        />

        {/* Floating Bottom Filmstrip: Camera Angles */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between gap-2 px-3 py-1.5 rounded-[4px] bg-surface-container/90 backdrop-blur-md border border-border-hairline">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="font-mono text-[9px] text-outline uppercase mr-1 hidden sm:inline">
              PERSPECTIVE:
            </span>
            {STAGE_CAMERA_ANGLES.map((cam) => {
              const isActive = activeCam.id === cam.id;
              return (
                <button
                  key={cam.id}
                  onClick={() => setActiveCam(cam)}
                  className={`px-2.5 py-1 rounded-[2px] font-mono text-[11px] whitespace-nowrap transition-colors cursor-pointer border ${
                    isActive
                      ? "bg-primary text-white border-primary font-bold shadow-xs"
                      : "bg-surface-container border-border-hairline text-outline hover:text-on-surface"
                  }`}
                >
                  {cam.name}
                </button>
              );
            })}
          </div>

          <Link
            href="/editor"
            className="text-primary hover:underline font-mono text-[11px] font-semibold flex items-center gap-1 shrink-0"
          >
            <span>Full Studio</span>
            <Maximize2 className="w-3 h-3" />
          </Link>
        </div>

        {/* Interactive 3D Model Property Inspector Sidebar */}
        <div
          className="absolute top-0 right-0 bottom-0 w-full sm:w-88 max-w-[340px] sm:max-w-none z-30 bg-surface-container/95 backdrop-blur-xl border-l border-outline-variant/60 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
          style={{
            transform: sidebarOpen ? "translateX(0%)" : "translateX(100%)",
            opacity: sidebarOpen ? 1 : 0,
            visibility: sidebarOpen ? "visible" : "hidden",
            pointerEvents: sidebarOpen ? "auto" : "none",
            transition: "transform 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms cubic-bezier(0.22, 1, 0.36, 1), visibility 450ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform, opacity",
          }}
          aria-hidden={!sidebarOpen}
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40 mb-4">
              <div className="flex items-center gap-2 text-on-surface">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                  Live Shader Controls
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-[2px] text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                aria-label="Close Sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Colorway Preset */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[11px] text-outline uppercase tracking-wider">
                  Colorway
                </label>
                <span className="font-mono text-[10px] text-outline">{color}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.hex}
                    onClick={() => setColor(p.hex)}
                    title={p.name}
                    style={{ backgroundColor: p.hex }}
                    className={`h-7 rounded-[2px] transition-transform hover:scale-110 border cursor-pointer ${
                      color === p.hex
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-surface-container border-white scale-105"
                        : "border-black/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* PBR Sliders */}
            <div className="space-y-4 pt-2 border-t border-outline-variant/30">
              <div>
                <div className="flex justify-between font-mono text-xs text-on-surface-variant mb-1.5">
                  <span>Roughness</span>
                  <span className="text-on-surface font-semibold">{roughness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={roughness}
                  onChange={(e) => setRoughness(parseFloat(e.target.value))}
                  className="w-full accent-primary bg-surface-container-highest h-1.5 rounded appearance-none cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-outline mt-1">
                  <span>Glossy</span>
                  <span>Matte</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs text-on-surface-variant mb-1.5">
                  <span>Metallic</span>
                  <span className="text-on-surface font-semibold">{metalness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={metalness}
                  onChange={(e) => setMetalness(parseFloat(e.target.value))}
                  className="w-full accent-primary bg-surface-container-highest h-1.5 rounded appearance-none cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-outline mt-1">
                  <span>Dielectric</span>
                  <span>Metal</span>
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-xs text-on-surface-variant">Wireframe Mode</span>
                <input
                  type="checkbox"
                  checked={wireframe}
                  onChange={(e) => setWireframe(e.target.checked)}
                  className="w-4 h-4 rounded-[2px] border-outline-variant text-primary focus:ring-0 accent-primary cursor-pointer"
                />
              </div>

              {/* Footwear PBR Realism Notice */}
              <div className="p-2.5 rounded-[3px] bg-surface-container-highest/60 border border-border-hairline text-[10px] font-mono text-outline leading-relaxed">
                <span className="text-primary font-semibold block mb-0.5">NATURAL FOOTWEAR CALIBRATION:</span>
                Real leather, suede, canvas & vulcanized rubber are non-metallic dielectrics (Metalness: 0.00, Roughness: 0.65–0.85). ACES Filmic Tone Mapping active.
              </div>
            </div>
          </div>

          {/* Direct CTA to Full Studio */}
          <div className="pt-4 border-t border-outline-variant/40 mt-4">
            <Link
              href="/editor"
              className="w-full py-2.5 px-3 rounded-[2px] bg-primary text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-md text-center"
            >
              <span>Open in Full Studio Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stage Bottom Footer Ribbon */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-3 py-2.5 rounded-[4px] bg-surface-container-low border border-border-hairline text-xs font-mono">
        <div className="flex items-center gap-2 text-outline">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Real-time HDRI environment reflections with stone pedestal grounding</span>
        </div>
        <Link
          href="/editor"
          className="text-primary hover:underline font-semibold flex items-center gap-1.5"
        >
          <span>Launch Full Studio (4K Export & Lighting Rigs)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};
