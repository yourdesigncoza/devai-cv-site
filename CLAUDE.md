# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal CV wiki / evolving knowledge graph for **John Montgomery** (brand: **YourDesign**, site title **DevAi**). Built on Quartz v4 (forked upstream `@jackyzha0/quartz`), deployed to Vercel at `cv.yourdesign.co.za`.

## Identity rule

When writing or editing anything user-facing (page titles, about/bio, cover letter, frontmatter, commit messages, deploy configs), use **John Montgomery** / **YourDesign** / **DevAi**. The directory name `ydcoza`, the shell user `laudes`, and the email alias are NOT the public identity. Do not conflate.

## Two-stage architecture

- `raw/` — source material (defuddled web captures, per-project evidence dives, PDF extracts). Re-runnable. Do not edit by hand except to capture manual notes.
- `content/` — the hand-written Quartz vault. Derived from `raw/` but written by hand. **Hard rule: never auto-stitch `content/` pages from `raw/` — voice must stay authentic.**

## Content folders

- `content/index.md` — homepage
- `content/now.md` — current focus
- `content/skills/` — one page per speciality (6 total)
- `content/projects/` — one page per project
- `content/decisions/` — cross-cutting architecture stories
- `content/playbooks/` — repeatable workflows (adversarial AI review, file-driven planning, etc.)
- `content/influences/` — medium-neutral influences (video/audio/written)
- `content/notes/`, `content/open-questions/` — evolving capture
- `content/about/` — bio, contact, cover letter
- `docs/plans/` — design docs and implementation plans

## Commands

```bash
npm install
npx quartz build --serve         # local preview with hot reload
npx quartz build                  # production build → public/  (this is what Vercel runs)
npm run check                     # tsc --noEmit + prettier --check
npm run format                    # prettier --write
npm test                          # tsx --test  (Quartz framework tests)
```

Node 22+ / npm 10.9.2+. Vercel build command is `npx quartz build`, output `public/` (see `vercel.json`).

## Quartz configuration

- `quartz.config.ts` — site config (theme, plugins, baseUrl). Theme uses Inter / JetBrains Mono with orange `#fc6d26` accents.
- `quartz.layout.ts` — page layouts (left sidebar Explorer + Search, right sidebar Graph + ToC + Backlinks).
- `quartz/` — vendored Quartz framework source. Don't edit unless intentionally patching upstream.

## Git workflow

Git operations are user-triggered only. Never run git commands unless explicitly asked. No AI attribution in commit messages or anywhere in the repo.
