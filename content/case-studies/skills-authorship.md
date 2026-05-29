---
title: Skills authorship
description: "Authoring a skill means writing the rules, scripts, and guardrails an AI agent reads before it acts, so it follows a project's real conventions instead of being re-prompted each time. I have authored eight personal workflow skills, three larger engines (vault-builder, infranodus, graphify), and a full Claude configuration embedded inside a client codebase. This is the harness-over-prompt thesis with the artifacts behind it."
tags: [case-study, ai, tooling, claude-code]
draft: false
date: 2026-05-29
order: 5
---

Authoring a skill means writing the rules, scripts, and guardrails an AI agent reads before it does any work, so it follows a project's real conventions automatically instead of being re-prompted from scratch each session. A skill is a checked-in file (or set of files) that says "in this codebase, here is how we fix bugs, here is the test surface, here is how we talk to the client." The model still does the reading and writing. The skill keeps it on-rails. This page is the receipts: the skills I have authored for my own work, the larger engines behind the method, and a full agent configuration I shipped inside a client's codebase.

This is the concrete version of a thread that runs through everything on this site: I build the harness around the model, not just the prompt I send it. See [[open-questions/harness-vs-prompt-engineering|harness vs prompt engineering]] for where I think the long-term leverage actually sits.

## The problem

Re-prompting does not scale. If the way you get good output is to paste the same context, conventions, and warnings into the model every time, you pay that cost on every session, and you pay it again every time you forget a detail. Worse, the model drifts. Without the project's real rules in front of it, an agent will reach for the generic answer: the wrong test command, a database call that ignores the project's data layer, a client email written in engineer-speak. The fix is not a longer prompt. It is to move the rules out of the prompt and into a file the agent reads before it acts, so the constraints hold whether or not you remembered to restate them.

## What I built

All the line counts below were measured by reading the directories, not estimated.

### Personal workflow skills

Eight active skills (one deprecated) that automate my own work, under the `ydcoza-*` prefix:

- `ydcoza-plan` (7 files, ~853 lines): a file-driven phased planning framework. Each phase reads and writes a file, so a long task is crash-resumable, and a second model (Gemini) reviews the plan before execution.
- `ydcoza-teams-planning` (3 files, ~491 lines): spawns a three-role team (Researcher, Architect, Critic) to produce dependency-aware plans.
- `ydcoza-seo` (~492 lines): the SEO playbook, the same one being applied to this site.
- `ydcoza-linkedin-engagement` (3 files, ~407 lines, 1 script): topical engagement that runs through a rate-limited, audit-logged browser-control wrapper. Hard caps of 6 calls per 60 seconds and 30 per 600 seconds, with block-signal detection that stops on the first sign of a challenge page.
- `ydcoza-gemini` (~203 lines): cross-model review, asking Gemini to critique Claude's work before acting on it.
- `ydcoza-git-actions` (~158 lines): a safe commit and push workflow.
- `ydcoza-agent-teams` (~74 lines): the entry point for multi-agent orchestration.
- `ydcoza-linkedin-post` (~76 lines): marketing-post drafting from codebase context.

### The larger engines

Three authored skills do heavier lifting:

- `vault-builder` (11 scripts, ~5,837 lines): the research-graph machine behind [[method/index|the method]]. It turns a topic into an evidence-graded, audited knowledge graph that finds its own blind spots and stops when it has run out of real findings.
- `infranodus` (6 scripts, ~2,172 lines): text-network analysis (betweenness centrality, community detection, structural-gap detection). It is the engine vault-builder calls to decide what to research next.
- `graphify` (~1,214 lines): turns any input into a clustered knowledge graph with HTML, JSON, and an audit report.

### The WeCoza-embedded setup

The clearest proof sits inside a client codebase. The WeCoza plugin ships a full Claude configuration in its `.claude/` directory, so any agent working in that repo follows that project's rules without being told them. These are not generic skills. They encode one codebase's conventions:

- 5 codebase-specific skills: `ydcoza-bug-fix` (~663 lines, works the bug and ticket queue), `ydcoza-feature-build` (~532 lines, works the feature queue), `using-trello-cli` (~500 lines, drives the project's Trello board), `ydcoza-playwright-local` (~356 lines, CRUD smoke tests across agents, clients, classes, learners, and locations), and `ydcoza-wecoza-feedback` (~87 lines, turns a technical fix into a client-friendly explanation).
- 4 slash commands: `daily-report`, `debug`, `playwright-full-test`, `ui-audit`.
- An embedded `ydcoza-devvault` plugin and a `devvault-gate.py` hook.

That is the distinction made concrete. The personal skills automate my workflow. The WeCoza setup encodes one project's ticket queue, its CRUD test surface, and its client-comms tone, so an agent stays on-rails in that codebase automatically. See [[case-studies/wecoza|WeCoza]] for the codebase those rules govern.

## What it proves

The quality gates that make my work trustworthy live in code, not in prompts. A planning framework that survives a crash because each phase is a file. A browser wrapper that refuses to exceed a rate cap. A bug-queue worker that knows the project's conventions before it touches anything. When the model changes, or the team changes, or I forget a detail at 2am, the harness still holds.

This is the artifact behind the argument I make in [[method/index|the method]] and in the spoke [[method/build-the-harness-not-just-prompts|build the harness, not just prompts]]: the difference between prompt engineering and AI engineering is whether the rules live in a throwaway message or in something checked in. I think out loud about where that leverage sits long-term in [[open-questions/harness-vs-prompt-engineering|harness vs prompt engineering]].

## Work with me

If you want an AI setup that follows your codebase's rules instead of guessing at them, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what your agents keep getting wrong.
