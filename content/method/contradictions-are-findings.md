---
title: Treat contradictions as findings, not errors
description: "When two trusted sources disagree, my research graph writes the disagreement down as a Conflict block and opens a question about it, instead of silently picking one answer. The contradiction is treated as a finding to investigate, often the most interesting thing in the topic."
tags: [method, spoke, research, knowledge-graphs]
draft: false
date: 2026-05-29
order: 14
---

Treating a contradiction as a finding means that when two sources you trust disagree about a fact, the disagreement gets recorded as its own piece of evidence rather than resolved in silence. The machine does not quietly pick the source it likes and move on. It writes a `Conflict` block into the note, naming both versions and where each came from, and it opens a question about which one holds. The contradiction is data. It tells you something real about the topic, namely that the record is not settled, and that is worth knowing before you act on either version.

This is one of the quality gates inside [[method/index|the method]]. It exists because the most common failure of AI research is not making things up out of nothing. It is collapsing genuine disagreement into one confident sentence and discarding the fact that anyone disagreed at all.

## What the machine actually does

When a research round turns up two sources that conflict on a fact, the vault-builder graph does two things in the same step.

First, it writes the disagreement into the note itself, as a block that says both sides plainly:

> **Conflict:** Source A dates the acquisition to 2019; Source B (the company's own filing) dates it to 2020. Unresolved.

Both claims stay on the page. Neither gets deleted to make the note read cleanly. A reader sees the fork in the record exactly where the fact lives, with the grade and the source attached to each side, so they can judge it themselves.

Second, it opens a question about the conflict. That question becomes a research target, the same way an unresolved [[method/wikilinks-are-the-product|wikilink]] becomes one. The next round can pull a third source, check a primary document, or weigh the credibility of each side. If the conflict resolves, the note is updated and the correction propagates through the audit. If it does not resolve, it stays on the record as an open conflict, which is an honest state for a fact to be in.

So a contradiction never triggers a silent decision. It triggers a written record and a question. The disagreement is preserved as a finding, not papered over as an error.

## Why most summarisers flatten disagreement

A typical AI summariser is built to produce one smooth answer. You ask it a question, it reads its sources, and it returns a paragraph that sounds settled. When the sources disagree, the model still has to emit a single fluent sentence, so it does what fluency demands: it picks a version, or it averages them into something vague, and it drops any mention that there was a fight. The output reads confident because the disagreement was edited out, not because the question was resolved.

That is the exact moment the most useful signal is lost. If a company's own filing and a reputable news report give different dates, that gap is telling you something. Maybe the news report is wrong. Maybe the filing was restated. Maybe the two are measuring different events that got conflated. Any of those is more interesting than the date itself, and all of them vanish the instant the model commits to one number and writes a clean sentence around it. You end up trusting an answer that was never as certain as it sounds, and you have no way to know which facts were contested, because the contest left no trace.

The deeper problem is that flattening is invisible. A made-up fact can sometimes be caught because it has no source. A flattened disagreement looks identical to a fact everyone agrees on. Both arrive as one calm sentence. You cannot audit what was never written down.

## The disagreement is often the finding

In a lot of research, the contradiction is the most interesting thing in the topic, not noise to be cleaned up. Two credible sources disagreeing about a date, an ownership stake, a chain of command, or a sequence of events is a signal that something is being contested, restated, or hidden. That is precisely what an investigator, a due-diligence reader, or anyone making a decision wants flagged. A research surface that smooths it away is doing the opposite of its job.

By keeping conflicts on the record, the graph stays honest about its own certainty. Some facts are confirmed and agreed. Some are confirmed by one source and contradicted by another, and the reader is told so at the point of use. That is the same discipline behind grading [[method/evidence-grade-on-every-claim|every claim as confirmed, alleged, or rumoured]]: the goal is never to sound certain, it is to be accurate about how certain the evidence actually allows you to be.

## Tied to how the vaults handle open questions

The conflict mechanism plugs into a convention that runs across these research vaults: anything the graph has named but not settled becomes a tracked [[open-questions/index|open question]] rather than a loose end. An unresolved wikilink is an open question about an entity. A conflict block is an open question about a fact. A hollow hub is an open question about a node that matters but is still thin. In each case the machine writes the uncertainty down where you can see it and feeds it back into the next research round, instead of hiding it to look complete.

You can see this in practice in [[case-studies/signaltrace|SignalTrace]], the published research wikis built from vault-builder output. Across more than 780 entity pages carrying evidence grades, where sources disagree the disagreement is on the page, not edited out of it. The graph would rather show you a contested fact than a tidy wrong one.

## Where this shows up

This is one gate among several in [[method/index|the method]], alongside evidence grading, blind-spot detection, and knowing when to stop. The same instinct, refuse to manufacture false certainty, runs through all of them.

If you need a research surface that tells you where the record disagrees with itself instead of hiding it, read [[method/index|the method]] or email me at [info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to map.
