---
title: Adversarial review via a second AI model
description: "Pipe your plan, code, or tests to a second AI from a different vendor for critical review. The findings you'd have missed come from a reader who isn't invested in the design choice."
tags: [playbook, ai-tooling, code-review, gemini, claude]
draft: false
---

The premise is simple: when I'm building with Claude, I have Claude. Claude is thorough, but Claude also agrees with itself more than it disagrees. For the last pre-execute step on any non-trivial work, I pipe the current state to **Gemini** for an adversarial pass. Different model family, different training data, different blindspots.

## When I use it

- **Before executing a plan.** Phase 4 of the [[playbooks/file-driven-planning|file-driven planning flow]]. Cheapest time to find holes.
- **After writing a test suite.** [[notes/index|The first time I did this on Playwright specs]] I got back 8 findings and one of them would have silently lied forever. See below.
- **Before shipping an opinionated architectural choice.** Anything I'm about to defend publicly gets an adversarial read first.

## The structured prompt

The single biggest lever is the shape of what I send, not the model choice. A dump of "here's my plan, thoughts?" gets a pleasant acknowledgement. A structured prompt forces genuine engagement:

```
## Objective
<what the user is actually trying to achieve>

## Current State / Architecture
<relevant codebase context, constraints, existing patterns>

## Proposed Approach
<current thinking, plan, or analysis>

## Reasoning
<what was analyzed and why, key trade-offs, where you pushed back>

## Specific Weak Points to Review
<areas of uncertainty, trade-offs, unstated assumptions>

## Instruction
Critically review the Proposed Approach. Your goals:
1. Identify factual errors, logical flaws, or missed edge cases
2. Challenge the Reasoning and propose stronger alternatives
3. Flag unstated assumptions
4. Call out scope creep or missing dependencies
```

The "Specific Weak Points" section matters most. Naming the parts I'm already uncertain about gives the reviewer a sharper target than "tell me what's wrong".

## A real finding

I piped an 11-file Playwright test suite for a WordPress plugin to Gemini with the structured prompt above. Eight findings came back.

Seven were pedestrian: `waitForTimeout()` instead of proper waits, `networkidle` being unreliable in WordPress, `innerText` skipping hidden tabs, loose search assertions, DOM-only safety with no network guard, and a couple of test names that would read badly in CI output.

The eighth I don't think I'd have caught on my own:

> A conditional existence check: `if (searchExists) { assertSearchWorks() }`. Looks defensive. Reads like good testing practice. It isn't a guard — it's a way for the test to pretend nothing was wrong when the search bar had disappeared. The test would pass silently in exactly the failure case it was meant to catch.

I wrote it as a guard. It was really permission to lie. That finding needed a reader who wasn't invested in the design choice.

## Why Gemini specifically

Nothing sacred about the brand. The requirement is *a different model family from a different vendor*. Claude reviewing Claude-generated code is echo-chamber adjacent. Gemini (or GPT-4, or a local model) is a genuinely separate set of priors.

Mechanically, I invoke it via a subagent tool with a model override:

```
subagent({
  agent: "worker",
  model: "google/gemini-2.5-pro",
  task: "<structured prompt>"
})
```

## When the reviewers disagree

Sometimes Gemini challenges a choice and Claude pushes back. I resolve that in the session — not by picking a winner, but by running a short back-and-forth until one of three things happens:

1. Gemini concedes (the original choice was fine, context just wasn't in the prompt)
2. Claude concedes (the finding is real, revise)
3. Both agree the decision is a tradeoff, not a bug — document it in the plan and move on

The third outcome is the most common and the most useful. A documented tradeoff is lower-entropy than a disagreement between two models and a human.

## What it isn't

- **Not a replacement for code review.** Humans catch things AIs don't. The AI pass is *before* the human pass, not instead of it.
- **Not comprehensive.** Some findings you'll get every time; others you won't. Use it as a first-pass critic, not a final audit.
- **Not cheap if you overuse it.** The structured prompt + the review text runs into real token cost. I use it on significant decisions, not routine commits.

## See also

- [[playbooks/file-driven-planning|File-driven planning]] — review is Phase 4 of the flow.
- [[decisions/llms-behind-typed-adapters|Why I keep LLMs behind typed adapters]] — the same instinct, applied to production LLM code: contracts and review stages rather than trusting model behaviour.
- [[notes/index|Notes]] — the dated log of specific AI-review findings.
