---
title: jobabroad.co.za
description: "South African work-abroad lead-gen site. Next.js 16 landing page, manual WhatsApp sales loop, Supabase token-gated member area with category guides, CV upload, and semantic search."
tags: [project, nextjs, supabase, product]
draft: false
date: 2026-05-06
status: active
---

> A South African work-abroad lead-generation site. Landing page captures interest by category, sales happen manually over WhatsApp, paid members get a token-gated guide for their pathway (healthcare, teaching, seasonal so far) plus a CV upload and semantic search across the corpus.

![jobabroad.co.za landing hero: "Your next job is overseas"](jobabroad-hero.png)

**Stack:** Next.js 16.2 (App Router) + React 19, Tailwind v4, Supabase (auth-less token routing + storage), Vercel hosting, Playwright for regression, Xenova transformers for the semantic-search index.
**Status:** Active. Three pathway guides shipped; assessment flow live; semantic search live.
**Live:** [jobabroad.co.za](https://jobabroad.co.za/)

## What it is

A two-surface site. The public surface is a single landing page with a category grid (healthcare, teaching, seasonal, IT, engineering, accounting, farming, hospitality, trades). Each tile builds a pre-filled WhatsApp link with UTM tracking via `?src=`. The private surface is `/members/[token]`, a Supabase-token-gated route that serves the matching pathway guide, a CV template download, a CV upload to Supabase Storage, and an eligibility assessment per category.

The sales loop is deliberately manual. WhatsApp conversation, PayShap R199 Request to Pay, then I open `/admin`, generate a unique member token, and send the link. No checkout, no auth, no accounts. Token in the URL is the entire access mechanism.

The pathway guides are the substance. Each guide is six sections (Destinations, Documents, Costs, Visa Routes, Scam Red Flags, Legitimate Contacts), researched from primary sources, Gemini-reviewed for fact-checks, written long-form. They are not LLM-generated copy. Each section was built from a separate Obsidian research vault (e.g. nursing has six vaults, 224 notes, 3,120 graph nodes between them) before any prose was written.

## Why this approach

Three deliberate choices.

**Manual sales over checkout.** The market is South Africans considering emigration for work, often nervous, often vulnerable to scam recruiters. A WhatsApp conversation before payment filters tyre-kickers and lets me answer real questions. R199 is intentionally low; the value is the guide, not the fee. Stripe / PayFast adds fragility and chargeback exposure I do not want. PayShap is instant, irreversible enough, and South Africans already use it.

**Token URL over user accounts.** No login means no lost-password flow, no email-verification flow, no GDPR-style account-deletion flow. The trade-off is one missing token = one unhappy member, mitigated by storing tokens against the WhatsApp number so I can re-issue.

**Quartz-style content discipline, but on Next.js.** Pathway content lives in `content/pathways/<category>.md`, parsed with `marked`, sanitised with `sanitize-html`, rendered to HTML at request time, with TOC extracted from h2 headings. The reason for Next over Quartz here is that the member area needs Supabase storage (CV upload), the assessment flow, and admin token generation. Static-site Quartz would have forced an API gateway in front; Next handles all of it in one repo.

The semantic search index uses Xenova transformers running locally to embed the pathway guides plus the source-research vault corpus into Supabase pgvector chunks. Search runs server-side, returns ranked snippets, and falls back to a category-scoped WhatsApp prompt when no result clears the threshold.

## What will break

- The content stays correct only as long as the underlying immigration rules do. Cost figures, visa-route names, and exam fees in particular drift. The healthcare guide's NZ OSCE pricing, AHPRA OBA pathway, UK NMC option 1 evidence rules: every one of these will shift inside a year. I track them per-section with Gemini fact-checks but the long-term answer is a recurring review cadence, not "set once".
- Token URLs in WhatsApp message history are a real leak vector. If a member forwards their link, the recipient gets full access. Mitigation today is per-token analytics; longer term this becomes a "rotate on N opens" check.
- The semantic search index has to be rebuilt every time a guide section changes (`npm run reindex`). Forgetting to reindex silently degrades search quality. The fix is a build-time hook; not yet wired.
- WhatsApp number rotation. The number is in `NEXT_PUBLIC_WHATSAPP_NUMBER`, embedded in every link. Changing it (already happened once: 061-711-4715) invalidates QR codes printed for offline distribution.

## What I learned

> [!note] To draft in John's voice. Candidates: cost of writing six-section guides backed by source vaults vs. LLM-drafted copy; what the manual sales loop teaches about the actual buyer; whether token URLs survive contact with real WhatsApp users; the discipline of separating research vault from published guide.

## Architecture in one breath

Landing page captures category + UTM source → WhatsApp pre-fill with `wa.me/<number>?text=...` → manual sales over WhatsApp + PayShap → `/admin` generates a Supabase-stored token tied to the buyer + category → token URL in WhatsApp → `/members/[token]` reads category from token row, renders the matching `content/pathways/<category>.md` server-side, plus CV upload to Supabase Storage `cvs` bucket, plus assessment flow, plus semantic search.

## Proof points

- 51 commits in the last 90 days; landing page, admin token generator, member route, three full pathway guides (healthcare, teaching, seasonal), assessment flow, semantic search, and Vercel Analytics all shipped in that window.
- Three pathway guides at six sections each, all Gemini-reviewed against primary sources before publication.
- Six-vault Obsidian research corpus per category before guide drafting (nursing example: 224 notes, 3,120 graph nodes across 6 vaults).
- Playwright-first testing rule baked into `CLAUDE.md`; regression suite checked into `tests/`.
- Tailwind v4 (no `tailwind.config.js`, config in `postcss.config.mjs`); Next.js 16 App Router; React 19.

## What this proves

- [[skills/ai-agentic-systems|AI / Agentic Systems]]: Gemini-as-fact-checker workflow per section; semantic search powered by local Xenova embeddings into Supabase pgvector.
- [[skills/knowledge-graphs-wiki-systems|Knowledge Graphs & Wiki Systems]]: per-category Obsidian research vaults as the source-of-truth substrate behind the published guides.
- [[skills/python-services-data-pipelines|Python Services & Data Pipelines]]: reindex pipeline (`npm run reindex`) for the semantic-search corpus.
- [[skills/design-brand|Design & Brand]]: Oswald + DM Sans typography, locked palette (`#1B4D3E` dark green, `#C9A84C` gold, `#ff751f` orange accent), full landing page hand-written rather than templated.

## Decisions worth a deeper read

*Populated as the decision pages land. Likely candidates: why manual WhatsApp sales over a checkout for a R199 product; why token URLs over user accounts for a paid-but-disposable membership.*
