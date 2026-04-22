---
title: Playwright E2E tests for a WordPress plugin
description: "A Playwright setup that logs in once, never clicks the Wipe All button, and treats a shortcode map as the single source of truth for routes. The specific shape I run against WeCoza."
tags: [playbook, wordpress, playwright, testing]
draft: false
---

The short version: if you're going to drive a WordPress plugin with Playwright, the three things that will bite you are *session management*, *destructive action buttons*, and *ad-hoc URL lists that drift*. Everything below is structured to not get bitten by any of those again.

## The file layout that works

```
tests/
├── playwright/
│   ├── playwright.config.ts
│   ├── auth.setup.ts
│   ├── smoke.spec.ts
│   ├── <entity>-crud.spec.ts       ← agents, clients, classes, learners, locations
│   ├── <entity>-deep.spec.ts       ← full lifecycle tests
│   └── .auth/storageState.json     ← cached session (gitignored)
├── playwright-shortcode-map.json   ← the URL registry
└── reports/                        ← JSON + HTML output
```

## 1. Log in once, not every run

`auth.setup.ts` reads a `.auth/storageState.json`. If the file exists and has cookies, the session is re-used — skip login entirely. If it doesn't exist, fall back to a one-time credentialed login driven from `WECOZA_TEST_PASSWORD` and write the resulting session to disk.

This matters because WordPress login is slow, and running a suite that hits `wp-login.php` on every spec means 22 tests become 22 login round-trips. One login per working day (or per session invalidation) is enough.

```typescript
// In playwright.config.ts, make auth the dependency of every other project:
projects: [
  { name: 'auth-setup', testMatch: 'auth.setup.ts' },
  { name: 'smoke', testMatch: '*smoke.spec.ts',
    dependencies: ['auth-setup'],
    use: { storageState: '.auth/storageState.json' } },
  // ... crud, deep, etc. all depend on auth-setup
]
```

## 2. Never click destructive buttons — defend at two layers

The "Wipe All Demo Data" button in the WeCoza admin does what it says. The worst case is a Playwright run that's accidentally been pointed at a staging DB with real data, and the random button-click reflex of a broad `page.click('button')` takes the whole thing down.

Two layers of defence in `test.beforeEach`:

```typescript
// Layer 1 — network-level block
await page.route('**/admin-ajax.php*', (route) => {
  const url = route.request().url();
  if (url.includes('wecoza_wipe_all') || url.includes('wipe_all')) {
    route.abort();
    return;
  }
  route.continue();
});

// Layer 2 — DOM-level removal
page.on('load', async () => {
  await page.evaluate(() => {
    document.querySelectorAll('[data-action="wipe-all"]').forEach(el => el.remove());
    document.querySelectorAll('button').forEach(el => {
      if (el.textContent?.includes('Wipe All')) el.remove();
    });
  }).catch(() => {});
});
```

The network block is authoritative. The DOM removal is belt-and-braces: even if Playwright clicks the button, the button isn't there.

## 3. The shortcode map is the single source of truth

`playwright-shortcode-map.json` is a JSON file listing every page in the plugin and the shortcode that renders it. Tests iterate the map. Specs don't hard-code URLs anywhere.

```json
{
  "pages": [
    { "title": "Agents list", "url": "/agents/", "shortcode": "[wecoza_agents_list]" },
    { "title": "Capture agent", "url": "/agents/capture/", "shortcode": "[wecoza_agent_capture]" }
  ],
  "_login": { "url": "/wp-login.php", "username": "..." }
}
```

The smoke test is a loop over `SHORTCODE_MAP.pages`. Adding a new page is a one-line PR in the map, and every test category picks it up automatically. Forgetting to test a new page becomes a diff you can see.

## 4. Projects at three speeds

One config, three personalities:

- **smoke** — headless, default timeouts. Read-only pass over every page. Minutes, not hours.
- **crud** — `headless: false`, `slowMo: 800`, expanded viewport, 60s timeouts. Creates a record, edits it, deletes it, confirms dependency counts. You watch it happen.
- **deep** — `slowMo: 1000`, 90s timeouts. Full entity lifecycle plus audit-log verification. Runs rarely, like before a release.

The `slowMo` on crud/deep is a gift to your future self when a test breaks and you need to see it happen rather than parse screenshots at 2x speed.

## 5. Throw on unfiltered JS exceptions

```typescript
page.on('pageerror', (exception) => {
  if (!exception.message.includes('heartbeat')) {
    throw new Error(`JS exception on page: ${exception.message}`);
  }
});
```

WordPress's heartbeat and a few other 3rd-party noises can be filtered out. Everything else fails the test. A page that throws in the console is broken whether or not it visually looks right.

## 6. Baseline the debug.log

Before every test run, tail the last 50 lines of `wp-content/debug.log` and note the line count. After the run, anything new is yours. This turns "did the plugin error during the test?" from a guess into a diff.

## What I'd change next

- Migrate the shortcode map to a TypeScript file so the shape is type-checked against the spec code.
- Add a CI-specific project that skips `slowMo` and uses `headless: true` across the board.
- Parallelise once the suite clears 50 specs — worth setting up when the pain materialises.

## See also

- [[notes/index|Notes]] entries from 2026-04-02 on why a conditional existence check in a Playwright spec was lying by omission, and why a missing Google Maps API key made the static form fields the right selector target.
- [[playbooks/adversarial-ai-review|Adversarial AI review]] — the second-opinion pass that caught the lying guard.
- [[projects/wecoza-development|WeCoza 3.0]] — the plugin this suite drives.
