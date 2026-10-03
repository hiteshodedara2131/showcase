---
name: commit
description: Prepare a clean, conventional-style commit. Inspects status and diff, scopes the change, and stages only what belongs.
---

# Commit

Use this skill when ready to commit. Never auto-commit — wait for explicit user request, and even then, follow the steps below.

## Step 1 — Inspect

```bash
git status
git diff --stat
git log --oneline -10
```

If `git status` shows unrelated changes, stop. Ask the user which to include.

## Step 2 — Review the diff in full

```bash
git diff
```

Check for:

- **Stray debug code:** `console.log`, `debugger`, commented-out blocks, `// TODO` from a prior session.
- **Generated noise:** `next-env.d.ts` changes (rare, but possible); `AGENTS.md` block rewrites (auto-managed by `next dev`; commit as-is to keep the tree clean).
- **Secrets:** tokens, API keys, `.env*` content. If present, abort and warn the user.
- **Unrelated formatting churn** mixed with real changes.
- **Skipped files:** Anything important that should be staged but isn't.

## Step 3 — Stage precisely

```bash
git add <files>
```

Never `git add -A` or `git add .` without reviewing what that pulls in. For new files, add by path.

## Step 4 — Draft the message

Conventional commit format. Type and optional scope in the subject; imperative mood, no trailing period, ≤ 72 chars.

```
<type>(<scope>?): <imperative summary>

<optional body — explain why, wrap at 72 cols>

<footer — e.g. "Refs: #123" if applicable>
```

Types: `feat`, `fix`, `perf`, `refactor`, `chore`, `docs`, `test`, `style`, `build`, `ci`.

Scope examples for this project: `editor`, `home`, `canvas`, `loader`, `a11y`, `seo`, `tokens`, `deps`, `agents`.

If the change is a single obvious thing, the subject line is enough. If the change is subtle, add 2-3 lines of body explaining the why.

## Step 5 — Commit

```bash
git commit -m "<message>"
```

End the commit message with the attribution footer when Claude Code is the author:

```
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
```

## Step 6 — Confirm

```bash
git log --oneline -1
git show --stat HEAD
```

Report the commit hash and the stat to the user.

## Do not

- Do not push. The user will say when.
- Do not amend a commit unless explicitly asked.
- Do not rebase without permission.
- Do not commit with `--no-verify` unless the user has approved skipping hooks.
- Do not use emoji in commit messages.

## Conventional commit examples (this project)

```
feat(canvas): dispose GLB materials and geometries on route change

perf(loader): cap DPR to 2 and switch to frameloop="demand" on static scenes

fix(editor): cancel in-flight upload on unmount to prevent stale state

refactor(views): extract HeroSection into a focused section component

chore(deps): bump three to 0.186 for KTX2 loader support

docs(architecture): document the 3-layer route→view→section pattern
```
