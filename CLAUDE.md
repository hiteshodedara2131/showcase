# CLAUDE.md

> Project guidance for Claude Code. Keep this file tight. For deep architecture see `ARCHITECTURE.md`; for scoped rules see `.agents/rules/`; for workflows see `.agents/skills/`.

@AGENTS.md

---

## Stack (do not change without discussion)

- **Framework:** Next.js 16.3.6 (App Router, Server Components by default). AGENTS.md above is auto-managed by `next dev` — read `node_modules/next/dist/docs/` before assuming any Next API.
- **UI:** React 19.2.8, TypeScript (strict), Tailwind v4 (CSS-first config in `src/app/globals.css`), ESLint v9.
- **3D:** Three.js 0.186 + `@react-three/fiber` 9 + `@react-three/drei` 10. SSR-free Canvas via `next/dynamic` with `{ ssr: false }`.

## Working principles

1. **Investigate before editing** for any non-trivial change. Use `.agents/skills/investigate/` or the `explorer` subagent.
2. **Plan before implementing** for anything touching more than one file. Use `.agents/skills/implement-feature/`.
3. **Smallest correct change.** Reuse what's there. Do not refactor unrelated code.
4. **Preserve architecture.** The 3-layer pattern (route → view → section → UI primitive) in `ARCHITECTURE.md` is mandatory. New pages follow it; new components land in `src/components/ui/`, `src/components/shared/`, or `src/components/3d/` as appropriate.
5. **Reuse existing skills.** The `.agents/skills/` directory holds curated, project-specific guidance (r3f-fundamentals, react-best-practices, frontend-design, web-design-guidelines, r3f-loaders). Consult them before guessing.
6. **No new dependencies without justification.** Three.js + R3F + Drei + Tailwind cover the stack; do not add UI kits, state libraries, or test frameworks unless the task requires it.

## Commands (use these, don't invent)

```bash
npm run dev      # next dev (Turbopack)
npm run lint     # eslint
npm run build    # next build
npx tsc --noEmit # typecheck (no script yet — OK to run)
```

## Git

- Inspect `git status` and `git diff` before committing. Do not include unrelated changes.
- Use conventional commit messages (`feat:`, `fix:`, `perf:`, `refactor:`, `chore:`, `docs:`).
- Branch prefixes: `feat/`, `fix/`, `chore/`, `refactor/`, `perf/`.
- Do not push unless explicitly asked.

## Files to read before writing 3D code

- `ARCHITECTURE.md` — three-layer pipeline and SEO/a11y/motion rules
- `.agents/rules/architecture.md` — same rules in agent-rule form
- `.agents/skills/r3f-fundamentals/SKILL.md` and `r3f-loaders/SKILL.md` — disposal, DRACO, Suspense
- `.agents/skills/react-best-practices/SKILL.md` — client/server split, dynamic imports
