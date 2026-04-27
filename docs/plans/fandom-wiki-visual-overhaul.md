Session : fandom-wiki-visual-overhaul
https://codepen.io/brutforcekenobi/pen/oNoLbBG

> **Status: SUPERSEDED on 2026-04-24 by the graphify-direction overhaul.**
> John chose a calmer, light-palette direction (graphify.net as reference) over this fandom/dark-atmospheric plan. Kept here for the decision trail, notably the SiteHeader idea, search-icon-in-header reuse, and the "drop Graph from right rail, revisit /graph route" line that evolved into the header-link-opens-modal approach in the successor plan.

# Fandom-wiki visual overhaul

## Context

Current Quartz v4 site (`devai.co.za`) uses the stock three-panel layout: left sidebar (Explorer + Search + Darkmode), centered content, right sidebar (Graph + ToC + Backlinks), forced light mode via `custom.scss`. The user wants to adopt the feel of the referenced CodePen (`brutforcekenobi/oNoLbBG`), a fandom/wiki aesthetic: dark atmospheric theme, top-bar nav instead of left sidebar, right-side **infobox** card driven by frontmatter, boxed in-flow ToC. Goal is a distinctive first impression while keeping Quartz's content pipeline untouched. No upstream Quartz patches required, entirely layout rewire + styles + one new component.

## Decisions confirmed

- **Nav**: top-bar (logo + Skills/Projects/Decisions/Playbooks/Now + search icon). Explorer dropped. No left sidebar.
- **Infobox scope**: projects only for v1 (`content/projects/*`). Other folders unchanged.
- **Background**: subtle dark texture/noise, global.
- **Typography**: keep Inter + JetBrains Mono. Identity stays.

## Files to change

**Edit**

- `quartz.layout.ts`, rewire header (add `SiteHeader`), empty `left` array, replace `right` with `ConditionalRender(InfoBox)`, move `TableOfContents` into `beforeBody` as boxed inline card, keep `defaultListPageLayout` mostly as-is.
- `quartz/styles/custom.scss`, full rewrite: remove forced light-mode block (lines 5–16), set dark palette on `:root`, add body bg texture, style cards (`.toc`, `.infobox`), top-bar, tighten typography.
- `quartz.config.ts`, tune `darkMode` theme colors (keep `#fc6d26` accent, darker panel/bg tones).
- `content/projects/*.md`, add infobox frontmatter (`hero`, `status`, `stack`, `role`, `year`, `links`) to each project page. ~8 files.

**Create**

- `quartz/components/SiteHeader.tsx`, top-bar: logo (λ + "DevAi") + primary nav links + search-icon trigger (reuses existing `Search` component's modal). Follows `ArticleTitle.tsx` pattern (export default `QuartzComponentConstructor`, attach `.css`, `.afterDOMLoaded`).
- `quartz/components/InfoBox.tsx`, right-rail card: hero image + title banner + key/value table rendered from `fileData.frontmatter`. Returns `null` when frontmatter has no `infobox: true` marker (or when on a non-project page), so it composes with `ConditionalRender`.
- `quartz/components/styles/siteHeader.scss`, `infoBox.scss`, co-located styles imported by each component (Quartz convention, see `pageTitle.scss`, `breadcrumbs.scss`).

## Key implementation notes

- **Custom-component authoring pattern** (confirmed via `quartz/components/ArticleTitle.tsx`): function accepting `QuartzComponentProps` → read `fileData.frontmatter` → return JSX → attach `.css` (imported SCSS string) and optional `.afterDOMLoaded` → wrap in `QuartzComponentConstructor` factory. Register in `quartz.layout.ts` by importing from `./quartz/components` barrel.
- **Search reuse**: don't rebuild search. `SiteHeader` renders the existing `Search()` component in icon-only mode, Quartz's Search already uses a modal triggered by click; just CSS it to hide the label in the header context.
- **Centering when `left` is empty**: Quartz's grid (`quartz/styles/variables.scss`) currently reserves a 320px left column. Override the grid-template in `custom.scss` to 2 columns (content + right) at desktop, 1 column on mobile, keeps max-width readable.
- **ToC as inline card**: `TableOfContents` component already exists; just move it from `right` → `beforeBody` and restyle its wrapper as a bordered panel (border-radius, muted bg, inner padding) to match the "Sommaire" card.
- **Background texture**: CSS-only. Stacked `background`: dark base color + low-opacity SVG noise data-URI + radial gradient for vignette. No image asset needed, fastest and caches perfectly.
- **Dark-mode toggle**: remove it from layout (user wants dark-only v1). Keeps `custom.scss` simpler; can re-enable later by restoring themed light palette.

## Verification

1. `npm install` if needed, then `npx quartz build --serve`, hot reload local preview at `http://localhost:8080`.
2. Visit `/`, confirm top-bar renders with nav links, no left sidebar, body has subtle texture.
3. Visit a project page (e.g. `/projects/apes-signal`), confirm infobox card appears on the right with hero + stack/role/year rows pulled from frontmatter. Confirm ToC renders as a boxed card above the article body.
4. Visit a non-project page (e.g. `/now`, `/skills/ai-agentic-systems`), confirm no infobox, content centers.
5. Click search icon in top-bar, confirm existing search modal opens.
6. Resize to mobile width, confirm top-bar collapses (nav in a drawer or wraps), infobox stacks below content.
7. `npm run check`, tsc + prettier pass.
8. `npx quartz build`, production build succeeds, `public/` generates without errors.

## Out of scope (future iterations)

- Skill/decision infobox schemas (decided: v2 after projects land).
- Per-page background images (decided against for v1).
- Font swap to display serif (decided against).
- Graph component, dropped from right rail; revisit whether to expose on a `/graph` standalone page.
