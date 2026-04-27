---
title: Why Postgres alongside WordPress, not instead of it
description: "Why Postgres alongside WordPress, invariants in plpgsql triggers, operational data that outlives the CMS. A pattern from WeCoza development."
tags: [decision, wordpress, postgres]
draft: false
date: 2026-04-22
---

## The position

On [[projects/wecoza-development|WeCoza 3.0]], business data lives in a 43-table Postgres schema running beside the WordPress install. The plugin talks to it via PDO, not `$wpdb`, and enforces invariants through plpgsql trigger functions. WordPress handles the admin surface, the front-end, authentication, and media. It doesn't own the operational data.

## How I got here

The default answer, for a WordPress project, is to store everything in the WordPress database. Custom post types, post meta, term meta, maybe a few custom tables behind `$wpdb`. It works. It's standard. It keeps one DBA surface.

WeCoza needed something different. The client is a South African adult-education training provider running real operations, learners, agents, classes, clients, sites with a parent-child hierarchy, exams, placements, progressions, attendance, deliveries, QA visits, collections. The objects in their business aren't "posts"; they're business entities with foreign-key relationships between them, strict state transitions, and an audit trail that needs to survive plugin uninstalls and WordPress upgrades.

Three things pushed it toward a separate Postgres schema:

**Invariants belong in the database.** A class can only move from "Draft" to "Active" when an agent order is marked "Complete". A notification fires when specific state transitions happen. Encoding rules like that in PHP means re-implementing things Postgres already does well, and doing them in a place where an uninstalled plugin can break the invariant. plpgsql triggers are harder to accidentally route around.

**The schema needs to be readable independently of WordPress.** There's a hand-maintained DBML file in the repo so the client can read the model without SQL. When requirements change (and they do, every couple of weeks, in meeting notes stored in `mario/`) we talk about tables and relations, not about post types. Anchoring the conversation there has saved a lot of back-and-forth.

**Operational data should survive the CMS.** WordPress is the interface today. It may not be the interface in two years. The business logic shouldn't move when the front-end does. Keeping Postgres as the system of record means a future rewrite is a UI project, not a data migration.

The cost is one extra connection, one extra ops surface, and the discipline of not accidentally falling back to `$wpdb` for anything operational. The settings UI in WeCoza has fields for database host / user / password that `includes/db.php` never consults, that's debt I know about, not a decision. The PDO layer is where the real wiring happens.

## Where this shows up

- [[projects/wecoza-development|wecoza_development]], 43-table Postgres schema, PDO layer, plpgsql triggers, hand-maintained DBML, two-phase notification engine in `wecoza_events`.
- [[skills/wordpress-php-craft|WordPress & PHP Craft]], this is the specific shape that skill takes when the problem outgrows `$wpdb`.
