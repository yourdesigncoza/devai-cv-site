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

## What it is

From the WordPress dashboard this looks like any other custom plugin: admin menus, front-end shortcodes, AJAX endpoints, a settings page. Most of what matters runs outside WordPress though, a 43-table Postgres schema modelling a training provider's operations (agents, learners, classes, clients, sites with a parent-child hierarchy, exams, placements, progressions, attendance, deliveries, collections, QA visits) plus a dedicated `wecoza_events` sub-schema for a two-phase notification engine.

## Why this approach

The plugin talks to Postgres through a PDO connection, not `$wpdb`. The rationale is operational: the business data has to be valid independently of WordPress, and the invariants are strict enough that enforcing them in PHP would mean re-implementing things Postgres already does well. Trigger functions handle cross-table invariants and audit logging in plpgsql. The PHP layer is mostly presentation, integration, and CRUD rails.

The schema is maintained as a hand-written DBML file so the client can read it without SQL. The repo also carries a 14-month paper trail in `mario/` and `sheets/`, meeting notes, PDFs, ODS spreadsheets, hand-written markdown requirements, PRDs in ordinary business language. The pacing of the codebase matches the pacing of the business: not ticket-driven, but meeting-driven.

See [[decisions/postgres-alongside-wordpress|Why Postgres alongside WordPress, not instead of it]] for the longer version.

## What will break

Known and documented, not hidden:

- AJAX endpoints are capability-gated but not CSRF-nonced.
- Prod DB credentials are hard-coded in `includes/db.php`.
- The Settings UI registers `wecoza_db_host/user/password` but `db.php` never reads them, so changing values there has no effect.
- The repo isn't git-versioned; versioning is dated folders plus zipped backups.
- A legacy `agents-seperate-dev/` PHP + MySQLi portal (31k LOC, 148 files) lives in-tree as a porting reference. Removing it means porting everything it still does.

These are on a list. The plugin is in a real production environment and correctness of the business logic has been the priority.

## What I learned

Integrating Postgres with WordPress reinforced something I'd seen before: Postgres is better suited for complex, large-scale data operations, especially when the application logic extends beyond what a CMS handles on its own.

WordPress integrates well with external databases. Moving data outside WordPress removes the usual constraints and makes the same dataset reusable across CRMs, web apps, mobile apps, or anything else that needs access, the data is decoupled from the CMS and becomes a shared resource.

The other reinforcement: WordPress is a collection of PHP abstractions. People still think of it as a blogging platform, but architecturally it's a rapid application framework, a lot of boilerplate is already solved, which often makes it faster to build with than a lighter PHP framework.

WordPress isn't limited to content sites. It can power fairly sophisticated applications, and it holds up well inside AI-driven, data-heavy workflows.

## Proof points

- 43-table Postgres schema; 6,840-line `pg_dump`.
- Hand-maintained DBML file for client readability.
- 567 LOC in the active WordPress plugin, with most operational logic delegated to Postgres.
- 14+ months of development; `mario/` paper trail of meetings, PDFs, spreadsheets, PRDs.
- Legacy reference portal: ~31,000 LOC across 148 PHP files.
- `wecoza_events` sub-schema for two-phase notifications.

## What this proves

- [[skills/wordpress-php-craft|WordPress & PHP Craft]], custom plugin with WordPress Settings API, custom admin menus, AJAX round-trips, namespaced error logger, shortcode output.
- [[skills/python-services-data-pipelines|Python Services & Data Pipelines]], (tangentially) the Postgres-first schema design, plpgsql trigger invariants, and hand-maintained DBML are the same habits as the research pipelines.
