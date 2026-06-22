---
title: SA Wills Database
description: "A POPIA-resident estate-planning platform for South Africa: draft a Will and Living Will, register and store them, release them safely on death. Deterministic legal engine, with the LLM kept behind a de-identification boundary."
tags: [project, legaltech, nextjs, nestjs, ai]
draft: false
date: 2026-06-22
status: active
---

> An estate-readiness platform for South Africa. A person drafts a legally structured Will and Living Will through a guided wizard, the documents are version-controlled and stored in an audited registry, and on confirmed death the right documents are released to the right people in the right order. The legal text comes from an approved clause library and deterministic rules, not from a language model.

![SA Wills Database landing page: "Your Will. Your Family. Their Future." over a dark hero, with a "Draft My Will, Free" call to action and the line "Most South Africans die without one."](sa-wills-database-hero.png)

**Stack:** Turborepo monorepo (pnpm). Next.js (App Router) + React web app, NestJS core backend (Drizzle, Auth.js, TOTP MFA), FastAPI AI service (Python), Postgres + pgvector, Gotenberg for PDF, S3 vault. Hosted in AWS af-south-1 (Cape Town) for data residency.
**Status:** Active. Greenfield MVP build, running on an internal review deployment. Not publicly live, not yet legally signed off.
**Source:** private.

## What it is

Most South Africans die without a will. The build goes after the smallest version of fixing that which is still worth shipping: draft a will and a living will, generate the print-ready documents, register and version them, and release them to the right people once a death is verified. Around that loop sit the things that make an estate document trustworthy instead of merely generated: an append-only audit trail, per-tenant row-level isolation, and a registry where an unregistered document counts for nothing.

The backend is organised as a module per problem area, the way the spec is organised: `will`, `living-will`, `legal`, `vault`, `audit`, `rbac`, `rls`, `death`, `dha` (Home Affairs death verification), `retention`, `document`. The MVP generates wills through a deterministic, rules-driven wizard over an approved clause library. The AI service exists in the design and is scaffolded, but AI-guided interviewing is deliberately a later phase, not part of the first shippable slice.

## Why this approach

POPIA is strict about residency: personal data, and the processing of it, has to stay inside South Africa. That quietly rules out most of the convenient managed back-ends, since none of them host in af-south-1, so this runs on plain managed AWS in Cape Town instead.

The legal side is where the design pressure actually comes from. A will is either valid or it is not, and that is not a call you hand to a language model. So the Wills Act checks and the estate-duty and CGT math are ordinary auditable code in the NestJS core. If a model invented a clause or quietly dropped a residual beneficiary, the result is a defective legal document, not a bad autocomplete you can wave away. The model never writes legal text. It gathers facts and proposes clauses from an approved library, and the deterministic rules decide what lands in the document.

The privacy boundary falls straight out of the residency rule. The commercial models worth using all run in the US, which is the one place the data is not allowed to go. So the Python AI service is the only component that can reach an outside model, and it strips the personal data out (tokenizes it) before a request leaves the country, then rehydrates the result back home. The network boundary and the privacy boundary end up being the same wall. Same habit as [[decisions/llms-behind-typed-adapters|keeping LLMs behind typed adapters]], with a regulator as the reason instead of a flaky SDK.

## What will break

Known and on a list, not hidden:

- The polyglot seam. A TypeScript NestJS core and a Python FastAPI service share a contract through generated OpenAPI types. Two runtimes mean two dependency and security surfaces and a contract that has to be versioned, or the types drift.
- Death activation is a hand-rolled state machine on pg-boss (Postgres-backed jobs). Once the human-in-the-loop steps harden (four-eyes sign-off, cooling-off timers, real Home Affairs verification), that wants Temporal. Today the DHA verification is a stub on the review box.
- The whole thing is pre-production. An adversarial review of the spec produced DO-NOT-SHIP findings mapped to the phases they gate. It is not legally signed off, and the master vision (advisor portals, enterprise tenancy, estate-risk intelligence) is a much bigger thing than what exists today.
- The one that actually matters is the deterministic/AI boundary itself. If model output ever leaked into legal text, or personal data crossed the egress line without being tokenized, the two rules the whole design rests on would be broken. Both are enforced in code, and both need tests that treat them as invariants rather than nice-to-haves.

## What I learned

<!-- TODO(John): your voice. The genuine reflection from building this. Possible threads: what it's like building to a strict legal spec vs a product you can iterate freely; the deterministic-vs-AI split as a forcing function; POPIA residency as an architecture constraint rather than a checkbox; pace of a greenfield rebuild. Leave as-is until John writes it. -->

## Proof points

- Turborepo monorepo, around 57,000 lines of TypeScript and Python across the web app, NestJS core, FastAPI AI service, and a shared contracts package.
- Core backend split into modules per spec area: `will`, `living-will`, `legal`, `vault`, `audit`, `rbac`, `rls`, `death`, `dha`, `retention`, `document`, and more.
- Postgres with row-level security for tenant isolation and append-only, hash-chained audit tables; full will-version history.
- Deterministic legal validation and estate-duty / CGT calculation as auditable code, separate from the AI service.
- AI privacy boundary: the FastAPI service is the sole egress to external LLMs and tokenizes PII (Presidio plus custom SA recognizers) before anything leaves the country.
- Documents assembled from a structured, versioned clause library to HTML, then to PDF via Gotenberg, with every generated PDF hashed into the audit log.
- POPIA-aligned: all data and processing in AWS af-south-1, with KMS envelope encryption on the document vault.

## What this proves

- [[skills/ai-agentic-systems|AI / Agentic Systems]]: a language model kept behind a service boundary in a regulated domain, where deterministic rules own the legally binding output and the model only gathers facts and proposes clauses from a vetted library.
- [[skills/python-services-data-pipelines|Python Services & Data Pipelines]]: the FastAPI de-identification and model-gateway service, the privacy-as-network-boundary design, and the OpenAPI-typed seam to the TypeScript core.
