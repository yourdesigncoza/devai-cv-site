---
title: InsiderSignalResearch
tags: [project, quant, python, research]
draft: false
status: archived
---

# InsiderSignalResearch

> A full IS/OOS research programme over SEC Form 3/4/5 insider-buy filings. Published as a shelved project with a written postmortem.

**Stack:** Python, PostgreSQL (sibling `insider_data` DB), SQLAlchemy (engine singleton via `lru_cache`), `structlog`, pytest, yfinance + paid API fallback, LLM-assisted entity resolution.
**Status:** Shelved. The README is the postmortem.
**Source:** private.

## The story

The thesis was that senior-officer insider buys, scored and filtered correctly, could produce a repeatable edge. I ran it through a full research programme — not a weekend sprint — over SEC Form 3/4/5 filings 2021–2025: signal design (VPI, role-weighted conviction), cluster detection over a sliding window, quintile factor analysis, IS/OOS splits that were actually enforced, grid-search exit optimisation, a daily-resolution portfolio simulator with stop-loss / take-profit / trailing-stop, three sprints with 27 logged experiments, four versioned investment plans.

The written conclusion: the edge isn't there. 4,143 enriched signals, 12+ strategy variants, three research sprints — not enough to build a reliable strategy on, and the parts that looked promising turned out to be portfolio construction rather than signal.

The specific findings in the README are more useful than the headline. The biggest return lever I found was cutting position count from 20 to 10, which produced a 5× return improvement with identical signals and win rate — that's a concentration bet, not an edge. Take-profit levels consistently degraded OOS performance at every threshold tested (the classic overfitting signature). The conviction score — an exponential-saturation composite with role weights — turned out to be anti-predictive; raw VPI was better.

The infrastructure survived the negative result. SEC EDGAR ingestion staged through Postgres, an LLM-assisted entity resolution step with caching (insider names are messy), a checkpoint-resume daily price fetcher that falls back from the paid API to yfinance, a pytest suite, structured logging. And an agent-team research sprint framework — five specialised agent roles, each a markdown file with explicit data-discipline rules baked into its prompt — that is the ancestor of the one I now use day-to-day.

## Architecture in one breath

SEC EDGAR → Postgres `insider_data` → enrichment (LLM entity resolution, role weighting, cluster detection) → IS/OOS signal studies → portfolio simulator → append-only experiment leaderboard + versioned markdown plans.

## Proof points

- 4,143 enriched insider-buy signals covering 2021–2025.
- 5 yearly backtest JSONs (~4.4 MB tracked).
- 27 logged experiments across three sprints.
- 4 versioned investment-plan documents.
- ~5,658 LOC, 14 deps.
- Written postmortem: position count was the real driver; take-profit always hurt OOS; the composite conviction score was anti-predictive.

## What this proves

- [[skills/quant-engineering|Quant Engineering]] — signal design, IS/OOS enforcement, grid-search exit optimisation, portfolio-level simulation with exits.
- [[skills/python-services-data-pipelines|Python Services & Data Pipelines]] — SEC ingestion staging, SQLAlchemy engine singleton, `structlog`, pytest, checkpoint-resume fetchers.
- [[skills/knowledge-graphs-wiki-systems|Knowledge Graphs & Wiki Systems]] — agent-team sprint framework with data-discipline rules in each prompt; append-only experiment leaderboard; versioned markdown plans.

## Decisions worth a deeper read

- [[decisions/publishing-negative-results|Why I publish negative results]]
