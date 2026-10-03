# AI Development Guide

This project is configured to work well with Claude Code and other coding agents. The configuration is split into **rules** (always-on guidance), **skills** (workflows you invoke), and **agents** (isolated read-only reviewers).

## Where things live

```
.
├── CLAUDE.md                           # Top-level guidance. Read first.
├── AGENTS.md                           # Auto-managed by `next dev`. Read it.
├── ARCHITECTURE.md                     # The 3-layer pipeline. Read before refactors.
├── CONTRIBUTING.md                     # Setup, branching, commit/PR conventions.
│
├── .agents/
│   ├── rules/                          # Always-on, scoped guidance
│   │   ├── architecture.md             # 3-layer pattern, SEO, a11y, motion tokens
│   │   ├── javascript.md               # TS/React/R3F hygiene
│   │   ├── css.md                      # Tailwind v4, mobile-first, tokens
│   │   ├── performance.md              # R3F, dispose, DPR, Core Web Vitals
│   │   ├── accessibility.md            # WCAG 2.2, focus, motion
│   │   └── git.md                      # Conventional commits, branch hygiene
│   │
│   ├── skills/                         # Workflows you invoke
│   │   ├── investigate/SKILL.md        # Read-only root-cause analysis
│   │   ├── implement-feature/SKILL.md  # Plan → implement → verify → review
│   │   ├── fix-bug/SKILL.md            # Smallest-safe-change bug fixing
│   │   ├── review/SKILL.md             # Severity-ranked review
│   │   ├── optimize-performance/SKILL.md
│   │   ├── commit/SKILL.md             # Conventional commit prep
│   │   ├── frontend-design/SKILL.md    # Existing — visual language
│   │   ├── web-design-guidelines/SKILL.md  # Existing — broader a11y/perf
│   │   ├── react-best-practices/SKILL.md   # Existing — React/Next.js
│   │   ├── r3f-fundamentals/SKILL.md   # Existing — Three.js + R3F
│   │   └── r3f-loaders/SKILL.md        # Existing — GLB/KTX2/DRACO
│   │
│   └── agents/                         # Isolated, read-only reviewers
│       ├── explorer.md                 # Repo investigator
│       ├── reviewer.md                 # General code review
│       ├── performance-reviewer.md     # R3F/asset/Web Vitals
│       └── accessibility-reviewer.md   # WCAG 2.2
│
└── .github/
    ├── workflows/ci.yml                # Lint + typecheck + build
    └── pull_request_template.md
```

## Recommended workflow

Match the size of the task to the depth of the workflow.

### Trivial change (typo, single-line fix, one obvious edit)

```
Read context → Edit → Verify (lint, typecheck if applicable)
```

Skip the skills. Just do it.

### Normal task (one component, one section, one route)

```
1. /investigate            # Read-only — confirm where to land
2. Plan in chat            # Files, state, edge cases
3. Implement               # Smallest change
4. Verify                  # npm run lint; npx tsc --noEmit; npm run build
5. /review                 # Self-review the diff
6. /commit                 # Conventional commit message
```

### Large task (multi-file feature, new route, architecture change)

```
1. Dispatch explorer       # Map the area before designing
2. Plan                    # Files, state, edge cases, reuse check
3. Implement incrementally # One commit's worth of change at a time
4. Verify each increment   # Lint + typecheck after each
5. /review                 # Self-review
6. Performance reviewer    # Especially if 3D code changed
7. Accessibility reviewer  # Especially if interactive or motion code changed
8. /commit                 # Per increment
```

## When to use a subagent

The subagents are read-only and isolated. Use them when the parent context would get too noisy:

- **`explorer`** — when you need a focused investigation of a part of the tree. Better than dumping files into your own context.
- **`reviewer`** — when the diff is large or the change is subtle. Independent eyes.
- **`performance-reviewer`** — when 3D code, models, or the home/editor routes changed.
- **`accessibility-reviewer`** — when new interactive elements, modals, or motion were added.

You can run them in parallel to save wall-clock time when their scopes don't overlap.

## When to start a fresh conversation

- New feature in a different area of the app.
- After completing a large task and before starting an unrelated one.
- When the conversation has accumulated a lot of dead-end exploration.

A fresh context is faster and cheaper than a long one with stale threads.

## Guardrails

- **Never push** without explicit user permission.
- **Never auto-commit.** Even with permission, follow `/commit` and confirm.
- **Never modify the AGENTS.md Next.js block** by hand. `next dev` regenerates it.
- **Never edit `ARCHITECTURE.md` for a single feature.** Architectural changes go in their own `docs:` commit.
- **Never add a dependency** for a single task. Justify it in the plan first.
- **Never disable TypeScript, ESLint, or a CI check** to make a failure go away.

## Quick reference

```bash
npm run dev      # dev server
npm run lint     # ESLint
npx tsc --noEmit # typecheck
npm run build    # production build
git status       # before any commit
git diff --stat  # before any commit
git diff         # before any commit
```

CI: see `.github/workflows/ci.yml`. All three checks must pass before merge.
