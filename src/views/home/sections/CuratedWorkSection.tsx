import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Box, Sparkles, Layers } from "lucide-react";

const PROJECTS = [
  {
    id: "aero-01",
    title: "Strata Runner V2 Footwear Rig",
    category: "Footwear & Multi-Part PBR",
    description:
      "28-component athletic sneaker with TPU waffle soles, translucent mesh quarters, and foxing stripe. Tuned for real-time roughness and transparency inspection.",
    metrics: [
      { label: "Components", val: "28 Parts" },
      { label: "Triangles", val: "142K Tris" },
      { label: "Shading", val: "PBR Physical" },
    ],
    href: "/editor",
    tag: "Sneaker Flagship",
    color: "from-primary/10 via-transparent to-transparent",
  },
  {
    id: "solitaire-04",
    title: "Sculptural Solitaire Ring",
    category: "High Jewelry & Precious Metals",
    description:
      "Parametric platinum and 18k yellow gold band featuring a brilliant-cut solitaire diamond with spectral dispersion, studio HDRI reflections, and focal zoom.",
    metrics: [
      { label: "Alloys", val: "Platinum / 18K" },
      { label: "Optics", val: "Dispersion" },
      { label: "Lighting", val: "5500K Studio" },
    ],
    href: "/editor",
    tag: "Jewelry Studio",
    color: "from-secondary/10 via-transparent to-transparent",
  },
  {
    id: "exploded-view",
    title: "Industrial Hardware & CAD Staging",
    category: "Technical Inspection & Wireframe",
    description:
      "Clean architectural staging for precision machinery and industrial parts. Interactive wireframe inspection, normal map debugging, and 4K PNG export.",
    metrics: [
      { label: "Formats", val: "GLB / GLTF" },
      { label: "Frameloop", val: "60 FPS" },
      { label: "Limit", val: "100MB Max" },
    ],
    href: "/editor/new",
    tag: "CAD Workspace",
    color: "from-primary-container/10 via-transparent to-transparent",
  },
];

export const CuratedWorkSection: React.FC = () => {
  return (
    <section
      id="work"
      className="container-atelier py-12 sm:py-16 md:py-20 border-t border-outline-variant/30 scroll-mt-20"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">
            Studio Presets
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-on-surface font-bold tracking-tight">
            Ready-Made 3D Staging Scenes
          </h2>
        </div>
        <p className="text-sm sm:text-base text-on-surface-variant max-w-md leading-relaxed">
          Pre-calibrated studio rigs engineered for photographic realism,
          real-time material customization, and high-resolution rendering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((item) => (
          <div
            key={item.id}
            className="group bg-surface-container-low rounded-sm border border-outline-variant/40 hover:border-outline transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Visual Header */}
            <div className={`p-6 sm:p-8 bg-gradient-to-b ${item.color} relative aspect-[16/10] sm:aspect-[4/3] flex flex-col justify-between studio-grid border-b border-outline-variant/30`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-sm bg-surface-container-high/90 text-primary border border-outline-variant/40 uppercase">
                  {item.tag}
                </span>
                <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
              </div>

              {/* Graphic Specimen Icon */}
              <div className="flex items-center justify-center py-6">
                <div className="w-24 h-24 rounded-full bg-surface-container/60 border border-outline-variant/40 flex items-center justify-center text-on-surface-variant group-hover:scale-110 group-hover:border-primary transition-all duration-500 shadow-xl">
                  {item.id === "aero-01" && <Box className="w-10 h-10 text-primary" />}
                  {item.id === "solitaire-04" && <Sparkles className="w-10 h-10 text-secondary" />}
                  {item.id === "exploded-view" && <Layers className="w-10 h-10 text-primary" />}
                </div>
              </div>

              {/* Live Telemetry Pill */}
              <div className="font-mono text-[10px] text-on-surface-variant bg-surface-container-lowest/80 px-2.5 py-1 rounded-sm border border-outline-variant/30 self-start">
                WebGL 2.0 • Studio Editor
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] text-outline uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <h3 className="font-headline text-xl font-semibold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="mt-6 pt-5 border-t border-outline-variant/30">
                <div className="grid grid-cols-3 gap-2 font-mono text-[10px] mb-5">
                  {item.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="text-outline uppercase">{m.label}</span>
                      <span className="text-on-surface font-medium mt-0.5">{m.val}</span>
                    </div>
                  ))}
                </div>

                <Button
                  href={item.href}
                  variant="secondary"
                  size="sm"
                  className="w-full justify-between"
                  iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
                >
                  Open in 3D Editor
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
