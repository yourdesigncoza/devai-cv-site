---
title: Quant platforms
description: "A quant research platform turns evidence, screening, and downside analysis into something you can audit. I build deterministic screens, scoring you can read as plain arithmetic, and LLM analysis kept behind a type-enforced barrier, with a full audit trail of every model call. The judgement stays human. The system makes the evidence and the downside legible."
tags: [service, quant, ai, python]
draft: false
date: 2026-05-29
order: 3
---

A quant research platform is a system that screens a universe of investments, scores what survives, and writes up the case for and against each one, with the evidence and the downside on the record. What makes it trustworthy is not the model at the centre. It is the discipline around it: deterministic rules you can re-run and check, a scoring formula simple enough to read as arithmetic, an audit trail of every model call, and an honesty about negative results. A platform like this does not tell you what to buy. It makes the reasoning legible enough that a human can decide.

## The problem

Most AI research reads well and is often wrong. Ask a model to evaluate a stock and it will hand you a fluent thesis with a confident probability attached, and you have no way to tell where the number came from. There is no audit trail, so you cannot reconstruct what the model was told or what it ignored. The downside case is usually thin, because an optimistic narrative is easier to generate than an honest worst case. And the model has a habit of defaulting to a comfortable answer, anchoring on a round 60 percent when it has nothing real to say. None of that is malicious. It is what you get when the reasoning lives inside a prompt instead of inside a system you can inspect.

## What I build

I build the system around the model so the evidence and the downside are legible, and the judgement stays yours. The proof is the [[case-studies/edenfintech-scanner|EdenFintech scanner]]: a per-ticker research pipeline whose deterministic core has zero third-party runtime dependencies, with 152 tests covering the parts that have to behave the same way every time.

**Deterministic screens.** Before any model sees a ticker, a two-step screen runs in plain Python: is the company well off its all-time high, understandable, not in secular decline, and capable of doubling, then a second pass on solvency, dilution, revenue growth, return on capital, and valuation. These are rules, not opinions. They run the same way every time, and you can read them and disagree with them.

**Scoring you can read as plain arithmetic.** The final score is one line you can check by hand:

```
score = (100 - adjusted_downside) * 0.45 + probability * 0.40 + min(cagr, 100) * 0.15
```

Downside carries the most weight, on purpose. There is a non-linear penalty on bad downside and a friction table by risk type, but the shape of the decision is right there in the open. Nothing about the score is a black box.

**LLM analysis behind a type-enforced barrier.** The model layer does the qualitative reading, but it is walled off from information that would bias it. The epistemic reviewer, the role that judges how good the evidence is, must never see the scores, probabilities, or valuations, because a model that can see the answer tends to rationalise it. That barrier is enforced by the type system, not by a polite instruction in a prompt. `EpistemicReviewInput` is a frozen dataclass with an allowlist of fields, a function copies only those fields across, and the review step raises a `TypeError` if it is handed anything else. The reviewer is provably blind to the numbers.

The pipeline runs roughly eight named roles, not three: analysts for fundamentals, qualitative evidence, and synthesis; red-team and pre-mortem validators that run in parallel; the epistemic reviewer; and hardening roles on top. Each one is constrained to a strict JSON schema, so the model fills in a structured form rather than writing free prose.

**A full audit trail of every model call.** Every call the system makes to a model is logged to `llm-interactions.md`: timestamp, model, the full prompt, the schema it had to satisfy, and the full response. Repeated large blobs are elided by hash so the log stays readable, and cache hits are logged too, so the record is complete. Months later you can open that file and reconstruct exactly what the system was told and what it said back. That is the difference between a result you trust on faith and one you can audit.

**Hardening gates that catch the model defaulting to a comfortable number.** A probability-anchoring detector catches the model reaching for a round 60 percent when it has no real basis for it. An evidence-quality scorer grades the inputs. A thesis-break detector overrides the narrative with deterministic data from the fundamentals feed when the two disagree. And a high-growth claim has to pass a three-agent unanimous panel before it is allowed through. These gates exist because the failure modes are known, and catching a known failure mode is cheaper in code than in a prompt.

Return backtesting is a related capability, but it is a separate project, [[projects/ftr-strategy-backtesting|FTR strategy backtesting]], not part of the scanner. I keep them apart on purpose: a screening-and-scoring platform and a strategy backtester answer different questions, and merging them would blur both.

## Proof

The [[case-studies/edenfintech-scanner|EdenFintech scanner]] is the worked example for everything above, with the real numbers and mechanisms. The weekly watchlist it produces runs on [edenfintech.com](https://edenfintech.com).

Publishing negative results is part of the discipline, not an afterthought. When a screen rejects a company or a thesis breaks, that is a finding worth keeping. I write up why in [[decisions/publishing-negative-results|publishing negative results]].

The underlying engineering practice is on the [[skills/quant-engineering|quant engineering]] page.

[JOHN: optional one short paragraph of genuine conviction here, in your voice. Why you would rather show a model defaulting to a comfortable number and catch it than ship a confident wrong answer. The line that makes an investor or technical reader trust the discipline over a slicker pitch. Plain, no slogan.]

## Work with me

If you are building research where the evidence and the downside have to hold up, and where a confident wrong answer is worse than an honest "we don't know yet", that is the kind of system I build. [Email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to evaluate.
