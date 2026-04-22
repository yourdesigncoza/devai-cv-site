---
source_path: /home/laudes/zoot/projects/wecoza_development
extracted: 2026-04-22
---

## One-line pitch

WeCoza 3.0 — a WordPress-based class/learner/agent management system for a South African adult-education training provider (WECOZA / Triple E Training). The top-level folder is a working dossier: the live plugin (`wecoza_3`), a legacy standalone PHP agent portal, a 6,840-line Postgres schema, hand-written dbdocs, client sheets/PDFs, meeting recordings and requirements docs. YourDesign is the vendor — the plugin headers name `https://yourdesign.co.za` as author.

## Stack & dependencies

- **Runtime**: WordPress plugin (`index.php` declares `Plugin Name: Wecoza_3 / Version: 1.0 / Author: Yourdesign.co.za`). No `composer.json`, no `package.json` — everything hand-wired.
- **Primary datastore**: DigitalOcean managed Postgres 16 (`host=db-wecoza-3-do-user-17263152-0.m.db.ondigitalocean.com`, `port=25060`, `sslmode=require`) accessed via PDO from PHP. Credentials are hard-coded in `includes/db.php` (see Open questions).
- **Secondary datastore**: a remote MySQL logger on `sql17.cpt2.host-h.net` (`ydcoza_wecoza_logger.wecoza_sql_queries`) used by a bespoke in-admin SQL-snippet manager (`admin-sql-manager.php`).
- **Frontend**: Bootstrap 5, DataTables (bundled locally: 5.4 MB of `datatables.js`, 2.8 MB minified), jQuery, inline `contenteditable` table edits posted over `admin-ajax.php`.
- **Legacy sibling**: `agents-seperate-dev/agents/` — a pre-WordPress standalone PHP/MySQLi agent portal (148 PHP files, ~31 k LOC). Not loaded by the plugin but kept alongside for porting reference (features: agent agreements, SMS sending, endorsement, attendance capture).
- **Schema tooling**: `dbdocs/dbdiagram/01_dbml.txt` — DBML source for dbdiagram.io, hand-maintained; a later `pg_dump` snapshot (`schema/wecoza_db_schema_bu_oct_20.sql`, dated 2025-10-20) captures the evolved shape.

## Architecture sketch

```
wecoza_development/
├── wecoza_DEV/wecoza_3/         ← live WP plugin (567 LOC PHP, 35 LOC JS)
│   ├── index.php                ← plugin bootstrap, enqueue, custom error handler
│   └── includes/
│       ├── db.php               ← Wecoza3_DB (pgsql PDO) + Wecoza3_Logger (mysql PDO)
│       ├── ajax-handlers.php    ← wp_ajax_wecoza3_update_agent
│       ├── shortcodes.php       ← [wecoza3_table_edit]
│       ├── settings.php         ← WP settings API page (DB host/user/pass)
│       ├── admin-sql-manager.php← admin menu: CRUD over tracked SQL snippets
│       └── helpers.php          ← Wecoza_Logger (file append to error_log.txt)
├── agents-seperate-dev/agents/  ← legacy portal: login/welcome/attendance/SMS/PDF
├── schema/                      ← 6,840-line Postgres pg_dump (Oct 2025)
├── dbdocs/dbdiagram/            ← DBML source of truth (early schema)
├── wecoza_DEV/DB Structure/     ← Wecoza 3 V2.sql (1,148 LOC) + markdown table spec
├── mario/, sheets/              ← business-side: PDFs, CSVs, meeting notes, PRDs
└── Wecoza 3.0 Meeting (1).mp4   ← 87 MB recording, client kickoff
```

The Postgres schema (`schema/wecoza_db_schema_bu_oct_20.sql`) defines **43 tables across 2 schemas** (`public` + `wecoza_events`): core entities `agents`, `clients`, `classes`, `learners`, `sites`, `locations`, `products`, `employers`, `exams`, `exam_results`, `attendance_registers`, `class_schedules`, `class_agents`, `class_notes`, `class_change_logs`, `class_subjects`, `learner_products`, `learner_progressions`, `learner_qualifications`, `learner_portfolios`, `learner_placement_level`, `agent_absences`, `agent_notes`, `agent_orders`, `agent_replacements`, `collections`, `deliveries`, `qa_visits`, `progress_reports`, `history`, `files`, `users`, `user_roles`, `user_permissions`; plus a `wecoza_events` schema with `audit_log`, `dashboard_status`, `events_log`, `notification_queue`, `supervisors` for the notification engine described in the Sept-01 PRD.

## Design decisions worth telling

- **Postgres, not WordPress MySQL**, for domain data. The WP MySQL install is used only for auth/admin; operational data lives in a managed Postgres and is reached over PDO. This lets reporting, triggers and enum-ish constraints stay in SQL rather than being re-implemented as WP options.
- **Two-phase notification model** for class lifecycle (from `mario/SEPT_01/classes_notification_prd.md`): every post-creation step emits *Reminders* (to the responsible user) and *Confirmations* (to supervisors/learners/agents). The `wecoza_events` Postgres schema (`events_log`, `notification_queue`, `dashboard_status`) is the mechanical backbone; the dashboard renders each EVT step as a tile showing pending vs. complete.
- **Draft → Active class state** gated on Sage ERP order number. From the Sep-29 meeting notes (`mario/sep-29-meeting.md`): "Update 'Create Class' to save new class as 'Draft', only when 'Agent Order Nr.' is set as 'Complete' move the class to 'Active'". The DB captures this via `class_change_logs` + the `log_class_change()` trigger.
- **DB-level invariants as triggers, not app code**. The schema ships three plpgsql trigger functions: `fn_sites_same_client()` (enforces that a child `site.parent_site_id` shares the same `client_id` as its parent), `log_class_change()` (writes audit rows), and `update_updated_at_column()` (timestamp touch). Four more functions live in `wecoza_events` for dashboard stats, pending notifications and unprocessed events.
- **In-admin SQL snippet manager**. `admin-sql-manager.php` gives the office a queryable store of canned SQL (`wecoza_sql_queries` on a separate remote MySQL logger). Practical for a non-technical ops team that needs re-runnable reports without a BI tool.
- **DBML as source of truth** for schema discussion with the client, separate from the pg_dump snapshot. The diagram (`dbdocs/dbdiagram/01_dbml.txt`) is human-edited and is what the client sees; the dump is ground-truth.
- **Repository split** planned in the Sep-29 notes: `wecoza_3` (core), `wecoza-3-child-theme` (dashboard/styling), `wecoza_classes_plugin` (classes + learners), `wecoza-classes-site-management` (notifications, scheduling, tasks). The current plugin is the monolithic precursor.

## Concrete proof points

- **Plugin code**: 567 LOC PHP across 8 files, 35 LOC JS. Small on purpose — all operational logic is in SQL.
- **Legacy agent portal** (`agents-seperate-dev/agents/`): **148 PHP files, 31,197 LOC** — features include PDF generation (`agentagreementpdf.php` — 660 LOC), SMS sending (`agentportalSendSMS.php` — 333 LOC), attendance save (`save_attendance.php` — 432 LOC), dual DB access (`db.php` + `dbx.php` — 1,216 + 1,214 LOC).
- **Schema scale**: 43 `CREATE TABLE`, 7 `CREATE FUNCTION` (plpgsql), 76 `CREATE INDEX`, 6 `CREATE TRIGGER`, 56 `FOREIGN KEY` constraints, 2 schemas (`public`, `wecoza_events`).
- **Custom WP surface**: 1 shortcode (`[wecoza3_table_edit]`), 1 AJAX handler (`wp_ajax_wecoza3_update_agent`), 2 admin menu pages (`wecoza-dashboard`, `wecoza3-sql-manager`), 3 registered options (`wecoza_db_host/user/password`), global `set_error_handler`/`set_exception_handler` wired to a file-append logger.
- **Real-world business context in the folder**: `Cleaned_WECOZA_3.0_gpt.xlsx` (14 KB), `Current PMS Example.pdf` (158 KB), `WECOZA 3.0 Proposal ( Short ).pdf`, `WECOZA 3.0 - Dashboard.{csv,pdf}`, `Wecoza 3.0 Meeting (1).mp4` (87 MB), `Wecoza _ Notifications _ Events _ Repor_ Recording.mp4`, plus client feedback PDFs in `wecoza_DEV/durc_feedback/` covering learner fields, progression views, levels (AET, REALLL, Business Admin NQF 2/3/4, learnerships).
- **Activity window**: oldest artifacts August 2024 (`export.json`, initial `WECOZA 3.0.xlsx`); most recent `wecoza_DEV/Apr_15/` (April 2025 class-creation transcripts), `schema/wecoza_db_schema_bu_oct_20.sql` (Oct 2025), `WECOZA-BU-OCT-28.zip` (Oct 2025), `sep-29-meeting.md` (Sep 2025 repo-split planning). Roughly 14 months of continuous work. Not a git repo — versioning is by dated directory and zipped backups (`wecoza_DEV/zipped/` holds 13 plugin backups: `wecoza_3_BU_01..05`, `wecoza_BU_03`, `wecoza-data-manager_BU_01..03`, `tablepress.2.4.2.zip`, `wp_editor.zip`).
- **Requirements coverage**: `mario/WECOZA_Requirements_Pages7-8.md` encodes 10 Persons requirements, plus sections for Clients, Classes, Products, Agent Portal, Reporting, Learnerships, Operations Daily To Do, and EVT workflows.

## Skills demonstrated

- **WordPress & PHP craft** — plugin structure, WP Settings API, custom admin menus, AJAX nonce-less but capability-gated endpoint (`current_user_can('edit_posts')`), shortcode output with `ob_start`, global error handlers routed into a namespaced logger class, `admin-ajax.php` + jQuery round-trip.
- **Postgres-with-WordPress** — bypassing `$wpdb` for a PDO connection to a managed cloud database, PDO prepared statements with named binds, plpgsql trigger functions for cross-table invariants and audit logging.
- **Schema design for a business domain** — 43 tables modelling a training provider's reality (agents, learners, classes, clients, sites with parent-child hierarchy, exams, placements, progressions, attendance, deliveries, collections, QA visits, agent replacements), plus a dedicated `wecoza_events` schema for notifications.
- **Working with non-technical stakeholders** — the folder is littered with client PDFs, ODS sheets, meeting recordings and hand-written markdown requirements; the DBML file exists so the client can read the schema without SQL.
- **Legacy code salvage** — the standalone `agents-seperate-dev/agents/` PHP/MySQLi portal is kept as a live reference while its features are ported into the Postgres + WP plugin.

## Pull quotes

From `mario/sep-29-meeting.md`:
> "Update 'Create Class' to save new class as 'Draft', only when 'Agent Order Nr.' is set as 'Complete' move the class to 'Active'"

> "Home page notifications need to have a dropdown select of all users ( WordPress ), to whom tasks can be assigned to ::: With asignee and asigned indicated in the view :::"

From `mario/SEPT_01/classes_notification_prd.md`:
> "Reminders make sure tasks are not forgotten. Confirmations prevent confusion and unnecessary questions like 'Has this been done yet?' by providing clear status updates to everyone involved."

From `schema/wecoza_db_schema_bu_oct_20.sql` (schema comment):
> "WeCoza Events Plugin schema for notifications, events, and dashboard management"

From `includes/db.php` (source comment, verbatim typo included):
> "PostgeSQL DB connection class"

## Open questions / dead-ends

- **Secrets in source**: `includes/db.php` contains hard-coded production Postgres credentials (Aiven `doadmin` user) and MySQL logger credentials (both verbatim in source; specifics redacted from this note). The `settings.php` page registers `wecoza_db_host/user/password` options but `db.php` never reads them — the DB Settings UI is cosmetic. Needs rotation + move to `wp-config.php` constants or options.
- **No repository / no CI**: versioning is dated directories + zipped plugin backups in `wecoza_DEV/zipped/`. The Sep-29 notes plan a 4-repo split but none of those repos exist in this tree.
- **AJAX handler is capability-only, no nonce**: `wecoza3_update_agent` checks `current_user_can('edit_posts')` but never verifies a nonce — CSRF exposure. `$_POST['updated_data']` is passed into `bindParam` field-by-field without sanitisation of keys.
- **Duplicated code**: `includes/functions.php` and `includes/ajax-handlers.php` both define `wecoza3_update_agent` (identical body, different namespace/action registration). Only one is wired to `wp_ajax_*` via namespaced `add_action`; the other attempts an unnamespaced hook. Stale copy.
- **PMS vs WeCoza 3.0 scope drift**: `sheets/WECOZA 3.0 - PMS Suggested Structure.csv` + `Current PMS Example.pdf` suggest a project-management-system layer was either planned or descoped — not obviously present in the schema.
- **Google Maps Places** integration for learner address (called out as a TODO in `sep-29-meeting.md`) — not in code yet.
- **EVT workflow implementation**: the `wecoza_events.notification_queue` and `events_log` tables exist and have SQL helper functions (`get_pending_notifications`, `get_unprocessed_events`), but no PHP worker/cron is present in the current plugin to drain them. Likely lives in the planned `wecoza-classes-site-management` repo.
