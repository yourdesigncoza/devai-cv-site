---
title: WeCoza 3.0
description: "WeCoza 3.0 is a full line-of-business app built as a WordPress plugin for a SETA-regulated adult-education provider, with its operational data and rules living in a 44-table PostgreSQL schema reached through a hand-rolled PDO layer that bypasses WordPress entirely."
tags: [case-study, wordpress, postgres, php]
draft: false
date: 2026-05-29
order: 4
---

WeCoza 3.0 is a full line-of-business app built as a WordPress plugin for a South African adult-education provider that operates under SETA regulation. It runs learner management, class scheduling, agent and client records, a CRM, events and notifications, reporting, and a soft-delete recycle bin. None of that lives in WordPress posts or custom post types. The operational data and the rules that protect it live in a 44-table PostgreSQL schema, reached through a PDO layer I hand-rolled to bypass `$wpdb` completely. WordPress provides the admin menus, the shortcodes, and the login. Postgres holds the truth.

## The problem

A training provider working under SETA rules has to keep records that an auditor will trust. A learner can be on only one in-progress learning programme at a time. A site belongs to exactly one client. A row that has been soft-deleted must not be quietly edited back to life. These are not display preferences. They are compliance facts, and if they are wrong the provider has a problem that no amount of CMS convenience will fix.

The build started life CMS-shaped and outgrew it. `$wpdb` is fine for options and the occasional query, but it gives you no real prepared statements, no constraint enforcement worth relying on, and no audit layer. Enforcing the business rules in PHP would mean reimplementing things a real database already does, and trusting that every code path remembered to call them. The decision was to stop fighting that and let Postgres do the job it is built for. Data integrity beats CMS convenience when an auditor is on the other side of it.

## The architecture

The plugin is modern PHP. `declare(strict_types=1)` everywhere, PHP 8.1 enums and readonly properties, PSR-4 autoloading, and a Controller to Service to Repository to Model layering. It is roughly 305 PHP files and 87,000 lines, with 96 view templates, around 55 shortcodes, and around 134 AJAX endpoints. There is no REST API and there are no custom post types: every front-end round-trip goes through `admin-ajax.php`. There are also five cron jobs and three WP-CLI commands. Only `wecoza-core` is the production plugin. Two older plugins sit alongside it as legacy.

### Postgres, not wpdb

The database layer is a singleton PDO wrapper that connects to a DigitalOcean managed Postgres instance over SSL, with the connection opened lazily and `sslmode=require`. `$wpdb` is touched only to read WordPress options and the stored credentials. Everything else goes through PDO with real prepared statements. The wrapper introspects `information_schema` to learn each table's columns and primary key, caches that in memory, and uses it to drive `INSERT ... RETURNING <pk>` so an insert hands back the new row's id in one round-trip. The schema itself spans 44 tables across three schemas (`public`, `crm`, `wecoza_events`), plus 3 views, 12 triggers, 6 functions, and zero custom WordPress tables. JSONB carries the data that is genuinely document-shaped (schedule data, attendance learner data, class notes) while the rest stays fully relational for reporting.

### Business rules live in the database

The rules that matter are enforced where they cannot be skipped. A CHECK constraint allows only one in-progress learning programme per learner. A trigger function (`fn_sites_same_client`) keeps a site tied to a single client. Tombstone triggers block edits to soft-deleted rows, so a recycle-bin entry cannot be mutated behind the app's back. The `pgaudit` extension logs SQL activity at the database level. None of this depends on a PHP code path remembering to behave. If a write would violate a rule, Postgres refuses it.

### A forensic snapshot when a user reports a problem

When a user files feedback, an `InvestigationService` builds a forensic bundle automatically. It joins the application's own audit log, the `pgaudit` SQL log read straight off disk with `pg_read_file()`, and the tail of `wp-content/debug.log`, packages them as JSON, and attaches the bundle to a Trello card. It captures the state at the moment the problem was reported, which is exactly the state you cannot reproduce later on your laptop. Instead of asking a user to remember what they clicked, the system hands me the production-time evidence.

### Natural-language queries that cannot wreck the database

The app lets a user ask a question in plain English and turns it into SQL with OpenAI GPT-4.1 (a separate GPT-4o-mini handles summaries). Letting a model write SQL against a production database is a real risk, so the generated SQL goes through a `SQLSandbox` before it runs. The sandbox allows only `SELECT` and `WITH`, blocks 17 write and DDL keywords, rejects 13 injection regex patterns, and caps query length. It validates twice: once when a query is saved and again before it executes, so a stored query cannot be edited around the guard later. Before any text reaches OpenAI, a heuristic PII pass detects South African ID numbers, passport numbers, and phone numbers and obfuscates them. The model never sees the personal data.

One honest caveat: the excessive-hours report that flags learners against their SETA hour allocations still runs with `DEMO_MODE = true` set. The mechanism is built. That specific report is not yet wired to live data.

## What it proves

WeCoza is the war-stories piece. It is a real production system carrying a regulated provider's operations, and it shows what I mean when I say I build the harness around the work, not just the surface. The same instinct that grades every claim in [[method/index|the method]] shows up here as constraints and triggers that refuse bad data at the source.

- The reasoning behind reaching past `$wpdb` to a real database is in [[decisions/postgres-alongside-wordpress|Postgres alongside WordPress]].
- The WordPress and PHP work itself, a 305-file plugin with a layered architecture and a hand-rolled PDO layer, is [[skills/wordpress-php-craft|WordPress & PHP Craft]].
- The pattern of putting a typed, validated barrier between a language model and anything it can damage runs through everything I build, here as the SQL sandbox and the PII obfuscation pass.

> [!note]
> [JOHN: optional. One or two sentences in your own voice on what this build taught you about regulated data, or about how far WordPress will stretch when you stop treating it as a CMS. The existing project page has a good "what I learned" section you could draw the substance from. Leave blank if you would rather not.]

## Work with me

If you run a business where the data has to be correct and provable, not just stored, [email me at info@devai.co.za](mailto:info@devai.co.za) and tell me what you are trying to keep straight.
