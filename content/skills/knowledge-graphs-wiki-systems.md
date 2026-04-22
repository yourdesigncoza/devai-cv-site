---
title: Knowledge Graphs & Wiki Systems
tags: [skill, knowledge-graph, quartz, obsidian]
draft: false
---

# Knowledge Graphs & Wiki Systems

> "Most research sells you an answer. Epistemic research sells you a better-formed question."
>
> — [[projects/signaltrace-site|signaltrace-site]], `index.html`

## What this looks like for me

I keep building the same pattern: an Obsidian vault that turns a collection of sources into a navigable wiki, published through Quartz 4. The vault carries the editorial work — an entity taxonomy (People / Organisations / Events / Concepts / Vehicles / Symbols), an index page per topic, shared conventions for open questions and citations, a graph that earns its place by actually being used. Quartz does the rendering; the thinking lives in how the content is organised.

[[projects/signaltrace-site|signaltrace-site]] is the fullest version of this. Five case studies, 308 markdown files across People/Organisations/Events/etc., hand-authored landing page, a locked visual palette, a `scripts/build-all.mjs` orchestrator that runs Quartz once per wiki against a shared config. The content strategy document defines five content pillars and a 60-day topic calendar. This CV site you are reading uses the same pattern — skill hubs, project notes, decisions, a graph that connects them.

[[projects/insider-signal-research|InsiderSignalResearch]] runs the idea in a different register: an append-only experiment leaderboard, versioned markdown investment plans, a research-sprint framework where each agent role is a markdown file with its own scope and data-discipline rules. The shape is the same — information organised so that the graph and the writing do the work a dashboard usually tries to do.

## Projects that back this

- [[projects/signaltrace-site|signaltrace-site]] — multi-wiki Quartz 4 site over five OSINT case studies, shared entity taxonomy, locked brand palette, custom build orchestrator.
- [[projects/insider-signal-research|InsiderSignalResearch]] — research-sprint framework, experiment leaderboard, versioned plan documents, agent roles as markdown files.
- This CV site — hand-written Quartz vault with skills as hubs and projects as evidence.

## Decisions that shaped how I do it

*More decision pages planned — this hub will pick up backlinks as they land.*

## What I'm usually asked to do

- Set up an Obsidian vault for a research topic and publish it as a navigable public wiki
- Design an entity taxonomy that fits the actual sources instead of a generic ontology
- Wire a shared Quartz build to serve multiple wikis from one repository
- Move a chaotic folder of research notes into a structured vault with backlinks and a useful graph
