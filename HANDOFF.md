# Handoff: 2026-11-11

## Next

Finish the devai split. Plan and status: `../yourdesigncoza-marketing/seo-content/03-devai-split.md` ("Still queued"). Batches 1 and 2 were done on 2026-09-20.

Still to move to yourdesign.co.za, each with a 301 from devai:

- `projects/`: magic-camera, spendsilo, yt-ts, yourdesign-co-za, devai-co-za
- `skills/`: wordpress-php-craft, python-services-data-pipelines, design-brand, knowledge-graphs-wiki-systems, ai-agentic-systems (only quant-engineering stays)
- `about/`: clients, cover-letter
- `case-studies/skills-authorship`
- The 10 duplicates that 301 into existing yourdesign `/work/` case studies after an editorial pass (harvest anything better first): wecoza, jobabroad, signaltrace and edenfintech-scanner (each has a case study and a project page), sa-wills-database, edenfintech-com
- Rework the preserved batch-2 pitch copy (`source/2026-09-20-devai-batch2/` in the marketing repo) onto yourdesign

New this session, also development work that will need a home on yourdesign: `projects/k53-coach` and `projects/bakery-ordering-system`. Neither has a yourdesign `/work/` entry yet.

## Done this session

- Proof of work on the homepage: SpendSilo and Magic Camera cards removed (pages kept, marked archived, dead live links removed). K53 Coach and the Bloom & Batter bakery demo added, each with a new project page.
- All `[JOHN: ...]` and `TODO(John)` placeholders removed (investors, quant-platforms, signaltrace and wecoza case studies, sa-wills-database "What I learned").

## Gotchas

- Clear `site/.astro` before trusting a build after deleting pages; the content store caches removed entries.
- `site/src/pages/index.astro` is the rendered homepage. `content/index.md` is only the Obsidian vault copy.
- Stale worktree `.claude/worktrees/devai-reposition-geo` (uncommitted May reposition work) and a broken `.worktrees/graphify-overhaul` still exist. John is handling them.
