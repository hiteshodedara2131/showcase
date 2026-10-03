# SHOWCASE — Architecture & Engineering Blueprint

> **Mandatory Reference**: This file defines the permanent architectural, organizational, and engineering conventions for the entire SHOWCASE project. Every component, section, view, and page must follow these standards without exception.

---

## 1. High-Level Architecture Overview

The project is structured into three clean, decoupled layers to prevent tight coupling, enable DRY reuse, and guarantee optimal Next.js Turbopack build performance:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. APP ROUTER & SEO LAYER (`src/app/**/page.tsx`)                     │
│    • Thin route entry points (Server Components by default)            │
│    • Declares typed Next.js `Metadata` (SEO title, description, OG)    │
│    • Delegates rendering directly to the corresponding Page View       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ imports
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 2. PAGE VIEW & SECTIONS LAYER (`src/views/<page-name>/`)              │
│    • `index.tsx`: View orchestrator (coordinates state & layout)       │
│    • `sections/<SectionName>.tsx`: Focused, single-purpose sections    │
│    • Assembles semantic landmarks (`<main>`, `<section>`, etc.)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ imports
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 3. REUSABLE ATOMIC & DOMAIN LAYER (`src/components/`)                 │
│    • `ui/`: Decoupled, props-driven UI primitives (Button, Pill, Card) │
│    • `shared/`: Composite UI widgets (Header, Footer, ThemeToggle)     │
│    • `3d/`: Isolated WebGL & R3F components (Canvas, Lighting, HUD)    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Directory Hierarchy & File Naming Conventions

```
src/
├── app/                                    # ROUTE & SEO LAYER
│   ├── layout.tsx                          # Root layout, theme provider, global fonts
│   ├── globals.css                         # Tailwind v4 theme tokens & CSS variables
│   ├── page.tsx                            # Thin delegator for Home ('/')
│   ├── showcase/
│   │   ├── page.tsx                        # Thin delegator for '/showcase'
│   │   ├── [category]/page.tsx             # Thin delegator for '/showcase/[category]'
│   │   ├── shoe-experience/page.tsx        # Thin delegator for shoe flagship
│   │   ├── ring-experience/page.tsx        # Thin delegator for ring flagship
│   │   └── scroll-product-reveal/page.tsx  # Thin delegator for scroll animation
│   ├── scenes/
│   │   ├── page.tsx                        # Thin delegator for scene library
│   │   └── [slug]/page.tsx                 # Thin delegator for scene detail
│   ├── create/
│   │   └── page.tsx                        # Thin delegator for create flow
│   ├── editor/
│   │   ├── new/page.tsx                    # Thin delegator for editor dropzone
│   │   └── [projectId]/
│   │       ├── page.tsx                    # Thin delegator for 3D editor
│   │       ├── model-check/page.tsx        # Thin delegator for validation
│   │       └── export/page.tsx             # Thin delegator for export
│   └── (marketing)/...                     # Other routes (about, pricing, guides, etc.)
│
├── views/                                  # PAGE VIEW & SECTIONS LAYER
│   ├── home/
│   │   ├── index.tsx                       # Home page view orchestrator
│   │   └── sections/                       # Home isolated sections
│   │       ├── HeroSection.tsx
│   │       ├── DualWorkflowSection.tsx
│   │       ├── CuratedShowcaseSection.tsx
│   │       ├── SceneEnvironmentsSection.tsx
│   │       └── OutputStudioSection.tsx
│   ├── showcase-catalog/
│   │   ├── index.tsx
│   │   └── sections/
│   │       ├── CatalogHeroSection.tsx
│   │       ├── FilterBarSection.tsx
│   │       └── ProjectGridSection.tsx
│   ├── shoe-demo/
│   │   ├── index.tsx
│   │   └── sections/
│   └── editor/
│       ├── index.tsx
│       └── sections/
│
├── components/                             # REUSABLE COMPONENT LIBRARY
│   ├── ui/                                 # Pure, decoupled UI primitives
│   │   ├── Button.tsx                      # Primary, secondary, HUD pill buttons
│   │   ├── Badge.tsx                       # Status, category & telemetry tags
│   │   ├── Pill.tsx                        # Tactile camera/model switcher pill
│   │   ├── Card.tsx                        # Architectural mount container
│   │   ├── Slider.tsx                      # PBR slider with live value readout
│   │   ├── Toggle.tsx                      # Segmented switch & wireframe toggle
│   │   └── Modal.tsx                       # Accessible dialog overlay
│   ├── shared/                             # Shared composite widgets
│   │   ├── Header.tsx                      # Global top navigation & mobile sheet
│   │   ├── Footer.tsx                      # Global architectural footer
│   │   ├── ThemeToggle.tsx                 # Instant Light / Dark mode switcher
│   │   └── FallbackPoster.tsx              # High-res poster & WebGL fallback
│   └── 3d/                                 # WebGL & R3F components
│       ├── StudioCanvas.tsx                # Dynamic SSR-free Canvas wrapper
│       ├── StudioLighting.tsx              # PBR lighting rig & HDRI reflections
│       ├── CameraRig.tsx                   # Animated OrbitControls with lerping
│       ├── TelemetryHUD.tsx                # Monospaced coordinates, FPS & stats
│       └── FloorShadow.tsx                 # Ground contact shadows
│
└── lib/                                    # UTILITIES, HOOKS & TYPES
    ├── constants/                          # Color palettes, camera angles, mock data
    ├── hooks/                              # useTheme, useWebGLSupport, useMediaQuery
    └── utils/                              # cn class merging, formatting
```

---

## 3. Component Decoupling & DRY Rules

### 3.1 Single Source of Truth for Common UI
* **NEVER inline or duplicate recurring elements**:
  * Any button, pill, badge, card mount, slider, or toggle must be imported from `src/components/ui/`.
  * Navigation, footers, theme switchers, and posters must be imported from `src/components/shared/`.
  * 3D Canvas wrappers, lights, controls, and HUD counters must be imported from `src/components/3d/`.

### 3.2 Props-Driven & Loosely Coupled
* Primitives in `src/components/ui/` must only receive data via explicit, typed props and callbacks.
* **No internal route assumptions**: UI components must never hardcode page-specific stores or state hooks.

---

## 4. Page Composition Pattern: Route → View → Sections

Every route follows this exact three-step pipeline:

### Step 1: The Thin Route Handler (`src/app/<route>/page.tsx`)
```tsx
import type { Metadata } from "next";
import HomeView from "@/views/home";

export const metadata: Metadata = {
  title: "Showcase — 3D Product Exhibition & Studio",
  description: "Explore interactive 3D product showcases or place your model in a prepared scene.",
  openGraph: {
    title: "Showcase — 3D Product Exhibition & Studio",
    description: "Explore interactive 3D product showcases or place your model in a prepared scene.",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeView />;
}
```

### Step 2: The View Orchestrator (`src/views/<page-name>/index.tsx`)
```tsx
import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { DualWorkflowSection } from "./sections/DualWorkflowSection";
import { CuratedShowcaseSection } from "./sections/CuratedShowcaseSection";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function HomeView() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <DualWorkflowSection />
        <CuratedShowcaseSection />
      </main>
      <Footer />
    </div>
  );
}
```

### Step 3: The Isolated Section (`src/views/<page-name>/sections/<SectionName>.tsx`)
* Focused on one job (e.g. Hero, Grid, Features, CTA).
* Encapsulates section-specific markup and semantic tags.
* Employs standard UI primitives (`Button`, `Card`, `Badge`, `Pill`).

---

## 5. Comprehensive SEO & Accessibility Standards

Every single page must satisfy these SEO standards:

1. **Heading Hierarchy**:
   * Exactly **one `<h1>` tag per page**, placed meaningfully within `<main>`.
   * Subsequent headings must follow descending order (`<h2>` for sections, `<h3>` for cards).
2. **Metadata & Open Graph**:
   * Base title template configured in `layout.tsx`: `%s | Showcase`.
   * Unique, compelling, keyword-rich `description` on every route.
   * `openGraph` and `twitter` card objects declared on every page.
3. **Semantic Landmarks**:
   * `<header>` for navigation.
   * `<main id="main-content">` for primary content.
   * `<section aria-labelledby="section-id">` for content sections.
   * `<footer>` for colophon, legal links, and secondary navigation.
4. **Accessible Attributes**:
   * All icons marked with `aria-hidden="true"`.
   * Unique `id` attributes on all interactive controls (toggles, camera buttons, inputs).
   * Minimum touch target size of 44x44px for mobile interaction.
   * Explicit high-contrast focus rings (`focus-visible:ring-1 focus-visible:ring-emerald-400`).

---

## 6. Integration of the 5 Frontend Skills

| Skill | Guideline Applied |
| :--- | :--- |
| **`frontend-design`** | • **Zero AI Tells**: No purple gradients, glowing blobs, or generic SaaS 3-card kits.<br>• **Swiss Architectural Aesthetic**: Disciplined 1px hairline rules, generous negative space.<br>• **Calibrated Two-Mode System**: Gallery Paper (`#F7F7F8`) light mode & Architectural Obsidian (`#0C0D0E`) dark mode.<br>• **Typography**: Hanken Grotesk (display/headlines) + JetBrains Mono (HUD/telemetry). |
| **`react-best-practices`** | • **Server/Client Split**: Only add `'use client'` where WebGL or state hooks are required.<br>• **Dynamic Imports**: Load Three.js Canvas via `next/dynamic` with `{ ssr: false }`.<br>• **No Barrel Export Overhead**: Import directly from component paths.<br>• **Performance**: Avoid inline function re-allocations in 3D frame loops. |
| **`web-design-guidelines`** | • **Contrast & Legibility**: High contrast in both light and dark modes.<br>• **Touch Targets**: Minimum 44x44px hit areas on mobile controls.<br>• **Reduced Motion**: Respect `prefers-reduced-motion` for 3D rotations and transitions. |
| **`r3f-fundamentals`** | • **Memory Ownership**: Geometry and material disposal on unmount.<br>• **Frameloop Optimization**: `frameloop="demand"` where appropriate.<br>• **Canvas Isolation**: Proper z-index and event capture boundaries. |
| **`r3f-loaders`** | • **Asset Pipeline**: `useGLTF` with DRACO compression and `Suspense`.<br>• **Fallback Experience**: Instant static WebP poster during model load.<br>• **True Cutouts**: Genuine transparent assets with realistic contact shadows; never show checkerboard grids. |

---

## 7. Kinetic Motion System (Sidebars, Drawers, Dropdowns, Popovers)

To ensure buttery, jitter-free animations across all interactive drawers, dropdowns, and sidebars, always use the consistent CSS variables and utility classes defined in `globals.css`:

### Variables
- `--ease-atelier`: `cubic-bezier(0.16, 1, 0.3, 1)` (Swiss/CAD natural spring deceleration without bounce)
- `--ease-atelier-in`: `cubic-bezier(0.7, 0, 0.84, 0)` (Decelerated exit)
- `--ease-atelier-in-out`: `cubic-bezier(0.65, 0, 0.35, 1)`
- `--duration-fast`: `200ms` (tooltips, tiny popovers)
- `--duration-normal`: `320ms` (modals, dropdown menus)
- `--duration-drawer`: `380ms` (sidebars, sheet drawers, mobile nav)

### Utility Classes
1. `.drawer-panel-right`: Right-docked sidebars (e.g. 3D Model Property Inspector). Persistently mounted with `translate-x-full opacity-0 pointer-events-none invisible` when closed and `translate-x-0 opacity-100 pointer-events-auto visible` when open. Guarantees smooth exit AND enter animations.
2. `.drawer-panel-left`: Left-docked navigation/tree view drawers.
3. `.drawer-panel-top`: Top-down dropdowns and mobile navigation drawers (e.g. Header mobile menu).
4. `.drawer-panel-bottom`: Mobile bottom sheets.
5. `.dropdown-panel`: Popover menus and context panels.
6. `.modal-panel`: Centered dialog modals.

