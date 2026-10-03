import React from "react";
import { CloudUpload, Palette, Sun, Download } from "lucide-react";

const CAPABILITIES = [
  {
    num: "01",
    name: "100MB Model Ingestion",
    icon: CloudUpload,
    tag: "Spatial Drag & Drop",
    description:
      "Direct binary .GLB, .GLTF, and .OBJ upload with 100MB limit. Auto-centers bounding geometry, normalizes scale, and levels soles flush on the studio pedestal.",
  },
  {
    num: "02",
    name: "PBR Material Tuning",
    icon: Palette,
    tag: "Physical Shader Lab",
    description:
      "Per-part material selection with live roughness, metalness, and TPU clear transmission sliders. Switch between curated finishes like Obsidian, Raw Rubber, or Chrome.",
  },
  {
    num: "03",
    name: "Studio Environment Rig",
    icon: Sun,
    tag: "Calibrated Lighting",
    description:
      "Five pre-baked HDRI studio environments, adjustable Kelvin color temperature (2500K to 7500K), and directional key-light intensity controls.",
  },
  {
    num: "04",
    name: "4K Render Snapshot",
    icon: Download,
    tag: "High-Res Export",
    description:
      "Instant 4K transparent PNG capture from any camera angle. Generate clean product cutouts ready for digital commerce and lookbooks.",
  },
];

export const CoreMechanicsSection: React.FC = () => {
  return (
    <section className="container-atelier py-14 sm:py-16 md:py-20 border-t border-outline-variant/30">
      <div className="mb-8 sm:mb-12 max-w-2xl">
        <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">
          Engine Capabilities
        </span>
        <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-on-surface font-bold tracking-tight">
          3D Viewing & Editing Architecture
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
          Engineered for high performance, sub-millimeter precision, and zero installation friction in modern browsers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CAPABILITIES.map((cap) => {
          const Icon = cap.icon;
          return (
            <div
              key={cap.num}
              className="p-5 sm:p-6 rounded-sm bg-surface-container-low border border-outline-variant/40 hover:border-outline hover:bg-surface-container transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-primary font-semibold">
                    {cap.num}
                  </span>
                  <div className="w-8 h-8 rounded-sm bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <span className="font-mono text-[10px] text-outline uppercase tracking-wider block mb-1">
                  {cap.tag}
                </span>
                <h3 className="font-headline text-lg font-semibold text-on-surface tracking-tight mb-2">
                  {cap.name}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between text-[10px] font-mono text-outline">
                <span>Studio Pipeline</span>
                <span className="text-primary font-semibold">WebGL 2.0</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
