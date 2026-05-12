---
title: Python Services & Data Pipelines
description: "Python services and data pipelines: ingestion, snapshot hashing, CLI tools, structured logging. Engineering across quant and research work."
tags: [skill, python, pipelines]
draft: false
---

> "Linear data flow: data_fetch → zones → backtest → run.py / run_multi.py"
>
> [[projects/ftr-strategy-backtesting|ftr_strategy_backtesting]], `CLAUDE.md`

## What this looks like for me

Python is the connective tissue under most of the work on this site. A lot of the projects are, mechanically, the same shape: pull data from somewhere, clean it, run an analysis over it, persist results somewhere else. The parts I spend time on are the boring ones: snapshot hashing for reproducibility, structured logging, CLI ergonomics with `argparse`, YAML configs with named + scratch + explicit-path resolution, a linear top-to-bottom data flow instead of a framework that hides the call sites.

[[projects/edenfintech-scanner-python|edenfintech-scanner-python]] is the strictest example: a 12k-LOC core that is stdlib-only, LLM SDKs isolated behind transport injection, TTL cache with crash-safe meta-first writes, raw-bundle fingerprint continuity across runs. [[projects/ftr-strategy-backtesting|ftr_strategy_backtesting]] has a similar shape for a much smaller codebase: `data_fetch → zones → backtest`, MD5 hashing of the data snapshot, stdlib-only CSV ledger decoupled from the research stack. [[projects/insider-signal-research|InsiderSignalResearch]] pushes it further into ops: SQLAlchemy engine singleton, `structlog` structured logging, pytest test suite, SEC EDGAR ingestion staged through Postgres.

The lighter-weight projects use the same habits in smaller form. [[projects/apes-signal|apes-signal]] does 125,000 bars of XAU/USD through pandas/NumPy with an in-process evaluator and a JSONL history log. [[projects/yt-ts|yt-ts]] wraps a Gradio UI around a regex pre-filter + LLM call + Google Sheets append.

## Projects that back this

- [[projects/edenfintech-scanner-python|edenfintech-scanner-python]]: 12k-LOC stdlib-only core, transport injection, TTL cache, fingerprint continuity across runs.
- [[projects/insider-signal-research|InsiderSignalResearch]]: SEC EDGAR → Postgres ingestion, SQLAlchemy singleton, `structlog`, pytest.
- [[projects/ftr-strategy-backtesting|ftr_strategy_backtesting]]: linear data flow, MD5-hashed snapshots, YAML config resolution, `argparse` CLI.
- [[projects/apes-signal|apes-signal]]: pandas/NumPy 125k-bar OHLC pipeline with JSONL history log.
- [[projects/yt-ts|yt-ts]]: Gradio UI + OAuth2 Sheets API + LLM extraction pipeline.
- [[projects/wecoza-development|wecoza_development]] (adjacent): Postgres schema + plpgsql triggers + PDO data layer sitting under a WordPress plugin.

## Decisions that shaped how I do it

- [[decisions/stdlib-over-pandas-for-the-scanner|Why stdlib over pandas for the scanner core]]: deps as a drift surface; when the small-dataset tradeoff flips.

## What I'm usually asked to do

- Build a data pipeline from source to sink with reproducibility and observability built in
- Replace an ad-hoc script with a CLI that has sensible subcommands and config files
- Add structured logging, snapshot hashing, or a clean transport layer to an existing Python project
- Review a Python codebase and flag where boundaries are missing between data, logic, and I/O
