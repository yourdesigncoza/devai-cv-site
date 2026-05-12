---
title: Cal.com-style redesign for demo.devai.co.za/commercial-solar
status: brief — awaiting approval before implementation
date: 2026-05-12
target: src/pages/commercial-solar/index.astro + layouts in demo-devai-site
reversibility: single feature branch, all changes scoped to 3 files + global.css theme block
---

# Cal.com-style redesign — design brief

## 1. Cal.com visual analysis (measured, not guessed)

Tokens extracted via runtime inspection of cal.com homepage on 2026-05-12.

### Page chrome

| Token | Value | Notes |
|---|---|---|
| Body bg | `rgb(244, 244, 244)` / `#f4f4f4` | Very light warm grey, not white. Single distinctive move. |
| Body text | `rgb(0, 0, 0)` | Pure black for body type. |
| Font family | `sans-serif` (system default → Inter loaded via web font in practice) | They don't fight the system stack. |

### Hero card

| Token | Value | Notes |
|---|---|---|
| Background | `rgb(255, 255, 255)` white | Elevated card pattern. |
| Border-radius | `12px` | Not exaggeratedly rounded. |
| Box-shadow | `rgba(36,36,36,0.7) 0 1px 5px -4px, rgba(36,36,36,0.05) 0 4px 8px 0` | Two-stop: thin top edge + soft drop. Very subtle. |
| Width | 1176px at 1880 viewport | Roughly max-w-6xl equivalent. |
| Height | 700px hero | Generous vertical space. |

### Typography — H1

| Token | Value | Notes |
|---|---|---|
| Font-size | `64px` (`text-6xl`-ish) | Massive. |
| Font-weight | `600` (semibold) | NOT bold. Cleaner. |
| Line-height | `70.4px` (~1.1) | Tight. |
| Letter-spacing | `normal` | No tightening or expansion. |
| Colour | `rgb(36, 36, 36)` | Slightly off-black, softer than pure `#000`. |

H1 reads "The better way to / schedule your / meetings" — three natural line-breaks at semantic phrase boundaries.

### Launch pill (above H1)

| Token | Value | Notes |
|---|---|---|
| Background | `rgb(245, 245, 245)` | Subtle grey, near body bg. |
| Border-radius | `9999px` | Full pill. |
| Padding | `4px 8px 4px 12px` | Asymmetric: room for the trailing `→` arrow. |
| Font-size | `12px` | Small. |

### Other distinctive moves

- **Buttons (Get started, Sign up with Google):** outer wrapper has `border-radius: 12px` and an inset highlight `box-shadow: rgba(255,255,255,0.15) 0 2px 0 inset`. The dark fill itself is on a nested element. Effect: button looks subtly raised, not flat.
- **Crosshair "+" marks** at the corners of the hero card area in the screenshot — small grey precision-grid markers. Distinctive cal.com cue.
- **Logo strip below the card** — "Trusted by fast-growing companies" + horizontal greyscale logos.
- **Trust ratings row** — Trustpilot / ProductHunt / G2 badges with 5-star ratings, small, aligned with secondary CTA.
- **Monochrome palette** — no brand colour appears in the hero. Pure black, pure white, pure grey. The only colour is in trust badges (Trustpilot green, ProductHunt orange).

## 2. What translates to demo.devai.co.za/commercial-solar

Three cal.com cues map directly to our context. Two we should NOT copy.

### Adopt

| Cal.com pattern | Our adaptation |
|---|---|
| Light grey body bg + elevated white hero card | Same. `#f4f4f4` body, white card with `12px radius` and the same two-stop shadow. |
| Massive H1 at 64px, semibold, slightly off-black | "SA Commercial Solar" or "Ask the corpus" becomes our 64px H1. Pick one. |
| Subtle launch pill above H1 | `Live demo · 17 sources indexed →` linking to a corpus-sources block. |
| Two-stop shadow language for the hero card | Same shadow on FAQ card, answer card, source cards. |
| Corner "+" crosshair marks | Optional. Small visual flourish, low cost. |
| Monochrome restraint | Brand-blue stays only on the Ask button + answer card tint. H1 stays off-black, not gradient. |

### Skip (different product context)

| Cal.com pattern | Why not |
|---|---|
| Two-column hero (copy left, product preview right) | Our product preview IS the search widget. Splitting the hero into "pitch + preview" doubles the page weight when prospects already arrived to type a question. Single column wins. |
| Multi-CTA stack (Google + email + microcopy) | We have one CTA: ask a question. No signup, no auth. Trying to imitate cal.com's stacked CTAs would invent friction. |
| Trust badge row (Trustpilot / ProductHunt / G2) | We have zero of these yet. Faking would backfire. The "More examples" JobAbroad link already serves this slot. |
| Sticky header with multi-dropdown nav | Our nav is one link. Cal.com's nav is product navigation; ours is brand-exit only. |

## 3. Recommended structure for our hero

Single-column, search-as-hero. Total height aimed at ~600-700px so the search box sits within first viewport.

```
┌────────────────────────────────────────────────────────┐
│  body bg: #f4f4f4                                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │  HEADER (transparent over body bg)               │  │
│  │  · DevAi Demos                                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ HERO CARD (white, radius 12, two-stop shadow)    │  │
│  │ +                                              + │  │
│  │                                                  │  │
│  │   ← devai.co.za                                  │  │
│  │   ┌─────────────────────────────────────────┐    │  │
│  │   │ Live demo · 17 sources indexed →        │    │  │
│  │   └─────────────────────────────────────────┘    │  │
│  │                                                  │  │
│  │   SA Commercial Solar     (64px, semibold,       │  │
│  │                            off-black, ~1.1 lh)   │  │
│  │                                                  │  │
│  │   Ask a real question. Get a cited answer        │  │
│  │   pulled from public SA commercial-solar         │  │
│  │   content. (subhead, grey, ~18px)                │  │
│  │                                                  │  │
│  │   ┌─────────────────────────────────────────┐    │  │
│  │   │ FAQ                                     │    │  │
│  │   │  · question 1                           │    │  │
│  │   │  · question 2                           │    │  │
│  │   │  · question 3                           │    │  │
│  │   │  · question 4                           │    │  │
│  │   │  · question 5                           │    │  │
│  │   └─────────────────────────────────────────┘    │  │
│  │                                                  │  │
│  │   [ Type your own question... ]  [ Ask ]         │  │
│  │                                                  │  │
│  │ +                                              + │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ─────────────────────────────────────────────────     │
│  Sourced from: CoCT · NRS 097 · SAPVIA · NERSA ·       │
│  Segen Solar SA                                        │
│                                                        │
│  More examples: jobabroad.co.za/demo/healthcare        │
│                                                        │
│  FOOTER                                                │
└────────────────────────────────────────────────────────┘
```

### Concrete spec

| Element | Spec |
|---|---|
| Body bg | `#f4f4f4` (custom theme token: `--color-page-bg`) |
| Hero card | `bg-white`, `rounded-xl` (12px), shadow `0 1px 5px -4px rgba(36,36,36,.7), 0 4px 8px 0 rgba(36,36,36,.05)`, max-w-3xl, mx-auto, padding `48px` (md) / `32px` (sm) |
| Launch pill | `inline-flex`, `bg-gray-100`, `rounded-full`, `text-xs`, padding `4px 12px 4px 12px`, trailing `→` arrow |
| H1 | `text-5xl md:text-6xl` (~48 → 64px), `font-semibold` (NOT bold), `tracking-tight` to mimic cal.com tight rhythm, `text-[#242424]`, no gradient |
| Subhead | `text-lg` (~18px), `text-gray-600`, max ~ 60 ch wide, leading-relaxed |
| FAQ card | Same as current but with the two-stop shadow + slightly more padding |
| Ask button | Brand-blue stays (`bg-brand-600`) — this is our ONE colour accent. Adds inset highlight `inset 0 2px 0 rgba(255,255,255,0.15)` like cal.com. |
| Corpus source strip | Below hero card, outside it. `text-sm text-gray-500`, "Sourced from:" + comma-separated source list. |
| Corner "+" crosshair | 4 absolutely-positioned `+` glyphs at card corners, `text-gray-300`, `text-xs`, no interaction. |
| Footer | Stays as-is (the brand accent line we already added). |

### Pill copy options

Pick one:
- `Live demo · Free to try →`
- `17 sources indexed · See what's covered →` (link to source list)
- `Built for SA commercial solar prospects →`

I recommend the second — it doubles as a corpus credibility signal.

## 4. File-by-file implementation plan

Three files touched. All changes additive — easy to revert via `git restore` per file.

### `src/styles/global.css`

Add theme tokens:
```css
@theme {
  --color-page-bg: #f4f4f4;
  --color-ink: #242424;
  --shadow-card-cal: 0 1px 5px -4px rgba(36, 36, 36, 0.7), 0 4px 8px 0 rgba(36, 36, 36, 0.05);
}
```

Change body bg to `#f4f4f4`.

### `src/layouts/BaseLayout.astro`

- Header: remove the white background and border-bottom. Header becomes transparent and sits on the grey body bg (cal.com pattern).
- Footer: keep current brand accent line.

### `src/layouts/VerticalLayout.astro`

- The current `<div class="max-w-6xl mx-auto px-4 py-6">` wrapper expands to give breathing room above the card.
- The breadcrumb + H1 + slot now live INSIDE a hero card (`bg-white rounded-xl shadow-[var(--shadow-card-cal)] p-8 md:p-12 max-w-3xl mx-auto my-12`).
- "More examples" aside moves OUTSIDE the hero card, below it, on the grey bg.
- Add corner `+` crosshair marks (optional — propose with, easy to remove).

### `src/pages/commercial-solar/index.astro`

Inside the new hero card:
1. Add launch pill above current section
2. Add subhead paragraph between H1 and "Ask the corpus"
3. Keep FAQ + input form
4. Update Ask button to use brand-blue with inset highlight

Below the hero card (in VerticalLayout slot or page):
- Corpus source strip ("Sourced from: ...")

## 5. Reversibility plan

Work on a feature branch off `main`:
```
git checkout -b cal-style-redesign
```

All changes confined to 4 files:
- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/layouts/VerticalLayout.astro`
- `src/pages/commercial-solar/index.astro`

To revert:
```
git checkout main -- src/styles/global.css src/layouts/BaseLayout.astro src/layouts/VerticalLayout.astro src/pages/commercial-solar/index.astro
```

No new dependencies. No DB migrations. No env changes. Zero blast radius beyond visual.

## 6. Risks

| Risk | Mitigation |
|---|---|
| Hero card on grey bg makes the page feel "marketing site, not tool" — wrong signal for a regulator-fluent CCO | Subhead copy stays factual ("Ask a real question, get a cited answer..."), no hype. H1 stays off-black, not gradient. Brand-blue restricted to one button. |
| 64px H1 might wrap awkwardly on mobile | Use `text-5xl md:text-6xl` so mobile gets 48px. Test on viewport widths 375 / 768 / 1280. |
| Cal.com pattern is over-recognised — looks derivative | The combination of brand-blue accent (we have, cal.com doesn't) + SA-specific content + smaller hero card (max-w-3xl vs cal.com's wider) reads as "inspired by", not "copy". Adding "Sourced from: NRS 097 / SAPVIA / CoCT" makes the page distinctly ours. |
| Trust pill claims "17 sources indexed" but we should verify the count | Run `getCollection` count before merge. If real count differs, update copy. |
| Crosshair "+" marks read as gimmicky | Make them optional. Implement with a single flag `<HeroCard crosshair={true}>`. Default off; ship if it looks right, drop if not. |

## 7. What we don't copy

Explicit list to prevent scope creep during implementation:

- ❌ Two-column hero (copy + product preview) — we're single column
- ❌ Multiple CTAs (Google/email/microcopy stack) — we have one ask
- ❌ Trust badge row (Trustpilot/ProductHunt/G2) — we have no real ratings yet
- ❌ Greyscale customer logos — no real customers yet
- ❌ Sticky multi-dropdown nav — one link only
- ❌ Auth flows (Sign in, Get started) — the demo doesn't need auth

## 8. Pre-flight before implementing

- [ ] Confirm we want pill copy variant (recommend "X sources indexed · See what's covered →")
- [ ] Confirm we keep brand-blue on Ask button or go full monochrome
- [ ] Confirm we ship crosshair "+" marks or skip
- [ ] Confirm H1 stays as "SA Commercial Solar" (vertical name) or changes to "Ask the corpus" (action-led)
- [ ] Run actual `getCollection` count for the pill copy
- [ ] Branch off `main` before any edits

## 9. Phase 2 ABANDONED (2026-05-12, after second review)

**Decision: scrap the framing system, keep only the in-card crosshair `+` marks.**

After implementing the cal.com framing pattern (vertical guide lines + corner `+` marks + horizontal divider lines bracketing the below-hero section), John reviewed cal.com's actual HTML/CSS and confirmed:

> Cal's framing system is too complex to faithfully replicate.

Cal.com builds the frame via Framer-generated absolute-positioned div primitives with bespoke offsets per breakpoint. Reproducing it in plain Tailwind requires careful coordination between hero-card dimensions, vertical line height, corner mark positions, and section transitions. The visual return is small relative to the complexity cost.

**What was removed:**
- Vertical guide lines flanking the hero card
- Horizontal divider lines around the "Other DevAi" section
- 6 corner `+` marks at section transition boundaries
- The `<section class="relative border-t border-b border-[#d3d3d3]">` framing wrapper

**What was kept from this phase:**
- The two-column trusted-by layout for "Other DevAi knowledge-portal builds" (label-left ~220px, links-right flex row). The pattern is useful without the frame; the row still reads as a credibility surface.
- The 4 `+` marks INSIDE the hero card at its 4 corners (these are easier to position and don't depend on external sections).

**Final structure:**
- Hero card with 4 in-card `+` marks at corners
- Below the card on grey body bg, a frameless two-column row for "Other DevAi" builds

### File-by-file delta after phase 2 revert

| File | Final state |
|---|---|
| `src/layouts/VerticalLayout.astro` | Hero card with 4 in-card `+` marks + frameless `Other DevAi` two-column row below. No framing wrapper, no vertical guide lines, no horizontal dividers. |

## 9-archive. Original Phase 2 additions (kept for reference, not implemented)

After shipping the hero card + monochrome treatment, John approved adding two more cal.com cues from the lower-on-page sections.

### 9.1 Framed below-hero area with guide lines + corner crosshair marks

Cal.com pattern (verified via runtime inspection + screenshot):

- **Vertical guide lines:** 1px wide, color `rgb(211, 211, 211)` (#d3d3d3), flanking the centered content column at the left and right edges of the `max-w-6xl` wrapper.
- **Horizontal divider lines:** 1px, same color, at the TOP and BOTTOM of each framed section.
- **Corner "+" marks:** small grey glyphs at each corner where vertical lines meet horizontal lines. Marks sit at the bounding-box corners (slightly outside the section's content box).
- **Frame surrounds the area BELOW the hero card, not the card itself.** The hero card is the elevated piece. The frame is for the credibility-strip section underneath.

Implementation pattern:

```astro
<section class="relative border-t border-b border-[#d3d3d3]">
  <!-- 4 corner "+" marks -->
  <span class="absolute -top-1.5 -left-1 text-[#d3d3d3] text-sm select-none pointer-events-none" aria-hidden="true">+</span>
  <span class="absolute -top-1.5 -right-1 text-[#d3d3d3] text-sm select-none pointer-events-none" aria-hidden="true">+</span>
  <span class="absolute -bottom-1.5 -left-1 text-[#d3d3d3] text-sm select-none pointer-events-none" aria-hidden="true">+</span>
  <span class="absolute -bottom-1.5 -right-1 text-[#d3d3d3] text-sm select-none pointer-events-none" aria-hidden="true">+</span>
  <!-- vertical guide lines (extending the section's full height) -->
  <div class="absolute top-0 bottom-0 left-0 w-px bg-[#d3d3d3]" aria-hidden="true"></div>
  <div class="absolute top-0 bottom-0 right-0 w-px bg-[#d3d3d3]" aria-hidden="true"></div>
  <!-- content goes here -->
</section>
```

Move existing in-card "+" marks: remove them from `VerticalLayout.astro`'s hero card. They belong on the framed below-hero section now.

### 9.2 Reframe "More examples" as a cal.com-style two-column row

Cal.com's trusted-by section (measured):

- Two-column layout, label-left + logos-right
- Label column: ~220px wide, sentence-cased grey text, ~14px font-size, regular weight, two natural lines, leading-relaxed
- Right column: horizontal flex row of greyscale company logos, evenly spaced
- Section padding: ~40px vertical

Our adaptation:

```astro
<section class="relative border-t border-b border-[#d3d3d3]">
  <!-- corner marks + vertical lines (as above) -->
  <div class="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-12 px-6 py-10">
    <p class="text-sm text-gray-500 leading-relaxed">
      Other DevAi<br/>knowledge-portal builds
    </p>
    <div class="flex flex-wrap items-center gap-6 md:gap-10">
      <a href="https://www.jobabroad.co.za/demo/healthcare"
         class="text-sm font-medium text-gray-700 hover:text-brand-600"
         target="_blank" rel="noopener noreferrer">
        jobabroad.co.za · healthcare visa portal
      </a>
      <!-- room for more "examples" links as builds accumulate -->
    </div>
  </div>
</section>
```

### Key visual decisions for phase 2

- **Label copy:** "Other DevAi knowledge-portal builds" (replaces "More examples"). Reads as a corpus claim, not a marketing afterthought.
- **Right column has just one link today** — JobAbroad. The sparseness is honest. As more builds ship, they slot in here without restructuring.
- **No greyscale logos** for JobAbroad — they don't have a recognisable brandmark a CCO would know. Plain text link is cleaner.
- **Frame is wider than hero card.** Hero card sits at `max-w-3xl`; the framed section flanks the `max-w-6xl` outer column. This creates the cal.com "elevated card on a framed grid" feel.

### File-by-file delta for phase 2

| File | Change |
|---|---|
| `src/layouts/VerticalLayout.astro` | Remove the 4 in-card "+" marks. Restructure the "More examples" aside into the framed-section pattern above. |

No theme token changes. No new files.

### Phase 2 risks

| Risk | Mitigation |
|---|---|
| Two horizontal lines (above and below More examples) read as too many dividers if there's only one row of content | Keep the single-row layout for now. If the section feels visually thin, add a second row later (e.g., "Sourced from" with corpus source names) so the frame contains two stacked rows like cal.com's "Trusted by" + "How it works" pattern. |
| Vertical guide lines extending floor-to-ceiling will look weird if they cross the hero card's drop shadow | Constrain the vertical lines to ONLY span the framed below-hero section. Do NOT extend them up around the hero card. |
| Reading the page on mobile, the two-column grid collapses to stacked, which doesn't match cal.com's desktop polish | Use `md:grid-cols-[220px_1fr]` so mobile gets stacked (label on top, links below). The frame still works visually. |

## 10. After-ship checklist

- [ ] Test rendering at viewport widths 375 / 768 / 1280
- [ ] Confirm hero card doesn't overflow on small screens
- [ ] Smoke-test 2-3 queries to confirm answer card + sources render correctly inside the new hero card aesthetic
- [ ] Re-verify nav-isolation (logo + breadcrumb still point to devai.co.za)
- [ ] Update the cold-batch doc's pre-send checklist if anything changed
