---
name: review
description: Read-only code review of pending changes. Categorizes findings by severity. Does not modify code.
---

# Review

Use this skill after implementing a non-trivial change, or before opening a PR. Read-only. You do not edit files; you report.

## What to inspect

```bash
git status
git diff --stat
git diff
```

Then read the touched files in context — start with the diff, expand to neighboring code only when needed.

## What to look for

- **Correctness:** logic errors, off-by-one, wrong assumption about data, race conditions, missing await, missing cleanup.
- **Type safety:** `any`, `@ts-ignore`, unsafe casts, missing generics, prop types that don't match usage.
- **React/Next.js:** unnecessary `'use client'`, missed `useEffect` cleanup, missing keys, hydration risk, barrel imports, server/client boundary leaks.
- **3D / R3F:** missing dispose, uncapped `dpr`, full-time `frameloop="always"` for static scenes, missing Suspense, missing DRACO, missing `IntersectionObserver` pause for off-screen canvas.
- **Accessibility:** missing alt, missing focus styles, clickable `<div>` instead of button, missing `aria-label`, motion without `prefers-reduced-motion`, touch targets < 44px.
- **Performance:** new bundle bloat, eager imports of large libs, image/asset size, layout shift risk, animation of layout properties.
- **Styling:** magic numbers, hardcoded colors that should be tokens, missing mobile-first consideration, `!important` use, duplicated declarations.
- **Git hygiene:** unrelated changes mixed in, debug code, commented-out code, secrets, `console.log`.
- **Architecture drift:** new code that doesn't follow the 3-layer pattern in `ARCHITECTURE.md`, or duplicates a primitive that already exists in `src/components/ui/`.

## Severity scale

- **CRITICAL** — breaks the app, loses data, ships a secret, ships a regression. Block merge.
- **HIGH** — likely bug, missing cleanup, accessibility violation, performance cliff. Block merge unless explicitly waived.
- **MEDIUM** — code smell, missing test/edge case, near-duplicate of existing utility. Discuss before merge.
- **LOW** — naming, comment, micro-style. Don't block on these.

## What not to flag

- Style preferences with no measurable impact.
- Suggestions to refactor unrelated code.
- "Add tests" if no test framework exists in the project.
- Speculative future requirements.

## Output

```markdown
## Review summary
One or two sentences. Overall assessment.

## Findings

### CRITICAL
- `path:line` — what's wrong, why it matters, suggested fix

### HIGH
- ...

### MEDIUM
- ...

### LOW
- ...

## Verified
What you checked and confirmed is correct. Keeps the author from re-checking.

## Out of scope
Things you noticed but did not flag.
```
