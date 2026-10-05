"use client";

/**
 * Architectural Kinetic-Atelier hero artwork.
 *
 * Pure SVG — zero JS animation, zero WebGL. Designed to sit on the right
 * half of the hero and read at any size from 320 px to 1920 px.
 *
 * Composition (back to front, with depth ordering for the "turntable" effect):
 *   1. Coordinate blueprint grid (static, slow drift)
 *   2. Orbiting horizon disc — concentric rings + radial tick marks that
 *      rotate clockwise around the pedestal, reading as a turntable floor
 *      that the camera is looking down onto. This is the "ground going
 *      behind the stage" the user asked for.
 *   3. Counter-rotating inner measurement rings (orbit at a different
 *      cadence so the parallax reads as real depth).
 *   4. Stacked stone pedestal (static foreground — masks the rotating
 *      floor so the rotation visibly disappears behind the stage).
 *   5. Product silhouette (subtle breath / hover on Y axis).
 *   6. Floating measurement annotations + telemetry pill.
 *
 * CSS keyframes drive the rotation + breath; both are suppressed under
 * `prefers-reduced-motion`.
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
        aria-label="Architectural kinetic diagram of a staged 3D product specimen rotating on a turntable floor under calibrated studio lighting"
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

          {/* Floor / horizon disc gradient — gives the turntable surface
              a sense of receding depth behind the pedestal. */}
          <radialGradient id="floor-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--primary, #a9310f)" stopOpacity="0" />
            <stop offset="65%" stopColor="var(--primary, #a9310f)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--primary, #a9310f)" stopOpacity="0.18" />
          </radialGradient>

          {/* Pedestal clip — the rotating floor is masked by the pedestal
              so it appears to disappear behind the stage. */}
          <clipPath id="floor-clip">
            <rect x="0" y="0" width="480" height="480" />
          </clipPath>

          {/* Soft drop shadow under the pedestal */}
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

        {/* 1. Background blueprint grid (static) */}
        <rect width="480" height="480" fill="url(#ha-grid)" className="text-outline" />

        {/* 2. Turntable floor — rotates clockwise. Drawn first so the
              pedestal sits on top of it. The radial gradient sells the
              "floor receding into the distance" feel. */}
        <g
          clipPath="url(#floor-clip)"
          style={{ transformOrigin: "240px 340px" }}
        >
          {/* Rotating horizon disc — main turntable floor */}
          <g className="animate-[hero-spin_18s_linear_infinite]" style={{ transformOrigin: "240px 340px" }}>
            {/* Wide tinted floor wash so the rotation reads as a flat surface */}
            <circle cx="240" cy="340" r="220" fill="url(#floor-grad)" />

            {/* Cardinal cross lines through the turntable center */}
            <line x1="20" y1="340" x2="460" y2="340" stroke="var(--primary, #a9310f)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.45" />
            <line x1="240" y1="120" x2="240" y2="560" stroke="var(--primary, #a9310f)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.45" />

            {/* 12 radial tick marks at every 30° — the visible "spokes" of the rotating turntable */}
            <g stroke="var(--primary, #a9310f)" strokeWidth="1" opacity="0.55">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const r1 = 195;
                const r2 = 215;
                const cx = 240;
                const cy = 340;
                // Round to 2 decimals so server and client render identical
                // SVG attributes (raw Math.cos/sin produces values that differ
                // in the last significant digit between V8 instances, which
                // triggers a React hydration mismatch).
                const round = (n: number) => Math.round(n * 100) / 100;
                return (
                  <line
                    key={i}
                    x1={round(cx + Math.cos(angle) * r1)}
                    y1={round(cy + Math.sin(angle) * r1)}
                    x2={round(cx + Math.cos(angle) * r2)}
                    y2={round(cy + Math.sin(angle) * r2)}
                  />
                );
              })}
            </g>

            {/* Concentric distance rings on the turntable floor — elliptical so they read as a perspective view */}
            <g
              fill="none"
              stroke="var(--primary, #a9310f)"
              strokeWidth="0.6"
              opacity="0.4"
            >
              <ellipse cx="240" cy="340" rx="210" ry="46" />
              <ellipse cx="240" cy="340" rx="170" ry="36" strokeDasharray="2 3" />
              <ellipse cx="240" cy="340" rx="125" ry="26" />
            </g>

            {/* North-pole cardinal label (rotates with the disc) */}
            <g
              fill="var(--primary, #a9310f)"
              className="font-mono"
              style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
            >
              <text x="232" y="138" fontSize="9" letterSpacing="1.5" fontWeight="600">N</text>
              <text x="247" y="138" fontSize="9" letterSpacing="1.5" fontWeight="600">S</text>
              <text x="232" y="548" fontSize="9" letterSpacing="1.5" fontWeight="600">S</text>
              <text x="247" y="548" fontSize="9" letterSpacing="1.5" fontWeight="600">·</text>
            </g>
          </g>
        </g>

        {/* 3. Counter-rotating measurement rings — slower, opposite direction,
              so the parallax between the floor and these read as depth. */}
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-outline opacity-50 animate-[hero-spin-reverse_36s_linear_infinite]"
          style={{ transformOrigin: "240px 340px" }}
        >
          <circle cx="240" cy="340" r="232" strokeDasharray="1 5" />
        </g>

        {/* 4. Light beams descending from above — static, anchored at the
              light source so they don't make the turntable feel floaty. */}
        <g opacity="0.55">
          <polygon points="180,40 300,40 340,300 140,300" fill="var(--primary, #a9310f)" opacity="0.12" />
          <polygon points="210,40 270,40 290,300 190,300" fill="var(--primary, #a9310f)" opacity="0.18" />
        </g>

        {/* 5. Stacked stone pedestal — static, in front of the rotating floor.
              The pedestal is what "occludes" the floor, making the rotation
              feel like the ground is going behind the stage. */}
        <g filter="url(#soft-shadow)">
          {/* Lower foundation ring */}
          <ellipse cx="240" cy="370" rx="170" ry="22" fill="var(--surface-dim, #dbdad7)" />
          <rect x="70" y="340" width="340" height="30" fill="var(--surface-dim, #dbdad7)" />
          <ellipse cx="240" cy="340" rx="170" ry="22" fill="var(--surface-bright, #e9e8e5)" />

          {/* Upper pedestal disc */}
          <ellipse cx="240" cy="330" rx="150" ry="20" fill="var(--surface-container, #e3e2df)" />
          <rect x="90" y="300" width="300" height="30" fill="var(--surface-container, #e3e2df)" />
          <ellipse cx="240" cy="300" rx="150" ry="20" fill="var(--surface-bright, #faf9f6)" />

          {/* Hairline top bevel on the pedestal disc */}
          <ellipse cx="240" cy="300" rx="150" ry="20" fill="none" stroke="var(--primary, #a9310f)" strokeWidth="0.6" opacity="0.4" />
        </g>

        {/* 6. Product silhouette — breathes & gently hovers above the pedestal */}
        <g
          className="animate-[hero-hover_4.5s_ease-in-out_infinite]"
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

        {/* 7. Floating annotations (static, on top of everything) */}
        <g
          className="font-mono uppercase tracking-widest"
          fill="currentColor"
          style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
        >
          {/* Top-left coordinate pill */}
          <g className="text-outline">
            <rect x="32" y="48" width="118" height="20" rx="2" fill="var(--surface-container-lowest, #fff)" stroke="currentColor" strokeWidth="0.5" opacity="0.9" />
            <text x="40" y="62" fontSize="8" letterSpacing="1.4">
              x: 0.00  y: 0.45
            </text>
          </g>

          {/* Top-right camera tag */}
          <g className="text-outline">
            <rect x="338" y="48" width="110" height="20" rx="2" fill="var(--surface-container-lowest, #fff)" stroke="currentColor" strokeWidth="0.5" opacity="0.9" />
            <text x="346" y="62" fontSize="8" letterSpacing="1.4">
              CAM_01 · 38mm
            </text>
          </g>

          {/* Bottom-left material tag */}
          <g className="text-primary">
            <rect x="32" y="420" width="146" height="22" rx="2" fill="var(--primary, #a9310f)" opacity="0.95" />
            <text x="40" y="434" fontSize="8" fill="#fff" letterSpacing="1.6" fontWeight="600">
              18K · 0.04 IOR · GGX
            </text>
          </g>

          {/* Bottom-right FPS pill */}
          <g className="text-outline">
            <rect x="338" y="424" width="110" height="18" rx="2" fill="var(--surface-container-lowest, #fff)" stroke="currentColor" strokeWidth="0.5" opacity="0.9" />
            <circle cx="350" cy="433" r="3" fill="#10b981" />
            <text x="360" y="436" fontSize="8" letterSpacing="1.4" fill="#10b981" fontWeight="600">
              60 FPS · ACTIVE
            </text>
          </g>
        </g>

        {/* Cardinal tick marks at the static ring (decorative) */}
        <g fill="currentColor" className="text-primary">
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
        @keyframes hero-hover {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-4px); }
        }
        @keyframes hero-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hero-spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};
