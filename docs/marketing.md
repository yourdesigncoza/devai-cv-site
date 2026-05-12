---
title: Marketing & outreach playbook
status: live
last_updated: 2026-05-11
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

## Lead offer (two tiers)

**Tier 1: 5-day Portal Demo Sprint.** Fixed price R5-8k. Live working portal on a subpath using their content. Concrete deliverable, fastest to close (yes/no decision, not budget approval). Foot-in-door.

**Tier 2: Vault-to-Web Starter.** R30-60k+ engagement after the sprint validates. Adds full AI Q&A, eligibility scoring, payment gating, etc. Sold after Tier 1 proves value.

## Outreach approach

Two channels run in parallel: **warm reactivation** (high-yield, exhausted at 2 sends) and **cold outbound** (volume play, ongoing). Both anchored to:

1. **A specific observation about their site** (proves the email isn't generic)
2. **One specific knowledge-trap on their site** (the wall of FAQ-style copy nobody reads)
3. **One concrete portal idea** mapped to their products
4. **Live proof link** to a stock demo on `demo.devai.co.za` (no brand fragmentation, recipient lands on DevAi-branded surface)
5. **CTA differs by channel:** warm = "15-min call"; cold = "live demo to try now + 48hr custom POC after qualifying chat"

Then capture each one in `docs/marketing/<client-slug>.md` (warm) or `docs/marketing/cold-batch-NN-<vertical>.md` (cold batch) with reasoning, email draft, send status, reply log.

### Cold-outbound playbook (added 2026-05-11)

- **Stock demo first.** Before sending a batch, a vertical-specific stock demo lives at `demo.devai.co.za/<vertical>` built from public regulatory + distributor + industry-body content. Becomes the live-now proof link in every cold mail in that batch.
- **Qualified POC, not unconditional build.** Custom POC on the recipient's content is offered only after a discovery call confirms fit. Filters tire-kickers; protects time.
- **Volume floor: 30-50 per batch.** At 2-5% cold reply rates, 10-15 sends statistically yield 0-1 reply.
- **Follow-up sequence:** day-3 short "just checking" + day-7 "one last try, is X a priority right now". Standardly 2-3x's reply rate.
- **Persona expansion:** MD + Head of Sales + Senior Sales Engineer. Pre-sales pain is felt by sales heads, not always MDs.
- **From alias:** cold = `info@devai.co.za` (DevAi positioning); warm reactivation of past WP client = `support@yourdesign.co.za` (legacy hook).
- **Voice rules apply:** zero em-dashes, no intensifiers, bare URLs (markdown links render literally in email), plain "Thanks,", no asterisks.

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
| Standby Systems | sent | 2026-05-11 | Casual variant (`greg-initial-mail.md`) sent to Greg. Awaiting reply. |
| Cold batch 01: SA commercial solar installers | list-building | 2026-05-11 | See `marketing/cold-batch-01-commercial-solar.md`. Free-demo CTA, `info@devai.co.za` alias. |
