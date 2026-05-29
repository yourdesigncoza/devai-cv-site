---
title: Why AI projects die after the demo
description: "AI projects die after the demo because a demo only has to work once, on a clean path, in front of an audience. Production has to keep working while payments retry, jobs run twice, and the model returns something unexpected. The gap between the two is logging, idempotency, review stages, fallbacks, and audit trails, and that gap is where most AI projects fail."
tags: [method, spoke, ai, engineering]
draft: false
date: 2026-05-29
order: 16
---

AI projects die after the demo because a demo only has to work once. It runs on a clean input, on a good connection, with someone narrating it, and when the model returns the right answer the room claps and everyone agrees to ship it. Then it meets production, where the same call gets retried because a network blipped, where two background jobs run at the same time, where a user pastes in something the prompt never anticipated, and where the model occasionally returns valid-looking nonsense. A demo proves the happy path exists. A system you can operate has to survive everything that is not the happy path, and that is logging, idempotency, review stages, fallbacks, and audit trails. None of those show up in a demo, all of them decide whether the thing lives, and building them is the actual work.

## You cannot operate what you cannot see

The first thing a demo hides is that you have no idea what the model actually did. It returned a good answer this time. Why? What prompt did it see, which model version, what did it send back before your code parsed it into something tidy? When it goes wrong in production, "the AI gave a weird result" is not a bug report you can act on. You need the receipt.

So in the [[case-studies/edenfintech-scanner|EdenFintech scanner]], every LLM call goes through a wrapper (`wrap_transport()`) that logs to a file (`llm-interactions.md`) before the result reaches the rest of the pipeline. Each entry records the timestamp, the model, the full prompt, the schema the call was constrained to, and the full response. A `LlmInteractionLog` holds the trail for the run. Cache hits are written as their own `[CACHE HIT]` entries instead of vanishing, so a reused answer is still visible in the record. Large repeated blobs are elided by MD5 hash rather than dumped in full every time, so the log stays readable without losing the fact that the blob was there.

The point is reconstruction. When a result looks wrong weeks later, I can open the log and see exactly what the model saw and exactly what it said, not a guess. A demo never needs this because nothing in a demo is ever questioned after the fact. A system that makes decisions does, and bolting it on afterwards means the run you most want to inspect is the one you did not log.

## Retries are normal, double-charging is not

The second thing a demo hides is that the network retries. Payment providers resend webhooks. Cron jobs overlap. Your own code reruns after a timeout. In a demo each action happens exactly once, so it never occurs to anyone that "process this payment" might arrive twice for the same payment. In production it will, and if the handler is naive the customer gets charged twice or gets two of whatever the first call generated.

[[case-studies/jobabroad|JobAbroad]] handles its paid tier as a state machine built to be hit more than once. The payment webhook verifies the signature first (HMAC-SHA512, compared with `timingSafeEqual` so the check itself does not leak timing), then flips the user's tier idempotently: if the tier is already set, a repeat call changes nothing. Only after that fast, safe acknowledgement does the slow work run, the readiness scoring, two LLM calls, the PDF render, and the upload, kicked off with `waitUntil()` after the roughly 100ms ack so the provider is not left waiting on a long job. Meanwhile the dashboard polls a status field that walks through its own states. A retried webhook lands on a tier that is already flipped and a job that is already tracked, so it does not double-charge and does not double-generate. The retry is expected, and the design absorbs it instead of breaking on it.

## Two things running at once

Closely related, and just as invisible in a demo: concurrency. One person clicking through a flow never collides with anything. A live system has many of them, plus scheduled jobs firing on their own clock, and the moments where two of those touch the same row are where the quiet bugs live.

Two examples from JobAbroad. The coach's per-user message limit is enforced by a Postgres function (`try_increment_agent_message`) that returns an explicit `allowed` boolean in every case. The alternative is a naive check-then-increment that, right at the cap, silently succeeds when it should have refused, because the insert-or-conflict path returns no clear answer. A definite yes or no closes that gap. Separately, the cron job that nudges stale users claims its batch with `FOR UPDATE SKIP LOCKED`, so two overlapping runs take different rows instead of both grabbing the same users and sending the same email twice. In a demo neither path is ever exercised. In production both run constantly, and an explicit answer beats a hopeful one.

## Stages that can say no, and a way to fall back

The last thing a demo skips is the chance to reject the model's output. In a demo the answer is accepted because it looks right. A system that acts on the answer needs stages that can refuse it and a defined behaviour when they do.

The scanner runs the model's output through gates before anything downstream trusts it. There are validators and hardening checks: a detector that catches the model anchoring on a default probability, an evidence-quality scorer, a thesis-break check with deterministic data overrides, and an approve-or-revise judge at the end. The schemas constraining each call are strict, with `additionalProperties:false` and enums, so a malformed response is caught at the boundary rather than flowing on as if it were fine. A demo has no stage that says no, because the one demoed answer was always going to be yes. A production pipeline assumes some answers are bad and builds the place to catch them.

## A demo proves the happy path, production is everything else

Put together, that is the gap. A demo is one clean run with a narrator. Production is retries, overlaps, malformed inputs, and a model that is right most of the time but not all of the time, running unattended while you sleep. Closing that gap is logging you can reconstruct from, idempotent handlers that survive being called twice, atomic operations that survive being called at the same time, review stages that can reject an answer, and audit trails that let you explain a result after the fact. That work is most of the build, and it is invisible in the room where the demo happens, which is exactly why the projects that stop at the demo are the ones that die.

This is the difference between prompt engineering and AI engineering. Prompt engineering gets the demo. AI engineering is the harness around the model that keeps it honest and operable once it is live, the same posture that runs through [[method/index|the method]] I build research graphs with. The model does the clever part. The system decides whether you can run it on a Tuesday afternoon when something goes wrong and a customer is waiting.

[JOHN: one or two sentences of conviction here if you want it. The moment you watched an impressive demo and knew it would never survive contact with production, or the time you shipped one of these guards and it caught something real. Your voice, not mine. Leave blank and the page stands on the mechanisms.]

## Where this shows up

The audit-trail mechanism is in [[case-studies/edenfintech-scanner|the EdenFintech scanner]], alongside the validators and hardening gates. The idempotent webhook, the status state machine, and the atomic concurrency functions are in [[case-studies/jobabroad|JobAbroad]]. Both sit under [[method/index|the method]]: build the system around the model, not only the prompt.

If you have an AI prototype that demos well and you are trying to work out what it takes to run it for real, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you have built so far.
