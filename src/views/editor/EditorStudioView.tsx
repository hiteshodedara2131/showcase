"use client";

import React, { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/shared/Header";
import {
  Eye,
  EyeOff,
  CloudUpload,
  Download,
  RotateCw,
  RotateCcw,
  Info,
  Sliders,
  PanelLeft,
  PanelRight,
  Layers,
  Check,
  Sparkles,
  X,
  Palette,
  Sun,
  Camera,
} from "lucide-react";
import type {
  PartConfig,
  EnvironmentPreset,
  CameraAngle,
} from "@/components/editor/EditorScene3D";

// Dynamically load EditorScene3D without SSR
const EditorScene3D = dynamic(
  () => import("@/components/editor/EditorScene3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant gap-3 bg-surface-container">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-outline">
          Loading 3D Spatial Pipeline...
        </span>
      </div>
    ),
  }
);

const ENVIRONMENT_PRESETS: EnvironmentPreset[] = [
  {
    id: "clean-studio",
    name: "Clean Studio",
    temp: "5500K",
    dreiPreset: "studio",
    pedestalColor: "#e9e8e5",
    bgLight: "#faf9f6",
  },
  {
    id: "dark-spotlight",
    name: "Dark Spotlight",
    temp: "3200K",
    dreiPreset: "city",
    pedestalColor: "#222220",
    bgLight: "#121211",
  },
  {
    id: "soft-jewelry",
    name: "Soft Jewelry",
    temp: "6000K",
    dreiPreset: "dawn",
    pedestalColor: "#f4f3f0",
    bgLight: "#ffffff",
  },
  {
    id: "floating-product",
    name: "Floating Product",
    temp: "Neutral",
    dreiPreset: "apartment",
    pedestalColor: "#e3e2df",
    bgLight: "#f4f3f0",
  },
  {
    id: "editorial-pedestal",
    name: "Editorial Pedestal",
    temp: "4500K",
    dreiPreset: "city",
    pedestalColor: "#d9dad7",
    bgLight: "#faf9f6",
  },
];

const INITIAL_CAMERA_ANGLES: CameraAngle[] = [
  {
    id: "cam-front",
    code: "CAM_01",
    name: "Front 3/4 View",
    position: [2.2, 1.2, 2.6],
    target: [0, 0.48, 0],
    fov: 38,
  },
  {
    id: "cam-iso",
    code: "CAM_02",
    name: "Top Isometric",
    position: [0.1, 3.4, 1.8],
    target: [0, 0.48, 0],
    fov: 40,
  },
  {
    id: "cam-macro",
    code: "CAM_03",
    name: "Macro Heel Detail",
    position: [-1.4, 0.95, -1.9],
    target: [-0.3, 0.52, -0.7],
    fov: 30,
  },
  {
    id: "cam-sole",
    code: "CAM_04",
    name: "Lateral Profile",
    position: [3.4, 0.65, 0.0],
    target: [0, 0.48, 0],
    fov: 36,
  },
];

const INITIAL_PARTS: Record<string, PartConfig> = {
  Outsole_Waffle: {
    color: "#D1CDC4",
    roughness: 0.75,
    metalness: 0.0,
    transmission: 0.3,
    wireframe: false,
    visible: true,
    locked: false,
  },
  Toe_Box_Vamp: {
    color: "#a9310f",
    roughness: 0.68,
    metalness: 0.0,
    transmission: 0,
    wireframe: false,
    visible: true,
    locked: false,
  },
  Upper_Canvas_Quarters: {
    color: "#1a1c1a",
    roughness: 0.82,
    metalness: 0.0,
    transmission: 0,
    wireframe: false,
    visible: true,
    locked: false,
  },
  Laces: {
    color: "#f5f4f0",
    roughness: 0.88,
    metalness: 0.0,
    transmission: 0,
    wireframe: false,
    visible: true,
    locked: false,
  },
  Midsole: {
    color: "#e8e5de",
    roughness: 0.7,
    metalness: 0.0,
    transmission: 0,
    wireframe: false,
    visible: true,
    locked: false,
  },
  Eyelets_Metal: {
    color: "#c8c6c4",
    roughness: 0.25,
    metalness: 0.85,
    transmission: 0,
    wireframe: false,
    visible: true,
    locked: false,
  },
  Foxing_Stripe_Sidewall: {
    color: "#a9310f",
    roughness: 0.65,
    metalness: 0.0,
    transmission: 0,
    wireframe: false,
    visible: true,
    locked: false,
  },
  Heel_Logo_Tab: {
    color: "#a9310f",
    roughness: 0.68,
    metalness: 0.0,
    transmission: 0,
    wireframe: false,
    visible: true,
    locked: false,
  },
};

const PART_DISPLAY_NAMES: Record<string, string> = {
  Outsole_Waffle: "Outer Soles (Waffle)",
  Toe_Box_Vamp: "Toe Box & Vamp",
  Upper_Canvas_Quarters: "Upper Mesh Quarters",
  Laces: "Lacing System",
  Midsole: "Midsole Compound",
  Eyelets_Metal: "Eyelets & Hardware",
  Foxing_Stripe_Sidewall: "Foxing Stripe",
  Heel_Logo_Tab: "Heel Tab & Badge",
};

const MATERIAL_PRESETS = [
  { name: "Terracotta Nappa", color: "#a9310f", roughness: 0.68, metalness: 0.0, transmission: 0 },
  { name: "Obsidian Suede", color: "#181818", roughness: 0.88, metalness: 0.0, transmission: 0 },
  { name: "Vulcanized Rubber", color: "#d8d3c7", roughness: 0.72, metalness: 0.0, transmission: 0.3 },
  { name: "Chalk White Leather", color: "#f8f7f4", roughness: 0.7, metalness: 0.0, transmission: 0 },
  { name: "Dior Jacquard Grey", color: "#bec2c8", roughness: 0.72, metalness: 0.0, transmission: 0 },
  { name: "Titanium Eyelet", color: "#d4d8db", roughness: 0.22, metalness: 0.85, transmission: 0 },
];

export default function EditorStudioView({
  projectId = "runner-v2",
}: {
  projectId?: string;
}) {
  // Active state
  const [selectedPart, setSelectedPart] = useState("Outsole_Waffle");
  const [parts, setParts] = useState<Record<string, PartConfig>>(INITIAL_PARTS);
  const [activeEnv, setActiveEnv] = useState<EnvironmentPreset>(ENVIRONMENT_PRESETS[0]);
  const [activeCameraAngle, setActiveCameraAngle] = useState<CameraAngle>(INITIAL_CAMERA_ANGLES[0]);
  const [cameraAngles] = useState(INITIAL_CAMERA_ANGLES);

  // Inspector Tab
  const [inspectorTab, setInspectorTab] = useState<"material" | "lighting">("material");

  // Global Scene & Viewport Toggles
  const [wireframeGlobal, setWireframeGlobal] = useState(false);
  const [activeTool, setActiveTool] = useState<"orbit" | "pan" | "zoom">("orbit");
  const [turntableSpin, setTurntableSpin] = useState(false);
  const [customGlbUrl, setCustomGlbUrl] = useState<string | null>(null);
  const [customGlbName, setCustomGlbName] = useState<string | null>(null);

  // Lighting parameters - soft natural studio calibration
  const [keyLightIntensity, setKeyLightIntensity] = useState(1.35);
  const [colorTempKelvin, setColorTempKelvin] = useState(5400);

  // Sidebars toggle states
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightInspectorOpen, setRightInspectorOpen] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Canvas screenshot capture ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-load model if user dropped it on the Home Hero dropzone
  React.useEffect(() => {
    async function checkUploadedModel() {
      try {
        const { getUploadedModel, clearUploadedModel } = await import("@/lib/modelStorage");
        const storedFile = await getUploadedModel();
        if (storedFile) {
          const url = URL.createObjectURL(storedFile);
          setCustomGlbUrl(url);
          setCustomGlbName(storedFile.name);
          triggerToast(`Loaded uploaded model: ${storedFile.name}`);
          await clearUploadedModel();
        }
      } catch (err) {
        console.error("Failed to load model from IndexedDB:", err);
      }
    }
    checkUploadedModel();
  }, []);

  // Handle active part config update
  const currentPartConfig = parts[selectedPart] || INITIAL_PARTS.Outsole_Waffle;

  const updateCurrentPart = (updates: Partial<PartConfig>) => {
    setParts((prev) => ({
      ...prev,
      [selectedPart]: {
        ...(prev[selectedPart] || INITIAL_PARTS.Outsole_Waffle),
        ...updates,
      },
    }));
  };

  // Custom GLB file ingestion handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomGlbUrl(url);
      setCustomGlbName(file.name);
      triggerToast(`Loaded model: ${file.name}`);
    }
  };

  // Reset materials and camera to original defaults
  const handleResetModel = () => {
    setParts(INITIAL_PARTS);
    setCustomGlbUrl(null);
    setCustomGlbName(null);
    setActiveCameraAngle(INITIAL_CAMERA_ANGLES[0]);
    setWireframeGlobal(false);
    setTurntableSpin(false);
    triggerToast("Reset scene, materials & camera to default");
  };

  // Export transparent PNG snapshot
  const handleExportPng = useCallback(() => {
    try {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `3d-model-render-${activeCameraAngle.code}.png`;
        a.click();
        triggerToast("Render snapshot downloaded!");
      } else {
        triggerToast("Canvas buffer unavailable for export.");
      }
    } catch {
      triggerToast("Snapshot export failed.");
    }
  }, [activeCameraAngle]);

  return (
    <div className="h-screen w-screen bg-background text-on-surface flex flex-col overflow-hidden select-none font-sans">
      {/* Accessible semantic heading and structured JSON-LD data for SEO */}
      <h1 className="sr-only">
        3D Product Studio — Interactive Real-Time 3D Customizer & Material Lab
      </h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "3D Product Studio",
            applicationCategory: "DesignApplication",
            operatingSystem: "WebBrowser",
            browserRequirements: "Requires WebGL 2.0 / WebGPU support",
            description:
              "Interactive browser-based 3D product customization studio with real-time PBR material editing and high-definition viewport rendering.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />

      {/* ========================================================================= */}
      {/* 1. GLOBAL NAVIGATION HEADER (Same Header as Home)                         */}
      {/* ========================================================================= */}
      <Header />

      {/* ========================================================================= */}
      {/* 2. STUDIO UTILITY BAR: Clean Action Controls (Export, Reload, Detail)      */}
      {/* ========================================================================= */}
      <div className="h-11 border-b border-border-hairline bg-surface-container-low/90 backdrop-blur-md flex items-center justify-between px-3 sm:px-4 z-40 shrink-0">
        {/* Left Action Group */}
        <div className="flex items-center space-x-2">
          {/* Toggle Left Sidebar */}
          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className={`h-8 px-2.5 rounded-[2px] border text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer ${
              leftSidebarOpen
                ? "bg-surface-container border-primary text-primary font-semibold"
                : "border-border-hairline text-outline hover:text-on-surface hover:bg-surface-container"
            }`}
            title="Toggle Parts & Environments Sidebar"
          >
            <PanelLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Parts & Scene</span>
          </button>

          {/* Preset Model Switcher */}
          <div className="flex items-center space-x-1 border border-border-hairline rounded-[2px] p-0.5 bg-surface-container-lowest">
            <span className="text-[10px] font-mono text-outline px-1.5 hidden md:inline">SPECIMEN:</span>
            {[
              { id: "runner", name: "Runner V2", url: null },
              { id: "dior", name: "Dior 1", url: "/models/dior_jordan.glb" },
              { id: "vans", name: "Vans", url: "/models/vans_oldskool.glb" },
            ].map((spec) => (
              <button
                key={spec.id}
                onClick={() => {
                  setCustomGlbUrl(spec.url);
                  setCustomGlbName(spec.name);
                  triggerToast(`Loaded specimen: ${spec.name}`);
                }}
                className={`h-7 px-2 rounded-[2px] text-xs font-mono transition-colors cursor-pointer ${
                  (spec.url === null && !customGlbUrl) || customGlbUrl === spec.url
                    ? "bg-primary text-white font-semibold shadow-xs"
                    : "text-outline hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                {spec.name}
              </button>
            ))}
          </div>

          {/* Load GLB / Upload Model */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.gltf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="h-8 px-2.5 sm:px-3 rounded-[2px] border border-border-hairline bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
            title="Load your custom .glb or .gltf 3D model"
          >
            <CloudUpload className="w-3.5 h-3.5 text-primary" />
            <span>Load GLB</span>
          </button>

          {/* Reset / Reload Model */}
          <button
            onClick={handleResetModel}
            className="h-8 px-2.5 rounded-[2px] border border-border-hairline hover:bg-surface-container text-outline hover:text-on-surface text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer active:scale-95"
            title="Reset materials, camera and model to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Model Details Button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`h-8 px-2.5 rounded-[2px] border text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer ${
              showDetails
                ? "bg-surface-container border-primary text-primary font-semibold"
                : "border-border-hairline text-outline hover:text-on-surface hover:bg-surface-container"
            }`}
            title="View mesh geometry and specimen details"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>

        {/* Right Action Group */}
        <div className="flex items-center space-x-2">
          {/* Turntable Auto-Spin Toggle */}
          <button
            onClick={() => setTurntableSpin(!turntableSpin)}
            className={`h-8 px-2.5 rounded-[2px] border text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer ${
              turntableSpin
                ? "bg-primary text-white border-primary"
                : "border-border-hairline text-outline hover:text-on-surface hover:bg-surface-container"
            }`}
            title={turntableSpin ? "Pause Turntable" : "Start 360 Turntable Spin"}
          >
            <RotateCw className={`w-3.5 h-3.5 ${turntableSpin ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Spin</span>
          </button>

          {/* Global Wireframe Toggle */}
          <button
            onClick={() => setWireframeGlobal(!wireframeGlobal)}
            className={`h-8 px-2.5 rounded-[2px] border text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer ${
              wireframeGlobal
                ? "bg-surface-container border-primary text-primary font-semibold"
                : "border-border-hairline text-outline hover:text-on-surface hover:bg-surface-container"
            }`}
            title="Toggle Wireframe Overlay"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Wireframe</span>
          </button>

          {/* Export PNG Snapshot */}
          <button
            onClick={handleExportPng}
            className="h-8 px-3 rounded-[2px] bg-primary hover:bg-primary-container text-white text-xs font-mono font-medium flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Download 4K PNG snapshot"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          {/* Toggle Right Inspector */}
          <button
            onClick={() => setRightInspectorOpen(!rightInspectorOpen)}
            className={`h-8 px-2.5 rounded-[2px] border text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer ${
              rightInspectorOpen
                ? "bg-surface-container border-primary text-primary font-semibold"
                : "border-border-hairline text-outline hover:text-on-surface hover:bg-surface-container"
            }`}
            title="Toggle Material & Lighting Inspector"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inspector</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. WORKSPACE BODY: Clean Layout (Left Parts Panel, 3D Canvas, Inspector)   */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT SIDEBAR: Scene Parts & Environments                                */}
        {/* ----------------------------------------------------------------------- */}
        <aside
          className={`${
            leftSidebarOpen ? "w-64 sm:w-72" : "w-0 p-0 border-none"
          } transition-all duration-300 bg-surface-container-lowest border-r border-border-hairline flex flex-col shrink-0 z-30 overflow-y-auto overflow-x-hidden`}
        >
          {/* Header */}
          <div className="p-3 border-b border-border-hairline flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-on-surface uppercase tracking-wider">
              Scene Components
            </span>
            <button
              onClick={() => setLeftSidebarOpen(false)}
              className="p-1 text-outline hover:text-on-surface rounded cursor-pointer"
              title="Close Panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Specimen Model Switcher */}
          <div className="p-3 border-b border-border-hairline">
            <span className="font-mono text-[10px] text-outline uppercase tracking-widest font-semibold block mb-2">
              Specimen Model
            </span>
            <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
              {[
                { name: "Waffle Runner V2", url: null, desc: "28-part Flagship" },
                { name: "Air Athletic Sneaker", url: "/models/nike_shoe.glb", desc: "PBR Material Variants" },
                { name: "Damaged Battle Helmet", url: "/models/helmet.glb", desc: "High-Metal Industrial" },
              ].map((spec) => {
                const isCurrent =
                  (spec.url === null && customGlbUrl === null) ||
                  (spec.url !== null && customGlbUrl === spec.url);
                return (
                  <button
                    key={spec.name}
                    onClick={() => {
                      setCustomGlbUrl(spec.url);
                      setCustomGlbName(spec.url ? spec.name : null);
                      triggerToast(`Loaded specimen: ${spec.name}`);
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-[2px] transition-colors cursor-pointer text-left border ${
                      isCurrent
                        ? "bg-surface-container border-primary text-on-surface font-semibold shadow-xs"
                        : "bg-surface-container-low border-border-hairline text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <div>
                      <p className="text-xs">{spec.name}</p>
                      <p className="text-[9px] text-outline">{spec.desc}</p>
                    </div>
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Parts List */}
          <div className="p-3 border-b border-border-hairline flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-outline uppercase tracking-widest font-semibold">
                Specimen Parts ({Object.keys(parts).length})
              </span>
              <span className="font-mono text-[9px] text-primary">Click to Edit</span>
            </div>

            <div className="space-y-1 font-mono text-[11px]">
              {Object.keys(parts).map((partKey) => {
                const isSelected = selectedPart === partKey;
                const partConfig = parts[partKey];
                const displayName = PART_DISPLAY_NAMES[partKey] || partKey;

                return (
                  <div
                    key={partKey}
                    onClick={() => {
                      setSelectedPart(partKey);
                      setRightInspectorOpen(true);
                      setInspectorTab("material");
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-[2px] transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-surface-container border-l-2 border-primary text-on-surface font-semibold shadow-xs"
                        : "hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 border border-border-hairline"
                        style={{ backgroundColor: partConfig.color }}
                      />
                      <span className="truncate">{displayName}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-outline">
                      {/* Visibility Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCurrentPart({ visible: !partConfig.visible });
                        }}
                        className="hover:text-primary p-0.5"
                        title={partConfig.visible ? "Hide part" : "Show part"}
                      >
                        {partConfig.visible ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-error" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Environment Presets */}
          <div className="p-3 border-b border-border-hairline">
            <span className="font-mono text-[10px] text-outline uppercase tracking-widest font-semibold mb-2 block">
              Studio Environments
            </span>
            <div className="space-y-1">
              {ENVIRONMENT_PRESETS.map((env) => {
                const isActive = activeEnv.id === env.id;
                return (
                  <div
                    key={env.id}
                    onClick={() => {
                      setActiveEnv(env);
                      triggerToast(`Switched to ${env.name}`);
                    }}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-[2px] cursor-pointer transition-colors ${
                      isActive
                        ? "bg-surface-container border border-border-hairline text-on-surface font-semibold"
                        : "hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-primary" : "bg-surface-dim"
                        }`}
                      />
                      <span className="text-xs">{env.name}</span>
                    </div>
                    <span className="font-mono text-[9px] text-outline">
                      {env.temp}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom File Upload Dropzone */}
          <div className="p-3 bg-surface-container-lowest">
            <label
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-border-hairline hover:border-primary rounded-[3px] p-2.5 text-center cursor-pointer transition-colors bg-surface-container-low/40 block group"
            >
              <CloudUpload className="w-4 h-4 text-outline group-hover:text-primary mx-auto mb-1 transition-colors" />
              <p className="font-sans text-xs font-medium text-on-surface">
                {customGlbName ? `Loaded: ${customGlbName}` : "Load Custom .GLB File"}
              </p>
              <p className="font-mono text-[9px] text-outline mt-0.5">
                Drop binary GLB / GLTF asset
              </p>
            </label>
          </div>
        </aside>

        {/* ----------------------------------------------------------------------- */}
        {/* CENTER STAGE: Dominant 3D Viewport                                      */}
        {/* ----------------------------------------------------------------------- */}
        <main className="flex-1 flex flex-col bg-surface-container relative overflow-hidden">
          {/* 3D Canvas Viewport */}
          <div className="flex-1 relative flex items-center justify-center viewport-grid overflow-hidden">
            <EditorScene3D
              customGlbUrl={customGlbUrl}
              selectedPartName={selectedPart}
              onSelectPart={(part) => {
                setSelectedPart(part);
                setRightInspectorOpen(true);
                setInspectorTab("material");
                triggerToast(`Selected: ${PART_DISPLAY_NAMES[part] || part}`);
              }}
              partsState={parts}
              activeEnvironment={activeEnv}
              cameraAngle={activeCameraAngle}
              wireframeGlobal={wireframeGlobal}
              keyLightIntensity={keyLightIntensity}
              colorTempKelvin={colorTempKelvin}
              turntableSpin={turntableSpin}
              activeTool={activeTool}
              canvasRef={canvasRef}
            />

            {/* Floating Camera Navigation Toolbar */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col space-y-1 bg-surface/90 backdrop-blur-md p-1 rounded-[3px] border border-border-hairline shadow-sm">
              <button
                onClick={() => setActiveTool("orbit")}
                className={`w-8 h-8 flex items-center justify-center rounded-[2px] transition-colors cursor-pointer ${
                  activeTool === "orbit"
                    ? "bg-on-surface text-surface shadow-xs"
                    : "text-outline hover:text-on-surface hover:bg-surface-container"
                }`}
                title="Orbit Camera Mode"
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
                title="Pan Camera Mode"
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
                title="Dolly Zoom Camera Mode"
              >
                <span className="material-symbols-outlined text-[17px]">zoom_in</span>
              </button>

              <div className="h-px bg-border-hairline my-0.5" />

              <button
                onClick={() => {
                  setActiveCameraAngle(INITIAL_CAMERA_ANGLES[0]);
                  triggerToast("Reset camera perspective");
                }}
                className="w-8 h-8 flex items-center justify-center rounded-[2px] text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                title="Reset Camera Angle"
              >
                <span className="material-symbols-outlined text-[17px]">filter_center_focus</span>
              </button>
            </div>

            {/* Details Modal / Flyout */}
            {showDetails && (
              <div className="absolute top-4 left-4 z-30 w-80 bg-surface/95 backdrop-blur-md border border-border-hairline rounded-[3px] p-4 shadow-xl animate-in fade-in zoom-in-95 duration-150 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border-hairline mb-3">
                  <span className="font-bold text-on-surface text-sm uppercase tracking-wider">
                    Model Details
                  </span>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-1 text-outline hover:text-on-surface rounded cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="text-outline">Specimen Asset</span>
                    <span className="text-on-surface font-semibold truncate max-w-[150px]">
                      {customGlbName || "Waffle Runner V2"}
                    </span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="text-outline">Components</span>
                    <span className="text-on-surface font-semibold">{Object.keys(parts).length} Parts</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="text-outline">Triangles</span>
                    <span className="text-on-surface font-semibold">142,880</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="text-outline">Vertices</span>
                    <span className="text-on-surface font-semibold">36,579</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="text-outline">Material Pipeline</span>
                    <span className="text-on-surface font-semibold">PBR Rough-Metal</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="text-outline">Ground Alignment</span>
                    <span className="text-primary font-semibold">Leveled (y=0.01)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Camera Angles Filmstrip */}
          <div className="h-24 bg-surface-container-lowest border-t border-border-hairline flex items-center px-4 py-2 space-x-3 shrink-0 overflow-x-auto z-10">
            <div className="flex flex-col justify-center pr-3 border-r border-border-hairline shrink-0">
              <span className="font-mono text-[9px] text-outline uppercase tracking-wider">
                PERSPECTIVE
              </span>
              <span className="font-mono text-xs font-bold text-on-surface">
                ANGLES
              </span>
            </div>

            {cameraAngles.map((cam) => {
              const isActive = activeCameraAngle.id === cam.id;
              return (
                <div
                  key={cam.id}
                  onClick={() => {
                    setActiveCameraAngle(cam);
                    triggerToast(`Switched view: ${cam.name}`);
                  }}
                  className={`w-36 h-18 rounded-[2px] cursor-pointer relative overflow-hidden flex flex-col justify-between p-2 shrink-0 transition-all ${
                    isActive
                      ? "bg-surface-container-high border-2 border-primary shadow-sm"
                      : "bg-surface-container-low border border-border-hairline hover:border-on-surface"
                  }`}
                >
                  <div className="flex justify-between items-center font-mono text-[10px]">
                    <span className={isActive ? "text-primary font-bold" : "text-outline"}>
                      {cam.code}
                    </span>
                    {isActive && (
                      <span className="text-primary font-bold text-[9px]">ACTIVE</span>
                    )}
                  </div>
                  <span className={`font-mono text-xs truncate ${isActive ? "text-on-surface font-bold" : "text-on-surface-variant"}`}>
                    {cam.name}
                  </span>
                </div>
              );
            })}
          </div>
        </main>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT INSPECTOR: Material Shading & Studio Lighting                     */}
        {/* ----------------------------------------------------------------------- */}
        <aside
          className={`${
            rightInspectorOpen ? "w-80 sm:w-88" : "w-0 p-0 border-none"
          } transition-all duration-300 bg-surface-container-lowest border-l border-border-hairline flex flex-col shrink-0 z-30 overflow-y-auto overflow-x-hidden`}
        >
          {/* Header */}
          <div className="p-3 border-b border-border-hairline flex items-center justify-between">
            <div className="flex items-center space-x-1 bg-surface-container p-0.5 rounded-[2px] text-xs font-mono">
              <button
                onClick={() => setInspectorTab("material")}
                className={`px-3 py-1 rounded-[2px] transition-colors cursor-pointer ${
                  inspectorTab === "material"
                    ? "bg-surface-container-lowest font-semibold text-on-surface shadow-xs"
                    : "text-outline hover:text-on-surface"
                }`}
              >
                Material
              </button>
              <button
                onClick={() => setInspectorTab("lighting")}
                className={`px-3 py-1 rounded-[2px] transition-colors cursor-pointer ${
                  inspectorTab === "lighting"
                    ? "bg-surface-container-lowest font-semibold text-on-surface shadow-xs"
                    : "text-outline hover:text-on-surface"
                }`}
              >
                Lighting
              </button>
            </div>

            <button
              onClick={() => setRightInspectorOpen(false)}
              className="p-1 text-outline hover:text-on-surface rounded cursor-pointer"
              title="Close Inspector"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TAB 1: Material Controls */}
          {inspectorTab === "material" && (
            <div className="p-4 space-y-5 flex-1">
              {/* Active Target Indicator & Dropdown */}
              <div>
                <span className="font-mono text-[9px] text-outline uppercase tracking-wider block mb-1">
                  Active Component
                </span>
                <select
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                  className="w-full bg-surface-container border border-border-hairline rounded-[2px] px-2.5 py-1.5 text-xs font-mono font-medium text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                >
                  {Object.keys(parts).map((key) => (
                    <option key={key} value={key}>
                      {PART_DISPLAY_NAMES[key] || key}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Finish Presets */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-outline uppercase tracking-widest block">
                  Quick Finishes
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {MATERIAL_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        updateCurrentPart({
                          color: preset.color,
                          roughness: preset.roughness,
                          metalness: preset.metalness,
                          transmission: preset.transmission,
                        });
                        triggerToast(`Applied ${preset.name}`);
                      }}
                      className="p-1.5 rounded-[2px] border border-border-hairline hover:border-primary bg-surface-container-low text-left transition-colors cursor-pointer flex flex-col justify-between h-14"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-border-hairline"
                        style={{ backgroundColor: preset.color }}
                      />
                      <span className="font-mono text-[9px] text-on-surface truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Base Color Swatch & Custom Hex */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-outline uppercase tracking-widest block">
                  Base Color
                </span>
                <div className="flex items-center justify-between p-2 rounded-[2px] bg-surface-container border border-border-hairline">
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={currentPartConfig.color}
                      onChange={(e) => updateCurrentPart({ color: e.target.value })}
                      className="w-7 h-7 rounded-[2px] border border-border-hairline cursor-pointer p-0 bg-transparent"
                    />
                    <span className="font-mono text-xs font-semibold text-on-surface uppercase">
                      {currentPartConfig.color}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-outline">HEX</span>
                </div>
              </div>

              {/* Material Sliders */}
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-outline uppercase tracking-widest block">
                  PBR Sliders
                </span>

                {/* Roughness Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-on-surface">Roughness</span>
                    <span className="font-semibold text-primary">
                      {currentPartConfig.roughness.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={currentPartConfig.roughness}
                    onChange={(e) =>
                      updateCurrentPart({ roughness: parseFloat(e.target.value) })
                    }
                    className="w-full accent-[#a9310f] bg-surface-container-highest h-1.5 rounded appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-outline">
                    <span>Glossy (0.0)</span>
                    <span>Matte (1.0)</span>
                  </div>
                </div>

                {/* Metallic Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-on-surface">Metallic</span>
                    <span className="font-semibold text-primary">
                      {currentPartConfig.metalness.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={currentPartConfig.metalness}
                    onChange={(e) =>
                      updateCurrentPart({ metalness: parseFloat(e.target.value) })
                    }
                    className="w-full accent-[#a9310f] bg-surface-container-highest h-1.5 rounded appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-outline">
                    <span>Dielectric (0.0)</span>
                    <span>Full Metal (1.0)</span>
                  </div>
                </div>

                {/* Transmission (Transparency) Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-on-surface">Transmission / Clear</span>
                    <span className="font-semibold text-primary">
                      {currentPartConfig.transmission.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={currentPartConfig.transmission}
                    onChange={(e) =>
                      updateCurrentPart({ transmission: parseFloat(e.target.value) })
                    }
                    className="w-full accent-[#a9310f] bg-surface-container-highest h-1.5 rounded appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-outline">
                    <span>Opaque (0.0)</span>
                    <span>TPU Clear (1.0)</span>
                  </div>
                </div>

                {/* Part Wireframe Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-medium text-on-surface font-mono">
                    Mesh Wireframe
                  </span>
                  <input
                    type="checkbox"
                    checked={currentPartConfig.wireframe}
                    onChange={(e) => updateCurrentPart({ wireframe: e.target.checked })}
                    className="w-4 h-4 rounded-[2px] border-border-hairline text-primary focus:ring-0 accent-[#a9310f] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Lighting Controls */}
          {inspectorTab === "lighting" && (
            <div className="p-4 space-y-5 flex-1">
              <span className="font-mono text-[10px] text-outline uppercase tracking-widest block">
                Lighting Rig
              </span>

              {/* Key Light Intensity */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-on-surface">Key Light</span>
                  <span className="font-semibold text-primary">
                    {keyLightIntensity.toFixed(1)} kW
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6"
                  step="0.1"
                  value={keyLightIntensity}
                  onChange={(e) => setKeyLightIntensity(parseFloat(e.target.value))}
                  className="w-full accent-[#a9310f] bg-surface-container-highest h-1.5 rounded appearance-none cursor-pointer"
                />
              </div>

              {/* Color Temperature Kelvin */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-on-surface">Color Temperature</span>
                  <span className="font-semibold text-primary">
                    {colorTempKelvin} K
                  </span>
                </div>
                <input
                  type="range"
                  min="2500"
                  max="7500"
                  step="100"
                  value={colorTempKelvin}
                  onChange={(e) => setColorTempKelvin(parseInt(e.target.value))}
                  className="w-full accent-[#a9310f] bg-surface-container-highest h-1.5 rounded appearance-none cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-outline">
                  <span>Warm (2500K)</span>
                  <span>Cool Daylight (7500K)</span>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-on-surface text-surface px-4 py-2 rounded-[3px] shadow-2xl font-mono text-xs flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
