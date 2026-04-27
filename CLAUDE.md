# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal CV wiki / evolving knowledge graph for **John Montgomery** (brand: **YourDesign**, site title **DevAi**). Built on Quartz v4 (forked upstream `@jackyzha0/quartz`), deployed to Vercel at `devai.co.za`. (Previously at `cv.yourdesign.co.za`; that domain is deprecated.)

## Identity rule

When writing or editing anything user-facing (page titles, about/bio, cover letter, frontmatter, commit messages, deploy configs), use **John Montgomery** / **YourDesign** / **DevAi**. The directory name `ydcoza`, the shell user `laudes`, and the email alias are NOT the public identity. Do not conflate.

## Voice discipline (hard rules)

- **Em-dashes: zero, anywhere, anytime.** Hard ban (clarified 2026-04-27). Applies to wiki content, LinkedIn drafts, this file, commit messages, frontmatter, code comments, all of it. Replace with period (sentence break), comma (continuation), colon (elaboration), or parentheses (aside). If none fit, restructure. The em-dash is the strongest single "this was AI-drafted" tell on the public web.
- Wiki voice rules: `~/.claude/projects/-home-laudes-zoot-projects-ydcoza-cv/memory/feedback_voice.md`. LinkedIn-specific voice rules: `feedback_voice_linkedin.md`. Read both before drafting copy.
- Claude does not write reflective content in John's voice. The "What I learned" section of project pages, the position/reflective sections of decision pages, and any first-person stance content must be drafted by John or with explicit prompts where he supplies the substance. Leave flagged TODO placeholders rather than invent.

## Two-stage architecture

- `raw/`: source material (defuddled web captures, per-project evidence dives, PDF extracts). Re-runnable. Do not edit by hand except to capture manual notes.
- `content/`: the hand-written Quartz vault. Derived from `raw/` but written by hand. **Hard rule: never auto-stitch `content/` pages from `raw/`. Voice must stay authentic.**

## Content folders

- `content/index.md`: homepage
- `content/now.md`: current focus
- `content/skills/`: one page per speciality (6 total)
- `content/projects/`: one page per project
- `content/decisions/`: cross-cutting architecture stories and positions held
- `content/playbooks/`: repeatable workflows (adversarial AI review, file-driven planning, etc.)
- `content/influences/`: medium-neutral influences (video/audio/written)
- `content/notes/`, `content/open-questions/`: evolving capture
- `content/about/`: bio, contact, cover letter
- `docs/plans/`: design docs and implementation plans
- `docs/linkedin*`: LinkedIn engagement workflow (see below)

## Commands

```bash
npm install
npx quartz build --serve         # local preview with hot reload
npx quartz build                  # production build into public/  (this is what Vercel runs)
npm run check                     # tsc --noEmit + prettier --check
npm run format                    # prettier --write
npm test                          # tsx --test  (Quartz framework tests)
```

Node 22+ / npm 10.9.2+. Vercel build command is `npx quartz build`, output `public/` (see `vercel.json`).

## Quartz configuration

- `quartz.config.ts`: site config (theme, plugins, baseUrl). Theme uses Inter / JetBrains Mono with orange `#fc6d26` accents.
- `quartz.layout.ts`: page layouts (left sidebar Explorer + Search, right sidebar Graph + ToC + Backlinks).
- `quartz/`: vendored Quartz framework source. Don't edit unless intentionally patching upstream.

## Project page convention

Substantive pages in `content/projects/` follow a four-question frame:

1. `## What it is`: plain English, what the thing does and doesn't do.
2. `## Why this approach`: trade-offs, alternatives. Link to relevant `content/decisions/` pages inline.
3. `## What will break`: fragile points, known issues, blast radius.
4. `## What I learned`: genuine reflection. **Must be in John's voice.** Never draft this section without his input. Leave a flagged placeholder.

Followed by `## Proof points` (bullets) and `## What this proves` (skill links).

Rules:
- Short entries (under ~30 lines, e.g. `yourdesign-co-za.md`) stay as narrative. Don't force the frame on thin pages.
- Apply voice rules on any rewrite: cut "far", "really", "surprisingly", "very", "huge", "simply", "The takeaway:", "Used correctly" and similar intensifiers/aphorisms.
- See `content/projects/wecoza-development.md` for the canonical shape and `docs/takeaways-proof-of-work.md` for rationale.

## Decision page convention

Pages in `content/decisions/` are first-person positions on architectural or methodological choices, with a factual frame and a stance. They typically cover:

- The position (one-paragraph stance, first-person)
- What changed (factual)
- Why this approach (trade-offs and the reasoning)
- What will break (known fragility)
- Where this shows up (links to related projects/skills/playbooks)

Reflective sections (the position, the why, ToS-style judgment calls) need John's voice. Factual sections (what changed, where it shows up, resilience guards, maintenance notes) can be drafted by Claude. See `content/decisions/llms-behind-typed-adapters.md` and `content/decisions/linkedin-engagement-tooling.md` for canonical shape.

## LinkedIn engagement workflow

Topical engagement on LinkedIn runs through the `ydcoza-linkedin-engagement` skill (Modes A1 / A2 / B / C). Mode A1 uses Brave Search; Mode A2 uses [Interceptor](https://github.com/Hacker-Valley-Media/Interceptor), an Apache-2.0 browser-control CLI driving John's live Brave session. Backend is selected via `docs/linkedin-topics.md` frontmatter `backend: phase1|phase2`.

All Mode A2 calls go through the rate-limited audit-logged wrapper at `~/.claude/skills/ydcoza-linkedin-engagement/scripts/interceptor-guarded.sh`. Never invoke the `interceptor` binary directly. Wrapper enforces 6 calls / 60s and 30 calls / 600s rate caps. It detects HTTP 999, `/uas/login`, `/checkpoint/challenge`, "security check", and "sign in to view" as block signals. On any block signal: STOP, surface to John, do not retry.

Key files:
- `docs/linkedin.md`: engagement workflow, post log, "Comments left" log
- `docs/linkedin-topics.md`: topics config + backend selector
- `docs/linkedin-topic-tests.md`: A/B ledger for search-term experiments
- `docs/linkedin-interceptor-audit.log`: per-call audit trail (tab-separated)
- `content/decisions/linkedin-engagement-tooling.md`: full decision context, ToS judgment, Linux daemon source patch

The skill is **draft only**. Posting is manual. Never use action verbs ("Post?", "Send?", "Ship?") at the handoff. Wait for explicit "logged" / "I posted variant N" before running Mode C.

## Git workflow

Git operations are user-triggered only. Never run git commands unless explicitly asked. No AI attribution in commit messages or anywhere in the repo.
