---
title: WordPress & PHP Craft
description: "Custom WordPress, WooCommerce, and PHP development. 20+ years of bespoke builds and Postgres-backed operational sites by John Montgomery / YourDesign."
tags: [skill, wordpress, php, postgres]
draft: false
---

> "Freelance WordPress Wrangler @ yourdesign.co.za"
>
> — 2023 cover letter

## What this looks like for me

WordPress is the craft I've been practising longest. The yourdesign.co.za era is 20+ years of small-to-medium business sites, custom themes (not page builders), custom post types, plugin development, WooCommerce work, agency sub-contracts (Nimue Skin Technology, Woolworths Mother's Day campaign, via Flume). That's the base layer.

The current example, [[projects/wecoza-development|WeCoza 3.0]], is the less visible end of the same craft: a plugin for a South African adult-education training provider where most of the operational logic doesn't live in PHP at all. It lives in a 43-table Postgres schema running alongside the WordPress install, reached by a PDO connection rather than `$wpdb`. Business invariants — state transitions on classes, audit trails, a two-phase notification engine — are enforced by plpgsql triggers, with the plugin acting as a thin UI and integration layer. There's a hand-maintained DBML file so the client can read the schema without SQL, and a 14-month paper trail of meeting notes, PDFs, and PRDs in the repo alongside the code.

A lot of the value in this kind of work isn't the framework. It's the domain model: getting the schema right, picking the invariants, and working with the client's actual objects — learners, agents, classes, sites with parent-child hierarchy, collections, QA visits — rather than WordPress's defaults.

## Projects that back this

- [[projects/wecoza-development|wecoza_development]] — WP plugin + 43-table Postgres backend, plpgsql triggers, two-phase notification engine, 14-month client paper trail.
- [yourdesign.co.za](https://yourdesign.co.za/) — freelance portfolio covering 20+ years of WordPress / WooCommerce / PHP work, including Nimue Skin Technology and Woolworths.

## Decisions that shaped how I do it

- [[decisions/postgres-alongside-wordpress|Why Postgres alongside WordPress, not instead of it]] — invariants in plpgsql; operational data that should survive the CMS.

## What I'm usually asked to do

- Build a custom WordPress plugin or theme with operational logic that extends beyond CMS use
- Pair a WordPress install with a dedicated Postgres / MySQL backend for real-world business data
- Design a schema against a client's actual objects rather than WordPress's post-and-meta default
- Maintain a long-running client site through requirements, migrations, and schema changes
