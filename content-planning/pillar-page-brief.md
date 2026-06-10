---
title: Pillar page brief (start here, new session)
date: 2026-05-29
for: the session that writes the pillar page
---

# Brief: write the pillar page

You are starting fresh. Read this file, then `content-plan.md` and `project-evidence.md` (both in this folder), before writing a word. This brief carries the backstory, the voice, and the exact spec. Do not skip the source files: every claim in the page must trace to `project-evidence.md`, which was built by reading the real source code.

## The job, in one line

Write the flagship pillar page for devai.co.za: **"How I build living research graphs you can trust (and why most AI research isn't)."** It doubles as the vault-builder service page and is the hub every content spoke and case study links back to.

## Backstory: why this content exists

John Montgomery is repositioning devai.co.za to **get development projects and be discovered online**, by humans and by AI search (GEO: AI Overviews, ChatGPT, Perplexity). Today the site reads like a personal knowledge wiki / CV. It needs a commercial front door on top of the wiki, without losing the honest, non-hype voice that makes it credible.

The strategic insight that drives this page: John's portfolio is **not four separate projects, it is one repeatable method**. `vault-builder` (a Claude Code skill he authored) is the machine that manufactures evidence-graded research graphs. SignalTrace's wikis and JobAbroad's research vault are both vault-builder output. The EdenFintech scanner applies the same discipline to quant research. So the content strategy is **one pillar (the method) + spokes (the mechanisms) + proof (the projects)**, not scattered blog posts. This page is the pillar. Get it right and everything else hangs off it.

Positioning is tiered: Tier 1 (lead) = AI knowledge portals / research graphs; Tier 2 (depth) = quant + AI systems. One person, one site.

## Who John is, and the framing

- **John is a developer, not a salesman.** Write in his voice: a dedicated, experienced builder (22 years coding, founder of EdenFintech, based in Mossel Bay) who shows the actual system and tells you what is broken. Confidence comes from specifics and from honesty, never from hype.
- **First person.** "I build...", "When I scope a project I...", "Here is what I do differently." Not "DevAi offers" or third-person bio voice.
- **The edge is trust, not excitement.** The whole reason this works is that most AI content is confident slop. John's differentiator is evidence grading, knowing when to stop, and saying what could not be confirmed. Lean all the way into that.

## Voice rules (hard, from the project)

- **Zero em-dashes. Anywhere.** Use a period, comma, colon, or parentheses instead.
- Cut intensifiers and aphorisms: very, really, simply, huge, far, surprisingly, "the takeaway:", "used correctly".
- No hype vocabulary: revolutionary, cutting-edge, game-changing, unlock, supercharge, seamless, "passionate about". If a line sounds like a LinkedIn ad, delete it.
- Prove, do not boast. Replace adjectives with a real number, a real file, a real decision and why. Pull these from `project-evidence.md`.
- Lead with the reader's problem, not John's CV. Open on the pain or the question they already have.
- One clear, low-pressure CTA at the end. Not three.

## Humanizer rule (hard)

**Run the full draft through the `/humanizer` skill before it is considered done.** It strips the AI tells (em-dash overuse, rule-of-three, "it's not just X, it's Y", inflated vocabulary, vague attributions, negative parallelisms). Treat the humanizer pass as mandatory, then read the result aloud once to confirm it still sounds like a real person. A draft that has not been through humanizer is not finished.

## The pillar page spec

**Working title:** How I build living research graphs you can trust (and why most AI research isn't).
**Slug suggestion:** a service/method page, not a dated blog post (it is evergreen and the hub).
**Primary audience:** business owners and agencies who need research or knowledge surfaced and trust it. Secondary: technical/investor readers who will respect the rigor.
**Goal of the page:** make the reader think "this person builds research systems I can actually rely on" and contact John or read a case study.

**Translate the jargon.** Do not lead with "epistemic research." Lead with the outcome: a living research graph that shows how things connect, grades what is solid versus alleged, and tells you what to dig into next.

**Section-by-section outline (adapt, don't follow robotically):**

1. **Hook (reader's problem).** Open on the real pain: AI research tools sound confident and are often wrong; you cannot tell what is verified, what is guessed, or what is missing. 2-3 sentences. This is the passage AI search engines will quote, so make the first paragraph a self-contained definition of the problem and the approach.
2. **What I build.** Plain-English description of a research graph and what the reader gets. Connect entities, evidence grades on every claim, open questions surfaced, a navigable map that keeps growing.
3. **How it works (the mechanisms).** This is the spine. One short subsection per quality gate, each a teachable idea, each with proof. Pull the real detail from `project-evidence.md` section 0 (publishing the real algorithms is approved):
   - Wikilinks are the product (links are claims; the graph is the output).
   - It finds its own blind spots (hollow-hub detection: surfaces the central thing not yet researched).
   - Every claim carries an evidence grade (confirmed / alleged / rumoured, enforced).
   - Knowing when to stop (convergence: stop instead of inventing more).
   - Contradictions are findings, not errors (source-conflict becomes a research target).
   - The audit and the health scorecard (P6.5 re-reads every note against sources; Vault Health must read zero).
4. **Proof it ships.** Short, concrete: SignalTrace (the method published, 13 Quartz wikis), JobAbroad (the method productized into a paid portal with RAG and a coach). Link to those case studies. Cite real numbers from the evidence file.
5. **Harness over prompt (optional, ties to a spoke).** One paragraph: John builds the tooling around the model, not just prompts. Reference the authored skills (`project-evidence.md` section 5). Links to the `harness-vs-prompt-engineering` open-question page.
6. **The offer / CTA.** The service in plain words: "Give me a topic, 3-5 starting entities, and your sources. I run the machine. You get an evidence-graded, audited research graph that keeps growing." One CTA (contact, or see a live demo). Pricing stays private (locked decision): no numbers on the page.

**Internal links:** down to each spoke (when written), across to SignalTrace and JobAbroad case studies, and to `open-questions/harness-vs-prompt-engineering`. Up-links from spokes/case-studies to this page get added when those are built.

**GEO requirements (this page must be citable by AI search):**
- First paragraph is a self-contained answer/definition (no "as mentioned above").
- Use clear question-style H2s where natural; consider a short FAQ block at the end (the plan calls for FAQPage schema on this page, the single biggest lever for AI Overviews).
- Concrete, attributable facts and numbers (AI engines cite specifics).

## Authorship: what to draft vs what John supplies

Per the project's CLAUDE.md, Claude does not invent John's first-person stance or genuine reflection. So:
- **Draft freely:** the factual scaffold, the mechanism explanations (the facts are in `project-evidence.md`), the structure, the plain-English service description.
- **Leave a flagged `[JOHN: ...]` placeholder** for: the personal opening hook if it draws on a real client story, any "what I learned / why I do it this way" stance, and the final first-person conviction lines. Mark them clearly so John fills them in his own words.
- Deliver it as a **draft for John to voice and approve**, not as final copy.

## Definition of done

- [ ] Reader-problem hook; self-contained first paragraph.
- [ ] Each mechanism explained with a real specific from `project-evidence.md`.
- [ ] Jargon translated (no naked "epistemic research").
- [ ] Proof section links to SignalTrace + JobAbroad with real numbers.
- [ ] One CTA, no pricing.
- [ ] Zero em-dashes; no hype vocabulary; first person throughout.
- [ ] `[JOHN: ...]` placeholders where genuine stance is needed.
- [ ] **Ran through `/humanizer`** and re-read aloud.
- [ ] FAQ block + note that FAQPage schema should be added on publish.

## Source files (read before writing)

- `content-planning/content-plan.md` — strategy, pages, pillar+spokes+proof, locked decisions, voice brief.
- `content-planning/project-evidence.md` — the source of truth. Section 0 = vault-builder (the machine). Section 5 = skills authorship. Sections 1-4 = the projects, with corrections to current public copy (e.g. JobAbroad has no CV upload; SignalTrace is 13 wikis on Quartz; the scanner is multi-role not three-role). Do not repeat those inaccuracies.
- Project CLAUDE.md (repo root) — identity rule (John = person, EdenFintech = business, DevAi = wiki), voice discipline, authorship constraints.
