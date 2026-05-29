---
title: Knowing when to stop is the hard part
description: "An LLM left running on a research task does not stop. It keeps generating plausible-sounding filler. My convergence check stops the machine when new findings dry up, telling the difference between real new facts and a reshuffle of what it already knew, and hands you a smaller honest graph instead."
tags: [method, spoke, ai, knowledge-graphs]
draft: false
date: 2026-05-29
order: 13
---

Knowing when to stop is the hard part of AI research because a language model has no natural stopping point. Ask it to keep researching and it will keep producing text, and that text will sound exactly like the verified findings that came before it. Past the point where the real material runs out, the model does not go quiet. It pads. It restates earlier claims in new words, infers connections it cannot back, and fills the gaps with confident prose. The hard engineering problem is not getting an AI to research a topic. It is detecting the moment the genuine findings dry up and stopping the machine before it starts inventing, because the model itself cannot feel that moment arrive.

This is the gate I am most willing to publish, because the restraint is the selling point. In a [[method/index|vault-builder]] run, a convergence check decides when a research loop is done. The function is `check_convergence`, and the rule is deliberately plain. It stops when the count of genuinely new notes drops below two for two rounds running and the gap count is stable. Two rounds, not one, so a single quiet round does not end things prematurely. Below two new notes, not zero, because a round that surfaces one stub and otherwise churns is not finding anything worth continuing for. The gap count holding steady is the other half: if the machine is still opening new questions, it has not run out of road, so it keeps going.

The distinction that check makes is the whole point. There is a difference between a round that found genuinely new facts and a round that reshuffled what it already knew. To a casual reader those two rounds look identical. Both produce paragraphs, both cite sources, both read fluently. But one extended the map and the other walked in a circle. The convergence check is built to tell them apart by counting new notes and tracking whether the open-question list is still growing, rather than trusting that more output means more knowledge. A reshuffle adds words and adds nothing. The machine treats it as a signal to stop, not a reason to keep paying for tokens.

## Why an LLM left running keeps talking

A language model predicts the next plausible token. That is what it is for, and it does it well. Plausibility is not the same as truth, and it is not the same as novelty. When a model has already said everything it actually knows about a topic and you ask for more, the most plausible continuation is more text in the same register: another paragraph that sounds like a finding, another connection that reads like it was researched. The model has no internal flag that fires when it crosses from reporting to confabulating. From the inside, both feel like generating the next likely sentence.

That is why "be thorough" or "keep going until you have covered everything" is the wrong instruction. It rewards exactly the behaviour you do not want. The model interprets "keep going" as "keep producing," and producing is the one thing it can always do. The fix cannot live in the prompt, because the prompt is asking the model to police a boundary it cannot perceive. It has to live outside the model, in code that watches the output and measures whether each round actually moved the graph. `check_convergence` is that code. It does not ask the model whether it is done. It counts.

## Stopping is a feature, not a limitation

The reflex is to read an early stop as the tool giving up. It is the opposite. A graph that stops at thirty solid, evidence-graded notes is worth more than one padded out to sixty where half the later claims are inference dressed as fact, because you cannot tell from inside which half is which. The padding does not announce itself. It contaminates the trustworthy parts by sitting next to them in the same confident voice. A smaller honest graph keeps its bill of health. A bigger dishonest one quietly poisons everything it touches.

So the machine would rather hand you less. When the findings run out, it stops and gives you the audited snapshot it has, rather than a longer document it cannot stand behind. That choice is encoded, not hoped for. The convergence rule is not a suggestion the model can override when it feels productive. It is a hard gate in the loop, and when it trips the loop ends.

> [JOHN: one short paragraph of genuine conviction here, in your voice. Why you would rather ship a graph that stops early than one that keeps going on fumes. The honest version of "I will not pad a deliverable to look more thorough than the evidence is." Keep it plain, no slogan.]

## The same instinct shows up in the scanner

This is not a one-off rule I bolted onto the research machine. It is a habit that runs through everything I build. The [[case-studies/edenfintech-scanner|EdenFintech scanner]] has the same restraint wired into a different domain. Its core is conservative-first by design: the bear case is formed before the bull case, the worst-case downside before the base case, and a stage retries if that ordering is violated. When the model defaults a probability to 60% because it has nothing real to go on, a deterministic detector catches it rather than passing the guess through. A thesis-break detector lets hard fundamentals override a confident narrative.

The pattern is identical. In both systems, the model does the reading and the writing, and a deterministic layer around it decides when to trust the output and when to stop. The scanner stops the LLM from defaulting to an optimistic guess. The research machine stops it from padding a graph past its real findings. Same instinct, same place to put it: in the code, where the model cannot argue its way around it.

You can see how this fits the larger picture in [[method/index|the method]], alongside its sibling case study [[case-studies/signaltrace|SignalTrace]], where the method is published as thirteen live research wikis.

## Work with me

If you are commissioning AI research and you need it to stop honestly instead of running until the bill is full, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to understand. I would rather hand you a smaller graph you can trust than a longer one you cannot.
