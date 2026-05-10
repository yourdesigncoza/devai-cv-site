---
target: Standby Systems
domain: standbysystems.co.za
status: drafted
relationship: 6-year WordPress engagement, last contact June 2022
contact: Greg Bennett <greg@standbysystems.co.za>
last_updated: 2026-05-10
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

Decisions made:

- **Branding**: Generic Riello framing for v1. No Standby logo. Demo positioned as "the pattern running on UPS data your team will recognize." White-label to full Standby branding once Greg agrees on the call.
- **Hosting**: Standalone Vercel preview URL (e.g. `ups-portal-demo.vercel.app`). Separate from devai.co.za, signaltrace.wiki, jobabroad.co.za.
- **Stack**: Fork `work-abroad-web` (Next.js 16 + Supabase + pgvector + OpenAI). Reuse `lib/rag/`, `components/PathwaySearch.tsx`, `components/AnswerCard.tsx`, `components/AssessmentWizard.tsx`, `scripts/reindex.ts`. Content swap + cosmetic re-skin, not a rebuild.

See `demo-wiki-asset.md` for the reusable-shell build plan, content shopping list, and reskin checklist for future prospects.

## Send status

- [x] Confirm primary contact (Greg Bennett, 2026-05-10)
- [ ] Build demo wiki (see `demo-wiki-asset.md`)
- [ ] Add demo URL to email body before send
- [ ] John reviews final email
- [ ] Send to greg@standbysystems.co.za
- [ ] Log reply

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
