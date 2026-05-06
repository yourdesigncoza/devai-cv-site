# LinkedIn content & tracking

Working file for LinkedIn posts. Not published on the wiki.

- Voice rules: `~/.claude/projects/-home-laudes-zoot-projects-ydcoza-cv/memory/feedback_voice_linkedin.md`
- Lead angle: adversarial AI for deep-value turnarounds (angle C)
- Cadence target: 3–5 posts/week, ceiling not floor. No-dilution rule applies, post less rather than pad a schedule.
- Headline: "Adversarial AI for deep-value turnarounds | Founder at EdenFintech"

## Stats snapshot

Update periodically, monthly, or when a number moves meaningfully. Growth over time matters more than absolute values at this stage.

| Date       | Connections | Followers | Post impressions (last 7d) | Profile views (last 7d) | Notes                 |
| ---------- | ----------- | --------- | -------------------------- | ----------------------- | --------------------- |
| 2026-04-22 | ?           | ?         | n/a | n/a                      | Started posting       |
| 2026-04-24 | 34          | ?         | ?                          | ?                       | Calibration session   |

## Next up

Approved drafts ready to post. Pull in order, mark as posted in the log below, update with real post URL + perf after 48h.

### 1. Typed information barrier (scanner)

- **Source:** `content/projects/edenfintech-scanner-python.md`
- **Type:** Contrarian / technical observation
- **Approved:** 2026-04-24
- **Status:** Posted
- **Post:** https://www.linkedin.com/feed/update/urn:li:share:7457730641372037122/

---

Most "adversarial AI" in research pipelines is a prompt.

"Now be critical. Look for flaws."

That's not adversarial. The reviewer is still sitting inside the same context as the analyst.

In my scanner, the epistemic reviewer gets its input through a frozen dataclass that strips out scores, probabilities, valuations, and numeric targets. The filter is at the type level, not the instruction level. The reviewer can't see the scorecard, so it can't grade it, it can only attack the thesis on its own terms.

Systems that think before they act need more than prompt hygiene. They need information barriers the LLM can't route around.

Architecture: devai.co.za/projects/edenfintech-scanner-python

---

### 2. Negative results published

- **Source:** `content/decisions/publishing-negative-results.md`
- **Type:** Discipline / positioning
- **Approved:** 2026-04-24
- **Status:** Posted
- **Post:** https://www.linkedin.com/feed/update/urn:li:activity:7452680331884752896/

---

Two of my research projects ended in "no edge here".

One was 125,000 hourly bars of XAUUSD, a bar-by-bar port of a momentum indicator, and a 125-iteration parameter ratchet. The ceiling came in at a profit factor of 1.019. The strategy doesn't work and can't be made to work by tuning parameters.

The other: 4,143 enriched SEC Form 3/4/5 signals, 12+ strategy variants, 27 logged experiments. Insufficient edge.

Both repos are still up. Both have their postmortems as README. Neither has been quietly deleted to make the portfolio look tidier.

Avoiding bad decisions matters more than finding good ones. A pipeline that prints "this doesn't work, and here's why at the parameter level" is worth more than one that prints a headline return.

The gate is the product.

Why: devai.co.za/decisions/publishing-negative-results

---

### 3. Confidence-adjusted expectancy (backtester)

- **Source:** `content/projects/ftr-strategy-backtesting.md`
- **Type:** Technical methodology
- **Approved:** 2026-04-24
- **Status:** Next up

---

Most backtests report raw expectancy. Average win × P(win) minus average loss × P(loss). Clean number, easy to read.

The problem: it lies on thin samples.

20 trades with a 60% hit rate looks like an edge. It isn't. The standard error is wide enough to drive a truck through.

My primary metric is confidence-adjusted expectancy, raw expectancy minus 2σ/√n. A promising-looking result on a thin sample doesn't get to pretend it's robust. If the adjusted number is still positive, the edge might be real. If not, the sample hasn't earned the claim.

On top of that: an R:R-scaled minimum-trade gate, walk-forward as a hard gate rather than a chart, and every run's data is MD5-hashed so a result can be traced back to the bars that produced it.

Not glamorous. But the scaffolding outlives the strategies.

Research platform: devai.co.za/projects/ftr-strategy-backtesting

---

### 4. Quant trader vs quant investor (epistemic asymmetry)

- **Source:** `content/notes/quant-trader-vs-investor.md`
- **Type:** Contrarian / framing
- **Approved:** 2026-04-26
- **Status:** Next up

---

Short-term trading looks reckless. Long-term investing looks prudent. The trader can prove the strategy works in months. The investor often can't, and never could.

A trader's bet is that someone on the other side made a mistake, and the trader gets there first when the mistake corrects. Frequent bets, microstructure noise, edge detectable in months. An investor's bet is different. The market is paying them to hold something other people would rather not hold. Sparse bets, regime-shift noise, an edge that can take decades to verify.

That's the asymmetry. Trader edges are knowable but evaporate. Investor edges are durable but resist falsification within a working career. The deflated Sharpe, the factor-zoo's t > 3.0 threshold, and a 65% replication failure across 452 published anomalies all pin down the same point. A trader can clear those bars in a few years of live trading. An investor often cannot.

The deliverable on either side isn't a single quality score. It's an audit trail. Pre-register the hypothesis class. Report the search-space size so deflation can be applied honestly. Make the conditioning explicit. Stress-test the assumption rather than the P&L. The scaffolding outlives the strategies.

Read: devai.co.za/notes/quant-trader-vs-investor

#QuantitativeFinance #SystematicTrading #QuantResearch

---

## Backlog

Drafted but not yet queued. (Populated as more samples land.)

## Posted

48h after a post goes live, pull impressions, reactions, comments, reshares from LinkedIn analytics and log here. Patterns matter more than single-post numbers, look for what's consistent.

| Date posted | Title / hook                     | Wiki link                                      | Post URL                                                                                  | Impressions | Reactions | Comments | Reshares | Saves | Notes                                                         |
| ----------- | -------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------- | --------- | -------- | -------- | ----- | ------------------------------------------------------------- |
| 2026-04-22  | "The answer was no" (shelving)   | decisions/publishing-negative-results          | https://www.linkedin.com/feed/update/urn:li:activity:7452680331884752896/                 | ?           | 5         | 2        | ?        | ?     | Retroactively on-voice; Davi + Daniel replies drafted          |
| 2026-04-24  | "Position count isn't edge"      | projects/insider-signal-research               | *(paste post URL when available)*                                                         | ?           | ?         | ?        | ?        | ?     | First post with calibrated voice; image: text-card (20→10, 5×) |
| 2026-05-06  | "Typed information barrier"      | projects/edenfintech-scanner-python            | https://www.linkedin.com/feed/update/urn:li:share:7457730641372037122/                    | ?           | ?         | ?        | ?        | ?     | Image: redaction card (EpistemicReviewInput, mocked ACME)      |

### 2026-04-22, "The answer was no"

**Short link in post:** lnkd.in/djcnMFum (assumed destination: `devai.co.za/decisions/publishing-negative-results`)

**Original post text:**

> The answer was no. I ran 125,000 bars of XAUUSD through a parameter-search loop for two days. The answer was no. The strategy a TradingView Pine momentum setup I'd been running live had a mathematical ceiling below real trading costs. I wrote the postmortem, archived the repo, and moved on. I publish the shelved projects. Not because it's noble. Because the pipeline that produced the answer is worth more than the answer itself and it's only trustworthy if you can see it work on something that didn't pan out. A separate project on SEC insider-buy signals ended the same way. 4,143 signals, 12 strategy variants, three research sprints, a written conclusion that the data doesn't support the thesis. Both repos are live. Both READMEs are the postmortem. The work that pays is the work that teaches you to evaluate the next one. If you only publish the wins, there's no way to tell the research from the lottery tickets.

**Voice read:** written before formal calibration but already close to the rules. Uses the natural brand phrase *"tell the research from the lottery tickets"*, worth keeping in rotation alongside the codified anchors. "Not because it's noble" / "Both repos are live. Both READMEs are the postmortem.", punchy fragment pattern that fits the calibrated voice. Retroactively compliant.

#### Replies (to post after approval, both approved 2026-04-24)

**To Davi Samora** (Globo, 11K followers, 16h, commented before calibration):

> *Comment:* "Have You tried to use 30min bars, are you using only OHCLV data? Or L1 data (best bid and best ask)? You will not find a direcional signals from the XAUUSD, the edge is not to find direcional alpha, but from the microstructure and from the volatility forecasting. That's the will you need more than one model, at least 3 our 4 models for XAUUSD. Maybe with a more simple strategy you will find alpha with altcoins in the crypto market, they are more inefficient market, it is 'easier' to find alpha there."

> *Reply (approved):*
>
> Yeah, 1h bars, OHLCV only. Your directional-alpha read lines up with where the postmortem ended: the Pine setup was directional momentum on an instrument where that class of edge doesn't survive trading costs. The ceiling wasn't a parameter-search failure, it was a structural one.
>
> Microstructure and vol forecasting are interesting but need an L1 feed and infra I don't have in place. The pipeline is being redeployed against US equity fundamentals instead, different instrument, different edge class, cleaner fit for my engineering background. Crypto/altcoins I've kept at arm's length for now; regulatory and exchange-quality tail is more risk than I want to price in.

**To Daniel V.** (A.R. Suisse Financial, 602 followers, 19h):

> *Comment:* "Nice work. What if some of the millions of combinations would have produced strategies that passed the WF? How do you validate that these survivors are not solely the product of chance? Running a massive data mining search could produce some 'robust' strategies just by luck."

> *Reply (approved):*
>
> Fair concern, data-snooping is what separates research from lottery tickets.
>
> Two things in the specific case: the search space was modest (125-iteration ratchet on a single strategy class, not a brute-force combinatorial sweep), and the primary metric is confidence-adjusted expectancy, raw minus 2σ/√n, so a promising result on a thin sample doesn't get to pretend it's robust. Walk-forward is a hard pass/fail gate rather than a chart, with overfit flags attached to the run's ledger entry. MD5-tagged data snapshots mean a survivor has to hold on a slice the search never saw.
>
> For wider searches I'd add deflated-Sharpe / reality-check style corrections. Haven't built those in because my searches stay narrow on principle, if a strategy needs millions of combinations to surface an edge, I'd rather find a different strategy.

#### To update after replies land

- [ ] Reply count goes from 2 → 2 with replies (check threading)
- [ ] Any follow-up comments from Davi or Daniel
- [ ] Impressions / reactions lift from the reply engagement (LinkedIn boosts reply-active posts)
- [ ] Note any new profile views / connection requests attributable to this thread

## Comments left

Tracked separately from posts. Comments are a discovery lever, LinkedIn surfaces commenters in the original post's reply tree to viewers who haven't connected yet. Patterns matter more than single comments; review monthly alongside the Stats snapshot.

Populated by the `ydcoza-linkedin-engagement` skill (Mode C) after John posts manually. See `docs/linkedin-topics.md` for the topics config and `~/.claude/skills/ydcoza-linkedin-engagement/SKILL.md` for the workflow.

| Date | Post URL | Poster | Topic | Variant | Corpus page | Follow-up |
| ---- | -------- | ------ | ----- | ------- | ----------- | --------- |
| 2026-04-27 | https://www.linkedin.com/feed/update/urn:li:activity:7454118045469294592/ | Monica Colangelo (AWS Hero, Head of Hyperscaler Ops @ ReeVo) | Information barriers in LLM systems | Concrete add, type-system layer inside the process | decisions/llms-behind-typed-adapters | N |
| 2026-04-27 | https://www.linkedin.com/posts/saleem-motlekar-41258a1_artificialintelligence-southafrica-aipolicy-share-7452221729625563136-_i_z/ | Saleem Motlekar (Senior Programme Leader) | SA National AI Policy / due diligence | Citizen-affected, just-the-facts (John-edited from draft) |, (not corpus-anchored; live news reaction) | N |
| 2026-04-30 | https://www.linkedin.com/feed/update/urn:li:activity:7454900770572914688/ | Petr Podhajsky (CrackingMarkets.com) | LLM structured workflows / information structure over prompts | Elaborated Variant 1: build data constraints into code not prompts; scanner EpistemicReviewInput as example | decisions/llms-behind-typed-adapters | N |
| 2026-04-30 | https://www.linkedin.com/feed/update/urn:li:activity:7454900770572914688/ | Petr Podhajsky (CrackingMarkets.com) | RAG retrieval / epistemic separation in research workflow | RAG layer comment: journals capture reasoning not metrics; recovering thinking vs anchoring to old numbers | decisions/llms-behind-typed-adapters | N |
| 2026-05-06 | https://www.linkedin.com/feed/update/urn:li:activity:7456008326238285824/ | Michael Fox-Rabinovitz (Investment & Risk Executive, CFA/FRM/CAIA) | Insider cluster buy / deep-value distressed quality | Variant 2: concrete add via negative-result receipt (4,143 Form 3/4/5 signals, 12 variants, 27 experiments, below trading-cost threshold once size+timing applied) | projects/insider-signal-research | N |

## Shelved

Drafts that didn't hold up (failed the no-dilution rule, voice audit, or lost relevance). Keep them here briefly so the same weak idea doesn't get re-drafted; delete after a month.

## A/B testing notes

Deferred until audience is large enough for signal over noise (rough threshold: 500+ connections and consistent 1k+ impressions per post). When it's time: run two drafts of the same topic with different hooks / lengths / anchor-density, stagger by 1 week, compare.

## Review loop

Monthly: look at `Stats snapshot` delta + top/bottom 3 posts by engagement. Note voice rule updates in `feedback_voice_linkedin.md`. Archive out-of-date entries.
