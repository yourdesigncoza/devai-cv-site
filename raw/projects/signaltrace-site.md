---
source_path: /home/laudes/zoot/projects/signaltrace-site
extracted: 2026-04-22
---

## One-line pitch

SignalTrace — a multi-wiki OSINT / due-diligence publication at `signaltrace.wiki`. Five case-study Obsidian vaults compiled into one static site by a custom Quartz 4 build orchestrator and deployed to Vercel.

## Stack & dependencies

- **Generator**: Quartz 4 (fork of `jackyzha0/quartz`, `package.json` pinned at `4.5.2`). Not Astro, not Next.js, not stock Quartz — the build system has been replaced.
- **Language**: TypeScript (`tsconfig.json`), Preact for Quartz components, SCSS for theme, Node ≥ 22.
- **Build orchestrator**: `scripts/build-all.mjs` (Node, ESM). Uses `execFileSync('npx', ['quartz', 'build', ...])` once per wiki with a per-wiki `QUARTZ_BASE_URL` env var.
- **Hosting**: Vercel. `vercel.json` is four lines — `buildCommand: "node scripts/build-all.mjs"`, `outputDirectory: "public"`, `framework: null`, `cleanUrls: true`.
- **Quartz plugin stack in use** (from `quartz.config.ts`): `ObsidianFlavoredMarkdown`, `GitHubFlavoredMarkdown`, `CreatedModifiedDate`, `SyntaxHighlighting` (Shiki, `github-light`/`github-dark`), `TableOfContents`, `CrawlLinks` (`markdownLinkResolution: "shortest"`), `Latex` (KaTeX), `ContentIndex` (sitemap + RSS), `CustomOgImages`. Analytics: Plausible.
- **Render/graph deps already bundled**: `d3`, `pixi.js`, `flexsearch`, `satori`, `sharp`, `rehype-katex`, `rehype-citation`, `rehype-pretty-code`, `shiki`, `preact-render-to-string`.
- **Custom code added on top of Quartz**:
  - `quartz/components/PageTitle.tsx` — hardcodes the logo link to `https://www.signaltrace.wiki/` so every subpath wiki returns to the landing page.
  - `quartz/styles/custom.scss` — 128 lines. Forces light mode, sets Tanuki orange (`#fc6d26`) accent, Charcoal (`#171321`) text, Inter + JetBrains Mono, hides the Quartz footer, styles scrollbars, sizes the graph modal.
  - `quartz.config.ts` — reads `process.env.QUARTZ_BASE_URL` at build time so each wiki gets its correct subpath base URL from one shared config.
  - `quartz.layout.ts` — slot config (Breadcrumbs, ArticleTitle, ContentMeta, TagList before body; Explorer + Search left; Graph + ToC + Backlinks right).
- **Landing page**: `index.html` — single plain HTML file, not Quartz-processed. Copied into `public/` at the end of the build. Contains "The Method" section, "Proof of Method" case grid, and a side-by-side Perplexity-Pro-vs-SignalTrace comparison block.

## Architecture sketch

```
signaltrace-site/
├── content/                   ← one Obsidian vault per case study
│   ├── sa-corruption/         ← 108 md files, 7 entity subfolders
│   ├── alfaromeo/             ← 90 md files, 7 entity subfolders
│   ├── paypal/                ← 36 md files, 6 entity subfolders
│   ├── strait-of-hormuz/      ← 45 md files, 2 entity subfolders
│   └── attbid/                ← 29 md files, 1 entity subfolder
├── scripts/build-all.mjs      ← the real entry point Vercel runs
├── quartz/                    ← forked Quartz 4 (14,165 LOC of .ts/.tsx)
├── quartz.config.ts           ← single config, reads QUARTZ_BASE_URL
├── quartz.layout.ts           ← slot layout
├── index.html                 ← landing page (29 KB, hand-authored)
├── content-strategy/          ← strategy.md (not published)
└── vercel.json                ← 4-line static build config
```

Build flow (from `scripts/build-all.mjs`):

1. `fs.rmSync('public')` then `mkdirSync('public')` — rebuilds from scratch every time.
2. For each `{ slug }` in the `cases` array: run `npx quartz build --directory content/<slug> --output public/<slug>` with `QUARTZ_BASE_URL=www.signaltrace.wiki/<slug>`.
3. `fs.copyFileSync('index.html', 'public/index.html')`.
4. Vercel's `cleanUrls: true` serves `.html`-less URLs.

## Design decisions worth telling

- **One repo, five wikis, one config.** The `cases` array in `scripts/build-all.mjs` is the single registry. Adding a wiki = add `{ slug: 'newcase' }` + a card in `index.html`. No per-wiki config duplication.
- **Env-var-driven base URL.** Rather than forking Quartz config per wiki, `quartz.config.ts` reads `process.env.QUARTZ_BASE_URL ?? "www.signaltrace.wiki"`, so the same build binary produces a correctly-rooted site at each subpath.
- **Landing page stays out of Quartz.** `index.html` is 29 KB of hand-written HTML/CSS, copied verbatim into `public/`. Gives total visual control for the marketing surface without fighting Quartz's templating.
- **Forced light mode.** `custom.scss` overrides both `:root[saved-theme="light"]` and `:root[saved-theme="dark"]` with the same palette, then the dark-mode toggle is hidden via the layout. Brand-consistency over user preference.
- **Logo override is a one-component fork.** `PageTitle.tsx` is 23 lines; the only Quartz *component* overridden. Hardcodes `<a href="https://www.signaltrace.wiki/">` so the logo escapes the subpath sandbox.
- **`public/` is gitignored and disposable.** Every build rebuilds from scratch (`fs.rmSync` at start). Nothing persists between builds.
- **Content lives in separate vaults.** Per `README.md`: "Research lives in a separate Obsidian vault (e.g. `/home/laudes/zoot/projects/sa-corruption`). To publish: copy or sync the vault folder into `content/<slug>/`." Research repo ≠ publish repo.

## Concrete proof points

- **5 case studies published**: `sa-corruption` (SA state capture), `alfaromeo` (80-year corporate network), `paypal` (competitive research, Q4 2025), `strait-of-hormuz` (2026 Hormuz crisis), `attbid` (AttBid/RMH/WeBuyCars).
- **308 markdown pages total** across `content/`.
- **Per-case breakdown**: sa-corruption 108 md / 7 entity folders (People, Organisations, Government, Contracts, Concepts, recon, open_questions); alfaromeo 90 md / 7 folders (People, Organisations, Events, Vehicles, Races, Symbols, open_questions); strait-of-hormuz 45 md / 2 folders (open_questions, infranodus-out); paypal 36 md / 6 folders (People, Organisations, Products, Metrics, Events, open_questions); attbid 29 md / 1 folder (open_questions).
- **Entity taxonomy is consistent**: People / Organisations / Events / Concepts appear as conventional top-level folders across cases.
- **14,165 LOC** of `.ts`/`.tsx` under `quartz/` (forked codebase — most upstream, small custom delta).
- **Custom delta is tiny and surgical**: `PageTitle.tsx` (23 lines) + `custom.scss` (128 lines) + `scripts/build-all.mjs` (43 lines) + `quartz.config.ts` (98 lines) + `quartz.layout.ts` (64 lines). Roughly 356 lines of actual-authored code sits on top of the fork.
- **Active work window**: first meaningful commit `2026-04-16 init: Quartz wiki for sa-corruption case`; last commit `2026-04-21`. 143 commits in the last 365 days.
- **Build orchestrator was extracted in the same pass that introduced the second wiki**: commit `2026-04-16 feat: multi-wiki architecture — sa-corruption + alfaromeo with landing page` is the one that split `scripts/build-all.mjs` out.
- **Every case ships a hero "strip collage" image** (e.g. `strip_collage.png`, `strip-collage.png`) referenced from the top of `index.md` via `![[strip_collage.png]]` — Quartz resolves Obsidian-style embeds natively.
- **Deployment target is live**: Vercel project `signaltrace-site`, team `yourdesigncozas-projects`, push-to-`main` auto-deploys to production (per `README.md`).

## Skills demonstrated

- **Knowledge Graphs & Wiki Systems** — primary skill. Designed the entity-folder taxonomy (People / Organisations / Events / …), the multi-wiki registry pattern, the shared-Quartz-one-config-per-subpath build, and the open-questions convention repeated across all five vaults.
- **Design & Brand** — hand-authored 29 KB landing page with "The Method" / "Proof of Method" narrative structure; locked SignalTrace palette (Charcoal `#171321`, Tanuki orange `#fc6d26`, orange hover `#e24329`, light grey `#dcdcde`) and type (Inter + JetBrains Mono); forced light mode; custom graph modal sizing.
- **Build & Deploy Engineering** — replaced Quartz's default `npx quartz build` entry point with a Node orchestrator, parameterised via `QUARTZ_BASE_URL`; wired to Vercel static with `cleanUrls`; kept `public/` disposable.
- **Content Strategy & Editorial** — `content-strategy/strategy.md` defines five content pillars (Epistemic Research Methods, Financial OSINT & DD, Network Intelligence & Knowledge Graphs, Market Cognition, Case Study Anatomy), a monthly 15-piece mix, and a 60-day topic calendar.

## Pull quotes

From `CLAUDE.md`:

> This is a **multi-wiki static site** built on Quartz 4 (a fork of jackyzha0/quartz). It is NOT an Astro, Next.js, or standard Quartz installation — the build system is custom.

> `scripts/build-all.mjs` — the real build entry point. Iterates the `cases` array, invokes `npx quartz build` once per wiki with `QUARTZ_BASE_URL=www.signaltrace.wiki/<slug>`, then copies `index.html` to `public/`. This is what Vercel runs.

> The `cases` array in `scripts/build-all.mjs` is the single registry of all wikis. Adding a wiki = add an entry here + a card in `index.html`.

From `index.html` ("The Method" section):

> Most research sells you an answer. Epistemic research sells you a better-formed question, plus the paper trail to defend it.

From `content-strategy/strategy.md`:

> **Voice:** Sober, plainspoken, no hype — "beat fear with information"

> **Differentiation:** Cross-domain method (markets + public accountability). Rare and ownable.

> Don't publish 15 thin pieces/month. One genuinely useful piece beats five padded ones.

From `README.md`:

> Research lives in a separate Obsidian vault (e.g. `/home/laudes/zoot/projects/sa-corruption`). To publish: 1. Copy or sync the vault folder into `content/<slug>/` …

## Open questions / dead-ends

- **No test suite.** `CLAUDE.md`: "Requires Node ≥ 22. No test suite." Build correctness is verified by visual inspection + Vercel preview deployments.
- **No ingestion tooling in this repo.** Research/entity-extraction lives elsewhere (the per-case Obsidian vault referenced in `README.md`). This repo is strictly the publishing surface — Python-services / data-pipelines skill *is not* demonstrated here.
- **`CustomOgImages` is flagged as slow.** Inline comment in `quartz.config.ts`: `// Comment out CustomOgImages to speed up build time` — currently on, so every build pays the satori/sharp cost.
- **No incremental build.** `fs.rmSync('public')` at the start of `build-all.mjs` means every wiki is rebuilt every time, even when only one changed. Acceptable at 5 wikis / 308 pages; not at 50.
- **Single `baseUrl` in config is coupled to prod domain.** Preview deployments on Vercel still build with `www.signaltrace.wiki/<slug>` in the base URL, not the preview URL — internal links on previews point back at production.
- **This pattern is being reused** for the YourDesign CV wiki (the dive itself is for `ydcoza-cv`); the orchestrator pattern is the transferable asset.

---

**Summary** (5 lines):
SignalTrace is a 5-wiki OSINT publication on Quartz 4 + Vercel; the transferable idea is `scripts/build-all.mjs` which loops a `cases` array and runs `npx quartz build` once per subpath with a per-wiki `QUARTZ_BASE_URL`. Custom delta over the Quartz fork is tiny: one component override (`PageTitle.tsx`, 23 lines), 128 lines of SCSS theme, 43-line build orchestrator, and a 4-line `vercel.json`. Content totals 308 markdown files across 5 case studies, all organised with the same entity taxonomy (People / Organisations / Events / …). John's active window on this repo is 2026-04-16 → 2026-04-21, 143 commits across the forked history. Evidence strongly supports "Knowledge Graphs & Wiki Systems" and "Design & Brand"; does not support "Python Services & Data Pipelines" — ingestion lives in a separate research vault.
