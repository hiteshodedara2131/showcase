# Accessibility Rules

Target: WCAG 2.2 where practical. Project: Next.js 16 + R3F — DOM and WebGL surfaces both apply.

## Semantic HTML

- One `<h1>` per page, placed in `<main>`. Subsequent headings descend (`<h2>`, `<h3>`).
- Landmarks: `<header>`, `<main id="main-content">`, `<section aria-labelledby="...">`, `<footer>`.
- Use the right element for the job: `<button>` for actions, `<a>` for navigation, `<nav>` for nav blocks. Never a clickable `<div>` when a real button fits.
- Lists for list content (`<ul>`, `<ol>`). Tables for tabular data only.

## Focus

- Visible focus ring on every interactive element. Project standard: `focus-visible:ring-1 focus-visible:ring-emerald-400` (already in `globals.css`).
- Never `outline: none` without a replacement.
- Focus order must follow reading order. Avoid `tabindex` > 0.

## Touch & pointer

- Minimum 44×44px hit area on mobile controls.
- Provide press/hover state. Do not rely on color alone for state — pair with shape, label, or icon.

## Forms

- Every input has a `<label>` (or `aria-label` if the label is visually redundant).
- Errors are announced (`aria-live="polite"`) and tied to the input via `aria-describedby`.

## Media

- Decorative images: empty `alt=""`.
- Meaningful images: descriptive `alt`. No "image of…" boilerplate.
- Videos/audio: captions or transcripts.

## Motion

- Honor `prefers-reduced-motion: reduce` for 3D rotations, scroll-driven animations, and sliders. Pause or shorten the motion; do not just hide a wrapper.
- See `.agents/rules/performance.md` for the Three.js side.

## 3D / WebGL

- Provide a text alternative or fallback for the model (poster image, short description, or the model's metadata).
- Make Canvas pointer-events optional. A 3D hero should not trap keyboard focus or block screen readers.
- Any control that rotates the camera must be a real button with a real label, not a hidden div on the canvas.

## ARIA — minimal and accurate

- Prefer semantic HTML over ARIA. ARIA is for the cases HTML can't express.
- `aria-hidden="true"` on purely decorative icons (already a project convention).
- Modals: focus trap, ESC to close, return focus to the trigger on close.

## Color & contrast

- Body text meets 4.5:1 against background in both light and dark modes.
- Large text (≥ 18.66px bold or 24px regular) meets 3:1.
- Non-text UI (focus rings, icons that convey state) meets 3:1.
- The two-mode palette (`Gallery Paper` / `Architectural Obsidian`) is calibrated for this — do not change it without re-checking contrast.
