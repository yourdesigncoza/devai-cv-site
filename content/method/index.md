---
title: How I build living research graphs you can trust
description: "Most AI research sounds confident and is often wrong. I build research graphs that grade every claim as confirmed, alleged, or rumoured, surface what they have not researched yet, and stop instead of inventing more. Here is the method, and the proof it ships."
tags: [method, pillar, research-graphs, ai, knowledge-graphs]
draft: false
date: 2026-05-29
order: 1
---

A living research graph is a navigable map of a topic that shows how the people, organisations, and events connect, grades every claim as confirmed, alleged, or rumoured, and tells you what to dig into next. I build them with a method that does the one thing most AI research will not: it admits what it does not know. This page is how that method works, and the proof it has shipped into real products.

Most AI research tools have the opposite problem. They sound confident and are often wrong, and you cannot tell which parts are verified, which are guessed, and which are simply missing. That is fine for a first draft. It is not fine when a decision rides on it. The fix is not a better prompt. It is a system built so that trust is structural: the evidence grade travels with the claim, the gaps are visible, and the machine stops when it has run out of real findings instead of padding the answer.

> [!note]
> [JOHN: optional 2-3 sentence personal opening. If there is a real moment that made you build this way (a research job where the confident answer turned out wrong, a client who got burned by AI slop), put it here in your own words. It earns the rest of the page. Leave blank and we cut straight to "What I build" if you would rather not.]

## What I build

You give me a topic, three to five starting entities, and the sources you trust. I run the machine. You get an Obsidian knowledge graph you can open, search, and navigate, where:

- Every connection is an explicit claim. A link from one entity to another means "these two are related, and here is why," not a loose association.
- Every claim carries an evidence grade. Confirmed, alleged, or rumoured, on the record, so you never mistake a rumour for a fact.
- The graph surfaces its own blind spots. It tells you which central thing it has not researched yet, ranked by how much it matters to the rest of the map.
- It keeps growing. Run another round and it extends itself. Stop, and you have an audited snapshot with a clean bill of health.

The output is not a chat transcript you have to trust on faith. It is a structured artefact you can audit, hand to a colleague, and come back to in six months.

The engine is [[playbooks/knowledge-graph-vault|vault-builder]], a tool I built and have run across roughly 21 domains. It is the same machine behind [[case-studies/signaltrace|SignalTrace]] and behind the research vault inside [[case-studies/jobabroad|JobAbroad]]. So this is one method I have proven on a lot of topics and shipped into products people use, not four unrelated builds.

## How it works

The method is a loop: research a round, analyse the graph, find the gaps, decide what is worth a closer look, research again, and stop when the graph stops growing. What makes the output trustworthy is a set of quality gates baked into that loop, each one a rule the machine cannot skip. The mechanisms below are the real ones, thresholds and all. I publish them on purpose, because being able to see how the graph polices itself is what makes it worth trusting.

### Wikilinks are the product

In a vault-builder graph, a `[[link]]` is not decoration. It is a claim about a relationship, and the web of those claims is the actual output. An unresolved link is not a broken reference to fix. It is the next research target, the machine pointing at something it has named but not yet investigated. Most tools treat the prose as the product and the structure as a by-product. I do it the other way around.

More on this in [[method/wikilinks-are-the-product|wikilinks are the product]].

### It finds its own blind spots

The machine catches the thing it has been avoiding. A small script (`detect_hollow_hubs.py`) looks for notes that lots of other notes point to but that are themselves still thin. In graph terms, high betweenness centrality and three or more inbound links, but almost no content of their own. Those "hollow hubs" are flagged as the most urgent thing to research next, ranked by how central they are. The graph knows what it does not yet know, and says so.

More on this in [[method/finds-its-own-blind-spots|a research tool that finds its own blind spots]].

### Every claim carries an evidence grade

You cannot create a note, not even a one-line stub, without committing to an evidence grade: `confirmed`, `alleged`, or `rumoured`. It is a required field, enforced by the schema, not a habit I hope to keep. An allegation never gets written down as though it were a fact. When you read the graph, the confidence level is right there on every claim.

More on this in [[method/evidence-grade-on-every-claim|every claim carries its evidence grade]].

### Knowing when to stop

This is the hard part, and the part most AI gets wrong. A convergence check (`check_convergence`) watches each round and distinguishes "found genuinely new facts" from "reshuffled what it already knew." When new notes drop below two for two rounds running and the gap count holds steady, it stops. It would rather hand you a smaller, honest graph than keep generating plausible filler. That restraint lives in the code, not in a hope that the model behaves.

More on this in [[method/knowing-when-to-stop|knowing when to stop is the hard part]].

### Contradictions are findings, not errors

When two trusted sources disagree, the machine does not quietly pick one and move on. It writes the disagreement down as a `Conflict` block and opens a question about it. A contradiction between credible sources is often the most interesting thing in the whole topic, so it gets treated as a finding to investigate, never an error to paper over.

More on this in [[method/contradictions-are-findings|treat contradictions as findings, not errors]].

### The audit and the health scorecard

Before a graph is finished, every note is re-read against its own sources (`resolve_wikilinks.py`). When a fact gets corrected, the correction is propagated to every other note that references that entity, so the graph cannot hold two versions of the same fact. Orphaned and phantom files are deleted. Then a Vault Health scorecard runs, and it has to read all zeros: no broken links, no heading-only stubs, no orphan files. That scorecard is the trust certificate that comes with the graph. If it does not read clean, the graph is not done.

## Proof it ships

This is not a prototype I demoed once. The same method is running in two live products.

**[[case-studies/signaltrace|SignalTrace]]** is the method published. Thirteen independent research wikis, 912 markdown files, more than 780 entity pages each carrying an evidence grade, assembled by a custom multi-wiki build I wrote on top of Quartz. One configuration, thirteen sites. It is live at [signaltrace.wiki](https://www.signaltrace.wiki/).

**[[case-studies/jobabroad|JobAbroad]]** is the method productised. A research vault wired into a paid, members-only portal: semantic search over the content with cited answers, a readiness assessment, and an AI coach that runs on the same graph. Built on Next.js and Supabase with pgvector. It is a working business, not a demo.

The numbers on those pages come from reading the code, not from a pitch deck.

## The harness, not just the prompt

The reason this works is that I build the system around the model, not just the prompt I send it. The quality gates above are code: schemas that reject ungraded notes, a script that finds blind spots, a convergence rule that says stop. The model does the reading and writing. The harness keeps it honest. That is the difference between prompt engineering and AI engineering, and it is a thread that runs through everything I build, from the [[case-studies/edenfintech-scanner|EdenFintech scanner]] to the skills I author for my own work.

I think out loud about this distinction in [[open-questions/harness-vs-prompt-engineering|harness vs prompt engineering]].

> [!note]
> [JOHN: one short paragraph of genuine conviction here, in your voice. Why you would rather ship a smaller honest graph than an impressive wrong one. This is the line that makes a reader trust you over a slicker competitor. Keep it plain. No slogan.]

## Read deeper

Each mechanism above has its own page, where I show the real algorithm and why it earns its place.

- [[method/wikilinks-are-the-product|Wikilinks are the product]]
- [[method/finds-its-own-blind-spots|A research tool that finds its own blind spots]]
- [[method/evidence-grade-on-every-claim|Every claim should carry its evidence grade]]
- [[method/knowing-when-to-stop|Knowing when to stop is the hard part]]
- [[method/contradictions-are-findings|Treat contradictions as findings, not errors]]

The same engineering discipline shows up beyond research graphs:

- [[method/llms-behind-typed-contracts|LLMs behind typed contracts, not vibes]]
- [[method/why-ai-projects-die-after-the-demo|Why AI projects die after the demo]]
- [[method/postgres-is-the-spine|Postgres is the spine]]
- [[method/build-the-harness-not-just-prompts|Build the harness, not just prompts]]

## Common questions

**What do you actually need from me to start?**
A topic, three to five seed entities to anchor the research, and the sources you want me to rely on or avoid. That is enough to run the first round.

**Can I see what is verified versus guessed?**
Yes. Every claim in the graph is graded confirmed, alleged, or rumoured, and the grade is visible on the claim itself. Source conflicts are written up as their own findings.

**Does the research ever finish?**
A round finishes with an audited snapshot and a clean health scorecard. The graph itself is living: you can run more rounds later and it extends from where it stopped, rather than starting over.

**What stops it from making things up?**
Three things working together: a convergence rule that stops it once real findings dry up, an evidence grade required on every claim, and a final audit that re-reads every note against its sources. The constraints are in the code, not in a prompt.

**Is this only for finance or OSINT topics?**
No. It has run across roughly 21 domains. The loop and the quality gates are general. The entity types and source rules are tuned per topic.

## Work with me

Give me a topic, three to five starting entities, and your sources. I run the machine. You get an evidence-graded, audited research graph that keeps growing, with a health scorecard that proves it holds together.

If that is the kind of research surface you need, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to understand. You can also [see a live demo](https://demo.devai.co.za) or read how the method shipped in the [[case-studies/signaltrace|SignalTrace]] and [[case-studies/jobabroad|JobAbroad]] case studies.

<!-- TODO(GEO): add FAQPage JSON-LD covering the "Common questions" block above when schema support lands in the layout. -->
