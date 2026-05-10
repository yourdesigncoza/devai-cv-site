---
title: Marketing & outreach playbook
status: live
last_updated: 2026-05-10
---

# Marketing & outreach

Working notes for the AI-knowledge-portal positioning. Per-client outreach files live in `docs/marketing/`.

## The wedge

Not "I build AI websites." Not "I do AI development."

> I turn expert knowledge that already lives inside a business (specs, FAQs, SOPs, policies, staff experience) into AI-assisted self-service portals that qualify leads, answer repeat questions, and reduce sales-engineer load.

**Live proof points:**

- [jobabroad.co.za](https://www.jobabroad.co.za/demo/teaching) — research vault to public guide to paid gated detail to WhatsApp funnel
- [signaltrace.wiki](https://www.signaltrace.wiki/) — multi-vault research site over OSINT and financial-research case studies
- `wiki-builds/` portfolio of 12+ domain knowledge vaults (alfaromeo, tender-intelligence-research, sa-corruption, claude-tradingview, quant-trader-investor, tirzepatide, work-abroad-pathway-intelligence, XpressoCafe-Research, etc.)

## Lead offer (what to scope first)

**Vault-to-Web Starter.** Take a client's existing docs / notes / FAQs / specs and publish them as a clean searchable web portal with one or two AI-assisted self-service flows on top. Concrete deliverable, fastest to scope, easiest first sale. Phase 2 adds full AI Q&A, eligibility scoring, payment gating, etc.

## Outreach approach

Not a niche-then-template strategy. Each outreach is custom, anchored to:

1. **A specific observation about their site** (proves the email isn't generic)
2. **One specific knowledge-trap on their site** (the wall of FAQ-style copy nobody reads)
3. **One concrete portal idea** mapped to their products
4. **Soft proof link** to JobAbroad (or other relevant vault build)
5. **Low-friction CTA** (15-min call, not "let's discuss your needs")

Then capture each one in `docs/marketing/<client-slug>.md` with the reasoning + email draft + send status + reply log.

## Voice rules (strict)

Zero em-dashes. Cut: very, really, simply, huge, far, surprisingly, "the takeaway:", "used correctly", "much more valuable". See `~/.claude/projects/-home-laudes-zoot-projects-ydcoza-cv/memory/feedback_voice.md` for the full list.

ChatGPT's draft positioning lines (in `notes.md`) violate these and cannot be copy-pasted to live copy.

## Similar-companies criteria

Targets that fit the wedge:

- **B2B service company** in SA / Africa (not commodity products)
- **Buyer needs help scoping or sizing themselves** before contacting sales (signals a self-service portal would be useful)
- **Content-heavy WordPress site** with FAQ / "what we offer" / "services" sections
- **Sales handled by engineers or specialists** (not pure inside sales) so reducing sales-engineer load has real cost leverage
- **20 to 200 employees** (large enough to feel the pain, small enough that the owner makes the buy call)
- **Has industry-vertical or product-range taxonomy** (suggests structured knowledge already exists, just not surfaced for self-service)

Industries that match this profile:

- Industrial automation / SCADA integrators
- HVAC commercial installers
- Solar installers (commercial)
- Generator suppliers (similar play to UPS)
- Fire systems / suppression
- Access control / security integrators
- Compressed air systems
- Process instrumentation
- Borehole / water systems
- Marine electronics
- Immigration / relocation consultants
- Training providers / CPD academies
- Tax and accounting practices
- Migration-adjacent: education recruitment, qualifications evaluation
- Legal practices with high-volume intake (debt collection, RAF, immigration law)

Discovery routes:

- WordPress detection: `site:co.za "wp-content" "<industry term>"`
- Industry directories: ECASA, SAFCEC, ECB, FPA-SA, SAIDA, LSSA
- LinkedIn: "managing director" + industry + South Africa, then visit site to confirm WP + content depth
- Brave Search: `"preventative maintenance" OR "service level agreement" "South Africa" site:.co.za`

## Pipeline

| Target | Status | Last touch | Notes |
|---|---|---|---|
| Standby Systems | drafted | 2026-05-10 | See `marketing/standbysystems-co-za.md` |
