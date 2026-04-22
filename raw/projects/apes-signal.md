---
source_path: /home/laudes/zoot/projects/apes-signal
extracted: 2026-04-22
---

## One-line pitch

A Python replication of a TradingView Pine Script momentum-scalping indicator (AMS) plus a 3-fold walk-forward backtester and an autonomous ratchet-style optimisation loop that ran 125 iterations against 21 years of XAUUSD 1h data to prove — with receipts — that the strategy is mathematically break-even and cannot be saved by parameter tuning.

## Stack & dependencies

- Python 3 — `numpy`, `pandas`, stdlib (`argparse`, `subprocess`, `importlib.util`, `re`, `json`, `math`, `pathlib`, `collections.deque`)
- Pine Script v5 (the source indicator in `signal.pine`, 679 lines)
- Data: Kaggle XAUUSD historical archive (CSV, 1m / 5m / 15m / 30m / 1h / 4h / 1d / 1w / 1Month)
- No ML libraries, no LLM API calls in the optimisation loop — the "ratchet" is deterministic hypothesis-driven search in-process
- Git for iteration provenance (each accepted change is committed with the PF score in the message)

## Architecture sketch

Four-layer pipeline, all in one small repo:

1. **Signal source** — `signal.pine` (679 LoC Pine v5): 3-voter momentum system (Gaussian Channel + MATS + Trend Angle), Stochastic RSI confirmation, ATR volatility gate.
2. **Bar-by-bar Python replica** — `pine_math.py` (774 LoC): stateful per-module classes (`AMSSignal`, Gaussian IIR, MATS, TrendAngle, StochRSI, ATR) exposing `.step(o, h, l, c)`. Includes a `RollingBuffer` deque primitive and `nz()` helper to mirror Pine semantics exactly.
3. **Walk-forward backtester** — `evaluate.py` (492 LoC): parses the live `signal.pine` with a regex-driven `extract_params()` so the harness always reads the *current* committed parameters; 3 folds (2012-13, 2017-18, 2022-25); annualised Sharpe on 1h bars (`sqrt(6048)`); max drawdown on cumulative returns; `<200 trades/fold` is penalised to 0 to prevent over-fitting on sparse trades; final score is `min(PF) across folds`, printed as a single float to stdout so any outer loop can read it.
4. **Ratchet optimiser** — `ratchet.py` / `ratchet2.py` / `ratchet3.py` (569 + 222 + 237 LoC): built-in catalogue of parameter-mutation hypotheses, each an `(name, apply_fn)` pair that rewrites `signal.pine` via regex. Runs `evaluate.walk_forward` **in-process** (explicit comment: *"faster than subprocess"*), caches the loaded dataframe across iterations, git-commits on accept, `git checkout --` reverts on reject. Every attempt — accepted or not — is appended to `history.jsonl`.

Result surface: `final-report.md` summarises the 125-iteration run; `history.jsonl` is the raw log.

## Design decisions worth telling

- **"The strategy cannot be made to work by tuning parameters"** — the whole project was scoped to prove or disprove that one claim, rigorously, rather than ship yet another curve-fit indicator. The README is now prefixed **"ARCHIVED — April 2026. This system is not positive in live trading."** A negative result, honestly labelled.
- **Regex-driven parameter extraction from the live `.pine` file** rather than a separate config. Whatever the ratchet writes into `signal.pine` is immediately what the backtester reads — no drift between "tuned" and "tested" configurations.
- **LLM deliberately not used in the optimisation loop.** `ratchet.py` header: *"Instead of LLM subprocess (unreliable for large prompts), this runs systematic hypothesis testing"*. A deterministic catalogue of param sweeps was chosen specifically for speed and reproducibility.
- **Min-PF across folds, not mean.** The harness scores on the *worst* of three time periods, so a parameter set can't win by being great on 2012 and awful on the 2022-25 gold bull run.
- **200-trade floor per fold** — any config that generates too few trades scores 0. This kills "optimisations" that win by refusing to trade.
- **In-process eval + cached dataframe** — iterations take ~10-12 seconds each, making a 125-run sweep tractable on one machine. The file-loading cost of 125k bars × 3 folds is paid once.
- **Provenance via git**, not a bespoke format — each accepted mutation is a real commit (e.g. *"ratchet3 iter 111: PF 1.0192 | OB → avg_l>=72 rsi_stoc>=55"*), so the repo history is itself the audit trail.
- **First-principles ceiling check.** Rather than stop at "we couldn't find better", the report derives the theoretical PF ceiling from win rate and RR (`PF = (0.30 × 2.0) / (0.70 × 0.8) = 1.071`) to show why 1.019 is essentially as good as this architecture can get.

## Concrete proof points

- **125,000 bars** of XAUUSD 1h data analysed (`XAU_1h_data.csv` = 124,888 lines incl. header; final-report cites 124,887 bars, Jun 2004 – Dec 2025).
- **125 optimisation iterations** logged to `history.jsonl` (28 KB, 125 lines, each a full JSON record with `iter`, `score`, `baseline`, `accepted`, `hypothesis`, `param_changed`, `elapsed_s`, `timestamp`). Run window per timestamps: **2026-04-10T21:24:38 → 21:53:29** (≈29 minutes of wall-clock for the complete sweep).
- **7 accepted improvements out of 125 attempts** (5.6% accept rate) — score progressed 0.887 → 0.916 → 0.947 → 0.953 → 0.969 → 0.993 → 1.010 → **1.019**.
- **Zero attempts broke PF 1.05.** Score distribution: 12 runs under 0.8, 40 in 0.8-0.9, 64 in 0.9-1.0, 9 in 1.0-1.05, 0 above 1.05. The search space has a hard ceiling — reported as evidence, not hidden.
- **Best-found fold breakdown** (PF 1.019 final config): 345 / 391 / 664 trades across the three folds, win rate ~30%, Sharpe 1.13 / 0.70 / 0.63, max DD 8.4% / 4.7% / 8.7%.
- **Codebase size**: `evaluate.py` 492 LoC, `pine_math.py` 774 LoC, `ratchet.py` 569 LoC, `ratchet2.py` 222 LoC, `ratchet3.py` 237 LoC, `signal.pine` 679 LoC — **≈2,970 LoC** of tight, single-purpose code.
- **9 git commits** — all on 2026-04-10, each a ratchet checkpoint with the PF score in the subject line.
- **Explicit "What Would Actually Need to Change"** section proposes 4 architectural fixes (faster signal source, ≥40% WR target, use AMS as filter-only, test shorter TFs) — the write-up doesn't stop at *"it doesn't work"*, it prescribes what would.

## Skills demonstrated

- **Quant engineering** — walk-forward validation, profit-factor / Sharpe / max-DD metrics, win-rate × RR ceiling analysis, volatility-gate and exit-rule tuning
- **Python services & data pipelines** — stateful streaming indicator replication, pandas/NumPy-based 125k-bar OHLC pipeline, in-process eval with cached dataframes, regex-driven parameter extraction
- **Autonomous / iterative optimisation loops** — Karpathy-style ratchet pattern implemented from scratch (hypothesis catalogue + accept-or-revert + JSONL log + git commits for provenance)
- **Bar-by-bar Pine-to-Python port** — faithful replication of Gaussian IIR, MATS adaptive MA, Trend Angle (Epanechnikov-smoothed slope), Stoch RSI, ATR — with explicit care to preserve `nz()` and Pine warm-up semantics
- **Rigorous reporting / honest negative results** — reports the ceiling, derives it from first principles, archives the system publicly rather than quietly shipping it

## Pull quotes

From `final-report.md`:

> "The strategy does not work and cannot be made to work by tuning parameters."

> "No parameter combination tested across 21 years of data produced a result that would survive real trading costs."

> "The ratchet had nothing left to ratchet — the strategy is at its best possible parameter configuration, and that configuration is break-even."

From `README.md` (top-of-file banner):

> "ARCHIVED — April 2026. This system is not positive in live trading."

From `ratchet.py` docstring:

> "Instead of LLM subprocess (unreliable for large prompts), this runs systematic hypothesis testing: each hypothesis modifies signal.pine, runs evaluate.py, keeps if improved, reverts if not."

## Open questions / dead-ends

- The final-report proposes follow-ups (faster signal source, ≥40% WR target, AMS-as-filter, shorter timeframes) but none were executed here — this repo is closed as an archived disproof.
- Costs (spread, commission, slippage) are not modelled inside the backtester; they are argued analytically in the report to explain why PF 1.019 is sub-breakeven in reality. A version of `simulate_trades` that applies per-trade frictions would be a natural next step.
- Entry model is "next bar open after signal"; SL is checked before TP intrabar as the conservative worst case — no tick-level or bid/ask simulation.
- Three ratchet scripts (`ratchet.py`, `ratchet2.py`, `ratchet3.py`) — the repo would benefit from a single parameterised optimiser rather than three near-siblings, but this is an artefact of the real exploration sequence, not a structural flaw.
- No tests. For a tight quant research repo on XAUUSD this is defensible, but the Pine-to-Python replica in particular would benefit from bar-level parity tests against TradingView exports.
