---
title: Knowledge portals
description: "A knowledge portal is a members-only research surface that lets buyers and customers answer their own questions, with cited answers grounded in your content. It qualifies leads, handles repeat questions, and takes load off your sales engineers. Here is what I build, with proof from a live paid portal."
tags: [service, ai, rag, knowledge-portal]
draft: false
date: 2026-05-29
order: 2
---

A knowledge portal is a members-only research surface wired into your own content. People search it in plain language and get cited answers, an assistant grounded in what you actually published, and detail that opens up once they sign in. Buyers and customers answer their own questions, leads qualify themselves before they reach a person, and your team stops re-typing the same explanation. It is a research vault built into a product, not a chatbot stuck on the side of a marketing site.

## The problem

Your team answers the same questions over and over. The same "does it do X," the same "is this right for someone like me," the same walk-through your best engineer has given fifty times. Every one of those is a person who could not find the answer themselves, so they had to interrupt someone who could.

Meanwhile the buyers who do not ask just leave. They cannot tell whether your product fits, because the detail that would tell them is buried in a PDF, a sales call, or someone's head. They will not book a call to find out. They self-serve everywhere else and they expect to here too.

The usual fix is to bolt a chatbot onto the site. That is not a system. A generic chatbot does not know your content, invents answers when it does not, and cites nothing, so no one can check it. It adds a thing that talks. It does not add a thing people trust.

## What I build

A members-only portal that turns your content into something people can interrogate and rely on.

- **Members-only access, not a token in a URL.** Sign-in gates the detailed material. Public pages stay public and do the discovery work; the depth sits behind an account. This is account-gated, with the session and a content match deciding what each member can see.
- **Search that answers, with citations.** A reader asks a question in plain language. The portal finds the relevant passages in your content, then writes an answer grounded in those passages with `[n]` citations back to the source. Every claim points at the material it came from, so an answer is checkable, not a guess.
- **Readiness and assessment flows.** A structured wizard that asks the right questions, saves the answers, and scores them against a rubric you control. It tells a visitor where they stand and what to do next, and it tells you which leads are worth a call.
- **An assistant kept on rails.** An AI assistant grounded in your content, with the same guardrails I use everywhere: typed outputs the model has to conform to, and prompt-injection guards that treat anything a user types as untrusted. The assistant can help, but it cannot be talked into going off-script or inventing facts your content does not support.

The search and answer layer is the same pattern running in [[case-studies/jobabroad|JobAbroad]], a live paid portal. The specifics there, read off the code:

- The same `gte-small` embedding model indexes your content and reads each query, so the question and the content live in the same space and the matches are real matches, not near-misses from a model mismatch.
- Search is pgvector cosine similarity in Postgres, called through a database function. The content store and the search engine are the same database.
- It is a two-step flow: search first to find the right passages, then answer using only those passages. The model does not freelance; it works from what the search returned.
- A paid AI coach runs on the same graph, with daily rate limits, rolling access, and a constraint that lets it move a milestone forward but never quietly mark it done.
- Reports generate asynchronously. The payment webhook acknowledges fast, then scoring, the LLM narrative, and the PDF render happen off the response path while the dashboard polls for status.

The research vault behind a portal like this is built with [[method/index|the method]]: an evidence-graded knowledge graph where every claim carries a confirmed, alleged, or rumoured grade. That grading is what makes the cited answers worth trusting, rather than confident text with nothing behind it.

## Proof

**[[case-studies/jobabroad|JobAbroad]]** is the method productised into a paid portal. A research vault wired into a members-only product: semantic search with cited answers, a readiness assessment, async report generation, and a paid AI coach. Built on Next.js and Supabase with pgvector. It is a working business, not a demo.

**[[case-studies/signaltrace|SignalTrace]]** is the method published. Thirteen independent research wikis, 912 markdown files, more than 780 entity pages each carrying an evidence grade, assembled by a custom multi-wiki build. It is the same research discipline, shown in the open.

**[[method/index|The method]]** is the engine behind both: how the research graph grades every claim, surfaces its own blind spots, and stops instead of inventing more. A portal is that graph, made into a product people can use.

This work draws on [[skills/ai-agentic-systems|AI / agentic systems]]: RAG search, typed LLM outputs, prompt-injection defence, and the Postgres plumbing that holds it together.

## Work with me

If your team keeps answering the same questions, and your buyers cannot answer them for themselves, a knowledge portal is the fix. Tell me what people keep asking and where your content lives, and I will tell you what a portal would do for you.

[Email me at info@devai.co.za](mailto:info@devai.co.za), or [see a live demo](https://demo.devai.co.za).
