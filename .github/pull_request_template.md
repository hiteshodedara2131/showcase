## Summary

<!-- What changed? 1-3 sentences. -->

## Why

<!-- Why was this change required? What problem does it solve? Link the issue or task. -->

## Changes

<!-- Bullet list of the meaningful changes. Not a re-statement of the diff. -->

-
-
-

## Testing

- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] Eyeballed in `npm run dev`

## Screenshots / Videos

<!-- Visual evidence when the change is user-visible. Drag-and-drop in the GitHub UI. -->

## Accessibility

- [ ] Keyboard interaction checked (Tab / Shift+Tab / Enter / Esc)
- [ ] Focus styles visible in both light and dark mode
- [ ] Reduced-motion (`prefers-reduced-motion: reduce`) handled for any new animation
- [ ] Semantic HTML used (no clickable `<div>`)
- [ ] Interactive elements meet 44×44px touch target on mobile
- [ ] Images have meaningful or empty alt as appropriate

## Performance

- [ ] No new heavy dependency
- [ ] No barrel imports of `lucide-react`, `@react-three/drei`, etc.
- [ ] No eager import of Three.js where dynamic import + `{ ssr: false }` is appropriate
- [ ] No new image, model, or texture asset over a few MB; new assets compressed (KTX2 / WebP / DRACO)
- [ ] No new top-level state that triggers wide re-renders
- [ ] No new animation of layout properties (`width`, `height`, `top`, `left`)

## Architecture

- [ ] 3-layer pattern (route → view → section → UI primitive) preserved, per `ARCHITECTURE.md`
- [ ] Reused existing components from `src/components/ui/`, `src/components/shared/`, or `src/components/3d/` instead of duplicating
- [ ] No new client-side boundary added without a real need (WebGL, state, effects, browser APIs)
- [ ] No `any`, `@ts-ignore`, or unsafe casts

## Out of scope

<!-- Anything reviewers should explicitly not block on. -->
