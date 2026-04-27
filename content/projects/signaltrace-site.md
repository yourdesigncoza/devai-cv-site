---
title: SignalTrace
description: "Multi-wiki Quartz 4 site hosting five OSINT / financial-research case studies, with a shared entity taxonomy and custom build orchestration."
tags: [project, knowledge-graph, quartz]
draft: false
status: active
---

> A multi-wiki Quartz 4 site hosting five OSINT / financial-research case studies, each with its own entity taxonomy and open-questions convention.

**Stack:** Quartz 4 (fork of `jackyzha0/quartz`), Preact, TypeScript, Node 22+, Vercel static hosting, custom `scripts/build-all.mjs` orchestrator.
**Status:** Active.
**Live:** [www.signaltrace.wiki](https://www.signaltrace.wiki/)

## The story

SignalTrace is a set of long-form research wikis on topics where the useful output is a well-shaped question rather than a prepackaged answer. Five case studies so far: sa-corruption, alfaromeo, strait-of-hormuz, paypal, attbid. Each one has its own folder under `content/`, its own `index.md`, and the same entity taxonomy, People, Organisations, Events, Concepts, Vehicles, Symbols, Races, linked with wikilinks so the graph does real navigational work.

The build is unusual. Quartz out of the box builds one site from one `content/`; signaltrace runs Quartz multiple times from one repo. `scripts/build-all.mjs` (43 lines) iterates a `cases` array, invokes `npx quartz build` per case with `QUARTZ_BASE_URL=www.signaltrace.wiki/<slug>`, and copies a hand-authored `index.html` into `public/`. Adding a wiki means adding one entry to that array and one card to the landing page. That's the custom delta over Quartz.

The rest of the custom surface is deliberately small. `PageTitle.tsx` is 23 lines for a logo override. `custom.scss` is 128 lines for a locked brand palette (Charcoal `#171321`, Tanuki orange `#fc6d26`, orange hover `#e24329`, light grey `#dcdcde`) and typography (Inter + JetBrains Mono, forced light mode, custom graph-modal sizing). `quartz.config.ts` is 98 lines. Everything else is upstream Quartz (14,165 LOC) running as-is.

The editorial shape is the real product. The `content-strategy/strategy.md` file defines five content pillars (Epistemic Research Methods, Financial OSINT & DD, Network Intelligence & Knowledge Graphs, Market Cognition, Case Study Anatomy), a monthly 15-piece mix, and a 60-day topic calendar. The landing page's "Method" and "Proof of Method" narrative structure is hand-authored markup, not a template.

The pattern has now been reused for this CV site you're reading.

## Architecture in one breath

One repo → `content/<case>/` per wiki → `scripts/build-all.mjs` orchestrator → one `npx quartz build` per case with a subpath `QUARTZ_BASE_URL` → hand-authored `index.html` copied into `public/` → Vercel static.

## Proof points

- 5 case studies: sa-corruption (108 markdown files), alfaromeo (90), strait-of-hormuz (45), paypal (36), attbid (29). 308 markdown files in total.
- Custom delta is small and surgical: 23-line `PageTitle.tsx`, 128-line `custom.scss`, 98-line `quartz.config.ts`, 64-line `quartz.layout.ts`, 4-line `vercel.json`.
- Upstream Quartz: 14,165 LOC TypeScript running as a fork.
- 143 commits in the past 12 months.
- Active development window: one concentrated week in April 2026 for the multi-wiki architecture rework.

## What this proves

- [[skills/knowledge-graphs-wiki-systems|Knowledge Graphs & Wiki Systems]], entity-folder taxonomy, multi-wiki registry pattern, open-questions convention repeated across all five vaults.
- [[skills/design-brand|Design & Brand]], hand-authored 29 KB landing page; locked palette and typography; custom overrides of Quartz internals.

## Decisions worth a deeper read

*Populated as the decision pages land. Likely candidate: why Quartz over Astro / Next for research sites, and why entity folders instead of tags.*
