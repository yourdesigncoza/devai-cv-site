---
title: Every claim should carry its evidence grade
description: "An evidence grade is a required field on every note in a research graph, marking each claim confirmed, alleged, or rumoured. The schema rejects ungraded notes, so an allegation is never recorded as fact. Here is how it works and where it ships: 780+ graded entity pages across 13 SignalTrace wikis, and the same discipline in the EdenFintech scanner."
tags: [method, spoke, evidence, knowledge-graphs]
draft: false
date: 2026-05-29
order: 12
---

An evidence grade is a label attached to a claim that says how much you should trust it: `confirmed`, `alleged`, or `rumoured`. In the research graphs I build, that grade is a required field on every note, enforced by the schema. You cannot save a note without it. The point is simple. When a claim and its confidence level travel together, a reader can tell at a glance what is verified, what is contested, and what is still just talk. An allegation never gets recorded as if it were a fact, because the system will not let you write one down without saying so.

This is one of the quality gates in [[method/index|the method]] I use to build living research graphs. Most of the gates are about coverage: finding blind spots, knowing when to stop, treating contradictions as findings. This one is about honesty. It is the difference between a research artefact you can hand to a lawyer and a wall of confident text you have to take on faith.

## What the grade actually does

When the machine creates a note, even a one-line stub for an entity it has only just named, it has to commit to an `evidence_strength` value in the frontmatter. There is no default and no "unknown" escape hatch that lets the question slide. The three grades mean what they say:

- `confirmed`: backed by a source I trust, on the record, in the note's source list.
- `alleged`: claimed by a source, but contested, single-sourced, or from a party with a stake in it.
- `rumoured`: circulating, worth tracking, not yet stood up by anything solid.

Because the field is required, the grade exists before the prose does. You decide how much you trust a claim at the moment you record it, not later when you have forgotten where it came from. And because every note carries one, you can read a whole graph and see its epistemic shape: which parts are bedrock, which parts are a house of cards. That is a property you cannot get from a chat answer, where confirmed fact and confident guess come out in the same flat tone.

## Why it is enforced, not encouraged

I have written enough research notes by hand to know that a discipline you have to remember is a discipline you will skip. Under deadline, the grade is the first thing that gets dropped, and the note that should have said "alleged" goes in bare and reads as fact six months later. So the rule lives in the schema, not in a style guide. A note without a grade does not save. The machine cannot route around it, and neither can I.

This matters most when a language model is doing the drafting. Left to its own habits, a model states a shaky claim and a rock-solid one with the same fluency. That fluency is exactly what makes AI research dangerous: it reads as authoritative whether or not it should. Requiring the grade forces the uncertainty back to the surface. The model can write the sentence, but it cannot pretend the sentence is settled when it is not. The honesty is structural, baked into the format, rather than a tone I am trusting the model to adopt.

There is a practical edge to this too. If you are researching people and organisations, the gap between "confirmed" and "alleged" is the gap between a defensible note and a libel risk. Grading every claim is not a nicety. It is the thing that lets the graph be useful in situations where being wrong has a cost.

## Where it ships

This is not a rule I admire in theory. It runs in production.

[[case-studies/signaltrace|SignalTrace]] is the clearest proof. It is a set of thirteen independent research wikis, and more than 780 entity pages across them carry an `evidence_strength` value in their frontmatter. Those grades drive how the pages read and connect: a claim's confidence is visible on the claim, across hundreds of entities and roughly 1,377 cited sources. The grading is not a sample or a pilot. It is the standing discipline of the whole corpus, and it is live at [signaltrace.wiki](https://www.signaltrace.wiki/).

The same instinct shows up in a different shape in [[case-studies/edenfintech-scanner|the EdenFintech scanner]], which applies this thinking to quant research instead of entity research. There the constraint is in the output format itself. Every LLM stage writes against a JSON schema with `additionalProperties: false` and explicit enums, so a model cannot smuggle in a field or a value the schema did not sanction. The scanner also orders its reasoning conservative-first: the bear case before the bull case, the worst case before the base case, or it retries. Different mechanism, same worldview. Make the format carry the discipline so the model cannot quietly upgrade a guess into a conclusion.

[JOHN: if you have a concrete moment where a graded claim saved you, or where ungraded research burned someone, one or two sentences in your own voice would land hard here. Leave blank and the section stands on the SignalTrace numbers.]

## The difference this makes

A reader of one of these graphs is never asked to guess my confidence. It is printed next to the claim. A claim graded `rumoured` invites a different response than one graded `confirmed`, and the reader gets to make that call with the right information instead of being lulled by uniform fluency. That is the line between a research graph you can act on and the kind of confident AI output that sounds right until the one time it matters that it was not.

If you have a topic where the difference between confirmed and alleged carries real weight, that is exactly the kind of research surface this method is built for. [Email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to understand. The full picture is on [[method/index|the method]] page, and you can see the grading at scale in the [[case-studies/signaltrace|SignalTrace]] case study.
