---
title: For agencies
description: "When a client buys AI and your team does not yet have the depth to build it properly, I come in behind the scenes. I build the prototype for the pitch, build the real system, or rescue a half-built AI project, and I leave your team a harness they can maintain."
tags: [audience, agencies, ai, white-label]
draft: false
date: 2026-05-29
order: 2
---

Your client wants AI. The deadline is real, the budget is approved, and the brief says "intelligent search" or "an assistant that knows our content" or "automate this review." Your team can build the website, the brand, the integration. The depth to make the AI part actually work, typed contracts so the model cannot return garbage, evidence grading so answers are not confidently wrong, a database that holds up under load, is not on the team yet. That gap is where projects slip, demos break, and a confident pitch turns into a stalled build. I am the developer agencies bring in to close it.

I work behind the scenes. The client sees your agency. I build the AI system, hand your team the parts they need to own, and stay out of the relationship you have spent years earning.

## How I work with agencies

There are three ways I come in, depending on where you and your client are.

**Build a prototype for the pitch.** You are pitching an AI feature and you need something real to show, not slides. I build a working prototype that does the thing for real on the client's actual content or data, so the demo holds up to questions. If you win the work, the prototype is a head start, not throwaway code.

**Build the real system.** You have won the work and the AI piece needs to be built properly. I build it: the research graph, the RAG portal, the typed agent pipeline, the Postgres schema underneath. You handle the front end, the brand, and the client. I deliver a system that does what the brief promised and does not fall over the first time a real user pushes on it.

**Rescue a half-built AI project.** A build is stuck. The chatbot hallucinates, the search returns nonsense, the pipeline works in the demo and breaks in production, or whoever started it has left. I come in, find out what is actually wrong, and either fix it or tell you straight what it will take. I have done the forensic version of this on production systems, joining audit logs and database traces to find what broke and when.

In all three modes the work can be white-label. The client sees your agency. And I do not leave you with a black box. I leave a harness your team can maintain: typed boundaries, logging, fallbacks, and the documentation to understand what runs where. The point is that the AI part keeps working after I step back, without me being the only person who understands it.

## Where I add depth

The phrase on the brief is usually vague. "Add AI." "A chatbot for our docs." "Make it intelligent." My job is to turn that into an architecture that survives contact with real users:

- **Research graphs.** A navigable, evidence-graded knowledge graph built from a topic and a set of sources, where every claim is marked confirmed, alleged, or rumoured. This is [[method/index|the method]] behind SignalTrace and JobAbroad. When a client wants "research" or "intelligence," this is what that should actually mean.
- **RAG knowledge portals.** Semantic search over a client's content that returns cited answers, not made-up ones. The same embedding model for indexing and query so the results match, pgvector search in Postgres, and a two-step search-then-answer so the model only speaks from retrieved evidence.
- **Typed agent pipelines.** Multi-step LLM systems where the model runs behind type-enforced contracts, not hopeful prompts. Structured JSON outputs validated against a schema, prompt-injection guards on anything user-facing, and constraints in code that the model cannot talk its way around.
- **Postgres-backed platforms.** The database as the spine: real prepared statements, business rules enforced with constraints and triggers, atomic concurrency so two requests cannot corrupt the same row, and audit trails as a first-class feature rather than an afterthought.

A "chatbot idea" becomes a system with boundaries you can point to and explain. That is the difference between an AI feature that demos well and one that a client can run for years.

## Proof

- [[case-studies/jobabroad|JobAbroad]]: a research vault wired into a paid, members-only portal. RAG search with cited answers, readiness scoring, an AI coach, Paystack billing with idempotent webhooks. A working business, not a demo.
- [[case-studies/edenfintech-scanner|the scanner]]: an LLM analysis pipeline behind a genuinely type-enforced information barrier, with a full audit trail of every model call and hardening gates that catch the model's bad habits. This is what "typed agent pipeline" looks like in production.
- [[method/index|the method]]: how I build research graphs that grade their own evidence, find their own blind spots, and stop instead of inventing more. The thinking behind the work, with the real algorithms shown.
- [[services/ai-for-agencies|AI for agencies]]: the service page, with the three modes and what each one delivers.

## [JOHN: short stance paragraph in your voice]

[JOHN: 3-5 plain sentences on how you partner with agencies. Suggested substance to put in your own words: you are happy to stay invisible and let the agency own the client relationship; you would rather tell an agency early that a brief is unrealistic than ship something that breaks after handover; what you will do (build it properly, leave a maintainable harness, train the team) and what you will not do (pretend a stuck project is fine, lock them into needing you forever, slap a thin chatbot on top and call it AI). Keep it calm and specific. No slogan.]

## Talk to me

If a client has bought AI and you need the depth to build it properly, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me where the project is: pitching, building, or stuck. I will tell you honestly what it would take.
