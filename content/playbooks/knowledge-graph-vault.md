---
title: Building a knowledge-graph research vault
description: "Start with a research brief, end with a navigable Obsidian vault published as a public wiki. The iterative loop between them, with a convergence criterion that knows when to stop."
tags: [playbook, obsidian, quartz, knowledge-graph, research]
draft: false
date: 2026-04-22
---

Every knowledge-graph wiki I've built — [[projects/signaltrace-site|SignalTrace]], the [[projects/insider-signal-research|insider-signal research programme]], this CV wiki — came out of the same loop. A research brief on one end, an Obsidian vault on the other, an iterative discovery pass in the middle that knows when to stop.

## The shape

```
research-brief.md
  │
  ▼
┌─ loop ──────────────────────────────────┐
│                                         │
│  read goal + existing vault state       │
│         │                               │
│         ▼                               │
│  propose next entities / questions      │
│         │                               │
│         ▼                               │
│  pull evidence, write entity notes      │
│         │                               │
│         ▼                               │
│  update graph, update open-questions    │
│         │                               │
│         ▼                               │
│  convergence check: new evidence?       │
│         │                               │
│         └── yes ──► continue            │
│         │                               │
│         └── no, or iter_cap hit ──► done│
│                                         │
└─────────────────────────────────────────┘
  │
  ▼
vault/
├── index.md
├── People/
├── Organisations/
├── Events/
├── Concepts/
├── open-questions/
└── GRAPH_REPORT.md

  │
  ▼ (quartz build)
publishable wiki
```

## The research brief

Plain markdown. No schema. States:

- **Goal** — what the investigation is trying to answer
- **Seed entities** — named people, companies, events, or concepts to start from
- **Source constraints** — any stated source preferences (only public filings, only news after date X, etc.)

The brief is the contract. Drift from the brief shows up in the convergence check and prompts a re-read of the goal, not a vault rewrite.

## Entity taxonomy — 5–7 folders, fixed up front

The decision that matters most early is the folder taxonomy. Once you commit to `People / Organisations / Events / Concepts / Vehicles / Symbols`, every wikilink in the vault references one of those categories. Changing the taxonomy two weeks in is a major refactor.

For financial / OSINT topics the [[projects/signaltrace-site|SignalTrace]] taxonomy has held up well. For technical research — this CV wiki itself — the taxonomy shifts to `Skills / Projects / Decisions / Notes / Playbooks / Influences / Open Questions`. Different domains, same principle: fixed categories, consistent folder per entity type.

## The iteration loop

Each iteration does three things:

1. **Propose.** Read the goal, the existing vault state, and the `open-questions/` folder. Pick the next 3–5 entities or questions that would move the investigation forward. Write the proposal to the session log.
2. **Pull and write.** For each proposed target, search sources, extract evidence, write an entity note. Every note ends with a "Sources" block citing where each claim came from.
3. **Update the graph.** New entity notes get wikilinked from their neighbours. Questions that got answered move from `open-questions/` to the relevant note. Questions that surfaced during the iteration get added.

## The convergence check

A loop that never terminates is a loop that can't ship. The convergence check at the end of each iteration asks one thing:

**Did this iteration produce new evidence, or did it mostly re-tread existing ground?**

If three iterations in a row answer "mostly re-tread", the investigation has converged. Write the `GRAPH_REPORT.md` summary and stop. There's also a hard `iter_cap` (typically 20–30) as a second-line kill switch.

Knowing when to stop is the non-obvious part. A vault that keeps growing forever is doing two bad things: diluting signal and burning research hours. Convergence is a deliverable.

## Publishing through Quartz

Once the vault converges, Quartz 4 renders it as a static site. Wikilinks resolve natively. The graph view becomes the reader's actual navigation surface — graph first, prose second.

`scripts/build-all.mjs`-style orchestration lets one repo serve many vaults if you end up with a series of case studies. On [[projects/signaltrace-site|SignalTrace]] there are five case studies (sa-corruption, alfaromeo, strait-of-hormuz, paypal, attbid) built from one shared Quartz config, 308 markdown files in total.

## Autonomous mode

For a brief that's well-formed, the whole loop runs unattended. Input: a research brief file and an `iter_cap`. Output: a converged vault, a `GRAPH_REPORT.md`, and a `open-questions/` folder of what remains open.

```
/vault-builder --auto --goal-file "research-brief.md" --iter-cap 25
```

The autonomous runs where the brief was too thin have a characteristic failure mode: the early iterations wander, and the convergence check keeps firing "new evidence" on tangentially-related entities. The fix is always to tighten the brief and restart, not to fight the loop.

## What this is good for

- **OSINT / financial research** — the [[projects/signaltrace-site|SignalTrace]] shape.
- **Internal company knowledge** — team wikis where the ontology is "people, projects, decisions, incidents".
- **Case study sites** — multiple vaults from one Quartz config.
- **Personal knowledge graphs** — this CV wiki started as exactly this pattern.

## What it isn't

- A general-purpose web scraper (the loop assumes a defined ontology)
- An agent that keeps running forever (convergence is enforced)
- A substitute for domain expertise (the research brief still has to be good)

## See also

- [[projects/signaltrace-site|SignalTrace]] — the fullest version of this pattern in production.
- [[projects/insider-signal-research|InsiderSignalResearch]] — the same pattern applied to quant research, with an explicit "this is shelved" outcome instead of a publishable wiki.
- [[skills/knowledge-graphs-wiki-systems|Knowledge Graphs & Wiki Systems]] — the speciality hub this playbook belongs to.
