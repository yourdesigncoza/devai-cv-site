---
backend: phase1
last_reviewed: 2026-04-26
---

# LinkedIn engagement topics

Read by `ydcoza-linkedin-engagement` skill (Mode A, discovery). Edit freely as the angle sharpens.

`backend: phase1` = Brave Search route (uses John's Brave API key via the brave-search MCP). `backend: phase2` = Interceptor route (only flip after the migration checklist in `~/.claude/skills/ydcoza-linkedin-engagement/PHASE2_INTERCEPTOR.md` is complete).

## Priority A — angle C (adversarial AI × deep-value turnarounds)

Lead positioning. Most posts here, most comment energy here.

| Topic                                         | Search terms                                                       | Last searched | Notes                                                            |
| --------------------------------------------- | ------------------------------------------------------------------ | ------------- | ---------------------------------------------------------------- |
| Adversarial AI in research pipelines          | adversarial AI research, AI agent self-critique, epistemic review  | —             | Unique angle. Closest match for John's scanner work.             |
| Information barriers in LLM systems           | typed information barrier, LLM context isolation, dataclass filter | —             | Specific to scanner architecture. Often surfaces ML-engineer posts. |
| Deep-value / distressed quality investing     | deep value investing, quality at distressed prices, turnaround     | —             | Investor side of the angle. Watch for value-investor crowd.      |

## Priority B — quant methodology

Engagement value. Posts here often draw practitioners worth connecting with.

| Topic                                | Search terms                                                | Last searched | Notes                                                  |
| ------------------------------------ | ----------------------------------------------------------- | ------------- | ------------------------------------------------------ |
| Backtest overfitting / deflated Sharpe | deflated Sharpe ratio, backtest overfitting, walk-forward   | —             | Bailey/López de Prado territory. Strong corpus match.  |
| Replication crisis in finance        | factor zoo, replicating anomalies, t-stat 3.0 finance       | —             | Harvey/Liu/Zhu, Hou/Xue/Zhang. Corpus has note.        |
| Negative results / publishing failures | published negative results trading, shelved strategies, postmortem | —             | Rare topic. John has decision page on this — strong fit. |
| Confidence-adjusted expectancy       | expectancy backtest, sample size trading, thin sample edge  | —             | FTR backtester corpus.                                 |

## Priority C — adjacent / opportunistic

Lower priority. Comment when the post is exceptional, not on schedule.

| Topic                            | Search terms                                                | Last searched | Notes                                                |
| -------------------------------- | ----------------------------------------------------------- | ------------- | ---------------------------------------------------- |
| Knight: risk vs uncertainty      | Knightian uncertainty, risk vs uncertainty markets          | —             | Philosophical. Use for the right poster only.        |
| Audit trail in research          | reproducible research finance, MD5 data lineage, audit trail | —             | Engineering-side. Quant engineering skill page fits. |
| SEC insider filings analysis     | Form 4 insider buying, insider trading signals, SEC EDGAR    | —             | Insider-signal-research project corpus.              |

## Hard skips

Don't comment on these even if Google surfaces them — they're off-angle and dilute positioning:

- HFT / microstructure (different subfield, John has no edge)
- Crypto / altcoin alpha (regulatory/quality tail outside John's risk preference)
- AI trading bots / "I built a GPT trader" (commercial bait, low signal)
- Generic "AI is the future" / "quant is dead" hot takes (no angle, no corpus reference possible)
- Recruiter posts and "I'm hiring" boilerplate

## Update protocol

- After every Mode A run, the skill writes today's date into `Last searched` for the topics it queried.
- John reviews this file monthly during the LinkedIn review loop. Adjust priority bands, add new topics surfaced from comments that landed, retire topics that go three months without yielding a comment-worthy post.
