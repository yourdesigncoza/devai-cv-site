---
title: SignalTrace
description: "SignalTrace is thirteen independent research wikis published from Obsidian vaults through a custom multi-wiki build on Quartz: 912 markdown files, 780+ entity pages each carrying an evidence grade. It is the method published."
tags: [case-study, knowledge-graph, quartz]
draft: false
date: 2026-05-29
order: 1
---

SignalTrace is thirteen independent research wikis published from a set of Obsidian vaults through a custom multi-wiki build I wrote on top of Quartz. It runs 912 markdown files and roughly 40,600 lines of content, with more than 780 entity pages that each carry an evidence grade in their frontmatter. It is the public face of [[method/index|the method]]: the same vault-builder output behind [[case-studies/jobabroad|JobAbroad]], rendered into navigable, evidence-graded sites you can read at [signaltrace.wiki](https://www.signaltrace.wiki/).

## The problem

A lot of research is wasted because the most useful thing it produces is not an answer, it is a better-shaped question. You start on a topic, find a name that keeps coming up, and realise the thing everyone references is the thing nobody has actually pinned down. A chat transcript cannot hold that. It gives you a confident paragraph and no way to tell which parts are verified, which are guessed, and which central thread is still missing.

The harder problem is scale. Doing this across one domain by hand is slow. Doing it across thirteen, each with its own entities, its own sources, and its own taxonomy, and keeping every site fast, searchable, and consistent, is where a hand-built approach falls over. SignalTrace is what it looks like when the research discipline of [[method/index|the method]] and the build that publishes it are both solved at once.

## The architecture

The thirteen wikis are not thirteen codebases. They are one Quartz configuration run thirteen times.

- **One config, thirteen builds.** A custom build harness (`scripts/build-all.mjs`) runs the same Quartz config once per wiki, scoped by a `QUARTZ_BASE_URL` environment variable, and assembles the output tree by hand into one deployable site. Adding a fourteenth wiki is a content decision, not a code change.
- **Split content index for first paint.** A site with 900+ pages cannot ship its full-text search index on every page load. The build emits two indexes: a lean `contentIndex.json` that the graph and explorer read on every load, and a full-text `contentIndex.search.json` that is lazy-loaded only when a reader opens search. The expensive payload is deferred until someone actually wants it.
- **The graph renders only when you look at it.** The knowledge graph is a D3 force simulation rendered to a PixiJS canvas, which is costly to draw. An IntersectionObserver plus requestIdleCallback (with a Safari setTimeout fallback) holds that render back until the graph scrolls into view, so it never blocks the rest of the page.
- **A hand-built Obsidian-Flavored-Markdown transformer.** Obsidian's markdown is not standard markdown. A transformer I wrote (`ofm.ts`, roughly 793 lines of mdast and hast work) handles wikilinks with aliases and anchors, embeds, callouts, block references, and table-cell escaping, so the vaults render the way they read inside Obsidian.
- **Structured frontmatter as a research discipline.** Every entity page carries `type`, `evidence_strength` (confirmed, alleged, rumoured), and a `sources[]` list. Across the thirteen wikis that is more than 60 distinct entity types and roughly 1,377 source URLs. The grade and the sources travel with the claim, on the page, where a reader can see them.

That last point is where SignalTrace stops being a build story and becomes a method story. The frontmatter is not metadata for the renderer. It is the evidence grading from [[method/index|the method]], carried all the way through to the published page.

## What it proves

SignalTrace is [[method/index|the method]] published. The research discipline produces the vaults, and a custom build turns them into thirteen fast, searchable, evidence-graded sites without thirteen separate codebases to maintain.

It is one of two live proofs of the same machine. Where SignalTrace publishes the research as open wikis, [[case-studies/jobabroad|JobAbroad]] wires a vault into a paid, members-only portal with semantic search and an AI coach. Same output, two surfaces.

For the underlying capabilities, see [[skills/knowledge-graphs-wiki-systems|Knowledge Graphs & Wiki Systems]] for the research-graph and rendering work, and [[skills/design-brand|Design & Brand]] for the build that turns a vault into something readable.

[JOHN: optional one-paragraph reflection in your voice. A good angle: what you learned building thirteen sites from one config, or the moment the split-index work paid off, or why publishing the evidence grades openly matters to you. Keep it plain, no slogan. Leave blank and the page ends on the CTA.]

If you have a topic that needs this kind of research surface, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to understand. You can also read [[method/index|the method]] behind it, or browse the live wikis at [signaltrace.wiki](https://www.signaltrace.wiki/).
