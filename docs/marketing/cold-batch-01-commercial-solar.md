---
batch: 01
vertical: Commercial solar installers (SA)
status: drafting
cta: live stock demo + qualified 48hr POC after discovery call
from_alias: info@devai.co.za
target_size: 30-50
proof_url: https://demo.devai.co.za/commercial-solar (TBC, blocked on subdomain setup + vault-builder run)
follow_up: day-3 + day-7 short replies
persona: MD, Head of Sales, Senior Sales Engineer
last_updated: 2026-05-14
---

# Cold batch 01: SA commercial solar installers

First cold-outbound batch. Vertical chosen for proximity to the Riello UPS demo: sizing + maintenance contracts + brand-support questions are structurally identical, so the `signaltrace.wiki/riello-ups/Search` link does maximum work as proof.

## Why this vertical

Commercial solar installers in SA (20-200 employees, content-heavy WordPress sites) have the same three knowledge traps as UPS distributors:

1. **Sizing.** Every site has an "our process" page that explains how they assess site load, roof area, irradiance, and battery sizing. Today this is a contact-form-then-call cycle. Self-service input could collect 80% of the data before the engineer is involved.
2. **Maintenance / O&M scoping.** Most sites have a long article explaining what an O&M contract covers (cleaning, monitoring, inverter checks, panel diagnostics). Same long article that nobody reads end-to-end. Turning it into a "what your SLA at level X covers" guided flow is mostly UX.
3. **Make/model support.** Multi-brand installers (SolarEdge, Fronius, Sungrow, Huawei, Victron, GoodWe) constantly answer "do you support my inverter?" Easy AI portal answer.

The market is also under active pressure right now (load-shedding tail-end, commercial buyers shifting from emergency to optimization), so MDs are receptive to lead-quality plays in a way they weren't 2 years ago.

## Search angles

To find candidates:

- `site:.co.za "wp-content" "commercial solar"`
- `site:.co.za "commercial solar" "preventative maintenance"`
- `site:.co.za "rooftop solar" "service level agreement"`
- `site:.co.za "PV" "what we offer" OR "what we do"`
- LinkedIn: filter `Managing Director` + `solar` + `South Africa` + `commercial`, visit each site to confirm WP + content depth
- Industry directories: SAPVIA (South African Photovoltaic Industry Association) member list, SESSA (Sustainable Energy Society Southern Africa)

Per-candidate qualification (eyeball before adding to list):

- WordPress (`wp-content` in source, or recognisable WP theme footer)
- Content-heavy "services" / "what we offer" / FAQ pages with multi-paragraph explanations
- Multi-product or multi-vertical (residential + commercial + industrial, or PV + battery + monitoring)
- Identifiable MD / Director / founder name on the team or about page
- 20+ employees (a few cues: team page with multiple people, multi-region offices, completed-project gallery with sizable installs)
- Public email address (find via Google "email address for <domain>" first; the site contact form is fallback only)

## Target list

Built over two Brave-search sweeps (2026-05-11). Each candidate still needs per-site verification (defuddle of services / commercial / what-we-offer page) to confirm content depth + WP detection, plus contact-email lookup via Google "email address for <domain>" before drafting.

### Tier A (priority: defuddle and personalise first)

Strong fit on every wedge criterion: B2B commercial/industrial focus, content-heavy WP sites likely, identifiable senior contacts, 20+ employees signalled, SA-rooted, not too big for a sole-operator to engage.

| # | Company | Domain | Named contact (role) | Contact email | Sweep notes |
|---|---|---|---|---|---|
| A1 | IBC Solar South Africa | ibc-solar.co.za | **Ethanne Soar (Head of Sales Gauteng)**, Bruno Lopes (BDM), Jason Campbell (Tech Sales & Product Mgr), Ross Dearham (Tech Sales Mgr, WC), Fredrik Hagelberg (MD) | ethanne.soar@ibc-solar.co.za, bruno.lopes@ibc-solar.co.za, jason.campbell@ibc-solar.co.za, ross.dearham@ibc-solar.co.za | CT HQ + JHB office, full named team page with direct emails/phones. **5 named Technical Sales Support Engineers** confirms the pre-sales-engineer-load wedge is real. Defuddled 2026-05-11. |
| ~~A2~~ | ~~SOLA Group~~ | ~~solagroup.co.za~~ | DROP | DROP | Defuddled 2026-05-11: **wrong wedge**. SOLA is a PPA / wheeling business, not an installer. 3GW built, 535MW operational, R20B raised. Buyer is corporate procurement (Vodacom, Coca-Cola, Amazon, AB InBev, Sasol, etc.), no pre-sales-engineer pain to relieve. Moved to Drop list. |
| ~~A3~~ | ~~SOLINK~~ | ~~solink.co.za~~ | DROP | DROP | Defuddled 2026-05-12: **wrong wedge**. Independent solar advisor / consultant, NOT an EPC installer. Buyer is a corporate energy manager evaluating multiple EPCs; SOLINK staff ARE the engineers. No inbound prospect pipeline. Moved to Drop list. |
| A4 | Terra Firma | terrafirma.africa | **Ben Snyman**, Grant Berndsen (CEO) | Contact form only: terrafirma.africa/contact (no public email) | **Included 2026-05-14** after Interceptor resolve+credibility test passed (homepage: "definitive experts in commercial solar and energy storage solutions for business", 550+ C&I projects, /our-team confirms Ben Snyman + Grant Berndsen). Custom theme (NinePoint, NOT WP). 300+ staff, R1.3bn wheeling pivot: scale stretch, target Ben Snyman not the CEO. No public email surfaced (contact page lists phones only), so it routes through submit-form.sh, not the Gmail-draft batch. |
| A5 | BrightBlack Energy | brightblack.co.za | Wessel Surname (TBC role), Phillip Grobler, Riaan Wyk, Handre Burger | consult@brightblack.co.za, wessel@brightblack.co.za | WP + Elementor. 100+ projects, 30 MW+ total, 100-500 kWp typical bracket. Multi-brand (Huawei, Goodwe, ATESS, SolarEdge, Jinko, JA Solar, Longi). 3 financing structures (outright / PPA / buy-back). 51% black-owned, B-BBEE Level II. Defuddled 2026-05-12. |
| ~~A6~~ | ~~Solar MD~~ | ~~solarmd.co.za~~ | DROP | DROP | Defuddled 2026-05-12: **wrong wedge**. Battery manufacturer (LiFePO4 in Cape Town), not an installer. Sells through installers like IBC Solar. Crunchbase + ENF Solar classify as "Solar Components" manufacturer. No pre-sales-engineer pain. Moved to Drop list. |
| A7 | Solareff | solareff.co.za | **DeVilliers Botha (CCO / Co-founder)**, Jaco Botha (CEO) | info@solareff.co.za, d.botha@solareff.co.za | WP confirmed. 279 MWp + 47 MWh commissioned. Landmark: 7.216 MWp Eastgate (largest registered rooftop in SA), 6.8 MWp Boardwalk Inkwazi, Clearwater Mall (first commercial 1 MWp+). 3-division: Solutions / Assets / Finance (PPA via Stanlib). CCO is SAPVIA Board + Grid Access Subcommittee + SANS 10142-3 workgroup. CEO was Eskom Renewable Grid Code Committee advisor. SAPOA member. Defuddled 2026-05-12. |
| A8 | AWPower | awpower.co.za | **Christiaan Hattingh (MD)** | info@awpower.co.za | WP confirmed. 156 kWp Kenridge Shopping Centre (SolarEdge, 380 modules), 50 kW + 112.64 kWh hybrid Drakenstein, 30.6 kW SPCA. Multi-brand: SolarEdge / Deye / Solis / Victron / Mercer inverters, Canadian Solar / JA Solar / Jinko panels, Solar MD / Revov / Deye batteries. 7-step EPC process documented. Chief Design Engineer on team. Water Engineering Services as separate division. Defuddled 2026-05-12. |
| A9 | Genergy | genergy.co.za | **Kevin Slabbert (MD)**, Terry Billson (CEO/Founder), Astrid Forbes (Co-founder/Director) | info@genergy.co.za | WP confirmed. 16+ years C&I-only. 40+ projects spanning Nautica Mall, Heritage Mall, Aurora Hospital, P.E. Cold Storage, Shoprite Parklands, Dairy Group SA, Wool Testing Bureau, Woodridge College. 8 service lines (Commercial Solar / Hybrid + BESS / PPA / Solar Thermal / Project Dev / EPC / O&M / System Monitoring). Widest sector spread in batch. Defuddled 2026-05-12. |
| ~~A10~~ | ~~GreenHouse~~ | ~~greenhouse.co.za~~ | DROP | DROP | Defuddled 2026-05-12: **wrong scale**. Explicit "households and SMEs" targeting, max referenced system 11 kW (Tesla Powerwall), residential FAQ tone throughout. Buyer is homeowner / small office. "Solar Rescue Service" is residential remediation. Moved to Drop list. |
| A11 | IMPOWER | impower.solar | **Jay Naidoo (CEO)**, Rezeen Daniels (marketing) | info@impower.solar, marketing@impower.solar | WP (SKT Mosque theme). Named C&I clients: Pick n Pay, Capitec (715 kWp + 500 kWh), Mooi Rivier Mall, Coral Beach. 3 service lines: Project Dev + EPCM + O&M. 100kW-1MW bracket, ~150MW dev pipeline. BBBEE L1. Defuddled 2026-05-12. |
| A12 | Specialized Solar Systems | specializedsolarsystems.co.za | **Peter Bergs (MD)**, Ryan Oliver (COO) | info@specializedsolarsystems.co.za, peter@specializedsolarsystems.co.za | WP + Yoast + WooCommerce, founded 2008. Authorised Victron. Named C&I: 229.6 kWp George, 100 kWp Mungo Mills, 45 kVA Ganzevlei. Agri: Blomfontein Dairy, Safari Ostrich. AC/DC/grid-tied coupling explained on site. SAPVIA member, 38 emp. Defuddled 2026-05-12. |
| A13 | AgriSolar Solutions | agrisolarsolutions.co.za | **Cheyne (founder)** | info@agrisolarsolutions.co.za | WP (Divi 4.27.4). KZN agri specialist (Pecana Farm, Muden). 6 distinct solution lines: Grid-Tied / Hybrid / Off-Grid / Pumping / Cold Rooms / Monitoring. Section 12B guidance offered. Founder name "Cheyne" surfaced from /about-us via Interceptor 2026-05-14 (first name only; engineer, family-farm origin story). Defuddled 2026-05-12. |
| A14 | AM Solar (Pty) | amsolar.co.za | TBC | info@amsolar.co.za | **NOT WordPress — Wix** (static.wixstatic.com CDN). Northcliff JHB, since 2009, BBBEE L2. 9 brand accreditations (Victron, ATESS, Sunsynk, Huawei, SolarEdge, FoxESS, SigenEnergy, Freedom Won, Megarevo) — multi-brand config complexity is the wedge. Tesla Powerwall 2/3 certified. Defuddled 2026-05-12. |
| ~~A15~~ | ~~Sonop Solar~~ | ~~sonopsolar.co.za~~ | DROP | DROP | Defuddled 2026-05-12: **wrong scale**. Residential / small rural Western Cape. Example systems all 5 kVA / 6 kW household. SPAR Citrusdal backup + private estate Durbanville are the largest projects. Jaco Hunter (MD), info@sonopsolar.co.za. Moved to Drop list. |
| ~~A16~~ | ~~Soventix South Africa~~ | ~~soventix.co.za~~ | DROP | DROP | **Domain down (2026-05-14).** soventix.co.za fails to resolve. No site to defuddle, no corpus to demo against. Was already borderline (Webflow parent, SA-site defuddle failed, PPA / IPP messaging). Moved to Drop list. |
| A17 | Treetops Solar | treetopssolar.co.za | **Stefan Ortmann (co-founder)**, Helen Ortmann (co-founder), Martin Pollack | info@treetopssolar.co.za (confirmed via Interceptor 2026-05-14) | Cape Town, since 2010, family-run, 600+ projects. Content-heavy with explicit 6-step process page (listen → design → plan → install → commission → monitor) that's exactly the trapped-expert-knowledge pattern. Flagship: 800 kWp + 1.7 MWh for Pathcare N1, 744 kWp shopping centre, 212 kWp + 400 kWh for Rustenburg Girls' High (largest SolarEdge battery in WC). Defuddled 2026-05-11. |
| A18 | Cape Solace | capesolace.co.za | **Henri Finnemore (CEO)** | info@capesolace.co.za | WP confirmed (wp-content in image URLs). 400+ clients, 6 service lines (commercial / agri / residential / O&M / financing / consultancy). Multi-brand: JA Solar, Sungrow, Deye. Projects: 65 kWp SPAR Eversdal, 200 kW hybrid Zambia, 50 kW Deye Tokai. Email source: Henri's own LinkedIn post (highest-confidence in batch). Defuddled 2026-05-12. |

### Tier B (defuddle if Tier A doesn't fill the 30-50 batch)

Plausible fit, but unclear on company size, B2B focus, or content depth without site visit.

| # | Company | Domain | Notes |
|---|---|---|---|
| B1 | Clotan Steel (solar arm) | clotansteel.co.za | Confirmed WordPress (wp-content visible), industrial/commercial solar systems |
| B2 | First Energy | firstenergy.co.za | CT + JHB + Pretoria, commercial + residential |
| B3 | The Solar Agency | thesolaragency.co.za | CT + Western Cape, installations + training |
| B4 | ARTsolar | artsolar.net | Local panel manufacturer, Durban/JHB/CT branches (may be too product-focused, not service) |
| B5 | SECS Solar | TBC | Full EPC 5 kW+, residential/commercial/industrial, SAPVIA-approved training |
| B6 | Herholdts | herholdts.co.za | Western Cape EPC 5 kW+, has training academy SAPVIA approved, 10 branches nationally |
| B7 | Sensible Solar | sensiblesolar.co.za | KZN + Gauteng + WC, hybrid/off-grid/grid-tie |
| B8 | Affordable Power Solutions (APS) | affordablepowersolutions.co.za | Agri specialist (crop/fruit/dairy/vineyards/packhouses), strong content focus |
| B9 | Alt Energy | altenergysolutions.co.za | Commercial + industrial + agricultural, engineering positioning |
| B10 | SMEI Renewables | smeirenewables.co.za | Southern Africa agri (poultry/dairy) |
| B11 | Full Solar Systems | fullsolarsystems.co.za | Gauteng, commercial + residential |
| B12 | GC Solar | gcsolar.co.za | National branches |
| B13 | JC Solar Panels | jcsolarpanels.co.za | National coverage, residential + commercial |
| B14 | Solarworld | solarworld.co.za | CT focus, large commercial projects, possibly distributor-leaning |
| B15 | Cape Solar PV Consultants | TBC | CT consultancy focus, system design + sizing |
| B16 | Cudub Holdings | TBC | Centurion, PV Greencard installer, SAPVIA member |
| B17 | Soventix | TBC | SAPVIA listed |
| B18 | Current Automation (Victron Products SA) | victronproducts.co.za | Distributor angle, may be too wholesale-focused |
| B19 | Greentech Power Solutions | TBC | Gauteng commercial + residential |
| B20 | Greenpower Energy | TBC | EPC backup/hybrid/off-grid |
| B21 | IC Solar | icsolar.co.za | Paarl + Winelands, 100 kW FoxESS install for Solo Agri Park (first in SA), agri-adjacent |
| B22 | ExSolar | exsolar.co.za | Western Cape, decade+ presence, "solar solutions" positioning |
| B23 | oneSolar | onesolar.co.za | Western + Eastern Cape branches, commercial + residential, multi-branch model |
| B24 | JUWI Renewable Energies | juwi.co.za | Large EPC: 340 MW for Glencore / Teraco / Sasol / Air Liquide in 2025, mining + data-centre focus. Maybe too big, but a single referral could be transformational |
| B25 | NEOSUN Energy SA | neosun.com | JHB office in Rosebank, C&I + utility 100 kW - 10 MW+, international parent |

### Per-candidate defuddle findings (2026-05-12)

Full observations + SA-specific question per candidate, used to populate the body template's L1 / L2 / specific-page-name slots.

#### A4 Terra Firma (included 2026-05-14 — target Ben Snyman, not the CEO)
- **Pages observed:** Services (full-stack EPC + COPPER platform), Projects (Shoprite, MTN, Growthpoint, SPAR), Wheeling programme page.
- **Platform note:** Custom theme by NinePoint agency (no WordPress).
- **Obs 1:** COPPER proprietary electricity management platform built in-house — real-time visibility for existing clients, signals software investment but inward-facing.
- **Obs 2:** 350+ MW installed, 550+ C&I projects, 30+ MWh BESS. Flagship: NCP Chlorchem 27 MWp, MTN 5 MWp + 6 MWh BESS. Project bracket 1-50 MW.
- **Obs 3:** Dual-track model — outright EPC + 65+ MW PPA / wheeling pipeline (110 MW wheeling announced 2024, R1.3bn programme). Active move up-market.
- **Q:** "For a 3 MWp rooftop installation at a distribution warehouse in Gauteng, what Section 12B accelerated depreciation structure applies and how does it interact with the NRS 097-2-1 grid-tie protection relay requirement?"
- **Recommendation:** target Ben Snyman (CBO) not CEO. Likely too large for the wedge; flag for John to make the call before drafting.

#### A5 BrightBlack Energy
- **Pages observed:** Services (full EPC lifecycle + 3 financing structures), Projects (named multi-brand combos), About (B-BBEE Level II).
- **Obs 1:** Services page covers full EPC lifecycle plus three distinct financing structures: outright purchase, PPA, system buy-back. Each has its own qualification pathway.
- **Obs 2:** Projects page names specific inverter + panel + BESS combinations per project (e.g., "JA Solar / Goodwe & ATESS"). Multi-brand complexity across sites = repetitive brand/compatibility questions.
- **Obs 3:** 51% black-owned, Level II B-BBEE — differentiator emphasised in enterprise/tender contexts, adds a compliance Q&A angle.
- **Q:** "For a 300 kWp rooftop system with 400 kWh ATESS BESS in the Western Cape, what is the Section 12B tax incentive calculation and does the ATESS unit qualify as an 'energy storage component' under the SARS ruling?"

#### A7 Solareff
- **Pages observed:** Solutions (EPC), Assets (O&M + monitoring), Finance (PPA via Stanlib), Projects (40+ case studies), About (founder regulatory credentials).
- **Obs 1:** Three-division structure: SolareffSolutions (EPC), SolareffAssets (ongoing asset management + monitoring), SolareffFinance (PPA/funding via Stanlib). Each has its own content-heavy sub-site.
- **Obs 2:** CCO DeVilliers Botha is on SAPVIA Board, Grid Access Subcommittee, SANS 10142-3 workgroup, and spoke at Solar Power Africa 2024. CEO Jaco Botha was on Eskom Renewable Grid Code Committee. Regulatory depth at founder level means prospects ask grid-code questions staff must answer correctly.
- **Obs 3:** 279 MWp + 47 MWh commissioned. Landmark: 7.216 MWp Eastgate Shopping Centre (largest registered rooftop solar PV in SA), 6.8 MWp Boardwalk Inkwazi, Clearwater Mall (first commercial 1 MWp+ in SA).
- **Q:** "What SSEG registration process applies to a 500 kWp rooftop at a Gauteng distribution-connected facility, and does the NRS 097-2-1 protection relay requirement change if we parallel-couple a 200 kWh BESS?"

#### A8 AWPower
- **Pages observed:** Commercial Solutions, 7-step EPC process, Projects (Kenridge / Drakenstein / SPCA), Team.
- **Obs 1:** 7-step commercial EPC process documented: enquiry + requirements analysis → initial estimate + provisional design → due diligence + site visit → engineering proposal with design + costing → installation + project management → commission + handover → SLA for asset protection.
- **Obs 2:** Multi-brand across 5+ inverter brands (SolarEdge, Deye, Solis, Victron, Mercer), 3+ panel brands (Canadian Solar, JA Solar, Jinko), 3+ battery brands (Solar MD, Revov, Deye). Named C&I case: Kenridge Shopping Centre 156 kWp SolarEdge.
- **Obs 3:** Water Engineering Services as a distinct division — broader B2B services complexity beyond pure solar.
- **Q:** "For a 200 kWp Cape Town commercial rooftop using SolarEdge optimisers, what string configuration minimises shade losses and meets City of Cape Town SSEG application requirements for a grid-tied system?"

#### A9 Genergy
- **Pages observed:** Services (8 lines), Projects (40+), About (3 named founders).
- **Obs 1:** Services page lists 8 distinct lines: Commercial Solar, Hybrid + BESS, PPA, Commercial Hot Water / Solar Thermal, Project Development, EPC, Operations & Maintenance, System Monitoring.
- **Obs 2:** 40+ completed projects spanning shopping centres (Nautica, Heritage Mall, Shoprite Parklands), industrial (P.E. Cold Storage, Keypak Phase 1+2), agri (Dairy Group SA), hospital (Aurora), schools (Woodridge College). Widest sector spread in this batch.
- **Obs 3:** Three named founders/directors visible: Terry Billson (CEO/Founder), Astrid Forbes (Co-founder/Director), Kevin Slabbert (MD). Clear decision-maker chain to target.
- **Q:** "For a 300 kWp installation at a cold-storage facility in Port Elizabeth with critical refrigeration load, what BESS sizing and UPS bypass configuration is needed to maintain NRS 048 power-quality compliance during a 4-hour grid outage?"

#### A11 IMPOWER
- **Pages observed:** Services (3 lines: Project Dev & Financing, Solar EPCM, Solar O&M), Projects (organised by vertical: Shopping Centres / F&B / Education / Aged Care / Wineries / Veterinary), About.
- **Obs 1:** Three distinct service lines on Services page — Project Development & Financing (in-house funding structuring), Solar EPCM (end-to-end custom plant), Solar O&M (dedicated team, ongoing monitoring).
- **Obs 2:** Projects page organised by industry vertical with named client logos (Pick n Pay, Capitec, Eskort, Mooi Rivier Mall).
- **Obs 3:** 100 kW to 1 MW typical bracket, ~150 MW under development, BBBEE Level 1, Solar Assets Africa "Best Team Performance of the Year" award.
- **Q:** "For a 715 kWp rooftop system with integrated 500 kWh battery and on-site generator, what NRS 097-2-1 protection relay settings does the municipality require, and how does the SSEG registration process differ between Cape Town and eThekwini?"

#### A12 Specialized Solar Systems
- **Pages observed:** Commercial Solutions (AC / DC / grid-tied coupling explained), Agricultural Solar Services (irrigation / cold rooms / dairy / packhouses), Case Studies (multi-vertical).
- **Obs 1:** Commercial Solutions page covers AC coupling, grid-tied coupling, and DC coupling as distinct architectures with technical explanations.
- **Obs 2:** Agricultural solar listed as separate service line — Blomfontein Dairy Farm and Safari Ostrich Farm named with video case studies.
- **Obs 3:** SAPVIA member, 38 employees, "Best of George 2024 + 2025" award, founded 2008.
- **Q:** "For a 90 kVA three-phase Victron Quattro installation on a dairy farm with 80 kWh Freedom Won LIFEPO4 storage, what NRS 097-2-1 anti-islanding settings apply, and can the system qualify for Section 12B accelerated depreciation in year one?"

#### A13 AgriSolar Solutions
- **Pages observed:** Services (6 solution lines), Hybrid Systems (cold storage + irrigation use-cases), Free Site Assessment (Section 12B guidance).
- **Obs 1:** Services page lists six distinct solution types: Grid-Tied, Hybrid, Off-Grid, Solar Pumping & Irrigation, Solar for Cold Rooms & Processing, Energy Monitoring.
- **Obs 2:** Hybrid systems page calls out cold storage rooms and irrigation pumps as primary use cases, with "intelligent switching between solar, grid, and batteries" as a named feature.
- **Obs 3:** Free site assessment includes ROI analysis and Section 12B tax-benefit eligibility guidance — signals sales team handles complex financing questions manually.
- **Q:** "For a 15 kW cold room running 18 hours/day on a KZN packhouse with unreliable grid, what battery bank size (kWh) and solar array (kWp) is needed for a hybrid system to guarantee 6 hours off-grid backup, and does a Section 12B election apply to the full system cost?"

#### A14 AM Solar (Pty)
- **Platform note:** Wix, not WordPress. Defuddle still works; flag in body that this is not a typical WP target — but multi-brand complexity wedge is strong.
- **Pages observed:** Commercial Technology (9 brand accreditations), Solutions (Grid-Tied / Hybrid / Off-Grid with ROI/IRR figures), Residential PowerSURE + Tesla Powerwall.
- **Obs 1:** Commercial Technology page lists 9 brand accreditations — Victron, ATESS HV, Sunsynk, Huawei, SolarEdge, FoxESS, SigenEnergy, Freedom Won, Megarevo — each with separate product page linked.
- **Obs 2:** Solutions page distinguishes Grid-Tied / Hybrid / Off-Grid with ROI 1-5 years and IRR 15-70% figures stated.
- **Obs 3:** Tesla Powerwall 2 & 3 certified installer, BBBEE Level 2, since 2009, Northcliff JHB.
- **Q:** "For a 200 kVA Johannesburg factory operating 08:00-17:00, which is more cost-effective: a Huawei SUN2000-100KTL grid-tied array for pure self-consumption, or a SigenEnergy ESS hybrid system sized for 4-hour peak-shaving, and what CoC and municipal NRS 097-2-1 sign-off does each require?"

#### A16 Soventix South Africa (DROPPED 2026-05-14 — domain down)
- **Pages observed:** parent site (Webflow) Africa-South business-unit page. SA-domain defuddle failed.
- **Obs 1:** Parent page states scope across "rooftop, ground-mounted, or carport solar photovoltaic plants" for "Commercial and Industrial, as well as Utility-scale" Sub-Saharan Africa.
- **Obs 2:** Completed VW South Africa solar project (confirmed via InSolar case study) — large OEM industrial buyer, corporate procurement relationship.
- **Obs 3:** Strategic messaging foregrounds PPA / IPP expansion. REIPPP heritage since 2011 — company DNA is utility/IPP procurement, not SME direct-sell.
- **Q:** "What NRS 097-2-1 compliance documentation is required for a 500 kWp C&I rooftop system connecting to an Eskom HV feeder in Gauteng?"
- **Recommendation:** likely wrong buyer profile (corporate procurement / IC). Flag for John; not a hard drop but low wedge probability.

#### A18 Cape Solace
- **Pages observed:** Services (6 categories with sub-items), Projects (SPAR Eversdal, Zambia hybrid, Tokai), O&M page.
- **Obs 1:** Services page lists 6 explicit categories with sub-items: Commercial (containerised / ground-mount / load management / rooftop / carport), Agricultural (irrigation / consulting / ground-mount), Residential, O&M (remote fault finding / performance optimisation / preventive maintenance / monitoring), Financing, Consultancy (energy profiling / feasibility / system design).
- **Obs 2:** Project gallery includes 65.54 kWp SPAR Eversdal (Sungrow 50 kW + 116 x JA Solar 565 W) and 200 kW hybrid in Sinazongwe Zambia (245.76 kWh BESS, climate-controlled distribution room). Multi-brand, cross-border, 50-200 kW+ bracket.
- **Obs 3:** O&M as a standalone service line with "remote fault finding" listed — high-repetition-question surface (alarms, underperformance, firmware, brand diagnostics).
- **Q:** "Our 65 kWp Sungrow SG50CX at a Cape Town retail site is throwing an 'islanding fault' after a grid dip — what's the NRS 097-2-1 reconnect delay setting and do we need to re-submit CoC?"

### Drop list (out of profile, do not pursue this batch)

- **SOLA Group** — PPA / wheeling business not an installer (3GW built, signs 10-20 year power agreements with Vodacom/Coca-Cola/Amazon/Sasol). Buyer is corporate procurement, not pre-sales. Confirmed via 2026-05-11 defuddle. _(Was originally Tier A1, moved here.)_
- **SOLINK** — independent solar advisor / consultant, not an EPC installer. Helps corporates procure EPCs; SOLINK staff ARE the engineers. No inbound prospect pipeline. Confirmed via 2026-05-12 defuddle. _(Was originally Tier A3, moved here.)_
- **Solar MD** — battery manufacturer (LiFePO4 in Cape Town), sells through installers. Crunchbase + ENF Solar classify as "Solar Components". Wrong business model. Confirmed via 2026-05-12 defuddle. _(Was originally Tier A6, moved here.)_
- **Sonop Solar** — predominantly residential / small rural Western Cape (SPAR Citrusdal + Durbanville estate are the largest projects). Buyer is homeowner / small farm, not C&I. Confirmed via 2026-05-12 defuddle. _(Was originally Tier A15, moved here.)_
- **GreenHouse** — "households and SMEs" explicit positioning. Max referenced system 11 kW (Tesla Powerwall). Residential FAQ tone. "Solar Rescue Service" is residential remediation. Wrong scale. Confirmed via 2026-05-12 defuddle. _(Was originally Tier A10, moved here.)_
- **Soventix South Africa** — domain soventix.co.za is down (does not resolve, confirmed via Interceptor resolve test 2026-05-14). No site to defuddle, no corpus to demo against. Was already borderline: Webflow parent, SA-site defuddle failed, strategic messaging foregrounds PPA / IPP expansion (buyer drifts to corporate procurement). _(Was originally Tier A16, moved here.)_
- **Solarise Africa, SolarAfrica Energy, Engie SA, AIIM, AMPYR Solar Europe** — utility-scale IPP / private-equity scale, wrong buyer profile (corporate procurement, not feeling pre-sales pain)
- **Neosun Energy SA** — international parent (Russian-origin), unclear local autonomy
- **SAP Africa, Vivo Energy, Pernod Ricard** — false hits, not solar businesses
- **World of Sun & Wind Power** — mostly residential / consumer product retail
- **Energybee, Techpoint, SolarZA, ensun directories** — aggregators, not installers
- **Solar Voltaics (UK), Mypower (UK), Agri Solar NZ, Big Dog Solar (US)** — wrong geography

### Round-3 sources mined (2026-05-11)

Confirmed dead-ends:

- **SAPVIA Members Service Directory** at `/members-service-directory/categories/epc` returns 404. The current SAPVIA site doesn't expose a public member list at predictable URLs; manual login required.
- **PV GreenCard installer directory** at `pvgreencard.co.za/app/directory/` exists but is a Business Software Services page, not a public companies list.
- **LinkedIn "Head of Sales" + solar + South Africa** via Brave didn't surface specific named contacts useful for cold-mail personalisation; better to visit each candidate's team page manually.

Productive sweep angles:

- Provincial focus (`"commercial solar installer" Stellenbosch OR Paarl OR Western Cape`) found Soventix, Cape Solace, Treetops, IC Solar, ExSolar, oneSolar.
- SAPVIA awards / industry articles surfaced JUWI's 340 MW programme for Glencore/Teraco/Sasol/Air Liquide.
- Manufacturer-installer cross-references (Victron/Sungrow + SA) surfaced GreenHouse, Specialized Solar Systems, Sonop Solar.

### Total tier-A + tier-B count

18 Tier A + 25 Tier B = **43 candidates**. Meets the 30-50 batch floor with headroom for per-candidate eliminations during verification.

### Per-candidate verification checklist (before drafting)

For each Tier-A row (and any Tier-B promoted to A), confirm before personalising:

- [ ] Visit the site, confirm content-heavy services / commercial / about / how-we-work pages exist
- [ ] WordPress confirmed (view source: `wp-content` present); flag if WP but built on a heavy page-builder (Elementor / Divi) where defuddle is less reliable
- [ ] Defuddle the most content-rich page, capture 2-3 specific observation points (what the page covers, named processes, named brands they install)
- [ ] Identify a realistic SA-specific sizing/regulatory question their typical prospects ask (NRS 097 / SSEG / Eskom thresholds, brand-specific configurations, kWp brackets)
- [ ] Find contact email via Google "email address for <domain>" (per CLAUDE.md global rule, defuddle and Interceptor are fallbacks)
- [ ] Confirm company size signal (team page count, branches, project gallery, SAPVIA member listing)
- [ ] Confirm commercial-scale focus, not residential-only (look for "commercial" / "industrial" / "C&I" / kWp brackets above 30)

## Body template (cold, stock-demo + qualified-POC CTA)

Strategy pivot (2026-05-11, after Gemini review): instead of building a free custom demo for every recipient, lead with a pre-built SA-rooted stock demo that's live and clickable on day one (`demo.devai.co.za/commercial-solar`). Offer the 48-hour custom POC only after a qualifying discovery call. This caps time-cost, qualifies prospects before any custom build, and fixes brand fragmentation (no more linking out to `signaltrace.wiki`).

Voice pivot (2026-05-12, after second Gemini review): v1 template ("Saw <Company>'s site while looking at...") tested as too robotic and too technical. v2 below uses Zendesk patterns #5 (straight to business) + #6 (paint a picture). Gemini estimates reply rate jumped from 3-5/100 to 15-20/100. Tech specifics now live only in the parenthetical demo-link examples, not in the prose.

Per-recipient personalisation happens in the bracketed slots:

```
Subject: A quieter inbox for the <Company> sales team

Hi <Name>,

It's late Thursday afternoon. One of your sales
engineers is replying to email number nine for the
day, all the same question phrased two different
ways: <plain-language version of the recurring
prospect question>.

The next prospect who emails won't hear back until
Monday. <one short line that shows you know
<Company>'s scale or content depth>.

Imagine the same prospect on the <Company> site
at 8pm, typing that question into a search box,
and reading a cited answer pulled straight from
your own <specific page/content area> in under five
seconds.

The Monday backlog shrinks. The prospects
who still reach out are qualified for high-value
conversations, like <one specific high-value
conversation type their senior staff want more of>.

I build the second picture. Live SA commercial-solar
example I built for this market:

https://demo.devai.co.za/commercial-solar
(Try a real question, e.g., "what NRS 097 compliance
applies to a 50 kWp rooftop in Cape Town?" or "Victron
MultiPlus II options for a 200 kVA factory backup?")

If this looks useful, I can build you a private demo
in 48 hours, using about twenty <Company> pages,
so you can try it on your own content before any
commitment.

Worth 15 minutes?

Thanks,
John
- - - - - - - - -
Web: https://devai.co.za
Mobile: +27 79 177 1970
```

### Canonical filled example (Solareff / DeVilliers Botha)

Use this as the voice reference when filling other recipients.

```
Subject: A quieter inbox for the Solareff sales team

Hi DeVilliers,

It's late Thursday afternoon. One of your sales
engineers is replying to email number nine for the
day, all the same question phrased two different
ways: should the prospect sign a PPA or go capex,
and which grid-code applies to their rooftop.

The next prospect who emails won't hear back until
Monday. Solareff's site has the answers, somewhere
across three divisions and four hundred pages of
case studies, but most prospects won't dig.

Imagine the same prospect on the Solareff site
at 8pm, typing that question into a search box,
and reading a cited answer pulled straight from
your own Solutions and Finance pages in under five
seconds.

The Monday backlog shrinks. The prospects
who still reach out are qualified for high-value
conversations, like a PPA structuring call with
Stanlib.

I build the second picture. Live SA commercial-solar
example I built for this market:

https://demo.devai.co.za/commercial-solar
(Try a real question, e.g., "what NRS 097 compliance
applies to a 50 kWp rooftop in Cape Town?" or "Victron
MultiPlus II options for a 200 kVA factory backup?")

If this looks useful, I can build you a private demo
in 48 hours, using about twenty Solareff pages,
so you can try it on your own content before any
commitment.

Worth 15 minutes?

Thanks,
John
- - - - - - - - -
Web: https://devai.co.za
Mobile: +27 79 177 1970
```

### Day-3 follow-up

```
Subject: Re: A quieter inbox for the <Company> sales team

Hi <Name>,

Just checking this reached you.

Thanks,
John
```

### Day-7 follow-up

```
Subject: Re: A quieter inbox for the <Company> sales team

Hi <Name>,

One last try. Is reducing repetitive pre-sales email a
priority for <Company> right now?

If timing's wrong I'll close the loop. If it's worth a
look, the live demo is at https://demo.devai.co.za/commercial-solar.

Thanks,
John
```

### Voice notes for personalising

- **The recurring prospect question (para 1):** plain English, not jargon. Two related sub-questions joined by "and" reads naturally. Translate from the defuddle's SA-specific question slot into language a prospect would type, not a CCO. E.g., "should they sign a PPA or go capex, and which grid-code applies to their rooftop" not "NRS 097-2-1 parallel-coupling protection settings".
- **The scale/depth line (end of para 1):** weave in one concrete detail from defuddle that proves you've actually looked. Number of divisions, named partner, named landmark project, employee count, number of case studies. One detail, woven into the sentence, not a list.
- **The specific page/content area (para 2):** name an actual page or section from their site (Solutions page, Commercial page, Projects gallery, FAQ). The prospect "reading a cited answer pulled straight from your own <X>" needs <X> to be real and findable.
- **The high-value conversation type (end of para 2):** what does their senior staff want MORE of, that the portal frees them up for? PPA structuring, technical design review for utility-scale, agri sizing site-visits, etc. Map to their wedge.
- **Subject:** keep the "A quieter inbox for the <Company> sales team" frame. Don't paraphrase; consistency across the batch matters if any prospects share employees.
- Bare URLs only (no markdown wrapping).
- Plain "Thanks," not "Thanks for the work,"
- No asterisks for emphasis (renders literally in plain-text mail).
- No em-dashes anywhere (period, comma, colon, parentheses, or restructure).

## Personalisation effort per recipient

- ~10 minutes to defuddle their main services page and extract 2-3 observation points
- ~5 minutes to map a realistic sizing question to their product range
- ~5 minutes to confirm the public email address (or note that the contact form is the fallback)

Target: 90-120 min total per batch of 10-15.

## Reality check & funnel expectations (2026-05-12)

Notes on what this batch realistically does, written before send so expectations match outcomes.

### What the mail does well

- Specificity per recipient is high (defuddle-driven, not template-merged)
- Voice passes Gemini and ChatGPT review rounds, no em-dashes, no intensifiers, no AI-attribution
- Demo URL is real proof asset, not slideware
- 48-hour POC offer is genuinely low-friction
- Buyer respect: the mail does not patronise senior regulator-fluent readers

### What the mail does NOT do

- It does not close. It gets *replies*. Replies become discovery calls. Calls might convert. Three funnel steps, each with drop-off.
- Zero social proof yet. No client logos, no "I built this for X". That gap closes after the first paying client.
- Asks 15 minutes from senior board members who get 30 cold mails a week.

### Realistic outcome math for the 11-mail batch

| Stage | Conversion | Expected count |
|---|---|---|
| Sent | — | 11 |
| Opens (subject line) | 30-50% | 3-5 |
| Replies | 15-20% of sends (Gemini estimate) | 1-2 |
| Discovery calls | 50% of replies | ~1 |
| First-batch close | 20-40% of calls | 0-1 deal |

**Realistic expectation: 0 to 1 closed Phase 1 (R8,500) in a 2-4 week window from this batch alone.** Variance is wide enough that 0 closes from 11 mails is not a sign the mail is broken. It's a sign the sample is small. Scale up to 30-50 sends (dipping into Tier B) before drawing conclusions from outcomes.

### Three things that determine whether the funnel works, none of which are in the mail itself

1. **Demo reliability.** If a recipient clicks the demo and the streaming RAG returns a flaky or wrong answer to a question they care about, the mail's quality is moot. Worth running 10 realistic prospect questions through the demo before sending the first mail.

2. **Discovery-call frame.** What happens when someone says "OK, 15 minutes"? Is there a written call frame (what to ask, what to listen for, when to pitch Phase 1 vs decline)? This is the next bottleneck after replies.

3. **Follow-up discipline.** Day-3 and Day-7 follow-ups are templated. Most replies on cold outbound land on day 3 or day 7, not day 0. Sending the batch without committing to the follow-ups halves the expected reply count.

### Pre-send checklist

- [ ] **Smoke-test the demo** with the queries below. Confirm each returns a cited answer (not a fallback), the citations are real, the streaming completes without errors, and the wiki-note cards render. Log any failures or weak answers so corpus gaps can be patched before send.
- [ ] Decide subject line A/B vs single-variant (currently locked to "A quieter inbox for the <Company> sales team")
- [ ] Sketch a 1-page discovery-call frame so the next bottleneck is pre-thought
- [ ] ✅ Canonical demo URL path confirmed: `https://demo.devai.co.za/commercial-solar` (search UI is the landing as of 2026-05-12; `/search` no longer exists)
- [ ] Verify mail bodies render correctly in Gmail Drafts via gog before bulk-creating

#### Smoke-test query bank

**Happy path (5) — should return strong cited answers:**

1. "What NRS 097 compliance applies to a 50 kWp commercial rooftop in Cape Town?"
2. "Which inverters can I legally install on a commercial rooftop in Cape Town?"
3. "Above what capacity do I need NERSA registration vs just municipal SSEG?"
4. "What does the SAPVIA PV Green Card cover and why should I require it?"
5. "How do I size a hybrid PV plus battery system for a 200 kVA off-grid factory?"

**Per-prospect-specific (5) — pulled from the SA-specific questions in the defuddle findings, these are what a real CCO might paste in:**

6. "Should the prospect sign a PPA or go capex, and which grid-code applies to their rooftop?" (Solareff variant)
7. "What is the Section 12B tax incentive calculation for a 300 kWp rooftop with 400 kWh ATESS BESS in the Western Cape?" (BrightBlack variant)
8. "For a 90 kVA three-phase Victron Quattro installation on a dairy farm with 80 kWh Freedom Won storage, what NRS 097-2-1 anti-islanding settings apply?" (Specialized Solar variant)
9. "For a 200 kVA Johannesburg factory operating 08:00-17:00, compare a Huawei SUN2000-100KTL grid-tied array against a SigenEnergy ESS hybrid system for peak-shaving." (AM Solar variant)
10. "For a 15 kW cold room running 18 hours/day on a KZN packhouse with unreliable grid, what battery size and array is needed for a hybrid system to guarantee 6 hours off-grid backup?" (AgriSolar variant)

**Fallback path (2) — should trigger the "cannot answer from corpus" path with the email-us CTA:**

11. "What is the median electricity tariff for industrial users in Mozambique?" (off-corpus geography)
12. "Show me the latest Octopus Energy tariff for UK domestic solar customers." (off-corpus market entirely)

**Verification per query:**
- Streaming starts within 2 seconds
- Answer renders without overflow / styling breaks
- Citation markers `[1]`, `[2]` appear inline in the answer text
- Wiki-note source cards appear below the answer with WIKI NOTE pill + slot number + collection
- For fallback queries: the email-us CTA appears, and the "Tip: try one of the FAQ questions" badge shows
- For happy-path queries: the "Have a more specific question? Email us" footer link appears

## Send mechanics

1. Bodies in `scripts/outreach-drafts/bodies/01-<slug>.txt`, `02-<slug>.txt`, ...
2. Recipients array in `scripts/outreach-drafts/create-drafts.sh` with `info@devai.co.za` as the FROM
3. `./create-drafts.sh --dry-run` first
4. Real run when correct, drafts land in Gmail Drafts
5. John reviews each in Gmail before pressing send

## Send status

(populated once list is built and drafts are created)

| # | Company | Drafted | Sent | Reply | Demo built | Notes |
|---|---|---|---|---|---|---|
| _per-recipient rows_ | | | | | | |

## Reply log

(empty)
