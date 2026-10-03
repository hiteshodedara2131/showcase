---
name: investigate
description: Read-only investigation of a task, bug, or feature. Traces code paths, identifies root cause, and returns findings without modifying anything.
---

# Investigate

Use this skill when you need to understand code before changing it — a bug to diagnose, a feature to scope, or a refactor to plan. Investigation is read-only. You do not edit, run long builds, or commit.

## Workflow

1. **Understand the task.** Restate the goal in one sentence. If unclear, ask one focused clarifying question.
2. **Locate the relevant files.** Use `Grep` and `Glob` to find the entry points. Read the route → view → section layers in that order; then the components and `src/lib/`.
3. **Trace data flow.** Where does state live? Who reads it? Who writes it? What triggers a re-render?
4. **Identify ownership and reuse.** Is there a primitive in `src/components/ui/` or a composite in `src/components/shared/` that already does this? Don't propose a new one if an old one fits.
5. **For bugs: find the root cause.** Reproduce in your head. Trace backward from the symptom to the cause. Do not patch where the symptom appears.
6. **Identify regression risks.** What other features touch this code? What assumptions does it make?
7. **Return findings.** See output format below.

## Read the existing skills when relevant

Before answering, consult the matching project skill:

- R3F/Three.js code → `.agents/skills/r3f-fundamentals/SKILL.md` and `r3f-loaders/SKILL.md`
- React/Next.js code → `.agents/skills/react-best-practices/SKILL.md`
- Visual/UI code → `.agents/skills/frontend-design/SKILL.md` and `web-design-guidelines/SKILL.md`
- Architecture questions → `ARCHITECTURE.md` and `.agents/rules/architecture.md`

## Output format

Return findings as concise markdown:

```markdown
## Relevant files
- `path:line` — what it does
- `path:line` — what it does

## Current behavior
What the code does today. Cite line numbers.

## Architecture
How it fits the 3-layer pattern (route → view → section → UI primitive).

## Root cause / implementation location
For bugs: one sentence. For features: where the change should land.

## Dependencies
- `package-name` — why it matters
- Existing utility at `src/lib/...` — already provides this

## Risks
- What could break
- What assumptions should be verified

## Recommended solution
One or two paragraphs. No code yet. Wait for plan approval.
```

## Rules

- **Do not modify files.** Read-only.
- **Do not invent.** If you can't find something, say "not found in the tree" and stop.
- **Do not over-cite.** A few load-bearing line numbers beat a full file dump.
- **Do not skip the risks section.** Even a clean change has them.
