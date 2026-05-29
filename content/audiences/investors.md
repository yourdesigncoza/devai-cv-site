---
title: For investors
description: "AI research reads as confident and is often wrong. I build quant and AI research systems where the evidence grade travels with every claim, the downside is ranked first, and the reviewer that checks the thesis is structurally blind to the score it would otherwise defend. Judgement stays human."
tags: [audience, quant, investing, ai]
draft: false
date: 2026-05-29
order: 3
---

The problem with AI research is not that it is wrong. It is that it is confidently wrong, and you cannot tell the confident-and-right part from the confident-and-guessed part by reading it. A model will hand you a clean thesis, a probability, and a price target in the same calm voice whether the evidence is solid or invented. For most uses that is fine. When a position rides on it, you need to see the evidence behind each claim and the downside before the upside, and you need to know the analysis was checked by something that could not quietly grade its own work.

I build research systems for that case. Quant and AI tooling where evidence, testing, and downside analysis are first-class, enforced in code rather than asked for in a prompt. The differentiator is epistemic discipline: every claim carries an evidence grade, the system stops instead of inventing more, negative results get published, and a type-enforced barrier keeps the reviewer from marking its own homework. The model does the reading and the writing. The judgement that decides what to do with it stays human.

## What I build for research

- **Deep-value screening you can inspect.** A deterministic first pass filters the universe on stated rules (how far off the all-time high, solvency, dilution, revenue growth, return on capital, valuation) before any model sees a name. The screen is arithmetic you can read, not a black box you have to trust.
- **Scoring you can read.** The final score is a plain weighted sum of downside, probability, and growth, with an explicit non-linear penalty on downside and a documented friction table by risk type. You can trace any score back to the inputs that produced it.
- **Adversarial, multi-role review.** The analysis is not one model talking to itself. Separate roles do fundamentals, qualitative evidence, synthesis, red-team challenge, and pre-mortem, with the challenge roles running against the thesis rather than for it.
- **Downside-first ordering.** The system is built to state the bear case before the bull case and the worst case before the base case, enforced in code: if the order comes back wrong, it retries. You read the way you would underwrite, not the way a pitch deck flows.
- **Honest performance review, including the failures.** When something breaks, it gets written down by name and fixed in the open. Negative results are part of the record, not edited out of it.

## Why the discipline matters

The hard problem with an LLM reviewer is self-assessment bias. If the same context that contains a score, a probability, and a valuation is handed to the model that is supposed to judge the thesis, it will tend to defend the number it can see. So in the [[case-studies/edenfintech-scanner|EdenFintech scanner]] the reviewer is structurally blind to those numbers. The input it receives is an `EpistemicReviewInput`, a frozen dataclass with an allowlist of fields, and the extractor copies only those fields across. The review function raises a `TypeError` on anything else. The epistemic reviewer cannot see scores, probabilities, or valuations because the type system does not let those fields reach it. That is a barrier in code, not an instruction in a prompt the model can drift past.

The same conviction shows up in two other places. The convergence rule stops the system when genuinely new findings dry up, rather than letting it pad the analysis with plausible filler, because a smaller honest answer beats a longer invented one. And every model call is logged in full: prompt, schema, and response written to `llm-interactions.md`, so any conclusion can be traced back to exactly what the model was asked and what it said. There is an audit trail behind the output, not a vibe.

The proof that this is real and not aspirational is in what gets recorded when it goes wrong. The batch-31 post-mortem names seven production bugs and their fixes, including a regex that read the `0.26` in "interest coverage = 0.26" as a 26 percent probability anchor. That is the kind of failure most systems would quietly absorb. Here it is written down, named, and fixed in the record.

The scanner produces per-ticker research and a weekly watchlist. It does not backtest returns. Strategy backtesting is a separate project, `ftr_strategy_backtesting`, kept apart on purpose so the research system and the return-testing system do not blur into each other.

## Proof

- [[case-studies/edenfintech-scanner|The EdenFintech scanner]]: the full system, with the typed barrier, the multi-role review, the audit trail, and the post-mortems.
- [[decisions/publishing-negative-results|Publishing negative results]]: why the failures stay in the record, and what that costs and buys.
- [[skills/quant-engineering|Quant Engineering]]: the underlying skill, in detail.
- [[method/index|The method]]: how the same epistemic discipline produces research graphs you can trust, with every claim graded and every gap visible.

The free weekly watchlist runs on [edenfintech.com](https://edenfintech.com), so you can read the output before you talk to me.

## [JOHN: your stance, in your voice]

> [!note]
> [JOHN: one short paragraph of genuine conviction here, in your own words. This audience reads stance more closely than any other, so it has to sound like you. Some prompts to draw from, use what is true and cut the rest: what you actually believe about evidence over narrative; why you would rather show the downside first and lose the optimistic reader than bury it; where you think AI genuinely helps in research and where it has no business making the call; what "judgement stays human" means to you in practice. Plain sentences. No slogan, no rule of three. Leave this as a placeholder until you write it.]

## Get in touch

If you want research you can audit rather than research you have to trust, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to understand. You can also read the weekly watchlist at [edenfintech.com](https://edenfintech.com) first.
