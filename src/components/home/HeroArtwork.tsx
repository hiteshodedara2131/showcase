"use client";

/**
 * Architectural Kinetic-Atelier hero artwork.
 *
 * Pure SVG — zero JS animation, zero WebGL. Designed to sit on the right
 * half of the hero and read at any size from 320 px to 1920 px.
 *
 * Composition (from back to front):
 *   1. Coordinate blueprint grid (1 px hairlines)
 *   2. Three concentric measurement rings (technical readout feel)
 *   3. Light beams descending from above (3 planes)
 *   4. Stacked stone pedestal (matches the 3D pedestal in Scene3D)
 *   5. Abstract product silhouette (parametric ring + solitair form)
 *   6. Floating measurement annotations
 *   7. Live telemetry pill in the corner
 *
 * CSS keyframes add a slow breath + counter-rotation; both are
 * suppressed under `prefers-reduced-motion`.
 */
import React from "react";

export const HeroArtwork: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block animate-[hero-breath_8s_ease-in-out_infinite]"
        role="img"
        aria-label="Architectural kinetic diagram of a staged 3D product specimen under calibrated studio lighting"
      >
        <defs>
          {/* Hairline blueprint grid */}
          <pattern
            id="ha-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.35"
            />
          </pattern>

          {/* Radial pedestal gradient */}
          <radialGradient id="pedestal-grad" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="var(--surface-bright, #faf9f6)" />
            <stop offset="60%" stopColor="var(--surface-container, #efeeeb)" />
            <stop offset="100%" stopColor="var(--surface-dim, #dbdad7)" />
          </radialGradient>

          {/* Product sheen gradient */}
          <linearGradient id="product-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary, #a9310f)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--primary-container, #cb4926)" stopOpacity="0.75" />
          </linearGradient>

          {/* Light beam gradient */}
          <linearGradient id="beam-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>

          {/* Soft shadow filter */}
          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dx="0" dy="4" result="off" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.35" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid */}
        <rect width="480" height="480" fill="url(#ha-grid)" className="text-outline" />

        {/* Concentric measurement rings */}
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-outline opacity-60"
        >
          <circle cx="240" cy="260" r="180" />
          <circle cx="240" cy="260" r="140" strokeDasharray="2 4" />
          <circle cx="240" cy="260" r="100" />
        </g>

        {/* Crosshair axes through the pedestal center */}
        <g
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-outline opacity-50"
        >
          <line x1="40" y1="260" x2="440" y2="260" strokeDasharray="1 3" />
          <line x1="240" y1="60" x2="240" y2="460" strokeDasharray="1 3" />
        </g>

        {/* Light beams descending from above */}
        <g className="animate-[hero-spin_22s_linear_infinite]" style={{ transformOrigin: "240px 260px" }}>
          <polygon points="180,40 300,40 340,260 140,260" fill="url(#beam-grad)" opacity="0.55" />
          <polygon points="210,40 270,40 290,260 190,260" fill="url(#beam-grad)" opacity="0.45" />
        </g>

        {/* Stacked stone pedestal */}
        <g filter="url(#soft-shadow)">
          {/* Lower foundation ring */}
          <ellipse cx="240" cy="370" rx="170" ry="22" fill="var(--surface-dim, #dbdad7)" />
          <rect x="70" y="340" width="340" height="30" fill="var(--surface-dim, #dbdad7)" />
          <ellipse cx="240" cy="340" rx="170" ry="22" fill="var(--surface-bright, #e9e8e5)" />

          {/* Upper pedestal disc */}
          <ellipse cx="240" cy="330" rx="150" ry="20" fill="var(--surface-container, #e3e2df)" />
          <rect x="90" y="300" width="300" height="30" fill="var(--surface-container, #e3e2df)" />
          <ellipse cx="240" cy="300" rx="150" ry="20" fill="var(--surface-bright, #faf9f6)" />
        </g>

        {/* Product silhouette — abstract stacked toroid + facet cluster */}
        <g
          className="animate-[hero-breath_4s_ease-in-out_infinite]"
          style={{ transformOrigin: "240px 240px" }}
        >
          {/* Solitaire (octahedron faceted gem) on top */}
          <polygon
            points="240,150 270,210 240,260 210,210"
            fill="url(#product-grad)"
            stroke="var(--primary-container, #cb4926)"
            strokeWidth="1"
            opacity="0.95"
          />
          {/* Inner facet highlight */}
          <polygon points="240,165 258,205 240,225 222,205" fill="#fff" opacity="0.25" />

          {/* Ring (torus) base under the gem */}
          <ellipse
            cx="240"
            cy="270"
            rx="62"
            ry="14"
            fill="none"
            stroke="var(--primary, #a9310f)"
            strokeWidth="6"
            opacity="0.85"
          />
          <ellipse
            cx="240"
            cy="266"
            rx="62"
            ry="14"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            opacity="0.55"
          />
        </g>

        {/* Floating annotations */}
        <g
          className="font-mono text-[8px] uppercase tracking-widest"
          fill="currentColor"
          style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
        >
          {/* Top-left coordinate pill */}
          <g className="text-outline">
            <rect x="32" y="48" width="118" height="20" rx="2" fill="var(--surface-container-lowest, #fff)" stroke="currentColor" strokeWidth="0.5" opacity="0.9" />
            <text x="40" y="62" letterSpacing="1.4">
              x: 0.00  y: 0.45
            </text>
          </g>

          {/* Top-right camera tag */}
          <g className="text-outline">
            <rect x="338" y="48" width="110" height="20" rx="2" fill="var(--surface-container-lowest, #fff)" stroke="currentColor" strokeWidth="0.5" opacity="0.9" />
            <text x="346" y="62" letterSpacing="1.4">
              CAM_01 · 38mm
            </text>
          </g>

          {/* Bottom-left material tag */}
          <g className="text-primary">
            <rect x="32" y="420" width="146" height="22" rx="2" fill="var(--primary, #a9310f)" opacity="0.95" />
            <text x="40" y="434" fill="#fff" letterSpacing="1.6" fontWeight="600">
              18K · 0.04 IOR · GGX
            </text>
          </g>

          {/* Bottom-right FPS pill */}
          <g className="text-outline">
            <rect x="338" y="424" width="110" height="18" rx="2" fill="var(--surface-container-lowest, #fff)" stroke="currentColor" strokeWidth="0.5" opacity="0.9" />
            <circle cx="350" cy="433" r="3" fill="#10b981" />
            <text x="360" y="436" letterSpacing="1.4" fill="#10b981" fontWeight="600">
              60 FPS · ACTIVE
            </text>
          </g>
        </g>

        {/* Tick marks at the cardinal points of the outer ring */}
        <g
          fill="currentColor"
          className="text-primary"
        >
          <rect x="238" y="78" width="4" height="14" />
          <rect x="238" y="428" width="4" height="14" />
          <rect x="58" y="258" width="14" height="4" />
          <rect x="408" y="258" width="14" height="4" />
        </g>
      </svg>

      {/* Inline keyframes (prefers-reduced-motion handled in globals.css) */}
      <style>{`
        @keyframes hero-breath {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.015); }
        }
        @keyframes hero-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
