---
name: implement-feature
description: Plan, implement, verify, and review a non-trivial feature. Enforces investigate → plan → implement → verify → review, with smallest-change discipline.
---

# Implement Feature

Use this skill for any feature that touches more than one file, introduces a new component, or changes routing/state. For trivial edits, skip straight to the change.

## Phase 1 — Investigate

Invoke `.agents/skills/investigate/` first. If the task is clear and you already have the context, summarize the relevant files in 3-5 lines instead.

## Phase 2 — Plan

Before any edit, write a plan that includes:

```markdown
## Files to add
- `path` — purpose

## Files to modify
- `path:line-range` — what changes

## Architecture impact
Which layer of the 3-layer pattern is affected (route / view / section / UI primitive / 3D).

## State changes
- New state, owner, listeners, cleanup.

## Reuse check
- Existing primitives or utilities being reused (with file paths).
- New dependencies considered and rejected — with reasons.

## Edge cases
- Empty data, missing assets, slow network, reduced-motion, off-screen canvas.

## Verification plan
- Which commands you'll run: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- What you'll eyeball in `npm run dev`.
```

Get user sign-off on the plan before implementing — for non-trivial work, prefer `EnterPlanMode` and `ExitPlanMode`.

## Phase 3 — Implement

Rules:

- **Smallest reasonable change.** Do not refactor neighboring code.
- **Reuse, don't reinvent.** If a UI primitive or 3D component already does it, import it.
- **No new dependencies** without explicit justification in the plan.
- **Maintain the 3-layer pattern.** New pages: route (`src/app/.../page.tsx`) → view (`src/views/.../index.tsx`) → sections (`src/views/.../sections/`). New components go to `src/components/ui/`, `shared/`, or `3d/` as appropriate.
- **Client boundaries only where needed.** Add `'use client'` to the smallest possible component. Keep Server Components as the default.
- **3D code:** dynamic import with `{ ssr: false }`, dispose on unmount, cap DPR, `frameloop="demand"` when applicable.
- **Backward compatible.** Don't rename public interfaces. Don't change exported prop shapes silently.

## Phase 4 — Verify

Run (or instruct the user to run) the project's available checks. Do not invent scripts that don't exist.

```bash
npm run lint
npx tsc --noEmit
npm run build
```

If a check fails, do not move to Phase 5. Fix or call it out.

## Phase 5 — Review

Run `git diff --stat` and `git diff`. Check for:

- Unrelated changes
- `console.log` / debugger left in
- Commented-out code
- Inline styles that should be tokens
- Missing cleanup (event listeners, observers, GPU resources)
- Missing focus/ARIA on new interactive elements
- Missing alt text on new images
- Reduced-motion handling on new animation

Return a one-paragraph summary: what changed, what was verified, what was skipped and why.

## Output

```markdown
## Summary
- What was implemented (1-2 sentences)

## Plan adherence
- Deviations from the plan and why

## Verification
- `npm run lint`: pass/fail
- `npx tsc --noEmit`: pass/fail
- `npm run build`: pass/fail (or "skipped — see note")

## Review notes
- Anything to revisit before commit
```
