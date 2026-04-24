---
title: Cover letter
description: "Cover letter from John Montgomery — freelance developer available for quant research, LLM / agent, and custom WordPress projects. 22 years in, remote-first."
tags: [about]
draft: false
date: 2026-04-22
---

**John Montgomery** · YourDesign · Mossel Bay, South Africa
support@edenfintech.com · +27 079 177 1970

---

I've been writing code for money since the early 2000s. The first thing I built was a set of trading "bots" for a trading company, which feels relevant again now — 22 years of programming later, the current work is a screening and AI-review pipeline for US-listed equities, productised as [Eden Fintech](https://edenfintech.com/). The long middle of that arc was 20+ years of WordPress, WooCommerce, and custom PHP — solo freelance work under the YourDesign name, plus agency sub-contracts including the Woolworths Mother's Day campaign (via Flume) and the Nimue Skin Technology brand build.

What I bring to a project is the habit of treating the scaffolding as the asset. On the quant research platforms, that means confidence-adjusted metrics, walk-forward as a gate rather than a chart, MD5-hashed data snapshots, and a linear pipeline you can read top-to-bottom. On the AI side, LLM calls sit behind a typed adapter, the reviewer role is blocked from seeing scores at the dataclass level, every call is logged with content-hash dedup — the model is one replaceable piece, not the centre of gravity. On the WordPress side, I'll put operational data in a proper Postgres schema and enforce invariants in plpgsql triggers rather than re-implementing them in PHP that can be uninstalled.

The other thing worth saying upfront: when a research project runs its course and the answer is "there isn't enough edge", I write the postmortem in the repo. [[projects/apes-signal|apes-signal]] and [[projects/insider-signal-research|InsiderSignalResearch]] are both shelved research projects with written conclusions. I'd rather publish a shelving than pretend. That stance turns up on the [[decisions/publishing-negative-results|decisions page]] if you want the longer version.

**What I'm most useful for right now:**

- Building or rescuing a quant research platform — ingestion, snapshot hashing, YAML configs, CLI, structured logging, walk-forward as a gate.
- Retrofitting an existing LLM call with typed contracts, provider-agnostic adapters, and logging.
- Long-running custom WordPress / WooCommerce work, especially if the schema needs to outgrow `$wpdb`.
- Obsidian-to-Quartz knowledge graphs for research topics or case-study work — the [[projects/signaltrace-site|signaltrace-site]] pattern.

**How I work:** solo or lead on small teams; remote, UTC+2; a bias toward linear code and fewer dependencies; a preference for shipping with honest postmortems when honest postmortems are the right answer.

Happy to start with a short call. Contact details above.

— John
