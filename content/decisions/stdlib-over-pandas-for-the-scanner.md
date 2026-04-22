---
title: Why stdlib over pandas for the scanner core
tags: [decision, python, architecture]
draft: false
date: 2026-04-22
---

# Why stdlib over pandas for the scanner core

## The position

The core pipeline in [[projects/edenfintech-scanner-python|edenfintech-scanner-python]] is stdlib-only. No pandas, no numpy, no requests. Dependencies are pushed to adapter layers at the edge (LLM providers, HTTP fetchers) where they're contained. The `requirements.txt` file is, literally, a one-line comment saying the core has no deps.

## How I got here

Pandas is the default for anything that touches tabular data in Python. It was my default too, on the research-side projects — [[projects/apes-signal|apes-signal]] runs 125k OHLC bars through pandas/NumPy without apology, and I wouldn't rewrite that. The scanner is different.

Two reasons it ended up stdlib-only:

**The scanner is a production pipeline, not a notebook.** Dependencies are a surface for drift. Pandas pins, numpy pins, their transitive trees — every upgrade is a thing that can change how a row is sorted or how a null is counted. In a research context that's a cost I'll pay for the ergonomics. In a scanner whose output gets read and acted on every week, stability beats ergonomics. Stdlib types don't change.

**The scanner's data shape isn't actually tabular.** The pipeline walks candidate tickers through a pipeline of dicts, runs contract-tested screens, composes narrative outputs from structured pieces. Most of the "DataFrame" operations I'd otherwise reach for (filter, map, group, sort) are one-liners in list and dict comprehensions when the dataset is small enough. The scanner's universe is small enough — it's a curated watchlist, not a market-wide scan.

The knock-on effects have been good. The core is grep-able. The transport injection pattern that isolates LLM SDKs works because there are no other heavyweight imports competing for the top of the file. A new reader of the code doesn't need to learn pandas idioms to understand what a given function does. And the TTL cache with crash-safe meta-first writes is a hundred-line pure-Python thing rather than a dependency on some cache library.

This wouldn't scale. If the scanner's universe grew 10×, or if I needed windowed rolling-window calculations over millions of rows, I'd introduce pandas in a controlled place. That hasn't happened yet. Meanwhile the core stays small and reviewable.

## Where this shows up

- [[projects/edenfintech-scanner-python|edenfintech-scanner-python]] — 12k-LOC stdlib-only core; `requirements.txt` is a one-line comment.
- [[projects/ftr-strategy-backtesting|ftr_strategy_backtesting]] — stdlib-only CSV ledger for logged runs, deliberately kept separate from the research stack so it survives deps changing.
- [[skills/python-services-data-pipelines|Python Services & Data Pipelines]] — the broader habit this decision is one example of.
