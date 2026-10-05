import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export const ContactCtaSection: React.FC = () => {
  return (
    <section
      id="start"
      className="container-atelier py-12 sm:py-16 md:py-20 text-center relative border-t border-outline-variant/30 scroll-mt-20"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-5 sm:gap-6">
        <span className="w-8 h-0.5 bg-primary" />
        <h2 className="font-headline text-2xl sm:text-4xl lg:text-5xl text-on-surface font-bold tracking-tight">
          Ready to stage your product in 3D?
        </h2>
        <p className="font-body text-xs sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
          Upload your 3D model (up to 100MB) or explore our interactive studio editor to customize materials, lighting, and camera angles.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3 w-full sm:w-auto">
          <Button
            href="/editor"
            variant="primary"
            size="md"
            className="w-full sm:w-auto justify-center"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Launch 3D Editor
          </Button>

          <Button
            href="#stage"
            variant="secondary"
            size="md"
            className="w-full sm:w-auto justify-center"
          >
            Explore Live Stage
          </Button>
        </div>

        <span className="font-mono text-[10px] sm:text-[11px] text-outline pt-3 sm:pt-4">
          Direct browser WebGL 2.0 • No plugins required • Supports .GLB, .GLTF, .OBJ
        </span>
      </div>
    </section>
  );
};
