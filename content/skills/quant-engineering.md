---
title: Quant Engineering
description: "Quant engineering: research platforms, screening, and backtesting with honest evaluation. Includes the EdenFintech scanner and shelved insider-signal research."
tags: [skill, quant, python]
draft: false
---

> "The strategy does not work and cannot be made to work by tuning parameters."
>
> [[projects/apes-signal|apes-signal]], `final-report.md`

## What this looks like for me

Most of my quant work has been research platforms rather than live trading. Screening pipelines, backtesting frameworks, signal studies. The parts I spend the most time on are not the strategies themselves but the scaffolding around them: how data snapshots are hashed, how in-sample and out-of-sample splits are enforced, how a run is traceable back to the commit that produced it, how the pipeline reports confidence alongside the headline number.

A fair share of these projects end with a negative result. [[projects/insider-signal-research|InsiderSignalResearch]] was shelved after a full sprint over 4,143 SEC insider filings. [[projects/apes-signal|apes-signal]] ran a ratchet optimiser to a documented ceiling. In both cases the reason I kept the work around is the pipeline. The same instrumentation survives even when a specific hypothesis doesn't.

I'm more comfortable building on fundamentals and structured data than on pure price-action edge, and more comfortable with transparent scoring than with black-box models. That's a preference rather than a hard rule.

## Projects that back this

- [[projects/edenfintech-scanner-python|edenfintech-scanner-python]]: fundamental screener and scoring pipeline with an agent-level information barrier for second-opinion review. Stdlib-only core.
- [[projects/insider-signal-research|InsiderSignalResearch]]: IS/OOS research programme over SEC Form 3/4/5 insider-buy signals. 4,143 signals, 27 logged experiments, shelved with a written postmortem.
- [[projects/ftr-strategy-backtesting|ftr_strategy_backtesting]]: three systematic strategy families on a shared metrics spine. Confidence-adjusted expectancy, no-lookahead HTF filtering, walk-forward with overfit flags.
- [[projects/apes-signal|apes-signal]]: bar-by-bar Pine-to-Python port of a momentum indicator, wrapped in an iterative parameter-search loop. Publicly archived negative result.

## Decisions that shaped how I do it

- [[decisions/publishing-negative-results|Why I publish negative results]]: postmortems as deliverables, on apes-signal and InsiderSignalResearch.
- [[decisions/stdlib-over-pandas-for-the-scanner|Why stdlib over pandas for the scanner core]]: deps as a drift surface; dict/list operations when the dataset is small enough.

## What I'm usually asked to do

- Set up a research pipeline from scratch: ingestion, snapshot hashing, config files, CLI
- Review an existing backtest for look-ahead, overfitting, or unrealistic assumptions
- Port a TradingView / Pine indicator into Python with its original semantics preserved
- Structure a research sprint so the stop criteria and postmortem are part of the plan
