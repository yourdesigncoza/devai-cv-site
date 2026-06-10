---
title: Content plan
date: 2026-05-29
---

# Content plan

Positioning: **John Montgomery, AI developer & quant systems builder.** Two tiers.

- **Tier 1 (lead offer):** AI-assisted self-service knowledge portals. Qualify leads, answer repeat questions, cut sales-engineer load. Proof: JobAbroad, SignalTrace.
- **Tier 2 (depth):** Quant + AI research systems where evidence, testing, and downside matter. Proof: EdenFintech scanner, FTR backtesting, insider-signal.

One person, one site. Portal wedge is the way in; quant/AI depth is the credibility.

## The spine: one method, not five clusters

The strongest asset is not the individual projects, it is the **method** that produced them: **vault-builder**, the machine that turns a topic into a navigable, evidence-graded research graph (full detail in `project-evidence.md`, section 0). SignalTrace's wikis and JobAbroad's research vault are both vault-builder output. The EdenFintech scanner applies the same epistemic discipline to quant research. So the content is structured as **one pillar plus spokes plus proof**, not five scattered clusters.

- **Pillar (the worldview):** how to build research/AI systems you can actually trust: typed contracts, evidence grading, knowing when to stop, telling you what is broken.
- **Spokes (the mechanisms):** one piece per quality gate, each a teachable, ownable idea.
- **Proof (the projects):** case studies that show the method shipped into real products.

This is also the Tier-1 service with a moat: "Give me a topic, 3-5 seed entities, and your sources. I run the machine. You get an evidence-graded, audited research graph that keeps growing."

## Pages to build

| Page | Purpose |
|---|---|
| Home | Sharpen the commercial CTA. Lead with what you build + who you help, point to the Method. |
| The Method (pillar) | The flagship page: how I build living research graphs you can trust. The hub the spokes link up to. Doubles as the vault-builder service page. |
| Services | One page per offer: research graphs (vault-builder), knowledge portals, quant platforms, agentic/LLM pipelines, AI for agencies. |
| Case Studies | Reframe existing project pages as evidence packs: problem to architecture to result to what it proves. Each links back to the Method. |
| For Business Owners | "A useful internal tool, not AI theatre." |
| For Agencies | "Bring me in when the client wants AI and your team needs the depth." |
| For Investors | "Quant and AI research where evidence and downside analysis matter." |
| Writing | The existing wiki (decisions, playbooks, notes, influences, open questions) sits here. |
| About / Contact | Keep. |

Nav: Home, The Method, Services, Case Studies, [Audiences], Writing, About, Contact.

## Content: pillar + spokes + proof

Not five clusters. One pillar, a set of spokes that each teach one mechanism, and case studies that prove it shipped. Every spoke opens with a self-contained answer paragraph (the bit AI search engines quote), then goes deep, then links up to the pillar and across to a case study. Fewer pieces, done well, beats fifty thin posts.

### The pillar (write this first)
**"How I build living research graphs you can trust (and why most AI research isn't)."** The flagship page and the vault-builder service page in one. Frames the worldview, names the mechanisms, links to every spoke and case study. Translate the jargon: not "epistemic research" but "a research graph that shows how things connect, grades what's solid vs alleged, and tells you what to dig into next."

### Spokes (one per mechanism, each ownable and teachable)
Each maps to a real quality gate in `project-evidence.md`. Translate to a reader problem; do not lead with the script.

| Spoke | The idea | Proof |
|---|---|---|
| Wikilinks are the product | links are claims about relationships; the graph is the output | signaltrace, vault-builder |
| A research tool that finds its own blind spots | hollow-hub detection: surfaces the central thing it hasn't researched yet | vault-builder |
| Every claim should carry its evidence grade | confirmed vs alleged vs rumoured, enforced, not optional | vault-builder, scanner |
| Knowing when to stop is the hard part | convergence: stop instead of hallucinating more | vault-builder, scanner |
| Treat contradictions as findings, not errors | source-conflict becomes a research target | vault-builder |
| LLMs behind typed contracts, not vibes | type-enforced barriers, Zod outputs, SQL sandbox | scanner, jobabroad, wecoza |
| Why AI projects die after the demo | logging, review stages, fallbacks, audit trails | scanner, jobabroad |
| Postgres is the spine | pgvector RAG, 44-table LOB app, atomic concurrency | jobabroad, wecoza |
| Build the harness, not just prompts | authored skills that encode domain rules so the model stays on-rails; prompt engineering vs AI engineering | skills authorship, wecoza, vault-builder |

### Proof (case studies, reframed from existing project pages)
- **SignalTrace** — the method published: Obsidian to 13 Quartz wikis via a custom multi-wiki build.
- **JobAbroad** — the method productized: a research vault wired into a paid self-service portal (RAG, scoring, AI coach).
- **EdenFintech scanner** — the discipline applied to quant: typed barriers, evidence grading, negative results. (Tier 2 depth.)
- **WeCoza** — the "war stories" credibility piece: 44-table Postgres-not-wpdb, pgaudit forensics, NLQ-to-SQL.
- **Skills authorship** — the AI-tooling receipts: 8 personal `ydcoza-*` workflow skills + the larger vault-builder (~5.8k lines), infranodus (~2.2k) and graphify (~1.2k), plus a full embedded Claude setup inside the WeCoza client codebase (5 project skills + 4 slash commands + a devvault plugin + a hook). Proof of "harness over prompt" (see `project-evidence.md` section 5). Feeds the "Build the harness, not just prompts" spoke and ties to the existing `open-questions/harness-vs-prompt-engineering` page.

Tier 2 quant spokes (backtesting discipline, catalysts-or-pass, insider buying, publishing negative results) stay as a smaller secondary set for the technical/investor audience, anchored to the scanner, ftr-strategy-backtesting, and insider-signal projects. They are credibility content, not discovery content.

## Brief for the content writer (read first)

Every page and article has one job: make a visitor or an agency want to contact John. Structure for that, without sounding like a sales brochure.

How to make it appealing (not cheesy):
- Lead with the reader's problem, not John's CV. Open on the pain or the question they already have, then show the work that answers it.
- Prove, do not boast. Replace adjectives with specifics: a real project, a number, a before/after, a decision and why. "Built a scanner that does X" beats "expert AI developer".
- Confident, plain, calm. No hype words, no exclamation marks, no "revolutionary / cutting-edge / game-changing / unlock / supercharge / seamless / passionate about". If a line sounds like a LinkedIn ad, cut it.
- Show range to agencies: that John can slot in, build the system properly, or rescue a stuck build. Speak to "you and your client", not just "you".
- End every page with one clear, low-pressure next step (contact, see the live demo, read the case study). One CTA, not three.
- Specific over clever. A concrete sentence a real person would say out loud, never a slogan.

Hard step: **run every draft through the `/humanizer` skill before it ships.** It strips the AI tells (em-dash overuse, rule-of-three, "it's not just X, it's Y", inflated vocabulary, vague attributions). Treat humanizer output as a required pass, then read it once more aloud to confirm it still sounds like John.

## Rules

- Voice: zero em-dashes. Cut very/really/simply/huge/far/surprisingly/"the takeaway:"/"used correctly".
- You write the first-person / reflective parts (service value props, "what I learned", audience-page stances). I scaffold the factual structure and leave TODO placeholders.
- Keep the wiki. Add the commercial front door on top of it.
- No content ships without a `/humanizer` pass (see brief above).

## GEO (so AI search can find and cite you)

Done already (in worktree branch, ready to merge):
- llms.txt published (positioning + case-study map for AI crawlers).
- Person schema enriched (service offers, expanded topics, profile links).

Still to do:
- LinkedIn + GitHub: not on the site yet (footer has only email/phone/devai/edenfintech). Supply both URLs, then add to footer + Person schema `sameAs`.
- FAQPage schema on Service + audience pages (the single biggest lever for getting quoted in AI Overviews).
- Open each cluster article with a definitional first paragraph.

## Build order

1. **The Method pillar page** (also the vault-builder service page). Everything links to it; build it first. **To write it, start from `pillar-page-brief.md`** (backstory, first-person framing, humanizer rule, full section spec).
2. Reframe top 3 case studies (SignalTrace, JobAbroad, scanner) as proof, each linking back to the pillar.
3. Remaining Services pages (knowledge portals, quant, agentic, AI for agencies).
4. Audience pages (3): a team of agents, one agent per page, running independently. Each agent gets the brief above, the locked decisions, the pillar, and its audience angle; output goes through `/humanizer` before review.
5. Spokes: the 8 mechanism pieces, definitional-first, each linking to pillar + a case study.
6. Tier-2 quant secondary set (credibility content) last.

## Decisions (locked)

- **Pricing:** private. No prices on public pages or in schema. Pricing stays in outreach/discovery only.
- **Audience pages:** build all three now (Business Owners, Agencies, Investors). Build approach: spin up a team of agents, one per audience page, running independently.
- **LinkedIn + GitHub:** NOTE: checked the footer, it currently shows only email, phone, devai.co.za, and edenfintech.com. No LinkedIn or GitHub profile link is on the site anywhere. If John wants these as GEO signals he needs to supply the two URLs; then add them to the footer AND to Person schema `sameAs`. (Schema already lists edenfintech.com, signaltrace.wiki, yourdesign.co.za.)
- **Demo + projects:** OK to link `demo.devai.co.za` publicly, plus the projects already named on the site. Use these as the proof links in Services and audience pages.
- **Publish how-it-works detail publicly:** yes. Spokes may show the real algorithms and thresholds (hollow-hub detection, convergence rule, typed barriers, the SQL sandbox). Transparency is the moat, not a leak.
- **Skills authorship is in scope:** add a "Build the harness, not just prompts" spoke + a skills-authorship section as proof of AI/LLM progress (personal `ydcoza-*` skills + WeCoza-embedded skills).

## Projects source code for content and context

Source code read and extracted into **`project-evidence.md`** (next to this file). That file is the source of truth for case studies, service pages, and clusters: real stack, real numbers, standout engineering, content hooks, and corrections.

| Project | Source path | Evidence |
|---|---|---|
| jobabroad.co.za | `/home/laudes/zoot/projects/jobabroad-co-za` | Next.js 16 + Supabase pgvector RAG, paid tier, AI coach. ~25k LOC, 25 routes, 9 tables. |
| signaltrace.wiki | `/home/laudes/zoot/projects/signaltrace-site` | Quartz (not Astro). 13 wikis, 912 md files, custom multi-wiki build. |
| EdenFintech scanner | `/home/laudes/zoot/projects/edenfintech-scanner-python` | Stdlib-only core, ~8-role LLM pipeline behind a type-enforced barrier. ~12k LOC, 152 tests. |
| WeCoza 3.0 | `/opt/lampp/htdocs/wecoza/wp-content/plugins/wecoza-core` | PHP/WP + Postgres (44 tables, 3 schemas, pgaudit forensics, NLQ-to-SQL). ~87k LOC. |

**Corrections found while reading the code (fix on the live site too):** jobabroad has no CV upload and is account-gated not "token-gated"; signaltrace is 13 wikis on Quartz, not "five case studies" on Astro; the scanner is multi-role (~8), not "three-role". See `project-evidence.md` for the full list.
