---
title: A research tool that finds its own blind spots
description: "A research graph can find its own blind spots by measuring its structure instead of its prose. A small script flags any note that many other notes point to but that is itself still a stub, ranks those gaps by how central they are, and surfaces the most urgent one to research next."
tags: [method, spoke, knowledge-graphs]
draft: false
date: 2026-05-29
order: 11
---

A research tool finds its own blind spots by reading its own shape, not its own words. Inside the graph I build, every note is a node and every `[[link]]` is an edge, so the structure of the research is a measurable object. A small script (`detect_hollow_hubs.py`) walks that structure and looks for one specific pattern: a note that many other notes point to, that sits on a lot of the paths between everything else, but that has almost nothing written in it yet. That note is a blind spot the machine can name on its own. It is central to the topic by the evidence the research has already gathered, and it is empty by the research's own admission. The tool flags it, ranks it against the other gaps, and tells you it is the most urgent thing to look at next.

## What a hollow hub is

The detector is looking for three things at once, and the gap only counts when all three are true.

First, three or more inbound wikilinks. Other notes keep referring to this entity, which means the research has decided, over and over, that it matters.

Second, high betweenness centrality. Betweenness centrality measures how many of the shortest paths between other nodes run through this one. Picture the graph as a map of roads between towns. A node with high betweenness is the bridge most routes have to cross. Cut it and the map falls into pieces. In a research graph, a high-betweenness node is the entity that connects otherwise separate parts of the story: the holding company that links two subsidiaries, the person who sits between two organisations, the event that ties a cluster of names together.

Third, it is still a stub. Heading and a line, maybe a couple of links out, but no real content. The research has named it and pointed at it from every direction and then never gone back to fill it in.

A note that is central by the first two measures and empty by the third is what I call a hollow hub. It is the thing everyone in the graph is implicitly relying on, that nobody has actually researched.

## Why that exact gap is the dangerous one

Plenty of notes in a working graph are thin, and most of them do not matter. A peripheral name mentioned once can stay a stub forever without hurting anything. The hollow hub is different because of where it sits.

Everything around it is leaning on it. The links pointing in are claims that this entity connects to those others, and the high betweenness says the rest of the map routes through it. So an unexamined hollow hub is not one missing fact. It is a load-bearing assumption that the surrounding research has quietly built on without checking. If that central entity turns out to be misunderstood, every path that crosses it is suspect, and the error is already distributed across the graph by the time you notice. The gap that hurts most is never the obscure one. It is the one in the middle that looked settled because so much pointed at it.

Ranking by betweenness centrality is what makes this useful rather than just a to-do list. The detector does not hand you every stub. It sorts the hollow hubs by how central they are and surfaces the most connected one first, so the next research round goes where it does the most good. The graph is, in effect, prioritising its own ignorance.

## Generating more is not the same as knowing less

Most AI research tools are built to produce. Ask for more and they give you more: more entities, more paragraphs, more of the regions they already understand. That feels like progress and often is not, because the model is most fluent exactly where it already has the material, and the place it has nothing to say is the place it stays quiet. The output gets longer around the parts that were already strong, and the real hole goes untouched because nothing in the process is looking for absence.

Hollow-hub detection inverts that. It does not ask the model what to write more about. It measures the graph and asks where the structure is hollow, which is a question about what is missing rather than what is present. The same graph-analysis layer that vault-builder leans on for structure (InfraNodus provides the centrality and community math in the analysis phase) is what makes this possible: once you have real betweenness numbers, "the central thing nobody has researched" stops being a vibe and becomes a node you can name and rank. A tool that can only generate will reinforce its existing shape. A tool that can read its own structure can point at the hole in it.

[JOHN: one or two sentences of conviction here if you want it. Why a tool that tells you what it has not done yet is worth more to you than one that always has an answer. Your voice, not mine. Leave blank and the section stands on the mechanism alone.]

## Where this fits

This is one of the quality gates in [[method/index|the method]]. It runs in the analysis phase of every round, after the research is captured and before the next round is planned, so the loop is always steering toward its weakest central point rather than its easiest next paragraph. The same mechanism runs under [[case-studies/signaltrace|SignalTrace]], where it kept thirteen separate research wikis from accumulating impressive-looking maps with quietly empty centres.

If you are running research that a decision depends on and you want a process that flags the central thing it has not checked yet instead of papering over it, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to understand.
