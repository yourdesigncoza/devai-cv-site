# YourDesign CV — John Montgomery

Personal CV wiki for John Montgomery, published under the YourDesign brand. Built as an Obsidian vault rendered with Quartz 4 and deployed to Vercel.

## Two-stage flow

- `raw/` — source material and evidence dumps (web captures, project exports, reference docs). Re-runnable. Inputs only.
- `content/` — the hand-written Quartz vault. Derived from `raw/` but curated by hand. This is what gets published.

Keep the two separate so the vault stays clean and the evidence stays traceable.

## Local preview

```bash
npm install
npx quartz build --serve
```

Requires Node >= 22.

## Deploy

Push to `main`. Vercel rebuilds and publishes automatically.
