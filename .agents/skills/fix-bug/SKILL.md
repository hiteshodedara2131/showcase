---
name: fix-bug
description: Diagnose and fix a bug with smallest-safe-change discipline. Reproduces, traces root cause, fixes, verifies.
---

# Fix Bug

Use this skill when something is broken. Reproduce the issue in your head, find the actual cause, and fix it without patching symptoms.

## Workflow

1. **State the expected behavior.** What should happen?
2. **State the actual behavior.** What does happen? What is the user-visible symptom?
3. **Reproduce.** Either logically (trace the data) or via the running app. If you can't repro, say so — don't guess.
4. **Trace the implementation.** Read the entry point → state owner → side effects. Check the actual values, not assumed ones.
5. **Find the root cause.** Not the symptom. The symptom is where it shows up; the cause is where it goes wrong.
6. **Fix the smallest safe thing.** One commit's worth of change. If you find two bugs, fix one and note the other.
7. **Check related functionality.** Did the fix break a sibling path? Are there other inputs that exercise the same code?
8. **Verify.** Run `npm run lint`, `npx tsc --noEmit`, and — if cheap — `npm run build`. Eyeball in `npm run dev`.
9. **Review the diff.** No unrelated cleanup, no formatting churn, no opportunistic refactors.

## Reading the existing skills

Before diagnosing, consult the matching project skill:

- R3F/Three.js symptom (memory leak, render glitch, blank canvas) → `.agents/skills/r3f-fundamentals/SKILL.md` and `r3f-loaders/SKILL.md`
- React/Next.js symptom (hydration mismatch, effect loop, stale state) → `.agents/skills/react-best-practices/SKILL.md`
- Visual / contrast / focus symptom → `.agents/skills/web-design-guidelines/SKILL.md`

## Anti-patterns to avoid

- **Symptom patching.** `if (x) return null` to hide a crash. Find the cause.
- **Defensive duplication.** Wrapping every call in try/catch. The bug is upstream.
- **Refactor-on-fix.** Renaming variables, splitting files, "while I'm here…" — commit those separately.
- **Type-loosening.** Switching to `any` or `@ts-ignore` to silence a type error. Investigate the type first.
- **Adding a dependency to dodge a bug.** The dependency is rarely the right answer.

## Output

```markdown
## Root cause
One sentence. Where, and why.

## Fix
What you changed. Cite the file:line.

## Files changed
- `path` — what changed

## Validation performed
- `npm run lint`: pass/fail
- `npx tsc --noEmit`: pass/fail
- `npm run build`: pass/fail / not run (with reason)
- Manual check in `npm run dev`: what you observed

## Potential edge cases
- Input that wasn't tested but might hit the same code
- Assumptions made about data shape
```

If the root cause is not findable from the tree, say so. Do not invent a fix.
