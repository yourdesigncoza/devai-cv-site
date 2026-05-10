# vault-builder Research Prompt — UPS Portal Demo

> **How to use (human):** Copy everything from the send-ready section below the second `---`, fill the few remaining placeholders (vault path, iter_cap if non-default), then paste as your `/vault-builder` message.
> **How to use (LLM, if vault-builder needs to extend or reshape this prompt):** Read the Instructions block in full before changing anything. Most placeholders are already filled because the domain is fixed (commercial UPS catalog research from a known source set).


---

## Instructions for LLM filling or extending this template

You are working with a `/vault-builder` research prompt that has already been adapted for a specific domain (commercial UPS product catalog research). Follow these rules in order of criticality:

### 1. Do NOT begin research
vault-builder's P1 phase handles goal elicitation and P2 handles the seed round. Never add "Begin now with...", "Start by researching...", or any instruction to initiate research immediately. The skill manages the entire research loop. Your job is to produce or refine the prompt — nothing more.

### 2. Never simplify or remove schemas
Every field in every note schema is intentional. Do not strip metadata because it looks verbose or redundant. The schemas drive structured, consistent output across all research rounds. Removing a field removes that data from every note ever created in this vault, and breaks downstream RAG ingestion that depends on consistent frontmatter.

### 3. Every folder must have a matching schema
The `Folder structure` list and the `Note schemas` section must be in 1:1 correspondence. If you specify `Industries/`, there must be an INDUSTRY schema. Never list a folder without a schema, and never create a schema without adding its folder.

### 4. If the domain surfaces a recurring entity type not covered by existing schemas, add it
The schemas in this prompt cover product-catalog research: PRODUCT, RANGE, INDUSTRY, FEATURE, REFERENCE. If research surfaces a recurring entity type that does not fit (e.g. `CertificationBody`, `BatteryChemistry`, `Vendor`), define a new schema for it and add the corresponding folder. One schema per entity type, one folder per schema.

### 5. source_status is mandatory on every note — including stubs
A **stub note** is a placeholder created when a new entity is mentioned in research but not yet researched. Minimum stub content:

```markdown
---
type: [entity type]
source_status: inferred
tags: [[domain-specific tag]]
sources: []
---
# Entity Name
*stub — to be researched*
```

Never create a stub without `type`, `source_status`, and `tags`. Default stub `source_status` is `inferred` unless a confirmed source is already available.

### 6. Generate an EDGE block when a direct verifiable relationship exists
An EDGE block should be generated inside the body of one of the connected notes when:
- A source explicitly states a relationship between two named entities
- The relationship has a type that fits the `relationship_type` enum
- At least one source URL can be cited

Do not generate edges for implied or inferred relationships unless explicitly marked as `inferred`. Record the edge as a bullet in the `## Connections` section of the note where it is most contextually relevant.

### 7. Match the relationship_type enum to the domain
The relationship_type enum for this vault is:

`member_of_range | accessory_for | integrates_with | replaces | superseded_by | recommended_for_industry | implements_feature | extends_runtime_with | complies_with | bundled_with`

These reflect the actual relationships in a UPS product catalog. Do not introduce relationship types outside this enum without adding them to the schema definition first.

### 8. Apply domain-specific tags — not generic ones
Every schema has a `tags` field. Do not leave it as `[product]` or `[industry]`. Tag with role and capacity bracket. Examples:
- Product: `[product, ups, single-phase, line-interactive, sub-3kva, tower]` or `[product, ups, three-phase, online, transformerless, large]`
- Industry: `[industry, life-safety, regulated]` or `[industry, commercial, sla-driven]`
- Feature: `[feature, communication, network]` or `[feature, topology, online]`

Tags are used for Obsidian filtering, RAG retrieval narrowing, and graph colouring. Make them meaningful.

### 9. Source constraints are explicit, not preset names
The source list for this vault is fixed (see Send-ready prompt). Standby Systems' public pages are the primary source because they are the distributor's authored paraphrase of Riello content; this avoids Riello IP concerns and surfaces content Greg Bennett (the demo target) will recognise. Riello's own `riello-ups.com` is allowed as a secondary cross-check source for technical specs only. Do not introduce general-web sources unless explicitly approved.

### 10. iter_cap for this vault
Default to `15` for this vault. The source set is finite (~20 primary URLs) but the relationship graph may surface 30–50 entities once features and ranges are extracted. If the vault converges earlier, vault-builder can halt; if it requires more, surface that as a stop-and-ask rather than running unbounded.

### 11. Canvas is on-demand only — never automatic
The canvas export section must remain commented out. Only uncomment it if the user explicitly says "generate canvas". Not a session-end task, not a summary step.

### 12. Use consistent placeholder format: [placeholder_name]
Every remaining unfilled field must use `[placeholder_name]` format — lowercase, underscored, descriptive.

### 13. Self-check before outputting
Before producing your final output, verify:
- [ ] Every folder in `Folder structure` has a corresponding schema
- [ ] No "begin research" instruction anywhere in the prompt
- [ ] `source_status` present on every schema including stubs
- [ ] `relationship_type` enum is the product-catalog enum, not investigative verbs
- [ ] Tags are domain-specific on every schema
- [ ] Source constraints are explicit URLs, not preset names
- [ ] Canvas section is commented out (unless explicitly requested)

State your confidence level (1–10) that all checks pass before outputting.

---

## Golden example — filled-out PRODUCT note

This shows the expected output format for a completed note (not a stub):

```markdown
---
type: product
title: Sentinel Pro
manufacturer: Riello UPS
model_codes: [SEP 700, SEP 1000, SEP 1500, SEP 2200, SEP 3000]
range: [[1-phase]]
topology: line-interactive
form_factor: tower
capacity_va_min: 700
capacity_va_max: 3000
capacity_kw_min: 0.49
capacity_kw_max: 2.1
runtime_minutes_typical_at_full_load: 5
extends_runtime: true
input_voltage: 220-240 VAC, single-phase
output_voltage: 230 VAC, sine wave
battery_type: VRLA, hot-swappable
communication: [USB, RS232, optional SNMP via NetMan 204]
tier: entry-mid
typical_buyer: SMB, retail, home office
key_features:
  - automatic voltage regulation
  - cold-start capability
  - hot-swap batteries
  - sine-wave output
recommended_industries: [[Commercial]], [[Home Small Office]]
source_status: reseller-listing
tags: [product, ups, single-phase, line-interactive, sub-3kva, tower]
sources:
  - https://standbysystems.co.za/ups_products/sentinel-pro-700-3000va/
  - https://www.riello-ups.com/products/1-ups/44-sentinel-pro
---

# Sentinel Pro

The Sentinel Pro range is a line-interactive single-phase UPS series from Riello, sized 700 VA to 3000 VA, designed for small office, retail, and home computing loads. The range provides automatic voltage regulation, cold-start capability, and a true sine-wave output suitable for sensitive electronics. Hot-swappable batteries reduce downtime during routine replacement.

## When to choose this

- Connected load below 2 kW with non-life-safety criticality
- Mains supply is generally stable but suffers occasional sags or spikes
- Climate-controlled environment (office or retail floor, not industrial)
- Budget tier where full online double-conversion is over-spec

## Specs at a glance

- Topology: line-interactive
- Output: 230 VAC sine wave
- Battery: VRLA, hot-swap
- Comms: USB, RS232; optional network monitoring via NetMan 204
- Form factor: tower

## Connections

- [[1-phase]] — member_of_range, source: standbysystems.co.za product taxonomy
- [[Net Power]] — superseded_by (Sentinel Pro replaces some legacy Net Power use cases), source_status: inferred
- [[NetMan 204]] — accessory_for, network monitoring add-in, source: standbysystems.co.za/ups_products/netman-204/
- [[PowerShield]] — integrates_with, shutdown software, source: standbysystems.co.za/ups_products/powershield/
- [[automatic-voltage-regulation]] — implements_feature, source: standbysystems.co.za product page
- [[Commercial]] — recommended_for_industry, source: standbysystems.co.za industry taxonomy

## Sources

- [Sentinel Pro — Standby Systems product page](https://standbysystems.co.za/ups_products/sentinel-pro-700-3000va/)
- [Sentinel Pro — Riello manufacturer page](https://www.riello-ups.com/products/1-ups/44-sentinel-pro)
```

---

## Send-ready prompt (copy from here)

---

/vault-builder [vault_path]

**Goal:** Build a structured wiki of Riello UPS products, the industries they serve, and the features that distinguish them, drawn from public Standby Systems distributor pages (with Riello manufacturer pages as a secondary cross-check), to feed a RAG-powered demo that helps a prospect select the right UPS for a given load and use case.

**Time period:** Current product catalog as published on Standby Systems and Riello UPS websites as of 2026-05-10. Do not include discontinued ranges unless a current product `replaces` them.

**Seed entities:**

- Sentinel Pro (https://standbysystems.co.za/ups_products/sentinel-pro-700-3000va/)
- Sentinel Dual SDU (https://standbysystems.co.za/ups_products/sentinel-dual-sdu-4-10kva/)
- Pure Line (https://standbysystems.co.za/ups_products/pure-line-1000-10000va/)
- Sentrym (https://standbysystems.co.za/ups_products/sentrym/)
- Medical (industry) (https://standbysystems.co.za/industry_categories/medical/)

**Source constraints (use only these — do not pull from general web unless approved):**

Primary (Standby Systems — distributor's authored content):

Products to research:
- https://standbysystems.co.za/ups_products/iplug-600-800va/
- https://standbysystems.co.za/ups_products/sentinel-pro-700-3000va/
- https://standbysystems.co.za/ups_products/sentinel-dual-sdu-4-10kva/
- https://standbysystems.co.za/ups_products/pure-line-1000-10000va/
- https://standbysystems.co.za/ups_products/sentinel-tower/
- https://standbysystems.co.za/ups_products/sentrym/
- https://standbysystems.co.za/ups_products/vision-800-2000va/
- https://standbysystems.co.za/ups_products/netman-204/
- https://standbysystems.co.za/ups_products/powershield/
- https://standbysystems.co.za/ups_products/multi-switch-ats/

Industries to research:
- https://standbysystems.co.za/industry_categories/banking/
- https://standbysystems.co.za/industry_categories/data-centers/
- https://standbysystems.co.za/industry_categories/medical/
- https://standbysystems.co.za/industry_categories/industrial/
- https://standbysystems.co.za/industry_categories/telecomm/
- https://standbysystems.co.za/industry_categories/computer-rooms/

Reference content to ingest:
- https://standbysystems.co.za/ups-batteries-questions-and-answers/
- https://standbysystems.co.za/247-monitoring/
- https://standbysystems.co.za/support/
- https://standbysystems.co.za/uninterruptible-power-supply-ups/

Range taxonomy (use for metadata + grouping; create RANGE notes):
- https://standbysystems.co.za/product_ranges/1-phase/
- https://standbysystems.co.za/product_ranges/3-phase/
- https://standbysystems.co.za/product_ranges/transformerless/
- https://standbysystems.co.za/product_ranges/transformer-based/
- https://standbysystems.co.za/product_ranges/rack-mount/
- https://standbysystems.co.za/product_ranges/software-connectivity/
- https://standbysystems.co.za/product_ranges/static-transfer-switches-sts/
- https://standbysystems.co.za/product_ranges/voltage-stabilisers/

Secondary (Riello UPS — manufacturer cross-check, technical specs only):
- https://www.riello-ups.com/products/1-ups (index of single-phase UPS products)
- https://www.riello-ups.com/products/4-software-connectivity (index of software/connectivity products)
- Specific product pages on riello-ups.com may be visited only to verify technical specifications already mentioned on the Standby page; do not introduce products not also listed by Standby.

**Output rules (this domain — apply on every note):**

- Paraphrase, do not copy verbatim. Restructure into the schemas below.
- Strip Standby-brand mentions ("Standby Systems offers...", "we have...", "our team..."). Reframe as neutral product/spec descriptions.
- Deduplicate boilerplate (warranty terms, "Riello is the 5th largest UPS manufacturer", company pitches) — capture once at vault-level overview, not per product.
- Always cite `source_url` in frontmatter, with at least one entry.
- Use `source_status: reseller-listing` for content drawn from standbysystems.co.za, `manufacturer-spec` for content cross-checked against riello-ups.com, `inferred` for connections derived but not directly stated.

**Iterations:** 15

---

## Folder structure

- `Products/` — one note per Riello product or product line
- `Ranges/` — one note per product taxonomy category (1-phase, 3-phase, rack-mount, etc.)
- `Industries/` — one note per vertical use case (banking, medical, data-centers, etc.)
- `Features/` — one note per recurring technical capability cross-referenced across products (online-double-conversion, automatic-voltage-regulation, lithium-battery-option, network-monitoring, etc.)
- `Reference/` — FAQ entries, sizing guides, monitoring/support overviews. One note per source page; FAQ source page split into one note per question.

---

## Note schemas — apply to every note created

> Adapt field names within reason for sub-categories, but keep `source_status`, `tags`, and `sources` on every note type. Add new schemas (and matching folders) for any entity type not covered below.

**PRODUCT note:**

```markdown
---
type: product
title: 
manufacturer: Riello UPS
model_codes: []
range: ""                          # wikilink to a Ranges/ note, e.g. "[[1-phase]]"
topology:                          # offline | line-interactive | online-double-conversion | static-transfer | voltage-stabiliser
form_factor:                       # tower | rack | rack-tower-convertible | plug | accessory | software
capacity_va_min: 
capacity_va_max: 
capacity_kw_min: 
capacity_kw_max: 
runtime_minutes_typical_at_full_load: 
extends_runtime: false             # true if the product supports external battery extension
input_voltage: 
output_voltage: 
battery_type: 
communication: []                  # e.g. [USB, RS232, SNMP, dry contacts]
tier:                              # entry | entry-mid | mid | mid-large | large | enterprise
typical_buyer: 
key_features: []
recommended_industries: []         # wikilinks to Industries/ notes
source_status: reseller-listing | manufacturer-spec | inferred
tags: [product, ups, [domain_specific_tag], ...]
sources:
  - 
---

# Title

Short factual paraphrase (2–4 sentences) of what the product is and what it solves.

## When to choose this

- Bulleted scenarios that map to this product (load range, criticality, environment)

## Specs at a glance

- Topology
- Output waveform / voltage
- Battery type
- Communication options
- Form factor

## Connections

- [[Other Entity]] — [relationship_type], source: [url or note name]

## Sources

- [Article title](url)
```

**RANGE note:**

```markdown
---
type: range
title: 
slug: 
parent_taxonomy: standby-systems-product-ranges
description_short: 
typical_capacity_envelope: 
includes_products: []              # wikilinks to Products/ notes
source_status: reseller-listing | manufacturer-spec | inferred
tags: [range, [domain_specific_tag]]
sources:
  - 
---

# Title

Summary of the range definition (2–4 sentences).

## Members

- [[Product Name]] — short one-liner

## Connections

- [[Industry X]] — recommended_for_industry (where applicable), source: ...

## Sources

- [Article title](url)
```

**INDUSTRY note:**

```markdown
---
type: industry
title: 
slug: 
priority_concerns: []              # e.g. life-safety continuity, waveform purity, regulatory compliance
typical_loads: []
recommended_topology: 
recommended_products: []           # wikilinks to Products/ notes
typical_capacity_range: 
relevant_standards: []             # wikilinks to Features/ notes if you've created Standard sub-notes
source_status: reseller-listing | manufacturer-spec | inferred
tags: [industry, [domain_specific_tag]]
sources:
  - 
---

# Title

Why UPS matters in this industry (2–4 sentences).

## What to size for

- Bulleted list: typical loads, runtime expectations, redundancy norms

## Recommended products

- [[Product Name]] — one-line reason for the pairing

## Connections

- [[Range X]] — recommended_for_industry, source: ...

## Sources

- [Article title](url)
```

**FEATURE note:**

```markdown
---
type: feature
title: 
slug: 
category:                          # topology | communication | battery | redundancy | monitoring | safety
short_description: 
implemented_by: []                 # wikilinks to Products/ notes that implement this feature
source_status: reseller-listing | manufacturer-spec | inferred
tags: [feature, [domain_specific_tag]]
sources:
  - 
---

# Title

What the feature is, in plain language (2–4 sentences). Why a buyer would care.

## Implemented by

- [[Product Name]] — short note on how it's implemented in this product

## Connections

- [[Other Feature]] — relationship (e.g. depends_on, alternative_to), source: ...

## Sources

- [Article title](url)
```

**REFERENCE note (for FAQ entries, sizing guides, support/monitoring overviews):**

```markdown
---
type: reference
title: 
slug: 
reference_type:                    # faq-question | overview | sizing-guide | support-policy
referenced_entities: []            # wikilinks to any Products/Ranges/Industries/Features mentioned in the body
source_status: reseller-listing | manufacturer-spec | inferred
tags: [reference, [domain_specific_tag]]
sources:
  - 
---

# Title

Paraphrased answer or explainer content. For FAQ entries, format as one Q + one A:

> **Q:** [question]
>
> **A:** [paraphrased answer]

For overviews, structure with H2 sections matching the source page's logical sections.

## Connections

- [[Entity X]] — referenced, source: ...

## Sources

- [Article title](url)
```

**EDGE metadata (record on every direct verifiable connection):**

- `relationship_type`: one of `member_of_range | accessory_for | integrates_with | replaces | superseded_by | recommended_for_industry | implements_feature | extends_runtime_with | complies_with | bundled_with`
- `description`: short label ("network monitoring accessory", "online double-conversion topology", "recommended for medical")
- `source_status`: reseller-listing | manufacturer-spec | inferred
- `sources`: at least one URL

---

## Runtime rules for vault-builder

- `source_status`: `reseller-listing` (Standby) | `manufacturer-spec` (Riello) | `inferred` — never present an inference as a confirmed spec; use neutral language ("typically", "in this range", "may support") for inferred values.
- Every note and every connection must cite at least one source URL.
- Folder structure: `Products/`, `Ranges/`, `Industries/`, `Features/`, `Reference/` (add folders for any new schema types).
- For the FAQ source page (`https://standbysystems.co.za/ups-batteries-questions-and-answers/`), split into one REFERENCE note per question rather than one note for the whole page. The downstream RAG retriever benefits from individual Q/A units.
- Do not invent specifications. If a capacity, runtime, or feature is not stated in the source, leave the field blank or mark `source_status: inferred` and explain the inference in the body.

---

## Success criteria for this vault

The vault is done when:

1. All 10 product source URLs have a corresponding note in `Products/` with all schema fields populated (or explicitly blank with reason).
2. All 6 industry source URLs have a corresponding note in `Industries/`, with `recommended_products` cross-referencing real Product slugs.
3. All 4 reference source URLs have notes in `Reference/`. The FAQ page is split per-question (expect 10–25 reference notes for the FAQ alone).
4. Range taxonomy notes exist for each of the 8 product ranges, populated with `includes_products` wikilinks.
5. Recurring features (online double-conversion, line-interactive, AVR, hot-swap batteries, network monitoring, sine-wave output, cold-start, etc.) have `Features/` notes that cross-link to the products implementing them.
6. Spot-check 3 random Product notes against their `source_url`: paraphrased, not copied verbatim, no Standby-brand language ("we", "our team", "Standby offers").
7. Every note has at least one populated `source` URL.

---

## Sample queries the resulting vault must support (validation, not part of the research run)

After the vault is built, the downstream RAG demo must answer these well. If the vault is missing the data needed to answer them, more research rounds are needed:

1. "I need 5 kW backup for 30 minutes for medical equipment, what should I look at?"
2. "What's the difference between line-interactive and online double-conversion?"
3. "How often should UPS batteries be replaced?"
4. "Can I monitor my UPS over the network?"
5. "I have a small bank branch with point-of-sale terminals, what do I need?"

If any of these would fail for lack of indexed content (not for RAG-retrieval bugs), expand the research rather than ship a thin vault.

---

## Canvas export (on-demand — generate only when user explicitly requests "generate canvas")

> Uncomment this section to enable. Canvas will only be generated when explicitly asked.

<!--
Generate `wiki/ups-portal-demo.canvas` using this schema:

{
  "nodes": [{"id": "uid", "type": "file", "file": "Products/Sentinel Pro.md", "x": 0, "y": 0, "width": 400, "height": 200, "color": "1"}],
  "edges": [{"id": "eid", "fromNode": "uid1", "fromSide": "right", "toNode": "uid2", "toSide": "left", "label": "accessory_for", "color": "4"}]
}

Colour codes for this domain: 1=blue (product), 2=green (industry), 3=orange (feature), 4=purple (range), 5=grey (reference)
Layout: range nodes at x:0 y:0 (centre); products clustered around their parent range ~600 units out; industries on the periphery ~1400 units out; features as cross-cutting overlays.
-->
