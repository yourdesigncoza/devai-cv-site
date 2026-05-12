---
title: Demo smoke-test query bank for demo.devai.co.za/commercial-solar
status: re-run 2026-05-12 (post-patch) — 5/5 happy-path pass live; per-prospect + fallback unchanged from initial run
date: 2026-05-12
purpose: 12 realistic prospect queries to run through the live demo BEFORE sending the cold-batch-01 mails. Confirm each returns a cited answer (or the right fallback for off-corpus queries), nothing crashes, and the UI renders cleanly.
url: https://demo.devai.co.za/commercial-solar
---

# Demo smoke-test query bank

Run each query through the live search at **https://demo.devai.co.za/commercial-solar** before sending the cold-batch-01 mails. Tick the box once you've verified the outcome matches the expectation.

## Verification criteria (apply to every query)

- [x] Streaming starts within 2 seconds
- [x] Answer renders without overflow / styling breaks
- [x] Citation markers `[1]`, `[2]` appear inline in the answer text (passing queries only; fallbacks have no citations by design)
- [x] Wiki-note source cards appear below the answer with `WIKI NOTE` pill + slot number + collection (6 cards on every query, even fallbacks)
- [x] For fallback queries: the email-us CTA appears, and the "Tip: try one of the FAQ questions" badge shows
- [x] For happy-path queries: the "Have a more specific question? Email us" footer link appears
- [x] No console errors visible in browser DevTools (0 errors / 0 warnings across all 12 runs)

## Happy path queries (5)

These should return strong cited answers from the corpus. If any return a fallback or weak answer, log it under "Failures" below — that's a corpus gap to patch before send.

- [x] **Q1.** `What NRS 097 compliance applies to a 50 kWp commercial rooftop in Cape Town?` — pass: cited answer, 6 wiki cards
- [x] **Q2.** `Which inverters can I legally install on a commercial rooftop in Cape Town?` — pass: cited answer, 6 wiki cards
- [x] **Q3.** `Above what capacity do I need NERSA registration vs just municipal SSEG?` — pass: cited answer, 6 wiki cards
- [x] **Q4.** `What does the SAPVIA PV Green Card cover and why should I require it?` — pass: cited answer, 6 wiki cards
- [x] **Q5.** `How do I size a hybrid PV plus battery system for a 200 kVA off-grid factory?` — pass (local re-run 2026-05-12 after corpus expansion). Five-step sizing methodology returned with `[1]` citations and 6 wiki cards. Pending live re-run after deploy.

## Per-prospect specific queries (5)

These are pulled from the SA-specific questions in the per-candidate defuddle findings — exactly what a real CCO might paste in after clicking the cold-mail link.

- [ ] **Q6.** _(Solareff variant)_ `Should the prospect sign a PPA or go capex, and which grid-code applies to their rooftop?` — **FAIL: fallback** ("no information about PPAs or capex financing models")
- [ ] **Q7.** _(BrightBlack variant)_ `What is the Section 12B tax incentive calculation for a 300 kWp rooftop with 400 kWh ATESS BESS in the Western Cape?` — **FAIL: fallback** ("no information about Section 12B tax incentives")
- [ ] **Q8.** _(Specialized Solar variant)_ `For a 90 kVA three-phase Victron Quattro installation on a dairy farm with 80 kWh Freedom Won storage, what NRS 097-2-1 anti-islanding settings apply?` — **FAIL: fallback** ("only document Victron MultiPlus-II family, not Quattro; no 097-2-1 anti-islanding config detail")
- [ ] **Q9.** _(AM Solar variant)_ `For a 200 kVA Johannesburg factory operating 08:00-17:00, compare a Huawei SUN2000-100KTL grid-tied array against a SigenEnergy ESS hybrid system for peak-shaving.` — **FAIL: fallback** ("no Huawei SUN2000 or SigenEnergy ESS content; sources exclusively cover CoCT, not JHB")
- [ ] **Q10.** _(AgriSolar variant)_ `For a 15 kW cold room running 18 hours/day on a KZN packhouse with unreliable grid, what battery size and array is needed for a hybrid system to guarantee 6 hours off-grid backup?` — **FAIL: fallback** ("15 kW load exceeds SH10RT 10 kW backup ceiling; no sizing playbook for >15 kVA cold-room scenarios")

## Fallback path queries (2)

These SHOULD trigger the "cannot answer from corpus" path with the email-us CTA. They're off-corpus by design — testing that the fallback detection logic works.

- [x] **Q11.** _(off-corpus geography)_ `What is the median electricity tariff for industrial users in Mozambique?` — pass: fallback triggered, FAQ tip badge + email-us CTA shown
- [x] **Q12.** _(off-corpus market)_ `Show me the latest Octopus Energy tariff for UK domestic solar customers.` — pass: fallback triggered, FAQ tip badge + email-us CTA shown

## Failure log

For each query that produced an unexpected outcome (weak answer, crash, styling issue, wrong CTA), log it here. After the smoke test, patch any corpus gaps that surfaced before sending the cold-batch-01 mails.

| # | Query | What happened | Severity | Action |
|---|---|---|---|---|
| Q5 | `How do I size a hybrid PV plus battery system for a 200 kVA off-grid factory?` | Fallback path triggered. Answer opens "Based on the provided sources, I cannot give you a confident sizing answer for a 200 kVA off-grid factory system" then lists the partial guidance present (50-500 kVA range, MultiPlus-II / Sungrow hybrid). FAQ tip badge + email-us CTA shown. | **High** — this is one of the five canned FAQ buttons. A first-time visitor clicking it gets fallback, which undercuts the entire demo proposition. | Either (a) add 200 kVA off-grid sizing source to `Applications` collection, or (b) drop Q5 from the FAQ button list and replace with a question the corpus does answer (e.g. "What load-shedding ride-through options are there for a Cape Town factory?"). |
| Q6 | `Should the prospect sign a PPA or go capex, and which grid-code applies to their rooftop?` | Fallback. Corpus has no PPA vs capex financing content. | Medium — Solareff-targeted question, but a CCO clicking the cold-mail link who asks this gets nothing. | Add `Finance/ppa-vs-capex.md` covering the two financing models, IPP licence thresholds, and the grid-code split (NRS 097-2-1 vs NRS 097-2-3). |
| Q7 | `What is the Section 12B tax incentive calculation for a 300 kWp rooftop with 400 kWh ATESS BESS in the Western Cape?` | Fallback. No 12B tax content; no ATESS BESS product page. | Medium — BrightBlack target. 12B is a foundational SA commercial-solar topic; should be in the corpus regardless. | Add `Regulations/section-12b-tax-incentive.md` with the 125% deduction calc and the 2025 sunset note. Optionally add an ATESS product stub. |
| Q8 | `For a 90 kVA three-phase Victron Quattro installation on a dairy farm with 80 kWh Freedom Won storage, what NRS 097-2-1 anti-islanding settings apply?` | Fallback. Corpus has Victron MultiPlus-II only, not Quattro; NRS 097-2-1 anti-islanding settings (V/f trip windows, RoCoF) not detailed. | Medium — Specialized Solar target. | Add `Products/victron-quattro.md` and expand `Regulations/nrs-097-2-1.md` with the anti-islanding configuration table. |
| Q9 | `For a 200 kVA Johannesburg factory operating 08:00-17:00, compare a Huawei SUN2000-100KTL grid-tied array against a SigenEnergy ESS hybrid system for peak-shaving.` | Fallback. No Huawei SUN2000 page, no SigenEnergy ESS page, and corpus is CoCT-exclusive so JHB / City Power scope is uncovered. | Medium — AM Solar target. Two product gaps and a regional scope gap. | Add `Products/huawei-sun2000.md`, `Products/sigenenergy-ess.md`, plus a `Regulations/city-power-sseg.md` for the JHB grid-tie process. Peak-shaving comparison can sit in `Applications/peak-shaving-factory.md`. |
| Q10 | `For a 15 kW cold room running 18 hours/day on a KZN packhouse with unreliable grid, what battery size and array is needed for a hybrid system to guarantee 6 hours off-grid backup?` | Fallback. 15 kW load exceeds the documented SH10RT 10 kW backup ceiling; no sizing playbook for cold-room / >15 kVA hybrid scenarios. | Medium — AgriSolar target. | Add `Applications/agri-cold-room-hybrid.md` with sizing math for 10-30 kW continuous loads, and document the next-tier Sungrow / Victron products that handle 15-30 kVA continuous. |

## Where the failures get fixed

- **Weak / wrong answer on happy-path query:** the corpus is missing the right source content. Check `src/content/commercial-solar/` in the demo-devai-site repo for the relevant collection (`Products`, `Regulations`, `Applications`, etc.) and add the missing source markdown.
- **Crash / streaming hang:** check the `/api/search` Vercel function logs. Likely an AI Gateway timeout or rate limit.
- **Styling break:** check the answer-card or source-card markup in `src/pages/commercial-solar/index.astro`.
- **Wrong CTA shown:** the fallback-detection regex patterns in `applyAnswerCta` may need adjusting. See the `isFallbackAnswer` function in the same file.

## After all 12 pass

- Tick the corresponding line in `cold-batch-01-commercial-solar.md` → "Reality check & funnel expectations" → "Pre-send checklist" → "Smoke-test the demo"
- Proceed to the body-template drafting step for the 11 strong-fit recipients

## Run log — 2026-05-12 (Playwright, demo.devai.co.za/commercial-solar)

**Scoreboard:** 6/12 pass. UI plumbing is solid (streaming, citations, source cards, both CTAs, fallback detection). The failures are all corpus gaps, not bugs.

- Happy path: 4/5 pass. Q1, Q2, Q3, Q4 returned cited answers with 5 citation markers and 6 wiki cards each. **Q5 failed** — the canned FAQ button hits a corpus gap, which is the worst possible failure mode for a demo. Fix before send.
- Per-prospect: 0/5 pass. All five returned fallback. The corpus is currently CoCT/Sungrow/Victron-MultiPlus-II centric. Realistic Tier-A prospect questions push outside that scope (PPAs, 12B tax, Victron Quattro, Huawei/Sigen, JHB/KZN, 15 kW+ cold-room). This is fine *if* every cold-mail body promises only what the corpus answers; less fine if the demo link wording invites prospects to "try your own question."
- Fallback: 2/2 pass. Q11 (Mozambique) and Q12 (Octopus UK) correctly triggered fallback with FAQ tip badge + email-us CTA + 6 wiki cards still rendered.
- UI: 0 console errors / 0 warnings across all 12 runs. Streaming visible inside ~2s on every query. Source cards consistently show 6 `WIKI NOTE` pills regardless of pass/fail.

**Before sending cold-batch-01:**

1. Fix Q5 (swap the FAQ button or add the source). Non-negotiable.
2. Decide whether to also patch Q6-Q10 corpus gaps, or to phrase the cold-mail CTA so it doesn't invite questions the corpus can't answer. Lowest-effort path: keep the demo, but in the cold mail say "Try one of the five questions" rather than "Ask anything."
3. After Q5 is patched, re-run this smoke test and confirm 5/5 happy path.

## Run log — 2026-05-12 patch (local dev verification before deploy)

Local dev re-run after (a) expanding `Applications/Off-Grid Factory.md` with the 200 kVA worked-example sizing detail, (b) regenerating `src/data/embeddings.json` (52 items, 1.61 MB), (c) rephrasing the search-input placeholder from "Type your own question..." to "Ask a related question..." on `src/pages/commercial-solar/index.astro`.

- Q1 NRS 097 — pass, cited answer with `[1][3]` markers, top sources from the regulations collection.
- Q2 Legal inverters CoCT — pass, cited answer with `[2][4]` markers, references the CoCT Approved Inverter List (rev. 8 April 2026).
- Q3 NERSA vs SSEG — pass, cited answer with `[1][2]` markers, all three capacity bands surfaced.
- Q4 SAPVIA PV Green Card — pass, cited answer with `[1]` markers, four-section as-built report described.
- Q5 200 kVA off-grid factory — **now pass**. Five-step sizing methodology with `[1]` markers, slot 1 retrieval is the new Off-Grid Factory note. Numbers: 2 100 kWh/day load → 400-450 kWp PV, 600-800 kWh battery, 234 kW inverter (12x Victron MultiPlus-II), 250 kVA prime genset.

**Local scoreboard: 5/5 happy-path pass.** Pending live re-run against `demo.devai.co.za` once the corpus + CTA changes are deployed.

## Run log — 2026-05-12 live re-run (after deploy 6a6a54c)

Vercel deploy `6a6a54c` confirmed Ready (19s build) and serving the patched corpus on `demo.devai.co.za`. Placeholder text on the search input verified as "Ask a related question..." live. Re-ran the five happy-path queries against `https://demo.devai.co.za/api/search`.

| # | Query | Slot 1 source | Citations | Result |
|---|---|---|---|---|
| Q1 | NRS 097 compliance for 50 kWp CoCT rooftop | `applications/Commercial Rooftop Small` | [1] [3] [5] | pass |
| Q2 | Legal inverters for CoCT commercial rooftop | `applications/Commercial Rooftop Small` | [1] [2] [3] [4] | pass |
| Q3 | NERSA vs municipal SSEG capacity threshold | `regulations/NERSA SSEG Registration` | [1] [2] [5] | pass |
| Q4 | SAPVIA PV Green Card scope and rationale | `certifications/SAPVIA PV Green Card` | [1] | pass |
| Q5 | 200 kVA off-grid factory hybrid sizing | `applications/Off-Grid Factory` | [1] | **now pass** |

**Live scoreboard: 5/5 happy-path pass.** The previously-failing canned FAQ button (Q5) is fixed. Q6-Q10 (per-prospect) and Q11-Q12 (fallback) were not re-run — none of the patches affect those paths, and the prior result stands.

Cold-batch-01 is unblocked from a happy-path perspective. The per-prospect corpus gaps (Q6-Q10) remain known; mitigation is the existing cold-mail template wording ("Try a real question, e.g., …") and the softened on-page placeholder, both of which steer prospects toward the canned FAQ buttons rather than open-ended questions.

## Continue here next session (paused 2026-05-12 evening)

**State as of pause:**
- Demo is live and 5/5 happy-path green on `demo.devai.co.za/commercial-solar`. Deploy `6a6a54c` carries the corpus expansion + CTA softening.
- Local repos: `demo-devai-site` is clean and pushed. `devai-cv-site` has **uncommitted** updates to `docs/marketing/demo-smoke-test.md` (this file, run logs + continuation note) plus a pile of untracked screenshots and a `site/` dir from earlier work — those are pre-existing, not from this session. The `wiki-builds/sa-solar/wiki/` vault is not a git repo, so the Off-Grid Factory.md source edit lives only in that working dir + the committed synced copy.

**Pick up here:**

1. Decide on per-prospect gap mitigation (Q6-Q10). Two options:
   - **(a) Ship as-is.** Rely on cold-mail wording + softened on-page placeholder to keep prospects on the FAQ buttons. Fastest path to send cold-batch-01.
   - **(b) Patch the corpus first.** Add the five missing notes flagged in the failure log: `Finance/ppa-vs-capex.md`, `Regulations/section-12b-tax-incentive.md`, `Products/victron-quattro.md`, `Products/huawei-sun2000.md` + `Products/sigenenergy-ess.md` + `Regulations/city-power-sseg.md`, `Applications/agri-cold-room-hybrid.md`. Maybe a half-day of writing + re-embed + re-deploy.
2. Once (1) is decided: proceed to the body-template drafting step for the 11 strong-fit recipients in `cold-batch-01-commercial-solar.md`.
3. After bodies are drafted: run the gog drafts pipeline (per global CLAUDE.md — always drafts, never send). The reference outreach-drafts pattern is `work-abroad-web/scripts/outreach-drafts/`; mirror that structure under `devai-cv-site/scripts/`.
4. Commit the smoke-test doc updates in `devai-cv-site` when convenient (it's not blocking anything).

**Open questions for tomorrow:**
- Do we ship (1a) or (1b)? Lean (1a) given the mitigation is already in place and the gaps are *prospect-paste* gaps, not *FAQ-button* gaps.
- Once cold-batch-01 goes out, what's the reply-monitoring cadence? `gog gmail search 'newer_than:1d'` daily is the easy default.
