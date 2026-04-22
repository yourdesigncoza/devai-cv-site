---
source_path: /home/laudes/zoot/projects/InsiderSignalResearch
extracted: 2026-04-22
---

## One-line pitch

Quant research pipeline over SEC Form 3/4/5 insider-buy filings — cluster detection, role-weighted conviction scoring, and IS/OOS-disciplined backtesting across 4,143 enriched signals (2021-2025), driven by a multi-agent research sprint framework.

## Stack & dependencies

- Python 3.13, `uv`-managed venv (`.python-version` = 3.13)
- PostgreSQL (`insider_data` DB, shared with sibling repo `get-insider-db`)
- SQLAlchemy + `psycopg2-binary`, pandas
- `anthropic` + `instructor` + `pydantic` — LLM-backed insider classification (Claude Haiku fallback when rule-based confidence is low)
- `yfinance` + Financial Datasets API — price enrichment
- `structlog` (structured logging), `rich`, `tabulate`
- `pytest` for tests; `.env` present (not read — contains secrets)
- 14 requirements total; ~5,658 LOC of Python across `src/`, `scripts/`, `tests/`

## Architecture sketch

Data flow: shared DB view `insider_buy_signals` (clean open-market 'P' transactions) -> cluster detection -> conviction scoring -> JSON export -> price enrichment -> backtest -> research simulator.

Two cluster detection paths:
1. **Full Python pipeline** (`src/analytics/cluster_buys.py`, ~50K LOC file) — sliding-window detector (`window_detection.py`), per-insider classification (rule-based + LLM fallback, cached in `insider_entities`), role-weight scoring (`insider_roles.py`: CFO=4 > VP=3 > CEO=2 > Director=1), feature engineering (`days_to_file`, `sale_to_purchase_ratio`, `percent_change`), composite score (`cluster_scoring.py`, exponential-saturation 0-100), post-filters (sector blocklist, fund-ratio cap, dedup). Driven by `scripts/scan_clusters.py`.
2. **Fast SQL path** (`src/services/cluster_detection_fast.py`) — single self-join query, skips classification/scoring. Driven by `scripts/dashboard.py` (daily screener ranked by $/insider with historical win-rate context from `historical_rates.py`).

Research module (`src/research/`):
- `strategy.py` — `Strategy` dataclass composed of `SignalFilter` + `PositionSizing` + `ExitRules`, serializable via `to_dict`/`from_dict`.
- `data_explorer.py` — `load_enriched_signals()` (all 4,143), `load_in_sample_signals()` (IS-only 2021-2023, ~2,505 signals) with hard rule that agents MUST use IS for factor discovery; `split_is_oos()`, `compute_factor_stats()`, `cross_tabulate()`.
- `portfolio_simulator.py` — 3-checkpoint (30/60/90d) simulation, `run_yearly_breakdown`, `compare_strategies`.
- `daily_simulator.py` — day-by-day sim with daily stop-loss, take-profit, trailing-stop support.
- `experiment_tracker.py` — append-only JSON leaderboard at `exports/research/experiments.json`.

Agent-driven research sprint (`.claude/agents/`, 5 agents):
- `strategy-lead` (orchestrator), `data-analyst` (factor correlations / quintiles), `backtester` (portfolio sim runner), `critic` (overfitting / OOS / stress tests), `exit-optimizer` (grid-search SL/TP/trailing).
- Launch runbook in `scripts/run_research_sprint.md` — 7 phases with blocked_sectors discipline; output lands in `exports/research/investment_plan.md`.

Scoring config is centralized in `src/scoring_config/scoring_weights.py` with dataclass singletons (`RoleWeights`, `ClusterScoringWeights`, `ClusterThresholds`) and a sector blocklist (`sector_blocklist.py`, 544 blocked SIC codes across 13 categories) sourced from `sector_lookup` (SEC EDGAR SIC data).

## Design decisions worth telling

- **Strict IS/OOS discipline codified in agent prompts.** `load_in_sample_signals()` is enforced for Phases 1-4 (discovery); OOS (2024-2025) is reserved for Phase 6 validation. Sprint 1 ran without this and gave misleading results; Sprints 2-3 with strict splits told the real story.
- **Two-speed detection** — slow Python pipeline for scored research-grade runs, fast SQL path for interactive dashboards. Same view (`insider_buy_signals`) as the root — one source of truth.
- **Config-as-singletons** — `ROLE_WEIGHTS`, `SCORING_WEIGHTS`, `CLUSTER_THRESHOLDS` imported everywhere; no magic numbers scattered.
- **Rules first, LLM second** — insider classification uses name-token rules with a Claude Haiku fallback only when confidence is low; results cached in `insider_entities` to keep LLM calls bounded.
- **Post-mortem honesty.** The README opens with `Status: SHELVED` and documents why: 50% win rate is a coin flip, take-profit always hurt OOS, concentration (not edge) drove returns. The repo is preserved explicitly as a research archive.

## Concrete proof points

- **4,143 enriched signals** across 2021-2025, derived from SEC Form 3/4/5 filings (open-market purchase transactions, transaction code 'P').
- **5 yearly enriched backtest JSONs** tracked in git (`exports/backtest/backtest_2021_enriched.json` … `backtest_2025_enriched.json`, ~4.4 MB total; 2021: 979 KB, 2022: 989 KB, 2023: 907 KB, 2024: 726 KB, 2025: 826 KB).
- **27 logged experiments** in `exports/research/experiments.json` (42 KB), with fields `id, agent, hypothesis, strategy_name, result, notes, timestamp`.
- **4 investment-plan artifacts** in `exports/research/` — `investment_plan_01.md`, `_02.md`, `_03.md`, final `investment_plan.md` (9 KB).
- **13 commits across a single ~6-hour window on 2026-02-27** (09:28 → 15:40), ending with `docs: add post-mortem and shelve project — insufficient edge in insider signals`.
- **Best strategy documented (`officer_conviction_20`)**: IS +37.1% / OOS +113.2% / OOS WR 50.0% / OOS MaxDD 18.3% / 166 IS + 118 OOS trades; profitable in 4/5 years.
- **Factor quintile spreads** measured: VPI Q1 56.0% WR vs Q5 39.1% WR (17pp), trades_per_insider <2.5 51.9% vs >2.5 41.1% (11pp), officer present 49.8% vs absent 45.5% (4pp).
- **Grid search infra**: 64 exit-rule combinations (8 SL × 8 TP) grid-searched in Sprint 2.
- **DB touchpoints**: `form345_submission`, `form345_reportingowner`, `form345_nonderiv_trans`, `insider_entities`, `cluster_events`/`cluster_event_members`, `market_prices` (~676K rows, 2,176 tickers), `sector_lookup`, `issuer_cik_ticker_map`.
- **Tests**: `test_daily_simulator.py` (114 lines), `test_strategy.py`, `test_price_fetcher.py`, with `conftest.py` ensuring project root on `sys.path`.
- **Forward-looking TODO** in `docs/TODO_fundamentals.md` — fundamentals/valuation/earnings-estimates/news-catalyst layer inspired by `virattt/dexter` to improve on the 50% WR.
- **Design doc**: `docs/plans/2026-02-27-exit-optimization-design.md` (~41 KB) specifies the exit-optimization sub-phase.

## Skills demonstrated

- **Quant Engineering** — signal design (VPI, role-weighted conviction), cluster detection via sliding window, quintile factor analysis, IS/OOS splits, grid-search exit optimization, daily-resolution portfolio simulation with stop-loss / take-profit / trailing-stop.
- **Python Services & Data Pipelines** — SEC EDGAR ingest staged through a PostgreSQL `insider_data` DB, SQLAlchemy engine singleton (`get_engine()`, `lru_cache`), two-speed detection architecture, LLM-assisted entity resolution with caching, checkpoint-resume daily price fetcher with API + yfinance fallback, `structlog` structured logging, pytest test suite.
- **Knowledge Graphs & Wiki Systems / Research Tooling** — agent-team research sprint framework (5 specialised agents with explicit data-discipline rules baked into prompts), append-only experiment leaderboard, versioned markdown investment plans, post-mortem discipline, clearly-scoped CLAUDE.md that doubles as onboarding map.

## Pull quotes

From `README.md`:
> "Status: SHELVED — After extensive research across 4,143 signals (2021-2025), 12+ strategy variants, and 3 research sprints, the conclusion is that SEC insider trading signals lack sufficient edge to build a reliable investment strategy. … This codebase is preserved as a research archive."

> "Portfolio construction did the heavy lifting. The single biggest return lever was position count — cutting from 20 to 10 positions produced a 5x return improvement with identical signals and win rate. That's a concentration bet, not an edge."

> "Take profit always hurt OOS. Every take-profit level tested degraded out-of-sample returns — a classic overfitting signature."

> "Conviction score was anti-predictive — the original composite scoring formula (exponential saturation, role weights) didn't help. Raw VPI was better."

From `CLAUDE.md`:
> "Key finding: $/insider (value_per_insider) is the best ranking metric. Conviction score was anti-predictive. Smaller officer-level buys outperform large fund purchases."

From `.claude/agents/strategy-lead.md`:
> "Phases 1-4 (discovery): Use ONLY In-Sample data (2021-2023, ~2,505 signals). Factor discovery, hypothesis generation, quintile analysis, and strategy assembly must never touch OOS data."

From `docs/TODO_fundamentals.md`:
> "Our insider signal pipeline answers 'who is buying and how much?' but stops there. A post-signal validation layer answers 'why are they buying?' and 'is the stock actually undervalued?' — which could improve the 50% win rate by filtering out clusters where fundamentals don't support the insider thesis."

## Open questions / dead-ends

- All 13 commits land on a single day (2026-02-27). Real calendar research window vs. a consolidation commit from elsewhere is unclear from the repo alone.
- `exports/cluster_runs/` is empty (scan outputs are gitignored), so live cluster volume can't be measured from the checkout — only the backtest corpus (4,143 signals) is observable.
- `exports/research/fetch_checkpoint.json` (18 KB) implies a partially-run daily-price backfill; completion state not confirmed without running the checkpoint script.
- The project is explicitly SHELVED — `docs/TODO_fundamentals.md` sketches a fundamentals/valuation overlay but no code for it exists in the repo.
- `.env` was not read (by rule). `DATABASE_URL`, `FINANCIAL_DATASETS_API_KEY`, `ANTHROPIC_API_KEY` are declared in `CLAUDE.md`, but actual DB host/credentials intentionally not inspected.
- OOS +113.2% on `officer_conviction_20` is flagged as "suspicious — likely driven by the strong 2024-25 bull market rather than signal quality" by the author; not resolved.
