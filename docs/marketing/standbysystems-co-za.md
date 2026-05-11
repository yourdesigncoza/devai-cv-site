---
target: Standby Systems
domain: standbysystems.co.za
status: sent
relationship: 6-year WordPress engagement, last contact June 2022
contact: Greg Bennett <greg@standbysystems.co.za>
last_updated: 2026-05-11
---

# Standby Systems outreach

## What they do

Specialist Uninterruptible Power Supply (UPS) and emergency backup company. Sole distributor for Riello UPS in South Africa (excluding Western Cape and KZN) since 2003. 30+ employees, 70%+ technically qualified, 250+ years combined experience. Range goes from 400 VA standalone units up to 8 x 800 kW monolithic blocks (6400 kVA parallel UPS power). Largest contract to date: ZAR 500m. Sole line of business is static emergency backup power across Africa.

**Stack signals:** WordPress, Yoast SEO, Elementor, custom post types (`ups_products`, `industry_categories`, `product_ranges`).

## Why they fit the wedge

The homepage is one of the cleanest examples of the "expert knowledge trapped in marketing copy" pattern I've seen. The page is structured as a series of self-questions that the team answers in long form:

- "What can we offer you?"
- "What UPS and Emergency power service do we offer?"
- "What emergency services and preventative maintenance do we offer?"
- "Which makes and models of UPS and inverter systems do we support?"
- "What installation and commissioning services do we offer?"
- "What preventative maintenance measures can we offer to detect battery failure?"
- "What our UPS site survey can offer you?"
- "What UPS network interface and monitoring can we offer you?"
- "Who is Riello UPS?"

Every one of those is a sales-engineer conversation that's been written down once and posted. That's expert content already in the right structure for a self-service portal. The problem: visitors don't read end-to-end, so the same conversations come back through email and phone.

Three specific friction points worth solving:

1. **Sizing.** "Standby Systems has a large arsenal of power analysis equipment to help any potential client correctly size their UPS and backup battery plant for their specific backup power needs." Today this is a phone call followed by a site visit. Self-service input could collect 80% of the sizing data before the engineer is involved.
2. **Make/model support clarification.** They service ALL makes for first-line work but only stock spares for Riello, ELITE, and Pureline. Customers asking "do you support my XYZ UPS?" is a constant inbound, easy to answer with a checker.
3. **Maintenance contract scoping.** The sitemap shows a dedicated page on what a UPS preventative maintenance contract should include. That page already exists as a long article; turning it into a guided "what your SLA would cover" flow is mostly UX work.

## Why John specifically

- 6-year prior WordPress engagement with Standby (approx 2016 to 2022). Greg knows the work and the stack.
- Last contact was June 2022. Reactivation, not cold outreach.
- Their site is WordPress, same stack John has been working in for 20+ years.
- The work is additive: bolt knowledge-portal flows onto the existing site, not a rebuild.

## Email draft

**To:** Greg Bennett <greg@standbysystems.co.za>
**Subject:** An idea for the Standby Systems site

Hi Greg,

It's been a while, hope the team is well. I've been heads-down on a different angle these past few years and one of the things it produced lines up directly with what Standby does, so wanted to send this through.

The homepage today is the team explaining things: what's in a maintenance contract, which makes you support, how battery testing works, what your site survey covers, who Riello is. That's expert knowledge doing pre-sales work, but most visitors don't read it end-to-end. The same conversations keep coming back through email and phone instead.

I've been building AI-assisted knowledge portals that take that kind of expert content and turn it into guided self-service. A working example: jobabroad.co.za. South Africans wanting to work overseas land on a structured page, answer a few eligibility questions, get a custom pathway, and either pay for the detailed guide or message via WhatsApp.

To make this concrete, I built a small demo on the Riello product range so you can see the pattern running rather than imagine it: **https://www.signaltrace.wiki/riello-ups/Search**. Try a question like *"I need 5 kW backup for 30 minutes for medical equipment, what should I look at?"* or *"I have a small bank branch with point-of-sale terminals, what do I need?"* The answers cite the underlying product notes. The version for Standby would be on your domain with your branding and your full catalogue.

Three versions of that pattern that could fit Standby:

1. **UPS sizing assistant.** Load, runtime, redundancy, environment in. Riello range recommendation and rough kVA target out. The site engineer sees a qualified spec instead of starting from "tell me about your setup."
2. **Maintenance contract scoping page.** Four or five questions in. A clear picture of what a SLA at that level would cover, before the prospect calls.
3. **"Do you support my UPS?" checker.** Make and model in. Your service-vs-spares-stocked answer out, with a contact CTA.

Each one converts a "contact us for info" enquiry into a qualified lead with most of the discovery already done.

Worth a 15-minute call so I can walk you through the JobAbroad demo and sketch one of these for Standby? I'd build the first as a lean phase-one engagement so we can measure the lead-quality lift before scoping anything bigger.

Thanks,
John

## Demo wiki strategy

Decision (2026-05-10): build a public demo wiki populated with public Riello product content + AI-assisted search before sending the email. The email then includes a live URL Greg can click instead of describing the pattern abstractly.

Final state (2026-05-10):

- **Live URL**: https://www.signaltrace.wiki/riello-ups/ (search at https://www.signaltrace.wiki/riello-ups/Search)
- **Branding**: Generic Riello framing. No Standby logo. White-label to full Standby branding once Greg agrees.
- **Hosting**: Sub-path on signaltrace.wiki rather than a standalone Vercel preview. Sub-path silos it cleanly enough not to muddy the SignalTrace OSINT framing.
- **Stack**: 47+ atomic notes across Products, Ranges, Industries, Features, Reference. FAQ split per question for RAG retrieval.

### Smoke test (2026-05-10, 5/5 strong)

Ran the 5 sample queries from `demo-wiki-research-brief.md` through the live `/Search` chat:

| # | Query | Result |
|---|---|---|
| 1 | Medical 5kW / 30 min | Names Sentinel Dual SDU (4-10 kVA) + Master MPS, with topology reasoning |
| 2 | Line-interactive vs online | Explains both topologies with operational mechanism |
| 3 | Battery replacement frequency | 3-5 / 10 / 15 yr ranges + Eurobatt + ambient temp impact |
| 4 | Network monitoring | NetMan 204 + SNMP/web/Modbus + PowerShield |
| 5 | Small bank branch + PoS | Pure Line LI (Buck/Boost AVR, ATM/PoS-class) + Sentinel Pro |

All five answers are grounded, name actual Riello products with capacity brackets, and cite 6 wiki notes each. The auto-validation table that flagged Q4 and Q5 as gaps produced false negatives.

See `demo-wiki-asset.md` for the reusable-shell build plan, content shopping list, and reskin checklist for future prospects.

## Send status

- [x] Confirm primary contact (Greg Bennett, 2026-05-10)
- [x] Build demo wiki (live at signaltrace.wiki/riello-ups, 47+ notes, 2026-05-10)
- [x] Smoke-test demo against 5 sample queries (5/5 strong, 2026-05-10)
- [x] Add demo URL to email body
- [x] John reviews final email
- [x] Sent to greg@standbysystems.co.za (2026-05-11, chattier `greg-initial-mail.md` variant)
- [ ] Log reply

## Sent version

The version that went out is the casual reactivation draft at `greg-initial-mail.md`, not the structured 3-options draft above. It leads with the personal "been a while" framing, the trading-quant detour, and the wiki-from-corpus pitch. Demo links included: signaltrace.wiki/riello-ups/ + /Search, and jobabroad.co.za healthcare/teaching pages. The structured 3-options draft above is kept as reference for the follow-up call if Greg engages.

### Actual sent metadata (read back from Gmail, 2026-05-11)

- **Sent:** 2026-05-11 13:09 +0200
- **From:** John Montgomery `<support@yourdesign.co.za>` (warm legacy alias chosen over `info@devai.co.za` — Greg knows this brand from the 2016-2022 engagement)
- **To:** greg Bennett `<greg@standbysystems.co.za>`
- **Subject:** `Support ( YourDesign.co.za )` (generic-support thread framing, not Standby-specific)
- **Gmail thread ID:** `19e16b7960e6497b`
- **Message-ID:** `<CAOnR3Fs9ebQAUi80pgtxFAXKhZDREgzMBWFny06PSyH1rE78Eg@mail.gmail.com>`

Two changes vs `greg-initial-mail.md` source draft:

1. Wording: "small demo of what I mean" → "small demo of what I'm trying to convey".
2. Appended closing line before the signature: `** I will leave your Demo online for a couple of days then remove , that site is BOT blocked anyhow :::` — signals temporary access and explains why Greg can't share the link around freely. Adds urgency.

Signature block used:
```
Thank You
John
- - - - - - - - -
Web: <yourdesign.co.za>
AI Dev: <devai.co.za>
Twitter: yourdesigncoza
Mobile: +27 79 177 1970
```

## Reply log

(empty)

## Notes for similar-companies sweep

If this lands, the pattern that worked for Standby maps directly to:

- **Generator suppliers** (Cummins/Perkins/Volvo Penta resellers in SA) — same "contact us to size" friction, same maintenance-SLA model, same WordPress-heavy sites
- **Solar commercial installers** — sizing + ROI + maintenance contracts, identical structure
- **HVAC commercial / industrial cooling** — same SLA + sizing + brand-support questions
- **Compressed air systems** (Atlas Copco / Kaeser dealers)
- **Industrial water treatment**

Search angles to find them:

- `site:.co.za "preventative maintenance" "site survey" "service level agreement"`
- `site:.co.za "what we offer" "wp-content" generator OR HVAC OR solar`
- LinkedIn: filter by industry + South Africa, visit each site to confirm WP + FAQ-style content
