# CSS & Styling Rules

Project: Tailwind v4 (CSS-first). No `tailwind.config.js` — theme tokens are defined inside `src/app/globals.css` using `@theme`.

## Mobile-first

Write base styles for the smallest target. Layer up:

```css
.component { /* mobile */ }

@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1025px) { /* desktop */ }
```

In Tailwind classes, use the `md:` and `lg:` prefixes that match the same breakpoints (v4 default).

## Tokens, not magic values

- Colors, spacing, radii, fonts, and motion timing come from CSS variables / `@theme` in `src/app/globals.css`. Reuse them.
- Two-mode palette is mandatory: `Gallery Paper` (`#F7F7F8`) light and `Architectural Obsidian` (`#0C0D0E`) dark. Use the `bg-background` / `text-foreground` tokens; do not hardcode hex on components.
- Hairline border color: `rgba(255,255,255,0.08)` dark / `rgba(0,0,0,0.08)` light (already a token).
- Motion timing: `--ease-atelier`, `--duration-fast|normal|drawer` — see `ARCHITECTURE.md §7`.

## What to avoid

- No `!important` unless overriding a third-party or browser default that has no other handle.
- No `* { ... }` global resets. Tailwind v4 + `globals.css` cover the base.
- No `style={{ ... }}` inline objects for static styling — use classes. Inline styles are fine for dynamic values from props/state.
- No nested selectors deeper than 2 levels.
- No duplicate declarations across files. If a pattern repeats, extract a component or a utility class.

## Layout

- Use Flex/Grid primitives, not float-based layouts.
- 1px hairline borders define architectural divisions; respect the Swiss-grid spacing.
- Minimum touch target 44×44px on mobile interactive elements.

## Reduced motion

Wrap motion in:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable or shorten transitions/rotations */
}
```

This is non-negotiable for 3D rotations and slider animations.

## When to write a new file

- Page-specific layout → handled by Tailwind in the section file.
- Reusable composite (header, footer, drawer) → `src/components/shared/`.
- Atomic primitive (button, card, pill, slider) → `src/components/ui/`.
- If a style block needs to ship a third-party override, do it in a single named CSS file next to the component, not inline.
