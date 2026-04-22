---
title: ftr_strategy_backtesting
tags: [project, quant, python]
draft: false
status: active
---

# ftr_strategy_backtesting

> A backtesting research platform for three systematic trading strategies sharing a common metrics spine: FTR (Failed To Return), OB-Pullback Trend, and ORB (Opening Range Breakout).

**Stack:** Python, YAML configs, `argparse` CLI, stdlib-only CSV ledger for logged runs.
**Status:** Active research.
**Source:** private.

## The story

The three strategies — supply/demand zones with a failed-to-return confirmation, order blocks with an EMA trend filter, and opening-range breakouts — are implemented as parallel entry points (`backtest.py`, `backtest_ob.py`, `backtest_orb.py`) that plug into a shared metrics and simulation spine. What matters for this project isn't any single strategy; it's the scaffolding.

The primary metric is confidence-adjusted expectancy: raw expectancy minus 2σ/√n, so a promising-looking edge on a thin sample doesn't get to pretend it's robust. There's an R:R-scaled minimum-trade gate that raises the evidence bar when the payoff is skewed. Walk-forward validation is a gate rather than a chart — a run that fails walk-forward gets an overfit flag attached to its ledger entry. Higher-timeframe bias (e.g. 1h EMA trend) is applied without look-ahead, via an explicit index shift at merge time. The data snapshot is MD5-hashed and attached to the run record, so a result can be traced back to the exact bars that produced it.

Configs are YAML, resolved through a named-then-scratch-then-explicit-path lookup chain (`configs/`, `configs-scratch/`, and a `--config` flag). Runs are logged to a stdlib-only CSV ledger — no pandas, no database — so the logging survives independently of the research stack. An additional `researcher.md` defines an autonomous parameter-optimisation workflow: a `METRIC: <float>` stdout contract and a gitignored `.lab/` for experiment state.

The repo is young. The git history is a compressed sprint over two days in April 2026, and there are no tests. I'd call this a research-platform build — the scaffolding is there, the strategies themselves are early.

## Architecture in one breath

`data_fetch` → `zones` / OB / ORB detectors → `backtest` (shared spine: metrics, exits, slippage) → CSV ledger with MD5 snapshot hash → `run.py` / `run_multi.py` entry points.

## Proof points

- 2,708 LOC across 14 Python files.
- Three strategy variants on one shared spine.
- 56 YAML configs (14 / 15 / 27 across the three strategies).
- 65 logged runs across 17 cached instruments.
- 7 commits over 2026-04-09 → 2026-04-10 (research sprint).
- Confidence-adjusted expectancy as primary metric; R:R-scaled min-trade gate; MD5 snapshot hashing.

## What this proves

- [[skills/quant-engineering|Quant Engineering]] — confidence-adjusted primary metric, walk-forward as a gate, no-lookahead HTF filtering, explicit overfit flagging.
- [[skills/python-services-data-pipelines|Python Services & Data Pipelines]] — linear data flow, stdlib-only ledger decoupled from research stack, YAML config resolution, CLI ergonomics.

## Decisions worth a deeper read

- [[decisions/publishing-negative-results|Why I publish negative results]] — walk-forward-as-gate is the same stance in a different register.
- [[decisions/stdlib-over-pandas-for-the-scanner|Why stdlib over pandas for the scanner core]] — the stdlib-only CSV ledger here is the same habit.
