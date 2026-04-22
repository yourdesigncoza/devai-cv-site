---
source_path: /home/laudes/zoot/projects/ftr_strategy_backtesting
extracted: 2026-04-22
---

## One-line pitch

Config-driven Python backtester for three systematic trading strategies (FTR supply/demand zones, Order-Block pullbacks, Opening-Range Breakouts) with walk-forward validation, a sample-size-adjusted confidence metric, and an auto-logged run ledger for iterative parameter research.

## Stack & dependencies

- Python 3 (uses PEP 604 `|` unions, dataclasses, stdlib `csv`, `argparse`, `pathlib`).
- `yfinance>=0.2.31` for OHLCV download.
- `pandas>=2.0.0`, `numpy>=1.24.0` for data manipulation / metrics.
- `pyyaml>=6.0` for config loading.
- No pandas dependency inside the run logger — stdlib `csv` only (intentional; see `logger.py`).
- Data cached as CSV under `data/` with an MD5 `.hash` sidecar per file for snapshot traceability.

## Architecture sketch

Linear pipeline per strategy: **data_fetch → zone/OB/OR detector → backtest engine → runner → runs.csv**.

Three independent strategy variants, each with its own detector, engine, runner, and config directory, all sharing `backtest.Trade`, `backtest.calc_metrics`, `backtest.print_metrics`, and `data_fetch.fetch`:

| Strategy | Detector | Engine | Runner | Configs dir |
|---|---|---|---|---|
| FTR (Failed To Return supply/demand zones) | `zones.py` | `backtest.py` | `run.py` + `run_multi.py` | `configs/` |
| OB-Pullback Trend (Order Blocks + 1h EMA bias) | `ob_detect.py` | `backtest_ob.py` | `run_ob.py` | `configs_ob/` |
| ORB (Opening Range Breakout, 1h EMA bias) | inline in `backtest_orb.py` / `orb_backtest.py` | `backtest_orb.py`, `orb_backtest.py` | `run_orb.py`, `orb_run.py` | `configs_orb/` |

Supporting modules: `or_filter.py` (OR/ADR day-quality filter, optional on FTR), `logger.py` (append-only `runs.csv` writer), `data_fetch.py` (yfinance + ATR Wilder smoothing + tz-aware America/New_York index + MD5 hashing).

`run.py` is the single FTR entry point: resolves named configs (`configs/ftr-v2-optimized.yaml`) or explicit paths, dispatches `run_single` / `run_multi` / `run_validate`, then calls `logger.log_run()` which appends one row to `runs.csv` keyed by timestamp run-id. `run_multi.py` holds an `INSTRUMENTS` list with per-instrument session overrides (ES, NQ futures get `regular_session_only: true` to strip overnight data before zone detection).

Config files are YAML with three sections — `zone:` (detection), `trade:` (entry / SL / TP / BE / trailing / min_trades), `session:` (optional regular-session filter with `entry_start_time`, `be_on_session_close`). OB and ORB configs add `htf:` (EMA period) and strategy-specific zone keys (`or_candles`, `swing_lookback`, `min_or_range_atr`). A top-level `exclude_instruments:` key lets a config opt out of the shared multi-instrument list.

Output contract: stdout prints key=value lines ending in `METRIC: <float>` (primary) and `CONFIDENCE_METRIC: <float>` (expectancy minus 2 × standard error). Insufficient-sample runs print `METRIC: -999` and `exit 0`. The metric line is documented as the interface contract for the autonomous `researcher.md` parameter-optimisation skill.

## Design decisions worth telling

- **Confidence-adjusted primary metric.** `confidence_metric = expectancy − 2 × (σ/√n)`. README: "This is the number the researcher should optimise — it can't be gamed by finding one lucky config on a tiny sample." (`backtest.py` line 51.)
- **R:R-scaled minimum-trade gate.** `print_metrics` enforces `effective_min = max(min_trades, ceil(30 × sqrt(tp_rr/2)))` — a TP of 30R requires 117 trades before metrics print, otherwise output is `METRIC: -999`. Prevents tiny-sample flukes from polluting the ledger.
- **Walk-forward validation built in.** `run.py --validate` splits the 60-day window ~40/20 train/test and reports both halves independently; test/train expectancy ratio > 0.3 is the PASS threshold, otherwise labelled "FAIL — likely overfit".
- **No-lookahead HTF bias.** The 1h EMA bias Series is index-shifted forward by 1h so `.asof(t)` can only ever return the last *fully closed* hourly candle. Implemented identically in `backtest_ob.py` and `backtest_orb.py`; both files explicitly document the reasoning in the module docstring.
- **Data snapshot traceability.** Every cached CSV has a `.hash` MD5 sidecar. Per-run data hashes are written to `runs.csv`, so any historical result can be traced to the exact data snapshot that produced it.
- **Session-aware engine.** Beyond `regular_session_only`, the trade loop supports `be_on_session_close` (move to BE at NY close if trade is positive), `entry_start_time` (skip too-early FTR confirmations by resetting the `approached` flag), and a separate ORB force-exit at 15:55 ET.
- **Three exit stacks composable per config.** R-based BE trigger (`be_trigger_r`), ATR trailing stop with activation threshold (`trailing_atr_multiple`, `trailing_activation_r`), and `max_hold_candles` timeout. Outcome tagged on `Trade` as `tp` / `sl` / `be` / `trail` / `timeout` and reported separately in metrics.
- **DRY across strategies.** OB and ORB engines import `Trade`, `calc_metrics`, `print_metrics` from `backtest.py` rather than reimplementing metrics.
- **Active scratch vs named configs.** `strategy_config.yaml` at repo root is the editable scratch; `configs/*.yaml` are the versioned, commit-traceable named variants. Workflow: copy optimised → edit → run with `--notes` → auto-logged.

## Concrete proof points

- 14 Python modules, 2,708 LOC total (`wc -l` on all `*.py`).
- 3 strategy variants (FTR, OB-Pullback, ORB) with 3 separate config directories.
- 56 YAML configs across the three strategy dirs: 14 in `configs/` (FTR), 15 in `configs_ob/`, 27 in `configs_orb/`.
- 65 logged experiments in `runs.csv` (66 lines incl. header).
- 17 instruments cached in `data/` at both 5m and 1h intervals: SPY, QQQ, IWM, NVDA, TLT, GLD, SLV, GDX, XLE, ES=F, NQ=F, GC=F, EURUSD=X, GBPUSD=X, USDJPY=X, AUDUSD=X, USDCAD=X.
- Research docs: `RESEARCH_INDEX.md` (545 lines, master log — current best config, instrument status, open questions), `FTR-beta-strategy.md` (293 lines, methodology writeup with parameter sweeps, BE-stop analysis, dollar P&L simulation).
- Git activity: single-day intensive build on 2026-04-09, 7 commits (`Initial FTR strategy backtester setup` → `Build full experiment platform: multi-instrument runner, autoresearch hardening` → `docs(research): add strategy comparison table with dollar P&L across all tested configs` → `feat(ob-strategy): add OB-Pullback Trend strategy for FX pairs` → `feat(orb-strategy): add ORB Commodity strategy; optimise OB params`). Most recent file mtime 2026-04-10.
- Best FTR config (`ftr-v2-optimized`): 5.01R expectancy on SPY, 1.19R avg across 6 instruments, +$117,729 on $100k @ 1% risk over 60 trading days (in-sample — flagged as requiring walk-forward before trust).
- ORB v11 (`orb-v11-final.yaml`) narrows to a pure commodity/resource portfolio (GLD, SLV, XLE, GDX) with 350-candle hold (~29h / 3 sessions) after a parameter sweep showed commodities respond to extended trend exits.
- OB v3-best (`ob-v3-best.yaml`) derived by combining the best-of-each-dimension finding from separate sweeps (impulse=1.5 + swing=3, BE=1.0R).

## Skills demonstrated

- **Quant Engineering** — systematic strategy research loop with a gated primary metric (confidence-adjusted expectancy), R:R-scaled sample-size requirement, walk-forward validation with overfit flag, no-lookahead HTF filtering, explicit data-snapshot hashing. Three strategy families implemented against a shared metrics spine.
- **Python Services & Data Pipelines** — linear, testable data flow (fetch → detect → simulate → log); stdlib-only CSV ledger to decouple logging from the research stack; YAML-driven configs with named + scratch + explicit-path resolution; CLI ergonomics via `argparse` with sensible subcommands (`--multi`, `--validate`, `--fresh`, `--notes`, `--symbol`); cache-with-hash pattern for reproducible data snapshots.

## Pull quotes

From `CLAUDE.md`:

> "FTR (Failed To Return) strategy backtester. Detects supply/demand zones from OHLCV data, waits for FTR confirmation (price approaches zone then bounces away), simulates trades with ATR-based SL, configurable BE stop, and timeout exits. Outputs expectancy metrics for systematic research."

> "Linear data flow: data_fetch → zones → backtest → run.py / run_multi.py"

> "`researcher.md` defines an autonomous parameter optimisation workflow. The `METRIC: <float>` stdout line is the interface contract. `.lab/` (gitignored) holds experiment state."

From `README.md`:

> "`CONFIDENCE_METRIC = expectancy − 2 × (σ / √n)`. This is the number the researcher should optimise — it can't be gamed by finding one lucky config on a tiny sample."

> "Very tight stops (0.1×ATR beyond zone edge) keep losses small and uniform. Wide timeout exits (178 candles) let winning trades run with the trend. Result: low win rate (~15–40%) offset by large average winners (5–14R)."

> "**Important caveats:** SPY params were optimised in-sample. Only 149 trades across 60 days — far below the 30-trade minimum per instrument needed for statistical confidence. These results establish a baseline; the research goal is to find configs that hold up with ≥ 30 trades per instrument and pass walk-forward validation."

From `backtest_ob.py` module docstring:

> "HTF alignment: uses the most recently CLOSED 1h candle's EMA value. The 1h candle index is shifted +1h so .asof(t) never reads a candle that hasn't closed yet — no lookahead bias."

## Open questions / dead-ends

- No automated tests (no `tests/` dir, no `pytest` in requirements). Metric correctness relies on code review.
- Walk-forward split is fixed ~40/20 day; no rolling / anchored walk-forward.
- `researcher.md` (autonomous optimisation workflow) and `.lab/` experiment state directory are referenced but `.lab/` is gitignored, so the external optimiser integration can't be verified from the repo alone.
- Git activity is a single-day sprint (2026-04-09 → 2026-04-10); positioning this as "sustained quant work" would overstate it. Framing as a research-platform build in a compressed window is accurate.
- `orb_backtest.py` + `orb_run.py` appear to be a second, later ORB implementation alongside `backtest_orb.py` + `run_orb.py` — unclear from the file list alone whether they are successor or parallel experiments.
- README shows six active multi-instrument FTR results but `configs_orb/` excludes equity ETFs and bonds in the final config — instrument coverage differs per strategy and isn't centralised.

---

**Self-review:** FTR zone/OB/ORB strategy backtester, config-driven, single-day build. Three detector+engine pairs sharing a metrics spine; 14 modules / 2,708 LOC; 56 YAML configs; 65 logged runs. Distinctive design choices: confidence-adjusted primary metric, R:R-scaled min-trade gate, walk-forward validation with overfit flag, no-lookahead HTF bias via index shift, MD5 data-hash traceability. Sharpest skills: Quant Engineering + Python Services. Weakest claim to guard: no automated tests and git activity is a compressed 1-day sprint — frame as research-platform build, not sustained trading operation.
