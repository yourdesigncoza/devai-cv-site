---
title: How this site works
description: "How this CV wiki is structured — two-stage raw/ and content/ build, dated entries, plain markdown in git."
tags: [about]
draft: false
---

This site is a wiki built in Quartz, maintained as I go. It runs as a working record of the practice — projects, decisions, playbooks, things I've read — rather than a résumé refreshed for applications.

## Two-stage build

The repo has two layers:

- `raw/` — source material. Defuddled web captures, per-project evidence dives (I read the code and extract architecture, decisions, metrics), PDF extracts, pasted notes. Re-runnable. Not edited by hand.
- `content/` — the wiki you're reading. Written by hand from the raw layer, never auto-stitched from it. Keeping them separate keeps the written layer in my voice and the raw layer re-runnable.

## Folders

- `skills/` — what I do, one page per speciality, with the projects that back it.
- `projects/` — one page per build, with the decisions and outcomes attached.
- `decisions/` — positions I hold, with reasoning.
- `playbooks/` — repeatable recipes I want to run the same way twice.
- `notes/` — short-form dated thinking.
- `influences/` — video, audio, and writing that shaped the work.
- `open-questions/` — things I haven't resolved.

## Dated entries

Pages carry dates where it matters. If a position shifts, the old page stays and a new one lands next to it rather than overwriting. Both are readable from the [[decisions/|Decisions]] folder.

## Plain markdown in git

The whole site is markdown files in a public git repo, built with Quartz and hosted on Vercel. No CMS, no database, no platform lock-in. Works as a local Obsidian vault too — that's how I maintain it.

## Why this shape

A CV compresses the work into a page. Keeping the detail — decisions, playbooks, the reasoning behind them — lets readers follow the thread they care about, and lets the site grow with the work.
