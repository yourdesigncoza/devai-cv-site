---
title: Research brief — UPS portal demo wiki
target: Standby Systems / Riello UPS demo
status: ready-to-execute
deliver_to: /home/laudes/zoot/projects/ups-portal-demo/content/
last_updated: 2026-05-10
---

# Research brief — UPS portal demo wiki

Self-contained brief for a research / vault-building skill. No external context required beyond this document.

## Goal

Build a structured markdown content vault about Riello UPS products, target industries, and UPS sizing/selection guidance. The vault will be ingested into a Next.js + Supabase pgvector RAG demo that gets deployed at `ups-portal-demo.vercel.app`. The end use is a sales demo for Standby Systems (Greg Bennett, see `standbysystems-co-za.md`).

The demo is generic Riello-branded for v1 (no Standby logo). White-label to Standby branding happens later, after Greg approves on the call.

## Source content strategy

**Pull from `standbysystems.co.za` public pages, not riello-ups.com.**

Why: Standby has already authored their own paraphrased product descriptions, industry case pages, and a UPS FAQ. It's their content, publicly indexed for SEO, in SA-relevant English. Using their existing public material avoids any Riello IP question, and Greg will recognize his own writing surfaced through the smart interface, which lands harder than original Riello content would.

**Constraints:**

- **Paraphrase, do not copy verbatim.** Restructure into the schema below. Compress where the original is repetitive.
- **Always cite source** in frontmatter (`source_url`).
- **Strip Standby brand mentions** ("Standby Systems offers...", "we have...", "our team..."). Reframe as neutral product/spec descriptions ("The Sentinel Pro range provides...", "Recommended for...").
- **Deduplicate.** Many product pages share boilerplate (warranty, support, the same "Riello is the 5th largest UPS manufacturer" paragraph). Capture once at the catalog level, not per product.

## URL inventory to ingest

### Tier 1 — Product pages (10 to ingest)

Diverse selection covering entry, mid, and large capacity tiers plus accessory/connectivity products. Each becomes one file in `content/products/`.

1. https://standbysystems.co.za/ups_products/iplug-600-800va/
2. https://standbysystems.co.za/ups_products/sentinel-pro-700-3000va/
3. https://standbysystems.co.za/ups_products/sentinel-dual-sdu-4-10kva/
4. https://standbysystems.co.za/ups_products/pure-line-1000-10000va/
5. https://standbysystems.co.za/ups_products/sentinel-tower/
6. https://standbysystems.co.za/ups_products/sentrym/
7. https://standbysystems.co.za/ups_products/vision-800-2000va/
8. https://standbysystems.co.za/ups_products/netman-204/
9. https://standbysystems.co.za/ups_products/powershield/
10. https://standbysystems.co.za/ups_products/multi-switch-ats/

### Tier 2 — Industry case pages (6 to ingest)

Each becomes one file in `content/industries/`.

1. https://standbysystems.co.za/industry_categories/banking/
2. https://standbysystems.co.za/industry_categories/data-centers/
3. https://standbysystems.co.za/industry_categories/medical/
4. https://standbysystems.co.za/industry_categories/industrial/
5. https://standbysystems.co.za/industry_categories/telecomm/
6. https://standbysystems.co.za/industry_categories/computer-rooms/

### Tier 3 — Reference / FAQ pages (4 to ingest)

Each becomes one file in `content/reference/`. The FAQ is especially valuable — it is the highest-density Q&A content for RAG retrieval.

1. https://standbysystems.co.za/ups-batteries-questions-and-answers/
2. https://standbysystems.co.za/247-monitoring/
3. https://standbysystems.co.za/support/
4. https://standbysystems.co.za/uninterruptible-power-supply-ups/

### Tier 4 — Range taxonomy (read but do not write notes)

Use these to understand how products group together. Inform the `range` field on product pages and the navigation structure of the demo. Do **not** create notes for these; the grouping is metadata, not content.

- https://standbysystems.co.za/product_ranges/1-phase/
- https://standbysystems.co.za/product_ranges/3-phase/
- https://standbysystems.co.za/product_ranges/transformerless/
- https://standbysystems.co.za/product_ranges/transformer-based/
- https://standbysystems.co.za/product_ranges/rack-mount/
- https://standbysystems.co.za/product_ranges/software-connectivity/
- https://standbysystems.co.za/product_ranges/static-transfer-switches-sts/
- https://standbysystems.co.za/product_ranges/voltage-stabilisers/

## Extraction tooling

For each URL, use the `defuddle` skill: `defuddle parse <url> --md -o <tmpfile>`. Defuddle returns clean markdown stripped of nav/footer chrome. Standby is a public WordPress site so 403/CAPTCHA fallback to Interceptor should not be needed.

## Output schema

All output goes under `/home/laudes/zoot/projects/ups-portal-demo/content/` (create the directory if it does not exist; the actual project gets initialised later from a `work-abroad-web` fork).

### `content/products/<slug>.md`

```markdown
---
title: Sentinel Pro
slug: sentinel-pro
range: 1-phase                    # 1-phase | 3-phase | accessory | software | sts | stabiliser
topology: line-interactive         # offline | line-interactive | online-double-conversion | static-transfer
form_factor: tower                 # tower | rack | rack-tower-convertible | plug
capacity_va_min: 700
capacity_va_max: 3000
capacity_kw_min: 0.49              # derive from kVA at typical 0.7 PF unless spec gives kW directly
capacity_kw_max: 2.1
runtime_minutes_typical: 5         # at full load with internal batteries; if extendable, note in body
tier: entry-mid                    # entry | entry-mid | mid | mid-large | large
use_cases:
  - small office
  - retail point-of-sale
  - home computing
typical_buyer: SMB
key_features:
  - automatic voltage regulation
  - cold-start capability
  - USB and serial communication
extends_with:
  - powershield
  - netman-204
source_url: https://standbysystems.co.za/ups_products/sentinel-pro-700-3000va/
---

## Overview

(2 to 3 paragraph paraphrase of what the product is and what it solves)

## When to choose this

(Bulleted list of buyer scenarios that map to this product)

## Specs at a glance

(Key technical specs in compact format: input voltage, output, batteries, weight, comms)

## What it pairs with

(Cross-references to monitoring cards, software, switches that extend this product)
```

### `content/industries/<slug>.md`

```markdown
---
title: Medical
slug: medical
priority_concerns:
  - life-safety equipment continuity
  - waveform purity for sensitive instruments
  - regulatory compliance (e.g. SANS for healthcare facilities)
typical_loads:
  - imaging equipment (CT, MRI)
  - monitoring and telemetry
  - laboratory analysers
recommended_topology: online-double-conversion
recommended_products:
  - sentinel-dual-sdu
  - pure-line
  - sentrym
typical_capacity_range: 6-100 kVA
source_url: https://standbysystems.co.za/industry_categories/medical/
---

## Why UPS matters here

(2-3 paragraph paraphrase of the industry's specific power-quality and continuity needs)

## What to size for

(Bulleted: typical loads, runtime expectations, redundancy norms)

## Recommended Riello range

(Link out to product notes by slug, with a one-line reason for each pairing)
```

### `content/reference/<slug>.md`

```markdown
---
title: UPS Batteries — Questions and Answers
slug: ups-batteries-faq
type: faq                         # faq | reference | overview
source_url: https://standbysystems.co.za/ups-batteries-questions-and-answers/
---

## (Section heading from source)

(Paraphrased Q&A or explainer content)
```

For the FAQ specifically: split into one `### Q: ...` block per question so the RAG retriever can return individual Q&A pairs.

### `content/sizing.md` (hand-authored, not scraped)

After all product/industry pages are ingested, hand-author a single `content/sizing.md` that codifies the implicit selection logic into an explicit decision flow. This file drives the assessment wizard. Structure:

```markdown
---
title: UPS sizing logic
type: sizing-logic
---

## Inputs

- `total_load_kw`: connected load in kilowatts
- `runtime_minutes`: required backup runtime at full load
- `redundancy`: none | n_plus_1 | 2n
- `environment`: climate-controlled | harsh | outdoor
- `criticality`: consumer | business | life-safety

## Decision rules

1. If `criticality == life-safety` OR `environment == harsh` then topology = online-double-conversion
2. If `total_load_kw <= 2` AND `criticality <= business` then topology = line-interactive
3. (etc.)

## Product range mapping

| Capacity bracket | Topology | Recommended range |
|---|---|---|
| 0.4 to 2 kVA | line-interactive | sentinel-pro |
| 2 to 10 kVA | online | sentinel-dual-sdu |
| 10 to 100 kVA | online transformerless | pure-line, sentrym |
| 100+ kVA | online | multi-sentry, master-hp |
```

The wizard implementation will read this file's frontmatter and decision rules; the table is also indexed for the chatbot to retrieve.

## Success criteria

The vault is done when:

1. 10 product files in `content/products/` with all schema fields populated
2. 6 industry files in `content/industries/` with `recommended_products` cross-referencing real product slugs
3. 4 reference files in `content/reference/`, including the FAQ split into per-question blocks
4. 1 hand-authored `content/sizing.md` with decision rules that cover the capacity range from 400 VA to 800 kVA
5. No verbatim copy from source pages (spot-check 3 random files against their source_url)
6. Every file has a working `source_url` in frontmatter

## What happens next (out of scope for this brief)

After the vault is built:

1. Fork `~/zoot/projects/work-abroad-web` into `~/zoot/projects/ups-portal-demo`
2. Replace `work-abroad-web/content/` with this vault
3. Reskin: site name, hero copy, accent color (use Riello blue from public site), no Standby logo
4. Adapt `components/AssessmentWizard.tsx` step copy to match the sizing inputs above
5. Run `scripts/reindex.ts` to populate Supabase + pgvector
6. Deploy to a fresh Vercel project, smoke-test 5 sample queries
7. Add the live URL to `standbysystems-co-za.md` email draft

See `demo-wiki-asset.md` for the full v2-onwards reskin checklist for future prospects.

## Sample queries the demo must answer well

After reindex, the chatbot must produce coherent, source-grounded answers to:

1. "I need 5 kW backup for 30 minutes for medical equipment, what should I look at?"
2. "What's the difference between line-interactive and online double-conversion?"
3. "How often should UPS batteries be replaced?"
4. "Can I monitor my UPS over the network?"
5. "I have a small bank branch with point-of-sale terminals, what do I need?"

If any of those produce hallucinated specs or generic non-grounded answers, the RAG prompt or the content depth needs another pass before the demo is ready to send.
