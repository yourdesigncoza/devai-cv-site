# devai-cv-site

Personal knowledge wiki for **John Montgomery**, founder of [**EdenFintech**](https://edenfintech.com/). The site at `devai.co.za` (title: **DevAi**) is the working knowledge wiki where the thinking behind EdenFintech is captured: notes, decisions, playbooks, projects, skill hubs. The CV-shaped surface is one face of the wiki; the real product is the long-term capture of 22 years of practice that I've never sat down to write up.

Built as an Obsidian vault, rendered by Quartz 4, deployed to Vercel.

(**YourDesign** is the legacy brand for prior WordPress freelance work and is referenced only in past-engagement context.)

---

## Project model

The wiki sits in four layers, each doing different work.

### 1. Substrate

`content/notes/`, `content/decisions/`, `content/playbooks/`. What I've actually thought through. Dated reasoning, positions held with the trade-offs attached, repeatable recipes. This is the durable asset; everything else either renders it or projects it outward.

### 2. Surface

`content/projects/`, `content/skills/`, `content/about/`, `content/index.md`. The polished CV-shaped face of the substrate. Project pages follow a four-question frame (What it is / Why this approach / What will break / What I learned). Skill hubs (the spine) anchor projects to capabilities.

### 3. Amplifier

`docs/linkedin*`. The LinkedIn engagement workflow turns the substrate into discovery. A skill drives discovery against interest topics, drafts comments grounded in a specific corpus page, and logs what gets posted. The topics config, term-testing ledger, and audit log live alongside `content/`.

### 4. Guardrails

`CLAUDE.md`, voice rules, project-page convention, decision-page convention, the memory system, the git workflow. Prevents drift. The voice rules in particular are strict enough that they're the single biggest determinant of whether the work reads as authentic or as AI-shaped boilerplate.

How they feed each other:

```
substrate -> wiki surface         (decisions and notes get rendered into pages)
substrate -> LinkedIn comments    (every comment grounds in a specific corpus page)
LinkedIn engagement -> substrate  (comments reveal what audience cares about,
                                   surfacing new note/decision topics)
voice rules -> all output         (single quality gate)
memory -> all sessions            (continuity, no re-explaining preferences)
```

Wiki = proof. LinkedIn = discovery. Substrate = asset. Guardrails = stability.

---

## Repository layout

```
devai-cv-site/
├── raw/                    # evidence layer, source material, re-runnable
│   ├── web/                # defuddled live URLs
│   ├── projects/           # per-project evidence dives (extracted from codebases)
│   ├── docs/               # PDF extracts, pasted reference material
│   └── INDEX.md            # auto-generated map of everything in raw/
├── content/                # editorial layer, the Quartz vault
│   ├── index.md            # homepage
│   ├── now.md              # what I'm working on this week
│   ├── skills/             # six speciality hubs (the spine)
│   ├── projects/           # one page per project (the evidence)
│   ├── decisions/          # positions I hold, with reasoning
│   ├── notes/              # dated learning log, short-form
│   ├── playbooks/          # repeatable how-to recipes
│   ├── influences/         # videos, podcasts, talks, and writing with traceable influence
│   ├── open-questions/     # things I'm chewing on
│   └── about/              # bio, contact, cover letter, profile photo
├── quartz/                 # Quartz 4 source (fork of jackyzha0/quartz)
├── quartz.config.ts        # site config, title, baseUrl, plugins
├── quartz.layout.ts        # page layout, graph view, backlinks, header
├── docs/plans/             # design docs and implementation plans
├── scripts/                # build helpers (empty for now)
├── CLAUDE.md               # guidance for any AI agents working in the repo
├── vercel.json             # Vercel build config
└── README.md               # this file
```

## The two-stage rule

**`raw/`** is the input layer. When a new piece of evidence needs to come into the wiki (a defuddled page, an evidence dive over a new codebase, a PDF extract), it lands here first. Re-runnable, if the source changes, regenerate the raw file from it.

**`content/`** is the editorial layer. Every page in `content/` is written by hand. No auto-stitching from raw/, no template-fill. Voice is first-person plain-spoken; the reference for it is whatever already exists in `content/skills/` and `content/decisions/`. Reflective sections (the "What I learned" of project pages, the position/judgment of decision pages) are written by John, never auto-drafted.

Keeping the two separate means the wiki stays clean, the evidence stays traceable, and I can rewrite a page without losing the source material behind it.

---

## Running it locally

```bash
npm install
npx quartz build --serve
```

Opens a dev server at `http://localhost:8080`. Rebuilds on save.

Requires Node ≥ 22 (see `.node-version`).

For a one-shot production build without serving:

```bash
npx quartz build
```

Output lands in `public/` (gitignored).

---

## Editing in Obsidian

The `content/` folder is a valid Obsidian vault on its own.

1. Obsidian → **Open folder as vault** → point at `content/`.
2. Obsidian creates a `.obsidian/` config dir on first open (already gitignored).
3. Wikilinks like `[[skills/quant-engineering|Quant Engineering]]` resolve natively. Graph view and backlinks populate automatically.

You can also open the repo root as the vault, Obsidian treats the whole tree as the vault and wikilinks inside `content/` still resolve correctly.

---

## Adding a new page

Every page starts with YAML frontmatter:

```yaml
---
title: Short descriptive title
tags: [section, any-other-tags]
draft: false
---
```

Pick the folder by what the page does:

| It's a… | Goes in |
|---|---|
| Six named core specialities | `content/skills/` |
| A named project (code or site) | `content/projects/` |
| A position I hold with reasoning | `content/decisions/` |
| A repeatable recipe | `content/playbooks/` |
| A dated learning moment | `content/notes/` |
| A video / podcast / talk / piece with traceable influence | `content/influences/` |
| A question I haven't resolved | `content/open-questions/` |
| The current-week snapshot | Edit `content/now.md` |

Link to other pages with wikilinks: `[[projects/edenfintech-scanner-python|edenfintech-scanner-python]]`. Display-text is optional.

Images go in the same folder as the page that uses them (see `content/about/profile.jpg` for an example) and render with standard markdown: `![alt text](image.jpg)`.

---

## Voice

First-person, plain-spoken, dialled back. Concretely:

- **Em-dashes: hard ban (locked 2026-04-27).** Zero, anywhere, anytime. Replace with period, comma, colon, or parentheses; if none fit, restructure the sentence. The em-dash is the single strongest "this was AI-drafted" tell on the public web in 2026.
- **Avoid** self-declarative taglines ("I build X that does Y"), aphorisms meant to sound quotable, anti-positioning ("what I'm not is…"), commercial hooks, filler intensifiers ("essentially", "fundamentally", "simply").
- **Prefer** observations grounded in specific evidence from `raw/` or from the project itself. If a sentence feels like it's performing, rewrite it as plain description of what happened.
- The 2023 cover letter in `raw/docs/cover-letter-2023.md` is the voice anchor: bracketed asides, self-deprecating register, lowercase ease.

New pages should inherit the voice already present in `content/skills/` and `content/decisions/` without new calibration.

---

## Deployment

Deployed via Vercel from the GitHub repo. `vercel.json` sets:

- `buildCommand`: `npx quartz build`
- `outputDirectory`: `public`
- `framework`: `null` (Quartz handles itself)
- `cleanUrls`: `true`

To point a domain at the site: add the domain in Vercel project settings and set the DNS CNAME to `cname.vercel-dns.com`.

The `baseUrl` in `quartz.config.ts` should match the deployed domain.

---

## Conventions

- **Git is user-triggered.** Automated commits don't happen from AI tooling. When work needs to land on `main`, it's a deliberate commit.
- **No AI / Claude / Anthropic attribution** anywhere in commits, code, docs, or content.
- **Secrets scanned on push.** GitHub's push protection is active on this repo. If evidence captured in `raw/` contains credentials (it has once, from a source-project codebase), redact before committing.
- **Additive growth.** New work adds pages, rarely rewrites old ones. Backlinks do the work of keeping the graph coherent.

---

## Design docs

- [`docs/plans/2026-04-22-cv-wiki-design.md`](docs/plans/2026-04-22-cv-wiki-design.md), the structural design for v1.
- [`docs/plans/2026-04-22-cv-wiki.md`](docs/plans/2026-04-22-cv-wiki.md), the phased implementation plan that built v1.

---

## License

The Quartz scaffolding is MIT-licensed by [@jackyzha0](https://github.com/jackyzha0/quartz), see `LICENSE.txt`. Content authored for this wiki (everything in `content/`, `raw/`, and `docs/plans/`) is © John Montgomery, all rights reserved unless otherwise noted.
