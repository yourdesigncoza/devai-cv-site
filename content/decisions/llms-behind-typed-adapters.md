---
title: Why I keep LLMs behind typed adapters
tags: [decision, ai, architecture]
draft: false
date: 2026-04-22
---

# Why I keep LLMs behind typed adapters

## The position

LLM calls live behind an adapter layer with a typed contract. The core pipeline doesn't import an LLM SDK. The review stages that consume model output are shaped by dataclasses that enforce what they can and cannot see, not by prompt instructions.

## How I got here

The working example is [[projects/edenfintech-scanner-python|edenfintech-scanner-python]]. The core pipeline is stdlib-only — `requirements.txt` is a single-line comment saying so. LLM providers are reached through a `Callable[[dict], dict]` transport passed in at the edge. Swapping providers or going offline for testing changes one wiring point; it doesn't ripple through the code.

The second layer is the typing. The epistemic reviewer in that pipeline receives its input through a frozen dataclass, `EpistemicReviewInput`, that explicitly excludes scores, probabilities, valuations, and numeric targets. The reviewer cannot see the scorecard because the type system won't let it. The information barrier is enforced at the code level, not by asking the model politely in the system prompt. Prompts drift over time; dataclasses don't.

The same instinct, scaled down, shows up in [[projects/yt-ts|yt-ts]]. The OpenAI SDK is pointed at DeepSeek in one file and at OpenAI proper in another by changing `base_url`; the calling code doesn't know which it's talking to. The system prompt and few-shot examples live as an external YAML file, so editing them doesn't require touching Python. Temperature is pinned at zero and the I/O contract is a pipe-table shape a defensive parser can trust.

The practical reason I work this way is that LLMs change. Models get deprecated; providers change SDKs; prompts that worked last month stop working this month. If the LLM is one replaceable component inside a pipeline whose other guarantees hold, those upheavals are maintenance. If it's woven into the logic, they're rewrites.

## Where this shows up

- [[projects/edenfintech-scanner-python|edenfintech-scanner-python]] — stdlib-only core, transport abstraction, typed `EpistemicReviewInput` information barrier.
- [[projects/yt-ts|yt-ts]] — provider-agnostic SDK usage, external YAML system prompt, pipe-table I/O contract.
- [[projects/insider-signal-research|InsiderSignalResearch]] — research-sprint framework with each agent role's data-discipline rules declared in its prompt file.
- [[skills/ai-agentic-systems|AI / Agentic Systems]] — the general skill this decision falls out of.
