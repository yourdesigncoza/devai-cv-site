---
title: Build the harness, not just prompts
description: "Prompt engineering is the instructions you repeat to a model each time. A harness is the tooling around the model that encodes the rules once, so the model stays on-rails automatically. Here is what that looks like in real authored skills, and why the harness is what I build."
tags: [method, spoke, ai, tooling]
draft: false
date: 2026-05-29
order: 18
---

The difference between prompt engineering and building a harness is where the rules live. Prompt engineering puts the rules in the message you send: you describe what you want, the model does its best, and you correct it next time by writing a better message. A harness puts the rules in the tooling around the model: a schema that rejects bad output, a script that checks the work, a configuration the model loads before it starts. With a prompt, the model is told what to do. With a harness, the model operates inside a system that will not let it do the wrong thing. The first is instructions you repeat. The second is a system the model runs inside.

I build the harness. This page shows what that means in practice, with the real tooling behind it.

## What a skill actually is

In Claude Code, a "skill" is authored tooling: a folder of instructions, scripts, schemas, and rules that the model loads and follows automatically when a task matches. It is not a saved prompt. It is closer to a small program that the model executes against, where some steps are deterministic code and some steps are the model reading and writing. Once a skill exists, the rules it encodes apply every time, without me re-typing them.

I have eight active personal skills in this style (the `ydcoza-*` family), each one encoding a workflow I do not want to re-explain on every run:

- `ydcoza-plan` (around 853 lines across 7 files) is a file-driven planning framework. Each phase reads and writes a real file, so a plan is crash-resumable and survives a context reset. The model does not improvise the process. The process is the skill.
- `ydcoza-linkedin-engagement` (around 407 lines plus a script) runs topical engagement through a rate-limited, audit-logged browser wrapper: 6 calls per 60 seconds, 30 per 600 seconds, with block-signal detection that stops on a security check or a login wall. The caps and the audit log are in the wrapper, not in a prompt asking the model to be careful.
- `ydcoza-gemini` (around 203 lines) pulls a second model in to critique the first model's work before I act on it. Cross-model review, made a step rather than a hope.

Then there are the larger engines, same authored style, more machinery:

- `vault-builder` is around 5,837 lines across 11 scripts. It is the research-graph machine the rest of [[method/index|my method]] is built on, with schema-enforced evidence grading, hollow-hub detection, and a convergence rule all living in code.
- `infranodus` is around 2,172 lines across 6 scripts. It does the text-network analysis (betweenness centrality, community detection, structural-gap detection) that vault-builder calls during graph analysis.

These automate my own work. The stronger proof of the harness idea is what happens when I ship it into someone else's codebase.

## A harness shipped inside a client codebase

Inside the WeCoza plugin (`wecoza-core/.claude/`) there is a full Claude configuration that travels with the code. Any agent working in that repository loads it and follows that project's rules automatically. None of it is generic. All of it encodes WeCoza's specifics:

- Five codebase-specific skills: a bug-queue worker (`ydcoza-bug-fix`, around 663 lines) that pulls from the project's ticket queue, a feature-queue worker (`ydcoza-feature-build`, around 532 lines), a Trello driver (`using-trello-cli`, around 500 lines) that operates the project's actual board, a Playwright CRUD smoke-test suite (`ydcoza-playwright-local`, around 356 lines) that exercises agents, clients, classes, learners, and locations, and a translator (`ydcoza-wecoza-feedback`, around 87 lines) that turns a technical fix into a client-friendly explanation in the right tone.
- Four slash commands (`daily-report`, `debug`, `playwright-full-test`, `ui-audit`).
- An embedded `ydcoza-devvault` plugin and a `devvault-gate.py` hook.

The point of all of it: the harness encodes that project's ticket queue, its CRUD test surface, and its client-communication tone, so any agent working there stays on-rails without me writing a fresh prompt for the situation. A new session does not need me to explain how WeCoza tracks work, what to smoke-test, or how to talk to the client. It loads the rules and gets on with it.

A prompt would describe the ticket queue to one agent in one session. The skill makes the ticket queue something every agent operates inside, in every session, the same way.

## The quality gates are themselves a harness

The same idea runs through the research method on this site. The vault-builder quality gates are not instructions I send the model. They are the harness:

- Evidence grading is a required schema field. You cannot create a note, not even a one-line stub, without committing to `confirmed`, `alleged`, or `rumoured`. The schema rejects an ungraded note. There is no prompt asking the model to please remember to grade things.
- Hollow-hub detection (`detect_hollow_hubs.py`) catches the model's own blind spots, flagging notes that everything points to but that are still thin, ranked by how central they are.
- Convergence detection (`check_convergence`) decides when to stop, distinguishing genuinely new findings from reshuffled old ones, so the machine hands over a smaller honest graph instead of padding the answer.

If I tried to do that with prompting, I would be writing "remember to grade every claim, remember to check for thin hubs, remember to stop when you run out of real findings" on every single run, and the model would skip one of them eventually. The harness does not skip. The rule is in the code, so it holds whether I am watching or not.

## Why I bet on the harness

Prompts go stale. Every time a model changes, the wording that worked stops working, and you re-tune. A schema that rejects an ungraded note does not care which model is behind it. A convergence script does not drift when the base model gets better at following loose instructions. The harness is the part of the system that survives a model upgrade, a new teammate, and a codebase that has moved on six months later. That is where I think the compounding return lives, though I hold the view loosely and think out loud about the trade-off in [[open-questions/harness-vs-prompt-engineering|harness vs prompt engineering]].

[JOHN: one short paragraph of genuine conviction here, in your own words. The honest version of why you reach for tooling over a cleverer prompt, ideally tied to a moment where a prompt-only approach burned you or a harness saved a run. This is the line a reader trusts you on. Keep it plain, no slogan.]

You can see the full inventory of authored skills in [[case-studies/skills-authorship|skills authorship]], and the client-embedded configuration in context in [[case-studies/wecoza|WeCoza]].

If you are working with AI on code or research you expect to keep for a while and you are tired of re-prompting the same rules, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what keeps going off the rails. That is usually the thing worth building a harness around.
