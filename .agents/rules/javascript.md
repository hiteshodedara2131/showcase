# JavaScript & TypeScript Rules

Project: Next.js 16 + React 19 + R3F. Strict TypeScript. ESLint v9 with `eslint-config-next`.

## Language

- Prefer `const`. Use `let` only when reassignment is required. Never `var`.
- Prefer early returns. Flatten nested conditionals.
- Strict mode is on (`"strict": true` in `tsconfig.json`). Do not add `// @ts-ignore` or `any` without a comment explaining why.
- `noEmit: true` — TypeScript is typecheck-only; never add code that compiles to JS by hand.

## React 19 specifics

- **Server Components by default.** Add `'use client'` only when a component uses state, effects, refs, or browser APIs.
- **Three.js Canvas must be client-side and dynamically imported:**
  ```tsx
  const StudioCanvas = dynamic(() => import('@/components/3d/StudioCanvas'), { ssr: false });
  ```
- **No barrel imports for hot paths.** Import directly from component files to keep RSC treeshaking clean (see `react-best-practices` skill → `bundle-barrel-imports`).
- **Clean up everything:** event listeners, observers, timers, WebGL resources, R3F state. Use `useEffect` cleanup, `disconnectedCallback`, or `useGLTF` cache eviction as appropriate.
- **Refs for non-reactive handles** (e.g. Three.js objects); state only for things that drive render.

## Async / data

- Handle `loading`, `error`, and `success` for every async UI surface.
- Cancel in-flight requests on unmount (`AbortController`) to prevent stale state.
- Never assume the first variant/first record exists. Validate IDs against actual data.
- Suspense boundaries belong on data boundaries, not on every component.

## Three.js / R3F specifics

- Dispose `geometry`, `material`, `texture`, `renderTarget`, and `controls` on unmount.
- Use `frameloop="demand"` when the scene does not need a continuous loop.
- Cap `dpr` to avoid mobile GPU burn: `Math.min(window.devicePixelRatio, 2)`.
- Pause rendering when the canvas is off-screen via `IntersectionObserver` if the scene is heavy.
- Cache `useGLTF` results; use DRACO compression for large models.

## Module hygiene

- Use the `@/*` path alias for everything under `src/`.
- Keep modules focused. If a file is over ~250 lines, look for an extraction point.
- No `console.log` left in committed code. Use `console.warn`/`console.error` only with context.
