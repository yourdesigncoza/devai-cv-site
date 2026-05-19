---
title: Ship the feedback loop
description: "Why a one-click feedback widget plus an automatic audit-log bundle is the bit of infrastructure people skip, and how it's wired up in the wecoza-core plugin."
tags: [decision, feedback, wordpress, observability]
draft: false
date: 2026-05-19
---

## The position

Shipping code isn't the finish line. It's where you actually start finding out if you built the right thing.

We pour effort into the build. Clean architecture, tests, reviews, type checks. All good. None of it tells you whether the thing holds up once a real person touches it.

Honestly, the bit of infrastructure people skip is the one that matters most after launch: a working feedback loop. A button the client can press the second something feels off. A widget that grabs the URL, the console errors, a screenshot, and their half-frustrated sentence about what just happened, then drops the whole thing straight into your tracker before they've even closed the tab.

The version I'm running on [[projects/wecoza-development|WeCoza 3.0]] goes one step further. When the user submits, a service pulls audit logs, pgaudit SQL statements, and the recent `debug.log` slice for that user and IP, and attaches the bundle to the tracker card. No more "can you reproduce this?" back-and-forth. The system reproduces it for you.

So build the loop. One click for the client, no pain for the dev on the other end. Your code is a guess until someone uses it. Feedback is how you find out.

## What I built

The plugin injects a feedback FAB and modal into the WordPress footer for any logged-in user, via `views/feedback/widget.view.php`. The modal carries the page context up front: page title, current shortcode (with a badge), and an inline screenshot preview that's captured in the background while the user is still typing.

Three categories: bug report, feature request, comment. Ten-word minimum on the body so single-word "broken" entries don't make it through.

Submit fires a nonce-protected AJAX call to `wp_ajax_wecoza_feedback_submit`. The controller (`src/Feedback/Controllers/FeedbackController.php`) does four things on its way to closing the loop:

1. **Persist the feedback row.** Page URL, title, shortcode, viewport, browser info, screenshot path, all saved to a dedicated Postgres table through `FeedbackRepository`. Screenshot is base64 POST'd, MIME-validated (jpeg/png/webp), 2MB cap, written under `wp-uploads/wecoza-feedback/YYYY/MM/`.
2. **Gather a debug context object.** Not stored in the database, computed per submission and only used downstream. Server-side: WP version, PHP version, active theme, active plugin list, user roles, WP_DEBUG state, plugin version, server UTC time. Client-side: console errors, AJAX errors, click trail, time on page, scroll Y, screen size and DPR, online state, timezone, language, referrer.
3. **Push to Trello.** `TrelloService::createCard()` posts a card to the board's "Open" list, with the feedback text in the description and the debug context rendered as a readable block. Card creation is fire-and-forget; if Trello is unreachable, the user still gets a success response and the row is still saved.
4. **Attach an investigation bundle.** This is the part the LinkedIn post is about. `attachInvestigationBundle()` calls `Classes/Services/InvestigationService.php`, which joins three forensic surfaces for the user-id and client-IP scope over a 10-minute window: app `audit_log` rows, Postgres `pgaudit` statement log, and the tail of `wp-content/debug.log`. The bundle is written as pretty-printed JSON to the uploads directory, uploaded to the Trello card as an attachment, then unlinked locally once Trello has its copy. A short summary comment posts alongside the attachment with row counts, failure counts, and a highlight reel.

There's also a `Support/SchemaContext.php` helper that maps the submitting page's shortcode (or URL) to the relevant data module (`agents`, `learners`, `classes`, `clients`) and emits a compact schema snippet for the Trello description. When the report says "the form broke", the card already names the table the user was looking at.

## Why this approach

Three reasons.

First, the cost asymmetry. A logged-in user who hits a bug and has to write a ticket from scratch will close the tab nine times out of ten. The widget collapses the cost of reporting to one click and a sentence. The cost of building the widget once is a few hours. The cost of missing every report a client doesn't bother to file is uncountable.

Second, the reproducibility tax. "Can you reproduce this?" is the single most expensive sentence in client work. It eats two days of calendar time, kills the user's trust, and usually ends with "well it's working now". The investigation bundle removes that round trip. Audit log, pgaudit, and PHP errors for the exact window are already on the card when I open it.

Third, where the work lives. WordPress in front, Postgres behind. The forensic data I actually want is on the Postgres side ([[decisions/postgres-alongside-wordpress|pgaudit and audit_log live there]]), so the bundle has to span both surfaces. The investigation service does that join once and exposes it to the controller, the WP-CLI command, and a future audit-viewer page from one place.

## What will break

Real fragility, not hypotheticals.

- **Trello credentials are stored in WP options**, not env vars. API key, token, and board ID are all admin-editable. Rotation goes through the settings UI. Anyone with `manage_options` can read them.
- **Card creation is fire-and-forget.** If Trello returns an error, the controller logs it and moves on. The feedback row is still saved, but there's no retry queue. Lost cards stay lost until someone reads the database directly.
- **The screenshot is browser-side.** A canvas-based capture means CORS-restricted images (third-party CDNs without the right headers) render as blank rectangles. High-DPI screens can also blow past the 2MB cap and silently produce no screenshot at all.
- **Investigation bundle depends on pgaudit being enabled.** Without `pgaudit` in `shared_preload_libraries` and the right `log_statement` setting, the SQL slice comes back empty. The bundle still attaches; it just has less to say.
- **Client IP is `REMOTE_ADDR` only.** I intentionally don't trust `X-Forwarded-For` because the WordPress install isn't behind a vetted proxy chain. If the site ever moves behind Cloudflare or a load balancer, the IP filter on the investigation window stops matching and the audit slice drops to whatever the user-id filter alone returns.
- **Logged-in users only.** The widget is injected on `wp_footer` and bails for guests. There's no external feedback channel for prospects or anonymous visitors. That's deliberate for WeCoza (an internal CRM), and the wrong call for a public site.
- **The 10-minute window is fixed.** If a bug took longer to manifest, the bundle won't have the earlier statements. The window is a constant on `InvestigationService::DEFAULT_WINDOW_MINUTES`, not a per-submission setting.

These are on a list and triaged by likelihood. The widget is in active production use, and the priority has been getting reports in, not closing every edge case.

## Where this shows up

- [[projects/wecoza-development|WeCoza 3.0]], the deployment running this widget against a 43-table Postgres schema with pgaudit enabled.
- [[decisions/postgres-alongside-wordpress|Postgres alongside WordPress]], the reason the forensic surface that matters most lives on the database side, not in `$wpdb`.
- [[skills/wordpress-php-craft|WordPress & PHP Craft]], custom plugin work: AJAX with nonce gating, file upload validation, the Settings API surface for Trello credentials, schema-context shortcode mapping.
