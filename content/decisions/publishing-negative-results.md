---
title: Why I publish negative results
description: "Why I publish negative results, postmortems as the deliverable when research doesn't pan out. Evaluation discipline across shelved research projects."
tags: [decision, quant, research]
draft: false
date: 2026-04-22
---

## The position

When a research project runs its course and the answer is "there isn't enough edge here", I write the postmortem in the repo and leave the repo visible. The conclusion is the product, and the pipeline that produced it is the asset. Deleting the project, or quietly walking away, removes the evidence that the evaluation was honest in the first place.

## How I got here

Two projects on this site ended in shelving. [[projects/apes-signal|apes-signal]] ported a TradingView momentum indicator bar-by-bar to Python, wrapped it in a 125-iteration ratchet, and ran over 125,000 hourly XAU/USD bars between 2004 and 2025. Best profit factor achieved: 1.019. The `final-report.md` derives the ceiling from first principles and concludes the strategy "does not work and cannot be made to work by tuning parameters". [[projects/insider-signal-research|InsiderSignalResearch]] ran a full IS/OOS programme over 4,143 enriched SEC Form 3/4/5 signals, 12+ strategy variants, three research sprints, and 27 logged experiments, and reached the same kind of ending: insufficient edge to build a reliable strategy on. The README is the postmortem.

I had an option, on both projects, to quietly put them down. I chose to publish the shelving instead, partly because the process itself is useful, the specific findings in the insider-signal README (position count was the real return lever; take-profit always hurt OOS; the composite conviction score was anti-predictive) are worth more than a headline result would have been. Partly because I want the evaluation discipline to be visible. A backtest that prints a 30% return is cheap. A pipeline that prints "this doesn't work, and here's why at the parameter level" is not.

The [[projects/ftr-strategy-backtesting|ftr_strategy_backtesting]] research platform uses the same muscle. A run that fails walk-forward gets an overfit flag attached to its ledger entry rather than being quietly dropped. The gate is the product.

## Where this shows up

- [[projects/apes-signal|apes-signal]], published ceiling analysis; negative result archived with its full search trail.
- [[projects/insider-signal-research|InsiderSignalResearch]], written postmortem as the README; 27 experiments and 4 versioned plans preserved.
- [[projects/ftr-strategy-backtesting|ftr_strategy_backtesting]], walk-forward failure flagged in the ledger, not suppressed.
- [[skills/quant-engineering|Quant Engineering]], the stance that makes the pipeline worth more than the strategies inside it.
