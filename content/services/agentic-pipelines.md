---
title: Agentic pipelines
description: "An agentic pipeline is a multi-step system where a language model is one replaceable component, wrapped in typed adapters, schema-constrained outputs, audit logs, and review stages. I build them so the model can change without breaking the guarantees around it."
tags: [service, ai, agents, llm]
draft: false
date: 2026-05-29
order: 4
---

An agentic pipeline is a multi-step system that uses a language model to do work, where the model is one replaceable component and not the whole machine. The model reads, writes, and decides. Everything around it is ordinary software: typed adapters at the boundary, schema-constrained outputs, a log of every call, review stages that check the work, and human gates where a person signs off. I build them this way so that when a model gets deprecated or a provider changes its SDK, that is a maintenance task at one wiring point, not a rewrite of the system. The guarantees live in the code around the model, so they hold even when the model underneath changes.

## The problem

A prompt is not a system. A clever prompt in a chat window demos well and then falls apart the first time it meets production. Models drift between versions, so the prompt that worked last month returns different output this month. Providers deprecate models and change their SDKs on their own schedule, not yours. And a single LLM call gives you no record of what it was asked, no way to reject malformed output, and no stage that catches the answer before it reaches a user. The demo works because someone is watching it. The pipeline has to work when no one is.

So the question I start from is not "what is the best prompt." It is: when the model behaves badly, gets swapped, or goes down, what still holds. If the answer is "nothing," it was never a system.

## What I build

I treat the model as a component behind a contract, the same way you would treat any third-party service you do not control.

**A typed adapter layer so the core never imports an SDK.** The pipeline reaches the model through a typed transport passed in at the edge, not a hard-coded SDK call buried in the logic. In the [[case-studies/edenfintech-scanner|EdenFintech scanner]] the core is stdlib-only and providers are reached through a `Callable[[dict], dict]` transport. Swapping providers, or going offline for a test run, changes one wiring point. It does not ripple through the code. I wrote up the reasoning in [[decisions/llms-behind-typed-adapters|why I keep LLMs behind typed adapters]].

**Type-enforced information barriers.** Some stages must not see certain data, and a sentence in the system prompt is not a guarantee. In the scanner, the epistemic reviewer takes its input through `EpistemicReviewInput`, a frozen dataclass that excludes scores, probabilities, and valuations by construction. The reviewer cannot see the scorecard because the type system will not pass it. Prompts drift. A frozen dataclass does not.

**Schema-constrained outputs.** I do not parse free text out of a model and hope. Outputs are constrained to a schema and validated before anything downstream touches them. JobAbroad uses Zod-typed structured outputs; the scanner uses per-stage JSON schemas with `additionalProperties: false` and enums, and rewrites them for strict-mode decoding. Malformed output is caught at the boundary, not three steps later when it has already corrupted something.

**Full LLM audit logs.** Every model call is logged: timestamp, model, the full prompt, the schema it was asked to satisfy, and the full response. The scanner writes all of this to `llm-interactions.md`, elides repeated large blobs by hash, and records cache hits as their own entries. When a result looks wrong, you can read exactly what the model was asked and what it said, instead of guessing.

**Review stages and human gates.** A pipeline can check its own work and still leave the final judgment to a person. The scanner runs validator and pre-mortem roles in parallel and ends with an approve-or-revise judge. Where a value matters, the rule is enforced in code rather than trusted to the model. In JobAbroad the coach can move a milestone to `in_progress` but can never mark it `done`. That monotonic constraint lives in the data layer, so no prompt, and no prompt-injection attempt, can talk the model past it. JobAbroad's admin tools also label user-supplied content as untrusted to guard against injection in the first place.

The pattern is the same every time. The model does the part it is good at. The pipeline keeps the guarantees the model cannot.

> [!note]
> [JOHN: 2-3 sentences of genuine stance here, in your voice. Why you would rather ship a pipeline that is harder to build but survives a model swap than a slick demo that breaks the first time a provider deprecates something. This is the line that makes a reader trust you over someone shipping a thin wrapper. Plain, no slogan.]

## Proof

These mechanisms are running in live work, not slideware.

- [[case-studies/edenfintech-scanner|EdenFintech scanner]]: a multi-role analysis pipeline behind a type-enforced information barrier, with constrained decoding at every stage and a full audit log of every model call.
- [[case-studies/jobabroad|JobAbroad]]: Zod-typed model outputs, prompt-injection guards on user content, and the in-code constraint that lets the coach advance a milestone but never close it.
- [[decisions/llms-behind-typed-adapters|Why I keep LLMs behind typed adapters]]: the position this service comes from, with the adapter and barrier reasoning in full.
- [[method/llms-behind-typed-contracts|LLMs behind typed contracts]]: the mechanism explained on its own, with the same proofs.

## Work with me

If you have a model doing real work and you need the system around it to hold when the model changes, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what the pipeline has to do and where it currently breaks.
