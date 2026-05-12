---
title: DevAi mother-site UI transfer notes (Quartz → Astro)
status: design-system reference for the devai.co.za rebuild
date: 2026-05-12
source: demo-devai-site (https://demo.devai.co.za/commercial-solar)
target: devai.co.za rebuild as Astro (replacing the current Quartz build)
purpose: Everything the AI/human rebuilding devai.co.za needs to mirror the demo's design system without reverse-engineering the live site
---

# DevAi mother-site UI transfer notes

The demo at `demo.devai.co.za` was built as a polished cal.com-style Astro app. The plan is to retire the existing Quartz-based `devai.co.za` and rebuild it as Astro using the same design system. This doc captures every UI decision so the rebuild matches.

## 1. Stack

- **Framework:** Astro 6 (`^6.3.1`)
- **Styling:** Tailwind CSS v4 (`^4.3.0`) via `@tailwindcss/vite` plugin
- **Theme tokens:** defined inline in `src/styles/global.css` using Tailwind v4 `@theme` block (no `tailwind.config.js`)
- **Markdown content:** `@astrojs/mdx` for content-driven pages (e.g. notes, decisions, projects from the existing wiki vault)
- **Deployment:** `@astrojs/vercel` adapter
- **Node:** 22.12+

`package.json` essentials:

```json
{
  "type": "module",
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/mdx": "^5.0.4",
    "@astrojs/vercel": "^10.0.6",
    "@tailwindcss/vite": "^4.3.0",
    "astro": "^6.3.1",
    "tailwindcss": "^4.3.0"
  }
}
```

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [mdx()],
  vite: { plugins: [tailwindcss()] },
  adapter: vercel(),
});
```

## 2. Design tokens (global.css)

The full theme tokens are inlined in `src/styles/global.css` using Tailwind v4 `@theme`. No separate config file. Copy this block verbatim into the mother site.

```css
@import "tailwindcss";

@theme {
  /* Brand */
  --color-brand-50: #eef3ff;
  --color-brand-100: #d9e3ff;
  --color-brand-500: #2d5bff;
  --color-brand-600: #1f47e0;
  --color-brand-700: #1a3bb8;

  /* Surfaces */
  --color-page-bg: #f4f4f4;   /* warm light grey body bg */
  --color-ink: #242424;       /* near-black for headings + primary text */

  /* Type stacks */
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
}

html {
  font-family: var(--font-sans);
}

body {
  background-color: var(--color-page-bg);
  color: var(--color-ink);
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: rgb(15 23 42);
    color: rgb(226 232 240);
  }
}

/* Cal.com hero-card shadow + border, applied as a utility class */
.shadow-card-cal {
  border: 1px solid #e1e2e3;
  box-shadow:
    0 1px 5px -4px rgba(36, 36, 36, 0.7),
    0 4px 8px 0 rgba(36, 36, 36, 0.05);
}
```

### Color usage rules

- **`#242424` (ink)** is the canonical near-black for headings and primary body text. Never use pure `#000` for text — it reads too harsh against the warm grey body bg.
- **`#f4f4f4` (page-bg)** is the body background everywhere. Cards sit on top of it as white panels.
- **`#e1e2e3` is THE border color sitewide.** Hero cards, FAQ chips, input fields, result cards, footer dividers, source-card dividers — all `#e1e2e3`. No mixing in `gray-200` / `gray-300` etc.
- **Brand-blue (`#2d5bff` / `--color-brand-500`)** is reserved for: brand-dot in logo, launch-pill dot, hover states on text links, focus-ring on inputs, the "Live demo" pill indicator. Never use brand-blue for body text or large fills.
- **Pure `bg-black`** is acceptable for the dark CTA button hover state (`#242424` base → `bg-black` on hover).
- **No `#ffffff` text on coloured backgrounds.** White text only on dark backgrounds (`#242424` / `black`).

### Typography

- **Body + headings:** Inter (loaded from Google Fonts via `<link>` in `BaseLayout.astro`). Weights: 400 / 500 / 600 / 700.
- **Monospace:** JetBrains Mono (Google Fonts). Weights: 400 / 500.
- **Loaded in `BaseLayout.astro`:**
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
  ```

#### Heading scale

| Element | Size | Weight | Tracking | Line-height | Colour | Notes |
|---|---|---|---|---|---|---|
| **H1** | `text-3xl md:text-[44px]` (30 → 44px) | 500 (medium) | `tracking-tight` (-0.025em ≈ -1.1px at 44px) + `[word-spacing:0.1em]` (~4.4px at 44px) | `leading-[1.1]` (1.1) | `text-[#242424]` | Sitewide cap at 44px desktop. Mobile drops to 30px. Cal Sans display font. Tight letter-spacing + positive word-spacing gives the cal.com-style tight chars with breathing room between words. |
| **H2** | `text-2xl md:text-3xl` (24 → 30px) | 500 (medium) | `tracking-tight` + `[word-spacing:0.1em]` | (default) | `text-[#242424]` | Section heading (paired with numbered pill above). Cal Sans. |
| **H3** | `text-xl` (20px) | 500 | `tracking-tight` + `[word-spacing:0.1em]` | (default) | `text-[#242424]` | Sub-sections. Cal Sans. |

#### Body text

| Use | Size | Colour | Notes |
|---|---|---|---|
| Lead / subhead | `text-lg` (18px), `leading-relaxed`, `text-gray-600` | — | Sits below H1 |
| Body | (default) `text-base` (16px), `leading-relaxed`, `text-gray-700` | — | Main prose |
| Muted / footer | `text-sm` (14px), `text-gray-500` | — | Footer copy, "More examples" labels |
| Caption / micro | `text-xs` (12px), `text-gray-500` | — | Pill labels, eyebrow text |

#### Display font: Cal Sans (LIVE)

Headlines use **Cal Sans** — cal.com's open-source display font, loaded from **Google Fonts** (same CDN as Inter). Single weight (400) but Cal Sans has intrinsic display weight that reads heavier than Inter at the same nominal weight.

**Critical:** load Cal Sans via Google Fonts, NOT via jsdelivr/raw GitHub. The GitHub repo paths for `CalSans-SemiBold.woff2` returned 404 (as of 2026-05-12); Google Fonts hosts it reliably at `fonts.googleapis.com/css2?family=Cal+Sans`.

**Wiring (combined Google Fonts link in `BaseLayout.astro`):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

**`global.css`:**

```css
@theme {
  --font-display: "Cal Sans", "Inter", system-ui, -apple-system, sans-serif;
}

h1, h2, h3 {
  font-family: var(--font-display);
}
```

**Verification (Playwright):**

```js
await document.fonts.ready;
document.fonts.check('400 24px "Cal Sans"'); // should return true
getComputedStyle(document.querySelector('h1')).fontFamily; // should start with "Cal Sans"
```

## 3. Layout & alignment system

This is the most subtle part of the design system. Get this right and everything else falls into place.

### Outer wrapper

The page content sits inside a single wrapper:

```html
<div class="max-w-6xl mx-auto px-4 pt-4 pb-12">
  ...
</div>
```

`max-w-6xl` (72rem / 1152px) is the page's outer bound. Centered on viewport. `px-4` for safe-area on mobile.

### Inner content column

All "real content" (hero card, footer rows, similar-builds row) sits at `max-w-3xl` (48rem / 768px) and is centered with `mx-auto`. The asymmetry between `max-w-6xl` outer and `max-w-3xl` inner gives the page generous whitespace on either side without feeling cramped.

```html
<div class="max-w-3xl mx-auto ...">
  ...
</div>
```

### Header alignment rule (CRITICAL)

The header logo's *text* (not the brand dot) aligns horizontally with the content column. Implementation:

- Header inner div: `max-w-3xl mx-auto px-8 md:px-12 py-6` (same outer-column + padding as the hero card)
- Logo `<a>` element: gets a negative left margin equal to the brand-dot width + gap:
  ```html
  <a href="https://devai.co.za" class="inline-flex items-center gap-2.5 -ml-[22px] ...">
    <span class="inline-block w-3 h-3 rounded-full bg-brand-500 flex-shrink-0"></span>
    <span class="flex items-baseline gap-5">
      <span class="text-2xl font-semibold leading-none">DevAi</span>
      <span class="text-xs font-semibold uppercase tracking-widest text-gray-500 leading-none">Demos</span>
    </span>
  </a>
  ```
- The brand dot (`w-3` = 12px) + gap (`gap-2.5` = 10px) = 22px. The negative left margin pulls the whole logo left by 22px, so the dot hangs outside the alignment line and the "DevAi" *text* sits at the same x-position as the hero card's content.

**Verify with Playwright (in the new build too):** the x-position of "DevAi" text in the header should equal the x-position of the breadcrumb arrow / H1 first letter inside the hero card. If they differ, the offset is wrong.

### Padding pattern

- Hero card outer: `p-8 md:p-12` (32px mobile / 48px desktop)
- Hero card content has natural breathing room from `mt-5`, `mt-12`, `mt-14` etc between sections
- Footer inner: same `px-8 md:px-12` as header
- All "section boundaries" inside the hero card use `mt-12` to `mt-14` for vertical rhythm

## 4. Component patterns

These are the patterns to mirror on the mother site. Each is shown with its exact markup.

### 4.1 Hero card (the centerpiece)

The white rounded card with two-stop shadow + 1px border + 4 corner `+` marks. Used as the primary content surface on every page.

```html
<div class="relative max-w-3xl mx-auto bg-white rounded-xl shadow-card-cal p-8 md:p-12">
  <!-- Corner + marks, all 4 -->
  <span class="absolute top-2 left-4 text-gray-300 text-2xl font-mono select-none pointer-events-none" aria-hidden="true">+</span>
  <span class="absolute top-2 right-4 text-gray-300 text-2xl font-mono select-none pointer-events-none" aria-hidden="true">+</span>
  <span class="absolute bottom-2 left-4 text-gray-300 text-2xl font-mono select-none pointer-events-none" aria-hidden="true">+</span>
  <span class="absolute bottom-2 right-4 text-gray-300 text-2xl font-mono select-none pointer-events-none" aria-hidden="true">+</span>

  <!-- Breadcrumb (skip on root pages) -->
  <a href="https://devai.co.za" class="text-sm text-gray-500 hover:text-brand-600">&larr; devai.co.za</a>

  <!-- Content slot -->
  ...
</div>
```

- `rounded-xl` (12px radius) — exact match to cal.com.
- `shadow-card-cal` is the custom utility class defined in `global.css` (see Section 2). Combines border + 2-stop box-shadow.
- The 4 corner `+` marks: `text-2xl` (24px), `font-mono`, `text-gray-300`, positioned with `top-2 left-4` / `top-2 right-4` / `bottom-2 left-4` / `bottom-2 right-4`. The `4` (1rem) horizontal offset reads better than `2` (0.5rem).
- `aria-hidden="true"` + `select-none` + `pointer-events-none` on the `+` marks because they're decorative.

### 4.2 Launch pill (small badge above H1)

```html
<div class="mt-2">
  <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-700">
    <span class="inline-block w-1.5 h-1.5 rounded-full bg-brand-500"></span>
    52 wiki notes indexed
    <span class="text-gray-400">·</span>
    <span>SA commercial solar corpus</span>
  </span>
</div>
```

- `bg-gray-100` (which renders as the subtle warm grey cal.com uses)
- `rounded-full` for pill shape
- Brand-blue dot indicator on the left
- Use the middle-dot character (`·`) with `text-gray-400` as a separator between phrases
- Keep it text-only (no anchor) unless you have somewhere real to link

### 4.3 H1 hero headline

```html
<h1 class="mt-5 text-3xl md:text-[44px] font-medium tracking-tight [word-spacing:0.1em] text-[#242424] leading-[1.1]">
  Ask the corpus.
</h1>
```

- 44px max on desktop, 30px on mobile
- Cal Sans display font (loaded via Google Fonts — see Section 2)
- `font-medium` (500) — Cal Sans's natural display weight is heavy enough; 600+ feels too bold
- `tracking-tight` for cal.com's tight character rhythm
- `[word-spacing:0.1em]` to compensate for the tight letter-spacing eating into word gaps
- `leading-[1.1]` for compact display lines
- `text-[#242424]` — soft near-black, not pure black

### 4.4 Subhead under H1

```html
<p class="mt-5 text-lg text-gray-600 leading-relaxed max-w-prose">
  Live demos of what happens when the content already on your site
  starts pulling its weight.
</p>
```

- `text-lg` (18px), `text-gray-600`, `leading-relaxed`
- `max-w-prose` caps reading width

### 4.5 Numbered section header (cal.com pattern)

This pairs a small monospace number pill with a bold H2. Used for major sections inside the hero card.

```html
<div class="mt-14">
  <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-mono font-semibold">
    01
  </span>
  <h2 class="mt-4 text-2xl md:text-3xl font-medium tracking-tight [word-spacing:0.1em] text-[#242424]">
    How it works
  </h2>

  <!-- section body -->
  <ol class="mt-6 space-y-3 text-gray-700 leading-relaxed max-w-prose list-decimal pl-5 marker:text-gray-400 marker:font-semibold">
    <li>Index the content you've already written.</li>
    <li>Wire a search box that gives cited answers, not chatbot guesses.</li>
    <li>Free your team from answering the same questions over and over.</li>
  </ol>
</div>
```

- Number pill: `text-xs font-mono font-semibold bg-gray-100 rounded-md px-2.5 py-1`
- H2 below: `text-2xl md:text-3xl font-medium tracking-tight [word-spacing:0.1em] text-[#242424]` (Cal Sans, same weight + tracking + word-spacing as H1)
- Sections separated by `mt-14`
- Number sections sequentially: `01`, `02`, `03` (don't skip)

### 4.6 Primary CTA button (cal.com Sign-up style)

The dark full-width pill button with optional brand icon on the left.

```html
<a
  href="mailto:info@devai.co.za"
  class="mt-5 inline-flex w-full items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-[#242424] text-white text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-black transition-colors"
>
  <!-- Optional icon, 16px square (e.g. Google G logo, envelope, etc.) -->
  <svg class="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
    ...
  </svg>
  Drop a note to info@devai.co.za
</a>
```

- `bg-[#242424]` base, `hover:bg-black`
- `rounded-full` for pill shape
- `inline-flex w-full items-center justify-center` for full-width centered content
- Inset white-15%-alpha highlight (`shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]`) — gives subtle "raised" feel, matches cal.com
- `py-3.5 px-6` for generous click area
- Always wrap with `transition-colors` for smooth hover

### 4.7 Secondary "section pill" (Similar Production Builds)

White rounded badge with stacked-squares icon. Used as a section delimiter for "see also" type content.

```html
<div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-card-cal">
  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fill="#242424" stroke="#242424" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11H3V3h8v8H9Z"/>
    <path fill="transparent" stroke="#242424" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11v4a2 2 0 0 0 2 2h4m2 4h-2v-8h8v8h-2Z"/>
  </svg>
  <span class="text-sm font-medium text-[#242424]">Similar Production Builds</span>
</div>
```

The stacked-squares icon is a downloaded SVG from `framerusercontent.com/images/yPGnqYboSnvCWBTbI34z6O2FY.svg` (cal.com source). It signifies "related items" — appropriate for "see also" sections.

### 4.8 Footer (operator credit)

Two-column footer aligned to the same `max-w-3xl px-8 md:px-12` as the header and hero card.

```html
<footer class="mt-16 border-t border-[#e1e2e3] dark:border-gray-800">
  <div class="max-w-3xl mx-auto px-8 md:px-12 pb-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-10">
      <!-- Left: brand + bio -->
      <div>
        <a href="https://devai.co.za" class="inline-flex items-center gap-2.5 text-[#242424]">
          <span class="inline-block w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></span>
          <span class="flex items-baseline gap-4">
            <span class="text-base font-semibold leading-none">DevAi</span>
            <span class="text-[10px] font-semibold uppercase tracking-widest text-gray-500 leading-none">Demos</span>
          </span>
        </a>
        <p class="mt-4 text-sm text-gray-600 leading-relaxed">
          Built by <span class="text-[#242424] font-medium">John Montgomery</span>,<br />
          founder of <a href="https://edenfintech.com" class="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">EdenFintech</a>.
        </p>
      </div>

      <!-- Right: contact + links -->
      <div class="md:text-right">
        <div class="space-y-1 text-sm">
          <a href="mailto:info@devai.co.za" class="block text-gray-700 hover:text-brand-600 transition-colors">info@devai.co.za</a>
          <a href="tel:+27791771970" class="block text-gray-700 hover:text-brand-600 transition-colors">+27 79 177 1970</a>
        </div>
        <div class="mt-4 space-y-1 text-sm">
          <a href="https://devai.co.za" class="block text-gray-500 hover:text-brand-600 transition-colors">devai.co.za</a>
          <a href="https://edenfintech.com" class="block text-gray-500 hover:text-brand-600 transition-colors" target="_blank" rel="noopener noreferrer">edenfintech.com</a>
        </div>
      </div>
    </div>

    <!-- Copyright row -->
    <div class="mt-10 pt-4 border-t border-[#e1e2e3] dark:border-gray-800">
      <p class="text-xs text-gray-400">&copy; 2026 DevAi &middot; AI-assisted knowledge portals for B2B</p>
    </div>
  </div>
</footer>
```

For the mother site, the "DevAi Demos" label in the footer becomes just "DevAi" (no Demos tagline — the mother site IS DevAi, not the demos surface).

### 4.9 Header (transparent, sits on body bg)

```html
<header>
  <div class="max-w-3xl mx-auto px-8 md:px-12 py-6 flex items-center justify-between">
    <a href="https://devai.co.za" class="inline-flex items-center gap-2.5 -ml-[22px] text-[#242424] dark:text-gray-100">
      <span class="inline-block w-3 h-3 rounded-full bg-brand-500 flex-shrink-0"></span>
      <span class="flex items-baseline gap-5">
        <span class="text-2xl font-semibold leading-none">DevAi</span>
        <span class="text-xs font-semibold uppercase tracking-widest text-gray-500 leading-none">Demos</span>
      </span>
    </a>
  </div>
</header>
```

- No background, no border-bottom (sits transparent on the body's grey bg)
- Logo aligned to content column via `-ml-[22px]` offset (see Section 3)
- For mother site, drop the "DEMOS" tagline (the wordmark is just "DevAi")

## 5. Voice rules (apply to all copy)

Same voice rules apply to all DevAi properties: demo site, mother site, cold mail, wiki content.

### Hard bans

- **Zero em-dashes** anywhere. Hard ban. Use period, comma, colon, parentheses, or restructure.
- **No intensifiers / aphorisms:** "really", "very", "far", "huge", "surprisingly", "simply", "actually", "The takeaway:", "Used correctly", etc.
- **No SaaS jargon in body prose:** banned words include "searchable surface", "self-service surface", "knowledge portal" (as a product noun in prose — fine in H1 headlines if it reads natural), "AI-assisted search portal", "content layer", "expert layer".
- **No asterisks** for emphasis (renders literally in plain-text contexts).
- **Bare URLs only** in any output where markdown isn't rendered (cold mail). On the wiki / web pages, normal `<a>` tags fine.
- **No AI attribution** ("Claude", "Anthropic", "Co-Authored-By:" etc.) in code, commits, docs.

### Voice positives

- **Write scenes, not features.** "It's Wednesday morning. A buyer is on your site trying to figure out…" beats "Reduces sales-engineer load via self-service content."
- **Use the buyer's words for the buyer's problem.** A solar EPC buyer asks "what NRS compliance applies", not "I need a knowledge surface".
- **Plain "Thanks,"** not "Thanks for the work,".

### Voice memory references (in `~/.claude/projects/-home-laudes-zoot-projects-devai-cv-site/memory/`)

- `feedback_no_saas_jargon.md` — full ban list with examples
- `feedback_email_bare_urls.md` — bare URLs in email contexts
- (Project CLAUDE.md also lists em-dash ban and Eden/DevAi positioning rules)

## 6. Page templates (Astro implementations)

### 6.1 BaseLayout.astro

Single source of truth for header, footer, and `<head>`. Every page wraps in this.

```astro
---
import '../styles/global.css';
interface Props {
  title: string;
  description?: string;
}
const { title, description = 'AI-assisted knowledge portals for B2B' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="min-h-screen flex flex-col">
    <header>...</header>     <!-- see Section 4.9 -->
    <main class="flex-1"><slot /></main>
    <footer>...</footer>     <!-- see Section 4.8 -->
  </body>
</html>
```

### 6.2 Content pages

A typical content page (e.g. a wiki note, a project page, the homepage) wraps its content in the hero card pattern from Section 4.1.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Page title" description="...">
  <div class="max-w-6xl mx-auto px-4 pt-4 pb-12">
    <div class="relative max-w-3xl mx-auto bg-white rounded-xl shadow-card-cal p-8 md:p-12">
      <!-- 4 corner + marks -->
      <span class="absolute top-2 left-4 text-gray-300 text-2xl font-mono select-none pointer-events-none" aria-hidden="true">+</span>
      <!-- ...3 more... -->

      <!-- Optional breadcrumb -->
      <a href="https://devai.co.za" class="text-sm text-gray-500 hover:text-brand-600">&larr; up</a>

      <!-- Page content -->
      <h1 class="...">Page H1</h1>
      <p class="...">Subhead</p>

      <!-- Numbered sections via Section 4.5 pattern -->
    </div>
  </div>
</BaseLayout>
```

## 7. What was tried and abandoned (don't repeat)

These were attempted during the demo-site build and deliberately reverted. Don't re-introduce them.

| Attempted | Why abandoned |
|---|---|
| **Vertical guide lines flanking content + corner `+` marks at section boundaries** | Cal.com's framing system uses Framer-generated absolute-positioned div primitives with bespoke per-breakpoint offsets. Hand-rolling it in Tailwind requires careful coordination between hero card dimensions, vertical line height, corner marks, and section transitions. Visual return small relative to complexity cost. |
| **Cal Sans display font via jsdelivr CDN / raw GitHub** | jsdelivr URLs returned 404 for `dist/CalSans-SemiBold.woff2`. **Resolved:** Cal Sans is hosted on Google Fonts at `fonts.googleapis.com/css2?family=Cal+Sans`. Wire it through Google Fonts alongside Inter, NOT jsdelivr. See Section 2 typography subsection for the working setup. |
| **Cal.com-style two-column trusted-by row** (label-left 220px + logos-right flex) | Tried, then John dropped it in favour of a centred "Similar Production Builds" pill. The two-column trusted-by feels right when you have many real logos. With one or two links, it looks sparse. |
| **In-page links between vertical demos** (e.g. `/commercial-solar/` linking to `/riello-ups/`) | Cross-pollination problem: a cold-mail prospect on commercial-solar shouldn't see Riello UPS as a sibling option. Each vertical lives isolated; root page mentions other verticals as text only. |
| **`+` marks INSIDE the hero card at all 4 corners (initial attempt)** | Was kept, but the positioning evolved. Final size: `text-2xl`, position: `top-2 left-4` / `top-2 right-4` / `bottom-2 left-4` / `bottom-2 right-4`. Earlier we had `text-sm` and `left-2` which looked too cramped. |
| **Blue brand-blue Ask button on commercial-solar search** | Reverted to monochrome `bg-[#242424]`. Brand-blue was competing with the brand-blue answer card tint behind the search results. Monochrome wins. |
| **A "framed below-hero" section with horizontal divider lines + corner `+` marks** | Same complexity issue as the vertical guide lines. Removed. "Similar Production Builds" sits clean on the body bg without a frame. |

## 8. Implementation order for the mother-site rebuild

If rebuilding `devai.co.za` from scratch on Astro:

1. **Stand up Astro skeleton** with the dependencies in Section 1
2. **Drop in `global.css`** with the tokens block from Section 2
3. **Build `BaseLayout.astro`** with the header from Section 4.9 and footer from Section 4.8. Use just "DevAi" (no Demos tagline)
4. **Verify alignment** via Playwright: header logo "DevAi" text x-position MUST match the hero card content column x-position
5. **Migrate wiki content** from the current Quartz vault into Astro content collections under `src/content/`. The existing Quartz markdown should mostly drop in unchanged; frontmatter may need transforming
6. **Build the page templates** using Section 6.2 as the boilerplate
7. **Wire navigation** between wiki notes via Astro `getCollection` patterns (Quartz's wikilinks need conversion)
8. **Keep the global graph and explorer features** the current Quartz site has — Astro doesn't ship these out of the box, port the JS from Quartz's `quartz/components/scripts/` if needed
9. **Smoke-test the build at each step** in browser; don't try to migrate everything in one pass

## 9. Files in demo-devai-site to reference

The reference implementation lives in `/home/laudes/zoot/projects/demo-devai-site`:

- `src/styles/global.css` — design tokens, `.shadow-card-cal` utility
- `src/layouts/BaseLayout.astro` — header, footer, font loading
- `src/layouts/VerticalLayout.astro` — hero card pattern (used for vertical demos)
- `src/pages/index.astro` — root page (cal-style hero with sections + CTA)
- `src/pages/commercial-solar/index.astro` — vertical page (search UI inside the hero card)

When porting to the mother site, treat these as the canonical implementation. Copy markup wholesale and adapt content; don't try to rewrite the design from scratch.

## 10. Related project docs

- `docs/plans/cal-style-redesign.md` — full design brief that drove the demo-site redesign (extracted cal.com tokens, abandoned approaches, phase-by-phase decisions)
- `docs/marketing/cold-mail-body-template.md` — voice reference for any outreach copy
- `docs/marketing/cold-batch-01-commercial-solar.md` — the cold-mail batch that the demo site supports
- `~/.claude/projects/-home-laudes-zoot-projects-devai-cv-site/memory/feedback_no_saas_jargon.md` — voice ban list
