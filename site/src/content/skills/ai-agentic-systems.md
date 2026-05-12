---
title: AI / Agentic Systems
description: "AI and agent systems, LLM calls behind typed adapters, contract-governed review stages, reproducible pipelines. John Montgomery's AI-engineering approach."
tags: [skill, ai, agents, llm]
draft: false
---

> "This dataclass enforces the information barrier specified in the epistemic_review contract. It EXCLUDES: scores, decision_score, total_score; probabilities, base_probability_pct, effective_probability; valuations, target_price, floor_price, base_case, worst_case; numeric targets, cagr_pct, downside_pct."
>
> [[projects/edenfintech-scanner-python|edenfintech-scanner-python]], `epistemic_reviewer.py`

## What this looks like for me

Most of my LLM work has gone into making model output trustworthy enough to act on, not the models themselves, and not the prompting craft in isolation. What that usually means in practice: isolating the LLM behind a typed interface, writing contracts that the model has to honour, building a second-opinion review stage that is structurally forbidden from seeing certain information, and logging every call so a later run can be reconstructed.

The [[projects/edenfintech-scanner-python|scanner]] is the longest-running example. Its agent graph has three roles (analyst, validator, epistemic reviewer) connected through frozen dataclasses that enforce an information barrier at the type level, not by prompting. There is a probability-anchoring detector, a bias-check stage, and a three-agent unanimous exception panel for cases where the deterministic screen and the scored view disagree. The LLM sits inside an adapter layer behind a `Callable[[dict], dict]` transport, so the core pipeline is stdlib-only.

Other pieces of the same instinct show up in smaller projects. [[projects/yt-ts|yt-ts]] swaps between DeepSeek and OpenAI through the same OpenAI SDK by changing a `base_url`, driven by an external YAML system prompt with few-shot examples and a pipe-table I/O contract. [[projects/insider-signal-research|InsiderSignalResearch]] built a research-sprint framework where each agent role has explicit data-discipline rules baked into its prompt. [devai.co.za](https://devai.co.za/) is where earlier experiments (an NL-to-SQL Gradio app, an AI stock analyst, custom GPTs) sit in public view.

## Projects that back this

- [[projects/edenfintech-scanner-python|edenfintech-scanner-python]]: three-role agent graph with code-enforced information barriers and constrained decoding.
- [[projects/yt-ts|yt-ts]]: provider-agnostic LLM client for structured extraction; regex pre-filter, YAML-prompt contract, pipe-table parser.
- [[projects/insider-signal-research|InsiderSignalResearch]]: research-sprint framework of specialised agent roles with enforced data-discipline rules.
- [devai.co.za](https://devai.co.za/): archive of earlier AI side-projects (InvestAI analyst platform, NL-to-SQL app, YouTube summariser, custom GPTs). Inspirations credited: CrewAI, Fabric, PraisonAI.

## Decisions that shaped how I do it

- [[decisions/llms-behind-typed-adapters|Why I keep LLMs behind typed adapters]]: code-level contracts over prompt discipline; transport injection; external prompts.

## Playbooks I use here

- [[playbooks/file-driven-planning|A file-driven planning framework for AI-assisted coding]]: each phase reads and writes a file; mixed-model workflow (Opus → Gemini → Sonnet); crash-resumable.
- [[playbooks/adversarial-ai-review|Adversarial review via a second AI model]]: piping work to a different-vendor model for a critical pass; the findings I'd have missed come from a reader who isn't invested in the design choice.

## Open questions I'm holding

- [[open-questions/harness-vs-prompt-engineering|Is prompt engineering more leveraged than the harness, long-term?]]: as base models get better at following loose prompts, does the compounding return shift back to prompt-craft or stay with typed adapters, file-driven planning, and review loops?

## What I'm usually asked to do

- Design an agent workflow that won't quietly drift when the model changes
- Retrofit an existing LLM call with proper logging, dedup, and reproducibility
- Write a system prompt + structured-output contract so downstream code can rely on it
- Wire a multi-role review stage onto an analysis pipeline without leaking context between roles
