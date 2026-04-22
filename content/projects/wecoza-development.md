---
title: WeCoza 3.0
description: "WordPress plugin with a 43-table Postgres schema and plpgsql triggers, built for a South African training provider. Long-running client engagement."
tags: [project, wordpress, php, postgres]
draft: false
status: maintained
---

> A WordPress plugin for a South African adult-education training provider (WECOZA / Triple E Training), with most of the operational logic living in a 43-table Postgres schema alongside the WordPress install.

**Stack:** WordPress + PHP plugin, PDO connection to managed cloud Postgres (bypassing `$wpdb`), plpgsql trigger functions, jQuery + `admin-ajax.php`.
**Status:** Maintained for the client. 14+ months of active development.
**Source:** private.

## The story

The WeCoza plugin looks, from the WordPress dashboard, like any other custom plugin. Admin menus, shortcodes for the front-end pages, AJAX endpoints, a settings page. The reality is that most of what matters runs outside WordPress: a 43-table Postgres schema modelling a training provider's operations — agents, learners, classes, clients, sites with a parent-child hierarchy, exams, placements, progressions, attendance, deliveries, collections, QA visits — plus a dedicated `wecoza_events` sub-schema for a two-phase notification engine.

The plugin talks to that database through a PDO connection, not `$wpdb`. The rationale is operational: the business data needs to be valid independently of WordPress, and the invariants are strict enough that enforcing them in PHP would mean re-implementing things Postgres already does well. Trigger functions handle cross-table invariants and audit logging in plpgsql. The PHP layer is mostly presentation, integration, and the CRUD rails.

The other thing the repo captures is the client relationship. `mario/` and `sheets/` hold a 14-month paper trail of meeting notes, PDFs, ODS spreadsheets, hand-written markdown requirements, and PRDs written in ordinary business language. The schema exists as a hand-maintained DBML file so the client can read it without SQL. The pacing of work matches the pacing of the business — not ticket-driven, but meeting-driven.

The codebase isn't pristine. It isn't a git repo; versioning is dated folders plus zipped backups. There's a legacy `agents-seperate-dev/` PHP + MySQLi portal (31k LOC, 148 PHP files) kept around as a live reference while its features are ported into the Postgres + WP plugin. There are AJAX endpoints gated by capability but not CSRF-nonced; there's hard-coded prod DB credentials in `includes/db.php`; there's a Settings UI page that registers `wecoza_db_host/user/password` but `db.php` never consults it. These are known, documented, and on a list; the plugin is in a real production environment where correctness of the business logic has been the priority.

## Architecture in one breath

WordPress admin + shortcodes (PHP) → `includes/db.php` PDO layer → Postgres schema with plpgsql triggers → `wecoza_events` notification engine → legacy `agents-seperate-dev/` kept as porting reference.

## Proof points

- 43-table Postgres schema; 6,840-line `pg_dump`.
- Hand-maintained DBML file for client readability.
- 567 LOC in the active WordPress plugin, with most operational logic delegated to Postgres.
- 14+ months of development; `mario/` paper trail of meetings, PDFs, spreadsheets, PRDs.
- Legacy reference portal: ~31,000 LOC across 148 PHP files.
- `wecoza_events` sub-schema for two-phase notifications.

## What this proves

- [[skills/wordpress-php-craft|WordPress & PHP Craft]] — custom plugin with WordPress Settings API, custom admin menus, AJAX round-trips, namespaced error logger, shortcode output.
- [[skills/python-services-data-pipelines|Python Services & Data Pipelines]] — (tangentially) the Postgres-first schema design, plpgsql trigger invariants, and hand-maintained DBML are the same habits as the research pipelines.

## Decisions worth a deeper read

- [[decisions/postgres-alongside-wordpress|Why Postgres alongside WordPress, not instead of it]]
