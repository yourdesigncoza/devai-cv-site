---
title: yt-ts
description: "Gradio tool converting trading transcripts to structured Google Sheets rows via regex pre-filter and provider-agnostic LLM. Archived personal tool."
tags: [project, python, ai]
draft: false
status: archived
---

> A single-page Gradio tool that converts pasted trading-session transcripts into structured trade rows appended to Google Sheets.

**Stack:** Python, Gradio UI, OpenAI SDK (used against DeepSeek and OpenAI endpoints), `gspread` for Sheets, regex pre-filter, YAML system prompt.
**Status:** Archived experiment. Last activity February 2025.
**Source:** private.

## The story

Despite the directory name, `yt_ts`, as in YouTube transcripts, there's no YouTube fetcher in the repo ( YouTube blocker issues ). Transcripts get pasted into a Gradio textbox by hand. The interesting part is what happens after.

The pipeline is: a 21-pattern regex pre-filter narrows the transcript to trade-mention windows (±1 line of context around each match), the narrowed text goes to an LLM with a YAML-defined system prompt and a few-shot example, the LLM returns a pipe-table, a defensive parser turns that into rows, and `gspread` appends the rows to `Sheet1`. The system prompt lives as YAML rather than embedded in Python so it can be edited without touching code.

The provider is abstracted cleanly. `app-bu-03-a.py` calls DeepSeek's `deepseek-reasoner` via the OpenAI SDK by changing `base_url`; `app.py` points the same SDK at OpenAI's `gpt-4o-mini`. Temperature is pinned at zero. Iterating on the model was a matter of swapping the URL, not the code.

The honest framing: this was a personal tool, not a product. It isn't a git repo, versioning is `app-bu-*.py` file copies. There's no README or CLAUDE.md; design decisions are deduced from the code itself. Not every revision is working, `app-bu-02.py` has a bug where `headers, rows = ''` overwrites the API result right after the call. The current "production" entry point is ambiguous: `app.py` is newest and narrower (outcome-string only), while `app-bu-03-a.py` produces a richer structured table. I think I was A/B-ing two different sheet schemas and didn't settle.

It's on the CV because the pattern, provider-agnostic OpenAI-SDK calls, external YAML prompts, regex pre-filter before LLM, pipe-table as the I/O contract, defensive parser, is how I still reach for LLM-structured-extraction problems when they come up.

## Architecture in one breath

Gradio textbox → 21-pattern regex pre-filter (±1 line context) → OpenAI-SDK call (DeepSeek or OpenAI, selected by `base_url`) → YAML system prompt + few-shot → pipe-table parser → `gspread` append to Sheet1.

## Proof points

- 21 regex patterns in the pre-filter.
- Two LLM providers reached through one SDK (DeepSeek `deepseek-reasoner`, OpenAI `gpt-4o-mini`).
- YAML-externalised system prompt with few-shot example.
- Pipe-table I/O contract with defensive parser.
- Six `app*.py` revisions trace the iteration (file-copy versioning, not git).
- Last activity February 2025 per file mtimes.

## What this proves

- [[skills/python-services-data-pipelines|Python Services & Data Pipelines]], end-to-end text-in → structured-rows → Sheets pipeline, regex preprocessing, OAuth2 Sheets API, Gradio UI wiring.
- [[skills/ai-agentic-systems|AI / Agentic Systems]], provider-agnostic LLM client, YAML-prompt contract, pipe-table I/O with defensive parsing, deterministic outputs via `temperature=0`.

## Decisions worth a deeper read

- [[decisions/llms-behind-typed-adapters|Why I keep LLMs behind typed adapters]]
