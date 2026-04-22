---
source_path: /home/laudes/zoot/projects/edenfintech-scanner-python
extracted: 2026-04-22
---

## One-line pitch
A deterministic equity-scan pipeline that turns raw FMP + Gemini research bundles into JSON + markdown investment reports, with an LLM agent layer (analyst, validator, epistemic reviewer) bolted on top and hard-coded guard rails to stop the models from hallucinating their way into a buy rating.

## Stack & dependencies
- **Python 3.11+**, package `edenfintech-scanner-bootstrap` v0.1.0, installed editable via `pip install -e .`.
- **Zero third-party runtime deps for the core pipeline.** `requirements.txt` literally says *"No third-party runtime dependencies — stdlib only. This file exists for environment reproducibility."* `requests` is used only inside the API adapters.
- **LLM SDKs** (used by the agent layer only): `anthropic` (Claude — analyst, validator, epistemic reviewer), optional `openai` (judge), Google Gemini via HTTP for qualitative evidence retrieval.
- **Market data**: Financial Modeling Prep (FMP) HTTP API with a hand-rolled per-endpoint TTL cache (`cache.py`, 266 LOC).
- **Secrets**: `age` encryption — `.env.age` committed to git, decrypted into process memory at runtime; platform env vars take priority in deploy (Railway/Vercel).
- **CI**: GitHub Actions running unit tests, `validate-assets`, and `run-regression` on every push/PR.
- **Entry point**: `edenfintech-bootstrap` CLI (argparse) defined as a project script in `pyproject.toml`.

## Architecture sketch
Entry: `cli.py` (854 LOC argparse dispatcher) → `live_scan.py` / `review_package.py` / `scanner.py` orchestrators.

Data-retrieval layer: `fmp.py` (632 LOC, quant bundles) + `gemini.py` (463 LOC, qualitative bundles) → schema-validated raw bundles under `data/cache/` and `data/sectors/`.

Analysis layer: `field_generation.py` → machine-draft overlay (MACHINE_DRAFT) → `analyst.py` (1,180 LOC, Claude constrained decoding) → LLM_DRAFT → `validator.py` (553 LOC, contradiction detection + adversarial red-team) → `epistemic_reviewer.py` (400 LOC, blind review with allowlist payload filter) → FINALIZED.

Pipeline core: `pipeline.py` (1,101 LOC) runs deterministic stages screening → cluster_analysis → epistemic_review → report_assembly, each governed by a JSON contract in `assets/contracts/`. `scoring.py` holds all financial math (CAGR, floor price, decision score, confidence bands). `hardening.py` (449 LOC) inserts bias-detection gates. Reports land as JSON + markdown under `runs/<batch>/`.

## Design decisions worth telling
- **"JSON is the source of truth; markdown outputs are rendered views only."** Every stage emits JSON first; the markdown is a report view, never an input. This makes the whole pipeline diffable and regression-testable.
- **Hard information barrier on the epistemic reviewer.** `EpistemicReviewInput` is a frozen dataclass that *statically* excludes scores, probabilities, valuations, and numeric targets — so the "second opinion" agent can't be influenced by the first agent's numbers. It's a code-level guarantee, not a prompt instruction.
- **Overlay lifecycle with forced human review.** MACHINE_DRAFT → LLM_DRAFT → LLM_EDITED/LLM_CONFIRMED → FINALIZED, and `finalize-structured-analysis` refuses to promote an entry that lacks an explicit `review_note`. The machine cannot ship itself.
- **Bias gates before the LLM output touches the deterministic pipeline.** `hardening.py` runs `detect_probability_anchoring` (catches suspiciously round 60% base rates), `score_evidence_quality` (concrete vs vague citations), and a 3-agent unanimous CAGR exception panel — structured adversarial voting to override the main model.
- **Transport injection everywhere.** All LLM clients and FMP calls go through `Callable[[dict], dict]` transports, so tests swap in sanitised wire-format fixtures and CI runs fully offline.
- **Secrets never live as plaintext on disk.** `.env.age` committed to git, decrypted in-memory; README explicitly calls out the threat model — *"any process running as your user can read `.env` — including AI coding assistants, rogue npm packages, or malicious VS Code extensions."*

## Concrete proof points
- **13,903 total Python LOC** across the repo (`find . -name '*.py' | xargs wc -l`). Core package `src/edenfintech_scanner_bootstrap/`: **11,941 LOC** across 28 modules. Test suite: **1,962 LOC** across 18 `test_*.py` files.
- **141 git commits** between **2026-03-08** (initial commit) and **2026-04-20** (v2 Gemini prompt upgrade) — roughly 6 weeks of sustained work.
- **27 run directories** under `runs/` (mostly `batch-31` through `batch-52`, plus single-ticker runs for ALGN, NKE, PYPL) — real pipeline executions, not just scaffolding.
- **9 hydrated sector-knowledge files** under `data/sectors/` (apparel-footwear-accessories, diversified-utilities, financial-credit-services, medical-devices, medical-distribution, regulated-electric, renewable-utilities, utilities, plus a `registry.json`).
- **5 stage contracts** (`screening`, `cluster_analysis`, `epistemic_review`, `report_assembly`, `codex_final_judge`) and **7 JSON schemas** governing every retrieval/overlay/report shape.
- **3 independent LLM agent roles** (analyst, validator, epistemic reviewer) + deterministic local-judge fallback for when the OpenAI key isn't set.
- Largest single module: `analyst.py` at **1,180 LOC**; `pipeline.py` at 1,101; `cli.py` at 854; `structured_analysis.py` at 852.

## Skills demonstrated
- **Quant Engineering** — `scoring.py` concentrates the financial math (CAGR, floor price, decision score, confidence bands); deterministic screening checks (solvency, dilution, revenue growth, ROIC, valuation) are contract-governed and regression-tested.
- **AI / Agentic Systems** — three-role agent graph (analyst → validator → epistemic reviewer), code-enforced information barrier, constrained decoding via Claude, 3-agent unanimous exception panel, probability-anchoring detector, evidence-quality scorer, per-endpoint LLM logging with content-hash dedup.
- **Python Services & Data Pipelines** — 12k-LOC stdlib-only core, transport-injection pattern, TTL cache with crash-safe meta-first writes, raw-bundle fingerprint continuity across runs, CI mirroring the full local safety-check set.

## Pull quotes
> "If a helper or contract ever disagrees with `assets/methodology/strategy-rules.md`, the methodology file wins."
> — CLAUDE.md

> "This dataclass enforces the information barrier specified in the epistemic_review contract. It EXCLUDES: scores, decision_score, total_score; probabilities, base_probability_pct, effective_probability; valuations, target_price, floor_price, base_case, worst_case; numeric targets, cagr_pct, downside_pct."
> — `epistemic_reviewer.py`

> "Any process running as your user can read `.env` — including AI coding assistants, rogue npm packages, or malicious VS Code extensions. Encrypting at rest means secrets only exist in process memory at runtime."
> — README.md

> "JSON is the source of truth; markdown outputs are rendered views only. Raw bundle fingerprints flow through the entire pipeline for traceability."
> — CLAUDE.md (Key Conventions)

## Open questions / dead-ends
- Commit `a8407ce` is literally titled "refactor: major rewrite of LLM agent layer and pipeline orchestration" — the agent layer churned hard and may still have seams worth revisiting.
- Four separate recent commits (`5d1ac53`, `af37bf9`, `d8b6505`, `1ee9c7d`) iteratively bolted new signals onto the Gemini / analyst prompts (catalyst dedup, dilution + covenant breach, incentive alignment). The prompt surface is growing; a prompt-registry / versioning abstraction would pay off soon.
- Parallelism is limited: only `validator.py` and `scanner.py` touch `concurrent.futures`; `sector-scan` runs tickers serially with a `--max-workers` flag but the rest of the pipeline is single-threaded. Scaling past a few hundred tickers will need more.
- No linter/formatter configured (AGENTS.md admits this outright — "No formatter or linter is configured here, so match the surrounding code closely"). As the codebase pushes past 14k LOC this will start to bite.
