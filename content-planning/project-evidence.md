---
title: Project evidence pack (source of truth for content)
date: 2026-05-29
note: Extracted by reading the actual source code of each project. Factual, no marketing voice. The content writer pulls specifics from here. Read the "Corrections" lines: some current public descriptions do not match the code.
---

# Project evidence pack

Raw technical evidence for the case studies, service pages, and content clusters. Every number here came from reading the real source. Use specifics from this file instead of adjectives (see the content-plan writer brief).

Source paths:
- vault-builder (THE MACHINE): `/home/laudes/.claude/skills/vault-builder` (outputs live in `/home/laudes/zoot/projects/wiki-builds`)
- jobabroad.co.za: `/home/laudes/zoot/projects/jobabroad-co-za`
- signaltrace.wiki: `/home/laudes/zoot/projects/signaltrace-site`
- EdenFintech scanner: `/home/laudes/zoot/projects/edenfintech-scanner-python`
- WeCoza 3.0: `/opt/lampp/htdocs/wecoza/wp-content/plugins/wecoza-core`

---

## 0. vault-builder  (THE KEYSTONE: the method, not a project)

This is the spine of the whole positioning. It is not one of the projects. It is the machine that produces the research vaults the projects are built on. **The signaltrace wikis and jobabroad's research vault are vault-builder output.** The portfolio is one repeatable method proven across ~21 domains and shipped into two live products, not four unrelated builds.

**What it is:** a Claude Code skill that turns a topic into a navigable, evidence-graded Obsidian knowledge graph. You give it a goal, 3-5 seed entities, and source constraints. It runs a 7-phase loop: seed research, graph analysis (infranodus), gap synthesis, human steering (or autonomous), research round, audit, final report. The vault grows round by round until the graph converges or you stop.

**The pipeline (7 phases):** P0 detect/scaffold to P1 goal to P2 seed round to P3 infranodus graph analysis to P3b gap + hollow-hub synthesis to P4 human steering gate to P5 research round to (loop) to P6.5 audit to Final Report to P7 community maps + prose articles. Automated steps are Python; research is the LLM; direction is the human (or autonomous with `--auto`).

**The quality gates (the clever, ownable part):**
- **Wikilinks are the product.** Every `[[link]]` is a claim about a relationship. Unresolved links are not bugs, they are the next research targets. The graph is the output, not a side effect.
- **Hollow-hub detection** (`detect_hollow_hubs.py`): the machine catches its own blind spots. A stub note with high betweenness centrality and 3+ inbound wikilinks is flagged as the most urgent thing to research next, ranked by BC. It knows what it does not yet know.
- **Evidence grading is mandatory.** You cannot create a note, even a stub, without committing to `evidence_strength: confirmed | alleged | rumoured`. Allegations are never written as fact.
- **Convergence detection** (`check_convergence`): stops when `new_notes < 2` for two rounds and gap count is stable. It distinguishes "found new facts" from "reshuffling what it already knows" and stops instead of hallucinating more. Restraint, in code.
- **Source-conflict as a research target.** Contradictory sources are never resolved silently. A `> **Conflict:**` block is written and an open question is created. The disagreement is the finding.
- **P6.5 audit + back-propagation** (`resolve_wikilinks.py`): before the final report, every note is re-read against its sources, every corrected fact is propagated to every note that links the entity, orphan/phantom files are deleted, and a Vault Health scorecard must read all zeros. This is the client trust certificate.
- **Core invariants enforced:** no phantom nodes, no heading-only notes, no orphan root files, Title-Case filenames so links resolve.

**Numbers:** ~5,548 lines across the skill (SKILL.md 920, `resolve_wikilinks.py` 728, `regenerate_index.py` 565, `parse_analysis.py` 357, `detect_hollow_hubs.py` 232, `goal_state.py` 258, `scaffold_vault.py` 190). 6 production scripts, 3 templates, 118 test cases across 5 test files. Documented ADRs and bug post-mortems. Real example vault (PayPal): 33 notes, 1,407 concept nodes, 26,727 edges, 6 communities, 11 rounds.

**Productizable vs bespoke:** repeatable for any client = the 7-phase loop, GOAL.md schema, the 5 base note schemas, the 4 core invariants, all 6 scripts, the convergence + hollow-hub + resolver algorithms. Bespoke per engagement = domain-specific entity types and relation codes, source presets, iter caps. The pitch writes itself: "Give me a topic, 3-5 seed entities, and your sources. I run the machine. You get a navigable, evidence-graded, audited research graph that keeps growing."

**Content hooks (the best material on the whole site):** wikilinks-are-the-product; a research tool that finds its own blind spots (hollow hubs); why every claim must carry an epistemic grade; why knowing when to stop is the hard part (convergence); treating contradictions as findings; the audit-and-Vault-Health trust mechanism; brief-to-graph automation with `--auto`.

**The unifying narrative:** signaltrace = vault-builder output published through a custom Quartz multi-wiki build. jobabroad = a vault-builder vault wired into a paid self-service portal with RAG, scoring, and a coach. The EdenFintech scanner = the same epistemic discipline (typed barriers, evidence grading, negative results) applied to quant research instead of entity research. One worldview, three surfaces.

---

## 1. jobabroad.co.za  (Tier 1: knowledge portal)

**Stack:** Next.js 16.2 (App Router, RSC), React 19, TypeScript, Supabase (Postgres + pgvector + SSR cookie auth + Storage + one Deno edge function), Tailwind v4, Paystack (ZAR), OpenAI `gpt-4o-mini`, `@xenova/transformers` (local `gte-small` for indexing), `@react-pdf/renderer`, Brevo email, Cal.com embed, BotID, Zod, Vercel (cron + analytics). Playwright tests.

**What's actually built:** public marketing site + blog (10 articles) + route/guide/compare content; email-password auth with admin allowlist; multi-step assessment wizard (11 categories) saved as JSONB; JSON-rubric readiness scoring with LLM narratives (cached); R495 Paystack paid tier with HMAC-verified idempotent webhook; async PDF report generation; member-area semantic search (two-step search then RAG answer with `[n]` citations); a paid AI coach (RAG + journey milestones + daily rate limits + 90-day rolling access + proactive email nudges); admin tools (WhatsApp draft assistant with prompt-injection guards, post-call notes, PDF regen).

**Numbers:** 25 pages, 25 API routes, 9 Postgres tables, ~25k lines TS/TSX (~6.2k in `lib/`), 35 components, 1 edge function, 10 Playwright specs, 50 commits.

**Standout engineering (real mechanisms):**
- RAG done right: same `gte-small` model for indexing (local ONNX) and query (Supabase hosted) so the embedding space matches; pgvector cosine search via Postgres RPC `match_pathway_chunks`; two-step search then answer.
- Async payment to PDF: webhook verifies HMAC-SHA512 with `timingSafeEqual`, flips tier idempotently, then `waitUntil()` runs scoring + 2 LLM calls + render + upload after the 100ms ack; dashboard polls a status state machine.
- Atomic rate limiting in Postgres (`try_increment_agent_message`): returns a row with an explicit `allowed` boolean in every case, avoiding the ON-CONFLICT-at-cap "silent success" bug.
- Cron nudge uses `FOR UPDATE SKIP LOCKED` to claim up to 50 stale users without double-sending across concurrent runs.
- LLM safety: structured JSON via Zod, prompt-injection guards labelling user content as untrusted, and a monotonic constraint so the coach can move a milestone to `in_progress` but never mark it `done`.

**Content hooks:** the async-webhook-to-PDF migration (state machine + nullable column + polling); rubric-as-JSON scoring; two-runtime embedding consistency; the LLM "can't mark it done" constraint; the Postgres check-and-increment gotcha; prompt-injection defence in a public-facing admin tool.

**Corrections (do NOT claim these):**
- **No CV upload exists.** The README listed it; there is no upload route in the code. Drop it from all copy and from the current devai project page (which says "CV upload").
- **"Token-gated" is inaccurate.** It is session-gated (Supabase cookie auth + category match), not a URL token. Say "members-only" or "account-gated."
- **Scoring works for one category only** (`teaching`); others redirect. Don't imply all categories score.
- The **AI coach** is the most advanced part of the build and is currently unmentioned publicly. Worth foregrounding.

---

## 2. signaltrace.wiki  (Tier 1: knowledge portal / research wiki)

**Stack:** Quartz 4.5 (TypeScript SSG: esbuild + Preact + unified/remark/rehype), NOT Astro. Node 22. Content = Obsidian vaults. FlexSearch full-text. D3 (force physics) + PixiJS v8 (WebGPU canvas) + Tween.js for the graph. KaTeX. Satori + Sharp for OG images. Plausible. Vercel (`cleanUrls`, security headers in `vercel.json`). Self-hosted fonts.

**What's actually built:** 13 independent wikis, each a sub-path, each its own Quartz build pass driven by a `QUARTZ_BASE_URL` env var, assembled by a custom orchestrator. Per-wiki: Explorer tree, Ctrl+K search, breadcrumbs, knowledge graph (local depth-1 + global), backlinks, RSS, sitemap. Root landing page (plain HTML), site-wide commission-a-vault callout, generated `llms.txt` and sitemap index.

**Numbers:** 13 wikis, 912 markdown files, ~40.6k lines of content, 866 files with wikilinks, 780+ entity pages carrying `evidence_strength` frontmatter, 60+ entity `type:` values, ~1,377 source URLs in frontmatter, ~16.7k lines of Quartz TS/SCSS (the 100%-new authored parts: `build-all.mjs` 179, `custom.scss` 246, `SignalTraceCallout.tsx` 63, `generate-og-image.tsx` 122, plus the OFM parser and split-index work).

**Standout engineering (real mechanisms):**
- Custom multi-wiki build harness (`scripts/build-all.mjs`): one Quartz config, 13 env-scoped builds, output tree assembled by hand. One config file, thirteen sites.
- Split content index: `contentIndex.json` (lean, for graph/explorer on every load) vs `contentIndex.search.json` (full text, lazy-loaded only when search opens) so 900+ pages don't block first paint.
- Graph render deferral: IntersectionObserver + requestIdleCallback (Safari setTimeout fallback) so D3/Pixi only render when scrolled into view.
- Hand-built Obsidian-Flavored-Markdown transformer (`ofm.ts`, 793 lines): wikilinks with aliases/anchors, embeds, callouts, block refs, table-cell escaping. AST work on mdast/hast.
- Structured entity frontmatter as a research discipline: `type`, `evidence_strength` (confirmed/alleged/...), `sources[]`.

**Content hooks:** the split-index before/after performance story; "one config, thirteen builds" env-scoped SSG pattern; locking a framework's theme system (forced light mode) without forking its JS; deferring an expensive widget render; designing a 60+ type taxonomy across 13 domains.

**Corrections:**
- It is **Quartz, not Astro.** The devai stack story should say Quartz (or "an Obsidian to Quartz pipeline").
- It is **13 wikis, not 5.** The current devai homepage/project copy says "five OSINT and financial-research case studies." Update the number.
- `scaffold_vault.py` is referenced in content comments but is not in this repo (external content-automation tool). Don't claim it as part of this codebase.

---

## 3. EdenFintech scanner  (Tier 2: quant + agentic AI)

**Stack:** Python 3.11+, **stdlib-only core** (verified: zero third-party runtime deps; all HTTP via `urllib.request`, hand-written JSON-schema validator, no numpy/pandas/requests). One soft optional dependency: the `anthropic` SDK, imported lazily inside `default_anthropic_transport()` only. FMP for fundamentals, Gemini grounded search for qualitative evidence, Claude (Haiku + Sonnet) for analysis, optional OpenAI "Codex" judge.

**What's actually built:** a per-ticker research pipeline. Deterministic two-step screen (ATH >=60% off, understandable, not in secular decline, double-plus potential; then solvency/dilution/revenue-growth/ROIC/valuation). Multi-role LLM analysis behind a typed barrier. Deterministic scoring and position sizing. Hardening gates. Final approve/revise judge. JSON is source of truth; markdown rendered from validated JSON. Outputs the weekly watchlist on edenfintech.com.

**Numbers:** 29 modules, ~11.9k source lines, 18 test files / 152 test methods / ~1.96k test lines, 5 stage contracts, 7 methodology schemas, batch post-mortems from batch-17 to batch-52.

**Standout engineering (real mechanisms):**
- **Typed information barrier (genuinely type-enforced, not prompt-based):** `EpistemicReviewInput` is a `@dataclass(frozen=True)` with an allowlist of fields; `extract_epistemic_input()` copies only those; `review()` raises `TypeError` on the wrong type. The epistemic reviewer is provably blind to scores, probabilities, and valuations.
- **More than three roles:** `_infer_agent()` shows ~8 distinct roles: analyst/fundamentals, analyst/qualitative, analyst/synthesis, validator/red_team, validator/pre_mortem, epistemic_reviewer, hardening/cagr_exception, gemini/qualitative. Validators run in parallel via `ThreadPoolExecutor`.
- **Constrained decoding everywhere:** per-stage JSON schemas with `additionalProperties:false`, enums; `_make_schema_strict()` recursively rewrites schemas for OpenAI strict mode; Gemini output gated by `FORBIDDEN_METHOD_KEYS` / `ALLOWED_CANDIDATE_KEYS` allowlists.
- **Full LLM audit trail:** `LlmInteractionLog` + `wrap_transport()` log every call (timestamp, model, full prompt, schema, full response) to `llm-interactions.md`; repeated >2KB blobs elided by MD5 hash; cache hits logged as synthetic `[CACHE HIT]` entries; atomic stage-artifact writes (`tempfile` + `os.replace`).
- **Hardening gates:** probability-anchoring detector (catches LLM default-to-60%), evidence-quality scorer, thesis-break detector with deterministic FMP overrides, and a 3-agent unanimous CAGR exception panel.
- Scoring is plain arithmetic: `score = (100 - adjusted_downside)*0.45 + probability*0.40 + min(cagr,100)*0.15`; non-linear downside penalty; PCS multipliers; risk-type friction table.

**Content hooks:** why stdlib over pandas (the hand-written schema validator is the proof); why a type-enforced information barrier beats prompt instructions (self-assessment bias); the real multi-role review design and what each role is forbidden from knowing; LLM audit trails as a first-class feature; negative-results discipline (batch-31 post-mortem names 7 production bugs and their fixes, e.g. a regex that matched `0.26` in "interest coverage = 0.26" as a probability anchor); conservative-first ordering enforced in code (bear before bull, worst-case before base-case, else retry).

**Corrections:**
- **"Three-role review" undersells it.** There are ~8 named roles. Either say "multi-role" or name the three barrier-protected roles (analyst, validators, epistemic reviewer) precisely.
- **"Stdlib-only" needs a footnote.** True for the deterministic core; the LLM analyst layer has a soft `anthropic` dependency you install separately. Say "stdlib-only core" and mean it literally.
- **No backtesting in this repo.** `regression.py` is snapshot testing, not return backtesting. Backtesting lives in the separate `ftr_strategy_backtesting` project; keep those stories apart.

---

## 4. WeCoza 3.0  (Tier 2: complex platform / Postgres-alongside-WordPress)

**Stack:** PHP 8.0+ WordPress plugin (`declare(strict_types=1)` everywhere, 8.1 enums + readonly props), PSR-4 autoloaded, Controller -> Service -> Repository -> Model. PostgreSQL via a hand-rolled singleton **PDO** wrapper that bypasses `$wpdb` entirely (wpdb used only for options/credentials). WooCommerce Action Scheduler for async jobs. WP-Cron (5 jobs), WP-CLI (3 commands). OpenAI GPT-4.1 (NLQ) + GPT-4o-mini (summaries).

**What's actually built:** a full line-of-business app on WordPress (no posts, no custom post types, no REST) for a SETA-regulated adult-education provider: learner management (LP progression with one-in-progress rule, exams, portfolios, hours log), class management (weekly/biweekly/monthly schedule generation, per-session attendance, QA visits, SA public-holiday exclusion, status lifecycle), agent management (linked WP user accounts, invoices from payable hours, SACE tracking), client/site hierarchy, events+notifications (AI-summarised), a CRM module (leads, pipeline, opportunities, proposals, smart alerts), reporting, soft-delete recycle bin, natural-language-query to SQL, and a forensic investigation pipeline.

**Numbers:** ~305 PHP files, ~87k PHP lines (main file 1,375 lines), 96 view templates, **44 Postgres tables across 3 schemas** (public/crm/wecoza_events), 3 views, 12 triggers, 6 functions, ~55 shortcodes, ~134 AJAX endpoints, 12 namespaces, 0 custom WP tables, 5 cron jobs, 3 WP-CLI commands.

**Standout engineering (real mechanisms):**
- Postgres-not-wpdb: singleton PDO, lazy SSL connection (DigitalOcean managed, `sslmode=require`), real prepared statements, `information_schema` introspection cached in memory, `INSERT ... RETURNING <pk>` via introspected primary key.
- Business rules enforced at the DB layer: triggers (`fn_sites_same_client`, tombstone triggers blocking edits to soft-deleted rows), CHECK constraints (one in-progress LP per learner), `pgaudit` extension.
- **Forensic investigation pipeline:** when a user files feedback, `InvestigationService` joins the app audit log + pgaudit SQL log (`pg_read_file()`) + `wp-content/debug.log` tail into a JSON bundle and attaches it to a Trello card automatically. "Production-time snapshot, not reproducible locally."
- **NLQ-to-SQL safety:** `SQLSandbox` allows only `SELECT`/`WITH`, blocks 17 write/DDL keywords and 13 injection regex patterns, caps length; validated on save and before execute.
- PII detection: heuristic SA ID / passport / phone detection, obfuscated before any OpenAI call.
- JSONB where it fits (schedule_data, attendance learner_data, class notes) alongside fully relational tables where reporting needs it.

**Content hooks:** why Postgres alongside WordPress (regulatory data integrity beats CMS convenience; CHECK/triggers/pgaudit give enforcement wpdb can't); the auto-forensic-snapshot-on-feedback story; LP collision detection as domain compliance; the excessive-hours flag tied to SETA hour allocations; JSONB-vs-relational evolution; disciplined numbered SQL migrations without a framework.

**Corrections:**
- No REST API (all AJAX) and no custom post types: fine, but don't describe it as a "headless" or REST build.
- `DEMO_MODE = true` still set in the excessive-hours feature (TODO: remove before go-live). Don't showcase that specific report as live.
- Legacy plugins (`wecoza-core--crm-mvp`, `wecoza-data-manager-1`) sit alongside the production plugin; only `wecoza-core` is current.

---

## 5. Skills authorship  (the AI/LLM tooling receipts)

Proof that John builds the harness around the model, not just prompts. All numbers below were measured by reading the directories, not estimated.

**Personal workflow skills** (`~/.claude/skills`, `ydcoza-*`, authored by John): 8 active + 1 deprecated.
- `ydcoza-plan` (7 files, ~853 lines): file-driven phased planning framework with Gemini review.
- `ydcoza-teams-planning` (3 files, ~491 lines): spawns a 3-role team (Researcher, Architect, Critic) to produce dependency-aware plans.
- `ydcoza-seo` (~492 lines): the SEO playbook, the one being applied to this very site.
- `ydcoza-linkedin-engagement` (3 files, ~407 lines, 1 script): topical engagement driven through a rate-limited, audit-logged browser-control wrapper (6 calls/60s, 30/600s caps, block-signal detection).
- `ydcoza-gemini` (~203 lines): cross-model review, ask Gemini to critique Claude's work before acting.
- `ydcoza-git-actions` (~158 lines): safe commit/push workflow.
- `ydcoza-agent-teams` (~74 lines): multi-agent team orchestration entry point.
- `ydcoza-linkedin-post` (~76 lines): marketing-post generation from codebase context.
- (`ydcoza-planning` is the deprecated predecessor to `ydcoza-plan`.)

**Larger authored skills** (same `~/.claude/skills`, not `ydcoza-` prefixed):
- `vault-builder` — 11 scripts, ~5,837 lines (the research-graph machine, section 0).
- `infranodus` — 6 scripts, ~2,172 lines (text-network analysis: betweenness centrality, community detection, structural-gap detection; the engine vault-builder calls in P3).
- `graphify` — ~1,214 lines (any input to a clustered knowledge graph with HTML/JSON/audit output).

**Project-embedded AI setup** (`/opt/lampp/htdocs/wecoza/wp-content/plugins/wecoza-core/.claude/`): a full Claude configuration shipped INSIDE a client codebase so any agent working there follows that project's rules. Not generic skills, codebase-specific:
- 5 skills: `ydcoza-bug-fix` (~663 lines, work the bug/ticket queue), `ydcoza-feature-build` (~532, work the feature queue), `using-trello-cli` (~500, drive the project's Trello), `ydcoza-playwright-local` (~356, CRUD smoke tests for agents/clients/classes/learners/locations), `ydcoza-wecoza-feedback` (~87, turn a technical fix into a client-friendly explanation).
- 4 slash commands (`commands/ydcoza/`): `daily-report`, `debug`, `playwright-full-test`, `ui-audit`.
- An embedded `ydcoza-devvault` plugin and a `devvault-gate.py` hook.

**Why this matters / content angle:** the difference between prompt engineering and AI engineering, made concrete. Personal skills automate John's own workflow; the WeCoza setup encodes one codebase's conventions (its ticket queue, its CRUD test surface, its client-comms tone) so the model stays on-rails in that project automatically. This is the "harness over prompt" thesis with artifacts behind it, and it ties to the existing `open-questions/harness-vs-prompt-engineering` page.

**Content hooks:** what a "skill" is and why it beats re-prompting; embedding AI conventions inside a client codebase so its agents stay on-rails; a rate-limited audited wrapper for browser automation (responsible tooling); cross-model review (Gemini checking Claude) as a quality gate; a bug-queue / feature-queue worker that turns a backlog into agent-runnable work.

---

## Cross-cutting proof themes (for Services pages + clusters)

- **LLMs behind typed contracts, not vibes:** the scanner's frozen-dataclass barrier, jobabroad's Zod-typed LLM outputs + injection guards, wecoza's SQL sandbox. One decision page, three independent proofs.
- **Postgres as the spine:** pgvector RAG (jobabroad), 44-table multi-schema LOB app with triggers + pgaudit (wecoza), atomic concurrency functions (jobabroad cron + rate limits).
- **Audit trails and reproducibility as features:** scanner `llm-interactions.md`, wecoza forensic bundle, jobabroad idempotent webhooks + report status state machine.
- **Performance discipline:** signaltrace split index + deferred graph + self-hosted fonts; jobabroad async webhook work off the response path.
- **Knowledge to web:** signaltrace (Obsidian to 13 Quartz wikis) and jobabroad (vault to public guide to gated detail to funnel) are the two literal proofs of the Tier-1 wedge.

## Site copy to fix (found via this audit)

Update the existing devai project pages where they diverge from the code:
- jobabroad: remove "CV upload"; change "token-gated" to "members-only/account-gated".
- signaltrace: change "five case studies" to thirteen wikis; say Quartz, not Astro.
- edenfintech scanner: reframe "three-role" as multi-role (or name the three barrier roles precisely); keep "stdlib-only core" literal.
