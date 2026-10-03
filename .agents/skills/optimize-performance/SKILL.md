---
name: optimize-performance
description: Performance review and optimization guidance. Focuses on R3F/Three.js, asset weight, and Core Web Vitals. No premature micro-optimization.
---

# Optimize Performance

Use this skill when something feels slow — first paint, route change, 3D scene, asset load — or when a reviewer flagged a performance concern. Not for premature micro-optimization; the goal is meaningful user impact.

## Read first

- `.agents/rules/performance.md` — the project's perf rules
- `.agents/skills/r3f-fundamentals/SKILL.md` — dispose, frameloop, DPR
- `.agents/skills/r3f-loaders/SKILL.md` — asset pipeline
- `.agents/skills/react-best-practices/SKILL.md` → bundle rules

## What to measure before changing anything

- **Bundle size:** `npm run build` and inspect the output. Look for unexpectedly large chunks.
- **First Load JS per route:** Next.js prints this in the build output. Compare across routes.
- **Asset sizes:** `du -sh public/models/* public/textures/*`. Anything over a few MB deserves a look.
- **WebGL memory:** `renderer.info.memory` in dev — geometry/material/texture counts.
- **Frame rate:** `useFrame` deltas in the R3F profiler. `frameloop="demand"` and `frameloop="always"` show different patterns.
- **Web Vitals:** Use the browser's Performance panel on a real device throttled to "Mid-tier mobile".

## Common findings and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| Slow route change | Eager `import` of a heavy client component | `next/dynamic` with `{ ssr: false }` for Canvas |
| Memory growth across routes | Missing `dispose()` on geometry/material/texture | Add cleanup in `useEffect` return |
| Stuttering on mobile | Uncapped DPR | `dpr={[1, Math.min(window.devicePixelRatio, 2)]}` |
| Idle render cost | `frameloop="always"` on a static scene | `frameloop="demand"` |
| Layout shift on model load | Canvas without reserved aspect ratio | Wrap in sized container, or `<img>` poster underneath |
| Big first paint | Eager GLB load | Lazy-import, `<Suspense fallback={<FallbackPoster/>}>` |
| Bundle bloat | `import * as Icons from 'lucide-react'` | Import named: `import { ChevronRight } from 'lucide-react'` |
| Texture cost | 4K PNG diffuse for a thumbnail prop | Resize, KTX2 where supported, DRACO for geometry |

## Animation

- Animate `transform` and `opacity`. Never `width`, `height`, `top`, `left`.
- Wrap 3D rotations and scroll-driven motion in `prefers-reduced-motion` handling.
- For long-running transitions, use `will-change` sparingly. Remove it after.

## What NOT to do

- Don't micro-optimize `useState` → `useRef` conversions that don't affect render.
- Don't add a memoization layer without a profile showing the cost.
- Don't preload every GLB "just in case" — only preload the hero asset.
- Don't move things to Web Workers speculatively.
- Don't add a new dependency for performance; the existing stack can usually do it.

## Output

```markdown
## Measurement
What you observed (numbers, not vibes).

## Findings
Ranked by user impact. One line per item: symptom → cause → fix.

## Effort vs impact
- HIGH impact, LOW effort — do first
- HIGH impact, HIGH effort — schedule
- LOW impact, LOW effort — bundle into next pass
- LOW impact, HIGH effort — skip

## Risks
Edge cases where the optimization could regress something else.
```
