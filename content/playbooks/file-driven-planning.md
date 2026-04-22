---
title: A file-driven planning framework for AI-assisted coding
description: "Five phases. Each phase reads a file and writes a file. If an AI session crashes mid-phase, you resume from the last file written. Mixed-model workflow, Gemini review, Sonnet execute."
tags: [playbook, planning, ai-tooling, claude-code]
draft: false
---

A year of building with AI coding assistants taught me one thing about planning: **the planning state has to live on disk, not in the session**. A dropped Claude Code session used to mean starting from scratch. Now it means reading the last file written.

The framework below is the one I run. It has five phases, each anchored in a file, each crash-resumable, each scoped to a different model where that makes sense.

## Five phases, five files

| Command | Phase | Model | What it writes |
|---|---|---|---|
| `/ydcoza-plan brief <instruction>` | 1 | Opus | `brief.md` |
| `/ydcoza-plan build` | 2 + 3 | Opus | `plan.md` + `sections/step-NN-*.md` |
| `/ydcoza-plan review` | 4 | Gemini | `review.md`, in-place plan revisions |
| `/ydcoza-plan execute` | 5 | Sonnet | Code + `progress.md` |
| `/ydcoza-plan status` | — | any | Terminal summary |

**Phase 1 — Brief.** Opus reads the instruction, evaluates scope, asks clarifying questions until the ambiguity is gone, and writes `brief.md`. The brief is the contract. If the brief is wrong, the plan is wrong, and nothing downstream matters.

**Phase 2+3 — Build.** Opus reads `brief.md`, explores the codebase, decomposes the work into ordered steps, and writes two things: a top-level `plan.md` summary and one `sections/step-NN-<slug>.md` file per step with the full implementation context. Each step file is self-contained — when Phase 5 picks it up, it has everything it needs without re-reading the whole repo.

**Phase 4 — Review.** Gemini reads the plan. Asks: what's missing, what's out of order, where are the unstated dependencies, what would fail at the edges. Gemini is a different model from a different vendor; it has different blindspots than Claude, which is exactly the point. Revisions land in-place.

**Phase 5 — Execute.** Sonnet picks up the next ready step, implements it, updates `progress.md` with the git hash, moves on. Sonnet is fast and cheap; by this point the hard thinking is already on disk.

## The directory structure

```
plan/
├── active/
│   └── 2026-04-22-bulk-csv-import/
│       ├── brief.md              ← Phase 1
│       ├── plan.md               ← Phase 2+3
│       ├── review.md             ← Phase 4
│       ├── progress.md           ← Phase 5 running log with git hashes
│       └── sections/
│           ├── step-01-attendance-service.md
│           ├── step-02-ajax-endpoint.md
│           └── step-03-admin-ui.md
├── archived/   ← abandoned (RETHINK / won't-do)
└── completed/  ← done
```

Slugs matter. The plan slug is derived from the instruction, lowercase, hyphens, max 30 characters. The step slug is a short descriptor of *that step*, not the plan. `step-03-ajax-endpoint.md` tells you what the step is without opening it.

## Why mixed models

- **Opus on Phase 1 and 2+3** — the thinking-heavy phases. Brief evaluation and step decomposition are where a weaker model produces plans that compile but don't work.
- **Gemini on Phase 4** — adversarial review benefits from a different model family. [[playbooks/adversarial-ai-review|More on why]].
- **Sonnet on Phase 5** — execution is mostly transcription at this point. Sonnet is fast, cheap, and good enough when the plan file is complete.

## Why the files matter

A plan in memory is a plan that evaporates when the session ends. A plan in files is a plan you can audit, hand off, and resume.

Three practical consequences:

1. **Resume from crash.** If Sonnet runs out of context mid-step, the next session reads `progress.md` to see what landed and `sections/step-NN.md` to see what's next. No lost work.
2. **Review history.** `progress.md` accumulates git hashes. A year later you can git-blame your way back to why a specific step went in.
3. **Hand-off to a human.** A thorough plan file is a design doc. It survives the AI tooling and is still useful if someone else picks up the work.

## When this is overkill

Single-file tweaks. Typo fixes. Anything under ~50 lines of code where the context fits in one message. Don't plan a one-line change — the planning tax is higher than the doing tax.

## Team variant — when the plan is big enough to warrant it

For complex features where I want an actual research pass, I use a team variant that spawns three agents in parallel:

- **Researcher** — codebase exploration, git history, DevVault module notes
- **Architect** — step decomposition, dependency graph, risk identification
- **Critic** — challenges the architect's plan, flags missing dependencies, scope creep

The lead agent (me, coordinating) reads all three reports and writes the final plan. Roughly twice the token spend of the single-agent flow; produces a substantially more defensible plan for work that's going to take a week.

## See also

- [[projects/wecoza-development|WeCoza 3.0]] — the plugin where this framework gets exercised daily.
- [[projects/edenfintech-scanner-python|Eden Fintech Scanner]] — a different kind of staged pipeline, with CLI entry points and provenance tracking at each stage. Same principle, different domain: move the state to disk so upheavals are survivable.
- [[playbooks/adversarial-ai-review|Adversarial AI review]] — the review step, detailed.
