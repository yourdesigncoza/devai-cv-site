---
title: Is prompt engineering more leveraged than the harness, long-term?
description: "As base models get better at following loose prompts, does the leverage shift back to prompt-craft — or does it stay with the scaffolding around the agent? An open question about where the compounding return lives."
tags: [open-question, ai-tooling, harness, prompting]
draft: false
date: 2026-04-23
---

As base models keep getting better at following short, loose prompts, does the long-term leverage shift back to prompt-craft — or does it stay with the harness around the agent (typed adapters, file-driven planning, adversarial review, test scaffolds)? For code I expect to maintain in a year or three, where's the compounding return?

## The tension

Prompt techniques are getting cheaper — stronger base models need less prompting. Harness work stays expensive to build and to keep current. If model capability keeps climbing fast enough, a lot of scaffolding could look like over-engineering in three years. On the other hand, prompts go stale every time a model changes; typed adapters, file-driven phases, and adversarial review loops don't.

## My current lean

Harness over prompt. The decisions and playbooks already on this site embody that lean:

- [[decisions/llms-behind-typed-adapters|Why I keep LLMs behind typed adapters]] — structural, outlives prompt drift.
- [[playbooks/file-driven-planning|A file-driven planning framework for AI-assisted coding]] — each phase reads and writes a file, crash-resumable.
- [[playbooks/adversarial-ai-review|Adversarial review via a second AI model]] — a second model with different blindspots, priced in as a step.

The bet is that harness pays off more on maintenance than prompt-craft does, because maintenance is when the model, the codebase, and the team have all changed.

## What would change my mind

Experienced practitioners shipping and maintaining long-running agent systems — Karpathy and the small group of people doing this work in public — landing on *"the harness was over-engineering; prompt discipline would have carried it."* If the consensus among that group shifts toward prompt-first for long-lived code, revisit.

## Status

Open. Not holding the lean tightly.
