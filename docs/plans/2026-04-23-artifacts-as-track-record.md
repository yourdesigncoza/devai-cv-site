# Artifacts as Track Record — Notes from Nate B. Jones on the Karpathy Wiki

**Date:** 2026-04-23
**Source:** YouTube transcript (Nate B. Jones responding to Andrej Karpathy's "personal wiki" post — 41k bookmarks)
**Why this matters for the CV wiki:** The core thesis — AI should build **persistent artifacts that compound over time**, not throw away its cognitive work on every query — is exactly what this CV project is already trying to do. The video gives language for it and flags traps to avoid.

## The headline idea

Most AI usage today is **rediscovery from scratch**. Upload docs → ask question → AI finds chunks, synthesises, answers, forgets. Same question tomorrow = same work redone. Nothing about the synthesis was saved.

Karpathy's move: **compile once, keep current**. The AI writes down what it learned, cross-references to prior notes, flags contradictions, updates topic pages. Knowledge becomes an **evolving artifact** instead of an on-demand answer.

> "Knowledge is compiled once and then kept current. It's not rederived on every query."

This is the "track record" frame: the artifact *is* the output. Not the chat session, not the answer — the growing, linked, self-updating wiki.

## Why this resonates with the CV wiki purpose

The existing project memory already says: *"CV is the surface; real product is long-term capture of what John does, learns, decides. Additive growth."* That is **exactly** the Karpathy wiki thesis, applied to a practice rather than a research topic.

Mapping:

| Karpathy concept | This project |
|---|---|
| Raw source folder (untouched) | `raw/` — defuddled captures, evidence dives, PDF extracts |
| Wiki (AI-curated synthesis) | `content/` — hand-written Quartz vault |
| Obsidian as the browsable head | Quartz build → `devai.co.za` |
| AI as maintainer, not oracle | AI helps curate/synthesise but voice stays John's |
| File over app / own your artifact | Plain markdown in git, no SaaS middleman |
| Idea file as publishing format | CV *is* the publishing format — readable by humans and agents |

The two-stage `raw/ → content/` split is the single most important design decision already made, and it matches Karpathy's architecture (raw sources preserved, synthesised layer on top).

## Key principles worth absorbing

1. **You own the artifact, not the tool.** Markdown in a git repo. No platform can reprice or lock you in.
2. **AI is a maintainer, not an oracle.** Its job is sustained work that compounds, not magical one-off answers.
3. **The primary reader is an AI agent.** Human readability is a bonus; agent-accessibility is the requirement. (Implication: structure pages so an agent feeding on the repo can answer questions about John's practice without rereading everything.)
4. **Human job = curation + questioning.** No substitute for thinking carefully about what goes in and how it's organised. Already encoded in the "never auto-stitch `content/` from `raw/`" rule.
5. **Memory compounds through intentional structure**, not random accumulation. Skills-as-spine, projects-as-evidence is that intentional structure for this repo.
6. **Idea-file-as-publishing-format.** Karpathy shipped a high-level description, not a tool — readers paste it into their agent and build the specifics. Each `content/` page could/should work the same way: dense enough for a human read, structured enough for an agent to reason over.

## Traps to avoid (the ones that apply here)

- **Editorial drift.** Every time an AI turns a raw source into a wiki page, it makes judgement calls. Pages "read cleanly" even when nuance has been dropped. The hard rule *never auto-stitch `content/` from `raw/`* exists precisely to prevent this — keep enforcing it.
- **Wiki staleness reads like confidence.** A neglected database has gaps (you notice). A neglected wiki drifts — old synthesis becomes wrong but still reads well-written. Mitigation: date-stamp decisions, treat `content/` as a living thing, prefer rebuilds from `raw/` over patch-editing stale synthesis.
- **Smoothing away contradictions.** A well-meaning synthesis layer resolves "engineering said 12 weeks, sales promised 8" into "about 10 weeks." The contradiction was the valuable signal. For the CV: preserve the actual tension in decisions/playbooks — the friction is often the story.
- **Scale limits.** Karpathy's wiki pattern works best at **100–10,000 high-signal documents** and breaks under multi-agent writes. Fine for a personal CV wiki; worth remembering if this ever expands beyond one practitioner.

## Concrete implications for the CV wiki

1. **Keep the two-stage discipline.** `raw/` is re-runnable evidence; `content/` is hand-written voice. This is not a style preference — it's what makes the artifact trustworthy long-term.
2. **Lean into "artifact as track record."** The homepage / about pages could say this explicitly: this site isn't a résumé snapshot, it's the compounding record of a practice. The wiki *is* the evidence.
3. **Write pages for two readers at once** — a hiring manager skimming on mobile, and an agent crawling the repo to answer questions about John. Clear headings, decisions with dates, explicit links between skill → project → decision.
4. **Treat decisions and playbooks as the high-value artifacts.** Skill pages describe *what*; projects show *evidence*; but decisions and playbooks are where the compounding synthesis lives — the stuff that wouldn't exist without deliberate capture.
5. **Date things.** A wiki that doesn't timestamp its claims becomes indistinguishable from an out-of-date one. Every decision and playbook page should carry a last-touched date.
6. **Contradictions are features, not bugs.** When John's current view disagrees with a past one, surface it — it's the clearest evidence of a practice that evolves.

## One-line takeaway

> The CV wiki is a **compounding artifact of a practice**, not a document of a career. Karpathy gives the architectural vocabulary; the project was already on this track — the job now is to stay disciplined about the two-stage split and keep feeding it.
