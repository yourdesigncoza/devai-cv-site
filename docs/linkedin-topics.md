---
backend: phase2
last_reviewed: 2026-04-26
---

# LinkedIn engagement topics

Read by `ydcoza-linkedin-engagement` skill (Mode A, discovery). Edit freely as the angle sharpens.

`backend: phase1` = Brave Search route (uses John's Brave API key via the brave-search MCP). `backend: phase2` = Interceptor route (only flip after the migration checklist in `~/.claude/skills/ydcoza-linkedin-engagement/PHASE2_INTERCEPTOR.md` is complete).

## Term testing

Topics marked **UNDER TEST** in the tables below have candidate variants tracked in `docs/linkedin-topic-tests.md`. When running Mode A2 discovery on such a topic, use the next un-tested variant from that file, then log the result on three axes (raw cards, on-angle gut rating, comment-worthy gut rating). Goal: 5 graduated terms across the whole config.

## Priority A: angle C (adversarial AI × deep-value turnarounds)

Lead positioning. Most posts here, most comment energy here.

| Topic                                         | Search terms                                                       | Last searched | Notes                                                            |
| --------------------------------------------- | ------------------------------------------------------------------ | ------------- | ---------------------------------------------------------------- |
| Adversarial AI in research pipelines          | adversarial AI research, AI agent self-critique, epistemic review  | 2026-05-06    | Unique angle. Closest match for John's scanner work. 2026-05-06 run on `adversarial AI research`: 0 viable past-week (AI-slop synthetic-research, voter-data privacy, OT/CPS agentic defence, AI-integrations listicle). |
| Information barriers in LLM systems           | typed information barrier, LLM context isolation, dataclass filter | 2026-05-06    | Specific to scanner architecture. Often surfaces ML-engineer posts. 2026-05-06 run on `typed information barrier`: 0 viable; LinkedIn matched on partial words (Telegram AI agent build ×2, Google Translate language-barrier reflection). Term too specific; future runs should rotate to `LLM context isolation` or `dataclass filter`. |
| Deep-value / distressed quality investing     | deep value investing, quality at distressed prices, turnaround     | 2026-05-06    | Investor side of the angle. Watch for value-investor crowd. **UNDER TEST**: see `docs/linkedin-topic-tests.md` for candidate variants. |

## Priority B: quant methodology

Engagement value. Posts here often draw practitioners worth connecting with.

| Topic                                | Search terms                                                | Last searched | Notes                                                  |
| ------------------------------------ | ----------------------------------------------------------- | ------------- | ------------------------------------------------------ |
| Backtest overfitting / deflated Sharpe | deflated Sharpe ratio, backtest overfitting, walk-forward   | n/a           | Bailey/López de Prado territory. Strong corpus match.  |
| Replication crisis in finance        | factor zoo, replicating anomalies, t-stat 3.0 finance       | n/a           | Harvey/Liu/Zhu, Hou/Xue/Zhang. Corpus has note.        |
| Negative results / publishing failures | published negative results trading, shelved strategies, postmortem | n/a           | Rare topic. John has decision page on this. Strong fit. |
| Confidence-adjusted expectancy       | expectancy backtest, sample size trading, thin sample edge  | n/a           | FTR backtester corpus.                                 |
| Quant practitioner umbrella          | Quant Trading, Quant Investing, Quant Engineering           | 2026-04-27    | Broad umbrella terms validated 2026-04-27 with full-recipe sampling. `Quant Trading` and `Quant Investing` rated good/good (multiple substantive practitioner posts per run). `Quant Engineering` is partially limited by an LLM-quantization homonym (Card 1 often hits ML-quant content) but yields 1 of 3 cards on-angle. See `docs/linkedin-topic-tests.md`. |

## Priority C: adjacent / opportunistic

Lower priority. Comment when the post is exceptional, not on schedule.

| Topic                            | Search terms                                                | Last searched | Notes                                                |
| -------------------------------- | ----------------------------------------------------------- | ------------- | ---------------------------------------------------- |
| Knight: risk vs uncertainty      | Knightian uncertainty, risk vs uncertainty markets          | n/a           | Philosophical. Use for the right poster only.        |
| Audit trail in research          | reproducible research finance, MD5 data lineage, audit trail | n/a           | Engineering-side. Quant engineering skill page fits. |
| SEC insider filings analysis     | Form 4 insider buying, insider trading signals, SEC EDGAR    | n/a           | Insider-signal-research project corpus.              |

## Hard skips

Don't comment on these even if Google surfaces them. They're off-angle and dilute positioning:

- HFT / microstructure (different subfield, John has no edge)
- Crypto / altcoin alpha (regulatory/quality tail outside John's risk preference)
- AI trading bots / "I built a GPT trader" (commercial bait, low signal)
- Generic "AI is the future" / "quant is dead" hot takes (no angle, no corpus reference possible)
- Recruiter posts and "I'm hiring" boilerplate

## Update protocol

- After every Mode A run, the skill writes today's date into `Last searched` for the topics it queried.
- John reviews this file monthly during the LinkedIn review loop. Adjust priority bands, add new topics surfaced from comments that landed, retire topics that go three months without yielding a comment-worthy post.
