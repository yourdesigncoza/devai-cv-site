---
title: apes-signal
tags: [project, quant, python]
draft: false
status: archived
---

# apes-signal

> A bar-by-bar Python port of a TradingView Pine v5 momentum indicator (AMS), wrapped in an iterative "ratchet" parameter-search loop. Published as a negative result.

**Stack:** Python (pandas/NumPy), Pine v5 source for reference, JSONL history log, git commit per accepted iteration.
**Status:** Archived. The in-repo `final-report.md` documents the conclusion.
**Source:** private (history preserved in-repo).

## The story

The source strategy was a custom momentum indicator on TradingView — Gaussian IIR smoothing, a MATS adaptive moving average, a Trend Angle computed from an Epanechnikov-smoothed slope, Stoch RSI, ATR. The plan was to port it bar-by-bar to Python, preserving Pine's `nz()` and warm-up semantics, and then let a parameter-search loop chew on it to see if there was anything there.

The search loop is the interesting part. Rather than hand-tuning or scripting a grid, I wrote a ratchet in the Karpathy sense: a fixed catalogue of hypotheses (widen the volatility gate, tighten the exit, change the smoothing window, and so on), an evaluator that runs a proposed change end-to-end over 125,000 hourly XAU/USD bars (2004–2025), and an accept-or-revert step keyed on profit factor. Every iteration is logged to `history.jsonl` and committed to git, so the trail of decisions survives.

It ran 125 iterations in about half an hour on 2026-04-10. Seven improvements were accepted. Best profit factor achieved: 1.019. The `final-report.md` derives the ceiling from first principles — the win-rate × R:R combination the indicator can actually deliver doesn't survive realistic trading costs. I wrote it up honestly rather than quietly putting the repo down.

The artefact I care about here is the ratchet pattern. It's deterministic, reviewable, and doesn't require an LLM to work. The underlying strategy might not be worth anything, but the loop around it is reusable.

## Architecture in one breath

Pine source → bar-by-bar Python port (`pine_math.py`, `signal.pine`, `evaluate.py`) → ratchet loop (`ratchet.py` with fixed hypothesis catalogue) → in-process eval over cached DataFrame → JSONL log + git commit per accepted iteration.

## Proof points

- 125,000 XAU/USD 1h bars, 2004–2025.
- 125 ratchet iterations, 7 accepted improvements.
- Best profit factor achieved: 1.019 (documented ceiling below trading costs).
- Wall-clock run window: 21:24 → 21:53 on 2026-04-10.
- ~2,970 LOC across `evaluate.py`, `pine_math.py`, `ratchet.py` (×3), `signal.pine`.
- 9 git commits preserving the search trail.

## What this proves

- [[skills/quant-engineering|Quant Engineering]] — walk-forward logic, profit-factor / Sharpe / max-DD metrics, win-rate × R:R ceiling analysis, honest negative-result reporting.
- [[skills/python-services-data-pipelines|Python Services & Data Pipelines]] — stateful streaming indicator replication, pandas/NumPy 125k-bar pipeline, in-process eval with cached DataFrames.

## Decisions worth a deeper read

- [[decisions/publishing-negative-results|Why I publish negative results]]
