---
title: Trading
description: "John Montgomery trades XAUUSD full-time. The quant research and AI-review work on this site grows out of that practice — real systems stress-tested, not academic exercises."
tags: [about, trading, xauusd]
draft: false
---

I trade **XAUUSD** (gold / US dollar) full-time. Most of the quant and AI work on this site grows directly out of that practice — the systems I build are the systems I want to run or stress-test, not academic exercises.

## Where the trading intersects the engineering

[[projects/apes-signal|apes-signal]] is the clearest example. A TradingView Pine v5 momentum setup I'd been running, ported bar-by-bar to Python and hammered with an iterative ratchet optimiser against **125,000 hourly XAU/USD bars from 2004 to 2025**. The final report says what the data said: the strategy had a ceiling below trading costs. Archived as a negative result rather than quietly shelved. That's the kind of answer I build platforms to get — see [[decisions/publishing-negative-results|Why I publish negative results]].

[[projects/ftr-strategy-backtesting|FTR Strategy Backtester]] runs three systematic strategy families on a shared metrics spine — supply/demand FTR, order-block + trend filter, opening-range breakout. Confidence-adjusted expectancy, walk-forward validation, no-lookahead higher-timeframe bias, MD5-hashed data snapshots. The research platform is the product; the strategies themselves are commodities.

[[projects/edenfintech-scanner-python|Eden Fintech Scanner (Python)]] sits at the other end of the spectrum — fundamentals on US-listed equities, weekly cadence rather than intraday XAU — but the discipline is the same. Hashed snapshots, contract-tested screens, LLM review behind typed information barriers, a written postmortem when things don't work.

## Stack

- **Live**: TradingView Pine v5 for prototyping and running setups
- **Research**: Python (pandas / NumPy on history-sized work; stdlib on production pipelines)
- **Storage**: Postgres for historical bars and run ledgers
- **Optimisation**: a home-brewed ratchet pattern — deterministic hypothesis catalogue, accept-or-revert, JSONL log, git commits for provenance
- **Discipline**: IS / OOS splits, walk-forward as a gate, confidence-adjusted metrics, data snapshot hashing

## What I'll take on

Systematic strategy research, signal pipelines, execution tooling, or a sanity-check on an existing backtest. The fuller picture is on [[skills/quant-engineering|Quant Engineering]]; the [[about/cover-letter|cover letter]] has the longer pitch; [[now|what I'm working on right now]] is where to look for current focus.
