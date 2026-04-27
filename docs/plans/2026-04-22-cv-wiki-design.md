# CV Wiki, Design

**Date:** 2026-04-22
**Goal:** Build a personal CV site as an Obsidian/Quartz wiki, mirroring the `signaltrace-site` pattern. Skills are the spine; projects are the evidence; the graph is the portfolio.

## Decisions

- **Audience:** Dual, prospective clients + technical hiring managers/collaborators. Skill hubs serve the pitch read; project + decision pages serve the engineering-proof read.
- **Curation depth:** Evidence dive on every source project (read code, extract architecture/decisions/metrics), not cover-page summaries.
- **Voice:** First-person, plain-spoken. "I built X because Y."
- **Live URLs:** Fetch with the defuddle skill into `raw/web/`.
- **Structure:** Skills-as-hub, projects-as-evidence (Approach A, closest to the signaltrace pattern).

## Repo layout

```
ydcoza-cv/
├── raw/                    # curated source material (input)
│   ├── web/                # defuddled live URLs
│   ├── projects/           # one .md per source project (evidence dive output)
│   ├── docs/               # cover-letter PDF extract, pasted material
│   └── INDEX.md            # auto-generated table of contents
├── content/                # the Obsidian/Quartz vault (output)
│   ├── index.md
│   ├── skills/
│   ├── projects/
│   ├── decisions/
│   └── about/
├── quartz/                 # copied from signaltrace-site
├── quartz.config.ts        # rebranded
├── docs/plans/
└── README.md
```

Two-stage on purpose: `raw/` is a re-runnable evidence dump, `content/` is the editorial wiki. Redo the wiki any time without losing the source material.

## Skill taxonomy (the spine)

Six specialities, each with at least two projects backing it and commercially distinct enough to sell on its own:

1. **Quant Engineering**, edenfintech-scanner-python, ftr_strategy_backtesting, apes-signal, InsiderSignalResearch.
2. **AI / Agentic Systems**, devai.co.za, yt_ts, AI scaffolding inside the scanner, the Claude-Code-as-tool meta-skill.
3. **WordPress & PHP Craft**, wecoza_development, yourdesign.co.za-era client sites.
4. **Knowledge Graphs & Wiki Systems**, signaltrace-site, InsiderSignalResearch reporting, this CV site, the graphify workflow.
5. **Python Services & Data Pipelines**, connective tissue under the scanner, backtester, yt_ts, signal research ingestion.
6. **Design & Brand**, yourdesign.co.za heritage, the 2023 cover-letter PDF, visual hand on every site shipped.

**Narrative arc** for the index page: *designer → developer → quant/AI engineer.*

## Raw curation

**Per-project raw note** (`raw/projects/<slug>.md`): one-line pitch, stack & dependencies, architecture sketch, design decisions worth telling, concrete proof points (LOC, age, scale, integrations), skills demonstrated (tags), pull quotes from CLAUDE.md/README, open questions / dead-ends.

**Per-URL raw note** (`raw/web/<domain>.md`): defuddle output + a 5-line "what's true today" header.

**Cover-letter PDF** → `raw/docs/cover-letter-2023.md` (extract + notes on which voice/biographical bits are still load-bearing).

**Execution model:** dispatch one Explore subagent per project in parallel, keeps the main context clean. Web URLs handled separately by defuddle. `raw/INDEX.md` auto-generated last.

## Vault generation

**Hard rule:** content/ pages are written by hand using raw/ as source. No template-fill, voice has to be authentic.

**Page templates** (loose):

- **`index.md`**: hook + designer→developer→quant/AI arc + 6 speciality cards + "Currently building" footer.
- **`skills/<slug>.md`**: first-person opening, projects (wikilinked), decisions (wikilinked), one pull quote, "Talk to me about…" CTA.
- **`projects/<slug>.md`**: pitch, stack, story (problem→approach→outcome), proof, skills (wikilinked back), source/live links, screenshot if obvious.
- **`decisions/<slug>.md`**: emerge from dives. Expect 3–5 to start (e.g. *Why I keep rewriting my cover letter*, *Why Postgres for the scanner*, *Why Quartz over Astro/Next*, *Why I left WordPress as my default stack*).
- **`about/index.md`** + **`about/cover-letter.md`**, bio, contact, current first-person cover letter descended from the 2023 PDF.

**Frontmatter** (Quartz-compatible):
```yaml
---
title: Quant Engineering
tags: [skill, quant, python]
draft: false
---
```

**Wikilink convention:** `[[skills/quant-engineering|Quant Engineering]]`. Quartz handles backlinks + graph view automatically.

**Build order:** skill hubs (6) → project notes (10) → decisions (3–5) → about + index last.

## Build & deploy

Mirror `signaltrace-site`:

- Copy Quartz scaffolding (`quartz/`, `package.json`, `quartz.config.ts`, `quartz.layout.ts`, `tsconfig.json`, `Dockerfile`, `vercel.json`, `scripts/`, `globals.d.ts`, `index.d.ts`, `index.html`).
- Rebrand `quartz.config.ts` (site title, base URL, theme colours, analytics off until ready).
- `quartz.layout.ts`: graph view on, backlinks on.
- Deploy target: Vercel (matches signaltrace's `vercel.json`).
- Local preview: `npx quartz build --serve`.
- `.gitignore` copied from signaltrace.

No custom plugins or theme work in v1, defer until content lands.

## Out of scope (v1)

- Custom Quartz plugins or theme work.
- Auto-stitched content from raw/ (explicit hard rule against it).
- Analytics / SEO tuning.
- Image optimization beyond what Quartz does by default.
