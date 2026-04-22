---
title: Notes
description: "Notes — running log of things I've learned that don't yet rise to a decision. Dated, short-form, first-pass thinking."
tags: [notes, index]
draft: false
---

A running log of things I've learned that are too small to become a [[decisions/|decision]] but worth capturing before they fade. Dated entries, short-form, not curated.

If you're reading this from outside: entries here are the first pass of thinking. The decisions folder is where things go once I've held a view long enough to defend it.

## Entries

### 2026-04-20 — Rebrands kept poisoning Gemini's research context

Rolled the Gemini research prompt to v2: seven hardcoded directives (credit ratings, debt schedules, revenue concentration, regulatory cadence, insider transactions, executive compensation, competitive landscape), each mapping to a specific evidence array in the raw bundle schema. What prompted the rewrite was that rebrands like OMI → ACH were returning ambiguous search results — Gemini would pull in old-ticker filings alongside new-ticker coverage. Threaded FMP-sourced company name, sector, and industry into the prompt as `context_entities` to disambiguate. Cache key now includes `GEMINI_PROMPT_VERSION`, so prompt upgrades auto-invalidate stale bundles. Validated against OMI (Healthcare) and PYPL (Financial Services) to check no sector cross-contamination.

*source: edenfintech-scanner-python, commit 1f71b7d*

### 2026-04-02 — Dev-mode instrumentation was breaking my own smoke tests

Every one of the 22 Playwright smoke tests was failing the "no unrendered shortcodes" regex check. I'd been scanning `document.body.innerHTML`, but the Shortcode Inspector debug badge (`ydcoza-shortcode-indicator`) lives as a sibling of `.entry-content` and renders `[wecoza_*]` names as visible badges. My own dev tool was the thing tripping the assertion. Scoping the check to `querySelector('.entry-content').innerHTML` turned all 22 green. Worth remembering that debug UI can counterfeit the exact string patterns tests are searching for.

*source: WeCoza daily report, 2026-04-02*

### 2026-04-02 — Missing Google Maps key was hiding the real form selectors

The locations CRUD tests kept failing on `#wecoza_clients_google_address_search` not being found. That input is injected by the Google Maps autocomplete library and only exists when the API key is configured. On my dev box the key wasn't set, so the library never ran. The static fields — `#street_address`, `#suburb`, `#town`, `#province`, `#postal_code` — were there the whole time. I ran a DOM inspection test to list what was actually rendered before writing more selectors off documentation. The suite now targets the static fields and treats autocomplete as a progressive enhancement.

*source: WeCoza daily report, 2026-04-02*

### 2026-04-02 — Gemini adversarial review flagged a conditional-existence check I'd written as a guard

Piped the full Playwright suite to Gemini CLI for a critical pass. Eight issues back, all fair: `waitForTimeout()` anti-pattern, `networkidle` being unreliable in WordPress, `innerText` missing hidden tabs, loose search assertions, conditional `if (searchExists)` that passed silently when the search bar was missing, DOM-only wipe-all safety with no network guard, `#content` being too broad a scope, and test names that wouldn't read in CI output. The one I'd have missed on my own was the conditional check — I'd written it as a guard but it was really a way for the test to pretend nothing was wrong.

*source: WeCoza daily report, 2026-04-02*

### 2026-03-26 — Soft delete meant touching 20 queries, not five repositories

Adding `SoftDeleteTrait` to the five entity repositories was the easy half. The other half was finding every query that joins or filters on those tables and adding `deleted_at IS NULL`. I ended up touching 20 queries across 6 files — dropdowns, dependency counts, list views, search. Missing any one of them meant soft-deleted records reappearing somewhere unexpected. Added an `$includeDeleted` flag to the couple of `getById()` methods the Recycle Bin itself calls. The trait gave me the API; the grep for every query that pretends deleted rows don't exist was the actual work.

*source: WeCoza daily report, 2026-03-26*

### 2026-03-26 — Recycle Bin auto-purge needed a mutex for concurrent runs

The weekly Recycle Bin purge looked straightforward until Gemini's review pointed out that Action Scheduler can fire the same job twice under load, and a concurrent purge on the same cascade tables is a recipe for partial deletes. Added a mutex lock and a post-run error summary rather than relying on individual log entries. Also swapped the DELETE syntax to use `USING` for the cascade — cleaner than correlated subqueries on Postgres.

*source: WeCoza daily report, 2026-03-26*

### 2026-03-26 — Moving the audit diff to PHP kept the frontend simple

For the audit log's deep-diff feature I was about to compute `old -> new` field changes in JavaScript, which meant the audit log JS had to know every entity's field shape. Moved the diff to `computeFieldChanges()` in PHP, stored the result in the audit row, and the frontend just renders it. The inline diff UI became a pure read. The CSV export got the diff for free because it was already on the row.

*source: WeCoza daily report, 2026-03-26*

### 2026-03-20 — FK violation on class delete was a cascade I hadn't planned for

Deleting a class with learner-progression tracking records hit an FK violation at the DB level. The class UI had no idea this was possible; it just showed a generic error. The fix wasn't "add CASCADE" — I didn't want silent deletion of progression history. Hardened the delete into a transaction, checked for dependent rows up front, and surfaced the counts in the confirmation dialog. Later generalised this into the dependency-count AJAX endpoints for all five entities.

*source: WeCoza daily report, 2026-03-26 (quick-31)*

### 2026-03-20 — Carried MySQL habits into a Postgres search

Agent search was missing results that were plainly there. Two issues stacked: `LIKE` is case-sensitive on Postgres, unlike MySQL where `LIKE` is case-insensitive by default, and the query was only hitting `first_name` + `surname`, skipping `second_name` entirely. Replacing `LIKE` with `ILIKE` and adding the missing column is a one-line fix, but it was two separate assumptions carried over from habit.

*source: WeCoza daily report, 2026-03-26 (quick-28)*

### 2026-03-19 — Daily-granularity claim tracking killed a whole class of reconciliation work

The first version of agent claim tracking was monthly lump sums. Agents would submit a single number, compare it to the system's computed figure, and discrepancies were impossible to investigate after the fact. Switching to per-session claimed hours on the attendance capture itself, then auto-summing daily claims into the monthly figure, removed the investigation problem — if there's a mismatch, you can see which session caused it. The monthly form now pre-fills from daily claims, so agents rarely touch it.

*source: WeCoza daily report, 2026-03-19*

### 2026-03-19 — Splitting agent_orders from agent_monthly_invoices preserved history through rate changes

I was tempted to put the agent rate directly on the invoice row. Rates change, though, and old invoices need to preserve what rate was in effect when they were billed. Split it into `agent_orders` (current rate configuration) and `agent_monthly_invoices` (billing snapshots with the rate at time of submission). Raising a rate mid-year doesn't retroactively rewrite last June.

*source: WeCoza daily report, 2026-03-19*

### 2026-03-15 — Analyst worst-case kept assuming a base-case balance sheet

Stage 1 fundamentals prompt now instructs explicit dilution modelling when distressed — equity issuance, interest coverage, post-dilution share count — plus a covenant-breach narrative in `trough_path`. Earlier runs kept showing analyst drafts that modelled revenue decline in the worst case but left the balance sheet intact. No forced equity raise, no covenant violation, no cap-structure consequences. It was a prompt-discipline gap, not a schema gap — the schema had the fields, the prompt just wasn't demanding they get populated coherently in the distressed scenario.

*source: edenfintech-scanner-python, commit d8b6505*

### 2026-03-15 — Merging Gemini evidence with analyst synthesis created duplicate catalysts

Added a dedup instruction to the Stage 3 synthesis prompt: if a Gemini-sourced catalyst duplicates an analyst-written one, keep the sourced version and drop the analyst version. The issue wasn't bad data — it was that merging Gemini evidence (citation-rich, narrower) with analyst synthesis (narrative-first, wider) naturally created duplicates that inflated the catalyst array. The `catalyst_stack` (typed structure) stayed separate and was unaffected; this was purely about the flattened list the downstream view reads.

*source: edenfintech-scanner-python, commit af37bf9*

### 2026-03-10 — FMP cache existed for five phases before anything actually used it

Phase 1 implemented the FMP response cache with per-endpoint TTLs. Phase 5 automated the full pipeline. Neither wired the cache into the scanner orchestrators — `auto_analyze()`, `run_live_scan()`, auto-scan and sector-scan paths all constructed their own uncached HTTP transport. Phase 8 (gap-closure) did the actual threading: pass `fmp_transport` down the call stack, don't construct it inside orchestrators. The lesson has more miles on it than the fix — "capability implemented" and "capability used" are two different milestones, and milestone audits need to check both.

*source: edenfintech-scanner-python, v1.0-MILESTONE-AUDIT.md + commits d0ff989, fad5489*

### 2026-03-10 — A 60% base probability is an anchoring signal, not a reading

Implemented `detect_probability_anchoring()` to flag when analyst assigns exactly 60% base probability AND the dominant risk type carries narrative friction. The pattern is specific: 60% is the hard gate for a thesis to pass the scoring layer, so the analyst unconsciously lands exactly there even when the reasoning underneath doesn't really support it. Detection reuses `CONCRETE_SOURCE_MARKERS` and `is_weak_evidence()` from the epistemic reviewer. When triggered, the analyst must explicitly justify why the probability isn't 50%. The interesting bit is that the tell isn't in the prose — it's in the round number.

*source: edenfintech-scanner-python, commit 381a632*

### 2026-03-10 — Fuzzy contradiction thresholds flooded the validator with false MEDIUMs

Built `detect_contradictions()` to compare analyst claims against the FMP snapshot. First pass had fuzzy thresholds — ~20–30% gap was MEDIUM, ~30–50% was HIGH. The validator drowned in noisy MEDIUM flags and started ignoring them, which defeated the point. Tightened to 50/10 for revenue growth (HIGH if gap >50%, MEDIUM if >10%) and 10/5 for FCF margin (pp). Fewer flags, each of them actually investigable. Missing fields skip checks rather than fail-open, which keeps the signal-to-noise honest on thinly-covered tickers.

*source: edenfintech-scanner-python, commit 655c598*

### 2026-03-10 — CAGR <20% panel with three lightweight prompts caught more than one deep re-analysis would have

Implemented `cagr_exception_panel()` for cases where a candidate passes every other gate but the compounded growth rate is below 20%. Uses transport injection for analyst / validator / epistemic agents — each answers a focused "does this <20% CAGR pass despite the gap?" question and non-unanimous votes stay pending. I'd have expected a deep re-underwrite to be more robust than three short yes/no prompts. It wasn't — the narrow framing surfaced weak theses faster than the wider prompt would have, because the narrower the question the less room there is for the model to pad around it.

*source: edenfintech-scanner-python, commit bb19a99*

### 2026-03-09 — Adding page_number to JSONB avoided a migration I didn't need

Adding page-number capture to attendance could have meant a new column on `class_attendance_sessions`. The `learner_data` JSONB column already holds per-learner session data, and page number fits that shape exactly. Wrote normalisation + validation in the AJAX handler, persisted it inside the JSONB payload. Zero schema migration. One caveat: a separate bug where absent learners were stored in JSONB but not merged into the session detail response — the JSONB pattern wins on flexibility but you have to remember where the data lives when you read it back.

*source: WeCoza daily report, 2026-03-09*

### 2026-03-08 — Unified capture/edit modal deleted a drift-bug class

I had two separate modals for capture vs. edit, each with its own data-loading code and its own bugs. Unifying them into one modal with `learner_data` persisting across edit cycles deleted the class of "this fix is in capture but not in edit" problems. The UX improvement was incidental; the point was that the two code paths had silently drifted and nobody was catching it.

*source: WeCoza daily report, 2026-03-08*

### 2026-03-08 — Worst-case before base-case, bear before bull, enforced at the schema level

Analyst sub-stages generate `worst_case_assumptions` before `base_case_assumptions`, and the bear thesis before the bull thesis. A Utilities-batch run showed the analyst reordering on the first attempt — producing base-case first, then constraining the downside to fit. Added `_validate_field_ordering()` to check the sequence in the raw analyst output; on violation the analyst retries from cached Stage 1+2 rather than refetching. The point isn't arbitrary discipline; it's that writing the upside first primes the downside to be compatible with it, which is the opposite of what an honest downside estimate should do.

*source: edenfintech-scanner-python, docs/batch-30-utilities-analysis.md + epistemic-review-process.md*

### 2026-03-04 — login_redirect priority 9 to beat the theme filter at priority 10

For the agent attendance page I needed to redirect `wp_agent` role users to `/app/agent-attendance/` on login. The theme already hooks `login_redirect` at priority 10 sending everyone home. Hooking at priority 9 means mine runs first. Also learned that `is_singular('app')` matters here — all WeCoza app pages are an `app` custom post type, not WP pages, and I initially created the agent-attendance page as the wrong type.

*source: WeCoza daily report, 2026-03-04*

### 2026-03-04 — Picked agents as the source of truth for WP-user linking

Two ways to link agents to WP users: sync users from agents, or sync agents from users. Picked the first — agents are the domain entity, WP users are just the auth surface. Creating/updating/deleting an agent creates/updates/deactivates the paired WP user. Locking the `wp_agent` role's profile email prevents them from editing their way out of sync. This meant writing a `sync-agent-users` WP-CLI for bulk migration of existing agents, which I'd otherwise have skipped.

*source: WeCoza daily report, 2026-03-04*

### 2026-02-25 — The hardcoded progression-types array in JS drifted from the DB

`class-types.js` had `['GETC', 'BA2', 'BA3', 'BA4']` hardcoded as the list of class types that trigger "progression" behaviour (hide subject, auto-populate duration, show the "Learner Progression" placeholder). Adding ASC/Adult Matric to the lookup table did nothing because the JS didn't know about it. Fix was to pass `progressionTypes` from PHP via `wp_localize_script`, derived from the same `getClassTypes()` result that powers the dropdown — with `mode === 'progression'` as the filter. The lookup-table manager's CRUD now clears the class-types transient cache so admins don't wait two hours for their changes to show up. What looked like a JS bug was the class-type system being split between a DB-driven dropdown and a hardcoded behaviour array.

*source: WeCoza daily report, 2026-02-25*

### 2026-02-24 — Centralised class status in wecoza_resolve_class_status() before the UI existed

Class status derives from three things: the `class_status` DB column, whether an `order_nr` is set, and the schedule dates. Without a helper, that logic was about to get scattered across the admin UI, the event-tasks listing, the attendance lock gate, and a few AJAX handlers. Wrote `wecoza_resolve_class_status()` first and had every consumer call it. The attendance lock gate got defence in depth: UI hides the capture controls, and the server-side AJAX guard rejects the write anyway.

*source: WeCoza daily report, 2026-02-24*

### 2026-02-23 — hours_present vs hours_trained was a silent-wrong-answer bug

All progression percentages, completion checks, and progress bars were computing off `hours_present`, but the meaningful metric is `hours_trained`. `hours_present` could be inflated by sessions that were attended but didn't count toward the programme hours. Fixing it meant touching six files spanning SQL queries, view templates, and JS calculations. No error, no warning — just wrong numbers everywhere for as long as the feature had existed. These don't surface until someone does the maths by hand and gets a different answer.

*source: WeCoza daily report, 2026-02-23*

### 2026-02-19 — Built Linear integration into the feedback module then ripped it out

Built the feedback module with a `LinearIntegrationService` and sync cron — auto-create Linear issues from feedback submissions. Shipped. Then stopped and asked what it was buying me: one more system to keep in sync, one more auth token, one more failure mode. A standalone dashboard with a resolve toggle covered 100% of what I actually wanted. Pulled the Linear integration out — 557 lines deleted, 26 added. The interesting bit isn't YAGNI in the abstract — I built it first and still deleted it within the week.

*source: WeCoza daily report, 2026-02-19*

### 2026-02-19 — Dropped 23 legacy tables after rewiring learner progression

Learner progression tracking used to hang off a `products` table; the actual domain model is `class_type_subjects`. Rewired 25 files to use subjects. Then dropped 23 tables that were no longer referenced. Paired this with an audit to kill `agent_replacements` code that referenced a table dropped a few days earlier — that's the failure mode of "rewire now, cleanup later": dead code hangs around and looks alive.

*source: WeCoza daily report, 2026-02-19*

### 2026-02-18 — sendBeacon for the collision-audit log so navigation doesn't drop the write

The LP collision modal needed to log that a user saw and acknowledged a collision, including when the user's immediate next action was to navigate away. A normal AJAX call during `beforeunload` gets cancelled in most browsers. `navigator.sendBeacon()` is designed for exactly this — fire-and-forget, queued by the browser, survives navigation. No response, no retry, but for an audit trail that's fine.

*source: WeCoza daily report, 2026-02-18*

### 2026-02-17 — Auto-appending file:line to wecoza_log() paid off within a day

Upgraded the log helper so warning/error levels automatically append `file:line` of the caller, plus optional `Throwable` context. Then replaced about ten silent `try { ... } catch { /* swallow */ }` blocks with `wecoza_log()` calls. Within a day, three bugs I'd have otherwise chased by hand showed up in debug.log with exact locations. Friction of "where did this log entry come from" was a cost I'd been paying on every debug session without tracking it.

*source: WeCoza daily report, 2026-02-17*

### 2026-02-17 — Generic LookupTableRepository for any table matching the pattern

Was about to write `PlacementLevelsRepository`, `ClassTypesRepository`, `ClassSubjectsRepository` — all doing the same CRUD over similar schemas. Wrote one `LookupTableRepository` that takes the table name + allowed columns, and let the `LookupTableAjaxHandler` dispatch. Cost of making it generic was small (~260 lines vs. ~500 for three bespoke repos), and adding the next lookup table is now a config entry, not a new class.

*source: WeCoza daily report, 2026-02-17*

### 2026-02-16 — Dual-read/dual-write to migrate agent addresses without a cutover

Agent addresses lived in `agent_meta`; I wanted them in the `locations` table. Rather than a cutover migration, agents read from `locations` with an `agent_meta` fallback, and writes go to both. The migration script backfills existing agent_meta rows into locations. Once I verify every agent has both, I can flip the reads to locations-only and stop the dual-write. No downtime, no "but what if we missed one" — if the migration missed a row, the fallback still works.

*source: WeCoza daily report, 2026-02-16*

### 2026-02-16 — strict_types across 47 files surfaced two silent regressions

Added `declare(strict_types=1)` everywhere. Mostly uneventful, except `check_ajax_referer()` returns `int|false` and I had code treating it as a bool — which had coerced silently before but strict_types refused. Cast to bool at the boundary. Also caught a `BaseModel::__get()` static property access warning that the old loose mode had swallowed. Two regressions had been sitting in debug.log for weeks; nobody had noticed because they didn't break anything visible.

*source: WeCoza daily report, 2026-02-16*

### 2026-02-16 — 919-line verification script instead of hand-checking 28 requirements

The v4.0 milestone had 28 requirements across 6 architectural categories (services, models, addresses, repositories, type hints, constants). Six phases of hand-verification was untenable. Wrote `tests/verify-architecture.php` — 919 lines — that programmatically checks each requirement: "controllers don't contain business logic X", "all repositories extend BaseRepository", "these 28 files have strict_types". Re-runnable, and it caught the two regressions above. Not unit tests; structural assertions. Felt excessive until it paid for itself in one afternoon.

*source: WeCoza daily report, 2026-02-16*

### 2026-02-13 — AgentDisplayService deleted 343 lines of duplicated rendering

Four display methods were duplicated verbatim between `AgentsAjaxHandlers` and `AgentsController`. Extracted them to `AgentDisplayService` (212 lines), deleted the copies from both call sites. Net: -343, +212, and one place to change the rendering when needed. The duplication had accreted because each controller started self-contained — it wasn't a design choice, it was the default nobody went back and fixed.

*source: WeCoza daily report, 2026-02-13*

### 2026-02-13 — Hardcoded dropdowns silently drifted from the data

Class forms had hardcoded agent and supervisor lists in the view templates. The agents table is fine; the view is stale. Every time someone added an agent, the dropdown forgot. Replaced with DB queries to the same tables the list views already read from. Boring fix, but it's the kind of rot that accumulates in any form that was prototyped with static data and never revisited.

*source: WeCoza daily report, 2026-02-13*

### 2026-02-12 — Caching information_schema column lookups as transients

The sites-hierarchy AJAX endpoint was running `information_schema.columns` lookups on every request to check which optional columns existed. Cheap queries individually, but firing per-request. Cached the column metadata in a transient keyed by table name. Zero functional change, measurable reduction in DB round trips on list views. `tableHasColumn()` checks during backward-compat migrations are the usual reason these sneak in.

*source: WeCoza daily report, 2026-02-12*

### 2026-02-11 — Soft-deleting clients meant updating five queries, not one

Switching `deleteById()` from DELETE to UPDATE-with-`deleted_at` was the obvious part. The non-obvious part was that `getAll()`, `count()`, `getStatistics()`, `getMainClients()` and `getSubClients()` all needed `WHERE deleted_at IS NULL` predicates or they'd return trash rows forever. Same lesson as the later soft-delete trait rollout in March.

*source: WeCoza daily report, 2026-02-11*

### 2026-02-05 — Deleting 800 lines of abandoned trigger-based task code

Phase 18 shipped an event-driven notification system. Phase 17 was a cleanup pass: deleted `ClassChangeController`, `ClassChangeSchema`, `ClassChangeListener`, `TaskTemplateRegistry`, `ClassChangeLogRepository`, `AISummaryDisplayService`, plus six dead methods on `TaskManager` — all remnants of an earlier LISTEN/NOTIFY Postgres-trigger approach I'd tried and abandoned. ~800 lines gone. The dead code had been shadowing the new architecture, confusing search results and making the dependency graph harder to read. Worth a dedicated phase rather than leaving it because "it doesn't hurt anything" — it hurts reading comprehension, which is where most of the time goes.

*source: WeCoza daily report, 2026-02-05*

### 2026-02-03 — buildTasksFromEvents replaced a duplicated task table

The old task system stored tasks in their own table and tried to keep them in sync with class events. `buildTasksFromEvents()` is a factory: given the class event rows, it derives the task list on the fly. The task table went away. Sync bugs went away. Cost is that "mark task complete" updates the event row's JSONB (`completed_at`, `completed_by`, `notes`), and reopening a task has to preserve the notes field rather than nulling it — that was a separate bug fix.

*source: WeCoza daily report, 2026-02-03*
