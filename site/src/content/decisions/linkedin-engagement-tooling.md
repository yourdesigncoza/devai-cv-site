---
title: LinkedIn engagement tooling, Phase 1 to Phase 2
description: "Why I migrated topical-engagement discovery off Brave Search onto Interceptor (driving my own Brave session), and the ToS trade-off and resilience guards I'm running it under."
tags: [decision, tooling, linkedin]
draft: false
date: 2026-04-26
---

## The position

I migrated LinkedIn discovery off Brave Search and onto [Interceptor](https://github.com/Hacker-Valley-Media/Interceptor) on 2026-04-26. I wanted my own session driving discovery. Brave's `site:linkedin.com/posts` index was structurally too thin to be useful. Google returned thousands where Brave returned zero on the same freshness window. The fix is to drive my already-authenticated Brave session directly rather than depend on someone else's index of LinkedIn.

The migration overrode the 20-comment-prerequisite checklist in the skill's `PHASE2_INTERCEPTOR.md`. I'm comfortable with that. The resilience guards (rate caps, audit log, block-signal detection) were built first, and the off-ramp back to Phase 1 is same-day cheap if anything fires.

## What changed (factual)

- **Backend:** `docs/linkedin-topics.md` frontmatter `backend:` selects the discovery path. `phase1` = Brave Search via the brave-search MCP. `phase2` = [Interceptor](https://github.com/Hacker-Valley-Media/Interceptor) (Apache 2.0, Bun-based browser-control CLI + Chrome extension) driving the same Brave profile I already use daily.
- **Why phase 2 was needed:** Brave's index of fresh LinkedIn posts is much thinner than Google's. A `site:linkedin.com/posts quant research` query with a one-week freshness filter returned **0 results on Brave** versus **5,750 on Google** the same day. Broader terms didn't fix it. The freshness filter combined with `site:linkedin.com/posts` actively suppresses LinkedIn results in Brave's index.
- **What phase 2 reads:** John's already-authenticated LinkedIn session: same TLS fingerprint, same IP, same cookies as normal browsing. No separate headless browser, no separate cookie jar, no scraping endpoint. The CLI sends a navigation instruction to a small Chrome extension running in the live Brave window.
- **Override on the migration checklist:** [`PHASE2_INTERCEPTOR.md`](https://github.com/Hacker-Valley-Media/Interceptor) (in the skill directory) requires 20 logged comments and a stable voice file before flipping. Zero comments were logged when this was flipped. The override is recorded here.

## ToS judgment

Grey area. LinkedIn's User Agreement §8.2 prohibits automated tooling, and Interceptor is automation by any reasonable read. The question is what kind of automation, and whether it changes who's deciding.

The session is mine. Discovery runs against the same authenticated profile I use daily: same TLS fingerprint, same IP, same cookies. The automation is exploratory: it surfaces candidate posts, drafts variants from my corpus, and stops there. I read each draft, choose a variant or rewrite, and post manually. The final comment that lands on someone else's feed is mine, written, edited, and timed by me. The tool widens the search; it doesn't substitute for the judgment.

That distinction matters less to LinkedIn's lawyers than it does to me. Formally I'm in a grey area. The line where I stop is operational, not philosophical: anything LinkedIn detects or flags (warning email, account restriction, captcha-loop, a sudden engagement drop that looks like shadow-throttling), and the frontmatter flips back to Phase 1 same day.

## Resilience guards

Implemented before phase 2 went live, on the basis that an account flag costs more than the time saved.

- **Wrapper:** all Mode A2 calls go through `~/.claude/skills/ydcoza-linkedin-engagement/scripts/interceptor-guarded.sh`. Direct invocation of the `interceptor` binary from the skill is forbidden.
- **Rate caps:** ≤6 calls / 60s; ≤30 calls / 600s. Wrapper exits non-zero on breach.
- **Audit log:** `docs/linkedin-interceptor-audit.log`. One tab-separated row per call: timestamp, status, subcommand, URL, note.
- **Block-signal detection:** wrapper greps response for HTTP 999, `/uas/login`, `/checkpoint/challenge`, "security check", "sign in to view", "join now to view". Any hit exits 8 with a `STOP` message. The skill is instructed not to retry through it.
- **Off-ramp:** if a single concerning signal fires (warning email, account restriction, captcha-loop, sudden engagement drop), the frontmatter flips back to `phase1` same day. The Brave route is always cheaper to fall back to than to re-enable later from a flagged account.

## Linux daemon patch (maintenance note)

The shipped Interceptor `interceptor-daemon` binary is built with a module loader (`daemon/os-input-loader.ts`) that has only Windows and macOS branches. On Linux the loader falls through to `daemon/os-input.ts`, which `dlopen`s `/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics` at module load. The daemon crashes immediately.

Local fix:
- Added `~/tools/interceptor/daemon/os-input-linux.ts` (same shape as the existing Windows stub, returns "not supported on Linux" for OS-level input).
- Patched `~/tools/interceptor/daemon/os-input-loader.ts` to add a Linux branch.
- Rebuilt with `bash scripts/build.sh`.

This patch is **not upstream** and won't survive `git pull` or `git reset --hard`. Re-apply after any upstream sync, then rebuild. OS-level input (`act --os`) is not used by Mode A2, so the stub's "not supported" return is harmless. A separate issue against the Hacker-Valley-Media/Interceptor repo would be the durable fix; not filed yet.

The shipped `scripts/install.sh` is also macOS-only despite README marketing. It writes native-messaging manifests only to `~/Library/Application Support/...` paths. The Linux equivalent (`~/.config/BraveSoftware/Brave-Browser/NativeMessagingHosts/`) was symlinked manually after running the script with `--skip-extension` to generate the manifest.

## What will break

**Selector drift on URL extraction.** Mode A2's content listing reads via `interceptor read --text-only` (raw page text, resilient to DOM changes). Extracting actual post URLs needs `read --tree-only`, which is selector-anchored. LinkedIn rewrites their DOM regularly; that single call is the fragile point in the discovery loop.

**ToS detection surface evolving.** Same-session attachment masks the obvious tells (no headless browser, no fresh cookies, no fingerprint mismatch), but LinkedIn's anti-automation work doesn't sit still. The off-ramp under "ToS judgment" is the answer; assume the threshold to fire it gets lower over time, not higher.

**Linux daemon source patch as a landmine.** The local `os-input-loader.ts` patch isn't upstream and won't survive `git pull` or `git reset --hard`. Forgetting to re-apply and rebuild silently breaks Mode A2. The daemon crashes on first call. Discipline: any sync of `~/tools/interceptor/` is followed by re-applying the patch and `bash scripts/build.sh` before the next run.

**Rate caps as a self-throttle.** 6 calls / 60s is conservative on purpose. A 3-topic Mode A2 run plus a Mode B drilldown on each picked candidate can brush the 600s cap. The wrapper exits cleanly when it does, but the loop has to wait it out. Discovery isn't an instant workflow.

## Where this shows up

- `docs/linkedin.md`: engagement workflow + post log
- `docs/linkedin-topics.md`: backend selector
- `docs/linkedin-interceptor-audit.log`: audit trail
- `~/.claude/skills/ydcoza-linkedin-engagement/SKILL.md`: Mode A1 / A2 / B / C procedures
- `~/.claude/skills/ydcoza-linkedin-engagement/PHASE2_INTERCEPTOR.md`: original migration plan (now executed, with the 20-comment criterion overridden)
