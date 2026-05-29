---
title: AI for agencies
description: "I work behind the scenes for agencies whose client wants AI and whose team needs the depth to build it properly. I slot into your team, build the AI system end to end, or rescue a stuck build. White-label, with a harness your team can maintain. Proof from live products, not a pitch deck."
tags: [service, ai, agencies, white-label]
draft: false
date: 2026-05-29
order: 5
---

I am the AI specialist an agency brings in when the client has signed off on "AI" and the team needs someone who has built these systems before. I work three ways: I slot into your team for the build, I build the whole AI system end to end, or I take over a project that has stalled and get it shipping again. I can stay white-label, so to you and your client it is your team that delivered. You keep the relationship. Your client gets a system that holds up. Your team gets a codebase they can maintain after I leave.

## The problem

Your client wants AI, and you said yes, because saying no loses the account. Now it has to be built. Your team can stand up a chatbot in an afternoon and demo it. What they cannot do yet is architect the system underneath: the part that grounds answers in the client's real content, grades what is solid against what is guessed, keeps the model on script, logs every call so you can debug it, and does not fall over the first time a real user does something unexpected.

That gap is where AI projects die. The demo lands, everyone is happy, and then the build hits the hard parts. The model invents answers it cannot back up. There is no audit trail, so when something breaks nobody can tell why. The thing that looked done in the demo turns out to be the easy ten percent. The retainer keeps burning while your team learns AI engineering on your client's budget, and the deadline does not move.

A half-built AI project is worse than no project. It has a deadline attached, a client watching, and a team that is out of its depth on this specific thing while being perfectly good at everything else.

## How I slot in

Three modes. You pick the one that fits the engagement.

**Slot into your team.** Your developers own the project. I come in on the AI parts: the architecture, the retrieval layer, the model guardrails, the parts your team has not built before. I write the code alongside them and I write the harness so they can maintain it after I go. You do not end up with a black box only I understand.

**Build the system end to end.** You hand me the AI scope and I deliver it. Research vault, retrieval and cited answers, the agent pipeline, the database underneath, the audit trail. You and your client get a working system and a codebase your team can pick up. I hand over documentation written for the people who maintain it, not for me.

**Rescue a stuck or half-built project.** Something is bleeding the retainer and not shipping. I come in, read the existing code, find why it stalled, and either fix the path it is on or tell you straight if it needs rebuilding. The first deliverable is an honest read of where it actually stands, so you can make a call with your client instead of guessing.

In all three I can stay white-label and behind the scenes. Your client need not know an outside specialist was involved. To them, your team delivered, because in the modes where your team is involved, they did, on the parts that matter to the relationship.

The harness point is the one I hold to in every mode. I do not just write prompts that happen to work today. I build the structure around the model: schemas the output has to conform to, guards that treat user input as untrusted, logs of every call, fallbacks for when a call fails. That is what makes a build maintainable instead of a thing that only runs when the original author is in the room.

## What I bring

Depth across the whole stack, with the receipts on this site.

- **Research graphs.** [[services/research-graphs|vault-builder]], a method I have run across roughly 21 domains, turns a topic into an evidence-graded knowledge graph that grades every claim and surfaces what it has not researched yet. It is the engine behind two live products.
- **RAG portals.** Semantic search that returns cited answers grounded in the client's own content, built so a reader can check every claim against its source. Live and paid in [[case-studies/jobabroad|JobAbroad]].
- **Typed agent pipelines.** Multi-role LLM systems where the roles are enforced by type, not by polite instructions, with constrained JSON output and a full audit trail of every call. Running in [[case-studies/edenfintech-scanner|the EdenFintech scanner]].
- **Postgres-backed platforms.** The database as the spine: pgvector retrieval, atomic concurrency, and a 44-table line-of-business platform with the business rules enforced in the database itself. See [[case-studies/jobabroad|JobAbroad]] and [[case-studies/wecoza|WeCoza]].
- **Twenty-plus years shipping production work.** Through YourDesign I spent two decades delivering real software for real clients on deadline. The AI is recent. The discipline of shipping things that have to keep working is not.

The case studies are written from the code, not from a pitch deck. The numbers in them are measured.

## Proof

**[[case-studies/jobabroad|JobAbroad]]** is a live paid portal: a research vault wired into a members-only product with semantic search, cited answers, an AI coach, and async report generation, on Next.js and Supabase with pgvector.

**[[case-studies/edenfintech-scanner|The EdenFintech scanner]]** is a multi-role LLM research pipeline behind a type-enforced barrier, with constrained decoding and a full audit log of every model call. It is the proof that I keep models honest with code, not hope.

**[[case-studies/wecoza|WeCoza]]** is a 44-table Postgres platform running alongside WordPress, with natural-language-query to SQL behind a sandbox and a forensic audit pipeline. It is the proof I can build and hold together a large system that has to stay correct.

**[[method/index|The method]]** is the worldview behind all three: research systems built so trust is structural, with the evidence grade on every claim, the gaps made visible, and the model stopping instead of inventing more.

If you want the agency-side picture of how I work with your team and your client, see [[audiences/agencies|the agencies page]].

## Work with me

If your client wants AI and your team needs the depth to build it properly, bring me in. Tell me what the client signed off on, where the project stands, and which of the three modes fits, and I will tell you straight what it would take to ship it.

[Email me at info@devai.co.za](mailto:info@devai.co.za), or [see a live demo](https://demo.devai.co.za).
