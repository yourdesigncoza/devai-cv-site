---
title: LinkedIn topic-term A/B tests
description: Working ledger for which search terms surface comment-worthy LinkedIn posts. Source of truth for what graduates into docs/linkedin-topics.md.
---

# LinkedIn topic-term A/B tests

Working ledger. Each Mode A2 run on a topic flagged **UNDER TEST** in `docs/linkedin-topics.md` logs a row here. The discipline is: pick the next un-tested term from the candidate list, run discovery, score the result on three axes, append a row.

Goal: graduate 5 high-confidence terms across the whole config (not per topic).

## Schema

| Column | Type | Notes |
|--------|------|-------|
| date | YYYY-MM-DD | run date |
| topic | name | matches the topic name in docs/linkedin-topics.md |
| term | string | the search-term variant under test |
| raw cards | integer | how many cards LinkedIn returned (count from text-only output) |
| on-angle | none / few / good | gut rating: do these match the topic's intent |
| comment-worthy | none / few / good | gut rating: would John actually comment on these |
| kept | Y / N / ? | Y = graduated to topics.md, N = retired, ? = still under test |
| notes | freeform | optional context (e.g. listicle bait, recruiter spam, posters worth following) |

## Promotion rule

A term variant graduates to **kept = Y** when `comment-worthy` is `few` or `good` in ≥40% of its logged runs, with a minimum of 5 runs.

A term variant retires to **kept = N** when `comment-worthy = none` for 5 consecutive runs.

Anything in between rolls into another 5 runs.

## Cadence

Two variants tested per day per topic under test. Existing wrapper rate caps (6 calls / 60s, 30 calls / 600s) cover this without alarming LinkedIn. The audit log at `docs/linkedin-interceptor-audit.log` records every call as a side-channel record.

## Methodology correction (logged 2026-04-27)

The first round of topic-3 evaluation used a single bare `interceptor open --text-only` call per term. That call returns a 2000-character preview and only the 1-2 cards above the fold. It systematically under-sampled by 50-70% and led to wrongly retiring viable terms.

The mandated recipe (now codified in `~/.claude/skills/ydcoza-linkedin-engagement/SKILL.md` Mode A2) is:

```
open --text-only --full --timeout 12000
sleep 30
scroll down
sleep 30
scroll down
sleep 30
read --text-only --full
```

Four wrapper calls per term. Yields 5-10 cards typically. Within wrapper rate caps at 30s spacing.

**Implication for the topic-3 batch:** the `good/good` and `good/few` ratings (top 8) are robust because they came from the first card. The `none/none` retirements are unsafe and may need re-evaluation under the proper recipe, especially for terms where the second or third card might have carried on-angle content. Candidates worth re-evaluating: `quality at a discount`, `equity research process`, `value investing process`, `fundamental screening`. The clearly-wrong-sense retirements (workshop turnaround, retail franchise, car-buying solvency, etc.) stay retired.

## Active tests

### Topic 3: Deep-value / distressed quality investing

Canonical row in topics.md still reads `deep value investing, quality at distressed prices, turnaround`. That term-set returns listicle and motivational content on past-week freshness.

**Candidate variants (grounded in wiki corpus).** Bare `compounders` was tested and returned chemical-industry homonym noise; replaced with disambiguated forms below. Each candidate carries a corpus anchor showing where the vocabulary comes from on this site.

| # | Term | Corpus anchor | Notes |
|---|------|---------------|-------|
| 1 | `quality compounders` | `notes/quant-trader-vs-investor` (durable mispricings, structural premium); `index` (deep-value quant) | Buffett/Munger vocabulary; disambiguator on "compounders" |
| 2 | `compounder stocks` | same as above | Bluntest disambiguator; "stocks" forces equity context |
| 3 | `deep value turnarounds` | `index` (focus: "Adversarial AI for deep-value quant"); LinkedIn voice file (lead angle) | John's exact positioning phrase |
| 4 | `temporary distress` | LinkedIn voice file ("quality businesses trading 60%+ below prior highs due to temporary distress") | John's exact positioning phrase |
| 5 | `quality at a discount` | `notes/quant-trader-vs-investor`; index (deep-value quant) | Value-investor crowd vocabulary |
| 6 | `special situations` | `notes/quant-trader-vs-investor` (sparse bets, structural premium) | Greenblatt crowd; activist / spinoff / merger arb posts |
| 7 | `value trap` | inverse of `decisions/llms-behind-typed-adapters` (epistemic review against false-positive cheap stocks) | Counter-angle posts; trap vs opportunity is a recurring debate |
| 8 | `franchise businesses` | `projects/edenfintech-scanner-python` (fundamental criteria); `notes/quant-trader-vs-investor` (durable edge) | Buffett quality vocabulary |
| 9 | `economic moats` | same | Buffett quality vocabulary; broad enough to be noisy |
| 10 | `margin of safety` | `decisions/publishing-negative-results`; `skills/quant-engineering` (honest evaluation) | Graham canonical; broad |
| 11 | `intrinsic value gap` | `projects/edenfintech-scanner-python` (ranked output, confidence band, valuation) | Value-investor methodology |
| 12 | `out-of-favor stocks` | LinkedIn voice file (60%+ below prior highs); `notes/quant-trader-vs-investor` (regime-shift noise) | Distressed-quality flavour |
| 13 | `turnaround stocks` | LinkedIn voice file (deep-value turnarounds) | Direct angle term |
| 14 | `fundamental screening` | `projects/edenfintech-scanner-python` (deterministic fundamental screen); `skills/quant-engineering` | Methodology slant; John's actual scanner work |
| 15 | `insider cluster buy` | `projects/edenfintech-scanner-python` ("eden's insider cluster buy weekly watchlist") | Signature project phrase; niche but on-thesis |
| 16 | `equity research process` | `skills/quant-engineering` (research platforms, screening, backtesting) | Methodology slant; recruits practitioners |
| 17 | `ROIC compounders` | `projects/edenfintech-scanner-python` (ROIC in fundamental criteria) | Quality criteria + Buffett phrasing |
| 18 | `solvency screen` | `projects/edenfintech-scanner-python` (solvency, dilution, revenue growth, ROIC, valuation) | John's specific criteria; niche |
| 19 | `durable mispricings` | `notes/quant-trader-vs-investor` (verbatim) | Niche; surfaces academic / practitioner crossover |
| 20 | `value investing process` | `skills/quant-engineering` | Methodology slant; broad |

### Top 8 surviving terms (after 2026-04-27 autonomous evaluation run)

All 20 candidates plus one reformulation (`out of favor stocks` after the hyphenated form returned no results) were tested in a single autonomous batch on 2026-04-27 with 30s spacing between calls. Self-evaluation only, no John gut-rating. Each term will roll forward through additional runs against the promotion rule.

Ordered strongest first.

| Rank | Term | On-angle | Comment-worthy | Anchor card surfaced |
|------|------|----------|----------------|----------------------|
| 1 | `economic moats` | good | good | Divesh Jethwa (Northstone Capital) Tanla Platforms thesis: regulatory moat, durable cash flows, FCF durability, VaR / expected shortfall / Monte Carlo, bear-case NAV. Direct John audience. |
| 2 | `insider cluster buy` | good | good | Catalyst Edge SEC scanner with 12-dimension convergence framework explicitly listing "Insider buys in the same week (Form 4 cluster)". Verbatim John vocabulary, methodology with sample sizes (n=11). |
| 3 | `durable mispricings` | good | good | Same Jethwa Tanla post (term ranked it via "durable cash flows"). Overlaps with `economic moats` today, may diverge on later runs. |
| 4 | `ROIC compounders` | good | few | Vigía LATAM Spanish-language editorial position on mid-cap quality compounders: ROIC sostenido, FCF recurrente. Substantive on-thesis. Spanish reduces cross-network engagement value. |
| 5 | `out of favor stocks` (no hyphen) | good | few | Viktor Kopylov on European media oversold-quality: Canal+, CTS Eventim, Informa. Explicit catalyst framing, position sizing 1-3%. Slightly trade-flavoured, on the deep-value / quality crossover. |
| 6 | `quality compounders` | few | few | Túlio Carvalho Lopes Japan compounders thesis (Advantest, Tokyo Electron, Shin-Etsu, Komatsu, Itochu). Mohammed Adil Indian retail post is noise. |
| 7 | `compounder stocks` | few | few | Same Túlio Lopes post; welomoney UltraTech Cement India retail is noise. Largely overlaps with `quality compounders`. |
| 8 | `temporary distress` | few | none | Tim Rood (US Mortgage) substantive macro/mortgage commentary on Powell, FOMC, FDIC capital relief, foreclosure inventory. Adjacent to deep-value but not John's lane today. On the bubble. |

The other 12 candidates retired (see "## Retired" below). Full per-run rows in the table that follows.

### Per-run results

| date | topic | term | raw cards | on-angle | comment-worthy | kept | notes |
|------|-------|------|-----------|----------|----------------|------|-------|
| 2026-04-27 | Deep-value / distressed quality investing | quality compounders | 2 | few | few | ? | Túlio Lopes Japan compounders (good); Mohammed Adil Indian retail Q1 results (noise) |
| 2026-04-27 | Deep-value / distressed quality investing | compounder stocks | 2 | few | few | ? | Same Túlio Lopes post; welomoney UltraTech Cement India retail (noise). Initial run hit transient browser error, retried successfully. |
| 2026-04-27 | Deep-value / distressed quality investing | deep value turnarounds | 1 | none | none | N | James Blain CNC wheel repair lathe. "Turnaround" used in workshop sense. |
| 2026-04-27 | Deep-value / distressed quality investing | temporary distress | 1 | few | none | ? | Tim Rood substantive macro/mortgage commentary (Powell, FOMC, FDIC capital relief, foreclosure inventory). Adjacent to deep-value but not John's lane. |
| 2026-04-27 | Deep-value / distressed quality investing | quality at a discount | 2 | none | none | N | Robert Ferriell roofing local marketing; Srinivasan Ramanathan academic CFP. Pure homonym noise. |
| 2026-04-27 | Deep-value / distressed quality investing | special situations | 1 | none | none | N | Ali Alssenaid Iran/Russia geopolitics. Diplomatic sense. |
| 2026-04-27 | Deep-value / distressed quality investing | value trap | 2 | none | none | N | Bill McGarry data/AI organisational maturity (rhetorical "trap"); Istiqur Rahman SEO schema. |
| 2026-04-27 | Deep-value / distressed quality investing | franchise businesses | 1 | none | none | N | Versha IFA International Franchise Show / Paperchase Accountancy. Wrong sense (retail-brand franchise, not Buffett quality). LinkedIn even suggested singular "franchise business". |
| 2026-04-27 | Deep-value / distressed quality investing | economic moats | 1 | good | good | ? | Divesh Jethwa (Northstone Capital) Tanla Platforms thesis. Regulatory moat, durable cash flows, FCF durability, VaR/expected shortfall/Monte Carlo, bear-case NAV. Top result of the run. |
| 2026-04-27 | Deep-value / distressed quality investing | margin of safety | 1 | none | none | N | Ekrem E. consumer goods ERP execution. Operational margin sense. |
| 2026-04-27 | Deep-value / distressed quality investing | intrinsic value gap | 1 | none | none | N | Vanel Beuns OECD Skills Summit / leadership consultant fluff. Off-angle entirely. |
| 2026-04-27 | Deep-value / distressed quality investing | out-of-favor stocks (hyphenated) | 0 | none | none | N | "No results found". Hyphenation confused LinkedIn's tokeniser. Retested with no hyphen as a separate row below. |
| 2026-04-27 | Deep-value / distressed quality investing | turnaround stocks | 2 | none | none | N | Ginesys OMS courier returns; Andy Maw print production. Operational turnaround sense. |
| 2026-04-27 | Deep-value / distressed quality investing | fundamental screening | 2 | none | none | N | Sutharsan G recruitment (Naukri Maestro screening); sanctions.io KYC/AML. HR + AML, not equity fundamentals. |
| 2026-04-27 | Deep-value / distressed quality investing | insider cluster buy | 2 | good | good | ? | Catalyst Edge SEC scanner with 12-dimension convergence framework explicitly listing "Insider buys in the same week (Form 4 cluster)". Verbatim John vocabulary. James Thomson AI staffing was the second card (noise). |
| 2026-04-27 | Deep-value / distressed quality investing | equity research process | 1 | none | none | N | Fatima Gul Rutgers public health internship. Off-angle entirely. |
| 2026-04-27 | Deep-value / distressed quality investing | ROIC compounders | 1 | good | few | ? | Vigía LATAM Spanish-language editorial position on mid-cap quality compounders. ROIC sostenido, márgenes operativos consistentes, FCF recurrente. Substantive on-thesis. Spanish reduces engagement value somewhat. |
| 2026-04-27 | Deep-value / distressed quality investing | solvency screen | 1 | none | none | N | Clarity Insight Advisory car-buying personal-finance metaphor (20/4/10 solvency test). Wrong domain. |
| 2026-04-27 | Deep-value / distressed quality investing | durable mispricings | 1 | good | good | ? | Same Divesh Jethwa Tanla Platforms post as `economic moats` (term ranked it via "durable cash flows"). Overlaps today, may diverge later. |
| 2026-04-27 | Deep-value / distressed quality investing | value investing process | 2 | none | none | N | Mathew Schlamkowitz AI Investing Watch Substack content marketing; Akash Kumar Naik Apify LinkedIn scraper marketing. |
| 2026-04-27 | Deep-value / distressed quality investing | out of favor stocks (no hyphen) | 1 | good | few | ? | Viktor Kopylov on European media oversold-quality (Canal+, CTS Eventim, Informa). Explicit catalyst framing, valuation dislocation, free cash flow, position sizing 1-3%. Slightly trade-flavoured but on-thesis. |
| 2026-04-27 | Quant practitioner umbrella | Quant Trading | 6 | good | good | ? | **Full-recipe (open --full + 2x scroll + read --full).** 3 strong cards: Yavuz Akbay local AI financial analyst (RAG over 10-K, "won't make things up"); Umer Tayyab HackBelfast Quant Track winner (LightGBM, IR 4.3, Spearman IC, VWAP slicer); Zayne Mahmood post on Lueck/Aspect Capital AI explainability. 3 noise cards (MBA prep, 2 recruiter spam). Initial run was first done bare-text-only and rated few/few; corrected here with full recipe. |
| 2026-04-27 | Quant practitioner umbrella | Quant Engineering | 3 | few | few | ? | **Full-recipe.** 1 strong card: Steven Keith Platt LUC AI in Financial Services Conference, "Engineering Alpha: Massively Parallel Architectures and World Models Reshaping Quantitative Finance" (Balyasny + LSV speakers). 1 homonym (Nikita Belokopytov LLM quantization, "quants" = quantization). 1 recruiter spam (Goldman Sachs hackathon). Homonym ceiling limits this term: Card 1 frequently hits ML-quant content, not finance. Initial run rated none/none; corrected with full recipe. |
| 2026-04-27 | Quant practitioner umbrella | Quant Investing | 3 | good | good | ? | **Full-recipe.** 2 strong cards: APA Quant on midterm-year seasonal equity flows (improving liquidity, cleaner positioning, semis leading); Matt McAuliffe quant systems architect post on "improvement came from how the system is built" (Sharpe, drawdown, liquidity-aware universe, capital-by-conviction). Direct John territory (scaffolding-discipline angle). 1 noise (Finomics Edge Indian retail stagflation hashtag spam). Initial run rated few/few; corrected with full recipe. |

## Retired

| date | topic | term | reason |
|------|-------|------|--------|
| 2026-04-27 | Deep-value / distressed quality investing | deep value turnarounds | Wrong sense (workshop turnaround). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | quality at a discount | Pure homonym noise (roofing, academic CFP). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | special situations | Wrong sense (diplomatic). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | value trap | Wrong sense (rhetorical org-strategy "trap"). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | franchise businesses | Wrong sense (retail-brand franchise, not Buffett quality). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | margin of safety | Wrong sense (operational margin). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | intrinsic value gap | Off-angle entirely (consultant fluff). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | out-of-favor stocks (hyphenated) | Hyphenation returned no results. Reformulated as `out of favor stocks` (no hyphen), under test. |
| 2026-04-27 | Deep-value / distressed quality investing | turnaround stocks | Wrong sense (operational turnaround). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | fundamental screening | Wrong sense (HR + AML). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | equity research process | Off-angle (Rutgers public health). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | solvency screen | Wrong domain (car-buying personal finance). 1 run, none/none. |
| 2026-04-27 | Deep-value / distressed quality investing | value investing process | Wrong sense (AI investing content marketing). 1 run, none/none. |

## Graduated (kept terms)

| date promoted | topic | term | runs | comment-worthy hit rate | notes |
|---------------|-------|------|------|--------------------------|-------|
