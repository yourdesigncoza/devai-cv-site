---
title: LLMs behind typed contracts, not vibes
description: "Putting an LLM behind a typed contract means the model's inputs and outputs are constrained by code (frozen dataclasses, Zod schemas, SQL sandboxes) rather than by a polite request in a prompt. Here are three real barriers from three codebases, and why types and schemas hold where prompts drift."
tags: [method, spoke, ai, llm, architecture]
draft: false
date: 2026-05-29
order: 15
---

Putting an LLM behind a typed contract means the data going into the model and coming back out is constrained by code, not by instructions in a prompt. A frozen dataclass decides which fields a review stage is even allowed to see. A schema rejects any model output that does not match a declared shape. A sandbox parses generated SQL and refuses anything that is not a read. In each case the rule is enforced by the type system or a validator that runs whether or not the model cooperated, so a forgotten instruction or a clever injection cannot get past it. The prompt asks; the contract enforces.

This is the engineering half of [[method/index|the method]]. The research-graph quality gates are one expression of it, and the deeper architectural stance lives in the decision [[decisions/llms-behind-typed-adapters|Why I keep LLMs behind typed adapters]]. This page is the teachable version: three real barriers from three different codebases, so you can see what "behind a typed contract" looks like in practice.

## Why a prompt is not a contract

A system prompt is a request. You write "only return valid JSON" or "do not look at the score when you judge this," and most of the time the model complies. But "most of the time" is the problem. Prompts drift: you edit one line, a model gets deprecated and the replacement behaves differently, a long context pushes your instruction out of attention. And prompts can be overridden by the input itself, which is the whole basis of prompt injection. If the only thing standing between a model and a bad outcome is a sentence you hoped it would honour, you do not have a guarantee. You have a habit.

Types and schemas do not drift. A field that is not on a frozen dataclass cannot be read by the code that consumes it, full stop. A validator that runs after the model returns rejects malformed output every single time, on every model, regardless of what the prompt said. So I push the rules I actually care about out of the prompt and into the code around the model. Here is what that looks like in three builds.

## Proof one: the scanner's epistemic reviewer is type-blind to the numbers

The [[case-studies/edenfintech-scanner|EdenFintech scanner]] runs a per-ticker research pipeline with multiple LLM roles. One of those roles is an epistemic reviewer whose job is to judge the quality of the reasoning, not to be swayed by how attractive the numbers look. The danger is obvious: if the reviewer can see a high score or a tempting valuation, it will tend to rationalise toward it. So I made it structurally impossible for the reviewer to see them.

The reviewer receives its input through `EpistemicReviewInput`, a `@dataclass(frozen=True)` with an explicit allowlist of fields. A function `extract_epistemic_input()` copies only those allowed fields across; scores, probabilities, valuations, and numeric targets are simply not among them. And `review()` raises a `TypeError` if it is handed the wrong type. The reviewer is provably blind to the scorecard, because the scorecard fields do not exist on the object it is given. I am not asking the model to ignore the numbers. The numbers never reach it. That is the difference between a prompt and a barrier, and it is enforced by Python's type system at the point of the call.

## Proof two: JobAbroad validates LLM output and refuses to trust the user

[[case-studies/jobabroad|JobAbroad]] is a paid, members-only portal with an AI coach and LLM-generated narratives. Two contract mechanisms keep the model from doing damage there.

First, every structured output from the model is validated against a Zod schema before the application uses it. The model is asked to return a particular shape, but the application does not take its word for it: the Zod parse either produces a value of the expected type or it throws. Malformed or surprising output fails at the boundary instead of flowing into the database or the UI.

Second, the coach defends against prompt injection by labelling user-supplied content as untrusted when it is passed to the model, so instructions hidden inside a user's own text are not treated as system commands. And there is a constraint that no amount of clever prompting can talk around: the coach can move a journey milestone to `in_progress`, but it can never mark one `done`. That is a monotonic rule enforced in code. Marking work complete is a human decision, and the model is not given a path to make it, no matter what the conversation says.

## Proof three: WeCoza lets the model write SQL, then refuses to run anything dangerous

[[case-studies/wecoza|WeCoza]] has a natural-language-query feature: a user asks a question in plain English and an LLM turns it into SQL against a 44-table Postgres database. Letting a model generate SQL that runs against a production line-of-business system is exactly the kind of thing that sounds reckless, so the model's output goes through a `SQLSandbox` before it touches the database.

The sandbox allows only `SELECT` and `WITH` statements. It blocks 17 write and DDL keywords (the things that would alter or destroy data) and 13 injection regex patterns, and it caps query length. The check runs twice: once when a query is saved and again immediately before it executes, so a query cannot be edited into something dangerous between save and run. The model is free to be creative inside the read-only box, and the box is enforced by a parser, not by a line in the prompt asking it to please only read. If the model emits a `DELETE`, the sandbox rejects it. The instruction is irrelevant; the validator is what matters.

## The model is one replaceable component

Look at the three barriers together and the pattern is the same. The interesting, fallible work (judging reasoning, writing a narrative, composing a query) is left to the model. The guarantees that must hold (the reviewer cannot see the score, the output matches a shape, the SQL is read-only) are pulled out of the model and pinned down in code that runs regardless of what the model does. The prompt becomes the soft, editable part. The contract is the hard, enforced part.

This is what makes the model swappable. Because the guarantees do not live inside the prompt or the weights, I can change models, change providers, or edit the prompt freely, and the barriers still hold. A new model that ignores an instruction the old one respected does not become a security incident; it hits the same validator and fails the same way. The LLM is one component behind a typed contract, and when it gets deprecated next quarter, replacing it is maintenance rather than a rewrite. The longer architectural argument for working this way is in [[decisions/llms-behind-typed-adapters|Why I keep LLMs behind typed adapters]].

## Where this shows up

This is the engineering discipline behind [[method/index|the method]] and the position laid out in [[decisions/llms-behind-typed-adapters|Why I keep LLMs behind typed adapters]]. You can see it shipped in three places: the type-blind reviewer in the [[case-studies/edenfintech-scanner|EdenFintech scanner]], the Zod-validated, injection-aware coach in [[case-studies/jobabroad|JobAbroad]], and the read-only SQL sandbox in [[case-studies/wecoza|WeCoza]].

If you are putting a model in front of something that matters and want the guarantees in code rather than in a hopeful prompt, email me at [info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to constrain.
