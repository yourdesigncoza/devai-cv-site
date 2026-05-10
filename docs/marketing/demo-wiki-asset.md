---
title: Demo wiki — reusable outreach asset
status: planned
last_updated: 2026-05-10
---

# Demo wiki as a reusable outreach asset

## Why this exists

Each marketing outreach (Standby Systems first, then generator suppliers, HVAC, solar, etc.) lands harder if the prospect can click a working URL than if they have to imagine the pattern. The demo wiki is the single asset that gets re-skinned for each prospect.

Build the shell once. For each new prospect, swap content + cosmetic theme + redeploy. Half a day of work per subsequent demo.

## Stack

Fork `/home/laudes/zoot/projects/work-abroad-web` (Next.js 16 + Supabase + pgvector + OpenAI). Already in place:

- `lib/rag/prompt.ts` — RAG prompt assembly
- `lib/rag/` — embedding and retrieval
- `scripts/reindex.ts` — content reindexing
- `components/PathwaySearch.tsx` — chat-style search UI
- `components/AnswerCard.tsx` — answer rendering with sources
- `components/AssessmentWizard.tsx` + step components — guided eligibility / sizing flow
- Supabase + pgvector schema for content + embeddings

The reusable engine is the search + assessment + answer-with-sources surface. Content is the variable.

## Content model (per-prospect)

Three content types, all stored as markdown with frontmatter, ingested into Supabase + pgvector:

1. **Product pages** (5 to 8). One per product line. Frontmatter captures: capacity envelope, runtime profile, target use case, key features, tier (entry / mid / premium). Body has the spec detail and "when to use" guidance.
2. **Industry case pages** (2 to 3). One per buyer segment (e.g. "UPS for medical equipment", "UPS for data centers"). Each maps the segment's needs to the right product tier and links to the product pages.
3. **Sizing logic** (1 page). Drives the assessment wizard. Inputs: load, runtime, redundancy, environment. Output: product range recommendation + estimated capacity.

The chatbot RAG-retrieves from these three content types to answer free-form questions like "I need 5 kW backup for 30 minutes for medical equipment, what should I look at?"

## Reskin checklist (per prospect)

Each new outreach demo:

- [ ] New Vercel project, fresh preview URL
- [ ] Swap all content under `content/products/`, `content/industries/`, `content/sizing.md`
- [ ] Update site name, hero copy, primary CTA
- [ ] Swap accent color + logo placeholder
- [ ] Re-run `scripts/reindex.ts`
- [ ] Update assessment wizard questions to match the new domain (load + runtime → tonnage + duty cycle for HVAC, etc.)
- [ ] Smoke-test 3 example queries through the chatbot
- [ ] Add demo URL to the per-prospect outreach file

Half a day's work once the shell is solid.

## V1 build plan (Standby / Riello)

Effort: 4 to 5 hours focused.

### 1. Content vault (delegated to research skill)

See `demo-wiki-research-brief.md` for the self-contained brief. Concrete URL inventory, extraction tooling, output schema, and success criteria are all captured there. Run it via `vault-builder` (or equivalent research skill). Output lands in `~/zoot/projects/ups-portal-demo/content/`.

Decision shifted from scraping riello-ups.com to scraping standbysystems.co.za public product/industry/FAQ pages. Standby has already authored the same Riello product range as their own catalog; using their public content sidesteps Riello IP concerns and Greg recognises his own writing in the demo.

### 2. Fork and re-skin work-abroad-web (2 hr)

- Clone work-abroad-web into a new repo
- Strip jobabroad-specific content, routes, branding
- Replace site nav, footer, hero
- Generic Riello accent color (use Riello's blue from public site assets), no Standby logo
- Update assessment wizard step copy for UPS sizing inputs

### 3. Wire content + reindex (45 min)

- Drop new markdown into `content/`
- Adjust the RAG prompt template if needed for the UPS domain
- Run `scripts/reindex.ts` to populate embeddings
- Smoke-test 5 sample queries

### 4. Deploy (30 min)

- New Vercel project
- Connect Supabase
- Set env vars (OpenAI key, Supabase URL + keys)
- Deploy, confirm preview URL works end-to-end

## Success criteria

The demo lands when Greg can:

1. Open the URL on his phone
2. See a clean homepage that visibly recognizes the Riello product range
3. Type "I need 5 kW backup for 30 minutes for medical equipment" into the chat and get a grounded answer that names actual Riello products with reasoning
4. Walk through the sizing wizard and see a coherent recommendation at the end

If those four work, the call is going to convert.

## Risks

- **OpenAI API cost** for a public demo is non-zero if the URL leaks. Add basic rate-limiting (per-IP throttle + Cloudflare or Vercel WAF). Set OpenAI usage cap conservatively.
- **Riello content licensing**. Public spec sheets and marketing copy are fine for demo use; do not redistribute Riello PDFs verbatim. Paraphrase and link back to riello-ups.com sources.
- **Hallucination on specs**. RAG mitigates this, but the system prompt should explicitly tell the model "only cite figures from retrieved sources, never estimate."

## Followups for the email

Once the demo is live:

1. Add the demo URL into a new paragraph between the bullet list and the CTA in `standbysystems-co-za.md` email draft. Sample wording: "I built a quick version of this on public Riello content so you can see the pattern running rather than describe it: [URL]. The Standby version would be on your domain with your branding and your full product catalogue."
2. Record a 60-second screen capture of the demo working (chat query + sizing wizard) as a backup if Greg doesn't click the link.
