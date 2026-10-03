# Performance Rules

Project: Next.js 16 + R3F. 3D portfolio — visual fidelity and frame rate both matter.

## Core Web Vitals

- **LCP:** Hero model/texture should preload only what's needed for the first paint. Avoid preloading every GLB.
- **CLS:** Always set `width`/`height` on `<img>` and reserve aspect ratio on R3F Canvas wrappers. No layout shift from late-arriving 3D assets.
- **INP:** Keep event handlers cheap. Defer non-critical work; do not run heavy 3D math on the main thread unless required.

## R3F / Three.js

- **Dispose on unmount:** `geometry.dispose()`, `material.dispose()`, `texture.dispose()`, `controls.dispose()`. Do not leak GPU memory across route changes.
- **Cap DPR:** `dpr={[1, Math.min(window.devicePixelRatio, 2)]}`. Avoid pixel-peeping on high-DPI mobile.
- **`frameloop="demand"`** for static scenes. Switch to `"always"` only when continuous animation is required.
- **Lazy canvas mount:** Wrap `<Canvas>` in `next/dynamic` with `{ ssr: false }`. Never SSR a Canvas.
- **DRACO + KTX2:** Use `useGLTF` with DRACO compression for `.glb`; prefer KTX2 textures for GPU efficiency.
- **Asset limits:** Watch polygon counts and texture sizes. A 4K diffuse on a thumbnail-sized prop is waste.
- **Pause when off-screen:** If the scene is heavy, pause the render loop via `IntersectionObserver` on the Canvas wrapper.
- **Single shared scene/lighting rig** per route — do not re-create lights per mesh.

## Rendering

- Avoid layout thrashing. Do not read `clientWidth`/`getBoundingClientRect` in a render loop.
- Batch DOM updates where possible.
- `useState` only for things that change visually. Use `useRef` for Three.js objects.
- No inline object/array creation in JSX for R3F (`<mesh position={[0,0,0]} />` in a loop is fine; a fresh array literal in every render of a parent is not).

## Bundle

- **No barrel imports** for R3F or `lucide-react`. Import named exports directly.
- **Dynamic import** the entire `three` graph for off-screen routes.
- **Tree-shake** the icons you use; do not import `* from 'lucide-react'`.

## Network

- Lazy-load below-the-fold 3D models.
- Use Suspense with a `<FallbackPoster />` (already in `src/components/shared/`) for instant first paint.
- Compress and resize all `public/textures/*` originals. Do not ship 8K sources.

## Animation

- Animate `transform` and `opacity`. Avoid animating layout properties (`width`, `height`, `top`).
- Respect `prefers-reduced-motion: reduce` for any 3D rotation, scroll-driven, or transition.
- See `.agents/rules/css.md` for the motion token system.

## When reviewing

A reviewer should be able to answer: "Is the dispose path complete? Is DPR capped? Is the canvas SSR-safe? Are assets lazy and compressed?"
