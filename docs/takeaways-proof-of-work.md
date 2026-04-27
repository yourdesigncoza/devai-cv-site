# Takeaways: "Nobody knows what you're worth anymore"

Source: transcript at `/home/laudes/zoot/Alt_Downloads/delete.md` (talk on proving your worth in the AI era, pitching a "talent board" at the end).

## Why this matters for the CV wiki

The talk's central question, *how do you show your work to the world publicly when generation is free?*, is the exact problem this wiki is trying to answer. The CV isn't the product; the evolving knowledge graph of practice is. Most of the framework below is already latent in the current structure (skills, projects, decisions, playbooks, open-questions). These notes make it explicit.

## The core thesis

When AI makes generation free, the old value chain breaks:

> hard work → effort → expertise → "I know what you're worth"

Output no longer proves anything. What's scarce now is **comprehension**, and the visible artifacts of it.

## Five principles (and how they map to this wiki)

### 1. Comprehension over generation
Force yourself to understand at the point of creation. For anything you ship, be able to answer:
- What does this do? What doesn't it do?
- What are the dependencies? What's the blast radius if it breaks?
- What decisions did I make and why?
- Where did I override the AI? Where did I keep its work?

"One project you fully comprehend teaches more than 10 you vibe-coded." Comprehension is the modern replacement for apprenticeship, and it's the pathway to taste.

→ **Wiki implication:** `content/projects/` pages should lead with *understanding*, not output. `content/decisions/` is exactly this artifact. Keep writing them.

### 2. Explanation as artifact
Explanation is how comprehension becomes visible. Not a blog post written after the fact, a **structured explanation that travels with the work**, as native to the deliverable as the code itself. Four questions per thing shipped:
1. What is this? (plain English, not marketing)
2. Why this approach? (alternatives, trade-offs)
3. What will break? (fragile points, assumptions)
4. What did I learn? (including where AI was confidently wrong)

"The explanation artifact in the generative era is what the commit message was in the traditional era."

→ **Wiki implication:** every project page could carry these four headers as a lightweight convention. Cheaper than a case study, more useful than a README.

### 3. Transactions over credentials
Credentials (degrees, titles, "senior X") are inflating. What matters is a record of **real work → real value exchanged**, and the AI era compresses those cycles from years to weeks. We need "microtransactions for jobs", a richer history of real signals than one job entry every two years.

→ **Wiki implication:** `content/projects/` is already this, short, dated, concrete. Resist the urge to merge small projects into bigger narrative arcs; the granularity *is* the signal.

### 4. Work in the open
Closed-door professional development only worked when the people inside the company could reward you. That mechanism is breaking. Working in public:
- Is the only option if you're not inside a company
- Is still probably the better bet even if you are
- Creates accountability, which is uncomfortable and the point

→ **Wiki implication:** this is literally the premise. Keep `open-questions/` visible. Don't hide the mess.

### 5. Ship proof with the work
Proof-of-thinking must be **inseparable from the work**, or it becomes spammable. A profile page with links to expired Lovable/Claude artifacts isn't proof, it's noise. The explanation has to ride alongside the artifact.

→ **Wiki implication:** every project page should be self-contained, artifact + reasoning in one place. Don't lean on external links as the primary evidence.

## One-line version

> Prove you can think. Generate less, comprehend more, explain every shipped thing in four plain-English questions, and keep it all in one public place with your name on it.

## What to consider doing

- Adopt the four-question frame (`what / why / what breaks / what I learned`) as a soft template for `content/projects/` pages where it fits. Don't force it on every page, some are just pointers.
- Keep the `decisions/` folder as the heavyweight version of the same idea (cross-cutting, with trade-offs surfaced).
- The talk validates the wiki's *additive* bias, the graph grows, entries stay dated and small, nothing gets rewritten into a polished narrative. That's the feature, not a bug.

## What to ignore

The "talent board" pitch at the start and end is a product plug. The principles stand on their own; the product is not relevant here, this wiki is the self-hosted version of the same idea.

## Future, promote the frame to a public playbook?

Not yet. Once the four-question frame has been tested on 3–5 more project pages and the pattern holds, consider promoting it to `content/playbooks/proving-worth-in-the-ai-era.md`. Self-demonstrating: the wiki would then prove its own thesis in public. Premature as of 2026-04-24, one validated page is not enough signal, and locking a convention early tends to calcify it.

Revisit when the frame has been applied to: `edenfintech-scanner-python`, `insider-signal-research`, `ftr-strategy-backtesting`, `apes-signal`. If the frame still earns its keep across all four, make it a playbook.
