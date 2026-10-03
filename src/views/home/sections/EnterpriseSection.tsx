import React from "react";
import { Button } from "@/components/ui/Button";
import { Zap, ShieldCheck, Activity, ArrowUpRight } from "lucide-react";

export const EnterpriseSection: React.FC = () => {
  return (
    <section
      id="about"
      className="container-atelier py-14 sm:py-16 md:py-20 border-t border-outline-variant/30"
    >
      <div className="bg-surface-container-low rounded-sm border border-outline-variant/40 p-6 sm:p-10 md:p-12 lg:p-14 relative overflow-hidden">
        {/* Subtle radial corner glow */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2 sm:mb-3">
            Studio Engine Architecture
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-on-surface font-bold mb-3 sm:mb-4 tracking-tight">
            High-Performance 3D Web Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6 sm:mb-8">
            Built on WebGL 2.0 & WebGPU standards with physically based rendering (PBR),
            supporting instant 100MB model uploads, multi-part material separation, and seamless ecommerce embeds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-outline-variant/30">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>60 FPS PERFORMANCE</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Hardware-accelerated render loops maintain a fluid 60 FPS even with dense 150K+ triangle CAD meshes.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100MB INGESTION</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct client-side IndexedDB streaming parses large GLB/GLTF archives with zero server upload bottleneck.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold">
                <Activity className="w-3.5 h-3.5" />
                <span>ECOMMERCE EMBED</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Export 4K transparent PNG cutouts or embed the interactive 3D viewer directly into Shopify, Next.js, and Webflow.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6">
            <Button
              href="/editor"
              variant="outline"
              size="sm"
              iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Launch 3D Studio Workspace
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
