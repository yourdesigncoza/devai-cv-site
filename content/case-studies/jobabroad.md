---
title: JobAbroad
description: "JobAbroad is a paid, members-only portal for South Africans planning to work overseas. It wraps a research vault in semantic search with cited answers, a readiness assessment, and an AI coach, built on Next.js and Supabase with pgvector."
tags: [case-study, ai, rag, nextjs, supabase]
draft: false
date: 2026-05-29
order: 2
---

JobAbroad is a paid, members-only portal for South Africans planning to work overseas. It takes the same research method behind [[method/index|my living research graphs]] and wires it into a self-service product: a member can search the vault and get an answer with citations, run a readiness assessment, pay R495 for a generated PDF report, and talk to an AI coach that works through a personal journey with them. The research is the asset. The portal is how a reader pays for access to it and acts on it without me in the loop.

## The problem

A research vault answers questions, but only if you know how to read it. Most people planning an overseas move do not want to navigate a knowledge graph. They want a straight answer to their own situation, a clear sense of whether they are ready, and someone to keep them moving. The hard part is turning a body of evidence-graded research into a product that does that for a stranger, on their own, while staying honest about what it does and does not know. A chatbot bolted onto a vector store is easy to demo and hard to trust. The work was in the gates around it.

## The architecture

Next.js 16.2 (App Router, React Server Components), React 19, TypeScript, Tailwind v4, deployed on Vercel. Supabase is the spine: Postgres with pgvector, SSR cookie auth, Storage, and a single Deno edge function. Payments run through Paystack in ZAR. The language models are OpenAI `gpt-4o-mini` for generation and a local `gte-small` embedding model via `@xenova/transformers` for indexing. The codebase is roughly 25,000 lines of TS/TSX across 25 pages, 25 API routes, 9 Postgres tables, 35 components, and 10 Playwright specs.

Access is account-gated, not token-gated. A member signs in, Supabase sets a cookie, and the server checks both the session and a category match before serving member-area content. There is no public token that unlocks a page.

The retrieval is built so the two halves of a RAG system actually agree. The same `gte-small` model embeds the content at index time (locally, in ONNX) and the query at search time (on the Supabase-hosted copy), so both vectors live in the same space and cosine distance means what it should. Search runs through a Postgres RPC, `match_pathway_chunks`, using pgvector cosine similarity. Answering is two steps, not one: first retrieve the relevant chunks, then ask the model to answer only from those chunks and cite them with `[n]` markers. The citation is part of the contract, so a member can see which part of the vault an answer came from.

The AI coach is the most advanced part of the build. It is a paid feature: a member gets 90 days of rolling access, a daily message limit, and a journey made of milestones the coach helps them work through. It runs on the same retrieval as the search, so its advice is grounded in the vault rather than the model's general training. Two constraints keep it safe. Its outputs are structured as JSON validated with Zod, so a malformed or off-shape response is rejected rather than rendered. And it operates under a monotonic constraint on milestone state: the coach can move a milestone to `in_progress`, but it can never mark one `done`. Completion is the member's call, not the model's. The same posture shows up in the admin WhatsApp draft assistant, where user-supplied content is labelled as untrusted in the prompt so an injected instruction is treated as data, not as a command.

Payment to PDF is asynchronous, and the sequencing is where the engineering is. When Paystack calls the webhook, the handler verifies the signature with HMAC-SHA512 using `timingSafeEqual` (a constant-time compare, so a forged signature cannot be guessed byte by byte from timing). It flips the member's tier idempotently, so a webhook delivered twice does not double-charge or double-run. Then it acknowledges in about 100 milliseconds and hands the slow work to `waitUntil()`: scoring, two language-model calls for the narrative, rendering the PDF, and uploading it to Storage all happen after the response has already gone back to Paystack. The member's dashboard polls a status state machine and shows the report the moment it lands. The scoring itself is a JSON rubric, and it runs for one category only, teaching. The other categories of the assessment redirect rather than pretending to produce a score.

Two pieces of concurrency control deserve a mention because they are the kind of thing that works in a demo and fails in production. The daily rate limit on coach messages is enforced in Postgres by `try_increment_agent_message`, which returns a row with an explicit `allowed` boolean in every case. That avoids the common `ON CONFLICT` trap where hitting the cap silently looks like success. And the cron job that sends proactive nudge emails to stale members claims its work with `FOR UPDATE SKIP LOCKED`, taking up to 50 users at a time without two concurrent runs grabbing the same member and sending the email twice.

## What it proves

This is [[method/index|the method]] productised. SignalTrace publishes a research vault as a set of wikis; JobAbroad takes the same kind of vault and turns it into a paid, members-only product with retrieval, scoring, and a coach on top. The two are the same wedge from different angles, so it is worth reading [[case-studies/signaltrace|SignalTrace]] alongside this.

The build is proof of two skills. The retrieval, the cited-answer contract, the coach's structured outputs and monotonic milestone rule, and the prompt-injection handling are [[skills/ai-agentic-systems|AI / agentic systems]] work: language models kept on rails by code, not by hope. The async webhook, the idempotent tier flip, the Postgres rate limiter, and the `SKIP LOCKED` cron are [[skills/python-services-data-pipelines|Python services and data pipelines]] work in a TypeScript surface: the same discipline about concurrency, idempotency, and doing slow work off the response path.

## Work with me

If you have research worth charging for and need it wired into a portal people can use on their own, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you are building. If you want the thinking behind it first, read [[method/index|the method]].
