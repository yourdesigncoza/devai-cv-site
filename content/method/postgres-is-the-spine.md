---
title: Postgres is the spine
description: "Across very different builds Postgres carries the load that matters: pgvector search for RAG, integrity rules enforced inside the database, and atomic concurrency. Rules belong where the data lives, so the application layer is never the only guardrail."
tags: [method, spoke, postgres, architecture]
draft: false
date: 2026-05-29
order: 17
---

Postgres is the spine of these systems because it does three jobs that the application layer cannot do safely on its own: it stores and searches the vectors that power retrieval, it enforces the integrity rules that keep the data correct, and it serialises concurrent work so two requests cannot corrupt a shared count. A web app, a WordPress plugin, and a paid AI portal look like three unrelated builds. Underneath, the same database is carrying the weight. The rules live where the data lives, which means a buggy request, a half-finished migration, or a second deploy talking to the same tables cannot quietly break an invariant the schema already guards.

This is one of the patterns that runs through [[method/index|the method]]. It is the operational counterpart to the decision I wrote up separately, [[decisions/postgres-alongside-wordpress|why Postgres alongside WordPress, not instead of it]]. That page is the position. This one is the mechanisms, published on purpose, because being able to see how the database holds the line is what makes the design worth trusting.

## Vector search for RAG, done so the spaces match

[[case-studies/jobabroad|JobAbroad]] has a members-only semantic search and an AI coach, both built on retrieval-augmented generation. The retrieval half runs inside Postgres. Content is chunked, embedded, and stored as vectors using the pgvector extension. A query comes in, gets embedded, and the database finds the closest chunks by cosine similarity through a Postgres RPC called `match_pathway_chunks`. The search is a database call, not a separate vector service bolted on the side, so the embeddings and the data they describe sit in one place and stay consistent.

The detail that makes this work is boring and easy to get wrong. The same `gte-small` embedding model is used for both indexing and querying. Indexing runs locally in ONNX; the query path uses the Supabase-hosted version of the same model. If the index were built with one model and queried with another, the two vector spaces would not line up, and cosine similarity would return confident nonsense: results that look ranked but mean nothing. Matching the model on both sides is what keeps "closest vector" the same as "most relevant chunk." Search then runs in two steps, a similarity search to find candidate chunks, then an answer pass that cites them with `[n]` markers, so the model answers from retrieved text rather than from memory.

## Integrity enforced inside the database

[[case-studies/wecoza|WeCoza]] is a full line-of-business application for a SETA-regulated adult-education provider, built on WordPress but with its operational data in Postgres: 44 tables across three schemas (public, crm, wecoza_events). The plugin reaches that data through a singleton PDO wrapper that bypasses `$wpdb` entirely and uses real prepared statements. WordPress owns the admin surface and authentication. Postgres owns the truth.

The rules that protect that truth are in the database, not only in PHP. A CHECK constraint enforces that a learner can have only one in-progress learning programme at a time, so the collision is impossible at the storage layer regardless of which code path tried to create the second one. Trigger functions enforce relationships the application should never be trusted to police alone: `fn_sites_same_client` keeps a site bound to the right client, and tombstone triggers block edits to soft-deleted rows so a record in the recycle bin cannot be quietly modified. The `pgaudit` extension records who ran what SQL. None of these depend on the application remembering to check. They hold even when a request forgets, a migration runs out of order, or a future rewrite swaps WordPress for something else.

That last point is why this matters beyond tidiness. If the integrity rule lives only in the application, then every code path that touches the data has to re-implement it correctly, and a single one that forgets corrupts the row. Putting the rule in the schema means there is one place to get it right and no way to route around it. The application becomes one client of the database among potentially many, instead of the sole gatekeeper standing between users and a table that will believe anything it is told.

## Atomic concurrency, so two requests cannot both win

The third job is the one that bites quietly in production: two requests arriving at the same moment, both reading a counter, both deciding they are under the limit, both writing. [[case-studies/jobabroad|JobAbroad]] rate-limits the AI coach with a Postgres function, `try_increment_agent_message`, that checks and increments in one atomic step and returns an explicit `allowed` boolean in every case. The explicit boolean matters. A naive implementation uses an `INSERT ... ON CONFLICT` upsert and treats "no error" as "you may proceed," which has a silent-success bug at the cap: the row is already at its limit, the upsert does not error, and the request sails through even though it should have been refused. Returning `allowed` from the function forces the caller to read the real answer instead of inferring it from the absence of an exception.

The same discipline shows up in the cron job that sends proactive nudge emails. To claim stale users without two concurrent cron runs grabbing the same rows and double-sending, it selects with `FOR UPDATE SKIP LOCKED`. Each run locks the rows it claims and skips rows another run already holds, so up to fifty users get claimed cleanly per run and nobody gets emailed twice. This is the database doing the hard part of concurrency. The application does not have to invent a distributed lock, because Postgres already has one that is correct.

## Where the rules belong

The thread through all three is the same. Rules belong where the data lives. The application layer cannot be the only guardrail, because there is rarely only one application: there is the web request, the cron job, the migration script, the admin tool, the rewrite you have not built yet. Each is a chance to forget a rule the schema could have enforced once. So the integrity constraint goes in a CHECK or a trigger, the rate limit goes in an atomic function, and the retrieval goes through an indexed vector column rather than a service that can drift out of sync.

None of this means cramming everything into rigid columns. WeCoza uses JSONB where the shape is genuinely variable, schedule data, attendance, class notes, and stays fully relational where reporting needs to join, filter, and aggregate. The judgement is about where each kind of correctness has to hold. Flexible documents where the application owns the shape; relational tables with constraints where the data has to stay true no matter who writes to it.

## Where this shows up

This is the operational pattern behind two of the case studies. Read [[decisions/postgres-alongside-wordpress|why Postgres alongside WordPress, not instead of it]] for the position, and see it running in [[case-studies/wecoza|WeCoza]] and [[case-studies/jobabroad|JobAbroad]]. It sits inside [[method/index|the method]] alongside the other things I build into the systems rather than hope for.

If you have data that has to stay correct under load, or a RAG feature you want grounded in a database rather than a fragile add-on, email me at [info@devai.co.za](mailto:info@devai.co.za) and tell me what you are building.
