"use client";

import React, { useState, useRef, DragEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  CloudUpload,
  ArrowRight,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ShieldAlert,
} from "lucide-react";
import dynamic from "next/dynamic";
import { storeUploadedModel } from "@/lib/modelStorage";

const HeroMiniStage = dynamic(
  () => import("@/components/home/HeroMiniStage").then((m) => m.HeroMiniStage),
  {
    ssr: false,
    loading: () => (
      <div className="w-full lg:w-[460px] xl:w-[500px] h-[300px] sm:h-[340px] rounded-lg border border-border-hairline bg-surface-container-low flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-xs text-outline uppercase tracking-wider">
          Initializing 3D Preview...
        </span>
      </div>
    ),
  }
);

export const HomeHeroSection: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 100MB limit in bytes
  const MAX_FILE_SIZE = 100 * 1024 * 1024;

  const handleProcessFile = async (file: File) => {
    setErrorMessage(null);

    // Validate size (max 100MB)
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 100MB limit. Please upload a model under 100MB.`
      );
      return;
    }

    // Validate extension
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!["glb", "gltf", "obj", "fbx"].includes(extension || "")) {
      setErrorMessage(
        "Supported formats: .GLB, .GLTF, .OBJ. For best results, use a binary .GLB file."
      );
      return;
    }

    try {
      setIsProcessing(true);
      // Store file in IndexedDB so the editor can load it across navigation
      await storeUploadedModel(file);
      // Navigate to the 3D editor with the model loaded
      router.push("/editor");
    } catch {
      setErrorMessage("Failed to process 3D model. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  return (
    <section className="container-atelier pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 relative max-w-full overflow-hidden">
      {/* Top Value Prop & 3D Interactive Hero Preview (Filled Red Circle Area) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-10 pb-8">
        {/* Left Column: Headline, Subtitle & Action CTAs */}
        <div className="flex flex-col gap-5 flex-1 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded-[2px] bg-surface-container-high border border-outline-variant/60 font-mono text-[11px] text-primary uppercase tracking-wider font-semibold">
              3D Spatial Studio
            </span>
            <span className="font-mono text-[11px] text-outline tracking-wide hidden sm:inline">
              WebGL 2.0 • Real-Time PBR Editor • 60 FPS
            </span>
          </div>

          <h1 className="font-headline text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-on-surface leading-[1.1] sm:leading-[1.05]">
            High-Fidelity 3D Viewer <br className="hidden sm:inline" />
            <span className="text-primary">& Real-Time Material Editor.</span>
          </h1>

          <p className="font-body text-sm sm:text-base lg:text-lg text-on-surface-variant leading-relaxed">
            Inspect, customize, and stage any 3D asset directly in the browser.
            Drop your CAD, footwear, or product model below to enter our real-time studio.
          </p>

          {/* Action CTAs right under the copy */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              href="/editor"
              variant="primary"
              size="lg"
              className="px-7 py-3.5 justify-center tracking-wider text-xs sm:text-sm font-semibold"
            >
              Launch 3D Editor
            </Button>

            <Button
              href="#stage-section"
              variant="secondary"
              size="lg"
              className="px-7 py-3.5 justify-center tracking-wider text-xs sm:text-sm"
            >
              Explore Live Stage
            </Button>
          </div>
        </div>

        {/* Right Column: Live Interactive 3D Miniature Showcase Widget */}
        <div className="w-full lg:w-auto flex justify-center shrink-0">
          <HeroMiniStage />
        </div>
      </div>

      {/* Prominent 3D Model File Dropzone with 100MB Limit */}
      <div className="w-full mt-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".glb,.gltf,.obj"
          onChange={handleFileChange}
          className="hidden"
          id="hero-model-upload"
        />

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`relative rounded-md border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 backdrop-blur-md select-none group ${
            isDragging
              ? "border-primary bg-primary/10 shadow-2xl scale-[1.01]"
              : "border-outline-variant/70 hover:border-primary bg-surface-container-low/70 hover:bg-surface-container shadow-lg"
          }`}
        >
          {/* Top Limit Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 font-mono text-[11px] text-primary font-bold tracking-wide">
              MAX 100MB LIMIT
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container-high border border-border-hairline font-mono text-[11px] text-on-surface-variant font-medium">
              SUPPORTED: .GLB • .GLTF • .OBJ
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container-high border border-border-hairline font-mono text-[11px] text-outline font-medium hidden sm:inline">
              INSTANT INGESTION
            </span>
          </div>

          {/* Main Visual Icon & Prompt */}
          <div className="flex flex-col items-center max-w-lg mx-auto">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="font-mono text-sm text-primary font-bold uppercase tracking-wider">
                  Ingesting 3D Model & Opening Studio...
                </p>
                <p className="font-mono text-xs text-outline">
                  Parsing mesh hierarchy, PBR shaders, and bounding geometry
                </p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surface-container-high/80 border border-outline-variant/60 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary transition-all duration-300 shadow-md">
                  <CloudUpload className="w-8 h-8 sm:w-10 sm:h-10 text-primary transition-transform group-hover:-translate-y-1" />
                </div>

                <h3 className="font-headline text-lg sm:text-2xl font-bold text-on-surface mb-2">
                  Drop your 3D Model here to Launch Editor
                </h3>

                <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                  Drag and drop a binary <strong className="text-on-surface">.GLB</strong> or{" "}
                  <strong className="text-on-surface">.GLTF</strong> file (up to 100MB), or click anywhere to browse from your device.
                </p>

                <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider group-hover:underline">
                  <span>Browse Device Files</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </>
            )}

            {/* Error Message if size exceeded or invalid */}
            {errorMessage && (
              <div className="mt-4 p-3 bg-error-container/20 border border-error/40 text-error rounded text-xs font-mono flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Quick sample link footer */}
          <div className="mt-8 pt-5 border-t border-border-hairline flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-outline">
            <span>Don't have a 3D model ready?</span>
            <Link
              href="/editor"
              className="text-primary font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Load sample sneaker specimen</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
