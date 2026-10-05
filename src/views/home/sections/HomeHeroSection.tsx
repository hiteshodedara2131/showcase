"use client";

import React, { useState, useRef, DragEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroArtwork } from "@/components/home/HeroArtwork";
import {
  CloudUpload,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { storeUploadedModel } from "@/lib/modelStorage";

export const HomeHeroSection: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const MAX_FILE_SIZE = 100 * 1024 * 1024;

  const handleProcessFile = async (file: File) => {
    setErrorMessage(null);

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 100MB limit. Please upload a model under 100MB.`
      );
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!["glb", "gltf", "obj", "fbx"].includes(extension || "")) {
      setErrorMessage(
        "Supported formats: .GLB, .GLTF, .OBJ. For best results, use a binary .GLB file."
      );
      return;
    }

    try {
      setIsProcessing(true);
      await storeUploadedModel(file);
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
    if (file) handleProcessFile(file);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
  };

  return (
    <section
      id="hero"
      className="relative max-w-full overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20"
    >
      <div className="container-atelier">
        {/* Top value prop + hero copy (left) + architectural SVG (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-10 lg:pb-12">
          {/* Left: Copy + CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 rounded-[2px] bg-surface-container-high border border-outline-variant/60 font-mono text-[11px] text-primary uppercase tracking-wider font-semibold">
                3D Spatial Studio
              </span>
              <span className="font-mono text-[11px] text-outline tracking-wide hidden sm:inline">
                WebGL 2.0 · Real-Time PBR · 60 FPS
              </span>
            </div>

            <h1 className="font-headline text-[2.5rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold tracking-tight text-on-surface leading-[1.05] sm:leading-[1.02]">
              High-Fidelity 3D Viewer
              <br className="hidden sm:inline" />
              <span className="text-primary"> &amp; Real-Time Material Editor.</span>
            </h1>

            <p className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              Inspect, customize, and stage any 3D asset directly in the browser.
              Drop your CAD, footwear, or product model below to enter our real-time studio.
            </p>

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
                href="#stage"
                variant="secondary"
                size="lg"
                className="px-7 py-3.5 justify-center tracking-wider text-xs sm:text-sm"
              >
                Explore Live Stage
              </Button>
            </div>

            {/* Inline trust strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 font-mono text-[11px] text-outline">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                100% client-side
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                Zero cloud upload
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                Up to 100MB
              </span>
            </div>
          </div>

          {/* Right: Architectural SVG */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroArtwork className="max-w-[420px] lg:max-w-[480px]" />
          </div>
        </div>

        {/* Dropzone */}
        <div className="w-full">
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
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 font-mono text-[11px] text-primary font-bold tracking-wide">
                MAX 100MB LIMIT
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-container-high border border-border-hairline font-mono text-[11px] text-on-surface-variant font-medium">
                SUPPORTED: .GLB · .GLTF · .OBJ
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-container-high border border-border-hairline font-mono text-[11px] text-outline font-medium hidden sm:inline">
                INSTANT INGESTION
              </span>
            </div>

            <div className="flex flex-col items-center max-w-lg mx-auto">
              {isProcessing ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="w-12 h-12 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="font-mono text-sm text-primary font-bold uppercase tracking-wider">
                    Ingesting 3D Model &amp; Opening Studio…
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

                  <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl font-bold text-on-surface mb-2 tracking-tight">
                    Drop your 3D model here to launch the editor
                  </h3>

                  <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed mb-4">
                    Drag and drop a binary <strong className="text-on-surface">.GLB</strong> or{" "}
                    <strong className="text-on-surface">.GLTF</strong> file (up to 100MB),
                    or click anywhere to browse from your device.
                  </p>

                  <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider group-hover:underline">
                    <span>Browse Device Files</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </>
              )}

              {errorMessage && (
                <div className="mt-4 p-3 bg-error-container/20 border border-error/40 text-error rounded text-xs font-mono flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <div className="mt-8 pt-5 border-t border-border-hairline flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-outline">
              <span>Don&apos;t have a 3D model ready?</span>
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
      </div>
    </section>
  );
};
