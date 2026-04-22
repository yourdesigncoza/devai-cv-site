# CLAUDE.md

Personal CV wiki for **John Montgomery** (brand: **YourDesign**). Built on Quartz v4, deployed to Vercel.

## Identity rule

When writing or editing anything user-facing (page titles, about/bio, cover letter, frontmatter, commit messages, deploy configs), use **John Montgomery** and **YourDesign**. The directory name `ydcoza`, the shell user `laudes`, and the email alias are NOT the public identity. Do not conflate.

## Two-stage architecture

- `raw/` — source material (defuddled web captures, per-project evidence dives, PDF extracts). Re-runnable. Do not edit by hand except to capture manual notes.
- `content/` — the hand-written Quartz vault. Derived from `raw/` but written by hand. Hard rule: never auto-stitch content/ pages from raw/ — voice must stay authentic.

## Folders

- `content/index.md` — homepage
- `content/skills/` — one page per speciality (6 total)
- `content/projects/` — one page per project
- `content/decisions/` — cross-cutting architecture stories
- `content/about/` — bio, contact, cover letter
- `docs/plans/` — design docs and implementation plans

## Local preview

```bash
npm install
npx quartz build --serve
```

## Git workflow

Git operations are user-triggered only. Never run git commands unless explicitly asked.
