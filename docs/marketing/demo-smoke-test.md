---
title: Demo smoke-test query bank for demo.devai.co.za/commercial-solar
status: ready to run
date: 2026-05-12
purpose: 12 realistic prospect queries to run through the live demo BEFORE sending the cold-batch-01 mails. Confirm each returns a cited answer (or the right fallback for off-corpus queries), nothing crashes, and the UI renders cleanly.
url: https://demo.devai.co.za/commercial-solar
---

# Demo smoke-test query bank

Run each query through the live search at **https://demo.devai.co.za/commercial-solar** before sending the cold-batch-01 mails. Tick the box once you've verified the outcome matches the expectation.

## Verification criteria (apply to every query)

- [ ] Streaming starts within 2 seconds
- [ ] Answer renders without overflow / styling breaks
- [ ] Citation markers `[1]`, `[2]` appear inline in the answer text
- [ ] Wiki-note source cards appear below the answer with `WIKI NOTE` pill + slot number + collection
- [ ] For fallback queries: the email-us CTA appears, and the "Tip: try one of the FAQ questions" badge shows
- [ ] For happy-path queries: the "Have a more specific question? Email us" footer link appears
- [ ] No console errors visible in browser DevTools

## Happy path queries (5)

These should return strong cited answers from the corpus. If any return a fallback or weak answer, log it under "Failures" below — that's a corpus gap to patch before send.

- [ ] **Q1.** `What NRS 097 compliance applies to a 50 kWp commercial rooftop in Cape Town?`
- [ ] **Q2.** `Which inverters can I legally install on a commercial rooftop in Cape Town?`
- [ ] **Q3.** `Above what capacity do I need NERSA registration vs just municipal SSEG?`
- [ ] **Q4.** `What does the SAPVIA PV Green Card cover and why should I require it?`
- [ ] **Q5.** `How do I size a hybrid PV plus battery system for a 200 kVA off-grid factory?`

## Per-prospect specific queries (5)

These are pulled from the SA-specific questions in the per-candidate defuddle findings — exactly what a real CCO might paste in after clicking the cold-mail link.

- [ ] **Q6.** _(Solareff variant)_ `Should the prospect sign a PPA or go capex, and which grid-code applies to their rooftop?`
- [ ] **Q7.** _(BrightBlack variant)_ `What is the Section 12B tax incentive calculation for a 300 kWp rooftop with 400 kWh ATESS BESS in the Western Cape?`
- [ ] **Q8.** _(Specialized Solar variant)_ `For a 90 kVA three-phase Victron Quattro installation on a dairy farm with 80 kWh Freedom Won storage, what NRS 097-2-1 anti-islanding settings apply?`
- [ ] **Q9.** _(AM Solar variant)_ `For a 200 kVA Johannesburg factory operating 08:00-17:00, compare a Huawei SUN2000-100KTL grid-tied array against a SigenEnergy ESS hybrid system for peak-shaving.`
- [ ] **Q10.** _(AgriSolar variant)_ `For a 15 kW cold room running 18 hours/day on a KZN packhouse with unreliable grid, what battery size and array is needed for a hybrid system to guarantee 6 hours off-grid backup?`

## Fallback path queries (2)

These SHOULD trigger the "cannot answer from corpus" path with the email-us CTA. They're off-corpus by design — testing that the fallback detection logic works.

- [ ] **Q11.** _(off-corpus geography)_ `What is the median electricity tariff for industrial users in Mozambique?`
- [ ] **Q12.** _(off-corpus market)_ `Show me the latest Octopus Energy tariff for UK domestic solar customers.`

## Failure log

For each query that produced an unexpected outcome (weak answer, crash, styling issue, wrong CTA), log it here. After the smoke test, patch any corpus gaps that surfaced before sending the cold-batch-01 mails.

| # | Query | What happened | Severity | Action |
|---|---|---|---|---|
|   |       |               |          |        |

## Where the failures get fixed

- **Weak / wrong answer on happy-path query:** the corpus is missing the right source content. Check `src/content/commercial-solar/` in the demo-devai-site repo for the relevant collection (`Products`, `Regulations`, `Applications`, etc.) and add the missing source markdown.
- **Crash / streaming hang:** check the `/api/search` Vercel function logs. Likely an AI Gateway timeout or rate limit.
- **Styling break:** check the answer-card or source-card markup in `src/pages/commercial-solar/index.astro`.
- **Wrong CTA shown:** the fallback-detection regex patterns in `applyAnswerCta` may need adjusting. See the `isFallbackAnswer` function in the same file.

## After all 12 pass

- Tick the corresponding line in `cold-batch-01-commercial-solar.md` → "Reality check & funnel expectations" → "Pre-send checklist" → "Smoke-test the demo"
- Proceed to the body-template drafting step for the 11 strong-fit recipients
