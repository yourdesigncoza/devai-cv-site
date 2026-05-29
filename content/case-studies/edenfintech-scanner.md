---
title: EdenFintech scanner
description: "A Python equity-research scanner that puts an LLM analyst panel behind a type-enforced information barrier, grades its own evidence, logs every model call, and scores stocks with plain arithmetic. The same discipline as my research-graph method, applied to quant."
tags: [case-study, quant, ai, python]
draft: false
date: 2026-05-29
order: 3
---

The EdenFintech scanner is a per-ticker equity-research pipeline written in Python. A deterministic core screens and scores each stock with plain arithmetic and no third-party libraries. An LLM analyst panel does the reading and reasoning, but it runs behind a type-enforced barrier that decides, in code, what each role is allowed to see. Every model call is logged in full. The output is the weekly watchlist on [edenfintech.com](https://edenfintech.com). It is the same epistemic discipline as my research-graph [[method/index|method]], pointed at quant research instead of entity research.

## The problem

Ask an LLM to evaluate a stock and it will give you a confident answer, a downside estimate, and a probability that the thesis holds. The trouble is that all three tend to be wrong in the same direction, and the model cannot tell you which parts it actually verified. It anchors on round numbers. It marks its own work and grades itself generously. It defaults a probability to 60% when it has nothing to go on, and presents that guess with the same tone as a checked fact.

In equity research that self-assessment bias is the whole risk. The agent that wrote the bull case should not also be the one judging whether the reasoning was sound, because it has every incentive to agree with itself. A prompt that says "be objective" does not fix this. The model can read the instruction and still leak its own conclusion into the review. The fix has to be structural: the reviewer must be unable to see the scores it is supposed to be neutral about, and the constraint has to be enforced by something the model cannot talk its way around.

## The architecture

### The typed information barrier

The epistemic reviewer is the role that judges whether the analysis reasoned well, separate from whether the numbers look good. For its judgment to mean anything, it has to be blind to the scores, probabilities, and valuations. I enforce that with the type system, not a prompt.

`EpistemicReviewInput` is a `@dataclass(frozen=True)` with an explicit allowlist of fields. `extract_epistemic_input()` copies only those fields out of the full analysis. `review()` raises `TypeError` if it is handed anything other than that exact frozen type. So the reviewer is provably blind to the scoring: there is no code path that gets a score into its hands. The barrier is checked by the compiler and the runtime, not by the model choosing to behave. This is the same pattern I describe in [[decisions/llms-behind-typed-adapters|Why I keep LLMs behind typed adapters]].

### Multi-role review

The pipeline runs roughly eight distinct roles, inferred by `_infer_agent()`: analyst/fundamentals, analyst/qualitative, analyst/synthesis, validator/red_team, validator/pre_mortem, epistemic_reviewer, hardening/cagr_exception, and gemini/qualitative. The three barrier-protected stages are the analyst, the validators, and the epistemic reviewer, each seeing a different slice on purpose. The two validators (red-team and pre-mortem) run in parallel through a `ThreadPoolExecutor`. The roles are split so that no single agent both forms the thesis and signs off on it.

### Constrained decoding

Every stage talks to its model through a JSON schema with `additionalProperties: false` and enums on the fields that have a fixed set of valid answers. `_make_schema_strict()` recursively rewrites those schemas for OpenAI's strict mode. The Gemini qualitative step is gated further by `FORBIDDEN_METHOD_KEYS` and `ALLOWED_CANDIDATE_KEYS` allowlists. The model cannot return a shape the next stage was not built to read, so a malformed or off-script response fails at the boundary instead of flowing downstream as plausible garbage.

### The LLM audit trail

Every model call is logged in full. `LlmInteractionLog` and `wrap_transport()` write each interaction to `llm-interactions.md`: timestamp, model, the complete prompt, the schema, and the complete response. Repeated blobs over 2KB are elided by MD5 hash so the log stays readable without losing the content. Cache hits are written as synthetic `[CACHE HIT]` entries so the record is complete even when no call was made. Stage artifacts are written atomically with a tempfile and `os.replace()`, so a crashed run never leaves a half-written stage behind. When a verdict looks wrong, I can read exactly what the model was asked and exactly what it said.

### Hardening gates

Between the LLM output and the score sit a set of deterministic checks. A probability-anchoring detector catches the model defaulting to 60%. An evidence-quality scorer rates how well the claims are backed. A thesis-break detector overrides the narrative with hard FMP fundamentals when they contradict it. And a three-agent panel must agree unanimously before a CAGR exception is allowed through. These gates are arithmetic and rules, not more prompting, so they cannot be argued out of a finding.

### The scoring formula

The final score is plain arithmetic, deliberately legible:

```
score = (100 - adjusted_downside) * 0.45
      + probability               * 0.40
      + min(cagr, 100)            * 0.15
```

Downside is weighted hardest, the probability the thesis holds next, upside last and capped. There is no black-box model deciding the number. Anyone can read the weights and see what the scanner cares about. The LLM informs the inputs; the arithmetic produces the verdict.

The deterministic core that runs all of this is stdlib-only in the literal sense: HTTP through `urllib.request`, a hand-written JSON-schema validator, no numpy, no pandas, no requests. The only third-party dependency is the `anthropic` SDK, imported lazily inside the analyst layer and installed separately. The reasoning for that choice is in [[decisions/stdlib-over-pandas-for-the-scanner|stdlib over pandas]].

The repository is 29 modules, about 11,900 source lines, and 18 test files covering 152 test methods. The negative-results discipline is part of the record: the batch-31 post-mortem names seven production bugs and their fixes, including a regex that read the `0.26` in "interest coverage = 0.26" as a probability anchor. Writing those failures down is the point, not an embarrassment to hide.

## What it proves

The scanner is the [[method/index|method]] applied to a different domain. Entity research and quant research have the same failure mode, an AI that is confident and wrong with no way to tell which parts are real, and the same fix: make trust structural. Grade the evidence, constrain the outputs, log everything, and decide in code what the model is allowed to see.

It is concrete proof for the positions in [[decisions/llms-behind-typed-adapters|Why I keep LLMs behind typed adapters]] and [[decisions/stdlib-over-pandas-for-the-scanner|stdlib over pandas]], and it backs the [[skills/quant-engineering|Quant Engineering]] and [[skills/ai-agentic-systems|AI / Agentic Systems]] skill pages with running code rather than claims.

## Work with me

If you are building research or quant systems where the downside matters and a confident-but-wrong answer is expensive, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to decide. You can also see the scanner's output as the weekly watchlist on [edenfintech.com](https://edenfintech.com).
