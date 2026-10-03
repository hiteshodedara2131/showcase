# Contributing

Thanks for working on SHOWCASE. This is a Next.js 16 + React 19 + R3F/Three.js portfolio. The architecture and conventions are documented in [`ARCHITECTURE.md`](./ARCHITECTURE.md) — read it first.

## Setup

```bash
git clone <repo>
cd 3d-portfoliyo
npm install
npm run dev
```

Requires Node.js 20 or later (Next.js 16 requirement).

## Development

```bash
npm run dev      # Next.js dev server (Turbopack)
npm run lint     # ESLint v9 with eslint-config-next
npx tsc --noEmit # TypeScript typecheck
npm run build    # Production build
```

There is no test framework. Don't add one for a single change.

## Branching

- `feat/<short-kebab>` — new feature
- `fix/<short-kebab>` — bug fix
- `chore/<short-kebab>` — tooling, deps, config
- `refactor/<short-kebab>` — internal restructure, no behavior change
- `perf/<short-kebab>` — performance work
- `docs/<short-kebab>` — documentation only

Keep branches short-lived and rebased on `master`.

## Commit messages

Conventional style. Subject ≤ 72 chars, imperative mood, no trailing period.

```
<type>(<scope>): <imperative summary>

<optional body — wrap at 72 cols>
```

Types: `feat`, `fix`, `perf`, `refactor`, `chore`, `docs`, `test`, `style`, `build`, `ci`.

Examples:

```
feat(canvas): dispose GLB materials and geometries on route change
perf(loader): cap DPR to 2 and switch to frameloop="demand" on static scenes
fix(editor): cancel in-flight upload on unmount
```

## Pull requests

- Use the PR template (`.github/pull_request_template.md`).
- CI runs lint + typecheck + build on every PR. All three must pass.
- The author reviews the diff themselves before requesting review — `git diff --stat` and `git diff`.
- For non-trivial changes, request a second reviewer.
- Do not include unrelated changes (no drive-by refactors).

## Architecture rules — the short version

The full version is in `ARCHITECTURE.md` and `.agents/rules/architecture.md`.

1. **Three-layer pattern.** Routes are thin (`src/app/<route>/page.tsx`), views orchestrate (`src/views/<page-name>/index.tsx`), sections own their UI (`src/views/<page-name>/sections/`), and reusable components live in `src/components/{ui,shared,3d}/`.
2. **Server Components by default.** Add `'use client'` only when a component needs state, effects, refs, or browser APIs. Three.js Canvas must be dynamically imported with `{ ssr: false }`.
3. **Reuse, don't duplicate.** Buttons, cards, pills, sliders, toggles, modals all live in `src/components/ui/`. The drawer / dropdown / modal motion classes live in `src/app/globals.css`.
4. **3D hygiene.** Dispose on unmount. Cap `dpr` to 2. `frameloop="demand"` for static scenes. DRACO + KTX2 for assets. Respect `prefers-reduced-motion`.
5. **Accessibility.** WCAG 2.2 where practical. One `<h1>` per page, semantic landmarks, visible focus, 44×44px touch targets, real `<button>` elements, and alt text that describes (or empty alt for decorative images).

## Working with AI assistance

If you use Claude Code or another coding agent, follow the workflow in [`docs/AI-DEVELOPMENT.md`](./docs/AI-DEVELOPMENT.md). The short version:

- **Investigate before editing** for non-trivial work.
- **Plan before implementing** for anything that touches more than one file.
- **Review the diff** before committing.
- **Never push** without explicit permission.

## Security

Never commit secrets. The `.gitignore` already excludes `.env*`. If you accidentally commit a secret, rotate it immediately — git history rewriting doesn't undo exposure.
