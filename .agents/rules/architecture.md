# SHOWCASE — Architectural Rules & Implementation Standards

> **Permanent Customization Rule**: All code written in this repository must comply with the architecture defined here.

## 1. Architectural Layers & File Separation
* **App Router Layer (`src/app/**/page.tsx`)**: Thin Server Component route handlers. Declare typed `Metadata` (SEO title, description, Open Graph) and delegate to `src/views/<page-name>/index.tsx`. Keep under 40 lines of code.
* **Page View Layer (`src/views/<page-name>/index.tsx`)**: Orchestrates page layout, coordinates view-level state, and imports isolated section components from `src/views/<page-name>/sections/`.
* **Section Layer (`src/views/<page-name>/sections/<SectionName>.tsx`)**: Self-contained sections managing specific UI domains (e.g. Hero, Grid, Features, CTA). Must use semantic tags like `<section aria-labelledby="...">`.
* **Reusable UI Library (`src/components/ui/`)**: Decoupled, props-driven atomic primitives (`Button`, `Badge`, `Pill`, `Card`, `Slider`, `Toggle`, `Modal`). Never duplicate or hardcode these on individual pages.
* **Shared Composite Widgets (`src/components/shared/`)**: Global composite components (`Header`, `Footer`, `ThemeToggle`, `FallbackPoster`).
* **3D Canvas & WebGL (`src/components/3d/`)**: Dynamic, SSR-free Canvas wrappers, lighting rigs, camera rigs, and telemetry HUDs.

## 2. Mandatory SEO & Accessibility Standards
1. Single semantic `<h1>` per page.
2. Semantic landmark HTML (`<header>`, `<main id="main-content">`, `<section>`, `<footer>`).
3. Title template format: `%s | Showcase — 3D Product Exhibition & Studio`.
4. Unique `id` attributes on all interactive controls.
5. Minimum 44x44px touch targets on mobile.
6. Visible focus rings (`focus-visible:ring-1 focus-visible:ring-emerald-400`).

## 3. Frontend Skills Compliance
* **`frontend-design`**: No purple gradients, glowing blobs, or generic SaaS card kits. Swiss architectural grid with 1px hairline borders (`rgba(255,255,255,0.08)` / `rgba(0,0,0,0.08)`). Two calibrated palettes: Gallery Paper (`#F7F7F8`) and Architectural Obsidian (`#0C0D0E`). Hanken Grotesk + JetBrains Mono.
* **`react-best-practices`**: Client/Server boundary separation, dynamic imports with `{ ssr: false }` for Three.js Canvas, no barrel export overhead, optimized frame loops.
* **`web-design-guidelines`**: Contrast compliance, accessible labels, prefers-reduced-motion fallbacks.
* **`r3f-fundamentals` & `r3f-loaders`**: Memory disposal on unmount, DRACO compression with `useGLTF`, Suspense loading, and genuine transparent cutouts with contact shadows (no checkerboards).
